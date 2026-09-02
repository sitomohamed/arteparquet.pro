'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { Menu, X, Phone, ChevronDown, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/brand/logo'
import { getLenis } from '@/components/animations/smooth-scroll'

// ── Mega-menu data ────────────────────────────────────────────────────────
const SERVIZI_MENU = [
  {
    heading: 'Parquet',
    items: [
      { label: 'Guida Parquet', href: '/parquet', desc: 'Scelta, posa e manutenzione' },
      { label: 'Massello', href: '/servizi/parquet-massello', desc: 'Legno pieno, tradizione pura' },
      { label: 'Prefinito', href: '/servizi/parquet-prefinito', desc: 'Pronto in pochi giorni' },
      { label: 'Tradizionale', href: '/servizi/parquet-tradizionale', desc: 'Posa classica a listone' },
      { label: 'Laminato', href: '/servizi/laminato', desc: 'Resistente e conveniente' },
    ],
  },
  {
    heading: 'Pavimenti Moderni',
    items: [
      { label: 'SPC', href: '/pavimenti-spc', desc: 'Impermeabile al 100%' },
      { label: 'PVC', href: '/servizi/pvc', desc: 'Ideale per ambienti umidi' },
      { label: 'Vinilico', href: '/servizi/vinilico', desc: 'Comfort e silenzio acustico' },
    ],
  },
  {
    heading: 'Servizi',
    items: [
      { label: 'Posa', href: '/servizi/posa', desc: 'Posa professionale certificata' },
      { label: 'Levigatura', href: '/levigatura-parquet', desc: 'Senza polvere, risultato impeccabile' },
      { label: 'Restauro', href: '/restauro-parquet', desc: 'Nuova vita al parquet antico' },
      { label: 'Riparazioni', href: '/riparazione-parquet', desc: 'Interventi puntuali e rapidi' },
    ],
  },
]

