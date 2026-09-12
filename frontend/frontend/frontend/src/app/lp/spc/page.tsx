import type { Metadata } from 'next'
import { LpB2cShell } from '@/components/landing/lp-b2c-shell'
import { LP_SPC } from '@/components/landing/lp-b2c-content'

export const metadata: Metadata = {
  title: 'Pavimenti SPC impermeabili - Bagno e cucina | Arteparquet',
  description:
    'SPC per bagno e locali umidi: alternativa al parquet. Invia le foto del locale. Valutazione gratuita a Bergamo e in Lombardia.',
  robots: { index: false, follow: false },
}

export default function LpSpcPage() {
  return <LpB2cShell content={LP_SPC} />
}
