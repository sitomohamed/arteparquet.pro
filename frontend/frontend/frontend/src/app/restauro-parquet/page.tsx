import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, MessageCircle, Star } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { CtaSection } from '@/components/sections/cta-section'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Restauro Parquet Antico Bergamo e Lombardia | Dal 1996 | Arteparquet',
  description:
    'Restauro parquet antico, storico e danneggiato a Bergamo e in Lombardia. Recupero listelli, verniciatura, stuccatura. 30 anni di esperienza. Preventivo gratuito.',
  alternates: {
    canonical: 'https://arteparquet.pro/restauro-parquet',
  },
  openGraph: {
    title: 'Restauro Parquet Antico Bergamo e Lombardia | Dal 1996 | Arteparquet',
    description:
      'Restauro parquet antico, storico e danneggiato a Bergamo e in Lombardia. Recupero listelli, verniciatura, stuccatura. 30 anni di esperienza.',
    url: 'https://arteparquet.pro/restauro-parquet',
  },
}

const faqItems = [
  {
    question: 'Un parquet degli anni \'60 è ancora recuperabile?',
    answer:
      'Nella stragrande maggioranza dei casi sì. I parquet posati dagli anni \'50 agli anni \'80 erano in massello di alta qualità, con spessori di 22-25 mm. Questo significa che si possono levigare più volte senza problemi. Il nostro sopralluogo gratuito valuta sempre lo spessore residuo e le condizioni strutturali prima di qualsiasi intervento.',
  },
  {
    question: 'Quanto dura il risultato di un restauro?',
    answer:
      'Con una corretta manutenzione, una finitura professionale dura 10-15 anni o più. La durabilità dipende dal tipo di finitura scelto (vernice, olio, cera), dall\'intensità del calpestio e dalla manutenzione ordinaria. Ti forniamo sempre indicazioni scritte su come prenderti cura del tuo pavimento.',
  },
  {
    question: 'La sostituzione di listelli si vede?',
    answer:
      'Con la sostituzione di listelli storici, il risultato finale dipende dalla disponibilità di essenza e dal colore del legno originale. Nella maggior parte dei casi, dopo la levigatura e l\'applicazione della finitura, le zone integrate sono praticamente invisibili. Lavoriamo con fornitori specializzati in legni di recupero e vecchi stock per garantire la massima compatibilità cromatica.',
  },
  {
    question: 'È possibile cambiare colore al parquet durante il restauro?',
    answer:
      'Sì, è possibile applicare mordenti e tinte per modificare il colore del parquet durante il restauro. Possiamo scurire, schiarire o dare tonalità diverse (grigio, bianco spazzolato, rovere scuro, naturale). Il colore viene testato su una piccola zona prima di procedere su tutta la superficie.',
  },
  {
    question: 'Rilasciate un certificato di restauro per immobili vincolati?',
    answer:
      'Sì. Per immobili storici vincolati dalla Soprintendenza rilasciamo documentazione scritta dei materiali utilizzati, delle tecniche applicate e del processo di restauro. È utile sia per le pratiche burocratiche sia per i successivi interventi di manutenzione.',
  },
]

const phases = [
  {
    num: '01',
    title: 'Diagnosi e Valutazione',
    description:
      'Misuriamo lo spessore residuo dei listelli, valutiamo l\'estensione dei danni, identifichiamo le zone da sostituire e scegliamo insieme la finitura più adatta al parquet e all\'ambiente.',
  },
  {
    num: '02',
    title: 'Sostituzione Listelli Irrecuperabili',
    description:
      'I listelli irrecuperabili vengono rimossi con cura e sostituiti con essenze compatibili, cercando il colore e le venature più vicine all\'originale. Usiamo fornitori specializzati in legni di recupero.',
  },
  {
    num: '03',
    title: 'Levigatura Delicata',
    description:
      'Usiamo carte abrasive di granulometria fine per non aggredire un legno già assottigliato dal tempo. Il sistema di aspirazione integrata riduce la polvere del 95% anche in ambienti storici sensibili.',
  },
  {
    num: '04',
    title: 'Stuccatura Cromatizzata',
    description:
      'Lo stucco viene miscelato con la polvere di levigatura per ottenere la stessa tonalità del parquet. Riempiamo giunti, fessure e cavità in modo che il risultato finale sia omogeneo.',
  },
  {
    num: '05',
    title: 'Finitura a Olio, Cera o Vernice UV',
    description:
      'Applichiamo la finitura in più mani, lucidando tra una mano e l\'altra. L\'olio naturale è ideale per parquet storici e dona un effetto caldo e vissuto. La vernice UV garantisce la massima durabilità.',
  },
]

