import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders } from '@/lib/security'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const securityHeaders = getSecurityHeaders()

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (request.nextUrl.pathname === '/api/contact' && request.method !== 'POST') {
      return new NextResponse('Method not allowed', {
        status: 405,
        headers: securityHeaders,
      })
    }

    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        return new NextResponse('Invalid content type', {
          status: 400,
          headers: securityHeaders,
        })
      }
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
