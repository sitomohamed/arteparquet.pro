import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/sections/hero-section'
import { TrustBar } from '@/components/sections/trust-bar'
import { ServicesSection } from '@/components/sections/services-section'
import { PortfolioPreview } from '@/components/sections/portfolio-preview'
import { ScalaStory } from '@/components/sections/scala-story'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ProcessSection } from '@/components/sections/process-section'
import { CtaSection } from '@/components/sections/cta-section'
import { FaqSection } from '@/components/sections/faq-section'

export const metadata: Metadata = {
  title: 'Arteparquet | Posa e Restauro Parquet in Italia — Dal 1996',
  description:
    'Specialisti in posa, restauro e levigatura parquet dal 1996. SPC, PVC, laminati. Ex team Teatro alla Scala di Milano. Operiamo in tutta Italia. Sopralluogo e preventivo gratuiti. ☎ 389 240 7827',
  keywords: [
    'posa parquet',
    'restauro parquet',
    'levigatura parquet',
    'parquet massello',
    'parquet prefinito',
    'posatore parquet',
    'posa parquet Bergamo',
    'posa parquet Milano',
    'parquet Italia',
    'SPC PVC laminato',
    'parquet Teatro alla Scala',
    'preventivo parquet gratuito',
  ],
  alternates: { canonical: 'https://arteparquet.pro', languages: { 'it-IT': 'https://arteparquet.pro' } },
  openGraph: {
    title: 'Arteparquet | Maestri del Parquet — Ex Team Teatro alla Scala',
    description: 'Posa, restauro e parquet premium in tutta Italia. Dal 1996. Preventivo gratuito.',
    url: 'https://arteparquet.pro',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'it_IT',
    type: 'website',
  },
}

const ZONE_CITIES = [
  { city: 'Milano',  slug: 'posa-parquet-milano' },
  { city: 'Bergamo', slug: 'parquet-bergamo' },
  { city: 'Brescia', slug: 'parquet-brescia' },
  { city: 'Como',    slug: 'parquet-como' },
  { city: 'Monza',   slug: 'parquet-monza' },
  { city: 'Varese',  slug: 'parquet-varese' },
  { city: 'Lecco',   slug: 'parquet-lecco' },
  { city: 'Lodi',    slug: 'parquet-lodi' },
  { city: 'Pavia',   slug: 'parquet-pavia' },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <PortfolioPreview />
      <ScalaStory />
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
