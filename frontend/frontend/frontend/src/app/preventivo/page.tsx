import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, MessageCircle, Star, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Preventivo Parquet Gratuito Bergamo e Lombardia | Arteparquet',
  description:
    'Richiedi il tuo preventivo parquet gratuito a Bergamo, Milano e in Lombardia. Sopralluogo senza impegno, risposta entro 24 ore. Posa, restauro e levigatura.',
  alternates: {
    canonical: 'https://arteparquet.pro/preventivo',
  },
  openGraph: {
    title: 'Preventivo Parquet Gratuito Bergamo e Lombardia | Arteparquet',
    description:
      'Richiedi il tuo preventivo parquet gratuito a Bergamo, Milano e in Lombardia. Sopralluogo senza impegno. Posa, restauro e levigatura.',
    url: 'https://arteparquet.pro/preventivo',
  },
}

const faqItems = [
  {
    question: 'Il preventivo è davvero gratuito?',
    answer:
      'Assolutamente sì. Il sopralluogo e il preventivo scritto sono sempre gratuiti e senza nessun impegno da parte tua. Non esiste nessuna condizione o clausola nascosta: semplicemente veniamo a vedere il tuo parquet, lo valutiamo e ti mandiamo un preventivo scritto. Senza pressioni.',
  },
  {
    question: 'Quanto dura il sopralluogo?',
    answer:
      'In media 20-40 minuti. È il tempo necessario per misurare la superficie, valutare le condizioni del parquet e del sottofondo, capire le tue esigenze e rispondere a tutte le domande. Non è una visita lampo: vogliamo capire bene prima di proporre qualcosa.',
  },
  {
    question: 'Accettare il preventivo mi impegna a fare i lavori?',
    answer:
      'No. Il preventivo è un documento informativo. Sei liberissimo di confrontarlo con altri, prenderti il tempo che vuoi e decidere senza pressioni. Molti nostri clienti richiedono il preventivo mesi prima di fare i lavori, attendendo la ristrutturazione o il momento più conveniente.',
  },
  {
    question: 'Cosa devo preparare per il sopralluogo?',
    answer:
      'Niente di speciale. È sufficiente che la zona da valutare sia accessibile. Se hai documentazione sull\'appartamento (planimetria, anno di posa del parquet) è utile, ma non indispensabile. Veniamo attrezzati con gli strumenti per misurare spessori, umidità e planarità del sottofondo.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Ci Contatti',
    description: 'Chiamaci, scrivi su WhatsApp o compila il modulo sul sito. Ti rispondiamo entro poche ore per fissare il sopralluogo.',
    icon: Phone,
  },
  {
    num: '2',
    title: 'Sopralluogo Gratuito',
    description: 'Veniamo da te a valutare il parquet senza impegno. Misuriamo, analizziamo e ascoltiamo le tue esigenze.',
    icon: CheckCircle,
  },
  {
    num: '3',
    title: 'Preventivo Scritto',
    description: 'Ricevi un preventivo chiaro, dettagliato e firmato entro 24 ore dalla visita. Senza costi nascosti.',
    icon: Star,
  },
]

const included = [
  'Sopralluogo in loco senza impegno',
  'Analisi dello stato del sottofondo',
  'Stima precisa dei mq da trattare',
  'Valutazione del tipo di parquet e dello spessore',
  'Scelta del materiale o della finitura con campionario',
  'Stima dei tempi di lavoro e dei giorni necessari',
  'Preventivo scritto e firmato',
  'Garanzia scritta sulla lavorazione',
]

const trust = [
  { value: '1996', label: 'In attività dal', description: 'Trent\'anni di storia e migliaia di cantieri in Lombardia' },
  { value: '4.9', label: 'Valutazione Google', description: 'Centinaia di recensioni verificate da clienti reali' },
  { value: '100%', label: 'Garanzia scritta', description: 'Ogni lavoro è coperto da garanzia scritta sulla lavorazione' },
  { value: '0', label: 'Costi nascosti', description: 'Il preventivo include tutto: materiali, manodopera, finitura' },
]

