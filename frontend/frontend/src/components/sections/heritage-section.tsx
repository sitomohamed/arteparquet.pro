'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

const MILESTONES = [
  {
    year: '1996',
    label: 'L\'inizio',
    heading: 'Una passione\nnata nel 1996.',
    body: 'È il 1996 quando Mohamed Arabi muove i suoi primi passi nel mondo del parquet. Non è un lavoro: è una vocazione. Anno dopo anno, cantiere dopo cantiere, impara a leggere il legno come si legge un testo antico — le sue venature, i suoi movimenti stagionali, i suoi silenzi.',
    aside: 'Bergamo, Lombardia',
  },
  {
    year: '2004',
    label: 'Il momento decisivo',
    heading: 'Teatro alla Scala\ndi Milano.',
    body: 'Nel 2004 arriva il riconoscimento più importante della carriera: Mohamed Arabi entra a far parte del team professionale coinvolto nei lavori presso il Teatro alla Scala di Milano — uno dei luoghi simbolo della cultura e dell\'eccellenza italiana nel mondo. Un\'esperienza che ha segnato per sempre il suo approccio al mestiere.',
    aside: 'Milano, Italia',
  },
  {
    year: 'Oggi',
    label: 'Oltre tre decadi',
    heading: 'Quasi trent\'anni\ndi esperienza.',
    body: 'Dal 1996 ad oggi, un\'unica costante: la dedizione al legno. Ogni progetto riceve la stessa cura di un\'opera artigianale. Ogni pavimento è pensato per durare generazioni. Perché chi ha lavorato alla Scala sa che l\'eccellenza non è un obiettivo — è un abitudine.',
    aside: 'Lombardia e tutta Italia',
  },
]

