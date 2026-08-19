import { MessageCircle, Camera, Clock, ArrowRight } from 'lucide-react'

const PHONE_CLEAN = '+393892407827'
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(
  'Ciao! Vorrei una prima valutazione del mio parquet. Vi invio alcune foto.'
)}`

const STEPS = [
  { icon: Camera, text: 'Scatta 2-3 foto del parquet' },
  { icon: MessageCircle, text: 'Invia su WhatsApp' },
  { icon: Clock, text: 'Risposta entro 5 minuti' },
]

export function WhatsAppStrip() {
  return (
    <section
      className="bg-[#111] border-b border-white/5"
      aria-label="Valutazione gratuita via WhatsApp"
    >
      <div className="container-wide py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Steps */}
          <div className="flex items-center gap-4 sm:gap-8">
            {STEPS.map(({ icon: Icon, text }, i) => (
              <div key={text} className="flex items-center gap-2 sm:gap-3">
                {i > 0 && (
                  <ArrowRight
                    size={13}
                    className="text-white/20 hidden sm:block flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center gap-1.5">
                  <Icon size={14} className="text-[#25D366] flex-shrink-0" aria-hidden="true" />
                  <span className="font-sans text-[12px] sm:text-[13px] text-white/70 whitespace-nowrap">
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-sans text-[13px] font-semibold hover:bg-[#20b858] active:scale-[0.98] transition-all duration-200 flex-shrink-0 whitespace-nowrap"
            aria-label="Invia le foto del parquet su WhatsApp per una valutazione gratuita"
          >
            <MessageCircle size={15} aria-hidden="true" />
            Invia le foto — è gratis
          </a>
        </div>
      </div>
    </section>
  )
}
