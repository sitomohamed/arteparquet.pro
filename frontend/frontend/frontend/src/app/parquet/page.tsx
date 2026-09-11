import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { CtaSection } from '@/components/sections/cta-section'
import { BreadcrumbSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Parquet: Guida Completa alla Scelta, Posa e Manutenzione | Arteparquet',
  description:
    'Guida completa al parquet: come scegliere il tipo giusto, costi, manutenzione, differenze tra massello e prefinito, SPC e PVC. Scritto da esperti con 30 anni di esperienza.',
  alternates: {
    canonical: 'https://arteparquet.pro/parquet',
  },
  openGraph: {
    title: 'Parquet: Guida Completa alla Scelta, Posa e Manutenzione | Arteparquet',
    description:
      'Guida completa al parquet: come scegliere il tipo giusto, manutenzione, massello vs prefinito, SPC e PVC. 30 anni di esperienza.',
    url: 'https://arteparquet.pro/parquet',
  },
}

const types = [
  {
    name: 'Parquet Massello',
    description: 'Il più nobile. Un unico pezzo di legno massiccio. Può essere levigato più volte nel corso della vita.',
    href: '/servizi/parquet-massello',
    badge: 'Alta durabilità',
  },
  {
    name: 'Parquet Prefinito',
    description: 'Multistrato con strato nobile in legno. Prefinito in fabbrica, posa più rapida e versatile.',
    href: '/servizi/parquet-prefinito',
    badge: 'Versatile',
  },
  {
    name: 'Pavimenti SPC',
    description: 'Nucleo rigido impermeabile. Effetto legno HD. Ideale per bagni, cucine e ambienti umidi.',
    href: '/pavimenti-spc',
    badge: 'Impermeabile',
  },
  {
    name: 'Pavimenti PVC',
    description: 'Morbido, silenzioso e confortevole. Ottima soluzione residenziale economica.',
    href: '/servizi/pvc',
    badge: 'Comfort',
  },
  {
    name: 'Laminato',
    description: 'Fotografia di legno su HDF. La soluzione più economica, non levigabile.',
    href: '/servizi/laminato',
    badge: 'Economico',
  },
  {
    name: 'Vinilico',
    description: 'Incollato o click. Ottima resistenza all\'usura per ambienti commerciali e alto traffico.',
    href: '/servizi/vinilico',
    badge: 'Commerciale',
  },
]

const guides = [
  {
    title: 'Quanto Costa la Levigatura Parquet?',
    href: '/guida/costo-levigatura-parquet',
    category: 'Manutenzione',
    description: 'Tutto quello che influenza il costo: superficie, finitura, stato del parquet.',
  },
  {
    title: 'Come Scegliere il Parquet Giusto',
    href: '/guida/come-scegliere-parquet',
    category: 'Guida all\'Acquisto',
    description: 'Massello, prefinito o SPC? La guida definitiva per fare la scelta giusta.',
  },
  {
    title: 'Parquet Massello vs Prefinito',
    href: '/guida/parquet-massello-vs-prefinito',
    category: 'Confronto',
    description: 'Differenze reali, pro e contro, quando scegliere l\'uno o l\'altro.',
  },
  {
    title: 'Parquet a Spina di Pesce',
    href: '/guida/parquet-spina-di-pesce',
    category: 'Schemi di Posa',
    description: 'Storia, varianti, costi e consigli per scegliere la spina giusta.',
  },
  {
    title: 'Manutenzione del Parquet',
    href: '/guida/manutenzione-parquet',
    category: 'Cura',
    description: 'Come pulire, proteggere e far durare il tuo parquet per decenni.',
  },
  {
    title: 'Parquet e Riscaldamento a Pavimento',
    href: '/guida/parquet-riscaldamento-pavimento',
    category: 'Installazione',
    description: 'Quale parquet va con il riscaldamento a pavimento? I dettagli tecnici.',
  },
]

const existingParquet = [
  {
    icon: '',
    title: 'Ha graffi o è opaco?',
    description: 'La levigatura professionale ripristina la superficie e restituisce colore e brillantezza.',
    cta: 'Scopri la levigatura',
    href: '/levigatura-parquet',
  },
  {
    icon: '',
    title: 'È storico o danneggiato?',
    description: 'Il restauro è la soluzione per parquet antichi, spina di pesce d\'epoca e pavimenti di pregio.',
    cta: 'Scopri il restauro',
    href: '/restauro-parquet',
  },
  {
    icon: '',
    title: 'Scricchiola o ha listelli rotti?',
    description: 'Interveniamo solo dove serve, senza levigare tutto. Rapido, economico ed efficace.',
    cta: 'Scopri le riparazioni',
    href: '/riparazione-parquet',
  },
]