export default function PreventivoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Preventivo Gratuito', url: 'https://arteparquet.pro/preventivo' },
        ]}
      />
      <ServiceFaqSchema items={faqItems.map(f => ({ q: f.question, a: f.answer }))} />

      {/* HERO */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <span className="inline-block bg-rovere/20 border border-rovere/40 text-rovere text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Gratuito e Senza Impegno
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-travertino">
              Preventivo Parquet Gratuito<br />
              <span className="text-rovere">Senza Impegno</span>
            </h1>
            <p className="text-lg md:text-xl text-travertino/80 max-w-2xl mb-6 leading-relaxed">
              Il sopralluogo è sempre incluso e sempre gratuito. Veniamo da te, valutiamo
              il parquet, ascoltiamo le tue esigenze e ti mandiamo un preventivo scritto chiaro,
              senza sorprese e senza pressioni.
            </p>
            <p className="text-travertino/60 text-base mb-10">
              Bergamo, Milano, Brescia, Como e tutta la Lombardia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-8 py-4 rounded-lg hover:bg-wood-500 transition-colors text-lg"
              >
                <Phone size={22} />
                +39 389 240 7827
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20richiedere%20un%20preventivo%20gratuito%20per%20il%20mio%20parquet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:border-rovere hover:text-rovere transition-colors text-lg"
              >
                <MessageCircle size={22} />
                WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Come Funziona
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Tre passi semplici per avere un preventivo preciso e affidabile.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <FadeIn key={step.num}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-legno-bruciato/10 h-full text-center">
                  <div className="w-14 h-14 rounded-full bg-rovere flex items-center justify-center text-white font-bold text-2xl mx-auto mb-5">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-legno-bruciato text-xl mb-3">{step.title}</h3>
                  <p className="text-legno-bruciato/70 leading-relaxed text-sm">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* COSA INCLUDE */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
                Cosa È Incluso nel Preventivo Gratuito
              </h2>
              <p className="text-legno-bruciato/70 text-lg mb-8 leading-relaxed">
                Non un preventivo generico inviato per email. Veniamo da te, guardiamo,
                misuriamo e ti diciamo esattamente cosa serve - e cosa no.
              </p>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-legno-bruciato/80">
                    <CheckCircle size={18} className="text-rovere mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn>
              <div className="bg-nero-marquina rounded-2xl p-8 text-travertino">
                <h3 className="font-bold text-xl mb-2">Hai fretta?</h3>
                <p className="text-travertino/70 mb-6 text-sm leading-relaxed">
                  Puoi mandarci alcune foto del parquet su WhatsApp per avere una prima valutazione
                  anche prima del sopralluogo. Ti risponderemo entro poche ore.
                </p>
                <a
                  href="https://wa.me/393892407827?text=Ciao!%20Vi%20mando%20alcune%20foto%20del%20mio%20parquet%20per%20una%20prima%20valutazione."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-rovere text-white font-semibold px-6 py-3 rounded-lg hover:bg-wood-500 transition-colors w-full justify-center"
                >
                  <MessageCircle size={18} />
                  Manda le Foto su WhatsApp
                </a>
                <p className="text-travertino/40 text-xs mt-4 text-center">Il sopralluogo rimane sempre necessario per il preventivo definitivo</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-12 text-center">
              Perché Fidarsi di Arteparquet
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trust.map((t) => (
              <FadeIn key={t.label}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-legno-bruciato/10 text-center h-full">
                  <div className="text-4xl font-extrabold text-rovere mb-2">{t.value}</div>
                  <div className="text-xs font-semibold text-legno-bruciato/50 uppercase tracking-wide mb-2">{t.label}</div>
                  <p className="text-legno-bruciato/70 text-sm leading-relaxed">{t.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4 text-center">
              Come Contattarci
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl mx-auto text-center">
              Scegli il canale che preferisci. Siamo disponibili e rispondiamo sempre.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn>
              <a
                href="tel:+393892407827"
                className="block bg-travertino rounded-2xl p-8 border-2 border-legno-bruciato/10 hover:border-rovere transition-colors group h-full"
              >
                <div className="w-12 h-12 rounded-full bg-rovere/10 flex items-center justify-center mb-5 group-hover:bg-rovere/20 transition-colors">
                  <Phone size={22} className="text-rovere" />
                </div>
                <h3 className="font-bold text-legno-bruciato text-lg mb-2">Telefono</h3>
                <p className="text-rovere font-semibold text-xl mb-3">+39 389 240 7827</p>
                <p className="text-legno-bruciato/60 text-sm">Risposta diretta. Ideale per urgenze o per chi preferisce parlare.</p>
                <div className="flex items-center gap-1 text-rovere text-sm font-medium mt-4">
                  Chiama ora <ArrowRight size={14} />
                </div>
              </a>
            </FadeIn>
            <FadeIn>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20richiedere%20un%20preventivo%20gratuito%20per%20il%20mio%20parquet."
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-travertino rounded-2xl p-8 border-2 border-legno-bruciato/10 hover:border-rovere transition-colors group h-full"
              >
                <div className="w-12 h-12 rounded-full bg-rovere/10 flex items-center justify-center mb-5 group-hover:bg-rovere/20 transition-colors">
                  <MessageCircle size={22} className="text-rovere" />
                </div>
                <h3 className="font-bold text-legno-bruciato text-lg mb-2">WhatsApp</h3>
                <p className="text-rovere font-semibold text-xl mb-3">Scrivi o manda foto</p>
                <p className="text-legno-bruciato/60 text-sm">Manda le foto del parquet per una prima valutazione. Risposta in giornata.</p>
                <div className="flex items-center gap-1 text-rovere text-sm font-medium mt-4">
                  Apri WhatsApp <ArrowRight size={14} />
                </div>
              </a>
            </FadeIn>
            <FadeIn>
              <Link
                href="/contatti"
                className="block bg-travertino rounded-2xl p-8 border-2 border-legno-bruciato/10 hover:border-rovere transition-colors group h-full"
              >
                <div className="w-12 h-12 rounded-full bg-rovere/10 flex items-center justify-center mb-5 group-hover:bg-rovere/20 transition-colors">
                  <Star size={22} className="text-rovere" />
                </div>
                <h3 className="font-bold text-legno-bruciato text-lg mb-2">Modulo Contatti</h3>
                <p className="text-rovere font-semibold text-xl mb-3">info@arteparquet.pro</p>
                <p className="text-legno-bruciato/60 text-sm">Compila il modulo sul sito. Ti ricontattiamo per fissare il sopralluogo.</p>
                <div className="flex items-center gap-1 text-rovere text-sm font-medium mt-4">
                  Vai ai contatti <ArrowRight size={14} />
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-12">
              Domande sul Preventivo
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

      {/* BIG CTA */}
      <section className="bg-nero-marquina text-travertino py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-travertino mb-4">
              Pronto per il Preventivo?
            </h2>
            <p className="text-travertino/70 text-lg mb-10">
              Chiamaci adesso o scrivici su WhatsApp. Il sopralluogo lo organizziamo noi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-10 py-5 rounded-lg hover:bg-wood-500 transition-colors text-lg"
              >
                <Phone size={22} />
                +39 389 240 7827
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20richiedere%20un%20preventivo%20gratuito."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-5 rounded-lg hover:border-rovere hover:text-rovere transition-colors text-lg"
              >
                <MessageCircle size={22} />
                WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedLinks
        links={[
          { title: 'Levigatura Parquet', description: 'Ripristino del parquet con macchine senza polvere.', href: '/levigatura-parquet' },
          { title: 'Restauro Parquet', description: 'Recupero e restauro di parquet antichi e storici.', href: '/restauro-parquet' },
          { title: 'I Nostri Servizi', description: 'Tutti i servizi di parquetteria offerti da Arteparquet.', href: '/servizi' },
          { title: 'Chi Siamo', description: 'La storia e i valori di Arteparquet dal 1996.', href: '/chi-siamo' },
        ]}
      />
    </>
  )
}
