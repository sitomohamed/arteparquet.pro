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
import { LP_TRUST_SCALA, type LpB2cContent } from '@/components/landing/lp-b2c-content'

const TEL_HREF = 'tel:+393892407827'
const TEL_DISPLAY = '+39 389 240 7827'
const EMAIL_HREF = 'mailto:info@arteparquet.pro'
const MAPS_HREF = 'https://www.google.com/maps/search/Arteparquet+Bergamo'

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

const reviews = [
  {
    name: 'Maria Goisis',
    text: 'Arabi Mohamed ha rimesso a nuovo dei parquet disastrati. È stato veloce, molto disponibile, puntuale e professionale. Siamo entusiasti!',
  },
  {
    name: 'Silvia Ricci',
    text: 'La posa del laminato è stata eccellente. Artigiano puntuale, preciso, abile ed affidabile. Sicuramente invito chi ne abbia bisogno a contattarlo.',
  },
  {
    name: 'Laura Bellentani',
    text: 'Siamo estremamente soddisfatti sia per la qualità del lavoro che per la totale disponibilità a venire incontro ai nostri imprevisti. Consigliatissimo',
  },
]

const steps = [
  {
    n: '1',
    title: 'Invia le foto',
    desc: "2-3 foto via WhatsApp o tramite il modulo. Inquadra l'ambiente e i punti più danneggiati.",
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
    desc: 'Ricevi un preventivo scritto e dettagliato. Chiaro, senza sorprese da annuncio.',
  },
]

const services = [
  {
    title: 'Levigatura',
    desc: 'Macchine professionali a bassa emissione di polvere. Il parquet torna come nuovo.',
  },
  {
    title: 'Restauro Parquet',
    desc: 'Parquet storico e vintage recuperato nel rispetto dei materiali originali.',
  },
  {
    title: 'SPC e PVC',
    desc: 'Pavimenti impermeabili per bagno e cucina. Resistenti, alternativa al legno dove serve.',
  },
  {
    title: 'Posa Parquet',
    desc: 'Massello, prefinito, spina di pesce, Versailles - posa artigianale.',
  },
  {
    title: 'Riparazioni',
    desc: 'Scricchiolii, listelli rotti, bordi scollati: interveniamo sul problema senza rifare tutto.',
  },
  {
    title: 'Sopralluogo gratuito',
    desc: 'Sempre incluso nel preventivo. Veniamo a vedere prima di quotare.',
  },
]

