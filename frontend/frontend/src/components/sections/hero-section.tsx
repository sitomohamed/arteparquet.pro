'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, ArrowRight, ChevronDown } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION } from '@/lib/gsap'
import { cn } from '@/lib/utils'

const PHONE_CLEAN = '+393892407827'
const WHATSAPP_TEXT = encodeURIComponent(
  'Ciao! Vorrei una prima valutazione del mio parquet. Vi invio alcune foto.'
)
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${WHATSAPP_TEXT}`

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLAnchorElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      setIsLoaded(true)
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASE.expo },
        onComplete: () => setIsLoaded(true),
      })

      gsap.set([
        badgeRef.current,
        headlineRef.current,
        subheadRef.current,
        ctaRef.current,
        trustRef.current,
        phoneRef.current,
        scrollIndicatorRef.current,
      ], { 
        opacity: 0, 
        y: 40,
      })

      gsap.set(imageRef.current, { 
        scale: 1.15, 
        opacity: 0,
      })

      gsap.set(overlayRef.current, { 
        opacity: 0,
      })

      tl.to(imageRef.current, {
        scale: 1.05,
        opacity: 1,
        duration: DURATION.cinematic,
        ease: 'power2.out',
      }, 0)

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: DURATION.slow,
      }, 0.2)

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
      }, 0.4)

      tl.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
      }, 0.5)

      tl.to(subheadRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
      }, 0.7)

      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
      }, 0.85)

      tl.to(trustRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
      }, 1)

      tl.to(phoneRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.fast,
      }, 1.1)

      tl.to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
      }, 1.3)

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              y: self.progress * 150,
              scale: 1.05 + self.progress * 0.1,
            })
          }
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              y: self.progress * 80,
              opacity: 1 - self.progress * 0.5,
            })
          }
          if (scrollIndicatorRef.current) {
            gsap.set(scrollIndicatorRef.current, {
              opacity: 1 - self.progress * 3,
            })
          }
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-nero-marquina"
      aria-label="Arteparquet — Posa Restauro Levigatura Parquet dal 1996"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/portfolio/google-spina-pesce-lucida-01.jpg)',
            transform: 'scale(1.02)',
          }}
          role="img"
          aria-label="Parquet a spina di pesce rovere — lavoro Arteparquet Bergamo"
        />
      </div>

      <div 
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-nero-marquina/98 via-nero-marquina/85 to-nero-marquina/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/80 via-transparent to-nero-marquina/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-nero-marquina/25" />
      </div>

      <div 
        ref={contentRef}
        className="relative z-10 container-wide py-32 md:py-48 lg:py-56 will-change-transform"
      >
        <div className="max-w-2xl">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-3 mb-8"
            style={{ opacity: 0 }}
          >
            <span 
              className="h-[1.5px] w-12 bg-rovere"
              aria-hidden="true" 
            />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-rovere">
              Bergamo · Milano · Lombardia
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="font-serif font-semibold text-white leading-[1.05] mb-7 text-balance"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              letterSpacing: '-0.025em',
              textShadow: '0 2px 24px rgba(0,0,0,0.3)',
              opacity: 0,
            }}
          >
            Posa, Restauro e Levigatura<br />
            Parquet a Bergamo<br />
            <span className="text-rovere inline-block" style={{ textShadow: '0 2px 20px rgba(200,155,123,0.4)' }}>dal 1996</span>
          </h1>

          <p
            ref={subheadRef}
            className="font-sans text-white/85 leading-[1.7] mb-10"
            style={{ 
              fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)', 
              maxWidth: '36rem',
              letterSpacing: '-0.011em',
              opacity: 0,
            }}
          >
            Riportiamo il parquet alla sua bellezza originale e realizziamo nuovi
            pavimenti su misura. Sopralluogo gratuito a Bergamo, Milano e in tutta la Lombardia.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 mb-12"
            style={{ opacity: 0 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-xl bg-[#25D366] text-white font-sans text-[15px] font-semibold hover:bg-[#20b858] hover:shadow-[0_12px_32px_rgba(37,211,102,0.35)] active:scale-[0.97] transition-all duration-300 shadow-[0_8px_24px_rgba(37,211,102,0.25)] overflow-hidden"
              aria-label="Invia le foto del tuo parquet su WhatsApp per una valutazione gratuita"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <MessageCircle size={19} className="relative z-10" aria-hidden="true" />
              <span className="relative z-10">Invia le foto — Valutazione gratuita</span>
            </a>

            <Link
              href="/contatti"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-xl border-[1.5px] border-white/30 text-white font-sans text-[15px] font-medium hover:border-white/60 hover:bg-white/12 hover:shadow-[0_8px_24px_rgba(255,255,255,0.1)] active:scale-[0.97] transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Prenota sopralluogo gratuito</span>
              <ArrowRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div
            ref={trustRef}
            className="flex flex-wrap gap-x-6 gap-y-3"
            style={{ opacity: 0 }}
          >
            {[
              { label: '4,9/5 su Google', accent: true },
              { label: 'Garanzia scritta' },
              { label: 'Risposta in 5 min' },
              { label: 'Sopralluogo gratuito' },
            ].map(({ label, accent }) => (
              <span 
                key={label}
                className={cn(
                  "flex items-center gap-2 font-sans text-[13px] tracking-wide",
                  accent ? "text-rovere" : "text-white/70"
                )}
              >
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  accent ? "bg-rovere" : "bg-white/40"
                )} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        ref={phoneRef}
        href={`tel:${PHONE_CLEAN}`}
        className="absolute bottom-10 right-8 z-10 hidden md:flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white/[0.09] border border-white/25 backdrop-blur-xl text-white font-sans text-[13.5px] font-semibold hover:bg-white/[0.15] hover:border-white/40 hover:shadow-[0_8px_32px_rgba(255,255,255,0.12)] active:scale-[0.97] transition-all duration-400 group"
        aria-label="Chiama Arteparquet"
        style={{ opacity: 0 }}
      >
        <div className="w-8 h-8 rounded-full bg-rovere/20 flex items-center justify-center group-hover:bg-rovere/30 transition-colors duration-300">
          <Phone size={15} className="text-rovere" aria-hidden="true" />
        </div>
        <span className="tracking-wide">+39 389 240 7827</span>
      </a>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
          Scopri
        </span>
        <div className="relative w-6 h-10 rounded-full border border-white/30 flex justify-center">
          <div className="absolute top-2 w-1 h-2 rounded-full bg-rovere animate-[scroll-indicator_1.5s_ease-in-out_infinite]" />
        </div>
        <ChevronDown size={16} className="text-white/40 animate-bounce" aria-hidden="true" />
      </div>

      <style jsx global>{`
        @keyframes scroll-indicator {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}
