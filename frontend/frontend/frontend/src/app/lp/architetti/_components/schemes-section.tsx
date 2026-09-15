'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   SCHEMES SECTION — Visual showcase of laying patterns
   
   Design principles:
   - Visual-first approach
   - Grid with hover interactions
   - Shows breadth of capability
═══════════════════════════════════════════════════════════════════════════ */

const schemes = [
  {
    name: 'Listone a correre',
    desc: 'Schema classico longitudinale, versatile',
    image: '/portfolio/google-posa-listoni-01.jpg',
    position: 'center 70%',
  },
  {
    name: 'Spina di pesce 45°',
    desc: 'Elegante, richiesto, massello o prefinito',
    image: '/portfolio/parquet-spina-pesce-01.jpg',
    position: 'center 78%',
  },
  {
    name: 'Punto d\'Ungheria',
    desc: 'Chevron simmetrico, forte impatto visivo',
    image: '/portfolio/google-spina-pesce-corridoio-01.jpg',
    position: 'center 60%',
  },
  {
    name: 'Versailles',
    desc: 'Quadri intrecciati, alta complessità',
    image: '/portfolio/google-parquet-bordo-intarsio-01.jpg',
    position: 'center 72%',
  },
  {
    name: 'Intarsi geometrici',
    desc: 'Bordi, stelle, fasce su disegno',
    image: '/portfolio/intarsio-stella-01.jpg',
    position: 'center 62%',
  },
  {
    name: 'Schemi su misura',
    desc: 'Curve, scale, geometrie irregolari',
    image: '/portfolio/google-parquet-scala-01.jpg',
    position: 'center 50%',
  },
]

export function SchemesSection() {
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

      // Grid items
      const items = gridRef.current?.children
      if (items) {
        gsap.set(items, { opacity: 0, y: 40 })
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: DURATION.base,
              stagger: 0.08,
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
      className="relative py-24 md:py-32 lg:py-40 bg-nero-marquina overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          {/* Eyebrow */}
          <div className="reveal-item flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-rovere" />
            <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
              Schemi di posa
            </span>
            <span className="w-8 h-px bg-rovere" />
          </div>

          {/* Headline */}
          <h2
            className="reveal-item font-serif text-travertino leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            Ogni schema.
            <span className="text-travertino/40"> Ogni complessità.</span>
          </h2>

          <p className="reveal-item font-sans text-[16px] text-travertino/60 leading-relaxed">
            Dal classico listone alle geometrie più elaborate. 
            Consulenza tecnica disponibile per ogni progetto.
          </p>
        </div>

        {/* Schemes Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {schemes.map((scheme) => (
            <article
              key={scheme.name}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={scheme.image}
                alt={`${scheme.name} - schema di posa parquet`}
                fill
                quality={90}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ objectPosition: scheme.position }}
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/90 via-nero-marquina/40 to-nero-marquina/10 group-hover:from-nero-marquina/95 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle 
                    size={14} 
                    className="text-rovere opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    aria-hidden="true" 
                  />
                  <h3 className="font-serif text-[16px] md:text-[18px] font-bold text-travertino">
                    {scheme.name}
                  </h3>
                </div>
                <p className="font-sans text-[12px] md:text-[13px] text-travertino/60 leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {scheme.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
