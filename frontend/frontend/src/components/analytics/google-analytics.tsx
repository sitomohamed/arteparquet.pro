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
  const granted = Boolean(loadConsent()?.analytics)
  window.gtag?.('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
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
