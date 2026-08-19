import { NextRequest, NextResponse } from 'next/server'
import { notifyIndexNow } from '@/lib/indexnow'
import { checkRateLimit, getApiSecurityHeaders } from '@/lib/security'

/**
 * API route to notify IndexNow about updated URLs
 * POST /api/indexnow
 * Body: { urls: string[] }
 */
export async function POST(request: NextRequest) {
  const securityHeaders = getApiSecurityHeaders()
  
  try {
    // Rate limiting to prevent abuse
    const rateLimit = checkRateLimit(request, {
      maxRequests: 5,
      windowMs: 3600000, // 1 hour
    })
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: securityHeaders
        }
      )
    }

    const body = await request.json().catch(() => {
      throw new Error('Invalid JSON')
    })
    
    const { urls } = body

    // Validate URLs array
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Invalid URLs array' }, 
        { status: 400, headers: securityHeaders }
      )
    }
    
    // Limit number of URLs per request
    if (urls.length > 50) {
      return NextResponse.json(
        { error: 'Too many URLs (max 50 per request)' },
        { status: 400, headers: securityHeaders }
      )
    }
    
    // Validate URL format and domain
    const validUrls = urls.filter((url: string) => {
      try {
        const parsed = new URL(url)
        return parsed.hostname === 'arteparquet.pro' && 
               (parsed.protocol === 'https:' || parsed.protocol === 'http:')
      } catch {
        return false
      }
    })
    
    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid arteparquet.pro URLs provided' },
        { status: 400, headers: securityHeaders }
      )
    }

    await notifyIndexNow(validUrls)

    return NextResponse.json({
      success: true,
      message: `Notified ${validUrls.length} URL(s) to IndexNow`,
      urls: validUrls,
    }, {
      status: 200,
      headers: securityHeaders
    })
  } catch (error) {
    console.error('IndexNow API error:', error)
    return NextResponse.json(
      { error: 'Failed to notify IndexNow' }, 
      { status: 500, headers: securityHeaders }
    )
  }
}

/**
 * Notify all main pages (useful for initial setup)
 * POST /api/indexnow?all=true
 */
export async function GET(request: NextRequest) {
  const securityHeaders = getApiSecurityHeaders()
  const notifyAll = request.nextUrl.searchParams.get('all') === 'true'

  // Rate limiting for GET requests too
  const rateLimit = checkRateLimit(request, {
    maxRequests: 2,
    windowMs: 3600000, // 1 hour
  })
  
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { 
        status: 429,
        headers: securityHeaders
      }
    )
  }

  if (!notifyAll) {
    return NextResponse.json(
      { message: 'Use POST method to notify specific URLs' },
      { status: 200, headers: securityHeaders }
    )
  }

  const allUrls = [
    'https://arteparquet.pro/',
    'https://arteparquet.pro/contatti',
    'https://arteparquet.pro/servizi',
    'https://arteparquet.pro/portfolio',
    'https://arteparquet.pro/chi-siamo',
    'https://arteparquet.pro/blog',
    'https://arteparquet.pro/faq',
    // Add all service pages
    'https://arteparquet.pro/servizi/posa',
    'https://arteparquet.pro/servizi/restauro',
    'https://arteparquet.pro/servizi/levigatura',
    'https://arteparquet.pro/servizi/spc',
    'https://arteparquet.pro/servizi/laminato',
    'https://arteparquet.pro/servizi/pvc',
    'https://arteparquet.pro/servizi/vinilico',
    'https://arteparquet.pro/servizi/parquet-massello',
    'https://arteparquet.pro/servizi/parquet-prefinito',
    'https://arteparquet.pro/servizi/parquet-tradizionale',
    'https://arteparquet.pro/servizi/riparazioni',
    // Add all zone pages
    'https://arteparquet.pro/zone/parquet-milano',
    'https://arteparquet.pro/zone/parquet-bergamo',
    'https://arteparquet.pro/zone/parquet-brescia',
    'https://arteparquet.pro/zone/parquet-como',
    'https://arteparquet.pro/zone/parquet-monza',
    'https://arteparquet.pro/zone/parquet-varese',
    'https://arteparquet.pro/zone/parquet-lecco',
    'https://arteparquet.pro/zone/parquet-lodi',
    'https://arteparquet.pro/zone/parquet-pavia',
    'https://arteparquet.pro/zone/parquet-cremona',
    'https://arteparquet.pro/zone/parquet-mantova',
  ]

  try {
    await notifyIndexNow(allUrls)
    return NextResponse.json({
      success: true,
      message: `Notified all ${allUrls.length} URLs to IndexNow`,
      count: allUrls.length,
    })
  } catch (error) {
    console.error('IndexNow bulk notification error:', error)
    return NextResponse.json({ error: 'Failed to notify IndexNow' }, { status: 500 })
  }
}
