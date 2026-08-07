import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/faq-section'
import { CtaSection } from '@/components/sections/cta-section'
import { FadeIn } from '@/components/animations/fade-in'
import { FaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'FAQ | Domande Frequenti sul Parquet',
  description:
    'Risposte alle domande più comuni: costi, tempi, garanzie, zone di intervento, restauro parquet. Tutto quello che devi sapere su Arteparquet.',
}

export default function FaqPage() {
  return (
    <>
      <FaqSchema />
      <section className="bg-nero-marquina pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">FAQ</span>
            <h1
              className="font-serif font-semibold text-white mb-5 text-balance"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              Domande Frequenti.
            </h1>
            <p className="font-sans text-white/65 max-w-lg leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Tutto quello che devi sapere prima di iniziare il tuo progetto parquet.
            </p>
          </FadeIn>
        </div>
      </section>
      <FaqSection />
      <CtaSection />
    </>
  )
}
