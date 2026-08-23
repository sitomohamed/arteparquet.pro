'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

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
    image: '/portfolio/intarsio-stella-01.jpg',
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
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || getReducedMotion()) return

    const card = cardRef.current
    const img = imageRef.current
    const overlay = overlayRef.current
    const content = contentRef.current
    const cta = ctaRef.current

    const handleMouseEnter = () => {
      if (img) {
        gsap.to(img, {
          scale: 1.1,
          duration: DURATION.slow,
          ease: EASE.expo,
        })
      }
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.95,
          duration: DURATION.fast,
        })
      }
      if (content) {
        gsap.to(content, {
          y: -8,
          duration: DURATION.fast,
          ease: EASE.expo,
        })
      }
      if (cta) {
        gsap.to(cta, {
          opacity: 1,
          y: 0,
          duration: DURATION.fast,
          ease: EASE.expo,
        })
      }
    }

    const handleMouseLeave = () => {
      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: DURATION.slow,
          ease: EASE.expo,
        })
      }
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.8,
          duration: DURATION.fast,
        })
      }
      if (content) {
        gsap.to(content, {
          y: 0,
          duration: DURATION.fast,
          ease: EASE.expo,
        })
      }
      if (cta) {
        gsap.to(cta, {
          opacity: 0,
          y: 12,
          duration: DURATION.fast,
          ease: EASE.power3,
        })
      }
    }

    gsap.set(cta, { opacity: 0, y: 12 })

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!imageRef.current || getReducedMotion()) return

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (imageRef.current) {
          const yPercent = (self.progress - 0.5) * 15
          gsap.set(imageRef.current, { yPercent })
        }
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div className={large ? 'md:row-span-2' : ''}>
      <Link href="/portfolio" aria-label={`Vedi progetto: ${title}`} className="block h-full">
        <div
          ref={cardRef}
          className="group relative overflow-hidden rounded-3xl cursor-pointer h-full"
          style={{ height: large ? '100%' : '280px', minHeight: large ? '560px' : '280px' }}
        >
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: 'scale(1.15)' }}
          >
            <div
              className="absolute inset-0 bg-wood-100 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={title}
            />
          </div>

          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-t from-nero-marquina/95 via-nero-marquina/30 to-transparent opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-nero-marquina/40" />

          <div className="absolute inset-0 flex flex-col justify-end p-7">
            <div ref={contentRef} className="will-change-transform">
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
            </div>

            <div
              ref={ctaRef}
              className="mt-5 pt-4 border-t border-white/15 will-change-transform"
            >
              <span className="inline-flex items-center gap-2 font-sans text-[13.5px] font-semibold text-white/90 group-hover:text-white transition-colors">
                Vedi progetto 
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div
            className="absolute top-6 right-6 w-2 h-2 rounded-full bg-rovere shadow-[0_0_20px_rgba(200,155,123,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            aria-hidden="true"
          />
        </div>
      </Link>
    </div>
  )
}

export function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 60 })
        
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(headerRef.current, {
              opacity: 1,
              y: 0,
              duration: DURATION.slow,
              ease: EASE.expo,
            })
          },
        })
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(':scope > div, :scope > div > div')
        gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 })
        
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: DURATION.slow,
              stagger: 0.1,
              ease: EASE.expo,
            })
          },
        })
      }

      if (footerRef.current) {
        gsap.set(footerRef.current, { opacity: 0, y: 40 })
        
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(footerRef.current, {
              opacity: 1,
              y: 0,
              duration: DURATION.base,
              ease: EASE.expo,
            })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white relative overflow-hidden" aria-labelledby="portfolio-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(200,155,123,0.03),transparent_60%)]" aria-hidden="true" />
      
      <div className="relative container-wide py-28 md:py-36">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-18 md:mb-20">
          <div>
            <span className="block font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-rovere mb-5">
              Portfolio
            </span>
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
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <div className="lg:col-span-1 md:row-span-2">
            <ProjectCard {...PROJECTS[0]} index={0} />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {PROJECTS.slice(1).map((p, i) => (
              <ProjectCard key={p.id} {...p} index={i + 1} />
            ))}
          </div>
        </div>

        <div ref={footerRef} className="text-center mt-18">
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
        </div>
      </div>
    </section>
  )
}
