import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import {
  Briefcase,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Shield,
  FileText,
  Package,
  Clock,
} from 'lucide-react'
import { LpHeader } from '@/components/layout/lp-header'
import { LpFooter } from '@/components/layout/lp-footer'
import { LpTracker } from '@/components/analytics/lp-tracker'
import { LpPhotoForm } from '@/components/forms/lp-photo-form'

/* ---
   METADATA - noindex, never in sitemap
--- */
export const metadata: Metadata = {
  title: 'Parquet per Architetti e Imprese - Partner di Cantiere | Arteparquet',
  description:
    'Collaboriamo con architetti, interior designer e imprese per posa parquet a Bergamo e in Lombardia. Campionature, preventivi tecnici, garanzia scritta.',
  robots: { index: false, follow: false },
}

/* ---
   CONSTANTS
--- */
const WA_MSG_B2B = encodeURIComponent(
  'Ciao! Sono un professionista (architetto/interior designer/impresa) e vorrei discutere di una collaborazione per un cantiere a Bergamo/Lombardia.',
)
const WA_HREF      = `https://wa.me/393892407827?text=${WA_MSG_B2B}`
const TEL_HREF     = 'tel:+393892407827'
const TEL_DISPLAY  = '+39 389 240 7827'
const EMAIL_HREF   = 'mailto:info@arteparquet.pro'
const MAPS_HREF    = 'https://www.google.com/maps/search/Arteparquet+Bergamo'

/* ---
   DATA
--- */
const challenges = [
  {
    icon: '',
    title: 'Rispetto dei tempi di cantiere',
    desc: 'I tuoi clienti non aspettano. Pianifichiamo in anticipo e rispettiamo le scadenze concordate.',
  },
  {
    icon: '',
    title: 'Schemi su misura',
    desc: 'Spina di pesce, punto d\'Ungheria, Versailles, intarsi geometrici. Realizziamo schemi complessi.',
  },
  {
    icon: '',
    title: 'Documentazione e garanzie',
    desc: 'Garanzia scritta sulla manodopera, schede materiali su richiesta. Tutto tracciabile.',
  },
  {
    icon: '',
    title: 'Campionature rapide',
    desc: 'Forniamo campioni di essenze e finiture per le presentazioni ai tuoi clienti.',
  },
  {
    icon: '',
    title: 'Comunicazione professionale',
    desc: 'Preventivi tecnici chiari, aggiornamenti durante i lavori, nessuna sorpresa.',
  },
  {
    icon: '',
    title: 'Coordinamento con altre maestranze',
    desc: 'Ci coordiniamo con le altre figure di cantiere per minimizzare i ritardi.',
  },
]

const services = [
  {
    icon: '',
    title: 'Posa parquet massello e prefinito',
    desc: 'Tutti gli schemi: a listoni, spina di pesce, punto d\'Ungheria, Versailles.',
  },
  {
    icon: '',
    title: 'Levigatura professionale',
    desc: 'Tecnologia quasi dust-free. Rifinitura, verniciatura e oliatura.',
  },
  {
    icon: '',
    title: 'Restauro parquet storico',
    desc: 'Interventi di recupero su parquet d\'epoca e pavimenti di pregio.',
  },
  {
    icon: '',
    title: 'Campionature e consulenza',
    desc: 'Campioni di essenze e finiture per scegliere con i tuoi clienti.',
  },
  {
    icon: '',
    title: 'Schemi complessi e intarsi',
    desc: 'Intarsi geometrici, bordi decorativi, fasce su misura.',
  },
  {
    icon: '',
    title: 'SPC e pavimenti moderni',
    desc: 'Pavimenti impermeabili ad alta resistenza per bagni, cucine e ambienti tecnici.',
  },
]

const schemas = [
  { name: 'Listone a correre', desc: 'Schema classico, adatto a tutti gli ambienti' },
  { name: 'Spina di pesce 45°', desc: 'Elegante e richiesto, massello o prefinito' },
  { name: 'Punto d\'Ungheria 90°', desc: 'Chevron simmetrico, effetto visivo forte' },
  { name: 'Parquet a Versailles', desc: 'Schema a quadri intrecciati, alta artigianalità' },
  { name: 'Intarsi geometrici', desc: 'Bordi, stelle, fasce, su disegno o idea del progettista' },
  { name: 'Schemi misti', desc: 'Composizioni personalizzate su richiesta del progettista' },
]

