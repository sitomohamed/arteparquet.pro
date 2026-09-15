'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   PORTFOLIO SECTION — Editorial magazine-style layout
   
   Design principles:
   - Variable image sizes create visual rhythm
   - Magazine-style grid, not uniform cards
   - Project details add credibility
   - Hover interactions for premium feel
   - Easy to update with new projects
═══════════════════════════════════════════════════════════════════════════ */

// Portfolio projects - structured for easy updates
const portfolioProjects = [
  {
    id: 'intarsio-stella',
    src: '/portfolio/intarsio-stella-01.jpg',
    alt: 'Intarsio geometrico a stella su parquet rovere - lavorazione artigianale',
    title: 'Intarsio geometrico',
    category: 'Lavorazione artigianale',
    description: 'Intarsio a stella su disegno del progettista. Precisione millimetrica.',
    size: 'large', // large, medium, or small
  },
  {
    id: 'spina-pesce-cantiere',
    src: '/portfolio/google-spina-pesce-cantiere-01.jpg',
    alt: 'Spina di pesce 45 gradi in fase di posa - cantiere residenziale',
    title: 'Spina di pesce 45°',
    category: 'Schema classico',
    description: 'Rovere massello, finitura naturale opaca.',
    size: 'medium',
  },
  {
    id: 'bordo-intarsio',
    src: '/portfolio/google-parquet-bordo-intarsio-01.jpg',
    alt: 'Parquet con bordo decorativo e fascia perimetrale intarsiata',
    title: 'Bordo decorativo',
    category: 'Dettaglio su misura',
    description: 'Filetto e fascia perimetrale su schema listone.',
    size: 'medium',
  },
  {
    id: 'transizioni-archi',
    src: '/portfolio/google-parquet-sala-archi-01.jpg',
    alt: 'Posa parquet in ambiente con archi e transizioni complesse',
    title: 'Transizioni architettoniche',
    category: 'Geometria complessa',
    description: 'Gestione di passaggi sotto archi e soglie multiple.',
    size: 'large',
  },
  {
    id: 'restauro-mosaico',
    src: '/portfolio/google-levigatura-mosaico-01.jpg',
    alt: 'Restauro parquet mosaico storico - levigatura conservativa',
    title: 'Restauro mosaico storico',
    category: 'Recupero conservativo',
    description: 'Levigatura delicata su parquet originale anni \'50.',
    size: 'small',
  },
  {
    id: 'scala-parquet',
    src: '/portfolio/google-parquet-scala-01.jpg',
    alt: 'Rivestimento scala in parquet rovere con raccordi precisi',
    title: 'Rivestimento scala',
    category: 'Lavorazione speciale',
    description: 'Continuità visiva piano-scala. Raccordi millimetrici.',
    size: 'small',
  },
]

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      // Header reveal
      const headerElements = headerRef.current?.querySelectorAll('.reveal-item')
      if (headerElements) {
        gsap.set(headerElements, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(headerElements, {
              opacity: 1,
              y: 0,
              duration: DURATION.base,
              stagger: 0.1,
              ease: EASE.expo,
            })
          },
        })
      }

      // Grid items reveal with stagger
      const gridItems = gridRef.current?.querySelectorAll('.portfolio-item')
      if (gridItems) {
        gsap.set(gridItems, { opacity: 0, y: 60, scale: 0.95 })
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(gridItems, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: DURATION.slow,
              stagger: 0.12,
              ease: EASE.expo,
            })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Get size classes for grid layout
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2'
      case 'medium':
        return 'md:col-span-1 md:row-span-2'
      case 'small':
      default:
        return 'md:col-span-1 md:row-span-1'
    }
  }

  const getAspectClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'aspect-[4/3] md:aspect-[16/10]'
      case 'medium':
        return 'aspect-[4/3] md:aspect-[3/4]'
      case 'small':
      default:
        return 'aspect-[4/3] md:aspect-square'
    }
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 md:py-32 lg:py-40 bg-nero-marquina overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              {/* Eyebrow */}
              <div className="reveal-item flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-rovere" />
                <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
                  Portfolio
                </span>
              </div>

              {/* Headline */}
              <h2
                className="reveal-item font-serif text-travertino leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Lavori realizzati.
                <br />
                <span className="text-travertino/40">Cantieri reali.</span>
              </h2>
            </div>

            <div className="lg:text-right">
              <p className="reveal-item font-sans text-[16px] text-travertino/60 leading-relaxed max-w-md lg:ml-auto mb-6">
                Intarsi, transizioni, restauri, schemi complessi. Ogni progetto 
                è una sfida tecnica risolta con precisione.
              </p>
              <Link
                href="/portfolio"
                className="reveal-item inline-flex items-center gap-2 text-rovere font-sans text-[14px] font-semibold hover:gap-3 transition-all duration-300 group"
              >
                Portfolio completo
                <ArrowRight 
                  size={16} 
                  className="transition-transform group-hover:translate-x-1" 
                  aria-hidden="true" 
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Editorial Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {portfolioProjects.map((project) => (
            <article
              key={project.id}
              className={`portfolio-item group relative rounded-xl overflow-hidden ${getSizeClasses(project.size)}`}
            >
              {/* Image */}
              <div className={`relative ${getAspectClasses(project.size)} overflow-hidden`}>
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/80 via-nero-marquina/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  {/* Category tag */}
                  <span className="inline-block self-start font-sans text-[11px] font-semibold text-rovere tracking-wide uppercase mb-2 opacity-80">
                    {project.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-serif text-[20px] md:text-[22px] font-bold text-travertino leading-tight mb-2">
                    {project.title}
                  </h3>
                  
                  {/* Description - visible on hover on larger screens */}
                  <p className="font-sans text-[13px] text-travertino/70 leading-relaxed max-w-xs opacity-100 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {project.description}
                  </p>
                </div>

                {/* Hover arrow indicator */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ArrowUpRight size={18} className="text-travertino" aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-travertino font-sans text-[15px] font-semibold px-8 py-4 rounded-xl transition-all duration-300"
          >
            Esplora tutti i progetti
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-nero-marquina to-transparent pointer-events-none" />
    </section>
  )
}
