import type { Metadata } from 'next'
import { Award, Heart, Shield, Zap } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { HeritageSection } from '@/components/sections/heritage-section'
import { CtaSection } from '@/components/sections/cta-section'
import { PersonSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: {
    absolute: 'Chi Siamo | Arteparquet — Parquettista dal 1996',
  },
  description:
    'Mohamed Arabi, maestro parquettista dal 1996. Nel 2004 al Teatro alla Scala di Milano. Posa, restauro e levigatura parquet in Lombardia.',
  keywords: ['parquettista Bergamo', 'esperto parquet', 'posatore parquet Bergamo', 'storia Arteparquet', 'Mohamed Arabi parquet'],
  alternates: { canonical: 'https://arteparquet.pro/chi-siamo' },
  openGraph: {
    title: 'Chi Siamo | Arteparquet — Parquettista dal 1996',
    description: 'Mohamed Arabi, maestro parquettista dal 1996. Nel 2004 al Teatro alla Scala di Milano. Posa, restauro e levigatura parquet in Lombardia.',
    url: 'https://arteparquet.pro/chi-siamo',
    locale: 'it_IT',
    type: 'website',
  },
}

const VALUES = [
  { icon: Award, title: 'Eccellenza', description: 'Ogni progetto riceve la stessa cura riservata alle opere d\'arte. Non scendi a compromessi sul legno.' },
  { icon: Shield, title: 'Trasparenza', description: 'Preventivi chiari e dettagliati. Il prezzo concordato è quello finale. Nessuna sorpresa.' },
  { icon: Heart, title: 'Passione', description: 'Il legno è una vocazione, non un mestiere. Si sente in ogni listello posato con cura.' },
  { icon: Zap, title: 'Rispetto', description: 'Per il legno, per il tuo spazio, per la tua casa. Cantiere in ordine, sempre.' },
]

export default function ChiSiamoPage() {
  return (
    <>
      <PersonSchema />

      {/* Hero */}
      <section className="relative bg-nero-marquina overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=1400&q=60)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nero-marquina to-nero-marquina/80" aria-hidden="true" />
        <div className="relative z-10 container-wide">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              Chi Siamo
            </span>
            <h1
              className="font-serif font-semibold text-white mb-5 text-balance max-w-2xl"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
            >
              Una storia artigianale<br />
              <em className="not-italic text-rovere">costruita dal 1996.</em>
            </h1>
            <p className="font-sans text-white/60 max-w-xl leading-[1.8]"
              style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)' }}
            >
              Mohamed Arabi è un maestro posatore di parquet con quasi trent&apos;anni
              di esperienza sul campo. Nel 2004 fa parte del team coinvolto nei lavori
              al Teatro alla Scala di Milano. Oggi è al tuo servizio in Lombardia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Heritage timeline — same premium component as homepage */}
      <HeritageSection />

      {/* Values */}
      <section className="bg-white">
        <div className="container-wide py-24 md:py-28">
          <FadeIn direction="up" className="text-center mb-14">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">I Nostri Valori</span>
            <h2 className="font-serif font-semibold text-legno-bruciato" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              Ciò in cui crediamo.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <FadeIn key={v.title} delay={i * 0.1} direction="up">
                  <div className="p-6 rounded-2xl border border-neutral-100 hover:border-wood-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-wood-50 ring-1 ring-wood-100 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-rovere" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif font-semibold text-legno-bruciato text-[1.125rem] mb-2">{v.title}</h3>
                    <p className="font-sans text-[13.5px] text-neutral-500 leading-[1.7]">{v.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="bg-travertino border-t border-neutral-100">
        <div className="container-wide py-10 text-center">
          <a
            href="https://www.google.com/maps/search/Arteparquet+Di+Arabi+Mohamed+Bergamo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans text-[14px] text-rovere hover:text-wood-600 transition-colors font-semibold"
          >
            <span>★★★★★</span>
            <span>Leggi le recensioni su Google →</span>
          </a>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
