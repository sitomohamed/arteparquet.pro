export const COOKIE_CONSENT_KEY = 'arteparquet_cookie_consent'
export const COOKIE_CONSENT_EVENT = 'arteparquet-cookie-consent'
export const CONSENT_EXPIRY_DAYS = 365

export interface ConsentData {
  timestamp: number
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export function loadConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!raw) return null
    const data: ConsentData = JSON.parse(raw)
    const ageDays = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24)
    if (ageDays > CONSENT_EXPIRY_DAYS) return null
    return data
  } catch {
    return null
  }
}

export function saveConsent(data: Omit<ConsentData, 'timestamp'>): ConsentData {
  const full: ConsentData = { ...data, timestamp: Date.now() }
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(full))
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: full }))
  return full
}
