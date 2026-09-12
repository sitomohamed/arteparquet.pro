import { createHash, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const COOKIE = 'ap_crm'

function tokenFromSecret(secret: string) {
  return createHash('sha256').update(`arteparquet-crm:${secret}`).digest('hex').slice(0, 48)
}

export function crmConfigured() {
  return Boolean(process.env.CRM_SECRET)
}

export function crmToken() {
  const secret = process.env.CRM_SECRET
  if (!secret) return null
  return tokenFromSecret(secret)
}

export function checkCrmPassword(password: string) {
  const secret = process.env.CRM_SECRET
  if (!secret || !password) return false
  const a = Buffer.from(tokenFromSecret(password))
  const b = Buffer.from(tokenFromSecret(secret))
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function crmAuthorized() {
  const expected = crmToken()
  if (!expected) return false
  const jar = await cookies()
  const got = jar.get(COOKIE)?.value
  if (!got) return false
  const a = Buffer.from(got)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export { COOKIE as CRM_COOKIE }
