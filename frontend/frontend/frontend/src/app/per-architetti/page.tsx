import type { Metadata } from 'next'
import { CheckCircle, Phone, MessageCircle, Star, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { CtaSection } from '@/components/sections/cta-section'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Parquet per Architetti e Designer | Arteparquet - Bergamo e Lombardia',
  description:
    'Collaboriamo con architetti, interior designer e imprese di costruzione. Schemi su misura, massello di qualità, campionature, sopralluogo e preventivi tecnici. Bergamo e Lombardia.',
  alternates: {
    canonical: 'https://arteparquet.pro/per-architetti',
  },
  openGraph: {
    title: 'Parquet per Architetti e Designer | Arteparquet - Bergamo e Lombardia',
    description:
      'Collaboriamo con architetti, interior designer e imprese di costruzione. Schemi su misura, massello di qualità, campionature, preventivi tecnici.',
    url: 'https://arteparquet.pro/per-architetti',
  },
}

const faqBtoB = [
  {
    question: 'Fornite campionature ai professionisti?',
    answer: 'Sì. Prepariamo campionature con le essenze e i formati indicati dal progetto. Le campionature sono disponibili per approvazione prima dell\'ordine definitivo.',
  },
  {
    question: 'I preventivi tecnici includono le specifiche dei materiali?',
    answer: 'I nostri preventivi B2B includono: denominazione commerciale del prodotto, scheda tecnica con caratteristiche fisiche, certificazioni (emissioni formaldeide, CE), metodo di posa, garanzia sulla lavorazione e sui materiali.',
  },
]

const features = [
  {
    title: 'Campionature Rapide',
    description: 'Prepariamo campioni con le essenze e i formati del progetto entro tempi concordati. Nessuna settimana di attesa: siamo organizzati per rispondere ai ritmi dei cantieri.',
  },
  {
    title: 'Preventivi Tecnici Dettagliati',
    description: 'Forniamo preventivi con schede tecniche dei materiali, metodi di posa, certificazioni e tempi di esecuzione. Tutta la documentazione che serve per la DL e per il committente.',
  },
  {
    title: 'Puntualità nella Consegna',
    description: 'Rispettiamo le date concordate. Siamo abituati a lavorare in cantieri con più ditte: coordiniamo la posa con gli altri artigiani e segnaliamo per tempo qualsiasi variazione.',
  },
  {
    title: 'Garanzia Scritta',
    description: 'Ogni lavoro è coperto da garanzia scritta sulla posa e sui materiali. Documentazione disponibile per il fascicolo del fabbricato e per i committenti.',
  },
  {
    title: 'Referenze su Richiesta',
    description: 'Abbiamo una lunga lista di professionisti con cui collaboriamo regolarmente. Su richiesta, forniamo referenze e portfolio di cantieri precedenti.',
  },
]

const schemas = [
  { name: 'Spina di Pesce (45° e 90°)', description: 'Classico e sempre attuale. Disponibile in rovere, noce e frassino. Schema a 45° per ambienti moderni, a 90° per interni classici.' },
  { name: 'Punto d\'Ungheria', description: 'La variante più raffinata della spina di pesce, con taglio a 45° di precisione millimetrica. Richiede esperienza tecnica elevata.' },
  { name: 'Parquet di Versailles', description: 'Schema nobile a pannelli geometrici. Realizziamo i pannelli su misura a seconda delle dimensioni della stanza.' },
  { name: 'Intarsi su Misura', description: 'Bordure, medaglioni, inserti in legni di contrasto. Ogni intarsio è realizzato artigianalmente su progetto.' },
  { name: 'Listone Classico', description: 'Posa a correre, a mattone o con offset variabile. Disponibile in tutte le larghezze e lunghezze.' },
  { name: 'Schemi Geometrici', description: 'Quadrato, rombo, chevron e combinazioni custom. Il massello si presta a ogni schema con il taglio corretto.' },
]

