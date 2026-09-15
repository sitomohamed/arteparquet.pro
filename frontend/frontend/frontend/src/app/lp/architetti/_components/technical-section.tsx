'use client'

import { useRef, useEffect } from 'react'
import { Layers, Grid3X3, Wrench, ArrowRight, CheckCircle } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   TECHNICAL SECTION — Competenza che differenzia
   
   Design principles:
   - Problem → Solution → Result storytelling
   - Visual cards with clear hierarchy
   - Technical credibility without being boring
   - Shows expertise beyond basic installation
═══════════════════════════════════════════════════════════════════════════ */

const technicalAreas = [
  {
    icon: Layers,
    title: 'Massetti e preparazioni',
    problem: 'Il sottofondo non è pronto o ha umidità residua',
    solution: 'Valutiamo con strumenti professionali, prepariamo con autolivellanti e primer',
    result: 'Zero problemi post-posa, garanzia piena',
    details: [
      'Verifica tempi di maturazione',
      'Autolivellanti fibrorinforzati',
      'Primer epossidici',
      'Barriera vapore se necessario',
    ],
  },
  {
    icon: Grid3X3,
    title: 'Transizioni e raccordi',
    problem: 'Passaggi tra materiali diversi, livelli differenti',
    solution: 'Progettiamo ogni raccordo tecnicamente prima della posa',
    result: 'Transizioni eleganti e funzionali',
    details: [
      'Soglie tra materiali diversi',
      'Giunti di dilatazione',
      'Compensazioni di livello',
      'Raccordi personalizzati',
    ],
  },
  {
    icon: Wrench,
    title: 'Schemi complessi',
    problem: 'Pattern elaborati, geometrie non standard, curve',
    solution: 'Esperienza su cantieri di pregio, precisione millimetrica',
    result: 'Esecuzione fedele al progetto',
    details: [
      'Spina di pesce / Chevron',
      'Versailles e intarsi',
      'Pose su curve e scale',
      'Geometrie irregolari',
    ],
  },
]

export function TechnicalSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      // Cards reveal
      const cards = cardsRef.current?.querySelectorAll('.tech-card')
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 50 })
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: DURATION.slow,
              stagger: 0.15,
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
          {/* Eyebrow */}
          <div className="reveal-item flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-rovere" />
            <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
              Competenza tecnica
            </span>
          </div>

          {/* Headline */}
          <h2
            className="reveal-item font-serif text-legno-bruciato leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            Non solo posa.
            <br />
            <span className="text-legno-bruciato/40">Gestione completa del cantiere.</span>
          </h2>

          <p className="reveal-item font-sans text-[17px] text-legno-bruciato/60 leading-relaxed max-w-xl">
            Ogni fase tecnica sotto controllo. Anticipiamo i problemi, 
            proponiamo soluzioni, garantiamo il risultato.
          </p>
        </div>

        {/* Technical Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {technicalAreas.map((area) => (
            <article
              key={area.title}
              className="tech-card group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-rovere/10 flex items-center justify-center mb-6 group-hover:bg-rovere/20 transition-colors duration-300">
                <area.icon size={26} className="text-rovere" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-[20px] font-bold text-legno-bruciato mb-6">
                {area.title}
              </h3>

              {/* Problem → Solution → Result */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                    ?
                  </span>
                  <div>
                    <p className="font-sans text-[11px] font-semibold text-legno-bruciato/40 uppercase tracking-wide mb-1">
                      Problema
                    </p>
                    <p className="font-sans text-[14px] text-legno-bruciato/70 leading-relaxed">
                      {area.problem}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                    →
                  </span>
                  <div>
                    <p className="font-sans text-[11px] font-semibold text-legno-bruciato/40 uppercase tracking-wide mb-1">
                      Soluzione
                    </p>
                    <p className="font-sans text-[14px] text-legno-bruciato/70 leading-relaxed">
                      {area.solution}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                    ✓
                  </span>
                  <div>
                    <p className="font-sans text-[11px] font-semibold text-legno-bruciato/40 uppercase tracking-wide mb-1">
                      Risultato
                    </p>
                    <p className="font-sans text-[14px] text-legno-bruciato/70 leading-relaxed">
                      {area.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details list */}
              <div className="pt-6 border-t border-neutral-100">
                <ul className="grid grid-cols-2 gap-2">
                  {area.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2 text-[12px] text-legno-bruciato/50"
                    >
                      <CheckCircle size={12} className="text-rovere flex-shrink-0" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Background decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rovere/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-wood-200/30 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
