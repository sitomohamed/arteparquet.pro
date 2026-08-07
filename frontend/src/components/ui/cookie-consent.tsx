'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'arteparquet_cookie_consent'
const CONSENT_EXPIRY_DAYS = 365

interface ConsentData {
  timestamp: number
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

function loadConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data: ConsentData = JSON.parse(raw)
    const ageDays = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24)
    if (ageDays > CONSENT_EXPIRY_DAYS) return null
    return data
  } catch {
    return null
  }
}

function saveConsent(data: Omit<ConsentData, 'timestamp'>) {
  const full: ConsentData = { ...data, timestamp: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(full))
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [preferences, setPreferences] = useState(false)

  useEffect(() => {
    const consent = loadConsent()
    if (!consent) {
      // Small delay so it doesn't block first paint
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true, preferences: true })
    setVisible(false)
  }

  function rejectAll() {
    saveConsent({ analytics: false, marketing: false, preferences: false })
    setVisible(false)
  }

  function saveCustom() {
    saveConsent({ analytics, marketing, preferences })
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Consenso cookie"
          aria-describedby="cookie-description"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:max-w-[480px]"
        >
          <div className="rounded-2xl bg-white shadow-xl border border-neutral-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-rovere flex-shrink-0" aria-hidden="true" />
                <h2 className="font-serif text-[18px] font-semibold text-legno-bruciato leading-tight">
                  Rispettiamo la tua privacy
                </h2>
              </div>
              <button
                onClick={rejectAll}
                aria-label="Chiudi e rifiuta tutti i cookie non essenziali"
                className="p-1 text-neutral-400 hover:text-legno-bruciato transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rovere"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-4">
              <p
                id="cookie-description"
                className="font-sans text-[13px] text-neutral-600 leading-relaxed"
              >
                Utilizziamo cookie per migliorare la tua esperienza sul nostro
                sito. Puoi scegliere quali cookie accettare. Per maggiori
                informazioni consulta la{' '}
                <Link
                  href="/privacy-policy"
                  className="text-rovere underline hover:text-wood-600 transition-colors"
                >
                  Privacy Policy
                </Link>{' '}
                e la{' '}
                <Link
                  href="/cookie-policy"
                  className="text-rovere underline hover:text-wood-600 transition-colors"
                >
                  Cookie Policy
                </Link>
                .
              </p>

              {/* Expandable preferences */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t border-neutral-100 pt-4">
                      {/* Essential — always on */}
                      <CookieCategory
                        title="Cookie essenziali"
                        description="Necessari per il funzionamento del sito. Non possono essere disattivati."
                        checked={true}
                        disabled
                        onChange={() => {}}
                      />
                      <CookieCategory
                        title="Cookie analytics"
                        description="Ci aiutano a capire come viene utilizzato il sito (Google Analytics)."
                        checked={analytics}
                        onChange={setAnalytics}
                      />
                      <CookieCategory
                        title="Cookie marketing"
                        description="Usati per mostrare annunci pertinenti (Google Ads, Meta Pixel)."
                        checked={marketing}
                        onChange={setMarketing}
                      />
                      <CookieCategory
                        title="Cookie preferenze"
                        description="Ricordano le tue scelte (lingua, tema, ecc.)."
                        checked={preferences}
                        onChange={setPreferences}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle preferences */}
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1 mt-3 font-sans text-[12px] text-rovere hover:text-wood-600 transition-colors focus-visible:outline-none focus-visible:underline"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    <ChevronUp size={14} aria-hidden="true" /> Nascondi opzioni
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} aria-hidden="true" /> Personalizza preferenze
                  </>
                )}
              </button>
            </div>

            {/* Buttons — GDPR: equal prominence */}
            <div className="px-6 pb-5 flex flex-col sm:flex-row gap-2.5">
              {expanded ? (
                <button
                  onClick={saveCustom}
                  className="flex-1 px-4 py-3 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rovere"
                >
                  Salva preferenze
                </button>
              ) : (
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-3 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rovere"
                >
                  Accetta tutti
                </button>
              )}

              <button
                onClick={rejectAll}
                className="flex-1 px-4 py-3 rounded-lg border border-legno-bruciato text-legno-bruciato font-sans text-[14px] font-semibold hover:bg-legno-bruciato hover:text-white active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-legno-bruciato"
              >
                Rifiuta tutti
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface CookieCategoryProps {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
}

function CookieCategory({
  title,
  description,
  checked,
  disabled,
  onChange,
}: CookieCategoryProps) {
  const id = `cookie-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <label
          htmlFor={id}
          className={cn(
            'block font-sans text-[13px] font-semibold leading-snug',
            disabled ? 'text-neutral-400' : 'text-legno-bruciato'
          )}
        >
          {title}
        </label>
        <p className="font-sans text-[11px] text-neutral-500 leading-relaxed mt-0.5">
          {description}
        </p>
      </div>

      {/* Toggle switch */}
      <button
        role="switch"
        id={id}
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative flex-shrink-0 w-10 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rovere',
          checked ? 'bg-rovere' : 'bg-neutral-200',
          disabled && 'opacity-60 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked ? 'left-5' : 'left-1'
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
