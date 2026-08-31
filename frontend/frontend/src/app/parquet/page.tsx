import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Guida Parquet: Scelta, Posa, Manutenzione',
  description:
    'Come scegliere il parquet: massello o prefinito, essenze, finiture, posa e manutenzione. Consigli da 30 anni di esperienza.',
  alternates: { canonical: 'https://arteparquet.pro/parquet' },
}

const FAQ_ITEMS = [
  {
    q: 'Meglio parquet massello o prefinito?',
    a: 'Il massello è legno pieno al 100%, levigabile più volte e dura tutta la vita. Il prefinito ha uno strato nobile di legno vero su supporto multistrato: più stabile, installazione rapida, costo inferiore. Per ambienti di pregio e longevità scegli massello; per praticità e budget contenuto scegli prefinito.',
  },
  {
    q: 'Quale essenza di legno scegliere?',
    a: 'Il rovere è il più versatile: duro, stabile, adatto a tutti gli ambienti. Il noce è più scuro e pregiato. Il frassino ha venature chiare ed eleganti. Per riscaldamento a pavimento preferisci essenze stabili come rovere o teak.',
  },
  {
    q: 'Il parquet va bene per il riscaldamento a pavimento?',
    a: 'Sì, con accorgimenti: essenze stabili (rovere, teak), spessore massimo 15mm, temperatura superficiale max 27°C. Il prefinito è generalmente più adatto del massello per la maggiore stabilità dimensionale.',
  },
  {
    q: 'Posso mettere parquet in bagno o cucina?',
    a: 'Il parquet vero in bagno richiede manutenzione attenta e finiture specifiche (olio-cera). Per ambienti umidi consigliamo SPC o PVC impermeabile che replica l\'aspetto del legno senza i rischi.',
  },
  {
    q: 'Ogni quanto si leviga il parquet?',
    a: 'Dipende dall\'usura: in media ogni 10-15 anni per ambienti residenziali. Un massello si leviga 4-6 volte nella sua vita. Il prefinito con strato nobile da 4mm si leviga 1-2 volte.',
  },
]

const SERVICES_GRID = [
  {
    title: 'Parquet Massello',
    href: '/servizi/parquet-massello',
    desc: 'Legno pieno al 100%, dura tutta la vita',
    badge: 'Il più pregiato',
  },
  {
    title: 'Parquet Prefinito',
    href: '/servizi/parquet-prefinito',
    desc: 'Installazione rapida, ottima stabilità',
    badge: 'Best seller',
  },
  {
    title: 'Levigatura',
    href: '/levigatura-parquet',
    desc: 'Ripristino senza polvere',
    badge: null,
  },
  {
    title: 'Restauro',
    href: '/restauro-parquet',
    desc: 'Recupero parquet antichi',
    badge: null,
  },
  {
    title: 'SPC Impermeabile',
    href: '/pavimenti-spc',
    desc: 'Per bagni e cucine',
    badge: 'Novità',
  },
  {
    title: 'Riparazioni',
    href: '/servizi/riparazioni',
    desc: 'Scricchiolii, danni, rigonfiamenti',
    badge: null,
  },
]

const GUIDES = [
  { title: 'Massello vs Prefinito', href: '/guida/parquet-massello-vs-prefinito' },
  { title: 'Parquet e Riscaldamento', href: '/guida/parquet-riscaldamento-pavimento' },
  { title: 'Parquet in Bagno?', href: '/guida/parquet-bagno-cucina' },
  { title: 'Manutenzione Parquet', href: '/guida/manutenzione-parquet' },
  { title: 'Quanto Costa Levigare', href: '/guida/quanto-costa-levigatura' },
  { title: 'Spina Italiana vs Francese', href: '/guida/spina-italiana-vs-francese' },
]

export default function ParquetPillarPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Parquet', url: 'https://arteparquet.pro/parquet' },
        ]}
      />
      <ServiceFaqSchema items={FAQ_ITEMS} />

      {/* Hero Hub */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn>
            <p className="text-rovere font-medium mb-4 text-sm uppercase tracking-wider">
              Hub Pillar — Tutto sul Parquet
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl">
              Parquet: Guida<br />
              <span className="text-rovere">Completa</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mb-8 leading-relaxed">
              Tutto quello che devi sapere sul parquet: come scegliere tra massello e prefinito, 
              le migliori essenze, finiture, posa e manutenzione. 30 anni di esperienza condensati 
              in una guida pratica e completa.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/preventivo"
                className="inline-flex items-center justify-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Richiedi Preventivo Gratuito
              </Link>
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-rovere hover:text-rovere text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                <Phone size={20} />
                389 240 7827
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4">
              I Nostri Servizi
            </h2>
            <p className="text-center text-legno-bruciato/70 max-w-2xl mx-auto mb-16">
              Dalla posa alla manutenzione, copriamo ogni esigenza del tuo pavimento in legno.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_GRID.map((service, i) => (
              <FadeIn key={service.href} delay={i * 0.05}>
                <Link
                  href={service.href}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold group-hover:text-rovere transition-colors">
                      {service.title}
                    </h3>
                    {service.badge && (
                      <span className="text-xs bg-rovere/10 text-rovere px-2 py-1 rounded-full font-medium">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-legno-bruciato/70 flex-1">{service.desc}</p>
                  <div className="mt-4 text-rovere font-medium inline-flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                    Scopri di più <ArrowRight size={16} />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base Links */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4">
              Guide e Approfondimenti
            </h2>
            <p className="text-center text-legno-bruciato/70 max-w-2xl mx-auto mb-12">
              Risposte esperte alle domande più comuni sul parquet.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {GUIDES.map((guide, i) => (
              <FadeIn key={guide.href} delay={i * 0.03}>
                <Link
                  href={guide.href}
                  className="flex items-center gap-3 bg-travertino p-4 rounded-xl hover:bg-rovere/10 transition-colors group"
                >
                  <CheckCircle className="text-rovere shrink-0" size={20} />
                  <span className="font-medium group-hover:text-rovere transition-colors">{guide.title}</span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-12">
              Domande Frequenti sul Parquet
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <details className="group bg-white rounded-xl shadow-sm">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg">
                    {faq.q}
                    <span className="text-rovere text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-legno-bruciato/80 leading-relaxed">{faq.a}</div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-nero-marquina text-white text-center">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Pronto a scegliere il tuo parquet?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Sopralluogo gratuito a Bergamo e in tutta la Lombardia. Ti aiutiamo a scegliere 
              la soluzione perfetta per la tua casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/preventivo"
                className="inline-flex items-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-8 py-4 rounded-xl"
              >
                Richiedi Preventivo
              </Link>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20informazioni%20sul%20parquet."
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Zone Links */}
      <section className="py-16 bg-travertino border-t border-legno-bruciato/10">
        <div className="container-wide">
          <h3 className="font-serif text-2xl font-bold mb-6 text-center">Operiamo in tutta la Lombardia</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Bergamo', 'Milano', 'Brescia', 'Como', 'Monza', 'Varese', 'Lecco', 'Lodi', 'Pavia', 'Cremona', 'Mantova'].map((city) => (
              <Link
                key={city}
                href={`/zone/parquet-${city.toLowerCase()}`}
                className="px-4 py-2 bg-white rounded-full text-sm hover:bg-rovere hover:text-white transition-colors"
              >
                Parquet {city}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
