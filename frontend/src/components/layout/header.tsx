'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/brand/logo'

// ── Mega-menu data ────────────────────────────────────────────────────────
const SERVIZI_MENU = [
  {
    heading: 'Parquet',
    items: [
      { label: 'Massello', href: '/servizi/parquet-massello', desc: 'Legno pieno, tradizione pura' },
      { label: 'Prefinito', href: '/servizi/parquet-prefinito', desc: 'Pronto in pochi giorni' },
      { label: 'Tradizionale', href: '/servizi/parquet-tradizionale', desc: 'Posa classica a listone' },
      { label: 'Laminato', href: '/servizi/laminato', desc: 'Resistente e conveniente' },
    ],
  },
  {
    heading: 'Pavimenti Moderni',
    items: [
      { label: 'SPC', href: '/servizi/spc', desc: 'Impermeabile al 100%' },
      { label: 'PVC', href: '/servizi/pvc', desc: 'Ideale per ambienti umidi' },
      { label: 'Vinilico', href: '/servizi/vinilico', desc: 'Comfort e silenzio acustico' },
    ],
  },
  {
    heading: 'Servizi',
    items: [
      { label: 'Posa', href: '/servizi/posa', desc: 'Posa professionale certificata' },
      { label: 'Levigatura', href: '/servizi/levigatura', desc: 'Senza polvere, risultato impeccabile' },
      { label: 'Restauro', href: '/servizi/restauro', desc: 'Nuova vita al parquet antico' },
      { label: 'Riparazioni', href: '/servizi/riparazioni', desc: 'Interventi puntuali e rapidi' },
    ],
  },
]

const NAV_LINKS = [
  { label: "L'Atelier", href: '/chi-siamo' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
]

const PHONE = '+39 389 240 7827'
const PHONE_CLEAN = '+393892407827'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [serviziOpen, setServiziOpen] = useState(false)
  const [mobileServiziOpen, setMobileServiziOpen] = useState(false)
  const serviziRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 80], ['rgba(249,248,246,0)', 'rgba(249,248,246,1)'])
  const headerShadow = useTransform(scrollY, [0, 80], ['0 0 0 rgba(0,0,0,0)', '0 1px 20px rgba(0,0,0,0.07)'])

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40))
    return unsub
  }, [scrollY])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (serviziRef.current && !serviziRef.current.contains(e.target as Node)) {
        setServiziOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  const textColor = scrolled ? 'text-legno-bruciato' : 'text-white'
  const hoverColor = 'hover:text-rovere'

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg, boxShadow: headerShadow }}
        className="fixed top-0 left-0 right-0 z-30"
        role="banner"
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ── */}
            <Link href="/" className="group" aria-label="Arteparquet — Homepage">
              <Logo
                variant={scrolled ? 'onLight' : 'onDark'}
                size={40}
                wordmarkClassName="hidden sm:flex"
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Navigazione principale">

              {/* Servizi dropdown */}
              <div ref={serviziRef} className="relative">
                <button
                  onClick={() => setServiziOpen((v) => !v)}
                  className={cn(
                    'flex items-center gap-1 font-sans text-[14px] font-medium transition-colors duration-200',
                    textColor, hoverColor
                  )}
                  aria-expanded={serviziOpen}
                  aria-haspopup="true"
                >
                  Servizi
                  <ChevronDown
                    size={15}
                    className={cn('transition-transform duration-200', serviziOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {serviziOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 z-50"
                      role="menu"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {SERVIZI_MENU.map((col) => (
                          <div key={col.heading}>
                            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-rovere mb-3 pb-2 border-b border-neutral-100">
                              {col.heading}
                            </p>
                            <ul className="space-y-1" role="none">
                              {col.items.map((item) => (
                                <li key={item.href} role="none">
                                  <Link
                                    href={item.href}
                                    role="menuitem"
                                    onClick={() => setServiziOpen(false)}
                                    className="group flex flex-col px-3 py-2 rounded-lg hover:bg-wood-50 transition-colors duration-150"
                                  >
                                    <span className="font-sans text-[14px] font-semibold text-legno-bruciato group-hover:text-rovere transition-colors">
                                      {item.label}
                                    </span>
                                    <span className="font-sans text-[11px] text-neutral-400 mt-0.5">
                                      {item.desc}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Bottom row */}
                      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <Link
                          href="/servizi"
                          onClick={() => setServiziOpen(false)}
                          className="font-sans text-[13px] font-semibold text-rovere hover:text-wood-600 transition-colors"
                        >
                          Vedi tutti i servizi →
                        </Link>
                        <Link
                          href="/contatti"
                          onClick={() => setServiziOpen(false)}
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-rovere text-white font-sans text-[13px] font-semibold hover:bg-wood-500 transition-colors"
                        >
                          Preventivo Gratuito
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other nav links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn('font-sans text-[14px] font-medium transition-colors duration-200', textColor, hoverColor)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Phone */}
              <a
                href={`tel:${PHONE_CLEAN}`}
                className={cn('hidden xl:flex items-center gap-1.5 font-sans text-[13px] transition-colors duration-200 hover:text-rovere',
                  scrolled ? 'text-neutral-600' : 'text-white/80'
                )}
              >
                <Phone size={14} aria-hidden="true" />
                {PHONE}
              </a>

              {/* CTA */}
              <Link
                href="/contatti"
                className="inline-flex items-center px-6 py-2.5 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all duration-200 shadow-sm"
              >
                Preventivo Gratuito
              </Link>
            </nav>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn('lg:hidden p-2 rounded-md transition-colors duration-200',
                scrolled ? 'text-legno-bruciato hover:bg-neutral-100' : 'text-white hover:bg-white/10'
              )}
              aria-label="Apri menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-nero-marquina/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              key="panel"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,92vw)] bg-travertino flex flex-col shadow-xl"
              role="dialog" aria-modal="true" aria-label="Menu di navigazione"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
                <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Arteparquet — Homepage">
                  <Logo variant="onLight" size={32} />
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md text-legno-bruciato hover:bg-neutral-100" aria-label="Chiudi menu">
                  <X size={22} aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1">
                  {/* Servizi accordion */}
                  <li>
                    <button
                      onClick={() => setMobileServiziOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left font-sans text-[17px] font-semibold text-legno-bruciato hover:bg-white transition-colors"
                      aria-expanded={mobileServiziOpen}
                    >
                      Servizi
                      <ChevronDown size={18} className={cn('transition-transform duration-200', mobileServiziOpen && 'rotate-180')} aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                      {mobileServiziOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 pb-2 space-y-4">
                            {SERVIZI_MENU.map((col) => (
                              <div key={col.heading}>
                                <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-rovere px-3 py-1.5">
                                  {col.heading}
                                </p>
                                {col.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-3 py-2 rounded-lg font-sans text-[15px] text-neutral-700 hover:text-rovere hover:bg-white transition-colors"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* Other links */}
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-3 rounded-xl font-sans text-[17px] font-semibold text-legno-bruciato hover:bg-white hover:text-rovere transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom */}
              <div className="px-6 py-5 border-t border-neutral-200 space-y-3">
                <Link
                  href="/contatti"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 rounded-xl bg-rovere text-white font-sans text-[15px] font-semibold hover:bg-wood-500 transition-colors"
                >
                  Preventivo Gratuito
                </Link>
                <a
                  href={`tel:${PHONE_CLEAN}`}
                  className="flex items-center justify-center gap-2 w-full py-3 font-sans text-[14px] text-neutral-600 hover:text-rovere transition-colors"
                >
                  <Phone size={16} aria-hidden="true" /> {PHONE}
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
