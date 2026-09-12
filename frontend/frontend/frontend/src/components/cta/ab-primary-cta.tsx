'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CTA_AB, CTA_AB_COOKIE, type CtaAbVariant } from '@/lib/cta-ab'
import { trackEvent } from '@/lib/analytics'

function readVariant(): CtaAbVariant {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CTA_AB_COOKIE}=([^;]*)`))
  const existing = match?.[1]
  if (existing === 'a' || existing === 'b') return existing
  const next: CtaAbVariant = Math.random() < 0.5 ? 'a' : 'b'
  document.cookie = `${CTA_AB_COOKIE}=${next}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`
  return next
}

export function AbPrimaryCta({
  className,
  location,
  onNavigate,
}: {
  className?: string
  location: string
  onNavigate?: () => void
}) {
  const [variant, setVariant] = useState<CtaAbVariant | null>(null)

  useEffect(() => {
    const v = readVariant()
    setVariant(v)
    trackEvent('cta_ab_view', { cta_ab: v, cta_location: location })
  }, [location])

  if (!variant) {
    return (
      <span className={className} aria-hidden="true">
        Invia le foto
      </span>
    )
  }

  const cta = CTA_AB[variant]
  return (
    <Link
      href={cta.href}
      className={className}
      onClick={() => {
        trackEvent('cta_ab_click', { cta_ab: variant, cta_location: location, cta_label: cta.label })
        onNavigate?.()
      }}
    >
      {cta.label}
    </Link>
  )
}
