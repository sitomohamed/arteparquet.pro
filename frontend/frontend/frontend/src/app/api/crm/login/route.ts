import { NextRequest, NextResponse } from 'next/server'
import { checkCrmPassword, CRM_COOKIE, crmConfigured, crmToken } from '@/lib/crm-auth'
import { getApiSecurityHeaders } from '@/lib/security'

export async function POST(req: NextRequest) {
  const headers = getApiSecurityHeaders()
  if (!crmConfigured()) {
    return NextResponse.json(
      { error: 'CRM_SECRET non configurato sul server.' },
      { status: 503, headers }
    )
  }
  const body = (await req.json().catch(() => null)) as { password?: string } | null
  if (!checkCrmPassword(body?.password ?? '')) {
    return NextResponse.json({ error: 'Password non valida.' }, { status: 401, headers })
  }
  const res = NextResponse.json({ ok: true }, { headers })
  res.cookies.set(CRM_COOKIE, crmToken()!, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  })
  return res
}
