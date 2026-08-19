import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders, checkRateLimit } from '@/lib/security'
import { generateCSRFTokenServer } from '@/lib/security-server'

export async function GET(request: NextRequest) {
  const securityHeaders = getSecurityHeaders()
  
  try {
    // Rate limiting for CSRF token requests (prevent token farming)
    const rateLimit = checkRateLimit(request, {
      maxRequests: 10,
      windowMs: 300000, // 5 minutes
    })
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many token requests' },
        { 
          status: 429,
          headers: securityHeaders
        }
      )
    }
    
    const token = generateCSRFTokenServer()
    
    return NextResponse.json(
      { csrfToken: token },
      { 
        status: 200,
        headers: {
          ...securityHeaders,
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        }
      }
    )
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { 
        status: 500,
        headers: securityHeaders
      }
    )
  }
}