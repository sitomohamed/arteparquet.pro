import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

const PHONE = '+39 389 240 7827'
const PHONE_CLEAN = '+393892407827'
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(
  'Ciao! Vorrei una prima valutazione del mio parquet. Vi invio alcune foto.'
)}`

export function CtaSection() {
  return (
    <section
      className="relative bg-nero-marquina overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-wood-900/40 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rovere to-transparent" aria-hidden="true" />

      <div className="relative z-10 container-wide py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-6">
              Valutazione Gratuita
            </span>
            <h2
              id="cta-heading"
              className="font-serif font-semibold text-white leading-[1.1] mb-5 text-balance"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
            >
              Invia le foto del tuo parquet<br />
              <em className="not-italic text-rovere">su WhatsApp</em>
            </h2>
            <p className="font-sans text-white/65 leading-relaxed mb-10 max-w-lg mx-auto"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Scattaci alcune foto del pavimento e ricevi una prima valutazione gratuita.
              Nessun impegno, risposta entro 5 minuti.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-sans text-[15px] font-semibold hover:bg-[#20b858] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#25D366]/20"
                aria-label="Invia le foto del parquet su WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Invia le foto su WhatsApp
              </a>
              <Link
                href="/contatti"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/25 text-white font-sans text-[15px] font-medium hover:border-white/55 hover:bg-white/8 active:scale-[0.98] transition-all duration-200"
              >
                Prenota sopralluogo gratuito
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <a
              href={`tel:${PHONE_CLEAN}`}
              className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-white/55 hover:text-rovere transition-colors"
            >
              <Phone size={15} aria-hidden="true" />
              oppure chiama: {PHONE}
            </a>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 mt-12 pt-10 border-t border-white/10">
              {[
                '✓ Sopralluogo gratuito a Bergamo e Milano',
                '✓ Garanzia scritta sulla manodopera',
                '✓ Preventivo dettagliato senza impegno',
                '✓ Risposta in 5 minuti su WhatsApp',
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
