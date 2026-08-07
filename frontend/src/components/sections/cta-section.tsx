import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

const PHONE = '+39 389 240 7827'
const PHONE_CLEAN = '+393892407827'
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(
  'Ciao! Vorrei informazioni sui vostri servizi di parquet.'
)}`

export function CtaSection() {
  return (
    <section
      className="relative bg-nero-marquina overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-wood-900/40 via-transparent to-transparent" aria-hidden="true" />
      {/* Rovere accent line top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rovere to-transparent" aria-hidden="true" />

      <div className="relative z-10 container-wide py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-6">
              Inizia il Tuo Progetto
            </span>
            <h2
              id="cta-heading"
              className="font-serif font-semibold text-white leading-[1.1] mb-5 text-balance"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
            >
              Pronto a trasformare<br />
              <em className="not-italic text-rovere">il tuo spazio?</em>
            </h2>
            <p className="font-sans text-white/65 leading-relaxed mb-10 max-w-lg mx-auto"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Sopralluogo e preventivo gratuiti, senza impegno.
              Rispondiamo entro 24 ore.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/contatti"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-legno-bruciato font-sans text-[15px] font-semibold hover:bg-travertino active:scale-[0.98] transition-all duration-200 shadow-lg"
              >
                Richiedi Preventivo Gratuito
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#25D366] text-white font-sans text-[15px] font-semibold hover:bg-[#128C7E] active:scale-[0.98] transition-all duration-200"
                aria-label="Contattaci su WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Scrivici su WhatsApp
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/40">
              <span className="font-sans text-[13px]">oppure chiama direttamente:</span>
              <a
                href={`tel:${PHONE_CLEAN}`}
                className="flex items-center gap-2 font-sans text-[14px] font-semibold text-white/70 hover:text-rovere transition-colors"
              >
                <Phone size={16} aria-hidden="true" />
                {PHONE}
              </a>
            </div>
          </FadeIn>

          {/* Trust signals */}
          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 mt-12 pt-10 border-t border-white/10">
              {[
                '✓ Sopralluogo gratuito',
                '✓ Nessun costo nascosto',
                '✓ Garanzia sulla posa',
                '✓ Risposta entro 24h',
              ].map((item) => (
                <span key={item} className="font-sans text-[13px] text-white/50">
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
