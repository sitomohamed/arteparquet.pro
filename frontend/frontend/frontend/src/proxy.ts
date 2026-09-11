import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders } from '@/lib/security'

function withSecurityHeaders(response: NextResponse) {
  const securityHeaders = getSecurityHeaders()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
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

  const response = withSecurityHeaders(NextResponse.next())

  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (request.nextUrl.pathname === '/api/contact' && request.method !== 'POST') {
      return new NextResponse('Method not allowed', {
        status: 405,
        headers: getSecurityHeaders(),
      })
    }

    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        return new NextResponse('Invalid content type', {
          status: 400,
          headers: getSecurityHeaders(),
        })
      }
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
