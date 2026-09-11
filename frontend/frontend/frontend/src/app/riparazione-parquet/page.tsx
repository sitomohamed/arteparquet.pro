import type { Metadata } from 'next'
import { CheckCircle, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { CtaSection } from '@/components/sections/cta-section'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Riparazione Parquet Bergamo - Scricchiolii e Listelli Rotti | Arteparquet',
  description:
    'Riparazione parquet a Bergamo: scricchiolii, listelli rotti, bordi sollevati, rigonfiamenti. Interventi puntuali senza levigatura completa. Preventivo gratuito.',
  alternates: {
    canonical: 'https://arteparquet.pro/riparazione-parquet',
  },
  openGraph: {
    title: 'Riparazione Parquet Bergamo - Scricchiolii e Listelli Rotti | Arteparquet',
    description:
      'Riparazione parquet a Bergamo: scricchiolii, listelli rotti, bordi sollevati, rigonfiamenti. Interventi puntuali senza levigatura completa.',
    url: 'https://arteparquet.pro/riparazione-parquet',
  },
}

const faqItems = [
  {
    question: 'Lo scricchiolio del parquet è sempre risolvibile?',
    answer:
      'Nella maggior parte dei casi sì. Lo scricchiolio può essere causato da listelli che si sono mossi, da giunti troppo dilatati, o da un sottofondo non perfettamente piano. Con il sopralluogo identifichiamo la causa precisa e proponiamo la soluzione più efficace: iniezione di colla speciale nei giunti, inserimento di viti a testa svasata, o rilevigatura localizzata.',
  },
  {
    question: 'La riparazione si vede dopo il lavoro?',
    answer:
      'Dipendiamo dalla tipologia di intervento. La sostituzione di singoli listelli può essere praticamente invisibile dopo la levigatura e la finitura. Per riparazioni su parquet senza levigatura, utilizziamo stucchi cromatizzati che imitano fedelmente il colore del legno. Vi mostriamo un campione prima di procedere.',
  },
  {
    question: 'Gestite urgenze o interventi rapidi?',
    answer:
      'Sì. Per riparazioni urgenti (es. listello rotto in una zona di passaggio, bordo sollevato pericoloso) cerchiamo di organizzare il sopralluogo entro pochi giorni lavorativi. Contattaci per telefono o WhatsApp e valutiamo insieme la priorità dell\'intervento.',
  },
  {
    question: 'È conveniente riparare una piccola zona o conviene levigare tutto?',
    answer:
      'Dipende. Se il danno è localizzato (1-5 listelli, un bordo, un angolo) la riparazione puntuale è quasi sempre la scelta più intelligente: costa meno, è meno invasiva e non richiede di sgombrare tutto l\'appartamento. Se invece il parquet ha problemi diffusi (graffi su tutta la superficie, finitura consumata ovunque), la levigatura completa è più conveniente nel lungo termine.',
  },
]

const problems = [
  {
    title: 'Scricchiolii',
    icon: '',
    description: 'Rumori fastidiosi sotto il calpestio.',
    solution:
      'Iniettiamo colla poliuretanica nei giunti allentati tramite piccoli fori invisibili, oppure fissiamo i listelli con viti a testa svasata coperte da stucco cromatizzato. Il trattamento non richiede levigatura completa.',
  },
  {
    title: 'Listelli Rotti o Scheggiati',
    icon: '',
    description: 'Uno o più listelli spaccati, scheggiati o con angoli mancanti.',
    solution:
      'Sostituiamo i listelli con essenze il più possibile simili per venatura e colore. Dopo la sostituzione, levigiamo e finiamo solo la zona interessata, minimizzando l\'impatto visivo.',
  },
  {
    title: 'Bordi Sollevati',
    icon: '',
    description: 'Estremità dei listelli che si sollevano, creando inciampi.',
    solution:
      'Identifichiamo la causa (umidità, sottofondo irregolare, colla esaurita). Reprimiamo i bordi con colla professionale e pesi, o sostituiamo i listelli se irrecuperabili. Trattiamo il sottofondo se necessario.',
  },
  {
    title: 'Rigonfiamenti da Umidità',
    icon: '',
    description: 'Zone rigonfiate dovute a infiltrazioni o umidità di risalita.',
    solution:
      'Prima di qualsiasi intervento, risolviamo sempre la fonte di umidità. Una volta asciugato il sottofondo, valutiamo se i listelli rigonfiati possono tornare in piano o vanno sostituiti. I tempi dipendono dalla severità del danno.',
  },
  {
    title: 'Fessurazioni tra Listelli',
    icon: '〰',
    description: 'Crepe e giunti eccessivamente aperti tra un listello e l\'altro.',
    solution:
      'Fessurazioni lievi si trattano con stucco elastico cromatizzato. Per fessurazioni importanti (oltre 3 mm), valutiamo se è necessaria la levigatura e la rinstallazione di alcuni listelli. L\'umidità è spesso la causa principale.',
  },
  {
    title: 'Zone Instabili',
    icon: '',
    description: 'Aree che "cedono" sotto il peso, segnale di colla esaurita o vuoti.',
    solution:
      'Iniettiamo resina poliuretanica espandente tramite microfori nel parquet per riempire i vuoti tra listello e sottofondo. La tecnica è minimamente invasiva e i fori vengono stuccati e resi invisibili.',
  },
]

