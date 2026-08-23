'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Hammer, Sparkles, Layers, ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    icon: Hammer,
    title: 'Posa Parquet',
    description:
      'Il pavimento perfetto, posato con precisione millimetrica. Dal massello tradizionale al prefinito: ogni essenza, ogni schema, ogni sogno.',
    href: '/servizi/posa',
    features: ['Parquet massello', 'Parquet prefinito', 'Scale in legno', 'Battiscopa'],
    accent: 'from-wood-100 to-wood-200',
  },
  {
    icon: Sparkles,
    title: 'Restauro & Levigatura',
    description:
      'Il tuo parquet antico merita le mani giuste. Tecniche professionali che restituiscono vita, colore e lucentezza al legno di una volta.',
    href: '/servizi/restauro',
    features: ['Levigatura senza polvere', 'Verniciatura', 'Riparazione listelli', 'Trattamenti'],
    accent: 'from-neutral-50 to-wood-100',
  },
  {
    icon: Layers,
    title: 'SPC, PVC & Laminati',
    description:
      'Un pavimento pronto da vivere in pochi giorni. Soluzioni moderne, resistenti all\'acqua e all\'usura, con l\'estetica del legno naturale.',
    href: '/servizi/spc',
    features: ['SPC impermeabile', 'PVC click', 'Laminato premium', 'Pavimenti flottanti'],
    accent: 'from-wood-100 to-neutral-50',
  },
]

interface ServiceCardProps {
  icon: typeof Hammer
  title: string
  description: string
  href: string
  features: string[]
  accent: string
  index: number
}

function ServiceCard({ icon: Icon, title, description, href, features, accent, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!cardRef.current || getReducedMotion()) return

    const card = cardRef.current
    const icon = iconRef.current
    const arrow = arrowRef.current

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        duration: DURATION.fast,
        ease: EASE.expo,
      })
      if (icon) {
        gsap.to(icon, {
          scale: 1.1,
          rotation: 5,
          duration: DURATION.fast,
          ease: EASE.bounce,
        })
      }
      if (arrow) {
        gsap.to(arrow, {
          x: 8,
          duration: DURATION.fast,
          ease: EASE.expo,
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: DURATION.fast,
        ease: EASE.expo,
      })
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: DURATION.fast,
          ease: EASE.expo,
        })
      }
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          duration: DURATION.fast,
          ease: EASE.expo,
        })
      }
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-wood-200 hover:shadow-[0_24px_64px_rgba(0,0,0,0.11)] transition-all duration-600 h-full flex flex-col will-change-transform"
    >
      <div className={cn('h-[3px] w-full bg-gradient-to-r transition-all duration-600', accent)} />

      <div className="p-9 flex flex-col flex-1">
        <div 
          ref={iconRef}
          className="mb-7 w-16 h-16 rounded-[18px] bg-wood-50 ring-[1.5px] ring-wood-200/60 flex items-center justify-center group-hover:bg-rovere group-hover:ring-rovere/30 group-hover:shadow-[0_8px_24px_rgba(200,155,123,0.25)] transition-all duration-500 will-change-transform"
        >
          <Icon
            size={26}
            className="text-rovere group-hover:text-white transition-colors duration-500"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <h3 className="font-serif font-semibold text-legno-bruciato mb-4 group-hover:text-rovere transition-colors duration-400"
          style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.625rem)', letterSpacing: '-0.02em' }}
        >
          {title}
        </h3>

        <p className="font-sans text-[15.5px] text-neutral-600 leading-[1.7] mb-7 flex-1">
          {description}
        </p>

        <ul className="space-y-2.5 mb-9" role="list">
          {features.map((feat) => (
            <li
              key={feat}
              className="flex items-center gap-2.5 font-sans text-[13.5px] text-neutral-700"
            >
              <span className="w-[5px] h-[5px] rounded-full bg-rovere flex-shrink-0 group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-rovere hover:text-wood-600 transition-colors duration-300 group/link"
          aria-label={`Scopri di più sul servizio ${title}`}
        >
          <span className="relative">
            Scopri di più
            <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-rovere origin-left scale-x-100 group-hover/link:scale-x-0 transition-transform duration-300" />
          </span>
          <span ref={arrowRef} className="inline-block will-change-transform">
            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </span>
        </Link>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      const header = headerRef.current
      const cards = cardsRef.current
      const cta = ctaRef.current

      if (header) {
        gsap.set(header, { opacity: 0, y: 60 })
        
        ScrollTrigger.create({
          trigger: header,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(header, {
              opacity: 1,
              y: 0,
              duration: DURATION.slow,
              ease: EASE.expo,
            })
          },
        })
      }

      if (cards) {
        const cardElements = cards.children
        gsap.set(cardElements, { opacity: 0, y: 80 })
        
        ScrollTrigger.create({
          trigger: cards,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(cardElements, {
              opacity: 1,
              y: 0,
              duration: DURATION.slow,
              stagger: 0.15,
              ease: EASE.expo,
            })
          },
        })
      }

      if (cta) {
        gsap.set(cta, { opacity: 0, y: 40 })
        
        ScrollTrigger.create({
          trigger: cta,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(cta, {
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
    <section
      ref={sectionRef}
      className="bg-travertino relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,155,123,0.04),transparent_50%)]" aria-hidden="true" />
      
      <div className="relative container-wide py-28 md:py-36">
        <div ref={headerRef} className="text-center mb-20 md:mb-24">
          <span className="inline-block font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-rovere mb-5">
            I Nostri Servizi
          </span>
          <h2
            id="services-heading"
            className="font-serif font-semibold text-legno-bruciato mb-6 text-balance"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', letterSpacing: '-0.025em' }}
          >
            Non posiamo semplicemente pavimenti.
            <br className="hidden md:block" />
            <em className="not-italic text-rovere">Creiamo le fondamenta del tuo stile di vita.</em>
          </h2>
          <p className="font-sans text-[17px] text-neutral-500 max-w-2xl mx-auto leading-[1.7]">
            Dal parquet massello tradizionale alle moderne soluzioni SPC e PVC,
            ogni progetto riceve la stessa cura totale.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        <div ref={ctaRef} className="text-center mt-16">
          <Link
            href="/servizi"
            className="group relative inline-flex items-center gap-2.5 px-10 py-4.5 rounded-xl border-[2px] border-legno-bruciato text-legno-bruciato font-sans text-[15px] font-semibold hover:bg-legno-bruciato hover:text-white hover:shadow-[0_12px_32px_rgba(26,26,26,0.2)] active:scale-[0.97] transition-all duration-400 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <span className="relative z-10">Tutti i servizi</span>
            <ArrowRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
