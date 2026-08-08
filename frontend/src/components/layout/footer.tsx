'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
      { label: 'Restauro & Levigatura', href: '/servizi/restauro' },
      { label: 'SPC, PVC & Laminati',   href: '/servizi/spc' },
      { label: 'Scale & Battiscopa',    href: '/servizi/parquet-tradizionale' },
      { label: 'Sopralluogo Gratuito',  href: '/contatti' },
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
    <footer className="bg-nero-marquina text-white" role="contentinfo">
      <div className="container-wide pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-10 lg:gap-12">

          {/* ── Col 1 — Brand (always visible) ── */}
          <div className="pb-8 md:pb-0 border-b border-white/10 md:border-none mb-2 md:mb-0">
            <Link href="/" className="inline-flex items-center gap-3 mb-5" aria-label="Arteparquet — Homepage">
              <span className="w-10 h-10 rounded-full bg-rovere flex items-center justify-center flex-shrink-0">
                <span className="font-serif font-semibold text-white text-lg leading-none select-none">A</span>
              </span>
              <span>
                <span className="block font-serif font-semibold text-[18px] text-white leading-tight">Arteparquet.pro</span>
                <span className="block font-sans text-[11px] text-white/50 tracking-wide leading-tight">Maestri del Parquet dal 1996</span>
              </span>
            </Link>

            <p className="font-sans text-[14px] text-white/55 leading-relaxed mb-6 max-w-[240px]">
              Dal Teatro alla Scala alla tua casa. Eccellenza artigianale in ogni listello di legno.
            </p>

            <ul className="space-y-3 mb-6" role="list">
              <li>
                <a href={`tel:${PHONE_CLEAN}`}
                  className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-rovere transition-colors">
                  <Phone size={14} className="text-rovere flex-shrink-0" aria-hidden="true" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-rovere transition-colors">
                  <Mail size={14} className="text-rovere flex-shrink-0" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-[13px] text-white/55">
                  <MapPin size={14} className="text-rovere flex-shrink-0 mt-0.5" aria-hidden="true" />
                  Via Vittorio Alfieri 7, Bergamo
                </span>
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white font-sans text-[13px] font-semibold hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Scrivici su WhatsApp
            </a>
          </div>

          {/* ── Col 2 — Servizi ── */}
          <CollapsibleSection heading="Servizi">
            <ul className="space-y-2.5 mt-4 md:mt-5" role="list">
              {FOOTER_SECTIONS[0].links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="font-sans text-[14px] text-white/65 hover:text-rovere transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* ── Col 3 — Azienda ── */}
          <CollapsibleSection heading="Azienda">
            <ul className="space-y-2.5 mt-4 md:mt-5" role="list">
              {FOOTER_SECTIONS[1].links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="font-sans text-[14px] text-white/65 hover:text-rovere transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* ── Col 4 — Orari + mini CTA ── */}
          <CollapsibleSection heading="Orari">
            <ul className="space-y-2.5 mt-4 md:mt-5 mb-6" role="list">
              {ORARI.map((h) => (
                <li key={h.day} className="flex items-center justify-between gap-4">
                  <span className="font-sans text-[13px] text-white/65">{h.day}</span>
                  <span className={cn(
                    'font-sans text-[13px] font-semibold',
                    h.open ? 'text-white/85' : 'text-white/35'
                  )}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 hidden md:block">
              <p className="font-serif text-[15px] text-white mb-1 leading-snug">
                Sopralluogo gratuito,<br />senza impegno.
              </p>
              <p className="font-sans text-[12px] text-white/45 mb-4">
                Risposta entro 5 min in orario lavorativo.
              </p>
              <Link href="/contatti"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-rovere text-white font-sans text-[13px] font-semibold hover:bg-wood-500 transition-colors">
                Richiedi Preventivo
              </Link>
            </div>
          </CollapsibleSection>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[12px] text-white/35 text-center sm:text-left">
            © {year} Arteparquet di Arabi Mohamed — P.IVA 03326410168
          </p>
          <ul className="flex items-center gap-4" role="list">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href}
                  className="font-sans text-[12px] text-white/35 hover:text-white/65 transition-colors">
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
