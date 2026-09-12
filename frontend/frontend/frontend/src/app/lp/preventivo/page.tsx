import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import {
  Camera,
  MessageCircle,
  Phone,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Clock,
  MapPin,
  ChevronDown,
} from 'lucide-react'
import { LpHeader } from '@/components/layout/lp-header'
import { LpFooter } from '@/components/layout/lp-footer'
import { LpTracker } from '@/components/analytics/lp-tracker'
import { LpPhotoForm } from '@/components/forms/lp-photo-form'

export const metadata: Metadata = {
  title: 'Preventivo Parquet Gratuito - Bergamo e Lombardia | Arteparquet',
  description:
    'Invia le foto del tuo parquet su WhatsApp. Valutazione gratuita e senza impegno da maestri parquettisti dal 1996. Bergamo, Milano, Lombardia.',
  robots: { index: false, follow: false },
}

const WA_MESSAGE = encodeURIComponent(
  'Ciao! Ho visto il vostro annuncio e vorrei una valutazione gratuita del mio parquet. Vi invio alcune foto.',
)
const WA_HREF = `https://wa.me/393892407827?text=${WA_MESSAGE}`
const TEL_HREF = 'tel:+393892407827'
const TEL_DISPLAY = '+39 389 240 7827'
const EMAIL_HREF = 'mailto:info@arteparquet.pro'
const MAPS_HREF =
  'https://www.google.com/maps/search/Arteparquet+Bergamo'

/* ---
   DATA
--- */

const problems = [
  {
    icon: '',
    title: 'Graffi e segni del tempo',
    desc: 'Il parquet ha perso brillantezza o mostra graffi profondi',
  },
  {
    icon: '',
    title: 'Umidità e rigonfiamenti',
    desc: 'Listelli sollevati, bordi separati o zone gonfiate',
  },
  {
    icon: '',
    title: 'Scricchiolii fastidiosi',
    desc: 'Ogni passo si sente: il parquet si muove sotto i piedi',
  },
  {
    icon: '',
    title: 'Finitura opaca o sbiadita',
    desc: 'Il colore originale è scomparso, la superficie è grigia',
  },
  {
    icon: '',
    title: 'Vuoi un pavimento nuovo',
    desc: 'Stai ristrutturando e scegli un parquet professionale',
  },
  {
    icon: '',
    title: 'Vuoi cambiare materiale',
    desc: 'Da piastrelle o moquette a parquet - o da parquet a SPC',
  },
]

const services = [
  {
    icon: '',
    title: 'Posa Parquet',
    desc: 'Massello, prefinito, spina di pesce, Versailles - ogni schema posato con precisione artigianale.',
  },
  {
    icon: '',
    title: 'Levigatura',
    desc: 'Macchine professionali a bassa emissione di polvere. Il parquet torna come nuovo.',
  },
  {
    icon: '',
    title: 'Restauro Parquet',
    desc: 'Parquet storico e vintage recuperato e valorizzato nel rispetto dei materiali originali.',
  },
  {
    icon: '',
    title: 'Riparazioni',
    desc: 'Scricchiolii, listelli rotti, bordi scollati: interveniamo sul problema senza rifare tutto.',
  },
  {
    icon: '',
    title: 'SPC e PVC',
    desc: "Pavimenti impermeabili per bagno e cucina. Resistenti e dall'aspetto naturale.",
  },
  {
    icon: '',
    title: 'Sopralluogo gratuito',
    desc: 'Sempre incluso nel preventivo. Veniamo a vedere prima di quotare.',
  },
]

