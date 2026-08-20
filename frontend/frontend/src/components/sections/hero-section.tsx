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
      className="relative min-h-screen flex items-center overflow-hidden bg-nero-marquina"
      aria-label="Arteparquet — Posa Restauro Levigatura Parquet dal 1996"
    >
      {/* Background: foto autentica di un lavoro Arteparquet con scala cinematografica */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: 'url(/portfolio/google-spina-pesce-lucida-01.jpg)' }}
          role="img"
          aria-label="Parquet a spina di pesce rovere — lavoro Arteparquet Bergamo"
        />
      </motion.div>

      {/* Premium gradient overlays con depth sofisticato */}
      <div className="absolute inset-0 bg-gradient-to-r from-nero-marquina/98 via-nero-marquina/88 to-nero-marquina/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-nero-marquina/75 via-transparent to-nero-marquina/25" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-nero-marquina/30" />

      {/* ── Contenuto principale con enhanced spacing ── */}
      <div className="relative z-10 container-wide py-32 md:py-48 lg:py-56">
        <div className="max-w-2xl">

          {/* Badge zona geografica con refined animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2.5 mb-8"
          >
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="h-[1.5px] w-10 bg-rovere origin-left" 
              aria-hidden="true" 
            />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-rovere">
              Bergamo · Milano · Lombardia
            </span>
          </motion.div>

          {/* H1 — SEO + CRO con refined typography */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="font-serif font-semibold text-white leading-[1.05] mb-7 text-balance"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              letterSpacing: '-0.025em',
              textShadow: '0 2px 24px rgba(0,0,0,0.3)'
            }}
          >
            Posa, Restauro e Levigatura<br />
            Parquet a Bergamo<br />
            <span className="text-rovere inline-block" style={{ textShadow: '0 2px 20px rgba(200,155,123,0.4)' }}>dal 1996</span>
          </motion.h1>

          {/* Sottotitolo — proposta di valore chiara con refined spacing */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="font-sans text-white/85 leading-[1.7] mb-10"
            style={{ 
              fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)', 
              maxWidth: '36rem',
              letterSpacing: '-0.011em'
            }}
          >
            Riportiamo il parquet alla sua bellezza originale e realizziamo nuovi
            pavimenti su misura. Sopralluogo gratuito a Bergamo, Milano e in tutta la Lombardia.
          </motion.p>

          {/* Premium CTA buttons con enhanced interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            {/* Primaria: WhatsApp foto → valutazione immediata */}
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

            {/* Secondaria: sopralluogo fisico con premium glass effect */}
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
          </motion.div>

          {/* Premium trust signals con refined styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="flex flex-wrap gap-x-7 gap-y-3"
          >
            {TRUST_ITEMS.map(({ icon: Icon, text, color }, index) => (
              <motion.span 
                key={text}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.65 + index * 0.05, ease: EASE }}
                className="flex items-center gap-2.5 font-sans text-[13px] text-white/75 tracking-wide"
              >
                <Icon size={14} className={color} aria-hidden="true" />
                <span className="relative">{text}</span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Premium phone badge — bottom right con enhanced glass effect */}
      <motion.a
        href={`tel:${PHONE_CLEAN}`}
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
        className="absolute bottom-10 right-8 z-10 hidden md:flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white/[0.09] border border-white/25 backdrop-blur-xl text-white font-sans text-[13.5px] font-semibold hover:bg-white/[0.15] hover:border-white/40 hover:shadow-[0_8px_32px_rgba(255,255,255,0.12)] active:scale-[0.97] transition-all duration-400 group"
        aria-label="Chiama Arteparquet"
      >
        <div className="w-8 h-8 rounded-full bg-rovere/20 flex items-center justify-center group-hover:bg-rovere/30 transition-colors duration-300">
          <Phone size={15} className="text-rovere" aria-hidden="true" />
        </div>
        <span className="tracking-wide">+39 389 240 7827</span>
      </motion.a>
    </section>
  )
}