export function LpB2cShell({ content }: { content: LpB2cContent }) {
  const waHref = `https://wa.me/393892407827?text=${encodeURIComponent(content.waMessage)}`

  return (
    <>
      <LpHeader />

      <Suspense fallback={null}>
        <LpTracker variant={content.trackerVariant} />
      </Suspense>

      <main>
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center bg-nero-marquina overflow-hidden pt-20"
          aria-label="Hero principale"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={content.heroImage}
              alt={content.heroAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-nero-marquina/80" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <MapPin className="w-4 h-4 text-rovere" aria-hidden="true" />
              <span className="text-travertino text-sm font-medium">{content.heroBadge}</span>
            </div>

            <h1
              className="text-travertino font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.25rem, 5vw + 1rem, 4.5rem)' }}
            >
              {content.h1Lead}
              <br />
              <span className="text-rovere">{content.h1Accent}</span>
            </h1>

            <p
              className="text-travertino/80 mb-10 max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.25rem)', lineHeight: '1.7' }}
            >
              {content.subhead}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apri WhatsApp e invia le foto per una valutazione gratuita"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl px-7 py-4 text-lg shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl w-full sm:w-auto justify-center"
              >
                <Camera className="w-5 h-5" aria-hidden="true" />
                Invia le foto
              </a>
              <a
                href="#form"
                className="inline-flex items-center gap-2 border-2 border-travertino/60 hover:border-travertino text-travertino font-semibold rounded-xl px-7 py-4 text-lg transition-all duration-200 hover:bg-white/10 w-full sm:w-auto justify-center"
              >
                Compila il modulo
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>

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

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-travertino/70">
              {content.trustStrip.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex justify-center pb-8 animate-bounce">
            <ChevronDown className="w-6 h-6 text-travertino/30" aria-hidden="true" />
          </div>
        </section>

        <section id="problemi" className="py-20 bg-white" aria-label="Problemi">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                {content.problemsTitle}
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">{content.problemsIntro}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {content.problems.map((p) => (
                <div
                  key={p.title}
                  className="bg-wood-50 hover:bg-travertino border border-travertino/40 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-md"
                >
                  <h3 className="font-semibold text-legno-bruciato mb-2 text-base sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl px-6 py-3.5 text-base shadow transition-all duration-200 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                {content.midCta}
              </a>
            </div>
          </div>
        </section>

        <section id="zone" className="py-20 bg-travertino" aria-label="Aree di intervento">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MapPin className="w-8 h-8 text-rovere mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
              Operiamo dove sei tu
            </h2>
            <p className="text-gray-700 mb-3 max-w-2xl mx-auto">
              Sede principale a <strong>Bergamo, Via Vittorio Alfieri 7</strong>. Lavoriamo in
              tutta la Lombardia - dalle valli bergamasche alla periferia milanese, fino a
              Brescia, Como e Monza.
            </p>
            <p className="text-gray-500 text-sm mb-10">
              Non sei sicuro che copriamo la tua zona? Scrivici la città - di solito sì.
            </p>
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
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-20 bg-white" aria-label="Lavori recenti">
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
              {content.portfolio.map((card) => (
                <div
                  key={card.src + card.title}
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 bg-wood-50">
                    <span className="text-xs font-semibold text-rovere uppercase tracking-wider">
                      {card.tag}
                    </span>
                    <h3 className="font-semibold text-legno-bruciato mt-1">{card.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{card.place}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-rovere hover:text-legno-bruciato font-semibold text-base underline underline-offset-4 transition-colors"
              >
                Vedi tutti i lavori
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <h3 className="text-xl font-semibold text-travertino mb-3">Dal 1996</h3>
                <p className="text-travertino/70 leading-relaxed text-sm">
                  Oltre 28 anni di posa, restauro e levigatura parquet. Ogni cantiere con la
                  stessa cura del primo giorno.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <h3 className="text-xl font-semibold text-travertino mb-3">
                  Teatro alla Scala, 2004
                </h3>
                <p className="text-travertino/70 leading-relaxed text-sm">{LP_TRUST_SCALA}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <h3 className="text-xl font-semibold text-travertino mb-3">4.9/5 su Google</h3>
                <p className="text-travertino/70 leading-relaxed text-sm">
                  Recensioni reali, senza solleciti. Puoi verificarle su Google Maps.
                </p>
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-rovere hover:text-travertino text-sm font-medium mt-3 underline underline-offset-2"
                >
                  Leggi su Google Maps
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="servizi" className="py-20 bg-white" aria-label="Servizi">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Cosa facciamo
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">{content.servicesLead}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-4 p-5 rounded-2xl bg-wood-50 border border-travertino/40"
                >
                  <div>
                    <h3 className="font-semibold text-legno-bruciato mb-1.5">{s.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href="#form"
                className="inline-flex items-center gap-2 bg-legno-bruciato hover:bg-nero-marquina text-travertino font-semibold rounded-xl px-6 py-3.5 text-base"
              >
                Invia le foto
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="come-funziona" className="py-20 bg-travertino" aria-label="Come funziona">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Come funziona
              </h2>
            </div>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div
                  key={step.n}
                  className="flex gap-5 items-start bg-white rounded-2xl p-6 shadow-sm border border-travertino/60"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-legno-bruciato text-travertino font-bold text-lg flex items-center justify-center">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-semibold text-legno-bruciato text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{step.desc}</p>
                    {i === 1 && (
                      <p className="mt-3 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex items-start gap-2">
                        <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span>
                          Rispondiamo in <strong className="text-gray-700">orario lavorativo</strong>{' '}
                          (lun-ven 8-18, sab 9-13). Non promettiamo risposte istantanee h24.
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl px-6 py-3.5 text-base shadow"
              >
                <Camera className="w-5 h-5" aria-hidden="true" />
                Invia le foto su WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section id="progetti" className="py-20 bg-white" aria-label="Progetti recenti">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Progetti recenti
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.caseStudies.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl overflow-hidden border border-travertino/60 shadow-sm"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-travertino text-rovere text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 mb-3">
                      {card.tag}
                    </span>
                    <h3 className="text-lg font-bold text-legno-bruciato mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{card.place}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="recensioni" className="py-20 bg-travertino" aria-label="Recensioni">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Cosa dicono i clienti
              </h2>
              <p className="text-gray-600">Recensioni reali su Google - puoi verificarle tu.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {reviews.map((r) => (
                <figure key={r.name} className="bg-white rounded-2xl p-6 shadow-sm border border-travertino/60">
                  <div className="flex gap-0.5 mb-4" aria-label="5 stelle su 5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
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
            <div className="text-center">
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rovere font-semibold underline underline-offset-4"
              >
                Leggi tutte le recensioni su Google
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="chi-siamo" className="py-20 bg-white" aria-label="Chi siamo">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
                <Image
                  src="/portfolio/google-parquet-sala-archi-01.jpg"
                  alt="Sala con archi - parquet posato da Arteparquet, Bergamo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-6">Chi siamo</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Arteparquet è la ditta individuale di <strong>Arabi Mohamed</strong>, maestro
                  parquettista con oltre 28 anni di esperienza nella posa, levigatura e restauro
                  di pavimenti in legno.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{LP_TRUST_SCALA}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-white" aria-label="Domande frequenti">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Domande frequenti
              </h2>
            </div>
            <div className="space-y-4">
              {content.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-wood-50 border border-travertino/60 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer p-6 font-semibold text-legno-bruciato text-base list-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-rovere group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm border-t border-travertino/40">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="garanzie" className="py-20 bg-travertino" aria-label="Garanzie">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Shield className="w-10 h-10 text-rovere mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
                Senza rischi per voi
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-travertino/60">
                <h3 className="font-semibold text-legno-bruciato mb-2 text-lg">
                  Sopralluogo e preventivo sempre gratuiti
                </h3>
                <p className="text-gray-600 text-sm">Nessun costo per capire cosa si può fare.</p>
              </div>
              <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-travertino/60">
                <h3 className="font-semibold text-legno-bruciato mb-2 text-lg">
                  Garanzia scritta sulla manodopera
                </h3>
                <p className="text-gray-600 text-sm">Ogni intervento è coperto da garanzia scritta.</p>
              </div>
              <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-travertino/60">
                <h3 className="font-semibold text-legno-bruciato mb-2 text-lg">
                  Nessun impegno fino alla firma
                </h3>
                <p className="text-gray-600 text-sm">Valutate il preventivo con calma. Zero pressioni.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="form" className="py-20 bg-nero-marquina" aria-label="Modulo">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-travertino mb-4">
                {content.formTitle}
              </h2>
              <p className="text-travertino/70 leading-relaxed">{content.formIntro}</p>
            </div>
            <LpPhotoForm
              variant="b2c"
              landingVariant={content.trackerVariant}
              defaultJobType={content.defaultJobType}
            />
            <div className="mt-8 text-center">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#25D366]/60 text-[#25D366] font-medium rounded-xl px-5 py-3 text-sm"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Invia le foto direttamente su WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section id="contatti" className="py-20 bg-white" aria-label="Contatti">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-legno-bruciato mb-4">
              Preferisci WhatsApp o il telefono?
            </h2>
            <p className="text-gray-600 mb-10">Risponderemo in orario lavorativo.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 bg-[#25D366]/10 border-2 border-[#25D366]/30 text-[#25D366] rounded-2xl p-7"
              >
                <MessageCircle className="w-8 h-8" aria-hidden="true" />
                <p className="font-bold text-lg">WhatsApp</p>
                <p className="text-sm">Invia foto e messaggi</p>
              </a>
              <a
                href={TEL_HREF}
                className="flex flex-col items-center gap-3 bg-legno-bruciato/5 border-2 border-legno-bruciato/20 text-legno-bruciato rounded-2xl p-7"
              >
                <Phone className="w-8 h-8" aria-hidden="true" />
                <p className="font-bold text-lg">Telefono</p>
                <p className="text-sm">{TEL_DISPLAY}</p>
              </a>
              <a
                href={EMAIL_HREF}
                className="flex flex-col items-center gap-3 bg-rovere/10 border-2 border-rovere/20 text-rovere rounded-2xl p-7"
              >
                <p className="font-bold text-lg">Email</p>
                <p className="text-sm">info@arteparquet.pro</p>
              </a>
            </div>
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              lun-ven 8:00-18:00, sab 9:00-13:00
            </p>
          </div>
        </section>
      </main>

      <LpFooter />
    </>
  )
}
