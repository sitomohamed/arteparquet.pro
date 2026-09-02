'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { COOKIE_CONSENT_EVENT, loadConsent } from '@/lib/cookie-consent'
import { META_PIXEL_ID, getFbc, newEventId, readCookie } from '@/lib/analytics'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
  }
}

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
  const skipNextPageView = useRef(true)

  useEffect(() => {
    const sync = () => {
      const next = Boolean(loadConsent()?.marketing)
      setEnabled((prev) => {
        if (next && !prev) skipNextPageView.current = true
        return next
      })
    }
    sync()
    window.addEventListener(COOKIE_CONSENT_EVENT, sync)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    if (skipNextPageView.current) {
      skipNextPageView.current = false
      return
    }
    sendPageView(newEventId())
  }, [pathname, enabled])

  if (!enabled) return null

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          var eventID = (crypto.randomUUID && crypto.randomUUID()) || ('pv_' + Date.now());
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView', {}, { eventID: eventID });
          try {
            var fbp = (document.cookie.match(/(?:^|; )_fbp=([^;]*)/) || [])[1];
            var fbc = (document.cookie.match(/(?:^|; )_fbc=([^;]*)/) || [])[1];
            if (!fbc) {
              var fbclid = new URLSearchParams(location.search).get('fbclid');
              if (fbclid) fbc = 'fb.1.' + Date.now() + '.' + fbclid;
            }
            fetch('/api/meta/capi', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              keepalive: true,
              body: JSON.stringify({
                event_name: 'PageView',
                event_id: eventID,
                event_source_url: location.href,
                fbp: fbp,
                fbc: fbc
              })
            }).catch(function () {});
          } catch (e) {}
        `,
      }}
    />
  )
}
