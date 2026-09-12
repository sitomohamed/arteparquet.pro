export const CTA_AB_COOKIE = 'ap_cta_ab'

export type CtaAbVariant = 'a' | 'b'

export const CTA_AB = {
  a: { label: 'Invia le foto', href: '/invia-foto' },
  b: { label: 'Preventivo gratuito', href: '/invia-foto' },
} as const
