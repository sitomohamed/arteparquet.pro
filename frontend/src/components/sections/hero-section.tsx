'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero — Arteparquet maestri del parquet"
    >
      {/* ── Background image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=1920&q=85)',
        }}
        role="img"
        aria-label="Parquet in rovere massello posato a spina di pesce"
      />

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina via-nero-marquina/70 to-nero-marquina/30" />
      <div className="absolute inset-0 bg-nero-marquina/40" />

      {/* ── Content ── */}
      <div className="relative z-10 container-wide py-32 md:py-40">
        <div className="max-w-3xl">

          {/* Overline — La Scala badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="h-px w-8 bg-rovere" aria-hidden="true" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere">
              Maestri del Parquet dal 1996
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="font-serif font-semibold text-white leading-[1.05] tracking-tight mb-6 text-balance"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)' }}
          >
            L'eccellenza<br />
            scolpita nel legno.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="font-sans text-white/75 leading-relaxed mb-10 max-w-xl"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
          >
            Dal palcoscenico della Scala di Milano alla tua casa.<br className="hidden sm:block" />
            Maestri posatori in tutta Italia.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contatti"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-rovere text-white font-sans text-[15px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all duration-200 shadow-lg"
            >
              Richiedi Preventivo Gratuito
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/30 text-white font-sans text-[15px] font-medium hover:border-white/70 hover:bg-white/8 active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
            >
              Scopri i Nostri Lavori
            </Link>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {[
              '✓ Sopralluogo gratuito',
              '✓ Preventivo senza impegno',
              '✓ 30+ anni di esperienza',
            ].map((item) => (
              <span
                key={item}
                className="font-sans text-[12px] text-white/60 font-medium"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
