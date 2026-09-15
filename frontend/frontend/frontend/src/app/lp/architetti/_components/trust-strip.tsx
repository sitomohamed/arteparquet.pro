'use client'

import { useRef, useEffect } from 'react'
import { Shield, Clock, FileCheck, Star } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   TRUST STRIP — Horizontal credibility bar
   
   Design principles:
   - Breaks the dark hero flow with contrasting light section
   - Horizontal layout conveys stability and professionalism
   - Quick-scan trust signals
═══════════════════════════════════════════════════════════════════════════ */

const trustItems = [
  {
    icon: Clock,
    label: 'Dal 1996',
    sublabel: '28+ anni',
  },
  {
    icon: Shield,
    label: 'Garanzia scritta',
    sublabel: 'Su ogni lavoro',
  },
  {
    icon: FileCheck,
    label: 'Preventivi tecnici',
    sublabel: 'Dettagliati',
  },
  {
    icon: Star,
    label: '4.7/5 Google',
    sublabel: 'Recensioni reali',
  },
]

export function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      const items = itemsRef.current?.children
      if (!items) return

      gsap.set(items, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            stagger: 0.1,
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
      className="relative bg-travertino py-8 md:py-10"
    >
      {/* Subtle top shadow for depth */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-legno-bruciato/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          ref={itemsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-legno-bruciato/5 flex items-center justify-center group-hover:bg-rovere/10 transition-colors duration-300">
                <item.icon size={22} className="text-rovere" aria-hidden="true" />
              </div>
              <div>
                <p className="font-sans text-[14px] font-bold text-legno-bruciato leading-tight">
                  {item.label}
                </p>
                <p className="font-sans text-[12px] text-legno-bruciato/50 mt-0.5">
                  {item.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom shadow for depth */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-legno-bruciato/10 to-transparent" />
    </section>
  )
}