const materials = [
  {
    category: 'Massello',
    items: ['Rovere europeo (quercus robur)', 'Noce nazionale e americano', 'Frassino bianco', 'Ciliegio nazionale', 'Iroko e teak (su richiesta)'],
  },
  {
    category: 'Prefinito Multistrato',
    items: ['Rovere con strato nobile 4-6 mm', 'Disponibile in varie larghezze (fino a 260 mm)', 'Finiture: olio, vernice opaca, cera UV', 'Compatibile con riscaldamento a pavimento'],
  },
  {
    category: 'SPC / PVC / Vinilico',
    items: ['SPC click per ambienti umidi', 'PVC click residenziale e commerciale', 'Vinilico incollato per alto traffico', 'Ampia gamma di finiture legno HD'],
  },
]

const process = [
  { step: '01', title: 'Briefing Tecnico', desc: 'Raccogliamo le specifiche del progetto: schema di posa, essenza, formato, finitura, tolleranze.' },
  { step: '02', title: 'Campionatura', desc: 'Prepariamo i campioni fisici per l\'approvazione del progettista e del committente.' },
  { step: '03', title: 'Sopralluogo', desc: 'Verifichiamo il sottofondo, misuriamo e valutaimo le condizioni per la posa.' },
  { step: '04', title: 'Preventivo Tecnico', desc: 'Preventivo scritto con materiali, schede tecniche, tempi e garanzie.' },
  { step: '05', title: 'Posa Certificata', desc: 'Esecuzione in cantiere con supervisione costante. Rispettiamo il programma lavori.' },
  { step: '06', title: 'Garanzia', desc: 'Documentazione di garanzia e manuale di manutenzione consegnati al committente.' },
]

