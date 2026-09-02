import { createHash } from 'crypto'
import type { NextRequest } from 'next/server'
import { getClientIP } from '@/lib/security'

export const META_PIXEL_ID =
  process.env.META_PIXEL_ID ||
  process.env.NEXT_PUBLIC_META_PIXEL_ID ||
  '1083893604335183'

const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || 'v21.0'

export type MetaCapiUserData = {
  email?: string
  phone?: string
  firstName?: string
  fbp?: string
  fbc?: string
  clientIp?: string
  clientUserAgent?: string
}

export type MetaCapiEvent = {
  eventName: string
  eventId: string
  eventSourceUrl?: string
  customData?: Record<string, string | number | boolean>
  user: MetaCapiUserData
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function hashEmail(email: string): string {
  return sha256(email.trim().toLowerCase())
}

function hashPhone(phone: string): string {
  let digits = phone.replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = digits.replace(/^0+/, '')
  if (!digits.startsWith('39') && digits.length >= 9 && digits.length <= 11) {
    digits = `39${digits}`
  }
  return sha256(digits)
}

function hashNamePart(value: string): string {
  return sha256(
    value
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\s]/gu, '')
      .replace(/\s+/g, '')
  )
}

function isPublicIp(ip: string | undefined): ip is string {
  if (!ip) return false
  if (ip === '127.0.0.1' || ip === '::1' || ip === '0.0.0.0') return false
  if (ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('127.')) return false
  return true
}

export function capiUserFromRequest(
  request: NextRequest,
  extra?: Omit<MetaCapiUserData, 'clientIp' | 'clientUserAgent'>
): MetaCapiUserData {
  return {
    ...extra,
    clientIp: getClientIP(request),
    clientUserAgent: request.headers.get('user-agent') || undefined,
  }
}

/**
 * Direct Conversions API only (`/{pixel_id}/events`).
 * Does not call Dataset Quality API.
 */
export async function sendMetaCapiEvent(event: MetaCapiEvent): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!token) return

  const nameParts = (event.user.firstName || '').trim().split(/\s+/).filter(Boolean)
  const user_data: Record<string, string> = {
    country: sha256('it'),
  }

  if (event.user.email) user_data.em = hashEmail(event.user.email)
  if (event.user.phone) user_data.ph = hashPhone(event.user.phone)
  if (nameParts[0]) user_data.fn = hashNamePart(nameParts[0])
  if (nameParts.length > 1) user_data.ln = hashNamePart(nameParts.slice(1).join(' '))
  if (isPublicIp(event.user.clientIp)) user_data.client_ip_address = event.user.clientIp
  if (event.user.clientUserAgent) user_data.client_user_agent = event.user.clientUserAgent
  if (event.user.fbp) user_data.fbp = event.user.fbp
  if (event.user.fbc) user_data.fbc = event.user.fbc

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: 'website',
        ...(event.eventSourceUrl ? { event_source_url: event.eventSourceUrl } : {}),
        user_data,
        ...(event.customData && Object.keys(event.customData).length > 0
          ? { custom_data: event.customData }
          : {}),
      },
    ],
    access_token: token,
  }

  const testCode = process.env.META_CAPI_TEST_EVENT_CODE
  if (testCode) payload.test_event_code = testCode

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )
    if (!res.ok) {
      const text = await res.text()
      console.error('Meta CAPI error', res.status, text.slice(0, 400))
    }
  } catch {
    console.error('Meta CAPI request failed')
  }
}
