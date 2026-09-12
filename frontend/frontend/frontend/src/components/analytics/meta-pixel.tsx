'use client'

/**
 * Meta Pixel - Consent-Gated Implementation
 *
 * Loads the Meta Pixel ONLY after the user grants marketing consent.
 * Default state: blocked (no third-party requests to Facebook).
 * Integrates with the arteparquet cookie-consent system.
 *
 * Usage: add <MetaPixel /> inside <body> in layout.tsx (after CookieConsent).
 */

import { useEffect } from 'react'
import { COOKIE_CONSENT_EVENT, loadConsent } from '@/lib/cookie-consent'

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '1083893604335183'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

function loadPixel(pixelId: string) {
  if (!pixelId || typeof window === 'undefined') return
  if (window.fbq) return // already loaded

  // Standard Meta Pixel init snippet (inlined to avoid external script on page load)
  const f = window
  const b = document
  const e = 'script'
  const v = 'https://connect.facebook.net/en_US/fbevents.js'
  const n = b.createElement(e) as HTMLScriptElement
  const t = b.getElementsByTagName(e)[0]

  if (!f.fbq) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const q: unknown[][] = []
    const fbqFn = (...args: unknown[]) => { q.push(args) }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fbq = fbqFn as any
    fbq.queue = q
    fbq.loaded = true
    fbq.version = '2.0'
    window.fbq = fbq
    window._fbq = fbq
  }

  n.async = true
  n.src = v
  if (t.parentNode) t.parentNode.insertBefore(n, t)

  window.fbq!('init', pixelId)
  window.fbq!('track', 'PageView')
}

function handleConsentChange() {
  const consent = loadConsent()
  if (consent?.marketing && META_PIXEL_ID) {
    loadPixel(META_PIXEL_ID)
  }
}

export function MetaPixel() {
  useEffect(() => {
    // Check existing consent on mount
    handleConsentChange()
    // Listen for future consent changes
    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange)
  }, [])

  return null
}

/**
 * Track a custom Meta Pixel event (only fires if pixel is loaded).
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params)
  }
}

/**
 * Track lead generation event (fired on form submission).
 */
export function trackMetaLead(value?: number) {
  trackMetaEvent('Lead', value ? { value, currency: 'EUR' } : undefined)
}

/**
 * Track contact event (fired on phone / WA click).
 */
export function trackMetaContact() {
  trackMetaEvent('Contact')
}
