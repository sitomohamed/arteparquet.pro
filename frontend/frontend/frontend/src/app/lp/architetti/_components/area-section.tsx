'use client'

import { useRef, useEffect } from 'react'
import { MapPin, CheckCircle } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   AREA SECTION — Geographic coverage
═══════════════════════════════════════════════════════════════════════════ */

const primaryAreas = [
  'Bergamo',
  'Milano',
  'Brescia',
  'Como',
]

const secondaryAreas = [
  'Monza e Brianza',
  'Lecco',
  'Varese',
  'Lodi',
  'Cremona',
  'Pavia',
]

export function AreaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('.reveal-item')
      if (elements) {
        gsap.set(elements, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
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
      className="relative py-20 md:py-24 bg-wood-100"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        <div ref={contentRef} className="text-center">
          {/* Eyebrow */}
          <div className="reveal-item flex items-center justify-center gap-4 mb-6">
            <MapPin size={20} className="text-rovere" aria-hidden="true" />
            <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
              Area di intervento
            </span>
          </div>

          {/* Headline */}
          <h2
            className="reveal-item font-serif text-legno-bruciato leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)' }}
          >
            Bergamo e tutta la
            <span className="text-rovere"> Lombardia.</span>
          </h2>

          <p className="reveal-item font-sans text-[16px] text-legno-bruciato/60 leading-relaxed max-w-xl mx-auto mb-10">
            Sede operativa a Bergamo. Collaboriamo con studi e imprese in tutta 
            la regione. Fuori Lombardia valutiamo caso per caso.
          </p>

          {/* Primary areas */}
          <div className="reveal-item flex flex-wrap justify-center gap-3 mb-6">
            {primaryAreas.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 bg-legno-bruciato text-travertino font-sans text-[14px] font-semibold px-5 py-2.5 rounded-full"
              >
                <CheckCircle size={14} aria-hidden="true" />
                {city}
              </span>
            ))}
          </div>

          {/* Secondary areas */}
          <div className="reveal-item flex flex-wrap justify-center gap-2">
            {secondaryAreas.map((city) => (
              <span
                key={city}
                className="bg-white/80 border border-legno-bruciato/10 text-legno-bruciato/70 font-sans text-[13px] font-medium px-4 py-2 rounded-full"
              >
                {city}
              </span>
            ))}
            <span className="bg-white/80 border border-legno-bruciato/10 text-legno-bruciato/40 font-sans text-[13px] font-medium px-4 py-2 rounded-full">
              + altre province
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
