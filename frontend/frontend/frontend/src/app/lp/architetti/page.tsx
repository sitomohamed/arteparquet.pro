import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import {
  Briefcase,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  Wrench,
  Grid3x3,
  Layers,
} from 'lucide-react'
import { LpHeader } from '@/components/layout/lp-header'
import { LpFooter } from '@/components/layout/lp-footer'
import { LpTracker } from '@/components/analytics/lp-tracker'
import { BUSINESS } from '@/lib/constants'

/* ---
   METADATA
--- */
export const metadata: Metadata = {
  title: 'Parquet per Architetti e Progettisti - Partner Tecnico Bergamo | Arteparquet',
  description:
    'Collaborazione B2B per studi di architettura, interior design e imprese. Pose complesse, transizioni, massetti, restauri. Bergamo e Lombardia dal 1996.',
  robots: { index: false, follow: false },
}

/* ---
   CONSTANTS
--- */
const TEL_HREF = `tel:${BUSINESS.phoneRaw}`
const TEL_DISPLAY = BUSINESS.phone
const EMAIL_HREF = `mailto:${BUSINESS.email}`
const MAPS_HREF = BUSINESS.googleReviewsUrl

/* ---
   DATA
--- */
const technicalSkills = [
  {
    icon: <Layers className="w-7 h-7 text-rovere" />,
    title: 'Massetti e preparazioni',
    desc: 'Autolivellanti, fibrorinforzati, verifica tempi di maturazione, primer epossidici. Valutiamo il sottofondo prima di posare.',
  },
  {
    icon: <Grid3x3 className="w-7 h-7 text-rovere" />,
    title: 'Transizioni e raccordi',
    desc: 'Soglie tra materiali diversi, giunti di dilatazione, compensazioni di livello. Ogni passaggio risolto tecnicamente.',
  },
  {
    icon: <Wrench className="w-7 h-7 text-rovere" />,
    title: 'Schemi complessi',
    desc: 'Spina di pesce, Versailles, intarsi geometrici. Posa su curve, scale, angoli irregolari. Esperienza su cantieri di pregio.',
  },
]

const portfolioTechnical = [
  {
    src: '/portfolio/intarsio-stella-01.jpg',
    alt: 'Intarsio a stella geometrico su parquet in rovere',
    caption: 'Intarsio geometrico su misura',
    tag: 'Lavorazione artigianale',
  },
  {
    src: '/portfolio/google-parquet-bordo-intarsio-01.jpg',
    alt: 'Parquet con bordo decorativo e fascia perimetrale',
    caption: 'Bordo e filetto decorativo',
    tag: 'Schema personalizzato',
  },
  {
    src: '/portfolio/google-spina-pesce-finitura-01.jpg',
    alt: 'Spina di pesce 45° in rovere verniciato opaco',
    caption: 'Spina di pesce 45° rovere',
    tag: 'Finitura opaca',
  },
  {
    src: '/portfolio/google-parquet-sala-archi-01.jpg',
    alt: 'Posa parquet in sala con aperture ad arco e transizioni',
    caption: 'Transizioni sotto archi',
    tag: 'Geometria complessa',
  },
  {
    src: '/portfolio/google-levigatura-mosaico-01.jpg',
    alt: 'Levigatura parquet mosaico storico restauro Bergamo',
    caption: 'Restauro parquet mosaico storico',
    tag: 'Levigatura conservativa',
  },
  {
    src: '/portfolio/google-parquet-levigato-verniciato-01.jpg',
    alt: 'Parquet levigato e riverniciato finitura satinata',
    caption: 'Levigatura e riverniciatura',
    tag: 'Recupero e protezione',
  },
]

const schemas = [
  { name: 'Listone a correre', desc: 'Schema classico longitudinale' },
  { name: 'Spina di pesce 45°', desc: 'Elegante, richiesto, massello o prefinito' },
  { name: 'Punto d\'Ungheria 90°', desc: 'Chevron simmetrico ad effetto visivo forte' },
  { name: 'Parquet a Versailles', desc: 'Quadri intrecciati, alta complessità' },
  { name: 'Intarsi geometrici', desc: 'Bordi, stelle, fasce su disegno progettista' },
  { name: 'Schemi su curve e scale', desc: 'Adattamento a geometrie irregolari' },
]

