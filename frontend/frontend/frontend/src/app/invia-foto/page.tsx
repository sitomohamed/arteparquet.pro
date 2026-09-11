import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, MessageCircle, Phone, ArrowRight, CheckCircle, Clock, Shield, Star } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { PhotoUploadForm } from '@/components/forms/photo-upload-form'
import { BreadcrumbSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Invia le Foto del Tuo Parquet - Valutazione Gratuita | Arteparquet',
  description:
    'Invia 2-3 foto del tuo parquet su WhatsApp e ricevi una valutazione gratuita. Nessun impegno. Risposta in orario lavorativo. Bergamo, Milano e Lombardia.',
  alternates: { canonical: 'https://arteparquet.pro/invia-foto' },
  openGraph: {
    title: 'Invia le Foto del Tuo Parquet - Valutazione Gratuita | Arteparquet',
    description: 'Invia le foto del parquet su WhatsApp e ricevi una valutazione gratuita. Sopralluogo gratuito. Posa, restauro, levigatura a Bergamo e Lombardia.',
    url: 'https://arteparquet.pro/invia-foto',
    locale: 'it_IT',
    type: 'website',
  },
}

const PHONE_CLEAN = '+393892407827'
const WHATSAPP_TEXT = encodeURIComponent(
  'Ciao! Vorrei una valutazione gratuita del mio parquet. Vi invio alcune foto.'
)
const WHATSAPP_URL = `https://wa.me/${PHONE_CLEAN}?text=${WHATSAPP_TEXT}`

const STEPS = [
  {
    number: '1',
    icon: Camera,
    title: 'Scatta 2-3 foto',
    description: 'Fotografa il parquet dall\'alto e da vicino per mostrare lo stato della superficie, i graffi o i danni presenti.',
    tip: 'Buona luce naturale = foto migliore',
  },
  {
    number: '2',
    icon: MessageCircle,
    title: 'Invia su WhatsApp',
    description: 'Apri la chat con noi su WhatsApp, allega le foto e scrivi brevemente il problema o l\'intervento che desideri.',
    tip: 'Puoi allegare fino a 30 foto per messaggio',
  },
  {
    number: '3',
    icon: Clock,
    title: 'Ricevi la valutazione',
    description: 'Il nostro team esamina le foto e ti risponde con una prima valutazione gratuita e, se necessario, prenotiamo il sopralluogo.',
    tip: 'Risposta in orario lavorativo',
  },
]

const PHOTO_TIPS = [
  {
    title: 'Vista dall\'alto',
    description: 'Foto intera della stanza o della zona da trattare. Aiuta a capire la metratura approssimativa.',
    emoji: '',
  },
  {
    title: 'Graffi e danni',
    description: 'Avvicinati ai punti più danneggiati. Inquadra i graffi, le macchie o le zone sollevate in dettaglio.',
    emoji: '',
  },
  {
    title: 'Angoli e bordi',
    description: 'Fotografa angoli e battiscopa: spesso è lì che si vedono sollevamenti o danni da umidità.',
    emoji: '',
  },
  {
    title: 'Luce naturale',
    description: 'Scatta con luce naturale o buona illuminazione per mostrare il colore reale e i difetti della superficie.',
    emoji: '',
  },
]

