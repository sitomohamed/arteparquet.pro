'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Award, Star, MapPin } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   HERITAGE SECTION — Dal 1996 + Teatro alla Scala
   
   Design principles:
   - Premium credential highlight
   - Careful wording per brief (team involvement, not "we built La Scala")
   - Creates authority and trust
═══════════════════════════════════════════════════════════════════════════ */

export function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('.reveal-item')
      if (elements) {
        gsap.set(elements, { opacity: 0, y: 40 })
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(elements, {
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
      className="relative py-24 md:py-32 lg:py-40 bg-nero-marquina overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/portfolio/google-spina-pesce-rovere-01.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div ref={contentRef}>
            {/* Eyebrow */}
            <div className="reveal-item flex items-center gap-4 mb-8">
              <span className="w-8 h-px bg-rovere" />
              <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
                La nostra storia
              </span>
            </div>

            {/* Headline */}
            <h2
              className="reveal-item font-serif text-travertino leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Dal 1996.
              <br />
              <span className="text-rovere">Bergamo, Lombardia.</span>
            </h2>

            {/* Body text */}
            <div className="reveal-item space-y-5 mb-10">
              <p className="font-sans text-[17px] text-travertino/70 leading-relaxed">
                Oltre 28 anni di esperienza in posa e restauro parquet. 
                Cantieri residenziali, commerciali e di pregio in tutta la Lombardia.
              </p>
              <p className="font-sans text-[17px] text-travertino/70 leading-relaxed">
                Nel 2004, esperienza maturata in team coinvolti in progetti 
                legati al Teatro alla Scala di Milano. Un traguardo che rappresenta 
                il livello di precisione e affidabilità che portiamo in ogni cantiere.
              </p>
            </div>

            {/* La Scala highlight */}
            <div className="reveal-item bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rovere/20 flex items-center justify-center">
                  <Award size={24} className="text-rovere" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-[18px] font-bold text-travertino mb-2">
                    Teatro alla Scala, 2004
                  </h3>
                  <p className="font-sans text-[14px] text-travertino/60 leading-relaxed">
                    Esperienza maturata in team coinvolti in progetti legati al 
                    Teatro alla Scala di Milano. Un riferimento per la qualità 
                    del nostro lavoro.
                  </p>
                </div>
              </div>
            </div>

            {/* Google rating */}
            <div className="reveal-item flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400/50 fill-yellow-400/50'} 
                    aria-hidden="true" 
                  />
                ))}
              </div>
              <span className="font-sans text-[14px] text-travertino/60">
                4.7/5 su Google · Recensioni verificabili
              </span>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="font-serif text-[56px] md:text-[72px] font-bold text-rovere leading-none">
                1996
              </p>
              <p className="font-sans text-[13px] text-travertino/50 mt-2">
                Anno di fondazione
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="font-serif text-[56px] md:text-[72px] font-bold text-travertino leading-none">
                28+
              </p>
              <p className="font-sans text-[13px] text-travertino/50 mt-2">
                Anni di esperienza
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center col-span-2">
              <div className="flex items-center justify-center gap-3 mb-2">
                <MapPin size={20} className="text-rovere" aria-hidden="true" />
                <p className="font-serif text-[28px] md:text-[36px] font-bold text-travertino leading-none">
                  Bergamo
                </p>
              </div>
              <p className="font-sans text-[13px] text-travertino/50">
                Sede operativa · Tutta la Lombardia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rovere/5 to-transparent pointer-events-none" />
    </section>
  )
}
