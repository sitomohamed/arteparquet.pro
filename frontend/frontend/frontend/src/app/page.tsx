import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/sections/hero-section'
import { WhatsAppStrip } from '@/components/sections/whatsapp-strip'
import { TrustBar } from '@/components/sections/trust-bar'
import { ServicesSection } from '@/components/sections/services-section'
import { PortfolioPreview } from '@/components/sections/portfolio-preview'
import { HeritageSection } from '@/components/sections/heritage-section'
import { WhyUsSection } from '@/components/sections/why-us-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ProcessSection } from '@/components/sections/process-section'
import { CtaSection } from '@/components/sections/cta-section'
import { FaqSection } from '@/components/sections/faq-section'

export const metadata: Metadata = {
  title: {
    absolute: 'Arteparquet | Parquettista Bergamo e Milano | Posa Restauro Levigatura',
  },
  description:
    'Parquettista a Bergamo, Milano e in tutta la Lombardia dal 1996. Posa, restauro e levigatura parquet. Sopralluogo gratuito. Preventivo senza impegno.',
  keywords: [
    'parquettista Bergamo',
    'parquettista Milano',
    'posa parquet Bergamo',
    'posa parquet Milano',
    'levigatura parquet Bergamo',
    'levigatura parquet Milano',
    'restauro parquet',
    'levigatura parquet',
    'posa parquet',
    'costo levigatura parquet',
    'parquet massello',
    'parquet prefinito',
    'posatore parquet Lombardia',
    'preventivo parquet gratuito',
    'riparazione parquet rovinato',
    'parquet spina di pesce Bergamo',
  ],
  alternates: { canonical: 'https://arteparquet.pro' },
  openGraph: {
    title: 'Parquettista Bergamo e Milano | Arteparquet dal 1996',
    description: 'Posa, restauro e levigatura parquet a Bergamo, Milano e Lombardia. 30 anni di esperienza. Sopralluogo gratuito.',
    url: 'https://arteparquet.pro',
    locale: 'it_IT',
    type: 'website',
  },
}

const ZONE_CITIES = [
  { city: 'Milano',  slug: 'parquet-milano' },
  { city: 'Bergamo', slug: 'parquet-bergamo' },
  { city: 'Brescia', slug: 'parquet-brescia' },
  { city: 'Como',    slug: 'parquet-como' },
  { city: 'Monza',   slug: 'parquet-monza' },
  { city: 'Varese',  slug: 'parquet-varese' },
  { city: 'Lecco',   slug: 'parquet-lecco' },
  { city: 'Lodi',    slug: 'parquet-lodi' },
  { city: 'Pavia',   slug: 'parquet-pavia' },
  { city: 'Cremona', slug: 'parquet-cremona' },
  { city: 'Mantova', slug: 'parquet-mantova' },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatsAppStrip />
      <TrustBar />
      <ServicesSection />
      <PortfolioPreview />
      <HeritageSection />
      <WhyUsSection />
      <TestimonialsSection />
      <ProcessSection />
      <CtaSection />
      <FaqSection />

      {/* Guide - internal links so Google can crawl /guida from the homepage */}
      <section className="bg-white border-t border-neutral-200 py-12">
        <div className="container-wide">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            Guide al parquet
          </h2>
          <p className="text-center text-neutral-500 text-sm mb-8">
            Scelta, costi, manutenzione e ambienti difficili, spiegati da chi posa parquet dal 1996.
          </p>
          <nav aria-label="Guide al parquet" className="flex flex-wrap justify-center gap-2">
            <Link
              href="/parquet"
              className="px-4 py-2 bg-rovere text-white border border-rovere rounded-full text-sm hover:bg-wood-500 transition-colors"
            >
              Tutte le guide
            </Link>
            {[
              { label: 'Come scegliere', href: '/guida/come-scegliere-parquet' },
              { label: 'Costo levigatura', href: '/guida/costo-levigatura-parquet' },
              { label: 'Massello vs prefinito', href: '/guida/parquet-massello-vs-prefinito' },
              { label: 'Spina di pesce', href: '/guida/parquet-spina-di-pesce' },
              { label: 'Manutenzione', href: '/guida/manutenzione-parquet' },
              { label: 'Riscaldamento a pavimento', href: '/guida/parquet-riscaldamento-pavimento' },
              { label: 'Parquet in bagno', href: '/guida/parquet-bagno' },
              { label: 'Parquet in cucina', href: '/guida/parquet-cucina' },
              { label: 'Levigatura senza polvere', href: '/guida/levigatura-parquet-senza-polvere' },
              { label: 'Restauro fai da te', href: '/guida/restauro-parquet-fai-da-te' },
              { label: 'Scegliere il posatore', href: '/guida/come-scegliere-posatore' },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-700 hover:border-rovere hover:text-rovere transition-colors"
              >
                {guide.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Zone di intervento - local SEO signals for Google */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-12">
        <div className="container-wide">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            Posa Parquet in Lombardia
          </h2>
          <p className="text-center text-neutral-500 text-sm mb-8">
            Sopralluogo e preventivo gratuito in tutta la regione.
          </p>
          <nav aria-label="Città servite" className="flex flex-wrap justify-center gap-2">
            {ZONE_CITIES.map(({ city, slug }) => (
              <Link
                key={city}
                href={`/zone/${slug}`}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-700 hover:border-rovere hover:text-rovere transition-colors"
              >
                Parquet {city}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  )
}
