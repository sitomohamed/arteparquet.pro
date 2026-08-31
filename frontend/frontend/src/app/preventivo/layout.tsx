import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preventivo Parquet Gratuito | Sopralluogo Bergamo e Lombardia',
  description:
    'Richiedi un preventivo parquet gratuito in 2 minuti. Sopralluogo senza impegno a Bergamo e in Lombardia. Valutazione anche via WhatsApp con foto.',
  alternates: { canonical: 'https://arteparquet.pro/preventivo' },
}

export default function PreventivoLayout({ children }: { children: React.ReactNode }) {
  return children
}
