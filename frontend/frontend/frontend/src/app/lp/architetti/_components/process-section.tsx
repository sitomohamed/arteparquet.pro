'use client'

import { useRef, useEffect } from 'react'
import { MessageSquare, MapPin, FileText, Hammer, Shield, Clock } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   PROCESS SECTION — Visual timeline with elegant numbering
═══════════════════════════════════════════════════════════════════════════ */

const processSteps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Briefing tecnico',
    desc: 'Tipologia cantiere, schema, metratura, tempistiche. Più informazioni = preventivo più preciso.',
  },
  {
    number: '02',
    icon: MapPin,
    title: 'Sopralluogo gratuito',
    desc: 'Valutiamo sottofondo, condizioni cantiere, pianifichiamo la posa. Sempre gratuito.',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Preventivo dettagliato',
    desc: 'Scritto, con materiali, tempi e condizioni. Tutto documentato prima di iniziare.',
  },
  {
    number: '04',
    icon: Hammer,
    title: 'Posa e coordinamento',
    desc: 'Intervento professionale coordinato con altre maestranze. Rispetto delle scadenze.',
  },
  {
    number: '05',
    icon: Shield,
    title: 'Garanzia e documentazione',
    desc: 'Garanzia scritta su manodopera. Schede tecniche materiali su richiesta.',
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)

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

      // Steps with line animation
      const steps = stepsRef.current?.querySelectorAll('.process-step')
      if (steps) {
        gsap.set(steps, { opacity: 0, x: -30 })
        ScrollTrigger.create({
          trigger: stepsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(steps, {
              opacity: 1,
              x: 0,
              duration: DURATION.base,
              stagger: 0.15,
              ease: EASE.expo,
            })
          },
        })
      }

      // Note
      gsap.set(noteRef.current, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: noteRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(noteRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            ease: EASE.expo,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-travertino overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="reveal-item flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-rovere" />
            <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
              Come lavoriamo
            </span>
            <span className="w-8 h-px bg-rovere" />
          </div>

          <h2
            className="reveal-item font-serif text-legno-bruciato leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            Il processo per
            <span className="text-legno-bruciato/40"> i professionisti.</span>
          </h2>

          <p className="reveal-item font-sans text-[16px] text-legno-bruciato/60 leading-relaxed">
            Dalla prima chiamata alla consegna finale. Ogni fase pianificata, 
            ogni dettaglio documentato.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Vertical line (desktop) */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-rovere/30 via-rovere/20 to-rovere/5 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="process-step relative flex gap-6 md:gap-10 pb-8 md:pb-12"
              >
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-rovere/20 flex items-center justify-center shadow-sm">
                    <span className="font-serif text-[28px] font-bold text-rovere">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon size={20} className="text-rovere" aria-hidden="true" />
                    <h3 className="font-serif text-[20px] font-bold text-legno-bruciato">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-sans text-[15px] text-legno-bruciato/60 leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response time note */}
        <div
          ref={noteRef}
          className="mt-8 md:mt-12 bg-legno-bruciato/5 border border-legno-bruciato/10 rounded-xl px-6 py-5 flex items-start gap-4 max-w-2xl mx-auto"
        >
          <Clock size={18} className="text-rovere flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="font-sans text-[13px] text-legno-bruciato/60 leading-relaxed">
            Rispondiamo in orario lavorativo (lun-ven 8:00-18:00, sab 9:00-13:00). 
            Preferiamo una risposta accurata a una risposta immediata.
          </p>
        </div>
      </div>
    </section>
  )
}