export default function RiparazioneParquetPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Riparazione Parquet', url: 'https://arteparquet.pro/riparazione-parquet' },
        ]}
      />
      <ServiceFaqSchema items={faqItems.map(f => ({ q: f.question, a: f.answer }))} />

      {/* HERO */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <span className="inline-block bg-rovere/20 border border-rovere/40 text-rovere text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Interventi Puntuali
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-travertino">
              Riparazione Parquet:<br />
              <span className="text-rovere">Interventi Puntuali Senza Stravolgere</span>
            </h1>
            <p className="text-lg md:text-xl text-travertino/80 max-w-2xl mb-10 leading-relaxed">
              Non sempre serve una levigatura completa. Quando il problema è localizzato  - 
              uno scricchiolio, un listello rotto, un bordo sollevato - interveniamo con
              precisione chirurgica sul punto esatto, senza sfollare la casa e senza spreco.
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
                href="https://wa.me/393892407827?text=Ciao!%20Ho%20un%20problema%20con%20il%20parquet%20e%20vorrei%20un%20preventivo%20per%20riparazione."
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

      {/* I PROBLEMI CHE RISOLVIAMO */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              I Problemi Che Risolviamo
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Ogni problema ha la sua soluzione specifica. Ecco i casi più frequenti e come li affrontiamo.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((prob) => (
              <FadeIn key={prob.title}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-legno-bruciato/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-legno-bruciato text-lg">{prob.title}</h3>
                      <p className="text-legno-bruciato/60 text-sm">{prob.description}</p>
                    </div>
                  </div>
                  <div className="border-t border-legno-bruciato/10 pt-4">
                    <p className="text-xs font-semibold text-rovere uppercase tracking-wide mb-2">Come interveniamo</p>
                    <p className="text-legno-bruciato/70 text-sm leading-relaxed">{prob.solution}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* RIPARAZIONE VS LEVIGATURA */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Quando Basta la Riparazione e Quando Serve la Levigatura
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              La risposta onesta che ci aspetti da un artigiano di fiducia: non ti consigliamo
              il lavoro più grande se non ne hai bisogno.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="bg-travertino rounded-2xl p-8 border-2 border-rovere/30 h-full">
                <h3 className="text-lg font-bold text-legno-bruciato mb-5 flex items-center gap-2">
                  <CheckCircle size={20} className="text-rovere" />
                  La Riparazione È Sufficiente Quando...
                </h3>
                <ul className="space-y-3">
                  {[
                    'Il danno è localizzato in 1-5 punti precisi',
                    'Il resto del parquet è in buone condizioni',
                    'La finitura è ancora integra e uniforme',
                    'Vuoi ridurre al minimo l\'invasività e i tempi',
                    'Il budget disponibile è limitato',
                    'Non vuoi sgomberare l\'appartamento',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-legno-bruciato/80 text-sm">
                      <CheckCircle size={14} className="text-rovere mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-travertino rounded-2xl p-8 border border-legno-bruciato/10 h-full">
                <h3 className="text-lg font-bold text-legno-bruciato mb-5 flex items-center gap-2">
                  <ArrowRight size={20} className="text-legno-bruciato/60" />
                  Meglio Pensare alla Levigatura Quando...
                </h3>
                <ul className="space-y-3">
                  {[
                    'Graffi e segni sono diffusi su tutta la superficie',
                    'La finitura è consumata in modo generalizzato',
                    'Il colore è ingiallito o non uniforme ovunque',
                    'Ci sono dislivelli estesi tra i listelli',
                    'Si fanno altri lavori in casa (ristrutturazione)',
                    'Il parquet non è stato trattato da molti anni',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-legno-bruciato/80 text-sm">
                      <ArrowRight size={14} className="text-legno-bruciato/40 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
          <FadeIn>
            <p className="mt-8 text-center text-legno-bruciato/60 italic">
              In dubbio? Il sopralluogo gratuito è fatto apposta per questo: vediamo insieme il parquet e ti diciamo la verità.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-12">
              Domande Frequenti sulla Riparazione
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {faqItems.map((faq) => (
              <FadeIn key={faq.question}>
                <div className="bg-white rounded-xl p-7 shadow-sm border border-legno-bruciato/10">
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
          { title: 'Restauro Parquet', description: 'Recupero e restauro di parquet antichi e storici.', href: '/restauro-parquet' },
          { title: 'I Nostri Servizi', description: 'Tutti i servizi di parquetteria offerti da Arteparquet.', href: '/servizi' },
          { title: 'Contattaci', description: 'Richiedi un sopralluogo gratuito e senza impegno.', href: '/contatti' },
        ]}
      />
    </>
  )
}
