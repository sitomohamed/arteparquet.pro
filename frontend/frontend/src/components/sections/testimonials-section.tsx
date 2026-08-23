'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/Arteparquet+Di+Arabi+Mohamed+Bergamo'

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Arabi Mohamed ha rimesso a nuovo dei parquet disastrati. È stato veloce, molto disponibile, puntuale e professionale. Siamo entusiasti!',
    author: 'Maria Goisis',
    source: 'Recensione Google',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'La postura del laminato è stata eccellente. Artigiano puntuale, preciso, abile ed affidabile. Sicuramente invito chi ne abbia bisogno a contattarlo.',
    author: 'Silvia Ricci',
    source: 'Recensione Google',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Siamo estremamente soddisfatti sia per la qualità del lavoro che per la totale disponibilità a venire incontro ai nostri imprevisti. Consigliatissimo',
    author: 'Laura Bellentani',
    source: 'Recensione Google',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} stelle su 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-rovere text-rovere' : 'text-neutral-300'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [paused, next])

  useEffect(() => {
    if (!cardRef.current || getReducedMotion()) return

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: DURATION.fast, ease: EASE.expo }
    )
  }, [current])

  useEffect(() => {
    if (!sectionRef.current) return
    
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 40 })
      gsap.set(footerRef.current, { opacity: 0, y: 30 })
      
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            ease: EASE.expo,
          })
        },
      })

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(footerRef.current, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            ease: EASE.expo,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const t = TESTIMONIALS[current]

  return (
    <section
      ref={sectionRef}
      className="bg-travertino"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-wide py-24 md:py-32">
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
            Recensioni Google
          </span>
          <h2
            id="testimonials-heading"
            className="font-serif font-semibold text-legno-bruciato"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Cosa dicono i clienti.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div
              ref={cardRef}
              key={t.id}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.07)] border border-neutral-100/80"
            >
              <Quote
                size={28}
                className="text-rovere/25 mb-6"
                aria-hidden="true"
              />

              <StarRating rating={t.rating} />

              <blockquote className="mt-5 mb-8">
                <p
                  className="font-serif italic text-legno-bruciato leading-relaxed"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rovere/15 flex items-center justify-center">
                    <span className="font-serif font-semibold text-rovere text-lg">
                      {t.author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-[14px] font-semibold text-legno-bruciato">
                      {t.author}
                    </p>
                    <p className="font-sans text-[12px] text-neutral-500">
                      {t.source}
                    </p>
                  </div>
                </div>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[12px] text-rovere hover:text-wood-600 underline underline-offset-2 transition-colors"
                >
                  Vedi su Google
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prev}
                aria-label="Recensione precedente"
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-rovere hover:text-rovere hover:bg-wood-50 transition-all duration-200 flex items-center justify-center"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              <div className="flex gap-2" role="tablist" aria-label="Recensioni">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Recensione ${i + 1}`}
                    className={cn(
                      'rounded-full transition-all duration-300',
                      i === current
                        ? 'w-6 h-2 bg-rovere'
                        : 'w-2 h-2 bg-neutral-200 hover:bg-neutral-400'
                    )}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Recensione successiva"
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-rovere hover:text-rovere hover:bg-wood-50 transition-all duration-200 flex items-center justify-center"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div ref={footerRef} className="text-center mt-10" style={{ opacity: 0 }}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-rovere/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-all duration-300"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#FBBC05] text-[#FBBC05]" aria-hidden="true" />
                ))}
              </div>
              <span className="font-sans text-[13px] font-semibold text-legno-bruciato">
                Recensioni Google
              </span>
              <span className="font-sans text-[12px] text-neutral-400">verificabili</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
