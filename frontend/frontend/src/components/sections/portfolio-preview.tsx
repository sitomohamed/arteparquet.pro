'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

const PROJECTS = [
  {
    id: 1,
    title: 'Parquet a Spina di Pesce — Rovere',
    category: 'Posa Parquet',
    location: 'Bergamo',
    material: 'Parquet massello rovere — posa a spina di pesce',
    image: '/portfolio/google-spina-pesce-finitura-01.jpg',
    large: true,
  },
  {
    id: 2,
    title: 'Parquet con Bordo e Intarsio',
    category: 'Lavorazione Speciale',
    location: 'Bergamo',
    material: 'Parquet con fascia perimetrale e filetto bianco',
    image: '/portfolio/google-parquet-bordo-intarsio-01.jpg',
    large: false,
  },
  {
    id: 3,
    title: 'Parquet Sala con Archi',
    category: 'Posa Parquet',
    location: 'Lombardia',
    material: 'Parquet listoni chiari in sala con aperture ad arco',
    image: '/portfolio/google-parquet-sala-archi-01.jpg',
    large: false,
  },
  {
    id: 4,
    title: 'Intarsio a Stella Artigianale',
    category: 'Lavorazione Speciale',
    location: 'Bergamo',
    material: 'Intarsio geometrico a stella su parquet massello',
    image: '/portfolio/google-parquet-bordo-intarsio-01.jpg',
    large: false,
  },
  {
    id: 5,
    title: 'Levigatura Parquet Mosaico',
    category: 'Restauro & Levigatura',
    location: 'Bergamo',
    material: 'Levigatura professionale su parquet mosaico',
    image: '/portfolio/google-levigatura-mosaico-01.jpg',
    large: false,
  },
]

interface ProjectCardProps {
  id: number
  title: string
  category: string
  location: string
  material: string
  image: string
  large?: boolean
  index: number
}

function ProjectCard({ title, category, location, image, large, index }: ProjectCardProps) {
  return (
    <FadeIn delay={index * 0.1} direction="up" className={large ? 'md:row-span-2' : ''}>
      <Link href="/portfolio" aria-label={`Vedi progetto: ${title}`} className="block h-full">
        <motion.div
          className="group relative overflow-hidden rounded-3xl cursor-pointer h-full"
          style={{ height: large ? '100%' : '280px', minHeight: large ? '560px' : '280px' }}
          whileHover="hover"
          initial="initial"
        >
          {/* Premium image with sophisticated scale */}
          <motion.div
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.08 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-wood-100 bg-cover bg-center bg-no-repeat will-change-transform"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={title}
            />
          </motion.div>

          {/* Premium multi-layer gradient overlay */}
          <motion.div 
            variants={{
              initial: { opacity: 0.8 },
              hover: { opacity: 0.95 }
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-nero-marquina/95 via-nero-marquina/30 to-transparent" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-nero-marquina/40" />

          {/* Premium content */}
          <div className="absolute inset-0 flex flex-col justify-end p-7">
            <motion.div
              variants={{
                initial: { y: 0, opacity: 1 },
                hover: { y: -4, opacity: 1 }
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-rovere mb-3">
                {category}
              </span>
              <h3 className="font-serif font-semibold text-white mb-2 leading-[1.15] text-balance"
                style={{ 
                  fontSize: large ? '1.75rem' : '1.25rem',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 12px rgba(0,0,0,0.3)'
                }}
              >
                {title}
              </h3>
              <div className="flex items-center gap-1.5 text-white/65">
                <MapPin size={13} aria-hidden="true" />
                <span className="font-sans text-[12.5px]">{location}</span>
              </div>
            </motion.div>

            {/* Premium hover CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              variants={{ 
                hover: { opacity: 1, y: 0 },
                initial: { opacity: 0, y: 12 }
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 pt-4 border-t border-white/15"
            >
              <span className="inline-flex items-center gap-2 font-sans text-[13.5px] font-semibold text-white/90 group-hover:text-white transition-colors">
                Vedi progetto 
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
              </span>
            </motion.div>
          </div>

          {/* Premium corner accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            variants={{
              hover: { scale: 1, opacity: 1 }
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-6 right-6 w-2 h-2 rounded-full bg-rovere shadow-[0_0_20px_rgba(200,155,123,0.6)]"
            aria-hidden="true"
          />
        </motion.div>
      </Link>
    </FadeIn>
  )
}

export function PortfolioPreview() {
  return (
    <section className="bg-white relative overflow-hidden" aria-labelledby="portfolio-heading">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(200,155,123,0.03),transparent_60%)]" aria-hidden="true" />
      
      <div className="relative container-wide py-28 md:py-36">
        {/* Premium header */}
        <FadeIn direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-18 md:mb-20">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="block font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-rovere mb-5"
            >
              Portfolio
            </motion.span>
            <h2
              id="portfolio-heading"
              className="font-serif font-semibold text-legno-bruciato text-balance"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', letterSpacing: '-0.025em' }}
            >
              Ogni progetto è un'opera.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 font-sans text-[15px] font-semibold text-rovere hover:text-wood-600 transition-colors duration-300 flex-shrink-0 group"
            aria-label="Vedi tutti i progetti del portfolio"
          >
            <span className="relative">
              Vedi tutti i progetti
              <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-rovere origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
            </span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-2"
              aria-hidden="true"
            />
          </Link>
        </FadeIn>

        {/* Premium grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Large card — col 1, spans 2 rows */}
          <div className="lg:col-span-1 md:row-span-2">
            <ProjectCard {...PROJECTS[0]} index={0} />
          </div>
          {/* Smaller cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {PROJECTS.slice(1).map((p, i) => (
              <ProjectCard key={p.id} {...p} index={i + 1} />
            ))}
          </div>
        </div>

        {/* Premium bottom CTA */}
        <FadeIn direction="up" delay={0.4} className="text-center mt-18">
          <p className="font-sans text-[16px] text-neutral-500 mb-8 leading-[1.7]">
            Da ville private ad hotel di lusso, ogni spazio racconta una storia di trasformazione.
          </p>
          <Link
            href="/contatti"
            className="group relative inline-flex items-center gap-2.5 px-10 py-4.5 rounded-xl bg-rovere text-white font-sans text-[15px] font-semibold hover:bg-wood-500 hover:shadow-[0_16px_48px_rgba(200,155,123,0.35)] active:scale-[0.97] transition-all duration-400 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <span className="relative z-10">Vuoi un risultato simile?</span>
            <ArrowRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
