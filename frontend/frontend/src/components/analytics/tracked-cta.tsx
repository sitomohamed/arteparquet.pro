'use client'

import Link from 'next/link'
import { trackCtaClick, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics'

type CtaType = 'quote_request' | 'phone' | 'whatsapp' | 'contact_form' | 'service_cta'

interface TrackedCtaProps {
  href: string
  location: string
  type?: CtaType
  className?: string
  ariaLabel?: string
  children: React.ReactNode
  external?: boolean
}

export function TrackedCta({
  href,
  location,
  type = 'quote_request',
  className,
  ariaLabel,
  children,
  external,
}: TrackedCtaProps) {
  function handleClick() {
    if (type === 'phone') trackPhoneClick(location)
    else if (type === 'whatsapp') trackWhatsAppClick(location)
    else trackCtaClick(type, location)
  }

  if (external || href.startsWith('tel:') || href.startsWith('https://wa.me')) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel}
        {...(href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
