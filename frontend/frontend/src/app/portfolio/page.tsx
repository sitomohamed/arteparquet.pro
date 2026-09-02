import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Portfolio Lavori Parquet Bergamo',
  description:
    'Galleria lavori Arteparquet: posa a spina di pesce, levigatura e restauro parquet a Bergamo e in Lombardia. Fotografie reali di cantieri.',
  alternates: { canonical: 'https://arteparquet.pro/portfolio' },
  openGraph: {
    title: 'Portfolio Lavori Parquet | Arteparquet',
    description: 'Posa a spina di pesce, levigatura e restauro parquet. Fotografie reali di cantieri a Bergamo e in Lombardia.',
    url: 'https://arteparquet.pro/portfolio',
    locale: 'it_IT',
    type: 'website',
  },
}

// Every entry uses a unique image file — no duplicates
const PROJECTS = [
  { id: 1,  title: 'Spina di Pesce — Finitura Lucida',         category: 'Posa Parquet',        location: 'Bergamo',   surface: '85 mq',           material: 'Massello rovere — spina di pesce con finitura lucida',              year: '2026', image: '/portfolio/google-spina-pesce-finitura-01.jpg',        large: true  },
  { id: 2,  title: 'Levigatura Professionale',                  category: 'Restauro & Levigatura', location: 'Lombardia', surface: '60 mq',           material: 'Levigatura, carteggiatura e rifinitura su parquet esistente',       year: '2026', image: '/portfolio/google-levigatura-mosaico-01.jpg',          large: false },
  { id: 3,  title: 'Posa in Rovere — Camera da Letto',          category: 'Posa Parquet',        location: 'Bergamo',   surface: '30 mq',           material: 'Spina di pesce in corso — camera residenziale',                   year: '2026', image: '/portfolio/google-posa-corridoio-progress-01.jpg',     large: false },
  { id: 4,  title: 'Parquet Listoni — Salone',                  category: 'Posa Parquet',        location: 'Lombardia', surface: '110 mq',          material: 'Listoni in rovere naturale — salone principale',                   year: '2025', image: '/portfolio/google-posa-listoni-01.jpg',                large: false },
  { id: 5,  title: 'Bordo e Intarsio Perimetrale',              category: 'Lavorazione Speciale', location: 'Bergamo',   surface: 'Decorazione',     material: 'Fascia perimetrale e filetto bianco incastonato',                  year: '2025', image: '/portfolio/google-parquet-bordo-intarsio-01.jpg',      large: false },
  { id: 6,  title: 'Posa in Rovere Naturale — Stanza',          category: 'Posa Parquet',        location: 'Bergamo',   surface: '40 mq',           material: 'Spina di pesce in rovere naturale — residenziale',                year: '2025', image: '/portfolio/google-spina-pesce-stanza-01.jpg',          large: false },
  { id: 7,  title: 'Parquet Mosaico — Ristrutturazione',        category: 'Posa Parquet',        location: 'Bergamo',   surface: 'Residenziale',    material: 'Mosaico a scacchi con finitura lucida',                           year: '2024', image: '/portfolio/google-mosaico-ristrutturazione-01.jpg',    large: false },
  { id: 8,  title: 'Spina di Pesce — Cantiere in Corso',        category: 'Posa Parquet',        location: 'Lombardia', surface: 'Residenziale',    material: 'Posa in rovere chiaro durante i lavori',                          year: '2024', image: '/portfolio/google-spina-pesce-cantiere-01.jpg',        large: false },
  { id: 9,  title: 'Posa con Laser e Preparazione Collante',    category: 'Posa Parquet',        location: 'Lombardia', surface: 'Residenziale',    material: 'Posa professionale con laser e preparazione collante',             year: '2024', image: '/portfolio/google-posa-spina-pesce-lavori-01.jpg',     large: false },
  { id: 10, title: 'Spina di Pesce — Rovere Naturale',          category: 'Posa Parquet',        location: 'Bergamo',   surface: 'Residenziale',    material: 'Spina di pesce completata in rovere naturale',                    year: '2024', image: '/portfolio/google-spina-pesce-rovere-01.jpg',          large: false },
  { id: 11, title: 'Parquet Sala con Archi',                    category: 'Posa Parquet',        location: 'Lombardia', surface: 'Ampia sala',      material: 'Listoni chiari in sala con aperture ad arco',                     year: '2023', image: '/portfolio/google-parquet-sala-archi-01.jpg',          large: false },
  { id: 12, title: 'Parquet Corridoio — Listoni Chiari',        category: 'Posa Parquet',        location: 'Lombardia', surface: 'Corridoio',       material: 'Listoni chiari — corridoio residenziale',                         year: '2023', image: '/portfolio/google-parquet-corridoio-01.jpg',           large: false },
  { id: 13, title: 'Spina di Pesce — Corridoio Continuo',       category: 'Posa Parquet',        location: 'Bergamo',   surface: 'Corridoio',       material: 'Spina di pesce continua su corridoio e stanze adiacenti',         year: '2023', image: '/portfolio/google-spina-pesce-corridoio-01.jpg',       large: false },
  { id: 14, title: 'Verniciatura Parquet Mosaico',              category: 'Restauro & Levigatura', location: 'Lombardia', surface: 'Residenziale',  material: 'Applicazione vernice a base acqua su parquet mosaico',             year: '2023', image: '/portfolio/google-verniciatura-mosaico-01.jpg',        large: false },
  { id: 15, title: 'Parquet e Scala — Listoni',                 category: 'Posa Parquet',        location: 'Lombardia', surface: 'Villa',           material: 'Listoni in rovere con scala e ringhiera in ferro',                year: '2022', image: '/portfolio/google-parquet-scala-01.jpg',               large: false },
  { id: 16, title: 'Parquet con Vista Cortile',                 category: 'Posa Parquet',        location: 'Lombardia', surface: 'Edificio storico', material: 'Listoni in ambiente con archi e cortile interno',                year: '2022', image: '/portfolio/google-parquet-cortile-archi-01.jpg',       large: false },
  { id: 17, title: 'Spina di Pesce con Bordo — Lucido',        category: 'Lavorazione Speciale', location: 'Bergamo',   surface: 'Residenziale',    material: 'Spina di pesce con bordo perimetrale e finitura lucida',          year: '2022', image: '/portfolio/google-spina-pesce-lucida-01.jpg',          large: false },
  { id: 18, title: 'Verniciatura Ecologica — Mosaico',          category: 'Restauro & Levigatura', location: 'Bergamo',  surface: 'Residenziale',   material: 'Verniciatura ecologica a basso VOC su parquet mosaico',           year: '2022', image: '/portfolio/google-verniciatura-ecostar-01.jpg',        large: false },
  { id: 19, title: 'Raccordo Graniglia e Parquet',              category: 'Lavorazione Speciale', location: 'Lombardia', surface: 'Appartamento',   material: 'Raccordo artigianale tra pavimento in graniglia e parquet',        year: '2022', image: '/portfolio/google-corridoio-graniglia-parquet-01.jpg', large: false },
]

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-nero-marquina pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">Portfolio</span>
            <h1
              className="font-serif font-semibold text-white mb-5 text-balance"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              Ogni progetto è un'opera.
            </h1>
            <p className="font-sans text-white/65 max-w-xl leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Da ville private a hotel di lusso, ogni spazio racconta una storia di trasformazione.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-travertino">
        <div className="container-wide py-20 md:py-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {PROJECTS.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.06} direction="up" className={project.large ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <Link
                  href="/contatti"
                  aria-label={`Richiedi un progetto simile a ${project.title}`}
                  className="block"
                >
                  <div className="group relative overflow-hidden rounded-2xl cursor-pointer bg-wood-100" style={{ aspectRatio: '4/3' }}>
                    {/* Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      style={{ backgroundImage: `url(${project.image})` }}
                      role="img"
                      aria-label={project.title}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina via-nero-marquina/25 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-400" />
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                      <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-widest text-rovere mb-1.5">
                        {project.category} • {project.year}
                      </span>
                      <h2 className="font-serif font-semibold text-white text-[1.125rem] leading-tight mb-1">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-1 text-white/45 mb-3">
                        <MapPin size={11} aria-hidden="true" />
                        <span className="font-sans text-[11px]">{project.location} — {project.surface}</span>
                      </div>
                      <p className="font-sans text-[12px] text-white/55 mb-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {project.material}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 group-hover:text-rovere">
                        Vuoi un risultato simile? <ArrowRight size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Bottom CTA */}
          <FadeIn direction="up" delay={0.3} className="text-center mt-16">
            <p className="font-sans text-[16px] text-neutral-500 mb-6">
              Hai un progetto in mente? Raccontacelo.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-rovere text-white font-sans text-[15px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all"
            >
              Richiedi Preventivo Gratuito
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
