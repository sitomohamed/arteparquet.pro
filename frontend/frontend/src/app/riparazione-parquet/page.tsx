import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, AlertTriangle, Droplets, Volume2, Wrench } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { BreadcrumbSchema, ServiceSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Riparazione Parquet | Scricchiolii, Danni Acqua, Rigonfiamenti',
  description:
    'Riparazione parquet professionale a Bergamo e Lombardia. Risolviamo scricchiolii, danni da acqua, listelli gonfiati, graffi profondi. Intervento rapido.',
  alternates: { canonical: 'https://arteparquet.pro/riparazione-parquet' },
}

const FAQ_ITEMS = [
  {
    q: 'Il parquet scricchiola: è un problema grave?',
    a: 'Non sempre. Gli scricchiolii possono dipendere da assestamento normale, variazioni di umidità stagionali, o problemi di posa. Se sono localizzati e recenti, spesso si risolvono con interventi mirati. Se diffusi e persistenti, potrebbe servire una rilevigatura con stuccatura o, nei casi peggiori, il rifacimento parziale.',
  },
  {
    q: 'Il parquet si è gonfiato per una perdita d\'acqua. Si può salvare?',
    a: 'Dipende dalla gravità e dalla tempestività dell\'intervento. Se l\'acqua è stata rimossa entro 24-48 ore e il parquet è massello, spesso si recupera con asciugatura controllata e successiva levigatura. Se l\'acqua è rimasta a lungo o il parquet è prefinito economico, potrebbe servire la sostituzione delle zone danneggiate.',
  },
  {
    q: 'Quanto costa riparare il parquet danneggiato?',
    a: 'Il costo dipende dal tipo di danno e dall\'estensione. Una riparazione localizzata (pochi listelli) costa molto meno di una levigatura completa. Facciamo sempre un sopralluogo gratuito per valutare e darti un preventivo preciso senza sorprese.',
  },
  {
    q: 'Potete sostituire solo i listelli rovinati?',
    a: 'Sì, quando possibile sostituiamo solo i listelli danneggiati, integrandoli con legno della stessa essenza e finitura. Il risultato è praticamente invisibile. Se il parquet è molto vecchio, potremmo dover cercare legno di recupero compatibile.',
  },
  {
    q: 'Il parquet ha macchie nere che non vanno via. Cosa sono?',
    a: 'Le macchie nere sono solitamente causate da umidità prolungata che ha fatto reagire i tannini del legno. In alcuni casi si rimuovono con la levigatura, in altri (se penetrate in profondità) potrebbe essere necessaria la sostituzione del listello o un trattamento sbiancante.',
  },
]

const PROBLEMS = [
  {
    icon: Volume2,
    title: 'Scricchiolii',
    desc: 'Rumori fastidiosi quando cammini',
    solution: 'Iniezione di resina, stuccatura, fissaggio listelli',
  },
  {
    icon: Droplets,
    title: 'Danni da Acqua',
    desc: 'Gonfiori, sollevamenti, deformazioni',
    solution: 'Asciugatura, sostituzione listelli, levigatura',
  },
  {
    icon: AlertTriangle,
    title: 'Graffi Profondi',
    desc: 'Segni visibili e antiestetici',
    solution: 'Stuccatura colorata, levigatura locale o totale',
  },
  {
    icon: Wrench,
    title: 'Listelli Staccati',
    desc: 'Pezzi che si muovono o si sollevano',
    solution: 'Reincollaggio, sostituzione, rifacimento sottofondo',
  },
]

export default function RiparazionePillarPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Riparazione Parquet', url: 'https://arteparquet.pro/riparazione-parquet' },
        ]}
      />
      <ServiceSchema
        name="Riparazione Parquet"
        description="Riparazione professionale di parquet danneggiati. Scricchiolii, danni da acqua, graffi, listelli staccati. Intervento rapido a Bergamo e Lombardia."
        url="https://arteparquet.pro/riparazione-parquet"
      />
      <ServiceFaqSchema items={FAQ_ITEMS} />

      {/* Hero - BLUF */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn>
            <p className="text-rovere font-medium mb-4 text-sm uppercase tracking-wider">
              Pillar Guide — Pronto Intervento
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl">
              Riparazione Parquet<br />
              <span className="text-rovere">Danni e Difetti</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mb-8 leading-relaxed">
              Scricchiolii, danni da acqua, listelli gonfiati, graffi profondi: ogni problema ha una 
              soluzione. Interveniamo rapidamente a Bergamo e in tutta la Lombardia con diagnosi 
              precisa e riparazione mirata. Spesso si recupera senza rifare tutto il pavimento.
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
                href="https://wa.me/393892407827?text=Ciao!%20Ho%20un%20problema%20con%20il%20parquet.%20Vi%20mando%20le%20foto."
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

      {/* Problemi e Soluzioni */}
      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4">
              Problemi Comuni e Soluzioni
            </h2>
            <p className="text-center text-legno-bruciato/70 max-w-2xl mx-auto mb-16">
              Ogni danno ha una soluzione. Ecco i problemi più frequenti che risolviamo.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((problem, i) => (
              <FadeIn key={problem.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <problem.icon className="text-red-600" size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="text-legno-bruciato/60 text-sm mb-3">{problem.desc}</p>
                  <p className="text-sm">
                    <span className="text-rovere font-medium">Soluzione:</span>{' '}
                    <span className="text-legno-bruciato/80">{problem.solution}</span>
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Emergenza Acqua */}
      <section className="py-16 bg-blue-50 border-y border-blue-200">
        <div className="container-wide">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-blue-900">
                  Emergenza Acqua sul Parquet?
                </h2>
                <p className="text-blue-800/80 mb-4">
                  <strong>Agisci subito:</strong> Asciuga l'acqua visibile con panni assorbenti. 
                  Non usare phon o stufe (causano deformazioni). Arieggia l'ambiente e chiamaci 
                  immediatamente. Entro 24-48 ore le possibilità di recupero sono molto più alte.
                </p>
                <a
                  href="tel:+393892407827"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl"
                >
                  <Phone size={18} />
                  Pronto Intervento: 389 240 7827
                </a>
              </div>
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplets className="text-blue-600" size={48} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-12">
              Domande sulla Riparazione
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
              Problemi con il parquet?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Mandaci le foto del danno su WhatsApp. Ti diciamo subito se si può riparare 
              e come intervenire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Ho%20un%20problema%20con%20il%20parquet.%20Vi%20mando%20le%20foto."
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl"
              >
                <MessageCircle size={20} />
                Invia Foto su WhatsApp
              </a>
              <Link
                href="/preventivo"
                className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-nero-marquina font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Richiedi Preventivo
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 bg-travertino">
        <div className="container-wide">
          <h3 className="font-serif text-2xl font-bold mb-8 text-center">Servizi Correlati</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Levigatura Parquet', href: '/levigatura-parquet', desc: 'Ripristino completo' },
              { title: 'Restauro Parquet', href: '/restauro-parquet', desc: 'Recupero pavimenti antichi' },
              { title: 'Parquet Bergamo', href: '/zone/parquet-bergamo', desc: 'Interventi nella tua zona' },
              { title: 'Preventivo Gratuito', href: '/preventivo', desc: 'Richiedi una valutazione' },
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
