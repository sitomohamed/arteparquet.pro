'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Phone } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'
import { BUSINESS } from '@/lib/constants'

/* ═══════════════════════════════════════════════════════════════════════════
   SOLUTION SECTION — Our response to the architect's problem
   
   Design principles:
   - Contrasting light background after dark problem section
   - Clear, confident messaging
   - Visual proof alongside claims
   - Transition to partnership narrative
═══════════════════════════════════════════════════════════════════════════ */

const solutionPoints = [
  {
    title: 'Parliamo la vostra lingua',
    desc: 'Comprendiamo schemi, transizioni, raccordi. Valutiamo la fattibilità tecnica prima di iniziare.',
  },
  {
    title: 'Gestiamo la complessità',
    desc: 'Massetti, sottofondi, livellazioni. Ogni fase tecnica sotto controllo, ogni problema anticipato.',
  },
  {
    title: 'Rispettiamo le tempistiche',
    desc: 'Coordinamento con altre maestranze, comunicazione costante, consegne puntuali.',
  },
]

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      // Content reveal
      const contentElements = contentRef.current?.querySelectorAll('.reveal-item')
      if (contentElements) {
        gsap.set(contentElements, { opacity: 0, y: 40 })
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(contentElements, {
              opacity: 1,
              y: 0,
              duration: DURATION.base,
              stagger: 0.15,
              ease: EASE.expo,
            })
          },
        })
      }

      // Image reveal with scale
      gsap.set(imageRef.current, { opacity: 0, scale: 0.95 })
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: DURATION.slow,
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
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <div className="lg:col-span-5 xl:col-span-6 order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative"
            >
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/portfolio/google-spina-pesce-rovere-01.jpg"
                  alt="Parquet spina di pesce rovere - lavorazione artigianale Arteparquet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Overlapping detail image */}
              <div className="absolute -bottom-8 -right-8 w-[45%] aspect-square rounded-xl overflow-hidden border-4 border-travertino shadow-xl hidden md:block">
                <Image
                  src="/portfolio/intarsio-stella-01.jpg"
                  alt="Dettaglio intarsio a stella - precisione artigianale"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>

              {/* Decorative line */}
              <div className="absolute -left-4 top-1/4 w-px h-32 bg-gradient-to-b from-rovere/0 via-rovere/40 to-rovere/0 hidden lg:block" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={contentRef} className="lg:col-span-7 xl:col-span-6 order-1 lg:order-2">
            {/* Eyebrow */}
            <div className="reveal-item flex items-center gap-4 mb-8">
              <span className="w-8 h-px bg-rovere" />
              <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
                La risposta
              </span>
            </div>

            {/* Headline */}
            <h2
              className="reveal-item font-serif text-legno-bruciato leading-[1.1] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
            >
              Un partner che capisce
              <br />
              <span className="text-rovere">prima di posare.</span>
            </h2>

            {/* Intro text */}
            <p className="reveal-item font-sans text-[17px] text-legno-bruciato/70 leading-relaxed mb-10 max-w-lg">
              Dal 1996 lavoriamo con studi professionali e imprese. Non siamo 
              solo posatori: siamo il vostro referente tecnico per il parquet.
            </p>

            {/* Solution points */}
            <div className="space-y-6 mb-10">
              {solutionPoints.map((point) => (
                <div
                  key={point.title}
                  className="reveal-item flex gap-4 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle 
                      size={22} 
                      className="text-rovere" 
                      aria-hidden="true" 
                    />
                  </div>
                  <div>
                    <h3 className="font-sans text-[16px] font-bold text-legno-bruciato mb-1">
                      {point.title}
                    </h3>
                    <p className="font-sans text-[14px] text-legno-bruciato/60 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal-item flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-legno-bruciato hover:bg-legno-bruciato/90 text-travertino font-sans text-[15px] font-bold px-7 py-4 rounded-xl transition-all duration-300 shadow-lg"
              >
                <Phone size={17} aria-hidden="true" />
                Parliamo del progetto
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 text-legno-bruciato font-sans text-[15px] font-semibold px-4 py-4 hover:text-rovere transition-colors duration-300 group"
              >
                Vedi i nostri lavori
                <ArrowRight 
                  size={16} 
                  className="transition-transform group-hover:translate-x-1" 
                  aria-hidden="true" 
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-[30%] h-full bg-gradient-to-r from-wood-100/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-rovere/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
