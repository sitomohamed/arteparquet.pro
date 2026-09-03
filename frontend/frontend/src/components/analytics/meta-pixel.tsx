'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { COOKIE_CONSENT_EVENT, loadConsent } from '@/lib/cookie-consent'
import { getFbc, newEventId, readCookie } from '@/lib/analytics'

function sendPageView(eventID: string) {
  window.fbq?.('track', 'PageView', {}, { eventID })
  fetch('/api/meta/capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      event_name: 'PageView',
      event_id: eventID,
      event_source_url: window.location.href,
      fbp: readCookie('_fbp'),
      fbc: getFbc(),
    }),
  }).catch(() => {})
}

export function MetaPixel() {
  const [enabled, setEnabled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const sync = () => {
      const next = Boolean(loadConsent()?.marketing)
      if (!next) window.fbq?.('consent', 'revoke')
      setEnabled(next)
    }
    sync()
    window.addEventListener(COOKIE_CONSENT_EVENT, sync)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    window.fbq?.('consent', 'grant')
    sendPageView(newEventId())
  }, [pathname, enabled])

  return null
}
