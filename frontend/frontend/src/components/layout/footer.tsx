'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/brand/logo'

const PHONE = '+39 389 240 7827'
const PHONE_CLEAN = '+393892407827'
const EMAIL = 'info@arteparquet.pro'
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(
  'Ciao! Vorrei informazioni sui vostri servizi di parquet.'
)}`

const FOOTER_SECTIONS = [
  {
    heading: 'Servizi',
    links: [
      { label: 'Posa Parquet',          href: '/servizi/posa' },
      { label: 'Parquet Massello',      href: '/servizi/parquet-massello' },
      { label: 'Parquet Prefinito',     href: '/servizi/parquet-prefinito' },
      { label: 'Levigatura Parquet',    href: '/servizi/levigatura' },
      { label: 'Restauro Parquet',      href: '/servizi/restauro' },
      { label: 'SPC, PVC & Laminati',   href: '/servizi/spc' },
    ],
  },
  {
    heading: 'Azienda',
    links: [
      { label: "L'Atelier", href: '/chi-siamo' },
      { label: 'Portfolio',  href: '/portfolio' },
      { label: 'Blog',       href: '/blog' },
      { label: 'FAQ',        href: '/faq' },
      { label: 'Contatti',   href: '/contatti' },
    ],
  },
]

const ORARI = [
  { day: 'Lun – Ven', time: '08:00 – 18:00', open: true },
  { day: 'Sabato',    time: '09:00 – 13:00', open: true },
  { day: 'Domenica',  time: 'Chiuso',         open: false },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy',  href: '/cookie-policy' },
]

// ── Collapsible section (mobile only) ────────────────────────────────────
interface CollapsibleSectionProps {
  heading: string
  children: React.ReactNode
}

function CollapsibleSection({ heading, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/10 md:border-none">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 md:py-0 md:cursor-default md:pointer-events-none"
        aria-expanded={open}
      >
        <h3 className="font-sans text-[12px] font-semibold uppercase tracking-widest text-white/40">
          {heading}
        </h3>
        <ChevronDown
          size={16}
          className={cn(
            'text-white/30 transition-transform duration-200 md:hidden',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>

      {/* Desktop: always visible — Mobile: collapsible */}
      <div className="hidden md:block">{children}</div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-nero-marquina text-white relative overflow-hidden" role="contentinfo">
      {/* Premium subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(200,155,123,0.05),transparent_60%)]" aria-hidden="true" />
      
      <div className="relative container-wide pt-18 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-14">

          {/* ── Col 1 — Brand (premium styling) ── */}
          <div className="pb-10 md:pb-0 border-b border-white/[0.08] md:border-none">
            <Link href="/" className="inline-flex mb-6" aria-label="Arteparquet — Homepage">
              <Logo variant="onDark" size={42} showTagline />
            </Link>

            <p className="font-sans text-[14px] text-white/55 leading-[1.7] mb-7 max-w-[260px]">
              Dal Teatro alla Scala alla tua casa. Eccellenza artigianale in ogni listello di legno.
            </p>

            <ul className="space-y-3.5 mb-7" role="list">
              <li>
                <a href={`tel:${PHONE_CLEAN}`}
                  className="flex items-center gap-3 text-[14px] text-white/60 hover:text-rovere transition-colors duration-300 group">
                  <div className="w-9 h-9 rounded-xl bg-rovere/15 group-hover:bg-rovere/25 flex items-center justify-center transition-all duration-300">
                    <Phone size={15} className="text-rovere" aria-hidden="true" />
                  </div>
                  <span>{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-[14px] text-white/60 hover:text-rovere transition-colors duration-300 group">
                  <div className="w-9 h-9 rounded-xl bg-rovere/15 group-hover:bg-rovere/25 flex items-center justify-center transition-all duration-300">
                    <Mail size={15} className="text-rovere" aria-hidden="true" />
                  </div>
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-[14px] text-white/60">
                  <div className="w-9 h-9 rounded-xl bg-rovere/15 flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} className="text-rovere" aria-hidden="true" />
                  </div>
                  <span className="mt-1.5">Via Vittorio Alfieri 7, Bergamo</span>
                </span>
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] text-white font-sans text-[14px] font-semibold hover:bg-[#128C7E] hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)] active:scale-[0.97] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <MessageCircle size={16} className="relative z-10" aria-hidden="true" />
              <span className="relative z-10">Scrivici su WhatsApp</span>
            </a>
          </div>

          {/* ── Col 2 — Servizi ── */}
          <CollapsibleSection heading="Servizi">
            <ul className="space-y-3 mt-5 md:mt-6" role="list">
              {FOOTER_SECTIONS[0].links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="group font-sans text-[14.5px] text-white/65 hover:text-rovere transition-colors duration-300 inline-flex items-center gap-2">
                    <span className="w-0 h-[1.5px] bg-rovere group-hover:w-4 transition-all duration-300" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* ── Col 3 — Azienda ── */}
          <CollapsibleSection heading="Azienda">
            <ul className="space-y-3 mt-5 md:mt-6" role="list">
              {FOOTER_SECTIONS[1].links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="group font-sans text-[14.5px] text-white/65 hover:text-rovere transition-colors duration-300 inline-flex items-center gap-2">
                    <span className="w-0 h-[1.5px] bg-rovere group-hover:w-4 transition-all duration-300" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* ── Col 4 — Orari + mini CTA ── */}
          <CollapsibleSection heading="Orari">
            <ul className="space-y-3 mt-5 md:mt-6 mb-7" role="list">
              {ORARI.map((h) => (
                <li key={h.day} className="flex items-center justify-between gap-5">
                  <span className="font-sans text-[14px] text-white/65">{h.day}</span>
                  <span className={cn(
                    'font-sans text-[14px] font-semibold',
                    h.open ? 'text-white/85' : 'text-white/35'
                  )}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm p-6 hidden md:block">
              <p className="font-serif text-[16px] text-white/90 mb-1.5 leading-snug">
                Sopralluogo gratuito,<br />senza impegno.
              </p>
              <p className="font-sans text-[12.5px] text-white/40 mb-5">
                Risposta entro 5 min in orario lavorativo.
              </p>
              <Link href="/contatti"
                className="group relative inline-flex items-center px-5 py-2.5 rounded-xl bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 hover:shadow-[0_8px_24px_rgba(200,155,123,0.3)] active:scale-[0.97] transition-all duration-300 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Richiedi Preventivo</span>
              </Link>
            </div>
          </CollapsibleSection>
        </div>
      </div>

      {/* Zone — crawl paths for local landing pages */}
      <div className="border-t border-white/[0.08]">
        <div className="container-wide py-6">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-3 text-center md:text-left">
            Posa parquet in Lombardia
          </p>
          <nav aria-label="Città servite" className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
            {[
              'bergamo', 'milano', 'brescia', 'monza', 'como',
              'varese', 'lecco', 'lodi', 'pavia', 'cremona', 'mantova',
            ].map((city) => (
              <Link
                key={city}
                href={`/zone/parquet-${city}`}
                className="font-sans text-[12.5px] text-white/45 hover:text-rovere capitalize transition-colors duration-300"
              >
                Parquet {city}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Premium bottom bar ── */}
      <div className="border-t border-white/[0.08]">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[12.5px] text-white/40 text-center sm:text-left">
            © {year} Arteparquet di Arabi Mohamed — P.IVA 03326410168
          </p>
          <ul className="flex items-center gap-5" role="list">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href}
                  className="font-sans text-[12.5px] text-white/40 hover:text-white/70 transition-colors duration-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
