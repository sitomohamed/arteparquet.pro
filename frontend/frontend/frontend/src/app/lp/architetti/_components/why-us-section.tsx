'use client'

import { useRef, useEffect } from 'react'
import { Shield, Users, Clock, FileCheck, Phone, Headphones } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   WHY US SECTION — Differentiators with strong visual hierarchy
═══════════════════════════════════════════════════════════════════════════ */

const reasons = [
  {
    icon: Shield,
    title: 'Garanzia scritta',
    desc: 'Ogni intervento coperto da garanzia su manodopera. Documentazione completa su richiesta.',
    highlight: true,
  },
  {
    icon: Users,
    title: 'Team dedicato B2B',
    desc: 'Referente unico per il vostro studio. Comunicazione diretta, niente intermediari.',
    highlight: false,
  },
  {
    icon: Clock,
    title: 'Tempistiche rispettate',
    desc: 'Pianificazione accurata, coordinamento con altre maestranze. Consegne puntuali.',
    highlight: false,
  },
  {
    icon: FileCheck,
    title: 'Preventivi tecnici',
    desc: 'Dettagliati, scritti, con materiali, tempi e condizioni. Tutto chiaro prima di iniziare.',
    highlight: false,
  },
  {
    icon: Headphones,
    title: 'Supporto pre-progetto',
    desc: 'Consulenza sulla fattibilità tecnica. Valutiamo il progetto prima della firma.',
    highlight: false,
  },
  {
    icon: Phone,
    title: 'Reperibilità cantiere',
    desc: 'Disponibili per urgenze e imprevisti. Problemi risolti in tempi rapidi.',
    highlight: false,
  },
]

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      // Header
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
        gsap.set(items, { opacity: 0, y: 40, scale: 0.98 })
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: DURATION.base,
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
      className="relative py-24 md:py-32 lg:py-40 bg-travertino overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-20">
          <div className="reveal-item flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-rovere" />
            <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
              Perché noi
            </span>
          </div>

          <h2
            className="reveal-item font-serif text-legno-bruciato leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            Cosa ci distingue.
            <br />
            <span className="text-legno-bruciato/40">Perché i professionisti ci scelgono.</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className={`group p-7 rounded-2xl transition-all duration-300 ${
                reason.highlight
                  ? 'bg-legno-bruciato text-travertino'
                  : 'bg-white hover:bg-legno-bruciato/5'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                reason.highlight
                  ? 'bg-rovere'
                  : 'bg-rovere/10 group-hover:bg-rovere/20'
              } transition-colors duration-300`}>
                <reason.icon 
                  size={22} 
                  className={reason.highlight ? 'text-white' : 'text-rovere'} 
                  aria-hidden="true" 
                />
              </div>

              <h3 className={`font-sans text-[17px] font-bold mb-3 ${
                reason.highlight ? 'text-travertino' : 'text-legno-bruciato'
              }`}>
                {reason.title}
              </h3>

              <p className={`font-sans text-[14px] leading-relaxed ${
                reason.highlight ? 'text-travertino/70' : 'text-legno-bruciato/60'
              }`}>
                {reason.desc}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wood-100/50 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
