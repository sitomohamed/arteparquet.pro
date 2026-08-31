import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, MessageCircle, History, Shield, Hammer, Sparkles } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { BreadcrumbSchema, ServiceSchema, FaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Restauro Parquet Antico | Recupero Pavimenti Storici',
  description:
    'Restauro professionale di parquet antico e storico a Bergamo e Lombardia. Recupero listelli, stuccatura, verniciatura conservativa. 30 anni di esperienza.',
  alternates: { canonical: 'https://arteparquet.pro/restauro-parquet' },
}

const FAQ_ITEMS = [
  {
    q: 'Il mio parquet degli anni \'40 è recuperabile?',
    a: 'Nella stragrande maggioranza dei casi sì. Anche parquet molto danneggiati o ridotti di spessore possono essere recuperati con le tecniche giuste. Durante il sopralluogo valutiamo ogni listello e ti diciamo esattamente cosa si può salvare e cosa va sostituito.',
  },
  {
    q: 'Come capite se un listello va sostituito?',
    a: 'Valutiamo spessore residuo (minimo 8mm per levigare), attacchi di umidità, tarme del legno e fessurazioni strutturali. I listelli con danni superficiali si recuperano; quelli compromessi strutturalmente si sostituiscono con legno della stessa essenza ed epoca quando possibile.',
  },
  {
    q: 'Quanto costa restaurare un parquet antico?',
    a: 'Dipende dallo stato e dalla metratura. Un restauro conservativo costa più di una semplice levigatura perché richiede interventi manuali su singoli listelli. Il sopralluogo è gratuito e il preventivo dettagliato arriva entro 24 ore.',
  },
  {
    q: 'Potete riprodurre un listello mancante?',
    a: 'Sì. Abbiamo accesso a legname stagionato di recupero e possiamo fresare listelli su misura per integrazioni invisibili. Per parquet di pregio possiamo reperire essenze rare o d\'epoca.',
  },
]

const SERVICES_LIST = [
  { icon: History, title: 'Valutazione Conservativa', desc: 'Analisi dello stato e delle tecniche originali di posa' },
  { icon: Hammer, title: 'Sostituzione Listelli', desc: 'Integrazione con legno stagionato della stessa essenza' },
  { icon: Shield, title: 'Trattamento Antitarlo', desc: 'Disinfestazione e prevenzione con prodotti professionali' },
  { icon: Sparkles, title: 'Finitura Storica', desc: 'Olio, cera o gommalacca secondo l\'epoca del parquet' },
]

export default function RestauroPillarPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Restauro Parquet', url: 'https://arteparquet.pro/restauro-parquet' },
        ]}
      />
      <ServiceSchema
        name="Restauro Parquet Antico"
        description="Restauro conservativo di parquet storici e antichi. Recupero listelli, trattamento antitarlo, finiture d'epoca."
        url="https://arteparquet.pro/restauro-parquet"
      />
      <FaqSchema items={FAQ_ITEMS} />

      {/* Hero - BLUF */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn>
            <p className="text-rovere font-medium mb-4 text-sm uppercase tracking-wider">
              Pillar Guide — Restauro Conservativo
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl">
              Restauro Parquet<br />
              <span className="text-rovere">Antico e Storico</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mb-8 leading-relaxed">
              Il restauro conservativo riporta in vita parquet storici rispettandone l'anima e le 
              imperfezioni che li rendono unici. Recuperiamo pavimenti del Novecento, parquet di 
              palazzi d'epoca, listelli danneggiati da umidità, tarme o usura secolare.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                <Phone size={20} />
                Chiama: 389 240 7827
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Ho%20un%20parquet%20antico%20da%20restaurare.%20Vi%20mando%20le%20foto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-rovere hover:text-rovere text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                <MessageCircle size={20} />
                Foto su WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Servizi Restauro */}
      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-16">
              Cosa Include il Restauro
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_LIST.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                  <service.icon className="text-rovere mb-4" size={32} />
                  <h3 className="font-serif text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-legno-bruciato/70">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-12">
              Domande sul Restauro
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <details className="group bg-travertino rounded-xl">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold">
                    {faq.q}
                    <span className="text-rovere text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-legno-bruciato/80">{faq.a}</div>
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
              Hai un parquet antico da salvare?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Mandaci le foto su WhatsApp per una prima valutazione gratuita.
            </p>
            <a
              href="https://wa.me/393892407827?text=Ciao!%20Ho%20un%20parquet%20antico%20da%20valutare."
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl"
            >
              <MessageCircle size={20} />
              Invia Foto su WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 bg-travertino">
        <div className="container-wide">
          <h3 className="font-serif text-2xl font-bold mb-8 text-center">Servizi Correlati</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Levigatura Parquet', href: '/levigatura-parquet', desc: 'Ripristino e nuova finitura' },
              { title: 'Riparazione Parquet', href: '/servizi/riparazioni', desc: 'Scricchiolii e danni puntuali' },
              { title: 'Parquet Massello', href: '/servizi/parquet-massello', desc: 'Posa legno pieno' },
              { title: 'Preventivo Gratuito', href: '/preventivo', desc: 'Richiedi una stima' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="bg-white p-5 rounded-xl hover:shadow-md transition-shadow">
                <h4 className="font-semibold">{link.title}</h4>
                <p className="text-sm text-legno-bruciato/60 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