const NAV_LINKS = [
  { label: 'Guide', href: '/parquet' },
  { label: 'Bergamo', href: '/bergamo-e-provincia' },
  { label: 'Per Architetti', href: '/per-architetti' },
  { label: "L'Atelier", href: '/chi-siamo' },
  { label: 'Portfolio', href: '/portfolio' },
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function openServizi() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServiziOpen(true)
  }

  function closeServizi() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setServiziOpen(false), 160)
  }

  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(249,248,246,0)', 'rgba(249,248,246,0.98)'])
  const headerShadow = useTransform(scrollY, [0, 100], ['0 0 0 rgba(0,0,0,0)', '0 1px 24px rgba(0,0,0,0.08)'])
  const headerBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)'])

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50))
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
    const scroller = getLenis()
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      scroller?.stop()
    } else {
      document.body.style.overflow = ''
      scroller?.start()
    }
    return () => {
      document.body.style.overflow = ''
      scroller?.start()
    }
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
  const hoverColor = 'hover:text-rovere transition-colors duration-300'

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg, boxShadow: headerShadow }}
        className={cn(
          "fixed top-0 left-0 right-0 z-30 overflow-visible transition-all duration-400",
          scrolled && "backdrop-blur-xl border-b border-neutral-100/50"
        )}
        role="banner"
      >
        <div className="container-wide relative" ref={serviziRef}>
          <div className="flex items-center h-18 md:h-22 gap-8 xl:gap-12">

            {/* ── Logo ── */}
            <Link href="/" className="group relative shrink-0" aria-label="Arteparquet — Homepage">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Logo
                  variant={scrolled ? 'onLight' : 'onDark'}
                  markVariant="onLight"
                  size={42}
                  wordmarkClassName="hidden sm:flex"
                />
              </motion.div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav
              className="hidden lg:flex flex-1 items-center min-w-0"
              aria-label="Navigazione principale"
            >
              <div className="flex items-center gap-6 xl:gap-8">
                <div
                  className="relative"
                  onMouseEnter={openServizi}
                  onMouseLeave={closeServizi}
                >
                  <button
                    onClick={() => setServiziOpen((v) => !v)}
                    className={cn(
                      'flex items-center gap-1.5 font-sans text-[14.5px] font-medium transition-all duration-300 relative group whitespace-nowrap',
                      textColor, hoverColor
                    )}
                    aria-expanded={serviziOpen}
                    aria-haspopup="true"
                  >
                    <span className="relative">
                      Servizi
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-rovere group-hover:w-full transition-all duration-400 ease-out-expo" />
                    </span>
                    <ChevronDown
                      size={15}
                      className={cn('transition-transform duration-300', serviziOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setServiziOpen(false)}
                    className={cn('font-sans text-[14.5px] font-medium transition-all duration-300 relative group whitespace-nowrap', textColor, hoverColor)}
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-rovere group-hover:w-full transition-all duration-400 ease-out-expo" />
                    </span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* ── Desktop actions ── */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
              <a
                href={`tel:${PHONE_CLEAN}`}
                className={cn('hidden xl:flex items-center gap-2 font-sans text-[13.5px] transition-all duration-300 hover:text-rovere group whitespace-nowrap',
                  scrolled ? 'text-neutral-600' : 'text-white/85'
                )}
              >
                <div className="w-7 h-7 rounded-full bg-rovere/15 group-hover:bg-rovere/25 flex items-center justify-center transition-all duration-300">
                  <Phone size={13} className="text-rovere" aria-hidden="true" />
                </div>
                <span>{PHONE}</span>
              </a>

              <Link
                href="/preventivo"
                className="relative inline-flex items-center px-6 xl:px-7 py-2.5 xl:py-3 rounded-xl bg-rovere text-white font-sans text-[14px] xl:text-[14.5px] font-semibold hover:bg-wood-500 hover:shadow-[0_8px_24px_rgba(200,155,123,0.35)] active:scale-[0.97] transition-all duration-300 overflow-hidden group whitespace-nowrap"
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Preventivo Gratuito</span>
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <motion.button
              onClick={() => setMobileOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn('lg:hidden ml-auto p-2.5 rounded-xl transition-all duration-300',
                scrolled ? 'text-legno-bruciato hover:bg-neutral-100' : 'text-white hover:bg-white/10'
              )}
              aria-label="Apri menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} aria-hidden="true" />
            </motion.button>
          </div>

            <AnimatePresence>
              {serviziOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={openServizi}
                  onMouseLeave={closeServizi}
                  className="hidden lg:block absolute left-0 right-0 top-full mt-1 z-50"
                  role="menu"
                >
                  <div className="bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.14)] border border-neutral-100/80 p-6 xl:p-8 overflow-hidden">
                    <div className="grid grid-cols-3 gap-6 xl:gap-10">
                      {SERVIZI_MENU.map((col) => (
                        <div key={col.heading} className="min-w-0">
                          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-rovere mb-3 pb-2 border-b border-neutral-100">
                            {col.heading}
                          </p>
                          <ul className="space-y-0.5" role="none">
                            {col.items.map((item) => (
                              <li key={item.href} role="none">
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  onClick={() => setServiziOpen(false)}
                                  className="group/item flex flex-col px-3 py-2 rounded-xl hover:bg-wood-50 transition-all duration-200"
                                >
                                  <span className="font-sans text-[14.5px] font-semibold text-legno-bruciato group-hover/item:text-rovere transition-colors duration-200">
                                    {item.label}
                                  </span>
                                  <span className="font-sans text-[12px] text-neutral-400 mt-0.5 leading-snug">
                                    {item.desc}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                      <Link
                        href="/servizi"
                        onClick={() => setServiziOpen(false)}
                        className="font-sans text-[13.5px] font-semibold text-rovere hover:text-wood-600 transition-colors duration-200 inline-flex items-center gap-1.5 group/all"
                      >
                        Vedi tutti i servizi
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover/all:translate-x-1" />
                      </Link>
                      <Link
                        href="/preventivo"
                        onClick={() => setServiziOpen(false)}
                        className="inline-flex items-center px-5 py-2.5 rounded-xl bg-rovere text-white font-sans text-[13.5px] font-semibold hover:bg-wood-500 hover:shadow-[0_8px_24px_rgba(200,155,123,0.3)] active:scale-[0.97] transition-all duration-200"
                      >
                        Preventivo Gratuito
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,92vw)] bg-travertino flex flex-col shadow-[−24px_0_60px_rgba(0,0,0,0.15)]"
              role="dialog" aria-modal="true" aria-label="Menu di navigazione"
              data-lenis-prevent
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
              <div className="flex-1 overflow-y-auto px-4 py-6" data-lenis-prevent>
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
                  <li>
                    <Link
                      href="/preventivo"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-3 rounded-xl font-sans text-[17px] font-semibold text-legno-bruciato hover:bg-white hover:text-rovere transition-colors"
                    >
                      Preventivo
                    </Link>
                  </li>
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
