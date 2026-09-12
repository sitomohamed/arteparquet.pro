import type { Metadata } from 'next'
import { LpB2cShell } from '@/components/landing/lp-b2c-shell'
import { LP_LEVIGATURA } from '@/components/landing/lp-b2c-content'

export const metadata: Metadata = {
  title: 'Levigatura Parquet - Invia le foto | Arteparquet Bergamo',
  description:
    'Parquet opaco o graffiato? Invia le foto. Valutazione gratuita della levigatura a bassa polvere. Bergamo e Lombardia. Senza impegno.',
  robots: { index: false, follow: false },
}

export default function LpLevigaturaPage() {
  return <LpB2cShell content={LP_LEVIGATURA} />
}