const tipi = [
  'Massello anni \'50-\'90 in rovere, noce, pino e abete',
  'Spina di pesce classica (schema a 45° o 90°)',
  'A listoni tradizionali di largo formato',
  'Parquet industriale in doghe di faggio o frassino',
  'Parquet d\'autore con intarsi e bordi decorativi',
  'Palchetti per palcoscenici e sale da ballo storiche',
]

export default function RestauroParquetPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Restauro Parquet', url: 'https://arteparquet.pro/restauro-parquet' },
        ]}
      />
      <ServiceFaqSchema items={faqItems.map(f => ({ q: f.question, a: f.answer }))} />

      {/* HERO */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <span className="inline-block bg-rovere/20 border border-rovere/40 text-rovere text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Parquet Storico dal 1996
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-travertino">
              Restauro Parquet:<br />
              <span className="text-rovere">Nuova Vita al Tuo Pavimento Antico</span>
            </h1>
            <p className="text-lg md:text-xl text-travertino/80 max-w-2xl mb-10 leading-relaxed">
              Ogni parquet storico racconta una storia. Noi la rispettiamo e la preserviamo,
              restituendo al pavimento la sua bellezza originale con tecniche artigianali
              affinate in trent&apos;anni di lavoro sul territorio lombardo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-8 py-4 rounded-lg hover:bg-wood-500 transition-colors"
              >
                <Phone size={20} />
                Chiama Ora
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20un%20preventivo%20per%20restauro%20parquet%20antico."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:border-rovere hover:text-rovere transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* QUANDO RESTAURARE VS SOSTITUIRE */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Quando il Restauro È la Scelta Giusta
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Non sempre la sostituzione è la risposta. Spesso il restauro è più conveniente, più sostenibile e dà un risultato superiore.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Restaurare */}
            <FadeIn>
              <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-rovere/30 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-rovere flex items-center justify-center shrink-0">
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-legno-bruciato">Quando Restaurare</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Parquet massello con strato nobile ancora spesso (>8 mm)',
                    "Pavimento con storia e valore: anni '50-'80",
                    'Palazzo storico o vincolato dalla Soprintendenza',
                    'Spina di pesce o schemi pregiati difficili da replicare',
                    'Graffi, opacità e finitura compromessa',
                    'Listelli singoli rotti o danneggiati parzialmente',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-legno-bruciato/80 text-sm">
                      <CheckCircle size={14} className="text-rovere mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Valutazione */}
            <FadeIn>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-legno-bruciato/10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-legno-bruciato/10 flex items-center justify-center shrink-0">
                    <Star size={18} className="text-legno-bruciato" />
                  </div>
                  <h3 className="text-xl font-bold text-legno-bruciato">Quando Valutare la Sostituzione</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Parquet prefinito o laminato con strato nobile <2 mm',
                    'Danni strutturali al sottofondo (muffe, sollevamenti estesi)',
                    'Infestazioni biologiche non risolvibili in superficie',
                    'Listelli troppo sottili per levigatura (già levigati più volte)',
                    "Cliente desidera schema completamente diverso dall'originale",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-legno-bruciato/80 text-sm">
                      <ArrowRight size={14} className="text-legno-bruciato/40 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-legno-bruciato/60 italic">
                  In ogni caso, durante il sopralluogo gratuito ti diciamo onestamente quale strada percorrere.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Il Nostro Processo di Restauro
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Cinque fasi che trasformano un pavimento storico usurato in un capolavoro restaurato con rispetto e competenza.
            </p>
          </FadeIn>
          <div className="relative">
            <div className="hidden md:block absolute left-7 top-0 bottom-0 w-0.5 bg-rovere/20" />
            <div className="space-y-8">
              {phases.map((phase, idx) => (
                <FadeIn key={phase.num}>
                  <div className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-rovere flex items-center justify-center text-white font-bold text-lg relative z-10">
                      {idx + 1}
                    </div>
                    <div className="bg-travertino rounded-xl p-6 flex-1 border border-legno-bruciato/10">
                      <h3 className="font-bold text-legno-bruciato text-lg mb-2">{phase.title}</h3>
                      <p className="text-legno-bruciato/70 leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERCHÉ ARTEPARQUET */}
      <section className="bg-nero-marquina text-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-travertino mb-12">
              Perché Scegliere Arteparquet
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                <div className="text-4xl font-extrabold text-rovere mb-3">1996</div>
                <h3 className="font-bold text-travertino text-lg mb-3">Trent&apos;anni di Esperienza</h3>
                <p className="text-travertino/70 text-sm leading-relaxed">
                  Fondata da Mohamed Arabi nel 1996, Arteparquet ha restaurato centinaia di pavimenti storici
                  in tutta la Lombardia. L&apos;esperienza decennale si traduce in diagnosi accurate e soluzioni affidabili.
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                <div className="text-4xl font-extrabold text-rovere mb-3">2004</div>
                <h3 className="font-bold text-travertino text-lg mb-3">Teatro alla Scala</h3>
                <p className="text-travertino/70 text-sm leading-relaxed">
                  Nel 2004 abbiamo partecipato ai lavori di restauro del Teatro alla Scala di Milano.
                  Un intervento di altissimo profilo tecnico su parquet storici di pregio, testimonianza
                  del nostro livello di competenza nel restauro di pavimenti d&apos;autore.
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                <div className="text-4xl font-extrabold text-rovere mb-3">100%</div>
                <h3 className="font-bold text-travertino text-lg mb-3">Materiali Certificati</h3>
                <p className="text-travertino/70 text-sm leading-relaxed">
                  Utilizziamo solo oli, vernici, cere e stucchi di primarie aziende europee,
                  con schede tecniche e certificati ambientali disponibili. Per i cantieri vincolati
                  forniamo tutta la documentazione richiesta.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TIPI DI PARQUET */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Tipi di Parquet Che Restauriamo
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-10 max-w-2xl">
              Ogni tipo di parquet richiede approccio e attenzioni specifici. Ecco quelli che trattiamo con maggiore frequenza.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tipi.map((tipo) => (
              <FadeIn key={tipo}>
                <div className="bg-white rounded-xl p-5 border border-legno-bruciato/10 flex items-start gap-3">
                  <CheckCircle size={18} className="text-rovere mt-0.5 shrink-0" />
                  <p className="text-legno-bruciato/80 text-sm leading-relaxed">{tipo}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-12">
              Domande Frequenti sul Restauro
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {faqItems.map((faq) => (
              <FadeIn key={faq.question}>
                <div className="bg-travertino rounded-xl p-7 border border-legno-bruciato/10">
                  <h3 className="font-bold text-legno-bruciato text-lg mb-3">{faq.question}</h3>
                  <p className="text-legno-bruciato/70 leading-relaxed">{faq.answer}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />

      <RelatedLinks
        links={[
          { title: 'Levigatura Parquet', description: 'Ripristino del parquet con macchine senza polvere.', href: '/levigatura-parquet' },
          { title: 'Riparazione Parquet', description: 'Interventi puntuali su scricchiolii e listelli rotti.', href: '/riparazione-parquet' },
          { title: 'I Nostri Servizi', description: 'Tutti i servizi di parquetteria offerti da Arteparquet.', href: '/servizi' },
          { title: 'Contattaci', description: 'Richiedi un sopralluogo gratuito e senza impegno.', href: '/contatti' },
        ]}
      />
    </>
  )
}