const trustPoints = [
  {
    icon: <Shield className="w-8 h-8 text-rovere" />,
    title: '28+ anni di esperienza',
    desc: 'Fondata nel 1996. Esperienza su cantieri residenziali, commerciali e di pregio in Lombardia.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-rovere" />,
    title: 'Teatro alla Scala, 2004',
    desc: 'Un percorso professionale che include esperienze maturate all\'interno di team coinvolti in lavori legati al Teatro alla Scala di Milano.',
  },
  {
    icon: <FileText className="w-8 h-8 text-rovere" />,
    title: 'Garanzia scritta',
    desc: 'Ogni intervento è coperto da garanzia scritta sulla manodopera. Documentazione disponibile su richiesta.',
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-rovere" />,
    title: '4,7/5 su Google',
    desc: 'Recensioni reali verificabili su Google Maps. La nostra reputazione è il nostro portfolio.',
  },
]

const reviews = [
  {
    text: 'Arabi Mohamed ha rimesso a nuovo dei parquet disastrati. È stato veloce, molto disponibile, puntuale e professionale. Siamo entusiasti!',
    author: 'Maria Goisis',
  },
  {
    text: 'La postura del laminato è stata eccellente. Artigiano puntuale, preciso, abile ed affidabile. Sicuramente invito chi ne abbia bisogno a contattarlo.',
    author: 'Silvia Ricci',
  },
  {
    text: 'Siamo estremamente soddisfatti sia per la qualità del lavoro che per la totale disponibilità a venire incontro ai nostri imprevisti. Consigliatissimo',
    author: 'Laura Bellentani',
  },
]

const portfolio = [
  {
    src: '/portfolio/intarsio-stella-01.jpg',
    alt: 'Intarsio a stella su parquet in rovere - lavorazione artigianale',
    caption: 'Intarsio a stella su misura',
    info: 'Bergamo | Lavorazione artigianale personalizzata',
  },
  {
    src: '/portfolio/google-parquet-bordo-intarsio-01.jpg',
    alt: 'Parquet con bordo e filetto decorativo',
    caption: 'Parquet con bordo e filetto',
    info: 'Bergamo | Schema con fascia decorativa',
  },
  {
    src: '/portfolio/google-parquet-sala-archi-01.jpg',
    alt: 'Posa parquet in sala con aperture ad arco',
    caption: 'Posa in sala con aperture ad arco',
    info: 'Lombardia | Listoni chiari con finitura opaca',
  },
]

const faqs = [
  {
    q: 'Fate campionature per le presentazioni ai clienti?',
    a: 'Sì. Forniamo campioni di essenze e finiture. Contattateci per concordare quali materiali mostrare al cliente finale prima di decidere.',
  },
  {
    q: 'Avete esperienza con schemi complessi come spina di pesce o Versailles?',
    a: 'Sì. Realizziamo tutti gli schemi classici e moderni, compresi intarsi su misura e lavorazioni geometriche. Valutiamo ogni progetto nel dettaglio.',
  },
  {
    q: 'Fornite documentazione e garanzie per i vostri interventi?',
    a: 'Sì. Rilasciamo garanzia scritta sulla manodopera. Su richiesta forniamo schede tecniche dei materiali utilizzati.',
  },
  {
    q: 'Come gestite i cantieri con tempistiche strette?',
    a: 'Pianifichiamo i lavori con anticipo e ci coordiniamo con le altre maestranze. In caso di variazioni, vi aggiorniamo tempestivamente.',
  },
  {
    q: 'Siete disponibili per sopralluogo prima del preventivo?',
    a: 'Sì. Il sopralluogo è sempre gratuito. Vi consigliamo di organizzarlo prima della firma del contratto con il cliente finale, così abbiamo tutti i dati tecnici necessari.',
  },
]

