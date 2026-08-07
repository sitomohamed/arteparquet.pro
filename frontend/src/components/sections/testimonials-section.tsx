'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { cn } from '@/lib/utils'

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Lavoro impeccabile, hanno superato ogni mia aspettativa. Il parquet in rovere massello è bellissimo, posato con una cura maniacale per i dettagli. Arabi è un vero maestro del suo mestiere.',
    author: 'Marco B.',
    role: 'Architetto',
    location: 'Milano',
    rating: 5,
    project: 'Villa privata — 280 mq',
  },
  {
    id: 2,
    quote:
      'Ho scelto Arteparquet per il restauro del mio parquet di fine \'800. Il risultato è straordinario: sembra nuovo ma ha mantenuto tutta la sua anima. Consigliatissimi.',
    author: 'Giulia R.',
    role: 'Proprietaria',
    location: 'Bergamo',
    rating: 5,
    project: 'Restauro parquet storico',
  },
  {
    id: 3,
    quote:
      'Professionalità e puntualità eccezionali. Hanno gestito un intervento complesso su 400 mq del nostro hotel con zero problemi. Il risultato è di livello altissimo.',
    author: 'Francesco M.',
    role: 'General Manager',
    location: 'Bergamo Alta',
    rating: 5,
    project: 'Hotel Boutique — 400 mq',
  },
  {
    id: 4,
    quote:
      'Preventivo trasparente, rispetto dei tempi, pulizia del cantiere e risultato finale da sogno. Cosa si può chiedere di più? Non esitate a contattarli.',
    author: 'Laura e Andrea T.',
    role: 'Famiglia',
    location: 'Brescia',
    rating: 5,
    project: 'Appartamento nuovo — 150 mq',
  },
  {
    id: 5,
    quote:
      'Ho lavorato con molti posatori negli anni come interior designer. Arteparquet è in un\'altra categoria: la qualità dell\'esecuzione è paragonabile ai migliori artigiani europei.',
    author: 'Sofia C.',
    role: 'Interior Designer',
    location: 'Como',
    rating: 5,
    project: 'Villa design — 320 mq',
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

  const t = TESTIMONIALS[current]

  return (
    <section
      className="bg-travertino"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-wide py-24 md:py-32">
        <FadeIn direction="up" className="text-center mb-16">
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
            Dicono di Noi
          </span>
          <h2
            id="testimonials-heading"
            className="font-serif font-semibold text-legno-bruciato"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            La soddisfazione dei nostri clienti.
          </h2>
        </FadeIn>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-100"
              >
                {/* Quote icon */}
                <Quote
                  size={32}
                  className="text-rovere/30 mb-6"
                  aria-hidden="true"
                />

                <StarRating rating={t.rating} />

                <blockquote className="mt-5 mb-8">
                  <p className="font-serif italic text-legno-bruciato leading-relaxed"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
                  >
                    "{t.quote}"
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
                        {t.role} • {t.location}
                      </p>
                    </div>
                  </div>
                  <span className="font-sans text-[12px] text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full">
                    {t.project}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prev}
                aria-label="Testimonianza precedente"
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-rovere hover:text-rovere hover:bg-wood-50 transition-all duration-200 flex items-center justify-center"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              {/* Dots */}
              <div className="flex gap-2" role="tablist" aria-label="Testimonianze">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Testimonianza ${i + 1}`}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === current
                        ? 'w-6 bg-rovere'
                        : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                    )}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Testimonianza successiva"
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-rovere hover:text-rovere hover:bg-wood-50 transition-all duration-200 flex items-center justify-center"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Google rating badge */}
          <FadeIn direction="up" delay={0.2} className="text-center mt-10">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-neutral-100 shadow-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#FBBC05] text-[#FBBC05]" aria-hidden="true" />
                ))}
              </div>
              <span className="font-sans text-[13px] font-semibold text-legno-bruciato">4.9/5</span>
              <span className="font-sans text-[12px] text-neutral-400">su Google Reviews</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