const trustPoints = [
  {
    icon: <Shield className="w-8 h-8 text-rovere" />,
    title: '28+ anni di esperienza',
    desc: 'Dal 1996. Cantieri residenziali, commerciali e di pregio in Lombardia.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-rovere" />,
    title: 'Teatro alla Scala, 2004',
    desc: 'Esperienza maturata in team coinvolti in progetti legati al Teatro alla Scala di Milano.',
  },
  {
    icon: <FileText className="w-8 h-8 text-rovere" />,
    title: 'Garanzia scritta',
    desc: 'Ogni intervento coperto da garanzia su manodopera. Documentazione su richiesta.',
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-rovere" />,
    title: '4,7/5 su Google',
    desc: 'Recensioni reali verificabili. La reputazione è il nostro portfolio.',
  },
]

const processSteps = [
  {
    n: '01',
    title: 'Briefing tecnico',
    desc: 'Tipologia cantiere, schema, metratura, tempistiche. Più dati = preventivo preciso.',
  },
  {
    n: '02',
    title: 'Sopralluogo gratuito',
    desc: 'Valutiamo sottofondo, condizioni cantiere, pianifichiamo posa. Sempre gratuito.',
  },
  {
    n: '03',
    title: 'Preventivo dettagliato',
    desc: 'Scritto, con materiali, tempi e condizioni. Tutto documentato prima di iniziare.',
  },
  {
    n: '04',
    title: 'Posa e coordinamento',
    desc: 'Intervento professionale coordinato con altre maestranze. Rispetto delle scadenze.',
  },
  {
    n: '05',
    title: 'Garanzia e documentazione',
    desc: 'Garanzia scritta su manodopera. Schede tecniche materiali su richiesta.',
  },
]

const faqs = [
  {
    q: 'Fate campionature per le presentazioni ai clienti?',
    a: 'Sì. Forniamo campioni di essenze e finiture. Contattateci per concordare quali materiali mostrare prima di decidere.',
  },
  {
    q: 'Lavorate con architetti e studi professionali?',
    a: 'Sì. Collaboriamo regolarmente con studi di architettura, interior designer e imprese. Forniamo preventivi tecnici e documentazione.',
  },
  {
    q: 'Gestite schemi complessi come Versailles o intarsi?',
    a: 'Sì. Realizziamo tutti gli schemi classici e moderni, compresi intarsi su misura e lavorazioni geometriche complesse.',
  },
  {
    q: 'Come gestite le transizioni tra materiali diversi?',
    a: 'Valutiamo ogni passaggio tecnicamente: soglie, giunti di dilatazione, compensazioni di livello. Ogni raccordo è progettato caso per caso.',
  },
  {
    q: 'Siete disponibili per sopralluogo prima del preventivo?',
    a: 'Sì, sempre. Il sopralluogo è gratuito. Consigliamo di farlo prima della firma con il cliente finale, così abbiamo tutti i dati tecnici.',
  },
  {
    q: 'Quale area coprite?',
    a: 'Bergamo e provincia come sede operativa. Milano, Brescia, Como, Monza. Tutta la Lombardia. Fuori regione valutiamo caso per caso.',
  },
]