function Milestone({
  milestone,
  index,
  isLast,
}: {
  milestone: (typeof MILESTONES)[number]
  index: number
  isLast: boolean
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const lineTopRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const lineBottomRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rowRef.current) return
    
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.set(yearRef.current, { opacity: 0, x: -40 })
      gsap.set(contentRef.current, { opacity: 0, x: 40 })
      gsap.set(lineTopRef.current, { scaleY: 0, transformOrigin: 'top' })
      gsap.set(dotRef.current, { scale: 0, opacity: 0 })
      gsap.set(lineBottomRef.current, { scaleY: 0, transformOrigin: 'top' })
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, y: 20 })
      }

      ScrollTrigger.create({
        trigger: rowRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: EASE.expo } })

          tl.to(lineTopRef.current, {
            scaleY: 1,
            duration: DURATION.base,
          }, 0)

          tl.to(yearRef.current, {
            opacity: 1,
            x: 0,
            duration: DURATION.slow,
          }, 0.1)

          tl.to(dotRef.current, {
            scale: 1,
            opacity: 1,
            duration: DURATION.fast,
            ease: EASE.bounce,
          }, 0.3)

          tl.to(contentRef.current, {
            opacity: 1,
            x: 0,
            duration: DURATION.slow,
          }, 0.2)

          if (!isLast) {
            tl.to(lineBottomRef.current, {
              scaleY: 1,
              duration: DURATION.slow,
            }, 0.4)
          }

          if (badgeRef.current) {
            tl.to(badgeRef.current, {
              opacity: 1,
              y: 0,
              duration: DURATION.base,
            }, 0.5)
          }
        },
      })
    }, rowRef)

    return () => ctx.revert()
  }, [isLast])

  return (
    <div ref={rowRef} className="relative grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-0">

      <div
        ref={yearRef}
        className="flex lg:justify-end lg:pr-16 mb-6 lg:mb-0 lg:pb-20"
        style={{ opacity: 0 }}
      >
        <div className="lg:text-right">
          <div
            className="font-serif font-semibold leading-none select-none"
            style={{
              fontSize: 'clamp(5rem, 12vw, 9rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(200,155,123,0.25)',
              letterSpacing: '-0.03em',
            }}
            aria-hidden="true"
          >
            {milestone.year}
          </div>

          <div className="mt-3 lg:mt-4">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-rovere/70">
              {milestone.label}
            </span>
            <p className="font-sans text-[12px] text-white/30 mt-1">
              {milestone.aside}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center">
        <div
          ref={lineTopRef}
          className="w-px bg-gradient-to-b from-rovere/50 to-rovere/10 flex-1"
          style={{ transformOrigin: 'top' }}
        />
        <div
          ref={dotRef}
          className="w-3 h-3 rounded-full bg-rovere ring-4 ring-rovere/20 flex-shrink-0 my-2"
        />
        {!isLast && (
          <div
            ref={lineBottomRef}
            className="w-px bg-gradient-to-b from-rovere/10 to-rovere/50 flex-1"
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      <div
        ref={contentRef}
        className="lg:pl-16 pb-20 lg:pb-24"
        style={{ opacity: 0 }}
      >
        <div className="lg:hidden inline-flex items-center gap-2 mb-5">
          <span className="font-serif font-semibold text-rovere text-[1.75rem] leading-none">
            {milestone.year}
          </span>
          <span className="h-px w-8 bg-rovere/40" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-rovere/60">
            {milestone.label}
          </span>
        </div>

        <h3
          className="font-serif font-semibold text-white leading-[1.1] mb-6 whitespace-pre-line"
          style={{ fontSize: 'clamp(1.625rem, 3.5vw, 2.625rem)' }}
        >
          {milestone.heading}
        </h3>

        <p className="font-sans text-[15px] md:text-[16px] text-white/60 leading-[1.75] max-w-lg">
          {milestone.body}
        </p>

        {index === 1 && (
          <div
            ref={badgeRef}
            className="mt-8 inline-flex items-center gap-3 border border-rovere/30 rounded-xl px-5 py-3 bg-rovere/5 backdrop-blur-sm"
            style={{ opacity: 0 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-rovere flex-shrink-0" />
            <span className="font-sans text-[12px] font-medium text-white/70 tracking-wide">
              Teatro alla Scala di Milano — 2004
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const credRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (bgRef.current) {
            const y = self.progress * 8
            const opacity = 0.04 + Math.sin(self.progress * Math.PI) * 0.02
            gsap.set(bgRef.current, { yPercent: y, opacity })
          }
        },
      })

      gsap.set(headerRef.current, { opacity: 0, y: 60 })
      
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

      if (credRef.current) {
        const items = credRef.current.querySelectorAll('[data-cred-item]')
        gsap.set(items, { opacity: 0, y: 20 })
        
        ScrollTrigger.create({
          trigger: credRef.current,
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
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 30 })
        
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(ctaRef.current, {
              opacity: 1,
              y: 0,
              duration: DURATION.base,
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
      className="relative bg-nero-marquina overflow-hidden"
      aria-labelledby="heritage-heading"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px',
          }}
        />
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-rovere/[0.06] blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-rovere/[0.05] blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-rovere/[0.03] blur-[160px]" />
      </div>

      <div className="relative z-10 container-wide pt-28 pb-0 md:pt-36">
        <div ref={headerRef} className="max-w-3xl mb-24 md:mb-32" style={{ opacity: 0 }}>
          <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-rovere mb-7">
            La nostra storia — Dal 1996
          </span>

          <h2
            id="heritage-heading"
            className="font-serif font-semibold text-white leading-[1.05] mb-8 text-balance"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
          >
            Dal 1996, il legno<br />
            <em className="not-italic text-rovere">è il nostro mestiere.</em>
          </h2>

          <p
            className="font-sans text-white/55 leading-[1.8] max-w-xl"
            style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)' }}
          >
            Una storia costruita nel tempo, tra esperienza artigianale, precisione
            e passione per il legno. Dal 1996 Mohamed Arabi lavora nel mondo del
            parquet, trasformando ogni pavimento in un progetto fatto per durare.
          </p>
        </div>

        <div role="list" aria-label="Storia di Arteparquet">
          {MILESTONES.map((m, i) => (
            <div key={m.year} role="listitem">
              <Milestone milestone={m} index={i} isLast={i === MILESTONES.length - 1} />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={credRef}
        className="relative z-10 border-t border-white/8 mt-4"
      >
        <div className="container-wide py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { label: 'Inizio carriera', value: '1996' },
              { label: 'Teatro alla Scala', value: '2004' },
              { label: 'Anni di esperienza', value: '30+' },
              { label: 'Sede', value: 'Bergamo, IT' },
            ].map((c) => (
              <div
                key={c.label}
                data-cred-item
                className="md:px-10 first:pl-0 last:pr-0 text-center md:text-left"
              >
                <p
                  className="font-serif font-semibold text-white leading-none mb-2"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                >
                  {c.value}
                </p>
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-white/35">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={ctaRef} className="relative z-10 border-t border-white/8" style={{ opacity: 0 }}>
        <div className="container-wide py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-serif italic text-[1.0625rem] text-white/50 text-center sm:text-left max-w-md leading-relaxed">
            &ldquo;Ogni listello di legno racconta una storia. Il nostro compito
            è orchestrarle in una sinfonia perfetta sotto i tuoi piedi.&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/chi-siamo"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-rovere/40 text-rovere font-sans text-[13px] font-semibold hover:border-rovere hover:bg-rovere/10 transition-all duration-200"
            >
              Scopri la storia
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-rovere text-white font-sans text-[13px] font-semibold hover:bg-wood-500 transition-all duration-200"
            >
              Richiedi Preventivo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
