'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { COOKIE_CONSENT_EVENT, loadConsent } from '@/lib/cookie-consent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    function sync() {
      setEnabled(Boolean(loadConsent()?.analytics))
    }

    sync()
    window.addEventListener(COOKIE_CONSENT_EVENT, sync)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync)
  }, [])

  if (!enabled || !GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