const steps = [
  {
    n: '1',
    title: 'Invia le foto',
    desc: "2-3 foto del parquet via WhatsApp o tramite il modulo. Inquadra l'intera stanza e i punti più danneggiati.",
  },
  {
    n: '2',
    title: 'Valutazione gratuita',
    desc: 'In orario lavorativo esaminiamo le foto e ti rispondiamo con una prima valutazione. Nessun impegno.',
  },
  {
    n: '3',
    title: 'Sopralluogo',
    desc: 'Se il progetto lo richiede, organizziamo un sopralluogo gratuito a casa tua.',
  },
  {
    n: '4',
    title: 'Proposta personalizzata',
    desc: 'Ricevi un preventivo scritto e dettagliato. Prezzi chiari, senza sorprese.',
  },
]

const reviews = [
  {
    name: 'Maria Goisis',
    text: 'Arabi Mohamed ha rimesso a nuovo dei parquet disastrati. È stato veloce, molto disponibile, puntuale e professionale. Siamo entusiasti!',
  },
  {
    name: 'Silvia Ricci',
    text: 'La postura del laminato è stata eccellente. Artigiano puntuale, preciso, abile ed affidabile. Sicuramente invito chi ne abbia bisogno a contattarlo.',
  },
  {
    name: 'Laura Bellentani',
    text: 'Siamo estremamente soddisfatti sia per la qualità del lavoro che per la totale disponibilità a venire incontro ai nostri imprevisti. Consigliatissimo',
  },
]

const faqs = [
  {
    q: 'Il sopralluogo e la valutazione sono davvero gratuiti?',
    a: 'Sì. Sopralluogo, prima valutazione e preventivo scritto sono sempre gratuiti e senza impegno. Non pagate nulla per capire cosa si può fare.',
  },
  {
    q: 'Riuscite a salvare un parquet molto rovinato?',
    a: 'Nella maggior parte dei casi sì. Anche parquet molto danneggiati possono essere levigati, restaurati o riparati. Lo valutiamo in sopralluogo.',
  },
  {
    q: 'Quanto tempo ci vuole?',
    a: 'Dipende dal tipo di intervento e dalla superficie. In sopralluogo vi diciamo con precisione i tempi prima di iniziare.',
  },
  {
    q: 'Dove operate?',
    a: 'Principalmente a Bergamo e provincia (sede in Via Vittorio Alfieri 7), ma operiamo in tutta la Lombardia - Milano, Brescia, Como, Monza, Lecco e altre province.',
  },
  {
    q: 'Dopo che invio le foto, cosa succede?',
    a: 'Esaminiamo le foto in orario lavorativo e vi rispondiamo con una prima valutazione. Se serve un sopralluogo, lo organizziamo gratuitamente. Ricevete poi un preventivo scritto.',
  },
]

const cityBadges = [
  'Bergamo',
  'Seriate',
  'Dalmine',
  'Treviglio',
  'Romano di Lombardia',
  'Milano',
  'Monza',
  'Brescia',
  'Como',
  'Varese',
  'Lecco',
  'Bergamo Città Alta',
]

/* ---
   PAGE (Server Component)
--- */

