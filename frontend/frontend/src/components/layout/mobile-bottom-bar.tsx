'use client'

import Link from 'next/link'
import { Phone, MessageCircle, ClipboardList } from 'lucide-react'

const PHONE_CLEAN = '+393892407827'
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(
  'Ciao! Vorrei una prima valutazione del mio parquet. Vi invio alcune foto.'
)}`

export function MobileBottomBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-nero-marquina/97 backdrop-blur-md border-t border-white/10"
      aria-label="Azioni rapide"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch h-14">
        {/* Chiama */}
        <a
          href={`tel:${PHONE_CLEAN}`}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-white/80 hover:text-white hover:bg-white/8 active:bg-white/12 transition-colors"
          aria-label="Chiama Arteparquet al +39 389 240 7827"
        >
          <Phone size={18} aria-hidden="true" />
          <span className="font-sans text-[9px] font-semibold uppercase tracking-wider">Chiama</span>
        </a>

        <div className="w-px bg-white/10" aria-hidden="true" />

        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-[#25D366] hover:bg-white/8 active:bg-white/12 transition-colors"
          aria-label="Scrivi su WhatsApp e invia le foto del parquet"
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span className="font-sans text-[9px] font-semibold uppercase tracking-wider">WhatsApp</span>
        </a>

        <div className="w-px bg-white/10" aria-hidden="true" />

        {/* Preventivo */}
        <Link
          href="/contatti"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-rovere text-white hover:bg-wood-500 active:bg-wood-600 transition-colors"
          aria-label="Richiedi preventivo gratuito"
        >
          <ClipboardList size={18} aria-hidden="true" />
          <span className="font-sans text-[9px] font-semibold uppercase tracking-wider">Preventivo</span>
        </Link>
      </div>
    </nav>
  )
}
