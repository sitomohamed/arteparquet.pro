import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/contact-form'
import { FadeIn } from '@/components/animations/fade-in'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contatti | Sopralluogo e Preventivo Gratuito Parquet',
  description:
    'Richiedi un sopralluogo gratuito a Bergamo, Milano e in Lombardia. Posa e restauro parquet. Rispondiamo entro 5 minuti su WhatsApp. ☎ +39 389 240 7827.',
  alternates: { canonical: 'https://arteparquet.pro/contatti' },
}

const PHONE = '+39 389 240 7827'
const PHONE_CLEAN = '+393892407827'
const EMAIL = 'info@arteparquet.pro'
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(
  'Ciao! Vorrei fissare un sopralluogo gratuito.'
)}`

export default function ContattiPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-nero-marquina pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              Contatti
            </span>
            <h1
              className="font-serif font-semibold text-white mb-4 text-balance"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
            >
              Parliamo del tuo progetto.
            </h1>
            <p className="font-sans text-white/65 max-w-lg leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Sopralluoghi e preventivi gratuiti in tutta Italia. Raccontaci la tua visione.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-travertino">
        <div className="container-wide py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left — contact info */}
            <div className="lg:col-span-2">
              <FadeIn direction="left">
                <h2 className="font-serif font-semibold text-legno-bruciato text-[1.5rem] mb-8">
                  Come raggiungerci
                </h2>

                <div className="space-y-5 mb-10">
                  <a
                    href={`tel:${PHONE_CLEAN}`}
                    className="flex items-start gap-4 group"
                    aria-label={`Chiama ${PHONE}`}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-wood-50 ring-1 ring-wood-100 group-hover:bg-rovere group-hover:ring-rovere/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <Phone size={17} className="text-rovere group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">Telefono</p>
                      <p className="font-sans text-[16px] font-semibold text-legno-bruciato group-hover:text-rovere transition-colors">{PHONE}</p>
                    </div>
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#25D366]/10 ring-1 ring-[#25D366]/20 group-hover:bg-[#25D366] group-hover:ring-[#25D366]/30 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <MessageCircle size={17} className="text-[#25D366] group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">WhatsApp</p>
                      <p className="font-sans text-[16px] font-semibold text-legno-bruciato group-hover:text-[#25D366] transition-colors">Risposta entro 5 minuti</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-wood-50 ring-1 ring-wood-100 group-hover:bg-rovere group-hover:ring-rovere/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <Mail size={17} className="text-rovere group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">Email</p>
                      <p className="font-sans text-[16px] font-semibold text-legno-bruciato group-hover:text-rovere transition-colors">{EMAIL}</p>
                    </div>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Via+Vittorio+Alfieri+7+Bergamo+24100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                    aria-label="Apri su Google Maps"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-wood-50 ring-1 ring-wood-100 group-hover:bg-rovere group-hover:ring-rovere/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <MapPin size={17} className="text-rovere group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">Sede</p>
                      <p className="font-sans text-[16px] font-semibold text-legno-bruciato group-hover:text-rovere transition-colors">Via Vittorio Alfieri 7, Bergamo</p>
                      <p className="font-sans text-[13px] text-rovere font-medium mt-0.5">Apri su Google Maps →</p>
                    </div>
                  </a>
                </div>

                {/* Hours */}
                <div className="rounded-2xl bg-white border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-rovere" aria-hidden="true" />
                    <span className="font-sans text-[13px] font-semibold uppercase tracking-wider text-neutral-500">Orari</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { day: 'Lunedì – Venerdì', time: '08:00 – 18:00' },
                      { day: 'Sabato', time: '09:00 – 13:00' },
                      { day: 'Domenica', time: 'Chiuso' },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between items-center">
                        <span className="font-sans text-[13px] text-neutral-600">{h.day}</span>
                        <span className={`font-sans text-[13px] font-semibold ${h.time === 'Chiuso' ? 'text-neutral-400' : 'text-legno-bruciato'}`}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust */}
                <div className="space-y-2 mb-6">
                  {[
                    '✓ Sopralluogo gratuito senza impegno',
                    '✓ Preventivo dettagliato entro 24h',
                    '✓ Nessun costo nascosto',
                    '✓ Garanzia scritta sulla posa',
                  ].map((item) => (
                    <p key={item} className="font-sans text-[13px] text-neutral-600">{item}</p>
                  ))}
                </div>

                {/* Google Reviews */}
                <a
                  href="https://www.google.com/maps/search/Arteparquet+Di+Arabi+Mohamed+Bergamo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-[13px] text-rovere hover:text-wood-600 transition-colors font-semibold"
                >
                  ★ 4.9/5 — Leggi le recensioni Google →
                </a>
              </FadeIn>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <FadeIn direction="right">
                <div className="bg-white rounded-3xl border border-neutral-100 p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.07)]">
                  <h2 className="font-serif font-semibold text-legno-bruciato text-[1.5rem] mb-2">
                    Richiedi Preventivo Gratuito
                  </h2>
                  <p className="font-sans text-[14px] text-neutral-500 mb-8">
                    Compila il modulo e ti ricontatteremo entro 24 ore.
                  </p>
                  <ContactForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