/* ---
   PAGE
--- */
export default function LpArchitettiPage() {
  return (
    <>
      <LpHeader />

      <Suspense fallback={null}>
        <LpTracker variant="b2b" />
      </Suspense>

      <main className="bg-nero-marquina text-travertino">
        {/* ── HERO --- */}
        <section className="relative min-h-screen flex flex-col justify-center pt-16">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/portfolio/google-spina-pesce-finitura-01.jpg"
              alt="Parquet a spina di pesce rovere - posa professionale Arteparquet"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-nero-marquina/85" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-5 py-20 flex flex-col gap-7 items-start">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
              <Briefcase size={13} className="text-rovere flex-shrink-0" aria-hidden="true" />
              <span className="font-sans text-[12px] font-semibold text-travertino/80 tracking-wide uppercase">
                Architetti · Interior Design · Imprese · Geometri
              </span>
            </div>

            <h1
              className="font-serif font-bold text-travertino leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Parliamo del tuo<br />
              prossimo progetto.
            </h1>

            <p className="font-sans text-[17px] text-travertino/75 max-w-xl leading-relaxed">
              Partner tecnico per studi professionali e imprese. Pose complesse, transizioni,
              massetti, restauri. Bergamo e Lombardia — dal 1996.
            </p>

            {/* Direct contacts */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center gap-2 bg-rovere hover:bg-wood-500 text-white font-sans text-[15px] font-bold px-7 py-4 rounded-xl transition-colors duration-200 shadow-lg"
              >
                <Phone size={17} aria-hidden="true" />
                {TEL_DISPLAY}
              </a>
              <a
                href={EMAIL_HREF}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-white/50 text-travertino font-sans text-[15px] font-semibold px-7 py-4 rounded-xl transition-colors duration-200"
              >
                <Mail size={17} aria-hidden="true" />
                {BUSINESS.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
              {['Dal 1996', 'Garanzia scritta', 'Preventivi tecnici', 'Bergamo e Lombardia'].map(
                (t) => (
                  <span
                    key={t}
                    className="font-sans text-[12.5px] text-travertino/55 font-medium"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ── COMPETENZE TECNICHE --- */}
        <section className="py-20 px-5 bg-white/[0.03]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-3">
              Competenze tecniche
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 mb-12 max-w-2xl leading-relaxed">
              Non solo posa. Gestiamo ogni fase tecnica per cantieri complessi e progetti su misura.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {technicalSkills.map((skill) => (
                <div
                  key={skill.title}
                  className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-4"
                >
                  {skill.icon}
                  <div>
                    <h3 className="font-sans text-[16px] font-bold text-travertino mb-2">
                      {skill.title}
                    </h3>
                    <p className="font-sans text-[14px] text-travertino/60 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO TECNICO --- */}
        <section className="py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-3">
              Lavori realizzati
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 mb-12 max-w-2xl leading-relaxed">
              Intarsi, transizioni, restauri, schemi complessi. Portfolio reale di cantieri Bergamo e
              Lombardia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioTechnical.map((p) => (
                <div key={p.src} className="flex flex-col gap-3">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-[14px] font-bold text-travertino">{p.caption}</p>
                    <p className="font-sans text-[12.5px] text-rovere/70 font-medium">{p.tag}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="https://arteparquet.pro/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rovere font-sans text-[14px] font-semibold hover:underline underline-offset-4"
              >
                Vedi portfolio completo
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ── TRUST POINTS --- */}
        <section className="py-20 px-5 bg-white/[0.03]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-12">
              Perché collaborare con noi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trustPoints.map((t) => (
                <div
                  key={t.title}
                  className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-4"
                >
                  {t.icon}
                  <div>
                    <h3 className="font-sans text-[16px] font-bold text-travertino mb-2">
                      {t.title}
                    </h3>
                    <p className="font-sans text-[14px] text-travertino/60 leading-relaxed">
                      {t.desc}
                    </p>
                    {t.title.includes('Google') && (
                      <a
                        href={MAPS_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-rovere font-sans text-[12.5px] font-semibold hover:underline"
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

        {/* ── SCHEMI DI POSA --- */}
        <section className="py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-3">
              Schemi realizzati
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 mb-12 max-w-2xl leading-relaxed">
              Ogni schema posato con precisione. Consulenza tecnica disponibile.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemas.map((s) => (
                <div
                  key={s.name}
                  className="flex items-start gap-4 bg-white/[0.04] border border-white/[0.08] rounded-xl p-5"
                >
                  <CheckCircle
                    size={18}
                    className="text-rovere flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-sans text-[14px] font-bold text-travertino mb-1">{s.name}</p>
                    <p className="font-sans text-[12.5px] text-travertino/50 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESSO --- */}
        <section className="py-20 px-5 bg-white/[0.03]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-12">
              Il processo per i professionisti
            </h2>

            <ol className="flex flex-col gap-8">
              {processSteps.map((step) => (
                <li key={step.n} className="flex gap-5 items-start">
                  <span className="font-serif text-[32px] font-bold text-rovere/40 flex-shrink-0 leading-none w-10 text-right">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-sans text-[16px] font-bold text-travertino mb-1.5">
                      {step.title}
                    </h3>
                    <p className="font-sans text-[14px] text-travertino/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex items-start gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4">
              <Clock size={16} className="text-rovere flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-sans text-[13px] text-travertino/55 leading-relaxed">
                Rispondiamo in orario lavorativo (lun-ven 8:00-18:00, sab 9:00-13:00). Preferiamo
                una risposta accurata a una risposta immediata.
              </p>
            </div>
          </div>
        </section>

        {/* ── ZONE --- */}
        <section className="py-16 px-5 bg-travertino">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-[28px] md:text-[34px] font-bold text-legno-bruciato mb-4">
              Area di intervento
            </h2>
            <p className="font-sans text-[16px] text-legno-bruciato/65 max-w-2xl mx-auto leading-relaxed mb-10">
              Sede operativa a Bergamo. Collaboriamo con studi e imprese in tutta la Lombardia. Fuori
              regione valutiamo caso per caso.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                'Bergamo',
                'Milano',
                'Brescia',
                'Como',
                'Monza e Brianza',
                'Lecco',
                'Varese',
                'Lodi',
                'Cremona',
                'Pavia',
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

        {/* ── FAQ --- */}
        <section className="py-20 px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-12">
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

        {/* ── CONTATTI FINALI --- */}
        <section className="py-20 px-5 bg-white/[0.03]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-[28px] md:text-[36px] font-bold text-travertino mb-4">
              Contatti diretti
            </h2>
            <p className="font-sans text-[16px] text-travertino/55 mb-12 max-w-xl mx-auto leading-relaxed">
              Email preferita dai professionisti. Telefono per urgenze cantiere.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a
                href={EMAIL_HREF}
                className="group flex flex-col items-center gap-4 bg-rovere/10 border-2 border-rovere/30 hover:border-rovere rounded-2xl p-8 transition-all duration-200 hover:bg-rovere/15"
              >
                <Mail size={28} className="text-rovere" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[15px] font-bold text-travertino group-hover:text-rovere transition-colors">
                    Email
                  </p>
                  <p className="font-sans text-[13px] text-travertino/50 mt-0.5">
                    {BUSINESS.email}
                  </p>
                  <p className="font-sans text-[11px] text-rovere/70 mt-1 font-medium">
                    Preferita dai professionisti
                  </p>
                </div>
              </a>

              <a
                href={TEL_HREF}
                className="group flex flex-col items-center gap-4 bg-white/[0.04] border border-white/[0.08] hover:border-travertino/30 rounded-2xl p-8 transition-all duration-200 hover:bg-white/[0.06]"
              >
                <Phone size={28} className="text-travertino/70" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[15px] font-bold text-travertino">Telefono</p>
                  <p className="font-sans text-[13px] text-travertino/50 mt-0.5">{TEL_DISPLAY}</p>
                </div>
              </a>
            </div>

            <p className="font-sans text-[13px] text-travertino/35 mt-8 flex items-center justify-center gap-2">
              <Clock size={14} aria-hidden="true" />
              lun-ven 8:00-18:00 | sab 9:00-13:00
            </p>
          </div>
        </section>
      </main>

      {/* ── STICKY CONTACT BAR (mobile) --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-nero-marquina/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 z-50 sm:hidden">
        <div className="flex gap-3">
          <a
            href={TEL_HREF}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-rovere text-white font-sans text-[14px] font-bold px-4 py-3 rounded-lg"
          >
            <Phone size={16} aria-hidden="true" />
            Chiama
          </a>
          <a
            href={EMAIL_HREF}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-white/25 text-travertino font-sans text-[14px] font-semibold px-4 py-3 rounded-lg"
          >
            <Mail size={16} aria-hidden="true" />
            Email
          </a>
        </div>
      </div>

      <LpFooter />
    </>
  )
}
