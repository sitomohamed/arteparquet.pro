import type { Metadata } from 'next'
import { LpB2cShell } from '@/components/landing/lp-b2c-shell'
import { LP_RESTAURO } from '@/components/landing/lp-b2c-content'

export const metadata: Metadata = {
  title: 'Restauro Parquet - Recupero pavimento rovinato | Arteparquet',
  description:
    'Parquet antico o rovinato? Invia le foto. Valutiamo se si può recuperare. Restauro a Bergamo e in Lombardia. Senza impegno.',
  robots: { index: false, follow: false },
}

export default function LpRestauroPage() {
  return <LpB2cShell content={LP_RESTAURO} />
}
