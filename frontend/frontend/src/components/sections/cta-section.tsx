'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

const PHONE = '+39 389 240 7827'
const PHONE_CLEAN = '+393892407827'
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(
  'Ciao! Vorrei una prima valutazione del mio parquet. Vi invio alcune foto.'
)}`

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLAnchorElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      const elements = [
        { el: lineRef.current, y: 0, scale: 0, scaleX: 0 },
        { el: labelRef.current, y: 30 },
        { el: headingRef.current, y: 50 },
        { el: descRef.current, y: 40 },
        { el: buttonsRef.current, y: 40 },
        { el: phoneRef.current, y: 30 },
        { el: trustRef.current, y: 30 },
      ]

      elements.forEach(({ el, y, scale, scaleX }) => {
        if (el) {
          gsap.set(el, { 
            opacity: 0, 
            y: y ?? 0,
            scale: scale ?? 1,
            scaleX: scaleX ?? 1,
          })
        }
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: EASE.expo } })

          tl.to(lineRef.current, {
            opacity: 1,
            scaleX: 1,
            duration: DURATION.slow,
          }, 0)

          tl.to(labelRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
          }, 0.1)

          tl.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.slow,
          }, 0.2)

          tl.to(descRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
          }, 0.35)

          tl.to(buttonsRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
          }, 0.45)

          tl.to(phoneRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.fast,
          }, 0.55)

          tl.to(trustRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
          }, 0.65)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-nero-marquina overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-wood-900/35 via-transparent to-nero-marquina/20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/40 via-transparent to-transparent" aria-hidden="true" />
      <div 
        ref={lineRef}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rovere/60 to-transparent origin-center" 
        style={{ opacity: 0, transform: 'scaleX(0)' }}
        aria-hidden="true" 
      />

      <div className="relative z-10 container-wide py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <span 
            ref={labelRef}
            className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-6"
            style={{ opacity: 0 }}
          >
            Valutazione Gratuita
          </span>
          <h2
            ref={headingRef}
            id="cta-heading"
            className="font-serif font-semibold text-white leading-[1.1] mb-5 text-balance"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', opacity: 0 }}
          >
            Invia le foto del tuo parquet<br />
            <em className="not-italic text-rovere">su WhatsApp</em>
          </h2>
          <p 
            ref={descRef}
            className="font-sans text-white/65 leading-relaxed mb-10 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', opacity: 0 }}
          >
            Scattaci alcune foto del pavimento e ricevi una prima valutazione gratuita.
            Nessun impegno, risposta entro 5 minuti.
          </p>

          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            style={{ opacity: 0 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-sans text-[15px] font-semibold hover:bg-[#20b858] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#25D366]/20"
              aria-label="Invia le foto del parquet su WhatsApp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Invia le foto su WhatsApp
            </a>
            <Link
              href="/contatti"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/25 text-white font-sans text-[15px] font-medium hover:border-white/55 hover:bg-white/8 active:scale-[0.98] transition-all duration-200"
            >
              Prenota sopralluogo gratuito
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <a
            ref={phoneRef}
            href={`tel:${PHONE_CLEAN}`}
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-white/55 hover:text-rovere transition-colors"
            style={{ opacity: 0 }}
          >
            <Phone size={15} aria-hidden="true" />
            oppure chiama: {PHONE}
          </a>

          <div 
            ref={trustRef}
            className="flex flex-wrap justify-center gap-6 mt-12 pt-10 border-t border-white/10"
            style={{ opacity: 0 }}
          >
            {[
              '✓ Sopralluogo gratuito a Bergamo e Milano',
              '✓ Garanzia scritta sulla manodopera',
              '✓ Preventivo dettagliato senza impegno',
              '✓ Risposta in 5 minuti su WhatsApp',
            ].map((item) => (
              <span key={item} className="font-sans text-[12.5px] text-white/45 tracking-wide">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