/* ---
   PAGE
--- */
export default function LpArchitettiPage() {
  return (
    <>
      <LpHeader />

      {/* Analytics - must be in Suspense because useSearchParams() is used */}
      <Suspense fallback={null}>
        <LpTracker variant="b2b" />
      </Suspense>

      <main className="bg-nero-marquina text-travertino">

        {/* ── SECTION 1: HERO --- */}
        <section
          className="relative min-h-screen flex flex-col justify-center pt-16"
          aria-labelledby="hero-heading"
        >
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/portfolio/google-spina-pesce-finitura-01.jpg"
              alt="Parquet a spina di pesce rovere - posa professionale Arteparquet"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-nero-marquina/82" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-5 py-20 flex flex-col gap-7 items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
              <Briefcase size={13} className="text-rovere flex-shrink-0" aria-hidden="true" />
              <span className="font-sans text-[12px] font-semibold text-travertino/80 tracking-wide uppercase">
                Per Architetti | Interior Designer | Imprese | Geometri
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="font-serif font-bold text-travertino leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Un partner affidabile<br />
              per i tuoi cantieri.
            </h1>

            {/* Subhead */}
            <p className="font-sans text-[17px] text-travertino/75 max-w-xl leading-relaxed">
              Posa parquet di qualità, puntualità, documentazione. Collaboriamo con studi
              professionali e imprese in tutta la Lombardia - dal 1996.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#form"
                className="inline-flex items-center justify-center gap-2 bg-rovere hover:bg-wood-500 text-white font-sans text-[15px] font-bold px-7 py-4 rounded-xl transition-colors duration-200 active:scale-[0.97] shadow-lg"
                aria-label="Richiedi una campionatura o preventivo tecnico"
              >
                <Package size={17} aria-hidden="true" />
                Richiedi campionatura
              </a>
              <a
                href="#form"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-white/50 text-travertino font-sans text-[15px] font-semibold px-7 py-4 rounded-xl transition-colors duration-200 active:scale-[0.97]"
                aria-label="Richiedi preventivo tecnico"
              >
                <FileText size={17} aria-hidden="true" />
                Preventivo tecnico
              </a>
            </div>

            {/* Email CTA */}
            <p className="font-sans text-[14px] text-travertino/45">
              oppure scrivi a{' '}
              <a
                href={EMAIL_HREF}
                className="text-rovere underline underline-offset-2 hover:text-travertino transition-colors"
              >
                info@arteparquet.pro
              </a>
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
              {[
                'Dal 1996',
                'Campionature disponibili',
                'Garanzia scritta',
                'Bergamo e Lombardia',
              ].map((t) => (
                <span key={t} className="font-sans text-[12.5px] text-travertino/55 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CHALLENGES --- */}
        <section className="py-20 px-5" aria-labelledby="challenges-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="challenges-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-3"
            >
              Le sfide che conosciamo
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 mb-12 max-w-2xl leading-relaxed">
              Lavoriamo con i professionisti da decenni. Sappiamo cosa serve davvero in un
              cantiere.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {challenges.map((c) => (
                <div
                  key={c.title}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-3"
                >
                  <h3 className="font-sans text-[15px] font-bold text-travertino">{c.title}</h3>
                  <p className="font-sans text-[13.5px] text-travertino/55 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: ZONE --- */}
        <section className="py-16 px-5 bg-travertino" aria-labelledby="zone-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              id="zone-heading"
              className="font-serif text-[28px] md:text-[34px] font-bold text-legno-bruciato mb-4"
            >
              Dove operiamo
            </h2>
            <p className="font-sans text-[16px] text-legno-bruciato/65 max-w-2xl mx-auto leading-relaxed mb-10">
              Collaboriamo con studi professionali e imprese principalmente a Bergamo e Milano,
              con copertura su tutta la Lombardia. Per cantieri fuori regione, valutiamo caso per
              caso.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                'Bergamo', 'Milano', 'Brescia', 'Como', 'Monza e Brianza',
                'Lecco', 'Varese', 'Lodi', 'Cremona', 'Pavia',
              ].map((city) => (
                <span
                  key={city}
                  className="bg-legno-bruciato/10 border border-legno-bruciato/15 text-legno-bruciato font-sans text-[13px] font-semibold px-4 py-2 rounded-full"
                >
                  {city}
                </span>
              ))}
              <span className="bg-legno-bruciato/10 border border-legno-bruciato/15 text-legno-bruciato/60 font-sans text-[13px] font-semibold px-4 py-2 rounded-full">
                + altre province
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: PORTFOLIO --- */}
        <section className="py-20 px-5" aria-labelledby="portfolio-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="portfolio-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-12"
            >
              Lavori di alto livello
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolio.map((p) => (
                <div key={p.src} className="flex flex-col gap-3">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-[14px] font-bold text-travertino">{p.caption}</p>
                    <p className="font-sans text-[12.5px] text-travertino/45">{p.info}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="https://arteparquet.pro/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rovere font-sans text-[14px] font-semibold hover:underline underline-offset-4 transition-colors"
                aria-label="Vedi tutto il portfolio su arteparquet.pro"
              >
                Vedi tutto il portfolio
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: WHY TRUST --- */}
        <section className="py-20 px-5 bg-white/[0.03]" aria-labelledby="trust-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="trust-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-12"
            >
              Perché i professionisti scelgono noi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trustPoints.map((t) => (
                <div
                  key={t.title}
                  className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-4"
                >
                  {t.icon}
                  <div>
                    <h3 className="font-sans text-[16px] font-bold text-travertino mb-2">{t.title}</h3>
                    <p className="font-sans text-[14px] text-travertino/60 leading-relaxed">{t.desc}</p>
                    {t.title.includes('Google') && (
                      <a
                        href={MAPS_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-rovere font-sans text-[12.5px] font-semibold hover:underline"
                        aria-label="Verifica le recensioni su Google Maps"
                      >
                        Verifica su Google Maps
                        <ArrowRight size={12} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: SERVICES --- */}
        <section className="py-20 px-5" aria-labelledby="services-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="services-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-3"
            >
              Cosa offriamo ai professionisti
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 mb-12 max-w-2xl leading-relaxed">
              Dalla posa alla levigatura, dallo schema semplice all'intarsio su misura.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-3"
                >
                  <h3 className="font-sans text-[15px] font-bold text-travertino">{s.title}</h3>
                  <p className="font-sans text-[13.5px] text-travertino/55 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: PROCESS B2B --- */}
        <section className="py-20 px-5 bg-white/[0.03]" aria-labelledby="process-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="process-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-12"
            >
              Il nostro processo per i professionisti
            </h2>

            <ol className="flex flex-col gap-8" aria-label="Processo in 5 step">
              {[
                {
                  n: '01',
                  title: 'Briefing tecnico',
                  desc: 'Raccontaci il cantiere: tipologia, metratura, schema desiderato, tempistiche. Più informazioni ci date, più preciso sarà il preventivo.',
                },
                {
                  n: '02',
                  title: 'Campionatura',
                  desc: 'Forniamo campioni delle essenze e finiture per le presentazioni ai vostri clienti. Organizziamo la consegna dei campioni in tempi rapidi.',
                },
                {
                  n: '03',
                  title: 'Sopralluogo gratuito',
                  desc: 'Valutiamo il sottofondo, le condizioni del cantiere e pianifichiamo la posa. Il sopralluogo è sempre gratuito.',
                },
                {
                  n: '04',
                  title: 'Preventivo tecnico',
                  desc: 'Preventivo scritto dettagliato con materiali, tempi e condizioni. Tutto documentato prima di iniziare.',
                },
                {
                  n: '05',
                  title: 'Posa e garanzia',
                  desc: 'Intervento professionale con garanzia scritta sulla manodopera e pulizia del cantiere a fine lavori.',
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-5 items-start">
                  <span className="font-serif text-[32px] font-bold text-rovere/40 flex-shrink-0 leading-none w-10 text-right">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-sans text-[16px] font-bold text-travertino mb-1.5">{step.title}</h3>
                    <p className="font-sans text-[14px] text-travertino/60 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Honest disclaimer */}
            <div className="mt-10 flex items-start gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4">
              <Clock size={16} className="text-rovere flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-sans text-[13px] text-travertino/55 leading-relaxed">
                Rispondiamo in orario lavorativo (lun-ven 8:00-18:00, sab 9:00-13:00). Non
                promettiamo risposte istantanee - preferiamo darvi una risposta accurata.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: SCHEMI DI POSA --- */}
        <section className="py-20 px-5" aria-labelledby="schemi-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="schemi-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-3"
            >
              Schemi che realizziamo
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 mb-12 max-w-2xl leading-relaxed">
              Per ogni progetto lo schema giusto. Siamo a disposizione per consulenze
              tecniche.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemas.map((s) => (
                <div
                  key={s.name}
                  className="flex items-start gap-4 bg-white/[0.04] border border-white/[0.08] rounded-xl p-5"
                >
                  <CheckCircle size={18} className="text-rovere flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-sans text-[14px] font-bold text-travertino mb-1">{s.name}</p>
                    <p className="font-sans text-[12.5px] text-travertino/50 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 9: REVIEWS --- */}
        <section className="py-20 px-5 bg-white/[0.03]" aria-labelledby="reviews-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="reviews-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-3"
            >
              Cosa dicono di noi
            </h2>
            <p className="font-sans text-[14px] text-travertino/40 mb-10">
              Recensioni da clienti privati - i professionisti ci conoscono direttamente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {reviews.map((r) => (
                <blockquote
                  key={r.author}
                  className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-4"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5" aria-label="5 stelle su 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-sans text-[14px] text-travertino/75 leading-relaxed flex-1">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <footer className="font-sans text-[12.5px] font-bold text-travertino/50">
                    - {r.author}
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rovere font-sans text-[14px] font-semibold hover:underline underline-offset-4 transition-colors"
                aria-label="Leggi tutte le recensioni su Google Maps"
              >
                Leggi tutte le recensioni su Google
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 10: HUMAN IDENTITY --- */}
        <section className="py-20 px-5" aria-labelledby="identity-heading">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            <div className="relative w-full md:w-80 aspect-square rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src="/portfolio/google-levigatura-mosaico-01.jpg"
                alt="Levigatura professionale parquet - lavoro artigianale Arteparquet Bergamo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
            <div className="flex flex-col gap-5">
              <h2
                id="identity-heading"
                className="font-serif text-[28px] md:text-[34px] font-bold text-travertino"
              >
                Il partner, non solo il fornitore.
              </h2>
              <p className="font-sans text-[16px] text-travertino/70 leading-relaxed">
                Arteparquet è la ditta individuale di Arabi Mohamed, maestro parquettista con 28+
                anni di esperienza. La collaborazione con i professionisti richiede comunicazione,
                puntualità e qualità costante.
              </p>
              <p className="font-sans text-[15px] text-travertino/55 leading-relaxed">
                Ogni cantiere è gestito con attenzione al dettaglio e rispetto per il progetto del
                progettista. La nostra priorità è che il vostro cliente finale sia soddisfatto.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={EMAIL_HREF}
                  className="inline-flex items-center gap-2 border border-white/20 text-travertino font-sans text-[14px] font-semibold px-5 py-3 rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Scrivi a info@arteparquet.pro"
                >
                  <Mail size={15} aria-hidden="true" />
                  info@arteparquet.pro
                </a>
                <a
                  href={TEL_HREF}
                  className="inline-flex items-center gap-2 border border-white/20 text-travertino font-sans text-[14px] font-semibold px-5 py-3 rounded-lg hover:bg-white/5 transition-colors"
                  aria-label={`Chiama Arteparquet al ${TEL_DISPLAY}`}
                >
                  <Phone size={15} aria-hidden="true" />
                  {TEL_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 11: LOCAL AREA --- */}
        <section className="py-16 px-5 bg-white/[0.03]" aria-labelledby="area-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="area-heading"
              className="font-serif text-[28px] md:text-[32px] font-bold text-travertino mb-4"
            >
              La nostra area di intervento
            </h2>
            <p className="font-sans text-[15px] text-travertino/55 leading-relaxed max-w-2xl mb-6">
              <strong className="text-travertino/80">Sede operativa:</strong> Via Vittorio Alfieri 7, Bergamo.
              Raggiungiamo i cantieri in tutta la Lombardia. Per cantieri fuori regione, valutiamo
              caso per caso.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Bergamo e provincia', 'Milano e hinterland', 'Brescia',
                'Como', 'Monza e Brianza', 'Lecco', 'Varese', 'Lodi',
                'Cremona', 'Pavia', 'Mantova',
              ].map((z) => (
                <span
                  key={z}
                  className="bg-white/[0.06] border border-white/[0.1] text-travertino/70 font-sans text-[12.5px] font-medium px-3.5 py-1.5 rounded-full"
                >
                  {z}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 12: FAQ --- */}
        <section className="py-20 px-5" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <h2
              id="faq-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-12"
            >
              Domande frequenti
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-6 py-5"
                >
                  <h3 className="font-sans text-[15px] font-bold text-travertino mb-3">
                    {faq.q}
                  </h3>
                  <p className="font-sans text-[14px] text-travertino/60 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 13: RISK REDUCTION --- */}
        <section className="py-16 px-5 bg-travertino" aria-labelledby="garanzie-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="garanzie-heading"
              className="font-serif text-[26px] md:text-[32px] font-bold text-legno-bruciato mb-10 text-center"
            >
              Le nostre garanzie per i professionisti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  icon: <FileText size={26} className="text-legno-bruciato/60" />,
                  title: 'Preventivo tecnico scritto',
                  desc: 'Tutto documentato prima di iniziare. Nessuna sorpresa in corso d\'opera.',
                },
                {
                  icon: <Shield size={26} className="text-legno-bruciato/60" />,
                  title: 'Garanzia scritta sulla manodopera',
                  desc: 'Copertura su ogni intervento. Documentazione disponibile su richiesta.',
                },
                {
                  icon: <CheckCircle size={26} className="text-legno-bruciato/60" />,
                  title: 'Comunicazione professionale',
                  desc: 'Aggiornamenti regolari durante i lavori. Rispondiamo sempre in orario lavorativo.',
                },
              ].map((g) => (
                <div
                  key={g.title}
                  className="bg-white/60 border border-legno-bruciato/10 rounded-2xl p-6 flex flex-col gap-4"
                >
                  {g.icon}
                  <div>
                    <p className="font-sans text-[14px] font-bold text-legno-bruciato mb-1.5">{g.title}</p>
                    <p className="font-sans text-[13px] text-legno-bruciato/60 leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 14: FORM --- */}
        <section id="form" className="py-20 px-5 bg-nero-marquina" aria-labelledby="form-heading">
          <div className="max-w-3xl mx-auto">
            <h2
              id="form-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-3 text-center"
            >
              Richiedi una campionatura o un preventivo tecnico
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 text-center mb-10 leading-relaxed">
              Raccontaci il cantiere. Rispondiamo in orario lavorativo con una prima valutazione.
            </p>
            <LpPhotoForm variant="b2b" />
          </div>
        </section>

        {/* ── SECTION 15: FINAL CONTACTS --- */}
        <section className="py-20 px-5 bg-white/[0.03]" aria-labelledby="contacts-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              id="contacts-heading"
              className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-4"
            >
              Contatti diretti
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 mb-12 max-w-xl mx-auto leading-relaxed">
              Per i professionisti, l'email è spesso il canale preferito. Siamo anche su WhatsApp
              e telefono.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Email - highlighted for B2B */}
              <a
                href={EMAIL_HREF}
                className="group flex flex-col items-center gap-4 bg-rovere/10 border-2 border-rovere/30 hover:border-rovere rounded-2xl p-7 transition-all duration-200 hover:bg-rovere/15"
                aria-label="Scrivi a info@arteparquet.pro"
              >
                <Mail size={28} className="text-rovere" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[15px] font-bold text-travertino group-hover:text-rovere transition-colors">
                    Email
                  </p>
                  <p className="font-sans text-[12.5px] text-travertino/50 mt-0.5">
                    info@arteparquet.pro
                  </p>
                  <p className="font-sans text-[11px] text-rovere/70 mt-1 font-medium">
                    Preferito dai professionisti
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 bg-white/[0.04] border border-white/[0.08] hover:border-[#25D366]/40 rounded-2xl p-7 transition-all duration-200 hover:bg-[#25D366]/5"
                aria-label="Scrivi su WhatsApp"
              >
                <MessageCircle size={28} className="text-[#25D366]" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[15px] font-bold text-travertino group-hover:text-[#25D366] transition-colors">
                    WhatsApp
                  </p>
                  <p className="font-sans text-[12.5px] text-travertino/50 mt-0.5">
                    {TEL_DISPLAY}
                  </p>
                </div>
              </a>

              {/* Telefono */}
              <a
                href={TEL_HREF}
                className="group flex flex-col items-center gap-4 bg-white/[0.04] border border-white/[0.08] hover:border-travertino/30 rounded-2xl p-7 transition-all duration-200 hover:bg-white/[0.06]"
                aria-label={`Chiama Arteparquet al ${TEL_DISPLAY}`}
              >
                <Phone size={28} className="text-travertino/70" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[15px] font-bold text-travertino">
                    Telefono
                  </p>
                  <p className="font-sans text-[12.5px] text-travertino/50 mt-0.5">
                    {TEL_DISPLAY}
                  </p>
                </div>
              </a>
            </div>

            {/* Honest hours */}
            <p className="font-sans text-[13px] text-travertino/35 mt-8 flex items-center justify-center gap-2">
              <Clock size={14} aria-hidden="true" />
              Risposta in orario lavorativo | lun-ven 8:00-18:00 | sab 9:00-13:00
            </p>
          </div>
        </section>
      </main>

      <LpFooter />
    </>
  )
}
