import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders } from '@/lib/security'

const securityHeaders = getSecurityHeaders()

const methodRestrictions: Record<string, string[]> = {
  '/api/contact': ['POST', 'OPTIONS'],
  '/api/foto': ['POST', 'OPTIONS'],
  '/api/csrf': ['GET', 'OPTIONS'],
  '/api/meta/capi': ['POST', 'OPTIONS'],
  '/api/indexnow': ['GET', 'POST', 'OPTIONS'],
}

const jsonPostPaths = new Set(['/api/contact', '/api/meta/capi', '/api/indexnow'])

function withSecurityHeaders(response: NextResponse, extra?: Record<string, string>) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  if (extra) {
    Object.entries(extra).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
  }
  return response
}

function jsonError(status: number, error: string, extra?: Record<string, string>) {
  return withSecurityHeaders(
    new NextResponse(JSON.stringify({ error }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
    extra
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') ?? ''

  if (host.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.host = host.slice(4)
    url.protocol = 'https:'
    return withSecurityHeaders(NextResponse.redirect(url, 308))
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return withSecurityHeaders(NextResponse.redirect(url, 308))
  }

  if (pathname.startsWith('/api/')) {
    const allowedMethods = methodRestrictions[pathname]
    if (allowedMethods && !allowedMethods.includes(request.method)) {
      return jsonError(405, 'Method not allowed', { Allow: allowedMethods.join(', ') })
    }

    if (request.method === 'OPTIONS') {
      const origin = request.headers.get('origin')
      const allowedOrigins = [
        'https://arteparquet.pro',
        'https://www.arteparquet.pro',
      ]
      if (process.env.NODE_ENV !== 'production') {
        allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000')
      }

      if (origin && allowedOrigins.includes(origin)) {
        return withSecurityHeaders(new NextResponse(null, { status: 204 }), {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
          'Access-Control-Max-Age': '600',
        })
      }

      return new NextResponse(null, { status: 403 })
    }

    const contentLength = request.headers.get('content-length')
    if (contentLength) {
      const size = parseInt(contentLength, 10)
      if (size > 100 * 1024 * 1024) {
        return jsonError(413, 'Request entity too large')
      }
    }

    if (request.method === 'POST' && jsonPostPaths.has(pathname)) {
      const contentType = request.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) {
        return jsonError(400, 'Invalid content type')
      }
    }

    return withSecurityHeaders(NextResponse.next(), {
      'X-Robots-Tag': 'noindex, nofollow',
    })
  }

  return withSecurityHeaders(NextResponse.next())
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons/|images/|portfolio/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
