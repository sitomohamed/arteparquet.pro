'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, ArrowRight, Star, Shield, Clock, CheckCircle } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const
const PHONE_CLEAN = '+393892407827'
const WHATSAPP_TEXT = encodeURIComponent(
  'Ciao! Vorrei una prima valutazione del mio parquet. Vi invio alcune foto.'
)
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${WHATSAPP_TEXT}`

const TRUST_ITEMS = [
  { icon: Star, text: '4,9/5 su Google', color: 'text-yellow-400 fill-yellow-400' },
  { icon: Shield, text: 'Garanzia scritta sulla posa', color: 'text-rovere' },
  { icon: Clock, text: 'Risposta entro 5 minuti', color: 'text-rovere' },
  { icon: CheckCircle, text: 'Sopralluogo gratuito', color: 'text-rovere' },
]

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Arteparquet — Posa Restauro Levigatura Parquet dal 1996"
    >
      {/* Background: foto autentica di un lavoro Arteparquet */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/portfolio/parquet-spina-pesce-01.jpg)' }}
        role="img"
        aria-label="Parquet a spina di pesce rovere — lavoro Arteparquet Bergamo"
      />

      {/* Gradient overlay: sinistra più scura per leggibilità testo */}
      <div className="absolute inset-0 bg-gradient-to-r from-nero-marquina/95 via-nero-marquina/85 to-nero-marquina/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/60 via-transparent to-transparent" />

      {/* ── Contenuto principale ── */}
      <div className="relative z-10 container-wide py-28 md:py-44">
        <div className="max-w-2xl">

          {/* Badge zona geografica */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="h-px w-8 bg-rovere" aria-hidden="true" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere">
              Bergamo · Milano · Lombardia
            </span>
          </motion.div>

          {/* H1 — SEO + CRO */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="font-serif font-semibold text-white leading-[1.08] tracking-tight mb-6 text-balance"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
          >
            Posa, Restauro e<br />
            Levigatura Parquet<br />
            <span className="text-rovere">dal 1996</span>
          </motion.h1>

          {/* Sottotitolo — proposta di valore chiara */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="font-sans text-white/80 leading-relaxed mb-9"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', maxWidth: '34rem' }}
          >
            Riportiamo il parquet alla sua bellezza originale e realizziamo nuovi
            pavimenti su misura. Sopralluogo gratuito a Bergamo, Milano e in tutta la Lombardia.
          </motion.p>

          {/* CTA primaria WhatsApp + CTA secondaria sopralluogo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34, ease: EASE }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            {/* Primaria: WhatsApp foto → valutazione immediata */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#25D366] text-white font-sans text-[15px] font-semibold hover:bg-[#20b858] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#25D366]/20"
              aria-label="Invia le foto del tuo parquet su WhatsApp per una valutazione gratuita"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Invia le foto — Valutazione gratuita
            </a>

            {/* Secondaria: sopralluogo fisico */}
            <Link
              href="/contatti"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-white/25 text-white font-sans text-[15px] font-medium hover:border-white/55 hover:bg-white/8 active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
            >
              Prenota sopralluogo gratuito
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Segnali di fiducia */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.52, ease: EASE }}
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {TRUST_ITEMS.map(({ icon: Icon, text, color }) => (
              <span key={text} className="flex items-center gap-1.5 font-sans text-[12px] text-white/65">
                <Icon size={12} className={color} aria-hidden="true" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Numero di telefono visibile desktop — bottom right */}
      <motion.a
        href={`tel:${PHONE_CLEAN}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="absolute bottom-8 right-6 z-10 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white font-sans text-[13px] font-semibold hover:bg-white/20 transition-all"
        aria-label="Chiama Arteparquet"
      >
        <Phone size={14} aria-hidden="true" />
        +39 389 240 7827
      </motion.a>
    </section>
  )
}
