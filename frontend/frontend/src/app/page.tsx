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
    absolute: 'Parquettista Bergamo e Milano | Posa Restauro Levigatura Parquet dal 1996 | Arteparquet',
  },
  description:
    'Parquettista a Bergamo, Milano e in tutta la Lombardia dal 1996. Posa, restauro e levigatura parquet. Sopralluogo gratuito. Preventivo senza impegno. ☎ 389 240 7827 — risposta in 5 minuti.',
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

      {/* Zone di intervento — local SEO signals for Google */}
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
