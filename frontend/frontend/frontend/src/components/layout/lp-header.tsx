import Link from 'next/link'
import { Phone } from 'lucide-react'

const PHONE = '+39 389 240 7827'
const PHONE_CLEAN = '+393892407827'

interface LpHeaderProps {
  phoneLabel?: string
}

export function LpHeader({ phoneLabel = PHONE }: LpHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nero-marquina/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Arteparquet - torna alla homepage"
          className="flex items-center gap-2 group"
        >
          <span className="font-serif font-bold text-white text-[18px] tracking-tight group-hover:text-rovere transition-colors">
            Arte<span className="text-rovere">parquet</span>
          </span>
          <span className="hidden sm:inline font-sans text-[11px] text-white/30 tracking-widest uppercase ml-1">
            dal 1996
          </span>
        </Link>

        {/* Phone CTA - primary trust signal in header */}
        <a
          href={`tel:${PHONE_CLEAN}`}
          className="inline-flex items-center gap-2 bg-rovere hover:bg-wood-500 text-white font-sans text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors duration-200 active:scale-[0.97]"
          aria-label={`Chiama Arteparquet: ${phoneLabel}`}
        >
          <Phone size={14} aria-hidden="true" />
          <span className="hidden sm:inline">{phoneLabel}</span>
          <span className="sm:hidden">Chiama</span>
        </a>
      </div>
    </header>
  )
}
