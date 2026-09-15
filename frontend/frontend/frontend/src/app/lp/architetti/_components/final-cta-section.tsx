'use client'

import { useRef, useEffect } from 'react'
import { Phone, Mail, ArrowRight, Clock } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'
import { BUSINESS } from '@/lib/constants'

/* ═══════════════════════════════════════════════════════════════════════════
   FINAL CTA SECTION — Memorable closing with strong call to action
═══════════════════════════════════════════════════════════════════════════ */

const TEL_HREF = `tel:${BUSINESS.phoneRaw}`
const EMAIL_HREF = `mailto:${BUSINESS.email}`

export function FinalCtaSection() {
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
      className="relative py-24 md:py-32 lg:py-40 bg-travertino overflow-hidden"
    >
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rovere/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-wood-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
        <div ref={contentRef} className="text-center">
          {/* Eyebrow */}
          <div className="reveal-item flex items-center justify-center gap-4 mb-8">
            <span className="w-12 h-px bg-rovere" />
            <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
              Parliamo
            </span>
            <span className="w-12 h-px bg-rovere" />
          </div>

          {/* Headline */}
          <h2
            className="reveal-item font-serif text-legno-bruciato leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Hai un progetto?
            <br />
            <span className="text-rovere">Parliamone.</span>
          </h2>

          {/* Subtext */}
          <p className="reveal-item font-sans text-[18px] text-legno-bruciato/60 leading-relaxed max-w-xl mx-auto mb-12">
            Email preferita dai professionisti per richieste dettagliate. 
            Telefono per urgenze cantiere o domande rapide.
          </p>

          {/* Contact Cards */}
          <div className="reveal-item grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-12">
            {/* Email Card */}
            <a
              href={EMAIL_HREF}
              className="group flex flex-col items-center gap-5 bg-legno-bruciato text-travertino p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-rovere flex items-center justify-center">
                <Mail size={24} className="text-white" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="font-sans text-[17px] font-bold text-travertino mb-1">
                  Email
                </p>
                <p className="font-sans text-[14px] text-travertino/70 mb-2">
                  {BUSINESS.email}
                </p>
                <span className="inline-flex items-center gap-1 text-rovere font-sans text-[12px] font-semibold">
                  Preferita dai professionisti
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-travertino/60 font-sans text-[13px] group-hover:text-rovere group-hover:gap-3 transition-all duration-300">
                Scrivi ora
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </a>

            {/* Phone Card */}
            <a
              href={TEL_HREF}
              className="group flex flex-col items-center gap-5 bg-white border border-legno-bruciato/10 p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-rovere/30"
            >
              <div className="w-14 h-14 rounded-full bg-rovere/10 flex items-center justify-center group-hover:bg-rovere/20 transition-colors duration-300">
                <Phone size={24} className="text-rovere" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="font-sans text-[17px] font-bold text-legno-bruciato mb-1">
                  Telefono
                </p>
                <p className="font-sans text-[14px] text-legno-bruciato/60 mb-2">
                  {BUSINESS.phone}
                </p>
                <span className="inline-flex items-center gap-1.5 text-legno-bruciato/50 font-sans text-[12px]">
                  <Clock size={12} aria-hidden="true" />
                  lun-ven 8-18 · sab 9-13
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-legno-bruciato/60 font-sans text-[13px] group-hover:text-rovere group-hover:gap-3 transition-all duration-300">
                Chiama ora
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </a>
          </div>

          {/* Final message */}
          <p className="reveal-item font-sans text-[14px] text-legno-bruciato/40 max-w-md mx-auto">
            Sopralluogo gratuito · Preventivo dettagliato · Garanzia scritta
          </p>
        </div>
      </div>
    </section>
  )
}
