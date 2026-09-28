'use client'

import { useEffect } from 'react'
import { COOKIE_CONSENT_EVENT, loadConsent } from '@/lib/cookie-consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function applyAnalyticsConsent() {
  const consent = loadConsent()
  if (!consent || !window.gtag) return
  const ads = consent.marketing ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  })
}

/** Updates GA Consent Mode after the cookie banner choice. The tag itself is in the root layout. */
export function GoogleAnalyticsConsent() {
  useEffect(() => {
    applyAnalyticsConsent()
    window.addEventListener(COOKIE_CONSENT_EVENT, applyAnalyticsConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, applyAnalyticsConsent)
  }, [])

  return null
}
