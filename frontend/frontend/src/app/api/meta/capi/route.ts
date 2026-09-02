import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit, getApiSecurityHeaders } from '@/lib/security'
import { capiUserFromRequest, sendMetaCapiEvent } from '@/lib/meta-capi'

export const runtime = 'nodejs'

const ALLOWED_EVENTS = ['PageView', 'Lead', 'Contact', 'ViewContent'] as const

const schema = z.object({
  event_name: z.enum(ALLOWED_EVENTS),
  event_id: z.string().min(8).max(64),
  event_source_url: z.string().url().max(2048).optional(),
  fbp: z.string().max(128).optional(),
  fbc: z.string().max(256).optional(),
  email: z.string().email().max(254).optional(),
  phone: z.string().min(8).max(20).optional(),
  firstName: z.string().min(1).max(100).optional(),
  custom_data: z
    .record(z.union([z.string().max(200), z.number(), z.boolean()]))
    .optional(),
})

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const allowed = [
    'https://arteparquet.pro',
    'https://www.arteparquet.pro',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]
  if (origin && allowed.includes(origin)) return true
  if (process.env.NODE_ENV !== 'production' && !origin) return true
  const referer = request.headers.get('referer') || ''
  return allowed.some((base) => referer.startsWith(`${base}/`) || referer === base)
}

export async function POST(request: NextRequest) {
  const securityHeaders = getApiSecurityHeaders()

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ ok: false }, { status: 403, headers: securityHeaders })
  }

  const rateLimit = checkRateLimit(request, {
    maxRequests: 40,
    windowMs: 60_000,
    namespace: 'meta-capi',
  })

  if (!rateLimit.allowed) {
    return NextResponse.json({ ok: false }, { status: 429, headers: securityHeaders })
  }

  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400, headers: securityHeaders })
  }

  const data = parsed.data

  await sendMetaCapiEvent({
    eventName: data.event_name,
    eventId: data.event_id,
    eventSourceUrl: data.event_source_url,
    customData: data.custom_data,
    user: capiUserFromRequest(request, {
      fbp: data.fbp,
      fbc: data.fbc,
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
    }),
  })

  return NextResponse.json({ ok: true }, { status: 200, headers: securityHeaders })
}