export default function ParquetPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Parquet', url: 'https://arteparquet.pro/parquet' },
        ]}
      />

      {/* HERO */}
      <section className="bg-travertino pt-32 pb-16 md:pt-40 md:pb-20 border-b border-legno-bruciato/10">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-legno-bruciato">
              Parquet: Tutto Quello Che Devi Sapere<br />
              <span className="text-rovere">Prima di Scegliere</span>
            </h1>
            <p className="text-lg md:text-xl text-legno-bruciato/70 max-w-2xl mb-8 leading-relaxed">
              Una guida completa scritta da chi fa questo lavoro da trent&apos;anni.
              Tipi di parquet, come scegliere, posa, manutenzione, restauro e molto altro.
              Tutto in italiano, tutto senza giri di parole.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Massello', 'Prefinito', 'SPC', 'Spina di Pesce', 'Levigatura', 'Restauro', 'Manutenzione'].map((tag) => (
                <span key={tag} className="bg-white border border-legno-bruciato/20 text-legno-bruciato/80 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* I TIPI DI PARQUET */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              I Tipi di Parquet
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Non tutti i "parquet" sono uguali. Ecco le differenze principali che devi conoscere prima di scegliere.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {types.map((type) => (
              <FadeIn key={type.name}>
                <Link
                  href={type.href}
                  className="block bg-travertino rounded-2xl p-7 border border-legno-bruciato/10 hover:border-rovere hover:bg-wood-50 transition-colors group h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-legno-bruciato text-lg group-hover:text-rovere transition-colors">{type.name}</h3>
                    <span className="text-xs bg-rovere/10 text-rovere font-semibold px-2 py-1 rounded-full shrink-0 ml-2">{type.badge}</span>
                  </div>
                  <p className="text-legno-bruciato/70 text-sm leading-relaxed mb-4">{type.description}</p>
                  <div className="flex items-center gap-1 text-rovere text-sm font-medium">
                    Approfondisci <ArrowRight size={14} />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* POSA E INSTALLAZIONE */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Posa e Installazione
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Che tu stia posando un parquet nuovo o recuperando quello esistente, ecco i servizi disponibili.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Posa Parquet Professionale', href: '/servizi/posa', desc: 'Posa di massello, prefinito, SPC e PVC con tutti gli schemi disponibili.' },
              { label: 'Levigatura Parquet', href: '/levigatura-parquet', desc: 'Ripristino della superficie con macchine senza polvere.' },
              { label: 'Restauro Parquet', href: '/restauro-parquet', desc: 'Recupero di parquet storici e antichi con tecniche artigianali.' },
              { label: 'Riparazione Parquet', href: '/riparazione-parquet', desc: 'Interventi puntuali su scricchiolii, listelli rotti e bordi.' },
            ].map((item) => (
              <FadeIn key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 border border-legno-bruciato/10 hover:border-rovere transition-colors group"
                >
                  <CheckCircle size={20} className="text-rovere mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-legno-bruciato group-hover:text-rovere transition-colors mb-1">{item.label}</p>
                    <p className="text-legno-bruciato/60 text-sm">{item.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-legno-bruciato/30 group-hover:text-rovere mt-1 ml-auto shrink-0 transition-colors" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE APPROFONDITE */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Guide Approfondite
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Articoli scritti da chi conosce il parquet dall&apos;interno. Niente contenuti generici:
              solo informazioni utili per chi deve fare una scelta o affrontare un problema.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {guides.map((guide) => (
              <FadeIn key={guide.title}>
                <Link
                  href={guide.href}
                  className="block bg-travertino rounded-xl p-6 border border-legno-bruciato/10 hover:border-rovere hover:bg-wood-50 transition-colors group h-full"
                >
                  <span className="text-xs font-semibold text-rovere uppercase tracking-wide mb-3 block">{guide.category}</span>
                  <h3 className="font-bold text-legno-bruciato mb-2 group-hover:text-rovere transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-legno-bruciato/60 text-sm leading-relaxed mb-4">{guide.description}</p>
                  <div className="flex items-center gap-1 text-rovere text-sm font-medium">
                    Leggi la guida <ArrowRight size={14} />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HAI GIÀ IL PARQUET */}
      <section className="bg-nero-marquina text-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-travertino mb-4">
              Hai Già il Parquet?
            </h2>
            <p className="text-travertino/70 text-lg mb-12 max-w-2xl">
              Se il tuo pavimento in legno ha bisogno di attenzione, ecco l&apos;intervento giusto per te.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {existingParquet.map((item) => (
              <FadeIn key={item.title}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                  <h3 className="font-bold text-travertino text-lg mb-3">{item.title}</h3>
                  <p className="text-travertino/70 text-sm leading-relaxed mb-5">{item.description}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-rovere font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {item.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STIMA GRATIS */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Non Sai da Dove Iniziare?
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-10 leading-relaxed">
              Raccontaci il tuo progetto o il tuo problema. Veniamo da te per un sopralluogo gratuito
              e ti guidiamo verso la scelta giusta, senza pressioni e senza costi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/preventivo"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-8 py-4 rounded-lg hover:bg-wood-500 transition-colors"
              >
                Preventivo Gratuito
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Ho%20bisogno%20di%20informazioni%20sul%20parquet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-legno-bruciato/20 text-legno-bruciato font-semibold px-8 py-4 rounded-lg hover:border-rovere hover:text-rovere transition-colors"
              >
                <MessageCircle size={18} />
                Scrivici
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedLinks
        links={[
          { title: 'Levigatura Parquet', description: 'Ripristino del parquet con macchine senza polvere.', href: '/levigatura-parquet' },
          { title: 'Restauro Parquet', description: 'Recupero e restauro di parquet antichi e storici.', href: '/restauro-parquet' },
          { title: 'Per Architetti', description: 'Servizi dedicati a professionisti, architetti e designer.', href: '/per-architetti' },
          { title: 'Chi Siamo', description: 'La storia e i valori di Arteparquet dal 1996.', href: '/chi-siamo' },
        ]}
      />
    </>
  )
}