export default function InviaFotoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Invia le Foto', url: 'https://arteparquet.pro/invia-foto' },
        ]}
      />

      {/* Hero */}
      <section className="bg-nero-marquina pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <FadeIn direction="up">
              <span className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere bg-rovere/10 border border-rovere/20 px-3 py-1.5 rounded-full mb-6">
                <Camera size={12} aria-hidden="true" /> Valutazione Gratuita
              </span>
              <h1
                className="font-serif font-semibold text-white mb-5 text-balance"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
              >
                Invia le Foto del Tuo Parquet.<br />
                <em className="not-italic text-rovere">Valutazione Gratuita.</em>
              </h1>
              <p
                className="font-sans text-white/65 max-w-xl leading-relaxed mb-8"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
              >
                Scatta 2-3 foto del parquet e inviamele su WhatsApp. In pochi minuti capiamo
                insieme che tipo di intervento è necessario - senza sopralluogo, senza impegno.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-sans text-[15px] font-semibold hover:bg-[#20b858] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#25D366]/25"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Invia le Foto su WhatsApp
                </a>
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-sans text-[15px] font-medium hover:border-white/45 hover:bg-white/5 transition-all duration-200"
                >
                  Compila il modulo online
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.25}>
              <div className="flex flex-wrap gap-5 mt-10">
                {[
                  'Risposta in orario lavorativo',
                  'Nessun impegno',
                  'Preventivo gratuito',
                  'Bergamo, Milano e Lombardia',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-rovere flex-shrink-0" aria-hidden="true" />
                    <span className="font-sans text-[13px] text-white/55">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="bg-travertino py-20 md:py-28">
        <div className="container-wide">
          <FadeIn direction="up" className="text-center mb-14">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              Come funziona
            </span>
            <h2
              className="font-serif font-semibold text-legno-bruciato text-balance"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              In 3 passi semplici
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <FadeIn key={step.number} direction="up" delay={i * 0.1}>
                  <div className="relative bg-white rounded-2xl border border-neutral-100 p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-rovere/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={22} className="text-rovere" aria-hidden="true" />
                      </div>
                      <span className="font-serif font-bold text-[3rem] leading-none text-neutral-100 select-none">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-sans font-semibold text-legno-bruciato text-[18px] mb-3">
                      {step.title}
                    </h3>
                    <p className="font-sans text-[14px] text-neutral-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rovere flex-shrink-0" aria-hidden="true" />
                      <span className="font-sans text-[12px] text-rovere font-medium italic">{step.tip}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight size={20} className="text-neutral-300" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </FadeIn>
              )
            })}
          </div>

          <FadeIn direction="up" delay={0.35} className="text-center mt-12">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-10 py-4.5 rounded-xl bg-[#25D366] text-white font-sans text-[15px] font-semibold hover:bg-[#20b858] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Inizia su WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Come fotografare il parquet */}
      <section className="bg-white py-16 md:py-24 border-t border-neutral-100">
        <div className="container-wide">
          <FadeIn direction="up" className="text-center mb-12">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              Consigli
            </span>
            <h2
              className="font-serif font-semibold text-legno-bruciato text-balance"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
            >
              Come fotografare il parquet per una valutazione precisa
            </h2>
            <p className="font-sans text-neutral-500 mt-3 max-w-2xl mx-auto text-[15px]">
              Migliore è la foto, più precisa sarà la valutazione. Segui questi consigli.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHOTO_TIPS.map((tip, i) => (
              <FadeIn key={tip.title} direction="up" delay={i * 0.08}>
                <div className="bg-travertino rounded-2xl border border-neutral-100 p-6 h-full">
                  <h3 className="font-sans font-semibold text-legno-bruciato text-[15px] mb-2">
                    {tip.title}
                  </h3>
                  <p className="font-sans text-[13px] text-neutral-600 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Form alternativo / modulo online */}
      <section className="bg-travertino py-16 md:py-24 border-t border-neutral-100">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <FadeIn direction="up" className="text-center mb-10">
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
                Preferisci il modulo online?
              </span>
              <h2
                className="font-serif font-semibold text-legno-bruciato text-balance"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
              >
                Invia le foto via email
              </h2>
              <p className="font-sans text-neutral-500 mt-3 text-[15px]">
                Se non usi WhatsApp, puoi inviarci le foto direttamente via email.
                Rispondiamo in orario lavorativo.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <PhotoUploadForm />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-nero-marquina py-16 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Star,
                value: '4.9/5',
                label: 'Recensioni Google',
                sub: 'Clienti soddisfatti in tutta la Lombardia',
              },
              {
                icon: CheckCircle,
                value: '30 anni',
                label: 'Di esperienza',
                sub: 'Fondati nel 1996. Ex team Teatro alla Scala 2004.',
              },
              {
                icon: Shield,
                value: '100%',
                label: 'Garanzia scritta',
                sub: 'Ogni intervento coperto da garanzia scritta sulla posa',
              },
            ].map(({ icon: Icon, value, label, sub }) => (
              <FadeIn key={label} direction="up">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rovere/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-rovere" aria-hidden="true" />
                  </div>
                  <div className="font-serif font-bold text-white text-[2.5rem] mb-1">{value}</div>
                  <div className="font-sans font-semibold text-rovere text-[13px] uppercase tracking-wider mb-1">{label}</div>
                  <div className="font-sans text-white/45 text-[13px]">{sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={0.3} className="text-center mt-12 pt-10 border-t border-white/10">
            <p className="font-sans text-white/50 text-[14px] mb-4">
              Preferisci chiamare direttamente?
            </p>
            <a
              href="tel:+393892407827"
              className="inline-flex items-center gap-2 font-sans text-[16px] font-semibold text-white hover:text-rovere transition-colors"
            >
              <Phone size={18} aria-hidden="true" />
              +39 389 240 7827
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
