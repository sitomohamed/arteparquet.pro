'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

const STEPS = [
  {
    number: '01',
    title: 'Consulenza',
    description:
      'Sopralluogo gratuito e senza impegno. Ascoltiamo le tue esigenze, misuriamo lo spazio e valutiamo le possibilità.',
    detail: 'Entro 48 ore dalla richiesta',
  },
  {
    number: '02',
    title: 'Proposta',
    description:
      'Preventivo dettagliato e trasparente. Nessun costo nascosto, nessuna sorpresa. Solo chiarezza e professionalità.',
    detail: 'Entro 24 ore dal sopralluogo',
  },
  {
    number: '03',
    title: 'Realizzazione',
    description:
      'Posa a regola d\'arte con materiali premium. Il cantiere viene gestito con massima cura e rispetto per la tua casa.',
    detail: 'Tempi rispettati al 100%',
  },
  {
    number: '04',
    title: 'Consegna',
    description:
      'Il tuo nuovo pavimento, pronto da vivere. Consegna con pulizia finale inclusa e garanzia sulla posa.',
    detail: 'Garanzia scritta inclusa',
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 50 })
      
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

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' })
        
        ScrollTrigger.create({
          trigger: lineRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(lineRef.current, {
              scaleX: 1,
              duration: DURATION.cinematic,
              ease: EASE.expo,
            })
          },
        })
      }

      if (stepsRef.current) {
        const steps = stepsRef.current.children
        gsap.set(steps, { opacity: 0, y: 60 })
        
        ScrollTrigger.create({
          trigger: stepsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(steps, {
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
    <section ref={sectionRef} className="bg-white" aria-labelledby="process-heading">
      <div className="container-wide py-24 md:py-32">
        <div ref={headerRef} className="text-center mb-16 md:mb-20" style={{ opacity: 0 }}>
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
            Come Lavoriamo
          </span>
          <h2
            id="process-heading"
            className="font-serif font-semibold text-legno-bruciato mb-4 text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Un percorso semplice e trasparente.
          </h2>
          <p className="font-sans text-[16px] text-neutral-500 max-w-md mx-auto">
            Dall'idea al pavimento finito, ogni fase è gestita con la massima attenzione.
          </p>
        </div>

        <div className="relative">
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-wood-200 to-transparent opacity-60"
            aria-hidden="true"
          />

          <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {STEPS.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({ step }: { step: typeof STEPS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || getReducedMotion()) return

    const card = cardRef.current
    const circle = circleRef.current

    const handleMouseEnter = () => {
      if (circle) {
        gsap.to(circle, {
          scale: 1.05,
          boxShadow: '0 8px 30px rgba(200,155,123,0.18)',
          duration: DURATION.fast,
          ease: EASE.expo,
        })
      }
    }

    const handleMouseLeave = () => {
      if (circle) {
        gsap.to(circle, {
          scale: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
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
      className="flex flex-col items-center lg:items-center text-center group"
    >
      <div className="relative mb-6">
        <div
          ref={circleRef}
          className="w-[104px] h-[104px] rounded-full border border-neutral-200 group-hover:border-rovere/60 bg-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.06)] will-change-transform"
        >
          <span
            className="font-serif font-semibold text-neutral-300 group-hover:text-rovere transition-colors duration-300"
            style={{ fontSize: '2rem' }}
          >
            {step.number}
          </span>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rovere opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      </div>

      <h3 className="font-serif font-semibold text-legno-bruciato text-[1.2rem] mb-3">
        {step.title}
      </h3>
      <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-4 max-w-[200px]">
        {step.description}
      </p>
      <span className="inline-flex items-center font-sans text-[11.5px] font-semibold text-rovere bg-wood-50 ring-1 ring-wood-100 px-3 py-1.5 rounded-full">
        {step.detail}
      </span>
    </div>
  )
}
