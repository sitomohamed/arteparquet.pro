'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { AlertCircle, HelpCircle } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   PROBLEM SECTION — The architect's dilemma
   
   Design principles:
   - Asymmetric layout creates visual interest
   - Large typography for impact
   - Speaks directly to pain points
   - Creates emotional resonance before offering solution
═══════════════════════════════════════════════════════════════════════════ */

const painPoints = [
  'Il posatore non capisce il progetto',
  'Problemi tecnici scoperti in cantiere',
  'Ritardi che compromettono la consegna',
  'Transizioni mal gestite tra materiali',
  'Nessun supporto sulla fattibilità tecnica',
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      // Eyebrow line animation
      const line = eyebrowRef.current?.querySelector('.eyebrow-line')
      if (line) {
        gsap.set(line, { scaleX: 0, transformOrigin: 'left' })
        ScrollTrigger.create({
          trigger: eyebrowRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(line, {
              scaleX: 1,
              duration: DURATION.slow,
              ease: EASE.expo,
            })
          },
        })
      }

      // Headline reveal
      gsap.set(headlineRef.current, { opacity: 0, y: 50 })
      ScrollTrigger.create({
        trigger: headlineRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(headlineRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.slow,
            ease: EASE.expo,
          })
        },
      })

      // Text reveal
      gsap.set(textRef.current, { opacity: 0, y: 40 })
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            delay: 0.2,
            ease: EASE.expo,
          })
        },
      })

      // List items stagger
      const listItems = listRef.current?.children
      if (listItems) {
        gsap.set(listItems, { opacity: 0, x: -30 })
        ScrollTrigger.create({
          trigger: listRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(listItems, {
              opacity: 1,
              x: 0,
              duration: DURATION.base,
              stagger: 0.1,
              ease: EASE.expo,
            })
          },
        })
      }

      // Image parallax
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            const img = imageRef.current.querySelector('img')
            if (img) {
              gsap.set(img, { y: (self.progress - 0.5) * 50 })
            }
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-nero-marquina overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
              <span className="eyebrow-line w-8 h-px bg-rovere/60" />
              <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
                Il problema
              </span>
            </div>

            {/* Headline */}
            <h2
              ref={headlineRef}
              className="font-serif text-travertino leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Trovare un posatore è semplice.
              <br />
              <span className="text-travertino/40">
                Trovare un partner tecnico, no.
              </span>
            </h2>

            {/* Text */}
            <div ref={textRef} className="space-y-6 mb-10">
              <p className="font-sans text-[17px] text-travertino/70 leading-relaxed">
                Ogni architetto conosce la frustrazione di affidare un progetto 
                a chi non ne comprende la complessità. Quando il parquet non è 
                solo pavimento, ma parte integrante del concept.
              </p>
            </div>

            {/* Pain Points List */}
            <ul ref={listRef} className="space-y-4">
              {painPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <HelpCircle 
                      size={18} 
                      className="text-travertino/30 group-hover:text-rovere/60 transition-colors duration-300" 
                      aria-hidden="true" 
                    />
                  </div>
                  <span className="font-sans text-[15px] text-travertino/50 group-hover:text-travertino/70 transition-colors duration-300">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Image */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src="/portfolio/google-parquet-scala-01.jpg"
                alt="Cantiere parquet con scala - complessità tecnica"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/60 via-transparent to-transparent" />
            </div>

            {/* Floating quote */}
            <div className="absolute -bottom-6 -left-6 lg:left-auto lg:-right-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-[280px]">
              <AlertCircle size={20} className="text-rovere mb-3" aria-hidden="true" />
              <p className="font-serif text-[15px] text-travertino/80 italic leading-relaxed">
                "Ho bisogno di qualcuno che capisca il progetto, non solo che posi le tavole."
              </p>
              <p className="font-sans text-[12px] text-travertino/40 mt-3">
                — Ogni architetto, prima o poi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative element */}
      <div className="absolute top-1/2 right-0 w-[40%] h-[60%] -translate-y-1/2 bg-gradient-to-l from-rovere/5 to-transparent pointer-events-none" />
    </section>
  )
}
