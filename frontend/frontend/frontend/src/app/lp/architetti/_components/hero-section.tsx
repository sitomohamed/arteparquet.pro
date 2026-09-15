'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Phone, Mail, ArrowDown, MapPin, Award } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'
import { BUSINESS } from '@/lib/constants'
import { cn } from '@/lib/utils'

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION — The most important part of the page
   
   Design principles:
   - Full viewport immersive
   - Cinematic headline reveal
   - Editorial composition with asymmetric balance
   - Clear value proposition
   - Immediate trust signals
═══════════════════════════════════════════════════════════════════════════ */

const TEL_HREF = `tel:${BUSINESS.phoneRaw}`
const EMAIL_HREF = `mailto:${BUSINESS.email}`

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current, badgesRef.current], {
        opacity: 0,
        y: 60,
      })
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 })
      gsap.set(imageRef.current, { scale: 1.1 })

      // Main timeline
      const tl = gsap.timeline({ delay: 0.3 })

      // Image zoom settle
      tl.to(imageRef.current, {
        scale: 1,
        duration: DURATION.cinematic,
        ease: 'power2.out',
      }, 0)

      // Headline reveal
      tl.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.expo,
      }, 0.2)

      // Subtitle
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.expo,
      }, 0.4)

      // CTA buttons
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
        ease: EASE.expo,
      }, 0.6)

      // Trust badges
      tl.to(badgesRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
        ease: EASE.expo,
      }, 0.75)

      // Scroll indicator
      tl.to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
        ease: EASE.expo,
      }, 1)

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              y: self.progress * 100,
              scale: 1 + self.progress * 0.1,
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
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/portfolio/parquet-spina-pesce-01.jpg"
            alt="Parquet spina di pesce rovere - posa professionale Arteparquet"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-nero-marquina/70 via-nero-marquina/60 to-nero-marquina/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-nero-marquina/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col gap-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-rovere" />
              <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
                Partner Tecnico B2B
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-serif font-bold text-travertino leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
              Il vostro progetto.
              <br />
              <span className="text-rovere">La nostra precisione.</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-sans text-[18px] md:text-[20px] text-travertino/70 max-w-xl leading-relaxed"
            >
              Partner tecnico per architetti, interior designer e imprese. 
              Pose complesse, transizioni, massetti, restauri. 
              <span className="text-travertino font-medium"> Bergamo e Lombardia dal 1996.</span>
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href={TEL_HREF}
                className="group inline-flex items-center justify-center gap-3 bg-rovere hover:bg-wood-500 text-white font-sans text-[15px] font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-rovere/20"
              >
                <Phone size={18} className="transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>{BUSINESS.phone}</span>
              </a>
              <a
                href={EMAIL_HREF}
                className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-travertino font-sans text-[15px] font-semibold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Mail size={18} className="transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>Scrivi al progetto</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div ref={badgesRef} className="flex flex-wrap items-center gap-6 mt-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-rovere" aria-hidden="true" />
                <span className="font-sans text-[13px] text-travertino/60 font-medium">
                  Dal 1996
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-rovere" aria-hidden="true" />
                <span className="font-sans text-[13px] text-travertino/60 font-medium">
                  Bergamo · Lombardia
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-[13px] text-travertino/60 font-medium">
                  ★ 4.7/5 Google
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-end items-center">
            {/* Floating Stats Card */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-xs">
                <div className="space-y-6">
                  <div>
                    <p className="font-serif text-[48px] font-bold text-rovere leading-none">28+</p>
                    <p className="font-sans text-[13px] text-travertino/60 mt-1">anni di esperienza</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="font-serif text-[48px] font-bold text-travertino leading-none">2004</p>
                    <p className="font-sans text-[13px] text-travertino/60 mt-1">Teatro alla Scala</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="font-sans text-[13px] text-travertino/50 leading-relaxed">
                      Esperienza maturata in team coinvolti in progetti di alta prestigio
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-rovere/20 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-rovere/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-travertino/40"
      >
        <span className="font-sans text-[11px] tracking-widest uppercase">Scopri</span>
        <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}
