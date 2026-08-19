import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders } from '@/lib/security'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Apply security headers to all responses
  const securityHeaders = getSecurityHeaders()
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Additional protections for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Ensure API calls use POST method for sensitive operations
    if (request.nextUrl.pathname === '/api/contact' && request.method !== 'POST') {
      return new NextResponse('Method not allowed', { 
        status: 405,
        headers: securityHeaders
      })
    }
    
    // Check Content-Type for POST requests
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        return new NextResponse('Invalid content type', { 
          status: 400,
          headers: securityHeaders
        })
      }
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}