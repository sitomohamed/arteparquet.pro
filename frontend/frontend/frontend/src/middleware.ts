import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * SECURITY MIDDLEWARE
 * Centralized security controls for all requests
 */

// Security headers applied to all responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()',
}

// Paths that should never be indexed
const noIndexPaths = [
  '/api/',
  '/_next/',
  '/admin',
  '/dashboard',
]

// Allowed HTTP methods per path pattern
const methodRestrictions: Record<string, string[]> = {
  '/api/contact': ['POST', 'OPTIONS'],
  '/api/foto': ['POST', 'OPTIONS'],
  '/api/csrf': ['GET', 'OPTIONS'],
  '/api/meta/capi': ['POST', 'OPTIONS'],
  '/api/indexnow': ['GET', 'POST', 'OPTIONS'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()
  
  // --- SECURITY HEADERS ---
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // --- API ROUTE SECURITY ---
  if (pathname.startsWith('/api/')) {
    // No-index for all API routes
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    
    // Method restriction check
    const allowedMethods = methodRestrictions[pathname]
    if (allowedMethods && !allowedMethods.includes(request.method)) {
      return new NextResponse(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Allow': allowedMethods.join(', '),
            ...securityHeaders,
          }
        }
      )
    }
    
    // CORS preflight handling
    if (request.method === 'OPTIONS') {
      const origin = request.headers.get('origin')
      const allowedOrigins = [
        'https://arteparquet.pro',
        'https://www.arteparquet.pro',
      ]
      
      // Development origins
      if (process.env.NODE_ENV !== 'production') {
        allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000')
      }
      
      if (origin && allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
            'Access-Control-Max-Age': '600',
            ...securityHeaders,
          }
        })
      }
      
      return new NextResponse(null, { status: 403 })
    }
  }
  
  // --- NO-INDEX FOR SENSITIVE PATHS ---
  if (noIndexPaths.some(p => pathname.startsWith(p))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  
  // --- REQUEST SIZE LIMIT (basic check) ---
  const contentLength = request.headers.get('content-length')
  if (contentLength) {
    const size = parseInt(contentLength, 10)
    // 100MB limit
    if (size > 100 * 1024 * 1024) {
      return new NextResponse(
        JSON.stringify({ error: 'Request entity too large' }),
        { 
          status: 413,
          headers: {
            'Content-Type': 'application/json',
            ...securityHeaders,
          }
        }
      )
    }
  }
  
  // --- HOST HEADER VALIDATION ---
  const host = request.headers.get('host')
  const allowedHosts = [
    'arteparquet.pro',
    'www.arteparquet.pro',
    'localhost:3000',
    '127.0.0.1:3000',
  ]
  
  if (host && !allowedHosts.some(h => host === h || host.endsWith(`.${h}`))) {
    // Log suspicious host headers but allow in development
    if (process.env.NODE_ENV === 'production') {
      console.warn(`[Security] Invalid host header: ${host}`)
    }
  }
  
  return response
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/|portfolio/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
