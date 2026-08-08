'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Timeline milestones ───────────────────────────────────────────────────────
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

// ─── Single milestone block ────────────────────────────────────────────────────
function Milestone({
  milestone,
  index,
  isLast,
}: {
  milestone: (typeof MILESTONES)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-0">

      {/* Year column — left on desktop, hidden label on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="flex lg:justify-end lg:pr-16 mb-6 lg:mb-0 lg:pb-20"
      >
        <div className="lg:text-right">
          {/* Large decorative year */}
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

          {/* Label */}
          <div className="mt-3 lg:mt-4">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-rovere/70">
              {milestone.label}
            </span>
            <p className="font-sans text-[12px] text-white/30 mt-1">
              {milestone.aside}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Centre line + dot */}
      <div className="hidden lg:flex flex-col items-center">
        {/* Top line segment */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ transformOrigin: 'top' }}
          className="w-px bg-gradient-to-b from-rovere/50 to-rovere/10 flex-1"
        />
        {/* Node dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          className="w-3 h-3 rounded-full bg-rovere ring-4 ring-rovere/20 flex-shrink-0 my-2"
        />
        {/* Bottom line segment */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            style={{ transformOrigin: 'top' }}
            className="w-px bg-gradient-to-b from-rovere/10 to-rovere/50 flex-1"
          />
        )}
      </div>

      {/* Content column — right on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="lg:pl-16 pb-20 lg:pb-24"
      >
        {/* Mobile: year badge */}
        <div className="lg:hidden inline-flex items-center gap-2 mb-5">
          <span className="font-serif font-semibold text-rovere text-[1.75rem] leading-none">
            {milestone.year}
          </span>
          <span className="h-px w-8 bg-rovere/40" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-rovere/60">
            {milestone.label}
          </span>
        </div>

        {/* Heading */}
        <h3
          className="font-serif font-semibold text-white leading-[1.1] mb-6 whitespace-pre-line"
          style={{ fontSize: 'clamp(1.625rem, 3.5vw, 2.625rem)' }}
        >
          {milestone.heading}
        </h3>

        {/* Body text */}
        <p className="font-sans text-[15px] md:text-[16px] text-white/60 leading-[1.75] max-w-lg">
          {milestone.body}
        </p>

        {/* Scala special badge */}
        {index === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-8 inline-flex items-center gap-3 border border-rovere/30 rounded-xl px-5 py-3 bg-rovere/5 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-rovere flex-shrink-0" />
            <span className="font-sans text-[12px] font-medium text-white/70 tracking-wide">
              Teatro alla Scala di Milano — 2004
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])

  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  const credRef = useRef<HTMLDivElement>(null)
  const credInView = useInView(credRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="relative bg-nero-marquina overflow-hidden"
      aria-labelledby="heritage-heading"
    >
      {/* Parallax background texture */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px',
          }}
        />
        {/* Radial gradient glow — top right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-rovere/5 blur-[100px]" />
        {/* Radial gradient glow — bottom left */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-rovere/4 blur-[120px]" />
      </motion.div>

      <div className="relative z-10 container-wide pt-28 pb-0 md:pt-36">

        {/* ── Section header ───────────────────────────────────────── */}
        <div ref={headerRef} className="max-w-3xl mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="block font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-rovere mb-7"
          >
            La nostra storia — Dal 1996
          </motion.span>

          <motion.h2
            id="heritage-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="font-serif font-semibold text-white leading-[1.05] mb-8 text-balance"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
          >
            Dal 1996, il legno<br />
            <em className="not-italic text-rovere">è il nostro mestiere.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            className="font-sans text-white/55 leading-[1.8] max-w-xl"
            style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)' }}
          >
            Una storia costruita nel tempo, tra esperienza artigianale, precisione
            e passione per il legno. Dal 1996 Mohamed Arabi lavora nel mondo del
            parquet, trasformando ogni pavimento in un progetto fatto per durare.
          </motion.p>
        </div>

        {/* ── Timeline ─────────────────────────────────────────────── */}
        <div role="list" aria-label="Storia di Arteparquet">
          {MILESTONES.map((m, i) => (
            <div key={m.year} role="listitem">
              <Milestone milestone={m} index={i} isLast={i === MILESTONES.length - 1} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Credential strip ─────────────────────────────────────── */}
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
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                animate={credInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA bar ──────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/8">
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
