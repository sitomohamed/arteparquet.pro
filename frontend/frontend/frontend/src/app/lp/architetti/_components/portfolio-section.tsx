'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

type PortfolioSize = 'large' | 'medium' | 'small'

type PortfolioProject = {
  id: string
  src: string
  alt: string
  title: string
  category: string
  description: string
  size: PortfolioSize
  objectPosition: string
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 'spina-pesce-finitura',
    src: '/portfolio/parquet-spina-pesce-01.jpg',
    alt: 'Parquet a spina di pesce in rovere, stanza residenziale finita',
    title: 'Spina di pesce',
    category: 'Schema classico',
    description: 'Rovere massello, posa a 45°. Cantiere residenziale.',
    size: 'large',
    objectPosition: 'center 78%',
  },
  {
    id: 'intarsio-stella',
    src: '/portfolio/intarsio-stella-01.jpg',
    alt: 'Intarsio geometrico a stella su parquet rovere',
    title: 'Intarsio geometrico',
    category: 'Lavorazione artigianale',
    description: 'Stella su disegno del progettista.',
    size: 'medium',
    objectPosition: 'center 62%',
  },
  {
    id: 'listone-rovere',
    src: '/portfolio/parquet-rovere-01.jpg',
    alt: 'Parquet in listone di rovere in ambiente residenziale',
    title: 'Listone a correre',
    category: 'Posa residenziale',
    description: 'Schema longitudinale, finitura lucida.',
    size: 'large',
    objectPosition: 'center 70%',
  },
  {
    id: 'bordo-intarsio',
    src: '/portfolio/google-parquet-bordo-intarsio-01.jpg',
    alt: 'Parquet con bordo decorativo e fascia perimetrale',
    title: 'Bordo e filetto',
    category: 'Dettaglio su misura',
    description: 'Fascia perimetrale su schema a spina.',
    size: 'medium',
    objectPosition: 'center 72%',
  },
  {
    id: 'transizione-graniglia',
    src: '/portfolio/google-corridoio-graniglia-parquet-01.jpg',
    alt: 'Transizione tra graniglia e parquet in un corridoio',
    title: 'Transizioni tra materiali',
    category: 'Raccordo tecnico',
    description: 'Passaggio graniglia–parquet risolto in opera.',
    size: 'small',
    objectPosition: 'center 55%',
  },
  {
    id: 'restauro-mosaico',
    src: '/portfolio/google-levigatura-mosaico-01.jpg',
    alt: 'Restauro parquet mosaico storico, levigatura conservativa',
    title: 'Restauro mosaico',
    category: 'Recupero conservativo',
    description: 'Levigatura su parquet originale.',
    size: 'small',
    objectPosition: 'center 50%',
  },
]

const sizeClasses: Record<PortfolioSize, string> = {
  large: 'md:col-span-2',
  medium: 'md:col-span-1',
  small: 'md:col-span-1',
}

const aspectClasses: Record<PortfolioSize, string> = {
  large: 'aspect-[4/5] sm:aspect-[4/3]',
  medium: 'aspect-[3/4]',
  small: 'aspect-[4/5]',
}

const imageSizes: Record<PortfolioSize, string> = {
  large: '(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 900px',
  medium: '(max-width: 768px) 100vw, (max-width: 1280px) 35vw, 420px',
  small: '(max-width: 768px) 100vw, (max-width: 1280px) 35vw, 420px',
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
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

      const gridItems = gridRef.current?.querySelectorAll('.portfolio-item')
      if (gridItems) {
        gsap.set(gridItems, { opacity: 0, y: 40 })
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(gridItems, {
              opacity: 1,
              y: 0,
              duration: DURATION.slow,
              stagger: 0.1,
              ease: EASE.expo,
            })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 md:py-32 lg:py-40 bg-nero-marquina overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <div className="reveal-item flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-rovere" />
                <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
                  Portfolio
                </span>
              </div>

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

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {portfolioProjects.map((project) => (
            <article
              key={project.id}
              className={`portfolio-item group relative rounded-xl overflow-hidden bg-white/5 ${sizeClasses[project.size]}`}
            >
              <div className={`relative ${aspectClasses[project.size]} overflow-hidden`}>
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  quality={90}
                  sizes={imageSizes[project.size]}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: project.objectPosition }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/75 via-nero-marquina/15 to-transparent" />

                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <span className="inline-block self-start font-sans text-[11px] font-semibold text-rovere tracking-wide uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-[20px] md:text-[22px] font-bold text-travertino leading-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[13px] text-travertino/70 leading-relaxed max-w-xs">
                    {project.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={18} className="text-travertino" aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>

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
    </section>
  )
}
