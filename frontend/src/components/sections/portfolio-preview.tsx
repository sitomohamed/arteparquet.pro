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
    material: 'Parquet massello rovere — spina di pesce',
    image: '/portfolio/parquet-spina-pesce-01.jpg',
    large: true,
  },
  {
    id: 2,
    title: 'Spina di Pesce con Caminetto',
    category: 'Posa Parquet',
    location: 'Bergamo',
    material: 'Rovere — posa a spina di pesce classica',
    image: '/portfolio/spina-pesce-camino-01.jpg',
    large: false,
  },
  {
    id: 3,
    title: 'Parquet Rovere — Finitura Lucida',
    category: 'Posa Parquet',
    location: 'Lombardia',
    material: 'Parquet rovere con finitura lucida',
    image: '/portfolio/parquet-rovere-01.jpg',
    large: false,
  },
  {
    id: 4,
    title: 'Intarsio a Stella Artigianale',
    category: 'Lavorazione Speciale',
    location: 'Bergamo',
    material: 'Intarsio geometrico su parquet massello',
    image: '/portfolio/intarsio-stella-01.jpg',
    large: false,
  },
  {
    id: 5,
    title: 'Levigatura e Verniciatura Parquet',
    category: 'Restauro & Levigatura',
    location: 'Lombardia',
    material: 'Levigatura e rifinitura parquet esistente',
    image: '/portfolio/levigatura-parquet-01.jpg',
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
    <FadeIn delay={index * 0.08} direction="up" className={large ? 'md:row-span-2' : ''}>
      <motion.div
        className="group relative overflow-hidden rounded-2xl cursor-pointer"
        style={{ height: large ? '100%' : '240px', minHeight: large ? '480px' : '240px' }}
        whileHover="hover"
      >
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={title}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/90 via-nero-marquina/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <motion.div
            variants={{
              hover: { y: 0, opacity: 1 },
            }}
            initial={{ y: 0, opacity: 1 }}
          >
            <span className="inline-block font-sans text-[11px] font-semibold uppercase tracking-widest text-rovere mb-2">
              {category}
            </span>
            <h3 className="font-serif font-semibold text-white mb-1 leading-tight"
              style={{ fontSize: large ? '1.5rem' : '1.125rem' }}
            >
              {title}
            </h3>
            <div className="flex items-center gap-1 text-white/60">
              <MapPin size={12} aria-hidden="true" />
              <span className="font-sans text-[12px]">{location}</span>
            </div>
          </motion.div>

          {/* Hover CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            variants={{ hover: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-white/90 hover:text-white">
              Vedi progetto <ArrowRight size={14} aria-hidden="true" />
            </span>
          </motion.div>
        </div>
      </motion.div>
    </FadeIn>
  )
}

export function PortfolioPreview() {
  return (
    <section className="bg-white" aria-labelledby="portfolio-heading">
      <div className="container-wide py-24 md:py-32">
        {/* Header */}
        <FadeIn direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              Portfolio
            </span>
            <h2
              id="portfolio-heading"
              className="font-serif font-semibold text-legno-bruciato text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Ogni progetto è un'opera.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-rovere hover:text-wood-600 transition-colors flex-shrink-0 group"
            aria-label="Vedi tutti i progetti del portfolio"
          >
            Vedi tutti i progetti
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Large card — col 1, spans 2 rows */}
          <div className="lg:col-span-1 md:row-span-2">
            <ProjectCard {...PROJECTS[0]} index={0} />
          </div>
          {/* Smaller cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {PROJECTS.slice(1).map((p, i) => (
              <ProjectCard key={p.id} {...p} index={i + 1} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.3} className="text-center mt-14">
          <p className="font-sans text-[15px] text-neutral-500 mb-6">
            Da ville private ad hotel di lusso, ogni spazio racconta una storia di trasformazione.
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all duration-200"
          >
            Vuoi un risultato simile?
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
