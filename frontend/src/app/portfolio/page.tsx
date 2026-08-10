import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Portfolio Lavori Parquet | Posa e Restauro a Bergamo e Milano',
  description:
    'Galleria dei lavori Arteparquet: posa spina di pesce, levigatura, intarsi, restauro parquet a Bergamo e in Lombardia. Fotografie autentiche di cantieri reali.',
  alternates: { canonical: 'https://arteparquet.pro/portfolio' },
}

const PROJECTS = [
  { id: 1, title: 'Parquet a Spina di Pesce — Rovere', category: 'Posa Parquet', location: 'Bergamo', surface: '85 mq', material: 'Parquet massello rovere — posa a spina di pesce con finitura lucida', year: '2026', image: '/portfolio/parquet-spina-pesce-01.jpg', large: true },
  { id: 2, title: 'Levigatura Professionale — Parquet Esistente', category: 'Restauro & Levigatura', location: 'Lombardia', surface: '60 mq', material: 'Levigatura, carteggiatura e rifinitura su parquet esistente', year: '2026', image: '/portfolio/levigatura-parquet-01.jpg', large: false },
  { id: 3, title: 'Posa Parquet Iroko — Camera da Letto', category: 'Posa Parquet', location: 'Bergamo', surface: '30 mq', material: 'Parquet iroko posa dritta — camera da letto residenziale', year: '2026', image: '/portfolio/posa-parquet-camera-01.jpg', large: false },
  { id: 4, title: 'Parquet Merbau — Finitura Lucida', category: 'Posa Parquet', location: 'Lombardia', surface: '110 mq', material: 'Parquet merbau con finitura lucida a olio — salone principale', year: '2025', image: '/portfolio/parquet-rovere-01.jpg', large: false },
  { id: 5, title: 'Intarsio a Stella — Lavoro Artigianale', category: 'Lavorazione Speciale', location: 'Bergamo', surface: 'Decorazione', material: 'Intarsio geometrico a stella su parquet massello scuro', year: '2025', image: '/portfolio/intarsio-stella-01.jpg', large: false },
  { id: 6, title: 'Posa Parquet Mansarda — Rovere Naturale', category: 'Posa Parquet', location: 'Bergamo', surface: '40 mq', material: 'Parquet prefinito rovere naturale — posa dritta in mansarda', year: '2025', image: '/portfolio/spina-pesce-camino-01.jpg', large: false },
  { id: 7, title: 'Parquet Mosaico — Ristrutturazione', category: 'Posa Parquet', location: 'Bergamo', surface: 'Residenziale', material: 'Parquet mosaico a scacchi con finitura lucida', year: '2024', image: '/portfolio/google-mosaico-ristrutturazione-01.jpg', large: false },
  { id: 8, title: 'Spina di Pesce — Cantiere in Corso', category: 'Posa Parquet', location: 'Lombardia', surface: 'Residenziale', material: 'Posa a spina di pesce in rovere chiaro durante i lavori', year: '2024', image: '/portfolio/google-spina-pesce-cantiere-01.jpg', large: false },
  { id: 9, title: 'Parquet con Bordo e Intarsio', category: 'Lavorazione Speciale', location: 'Bergamo', surface: 'Salone', material: 'Parquet con fascia perimetrale e filetto bianco', year: '2024', image: '/portfolio/google-parquet-bordo-intarsio-01.jpg', large: false },
  { id: 10, title: 'Posa Spina di Pesce — Lavori', category: 'Posa Parquet', location: 'Lombardia', surface: 'Residenziale', material: 'Posa professionale con laser e preparazione collante', year: '2024', image: '/portfolio/google-posa-spina-pesce-lavori-01.jpg', large: false },
  { id: 11, title: 'Spina di Pesce — Rovere Naturale', category: 'Posa Parquet', location: 'Bergamo', surface: 'Residenziale', material: 'Parquet a spina di pesce in rovere naturale', year: '2024', image: '/portfolio/google-spina-pesce-rovere-01.jpg', large: false },
  { id: 12, title: 'Parquet Sala con Archi', category: 'Posa Parquet', location: 'Lombardia', surface: 'Ampia sala', material: 'Parquet listoni chiari in sala con aperture ad arco', year: '2023', image: '/portfolio/google-parquet-sala-archi-01.jpg', large: false },
  { id: 13, title: 'Levigatura Parquet Mosaico', category: 'Restauro & Levigatura', location: 'Bergamo', surface: 'Residenziale', material: 'Levigatura professionale su parquet mosaico esistente', year: '2023', image: '/portfolio/google-levigatura-mosaico-01.jpg', large: false },
  { id: 14, title: 'Parquet Corridoio — Listoni', category: 'Posa Parquet', location: 'Lombardia', surface: 'Corridoio', material: 'Posa dritta in listoni chiari — corridoio residenziale', year: '2023', image: '/portfolio/google-parquet-corridoio-01.jpg', large: false },
  { id: 15, title: 'Spina di Pesce — Corridoio', category: 'Posa Parquet', location: 'Bergamo', surface: 'Corridoio', material: 'Posa a spina di pesce continua su corridoio e stanze', year: '2023', image: '/portfolio/google-spina-pesce-corridoio-01.jpg', large: false },
  { id: 16, title: 'Spina di Pesce — Stanza', category: 'Posa Parquet', location: 'Lombardia', surface: 'Residenziale', material: 'Parquet a spina di pesce appena posato', year: '2023', image: '/portfolio/google-spina-pesce-stanza-01.jpg', large: false },
  { id: 17, title: 'Posa in Progress — Corridoio', category: 'Posa Parquet', location: 'Bergamo', surface: 'Corridoio', material: 'Posa a spina di pesce in corso su sottofondo', year: '2023', image: '/portfolio/google-posa-corridoio-progress-01.jpg', large: false },
  { id: 18, title: 'Verniciatura Parquet Mosaico', category: 'Restauro & Levigatura', location: 'Lombardia', surface: 'Residenziale', material: 'Applicazione vernice e finitura su parquet mosaico', year: '2023', image: '/portfolio/google-verniciatura-mosaico-01.jpg', large: false },
  { id: 19, title: 'Parquet e Scala — Listoni', category: 'Posa Parquet', location: 'Lombardia', surface: 'Villa', material: 'Parquet chiaro in listoni con scala e ringhiera', year: '2022', image: '/portfolio/google-parquet-scala-01.jpg', large: false },
  { id: 20, title: 'Spina di Pesce — Finitura', category: 'Posa Parquet', location: 'Bergamo', surface: 'Residenziale', material: 'Parquet a spina di pesce in fase di finitura', year: '2022', image: '/portfolio/google-spina-pesce-finitura-01.jpg', large: false },
  { id: 21, title: 'Parquet con Vista Cortile', category: 'Posa Parquet', location: 'Lombardia', surface: 'Edificio storico', material: 'Parquet listoni in ambiente con archi e cortile', year: '2022', image: '/portfolio/google-parquet-cortile-archi-01.jpg', large: false },
  { id: 22, title: 'Spina di Pesce — Finitura Lucida', category: 'Posa Parquet', location: 'Bergamo', surface: 'Residenziale', material: 'Parquet a spina di pesce con bordo e finitura lucida', year: '2022', image: '/portfolio/google-spina-pesce-lucida-01.jpg', large: false },
  { id: 23, title: 'Posa Listoni — Rovere', category: 'Posa Parquet', location: 'Lombardia', surface: 'Residenziale', material: 'Posa di listoni in rovere naturale', year: '2022', image: '/portfolio/google-posa-listoni-01.jpg', large: false },
  { id: 24, title: 'Verniciatura Eco — Mosaico', category: 'Restauro & Levigatura', location: 'Bergamo', surface: 'Residenziale', material: 'Verniciatura ecologica su parquet mosaico', year: '2022', image: '/portfolio/google-verniciatura-ecostar-01.jpg', large: false },
  { id: 25, title: 'Corridoio Graniglia e Parquet', category: 'Lavorazione Speciale', location: 'Lombardia', surface: 'Appartamento', material: 'Raccordo tra pavimento in graniglia e parquet', year: '2022', image: '/portfolio/google-corridoio-graniglia-parquet-01.jpg', large: false },
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
                  <div className="group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-100" style={{ aspectRatio: '4/3' }}>
                    {/* Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.image})` }}
                      role="img"
                      aria-label={project.title}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/95 via-nero-marquina/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                      <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-widest text-rovere mb-1.5">
                        {project.category} • {project.year}
                      </span>
                      <h2 className="font-serif font-semibold text-white text-[1.125rem] leading-tight mb-1">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-1 text-white/50 mb-3">
                        <MapPin size={11} aria-hidden="true" />
                        <span className="font-sans text-[11px]">{project.location} — {project.surface}</span>
                      </div>
                      <p className="font-sans text-[12px] text-white/60 mb-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
