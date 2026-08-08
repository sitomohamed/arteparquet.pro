import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Portfolio | I Nostri Lavori — Ville, Hotel, Residenze',
  description:
    'Galleria dei nostri progetti: ville private, hotel di lusso, appartamenti, ristoranti. Posa e restauro parquet in tutta Italia. Scopri le nostre realizzazioni.',
}

const PROJECTS = [
  { id: 1, title: 'Parquet a Spina di Pesce — Rovere', category: 'Posa Parquet', location: 'Bergamo', surface: '85 mq', material: 'Parquet massello rovere — posa a spina di pesce con finitura lucida', year: '2026', image: '/portfolio/parquet-spina-pesce-01.jpg', large: true },
  { id: 2, title: 'Levigatura Professionale — Parquet Esistente', category: 'Restauro & Levigatura', location: 'Lombardia', surface: '60 mq', material: 'Levigatura, carteggiatura e rifinitura su parquet esistente', year: '2026', image: '/portfolio/levigatura-parquet-01.jpg', large: false },
  { id: 3, title: 'Posa Parquet Iroko — Camera da Letto', category: 'Posa Parquet', location: 'Bergamo', surface: '30 mq', material: 'Parquet iroko posa dritta — camera da letto residenziale', year: '2026', image: '/portfolio/posa-parquet-camera-01.jpg', large: false },
  { id: 4, title: 'Parquet Merbau — Finitura Lucida', category: 'Posa Parquet', location: 'Lombardia', surface: '110 mq', material: 'Parquet merbau con finitura lucida a olio — salone principale', year: '2025', image: '/portfolio/parquet-rovere-01.jpg', large: false },
  { id: 5, title: 'Intarsio a Stella — Lavoro Artigianale', category: 'Lavorazione Speciale', location: 'Bergamo', surface: 'Decorazione', material: 'Intarsio geometrico a stella su parquet massello scuro', year: '2025', image: '/portfolio/intarsio-stella-01.jpg', large: false },
  { id: 6, title: 'Posa Parquet Mansarda — Rovere Naturale', category: 'Posa Parquet', location: 'Bergamo', surface: '40 mq', material: 'Parquet prefinito rovere naturale — posa dritta in mansarda', year: '2025', image: '/portfolio/spina-pesce-camino-01.jpg', large: false },
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
