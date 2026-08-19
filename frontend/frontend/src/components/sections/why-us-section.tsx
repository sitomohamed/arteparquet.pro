import Link from 'next/link'
import { CheckCircle, MapPin, Wrench, Shield, Clock, Star } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

const PHONE_CLEAN = '+393892407827'
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/Arteparquet+Bergamo'

const REASONS = [
  {
    icon: CheckCircle,
    title: '30 anni di esperienza reale',
    body: 'Mohamed Arabi lavora il parquet dal 1996. Non esperienza generica: decenni trascorsi a posare, levigare e restaurare pavimenti in legno in Lombardia e oltre.',
  },
  {
    icon: MapPin,
    title: 'Sede a Bergamo, operativi in Lombardia',
    body: 'Via Vittorio Alfieri 7, Bergamo. Raggiungiamo Milano, Brescia, Como, Monza e tutta la regione. Sopralluogo gratuito, senza rimborso spese.',
  },
  {
    icon: Wrench,
    title: 'Solo lavori che sappiamo fare bene',
    body: 'Non prendiamo cantieri fuori dalla nostra competenza. Se il tuo caso richiede qualcosa che non gestiamo, ti lo diciamo chiaramente.',
  },
  {
    icon: Shield,
    title: 'Garanzia scritta sulla manodopera',
    body: 'Ogni posa è coperta da garanzia scritta. Se si riscontrano difetti imputabili alla nostra esecuzione, interveniamo gratuitamente.',
  },
  {
    icon: Clock,
    title: 'Risposta in 5 minuti su WhatsApp',
    body: 'Invia le foto del tuo parquet: ricevi una prima valutazione gratuita senza aspettare giorni. Il cantiere viene concordato in tempi brevi.',
  },
  {
    icon: Star,
    title: 'Recensioni Google reali e verificabili',
    body: (
      <>
        I nostri clienti lasciano recensioni su Google. Puoi leggerle liberamente —{' '}
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rovere underline hover:text-wood-600 transition-colors"
          aria-label="Vedi le recensioni di Arteparquet su Google Maps"
        >
          cerca Arteparquet su Google Maps
        </a>
        .
      </>
    ),
  },
]

export function WhyUsSection() {
  return (
    <section
      className="bg-travertino border-t border-neutral-200"
      aria-labelledby="why-us-heading"
    >
      <div className="container-wide py-20 md:py-28">

        {/* Header */}
        <FadeIn direction="up" className="text-center mb-14">
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
            Perché scegliere Arteparquet
          </span>
          <h2
            id="why-us-heading"
            className="font-serif font-semibold text-legno-bruciato text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Motivi concreti, non promesse.
          </h2>
          <p className="font-sans text-neutral-500 mt-4 max-w-xl mx-auto text-[1rem] leading-relaxed">
            Queste non sono slogan: sono fatti verificabili che puoi controllare prima di chiamarci.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {REASONS.map(({ icon: Icon, title, body }, i) => (
            <FadeIn key={title} direction="up" delay={i * 0.07}>
              <div className="bg-white rounded-2xl border border-neutral-150 p-7 h-full flex flex-col gap-4 hover:border-rovere/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-400 hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-2xl bg-wood-50 ring-1 ring-wood-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-rovere" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-legno-bruciato text-[14.5px] mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="font-sans text-[13px] text-neutral-500 leading-[1.7]">
                    {body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA footer */}
        <FadeIn direction="up" delay={0.3} className="text-center mt-14">
          <p className="font-sans text-[15px] text-neutral-600 mb-5">
            Hai ancora dubbi? Scrivici, senza impegno.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent('Ciao! Vorrei informazioni sui vostri servizi di parquet.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-sans text-[14px] font-semibold hover:bg-[#20b858] transition-colors"
            >
              Scrivici su WhatsApp
            </a>
            <Link
              href="/chi-siamo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-300 text-legno-bruciato font-sans text-[14px] font-medium hover:border-rovere hover:text-rovere transition-colors"
            >
              La nostra storia
            </Link>
          </div>
        </FadeIn>

        {/* NAP coerente — segnale Local SEO */}
        <address className="not-italic mt-14 pt-10 border-t border-neutral-200 text-center font-sans text-[12px] text-neutral-400">
          <strong className="text-neutral-600">Arteparquet</strong> — Via Vittorio Alfieri 7, 24100 Bergamo BG —{' '}
          <a href={`tel:${PHONE_CLEAN}`} className="hover:text-rovere transition-colors">
            +39 389 240 7827
          </a>{' '}
          —{' '}
          <a href="mailto:info@arteparquet.pro" className="hover:text-rovere transition-colors">
            info@arteparquet.pro
          </a>
        </address>
      </div>
    </section>
  )
}