export default function LpPreventivoPage() {
  return (
    <>
      <LpHeader />

      <Suspense fallback={null}>
        <LpTracker variant="b2c" />
      </Suspense>

      <main>
        {/* ---
            SECTION 1 - MESSAGE MATCH HERO
        --- */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center bg-nero-marquina overflow-hidden pt-20"
          aria-label="Hero principale"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/portfolio/google-spina-pesce-lucida-01.jpg"
              alt="Parquet spina di pesce lucido - Arteparquet Bergamo"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Heavy dark overlay */}
            <div className="absolute inset-0 bg-nero-marquina/80" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <MapPin className="w-4 h-4 text-rovere" aria-hidden="true" />
              <span className="text-travertino text-sm font-medium">
                Bergamo | Milano | Lombardia | Dal 1996
              </span>
            </div>

            {/* H1 */}
            <h1
              className="text-travertino font-bold leading-tight mb-6"
              style={{
                fontSize: 'clamp(2.25rem, 5vw + 1rem, 4.5rem)',
              }}
            >
              Il tuo parquet
              <br />
              <span className="text-rovere">merita di meglio.</span>
            </h1>

            {/* Subhead */}
            <p
              className="text-travertino/80 mb-10 max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.25rem)', lineHeight: '1.7' }}
            >
              Inviaci 2-3 foto. In orario lavorativo valutiamo gratuitamente il
              tuo pavimento e capisci cosa si può fare  - {' '}
              <strong className="text-travertino">senza impegno.</strong>
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              {/* Primary: WhatsApp */}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apri WhatsApp e invia le foto del tuo parquet per una valutazione gratuita"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl px-7 py-4 text-lg shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl w-full sm:w-auto justify-center"
              >
                <Camera className="w-5 h-5" aria-hidden="true" />
                Invia le foto - Valutazione gratuita
              </a>

              {/* Secondary: scroll to form */}
              <a
                href="#form"
                className="inline-flex items-center gap-2 border-2 border-travertino/60 hover:border-travertino text-travertino font-semibold rounded-xl px-7 py-4 text-lg transition-all duration-200 hover:bg-white/10 w-full sm:w-auto justify-center"
              >
                Compila il modulo
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>

            {/* Phone */}
            <p className="text-travertino/60 text-sm mb-8">
              oppure chiama:{' '}
              <a
                href={TEL_HREF}
                aria-label={`Chiama Arteparquet al numero ${TEL_DISPLAY}`}
                className="text-travertino/90 hover:text-rovere font-medium underline underline-offset-2 transition-colors"
              >
                {TEL_DISPLAY}
              </a>
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-travertino/70">
              {['Gratuito', 'Senza impegno', 'Dal 1996', 'Bergamo e Lombardia'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="relative z-10 flex justify-center pb-8 animate-bounce">
            <ChevronDown className="w-6 h-6 text-travertino/30" aria-hidden="true" />
          </div>
        </section>

        {/* ---
            SECTION 2 - PROBLEM RECOGNITION
        --- */}
        <section
          id="problemi"
          className="py-20 bg-white"
          aria-label="Problemi comuni del parquet"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Riconosci il tuo parquet?
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Se hai uno di questi problemi, possiamo aiutarti - spesso senza
                dover sostituire l&apos;intero pavimento.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="group bg-wood-50 hover:bg-travertino border border-travertino/40 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-md"
                >
                  <h3 className="font-semibold text-legno-bruciato mb-2 text-base sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Mid-section CTA */}
            <div className="mt-12 text-center">
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apri WhatsApp per una valutazione gratuita del tuo parquet"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl px-6 py-3.5 text-base shadow transition-all duration-200 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Invia le foto su WhatsApp - è gratuito
              </a>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 3 - IMMEDIATE RELEVANCE (Geographic)
        --- */}
        <section
          id="zone"
          className="py-20 bg-travertino"
          aria-label="Aree di intervento"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MapPin
              className="w-8 h-8 text-rovere mx-auto mb-4"
              aria-hidden="true"
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
              Operiamo dove sei tu
            </h2>
            <p className="text-gray-700 mb-3 max-w-2xl mx-auto">
              Sede principale a{' '}
              <strong>Bergamo, Via Vittorio Alfieri 7</strong>. Lavoriamo in
              tutta la Lombardia - dalle valli bergamasche alla periferia
              milanese, fino a Brescia, Como e Monza.
            </p>
            <p className="text-gray-500 text-sm mb-10">
              Non sei sicuro che copriamo la tua zona? Scrivici - di solito sì.
            </p>

            {/* City badge grid */}
            <div className="flex flex-wrap justify-center gap-3">
              {cityBadges.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1.5 bg-white border border-travertino rounded-full px-4 py-2 text-sm font-medium text-legno-bruciato shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-rovere" aria-hidden="true" />
                  {city}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 bg-white border border-travertino rounded-full px-4 py-2 text-sm font-medium text-rovere shadow-sm">
                + altre province
              </span>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 4 - REAL PROOF (Portfolio)
        --- */}
        <section
          id="portfolio"
          className="py-20 bg-white"
          aria-label="Portfolio lavori recenti"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Lavori recenti
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Foto reali di cantieri completati - nessuna immagine di stock.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/portfolio/google-spina-pesce-finitura-01.jpg"
                    alt="Parquet a spina di pesce in rovere - posa completata a Bergamo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 bg-wood-50">
                  <span className="text-xs font-semibold text-rovere uppercase tracking-wider">
                    Posa
                  </span>
                  <h3 className="font-semibold text-legno-bruciato mt-1">
                    Parquet a Spina di Pesce - Rovere
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">Bergamo</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/portfolio/google-parquet-bordo-intarsio-01.jpg"
                    alt="Parquet con bordo decorativo e intarsio su misura - Bergamo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 bg-wood-50">
                  <span className="text-xs font-semibold text-rovere uppercase tracking-wider">
                    Posa con intarsio
                  </span>
                  <h3 className="font-semibold text-legno-bruciato mt-1">
                    Parquet con Bordo e Intarsio
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">Bergamo</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/portfolio/google-levigatura-mosaico-01.jpg"
                    alt="Levigatura parquet mosaico storico - risultato finale a Bergamo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 bg-wood-50">
                  <span className="text-xs font-semibold text-rovere uppercase tracking-wider">
                    Levigatura
                  </span>
                  <h3 className="font-semibold text-legno-bruciato mt-1">
                    Levigatura Parquet Mosaico
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">Bergamo</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <Link
                href="https://arteparquet.pro/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rovere hover:text-legno-bruciato font-semibold text-base underline underline-offset-4 transition-colors"
              >
                Vedi tutti i lavori
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 5 - WHY TRUST
        --- */}
        <section
          id="chi-siamo-trust"
          className="py-20 bg-nero-marquina"
          aria-label="Perché fidarsi di Arteparquet"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-travertino mb-4">
                30 anni di mestiere, non di marketing
              </h2>
              <p className="text-travertino/60 max-w-xl mx-auto">
                Ogni cantiere porta la stessa cura del primo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Trust 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4" aria-hidden="true">
                  
                </div>
                <h3 className="text-xl font-semibold text-travertino mb-3">
                  Dal 1996
                </h3>
                <p className="text-travertino/70 leading-relaxed text-sm">
                  Oltre 28 anni di posa, restauro e levigatura parquet. Ogni
                  cantiere viene affrontato con la stessa cura e attenzione del
                  primo giorno.
                </p>
              </div>

              {/* Trust 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4" aria-hidden="true">
                  
                </div>
                <h3 className="text-xl font-semibold text-travertino mb-3">
                  Teatro alla Scala, 2004
                </h3>
                <p className="text-travertino/70 leading-relaxed text-sm">
                  Un percorso professionale che include esperienze maturate
                  all&apos;interno di team coinvolti in lavori legati al Teatro
                  alla Scala di Milano nel 2004.
                </p>
              </div>

              {/* Trust 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4" aria-hidden="true">
                  ⭐
                </div>
                <h3 className="text-xl font-semibold text-travertino mb-3">
                  4,7/5 su Google
                </h3>
                <p className="text-travertino/70 leading-relaxed text-sm">
                  Clienti soddisfatti che scrivono recensioni reali, senza
                  solleciti. Puoi verificarle direttamente su Google Maps.
                </p>
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Leggi le recensioni di Arteparquet su Google Maps"
                  className="inline-flex items-center gap-1 text-rovere hover:text-travertino text-sm font-medium mt-3 transition-colors underline underline-offset-2"
                >
                  Leggi su Google Maps
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 6 - SERVICES
        --- */}
        <section
          id="servizi"
          className="py-20 bg-white"
          aria-label="Servizi Arteparquet"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Cosa facciamo
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Dal primo listello alla verniciatura finale - tutto fatto a regola
                d&apos;arte.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-4 p-5 rounded-2xl bg-wood-50 border border-travertino/40 hover:border-rovere/40 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-legno-bruciato mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="#form"
                className="inline-flex items-center gap-2 bg-legno-bruciato hover:bg-nero-marquina text-travertino font-semibold rounded-xl px-6 py-3.5 text-base transition-colors duration-200"
              >
                Richiedi un preventivo gratuito
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 7 - PROCESS
        --- */}
        <section
          id="come-funziona"
          className="py-20 bg-travertino"
          aria-label="Come funziona il processo"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Come funziona
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Quattro passi semplici per passare dal dubbio alla certezza - senza
                nessun costo fino alla firma.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <div
                  key={step.n}
                  className="flex gap-5 items-start bg-white rounded-2xl p-6 shadow-sm border border-travertino/60"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-legno-bruciato text-travertino font-bold text-lg flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-semibold text-legno-bruciato text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {step.desc}
                    </p>
                    {/* Honesty note after step 2 */}
                    {i === 1 && (
                      <p className="mt-3 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex items-start gap-2">
                        <Clock
                          className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>
                          Rispondiamo in{' '}
                          <strong className="text-gray-700">
                            orario lavorativo
                          </strong>{' '}
                          (lun-ven 8-18, sab 9-13). Non promettiamo risposte
                          istantanee h24.
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Invia le foto del tuo parquet su WhatsApp per iniziare subito"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl px-6 py-3.5 text-base shadow transition-all duration-200 hover:scale-105"
              >
                <Camera className="w-5 h-5" aria-hidden="true" />
                Inizia ora - invia le foto su WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 8 - CASE STUDIES (honest approach)
        --- */}
        <section
          id="progetti"
          className="py-20 bg-white"
          aria-label="Progetti recenti"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Progetti recenti
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Ogni lavoro è diverso. Ecco due esempi reali di cantieri completati.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case 1 */}
              <div className="rounded-2xl overflow-hidden border border-travertino/60 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <Image
                    src="/portfolio/google-parquet-bordo-intarsio-01.jpg"
                    alt="Posa parquet massello con bordo decorativo e intarsio - Bergamo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-travertino text-rovere text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 mb-3">
                    Posa Massello
                  </span>
                  <h3 className="text-lg font-bold text-legno-bruciato mb-2">
                    Posa con intarsio su misura
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Bergamo | Parquet massello | Schema a listoni con bordo
                    decorativo
                  </p>
                </div>
              </div>

              {/* Case 2 */}
              <div className="rounded-2xl overflow-hidden border border-travertino/60 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <Image
                    src="/portfolio/google-levigatura-mosaico-01.jpg"
                    alt="Restauro e levigatura completa parquet mosaico storico - Bergamo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-travertino text-rovere text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 mb-3">
                    Restauro &amp; Levigatura
                  </span>
                  <h3 className="text-lg font-bold text-legno-bruciato mb-2">
                    Restauro levigatura completo
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Bergamo | Parquet mosaico storico | Levigatura + verniciatura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 9 - REVIEWS
        --- */}
        <section
          id="recensioni"
          className="py-20 bg-travertino"
          aria-label="Recensioni clienti"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Cosa dicono i clienti
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Recensioni reali pubblicate su Google - puoi verificarle tu stesso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {reviews.map((r) => (
                <figure
                  key={r.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-travertino/60"
                >
                  {/* Stars */}
                  <div
                    className="flex gap-0.5 mb-4"
                    aria-label="5 stelle su 5"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed text-sm mb-4">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="font-semibold text-legno-bruciato text-sm">
                    - {r.name}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Link to Google Maps */}
            <div className="text-center">
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Leggi tutte le recensioni di Arteparquet su Google Maps"
                className="inline-flex items-center gap-2 text-rovere hover:text-legno-bruciato font-semibold underline underline-offset-4 transition-colors text-base"
              >
                Leggi tutte le recensioni su Google
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 10 - HUMAN IDENTITY
        --- */}
        <section
          id="chi-siamo"
          className="py-20 bg-white"
          aria-label="Chi siamo - Arteparquet"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
                <Image
                  src="/portfolio/google-parquet-sala-archi-01.jpg"
                  alt="Sala con archi - parquet posato da Arteparquet, Bergamo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text */}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-6">
                  Chi siamo
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Arteparquet è la ditta individuale di{' '}
                  <strong>Arabi Mohamed</strong>, maestro parquettista con oltre
                  28 anni di esperienza nella posa, levigatura e restauro di
                  pavimenti in legno.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ogni intervento viene gestito personalmente, con attenzione al
                  dettaglio e rispetto per il materiale. Non esiste una
                  &quot;squadra anonima&quot; - sapete sempre con chi avete a che
                  fare.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Un percorso professionale iniziato nel 1996, con esperienze
                  maturate all&apos;interno di team coinvolti in lavori legati al
                  Teatro alla Scala di Milano nel 2004.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 11 - LOCAL RELEVANCE
        --- */}
        <section
          id="area-intervento"
          className="py-20 bg-wood-50"
          aria-label="Area di intervento dettagliata"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
              La nostra area di intervento
            </h2>
            <p className="text-gray-600 mb-3">
              Sede operativa:{' '}
              <strong className="text-legno-bruciato">
                Via Vittorio Alfieri 7, Bergamo
              </strong>
            </p>
            <p className="text-gray-500 text-sm mb-10">
              Zone principali: Bergamo e provincia | Milano e hinterland | Brescia
              | Como | Monza e Brianza
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                'Bergamo',
                'Seriate',
                'Dalmine',
                'Treviglio',
                'Caravaggio',
                'Clusone',
                'Milano',
                'Sesto San Giovanni',
                'Cologno Monzese',
                'Monza',
                'Brescia',
                'Como',
                'Varese',
                'Lecco',
                'Bergamo Città Alta',
              ].map((town) => (
                <span
                  key={town}
                  className="bg-white border border-travertino rounded-full px-3.5 py-1.5 text-sm text-legno-bruciato font-medium"
                >
                  {town}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              Hai dubbi sulla tua città?{' '}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chiedici su WhatsApp se operiamo nella tua zona"
                className="text-rovere hover:text-legno-bruciato underline underline-offset-2 transition-colors font-medium"
              >
                Chiedici su WhatsApp →
              </a>
            </p>
          </div>
        </section>

        {/* ---
            SECTION 12 - FAQ
        --- */}
        <section
          id="faq"
          className="py-20 bg-white"
          aria-label="Domande frequenti"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Domande frequenti
              </h2>
              <p className="text-gray-600">
                Le risposte alle domande più comuni - prima di chiamare.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-wood-50 border border-travertino/60 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer p-6 font-semibold text-legno-bruciato text-base hover:text-rovere transition-colors list-none">
                    <span>{faq.q}</span>
                    <ChevronDown
                      className="w-5 h-5 flex-shrink-0 text-rovere group-open:rotate-180 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed text-sm border-t border-travertino/40">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---
            SECTION 13 - RISK REDUCTION
        --- */}
        <section
          id="garanzie"
          className="py-20 bg-travertino"
          aria-label="Garanzie e tutele"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Shield
                className="w-10 h-10 text-rovere mx-auto mb-4"
                aria-hidden="true"
              />
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Senza rischi per voi
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Trasparenza totale, dall'inizio alla fine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-travertino/60">
                <div className="text-4xl mb-4" aria-hidden="true">
                  🆓
                </div>
                <h3 className="font-semibold text-legno-bruciato mb-2 text-lg">
                  Sopralluogo e preventivo sempre gratuiti
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nessun costo per valutare il lavoro e capire cosa si può fare.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-travertino/60">
                <div className="text-4xl mb-4" aria-hidden="true">
                  
                </div>
                <h3 className="font-semibold text-legno-bruciato mb-2 text-lg">
                  Garanzia scritta sulla manodopera
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ogni intervento è coperto da garanzia scritta, per la vostra
                  tranquillità.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-travertino/60">
                <div className="text-4xl mb-4" aria-hidden="true">
                  
                </div>
                <h3 className="font-semibold text-legno-bruciato mb-2 text-lg">
                  Nessun impegno fino alla firma
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Potete valutare il preventivo con tutta la calma che volete.
                  Zero pressioni.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 14 - PRIMARY FORM CTA
        --- */}
        <section
          id="form"
          className="py-20 bg-nero-marquina"
          aria-label="Modulo richiesta preventivo parquet"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-travertino mb-4">
                Invia le foto del tuo parquet
              </h2>
              <p className="text-travertino/70 leading-relaxed">
                Compila il modulo: valutiamo gratuitamente e ti rispondiamo in
                orario lavorativo.{' '}
                <span className="text-travertino/50">Nessun impegno.</span>
              </p>
            </div>

            <LpPhotoForm variant="b2c" />

            {/* Or use WhatsApp directly */}
            <div className="mt-8 text-center">
              <p className="text-travertino/50 text-sm mb-3">
                Preferisci farlo subito?
              </p>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Invia direttamente le foto su WhatsApp senza compilare il modulo"
                className="inline-flex items-center gap-2 border border-[#25D366]/60 hover:border-[#25D366] text-[#25D366] font-medium rounded-xl px-5 py-3 text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Invia le foto direttamente su WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ---
            SECTION 15 - FINAL CTA
        --- */}
        <section
          id="contatti"
          className="py-20 bg-white"
          aria-label="Contatti - WhatsApp, telefono, email"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
              Preferisci WhatsApp o il telefono?
            </h2>
            <p className="text-gray-600 mb-10 max-w-xl mx-auto">
              Scegliete il canale che vi è più comodo. Risponderemo in orario
              lavorativo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {/* WhatsApp */}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contatta Arteparquet su WhatsApp"
                className="group flex flex-col items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366] border-2 border-[#25D366]/30 hover:border-[#25D366] text-[#25D366] hover:text-white rounded-2xl p-7 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <MessageCircle className="w-8 h-8" aria-hidden="true" />
                <div>
                  <p className="font-bold text-lg">WhatsApp</p>
                  <p className="text-sm opacity-80 group-hover:opacity-100">
                    Invia foto e messaggi
                  </p>
                </div>
              </a>

              {/* Telefono */}
              <a
                href={TEL_HREF}
                aria-label={`Chiama Arteparquet al numero ${TEL_DISPLAY}`}
                className="group flex flex-col items-center gap-3 bg-legno-bruciato/5 hover:bg-legno-bruciato border-2 border-legno-bruciato/20 hover:border-legno-bruciato text-legno-bruciato hover:text-travertino rounded-2xl p-7 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <Phone className="w-8 h-8" aria-hidden="true" />
                <div>
                  <p className="font-bold text-lg">Telefono</p>
                  <p className="text-sm opacity-70 group-hover:opacity-100">
                    {TEL_DISPLAY}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={EMAIL_HREF}
                aria-label="Scrivi un'email ad Arteparquet"
                className="group flex flex-col items-center gap-3 bg-rovere/10 hover:bg-rovere border-2 border-rovere/20 hover:border-rovere text-rovere hover:text-white rounded-2xl p-7 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <div>
                  <p className="font-bold text-lg">Email</p>
                  <p className="text-sm opacity-70 group-hover:opacity-100">
                    info@arteparquet.pro
                  </p>
                </div>
              </a>
            </div>

            {/* Orari onesti */}
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              Risposta in orario lavorativo: lun-ven 8:00-18:00, sab 9:00-13:00
            </p>
          </div>
        </section>
      </main>

      <LpFooter />
    </>
  )
}