export default function PerArchitettiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Per Architetti e Designer', url: 'https://arteparquet.pro/per-architetti' },
        ]}
      />
      <ServiceFaqSchema items={faqBtoB.map(f => ({ q: f.question, a: f.answer }))} />

      {/* HERO */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <span className="inline-block bg-rovere/20 border border-rovere/40 text-rovere text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              B2B - Professionisti
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-travertino">
              Per Architetti e Designer:<br />
              <span className="text-rovere">Un Partner Affidabile per i Tuoi Cantieri</span>
            </h1>
            <p className="text-lg md:text-xl text-travertino/80 max-w-2xl mb-10 leading-relaxed">
              Collaboriamo con architetti, interior designer, geometri e imprese di costruzione
              in tutta la Lombardia. Campionature rapide, preventivi tecnici completi,
              posa certificata e garanzia scritta. La qualità artigianale che i tuoi clienti si aspettano.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-8 py-4 rounded-lg hover:bg-wood-500 transition-colors"
              >
                <Phone size={20} />
                Contatto Diretto
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Sono%20un%20architetto%20e%20vorrei%20collaborare%20per%20un%20cantiere%20parquet."
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

      {/* COSA OFFRIAMO AI PROFESSIONISTI */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Cosa Offriamo ai Professionisti
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Sappiamo che lavorate sotto pressione e con clienti esigenti. Siamo organizzati per supportarvi.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <FadeIn key={feature.title}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-legno-bruciato/10 h-full flex gap-4">
                  <CheckCircle size={22} className="text-rovere mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-legno-bruciato text-lg mb-2">{feature.title}</h3>
                    <p className="text-legno-bruciato/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEMI */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Schemi di Posa Che Realizziamo
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Dalla spina di pesce classica agli intarsi su misura. La nostra esperienza artigianale
              ci permette di realizzare qualsiasi schema con la precisione che il progetto richiede.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {schemas.map((schema) => (
              <FadeIn key={schema.name}>
                <div className="bg-travertino rounded-xl p-6 border border-legno-bruciato/10 h-full">
                  <h3 className="font-bold text-legno-bruciato mb-2">{schema.name}</h3>
                  <p className="text-legno-bruciato/70 text-sm leading-relaxed">{schema.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LA NOSTRA ESPERIENZA */}
      <section className="bg-nero-marquina text-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-travertino mb-12">
              La Nostra Esperienza
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="text-rovere" size={28} />
                  <span className="text-rovere font-bold text-lg">Teatro alla Scala - Milano, 2004</span>
                </div>
                <p className="text-travertino/70 leading-relaxed">
                  Nel 2004 Arteparquet ha partecipato ai lavori di restauro del Teatro alla Scala di Milano.
                  Un cantiere straordinario che ci ha richiesto la massima precisione tecnica:
                  restauro di palchetti storici su palcoscenico e corridoi, con materiali e tecniche
                  approvate dalla Soprintendenza. Un riferimento nel nostro percorso professionale
                  e una testimonianza concreta di cosa siamo in grado di fare.
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-rovere" size={28} />
                  <span className="text-rovere font-bold text-lg">Dal 1996 - Trent&apos;anni sul Campo</span>
                </div>
                <p className="text-travertino/70 leading-relaxed">
                  Fondata da Mohamed Arabi nel 1996, Arteparquet ha costruito nel tempo una reputazione
                  solida tra i professionisti del settore in tutta la Lombardia. Abbiamo collaborato
                  con studi di architettura, imprese di ristrutturazione, hotel e committenti privati
                  di alto profilo. La continuità nel tempo è la nostra garanzia più autentica.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROCESSO B2B */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Per un Cantiere Sereno
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Ogni collaborazione con un professionista segue un percorso strutturato, pensato per ridurre al minimo
              le sorprese e garantire il risultato atteso.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {process.map((p) => (
              <FadeIn key={p.step}>
                <div className="bg-white rounded-xl p-6 border border-legno-bruciato/10 h-full">
                  <span className="text-3xl font-extrabold text-rovere/20 block mb-3">{p.step}</span>
                  <h3 className="font-bold text-legno-bruciato mb-2">{p.title}</h3>
                  <p className="text-legno-bruciato/70 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALI */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Materiali Disponibili
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Lavoriamo con un ampio catalogo di essenze e prodotti per soddisfare ogni specifica di progetto.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {materials.map((mat) => (
              <FadeIn key={mat.category}>
                <div className="bg-travertino rounded-xl p-7 border border-legno-bruciato/10 h-full">
                  <h3 className="font-bold text-legno-bruciato text-lg mb-4 pb-3 border-b border-legno-bruciato/10">
                    {mat.category}
                  </h3>
                  <ul className="space-y-3">
                    {mat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-legno-bruciato/80 text-sm">
                        <ArrowRight size={14} className="text-rovere mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT B2B */}
      <section className="bg-nero-marquina text-travertino py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-travertino mb-4">
              Iniziamo a Collaborare
            </h2>
            <p className="text-travertino/70 text-lg mb-10 leading-relaxed">
              Contattaci per la tua prima richiesta. Siamo abituati a lavorare con i professionisti
              del settore e sappiamo cosa vi serve per andare avanti con il cantiere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-8 py-4 rounded-lg hover:bg-wood-500 transition-colors"
              >
                <Phone size={20} />
                +39 389 240 7827
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Sono%20un%20professionista%20e%20vorrei%20discutere%20di%20un%20progetto%20parquet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:border-rovere hover:text-rovere transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp Professionale
              </a>
            </div>
            <a
              href="mailto:info@arteparquet.pro"
              className="text-travertino/50 hover:text-rovere transition-colors text-sm"
            >
              info@arteparquet.pro
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedLinks
        links={[
          { title: 'I Nostri Servizi', description: 'Tutti i servizi di parquetteria offerti da Arteparquet.', href: '/servizi' },
          { title: 'Chi Siamo', description: 'La storia e i valori di Arteparquet dal 1996.', href: '/chi-siamo' },
          { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
          { title: 'Contattaci', description: 'Richiedi un sopralluogo gratuito e senza impegno.', href: '/contatti' },
        ]}
      />
    </>
  )
}
