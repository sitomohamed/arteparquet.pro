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
  const analytics = Boolean(consent?.analytics)
  const marketing = Boolean(consent?.marketing)
  window.gtag?.('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
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
