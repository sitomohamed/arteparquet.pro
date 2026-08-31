import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { BreadcrumbSchema, ServiceFaqSchema, ArticleSchema } from '@/components/seo/json-ld'

// Knowledge Base Content - 23 Moduli
const GUIDES: Record<string, {
  title: string
  metaTitle: string
  metaDescription: string
  bluf: string
  content: { heading: string; text: string }[]
  faq: { q: string; a: string }[]
  relatedLinks: { title: string; href: string }[]
}> = {
  'parquet-massello-vs-prefinito': {
    title: 'Parquet Massello vs Prefinito: Quale Scegliere?',
    metaTitle: 'Massello vs Prefinito | Guida alla Scelta del Parquet',
    metaDescription: 'Confronto completo tra parquet massello e prefinito: durata, costi, manutenzione, pro e contro. Guida esperta per scegliere il pavimento giusto.',
    bluf: 'Il parquet massello è legno pieno al 100%, levigabile più volte, dura tutta la vita ma costa di più e richiede posa più lunga. Il prefinito ha uno strato nobile di legno vero su supporto multistrato: più stabile, installazione rapida, costo inferiore, ma levigabile solo 1-2 volte. Scegli massello per longevità e pregio, prefinito per praticità e budget.',
    content: [
      {
        heading: 'Cos\'è il Parquet Massello',
        text: 'Il parquet massello è un unico blocco di legno pieno, dall\'essenza al suolo. Spessore tipico da 10 a 22mm. Può essere levigato 4-6 volte nell\'arco di 50+ anni, rinnovando completamente la superficie. È il pavimento più pregiato e duraturo, ideale per chi vuole un investimento che duri generazioni.',
      },
      {
        heading: 'Cos\'è il Parquet Prefinito',
        text: 'Il prefinito ha uno strato nobile in legno vero (da 2 a 6mm) incollato su un supporto multistrato di legno o HDF. Arriva già verniciato o oliato dalla fabbrica. Si installa in poche ore con sistema click o incollato. Più stabile alle variazioni di temperatura e umidità rispetto al massello.',
      },
      {
        heading: 'Confronto Costi',
        text: 'Il massello costa mediamente il 30-50% in più del prefinito, considerando materiale e posa. Il prefinito richiede meno manodopera (1 giorno vs 2-3 giorni per 80mq) e non necessita di finitura in cantiere. Per budget limitati il prefinito offre comunque un vero pavimento in legno a prezzi accessibili.',
      },
      {
        heading: 'Manutenzione e Durata',
        text: 'Il massello, con manutenzione corretta, dura oltre 100 anni. Si leviga quando necessario (ogni 10-15 anni in media) tornando come nuovo. Il prefinito dura 20-40 anni; lo strato nobile sottile limita le levigature possibili. Entrambi richiedono pulizia regolare e protezione da acqua stagnante.',
      },
    ],
    faq: [
      { q: 'Il prefinito è meno pregiato del massello?', a: 'Non necessariamente. Esistono prefiniti di alta gamma con strato nobile da 5-6mm e finiture premium che competono con il massello in termini estetici. La differenza principale è nella levigabilità futura.' },
      { q: 'Quale va meglio con riscaldamento a pavimento?', a: 'Il prefinito è generalmente più adatto: la struttura multistrato lo rende più stabile alle variazioni termiche. Il massello funziona ma richiede essenze stabili (rovere) e spessori contenuti (max 15mm).' },
      { q: 'Posso levigare un prefinito?', a: 'Dipende dallo spessore dello strato nobile. Con 4-6mm puoi levigare 1-2 volte. Con 2-3mm è sconsigliato. Verifichiamo durante il sopralluogo.' },
    ],
    relatedLinks: [
      { title: 'Parquet Massello', href: '/servizi/parquet-massello' },
      { title: 'Parquet Prefinito', href: '/servizi/parquet-prefinito' },
      { title: 'Levigatura Parquet', href: '/levigatura-parquet' },
      { title: 'Richiedi Preventivo', href: '/preventivo' },
    ],
  },
  'quanto-costa-levigatura': {
    title: 'Quanto Costa Levigare il Parquet?',
    metaTitle: 'Costo Levigatura Parquet | Prezzi e Fattori',
    metaDescription: 'Quanto costa levigare il parquet? Scopri i fattori che influenzano il prezzo, cosa è incluso nel servizio e come richiedere un preventivo gratuito.',
    bluf: 'Il costo della levigatura parquet dipende da metratura, stato del pavimento, tipo di finitura e accessibilità degli ambienti. Non pubblichiamo listini perché ogni caso è diverso. Offriamo sopralluogo gratuito e preventivo dettagliato entro 24 ore, senza impegno. Il prezzo include levigatura, stuccatura e finitura.',
    content: [
      {
        heading: 'Fattori che Influenzano il Prezzo',
        text: 'La metratura è il fattore principale, ma non l\'unico. Incidono anche: stato del parquet (graffi leggeri vs danni profondi), tipo di finitura scelta (olio vs vernice), presenza di scale o zone difficili, necessità di spostare mobili pesanti, tempi di consegna richiesti.',
      },
      {
        heading: 'Cosa è Incluso nel Servizio',
        text: 'Il nostro preventivo include: levigatura completa con macchine professionali senza polvere, stuccatura delle fessure con pasta colorata, applicazione della finitura scelta (olio o vernice), pulizia finale dell\'ambiente. Nessun costo nascosto.',
      },
      {
        heading: 'Perché Non Pubblichiamo Listini',
        text: 'Ogni parquet è diverso. Un prezzo "al metro quadro" generico non tiene conto delle condizioni reali. Preferiamo vedere il pavimento, capire le tue esigenze e darti un prezzo preciso e onesto. Il sopralluogo è gratuito e senza impegno.',
      },
    ],
    faq: [
      { q: 'Come posso avere un\'idea del costo?', a: 'Mandaci le foto del parquet su WhatsApp con la metratura approssimativa. Ti diamo una prima stima indicativa in pochi minuti, poi confermiamo con sopralluogo gratuito.' },
      { q: 'Il preventivo è vincolante?', a: 'Il preventivo scritto è valido 30 giorni e il prezzo non cambia, salvo imprevisti non visibili prima dell\'inizio lavori (che comunque ti comunichiamo prima di procedere).' },
      { q: 'Quanto tempo serve per levigare 80mq?', a: 'Circa 2 giorni lavorativi: uno per levigatura, uno per finitura. Il pavimento è calpestabile dopo 12-24 ore.' },
    ],
    relatedLinks: [
      { title: 'Levigatura Parquet', href: '/levigatura-parquet' },
      { title: 'Costo Levigatura Bergamo', href: '/costo-levigatura-parquet' },
      { title: 'Richiedi Preventivo', href: '/preventivo' },
    ],
  },
  'parquet-riscaldamento-pavimento': {
    title: 'Parquet e Riscaldamento a Pavimento: Guida Completa',
    metaTitle: 'Parquet su Riscaldamento a Pavimento | Guida Tecnica',
    metaDescription: 'Si può mettere il parquet sul riscaldamento a pavimento? Guida tecnica: essenze adatte, spessori, temperature, accorgimenti per una posa perfetta.',
    bluf: 'Sì, il parquet è compatibile con il riscaldamento a pavimento seguendo alcune regole: essenze stabili come rovere o teak, spessore massimo 15mm, temperatura superficiale max 27°C, accensione graduale dell\'impianto. Il prefinito è generalmente preferibile al massello per la maggiore stabilità dimensionale.',
    content: [
      {
        heading: 'Essenze Adatte',
        text: 'Le essenze più stabili sono rovere, teak, iroko e doussiè. Evita legni nervosi come faggio o acero che tendono a muoversi con le variazioni termiche. Il rovere europeo è la scelta più sicura: stabile, duro e disponibile in molte finiture.',
      },
      {
        heading: 'Spessori Consigliati',
        text: 'Per riscaldamento a pavimento preferisci spessori contenuti: massello max 14-15mm, prefinito 10-14mm totali. Spessori maggiori creano una barriera termica che riduce l\'efficienza del riscaldamento e può causare stress al legno.',
      },
      {
        heading: 'Temperature e Accensione',
        text: 'La temperatura superficiale del pavimento non deve superare i 27°C. L\'impianto va acceso gradualmente: aumenta di 2-3°C al giorno fino a regime. Prima della posa il massetto deve funzionare per almeno 2 settimane e poi essere spento 48 ore prima dei lavori.',
      },
      {
        heading: 'Posa Incollata vs Flottante',
        text: 'Su riscaldamento a pavimento è preferibile la posa incollata con colle elastiche certificate. La posa flottante crea una camera d\'aria che riduce la trasmissione del calore. Alcuni prefiniti click sono comunque compatibili se di qualità.',
      },
    ],
    faq: [
      { q: 'Il parquet si rovina con il riscaldamento a pavimento?', a: 'No, se posato correttamente. I problemi nascono da temperature eccessive, essenze inadatte o posa errata. Con i giusti accorgimenti il parquet funziona perfettamente.' },
      { q: 'Meglio massello o prefinito su riscaldamento?', a: 'Il prefinito è generalmente preferibile: la struttura multistrato lo rende più stabile. Il massello funziona ma richiede più attenzione nella scelta dell\'essenza e dello spessore.' },
      { q: 'Quanto aspettare prima di accendere l\'impianto dopo la posa?', a: 'Almeno 7 giorni con posa incollata. Poi accendi gradualmente aumentando di 2-3°C al giorno.' },
    ],
    relatedLinks: [
      { title: 'Posa Parquet', href: '/servizi/posa' },
      { title: 'Parquet Massello', href: '/servizi/parquet-massello' },
      { title: 'Parquet Prefinito', href: '/servizi/parquet-prefinito' },
    ],
  },
  'manutenzione-parquet': {
    title: 'Manutenzione Parquet: Guida Pratica',
    metaTitle: 'Manutenzione Parquet | Pulizia e Cura del Legno',
    metaDescription: 'Come pulire e mantenere il parquet: prodotti giusti, errori da evitare, frequenza di manutenzione. Consigli pratici per far durare il tuo pavimento.',
    bluf: 'La manutenzione del parquet è semplice: aspirapolvere o panno umido (non bagnato), prodotti specifici per legno, niente acqua stagnante. Evita detergenti aggressivi, vapore e cere siliconiche su parquet verniciati. Per finiture a olio serve rioliatura periodica ogni 1-2 anni.',
    content: [
      {
        heading: 'Pulizia Quotidiana',
        text: 'Passa l\'aspirapolvere con spazzola morbida o un panno in microfibra asciutto per rimuovere polvere e detriti. I granelli di sabbia sono il nemico numero uno: graffiano la superficie ad ogni passo. Metti zerbini agli ingressi.',
      },
      {
        heading: 'Pulizia Periodica',
        text: 'Una volta a settimana usa un panno umido (strizzato bene, non gocciolante) con detergente neutro specifico per parquet. Mai acqua abbondante sul legno. Asciuga subito eventuali schizzi o versamenti.',
      },
      {
        heading: 'Cosa Evitare Assolutamente',
        text: 'No a: vapore (gonfia il legno), ammoniaca e candeggina (scoloriscono), cere siliconiche su vernice (creano patina scivolosa), panni bagnati, acqua stagnante. Questi errori danneggiano la finitura e il legno.',
      },
      {
        heading: 'Manutenzione Finitura Olio',
        text: 'Il parquet oliato richiede rioliatura periodica (ogni 1-2 anni in ambienti residenziali). Applica olio di manutenzione con panno, lascia assorbire, lucida. Puoi farlo da solo o chiamarci per un trattamento professionale.',
      },
    ],
    faq: [
      { q: 'Ogni quanto devo riverniciare il parquet?', a: 'La vernice dura 10-15 anni in condizioni normali. Quando inizia a opacizzarsi o graffiarsi facilmente è il momento di levigare e riverniciare.' },
      { q: 'Posso usare il vaporetto sul parquet?', a: 'No. Il vapore penetra nelle fessure e fa gonfiare il legno, causando sollevamenti e deformazioni. Usa solo panni umidi strizzati.' },
      { q: 'Come tolgo una macchia dal parquet?', a: 'Dipende dalla macchia. Per liquidi agisci subito con panno assorbente. Per macchie secche prova con detergente neutro. Per danni profondi potrebbe servire una levigatura locale. Contattaci per una valutazione.' },
    ],
    relatedLinks: [
      { title: 'Levigatura Parquet', href: '/levigatura-parquet' },
      { title: 'Riparazione Parquet', href: '/servizi/riparazioni' },
      { title: 'Contattaci', href: '/contatti' },
    ],
  },
}

// Fallback for guides not yet written
const PLACEHOLDER_GUIDE = {
  title: 'Guida in Preparazione',
  metaTitle: 'Guida Parquet | Arteparquet',
  metaDescription: 'Guida sul parquet in preparazione. Contattaci per informazioni.',
  bluf: 'Questa guida è in preparazione. Nel frattempo, contattaci su WhatsApp o telefono per qualsiasi domanda sul parquet. Risposta garantita in 5 minuti durante l\'orario lavorativo.',
  content: [],
  faq: [],
  relatedLinks: [
    { title: 'Tutti i Servizi', href: '/servizi' },
    { title: 'Contattaci', href: '/contatti' },
    { title: 'Richiedi Preventivo', href: '/preventivo' },
  ],
}

export async function generateStaticParams() {
  const slugs = [
    'parquet-massello-vs-prefinito',
    'quanto-costa-levigatura',
    'parquet-riscaldamento-pavimento',
    'manutenzione-parquet',
    'parquet-bagno-cucina',
    'umidita-massetto-posa',
    'parquet-graffi-macchie',
    'parquet-scricchiola',
    'parquet-gonfiato-acqua',
    'spina-italiana-vs-francese',
  ]
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES[slug] || PLACEHOLDER_GUIDE
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `https://arteparquet.pro/guida/${slug}` },
  }
}

export default async function GuidaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = GUIDES[slug] || PLACEHOLDER_GUIDE

  if (!guide) notFound()

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Guide', url: 'https://arteparquet.pro/parquet' },
          { name: guide.title, url: `https://arteparquet.pro/guida/${slug}` },
        ]}
      />
      {guide.faq.length > 0 && <ServiceFaqSchema items={guide.faq} />}
      <ArticleSchema
        headline={guide.title}
        description={guide.metaDescription}
        url={`https://arteparquet.pro/guida/${slug}`}
        datePublished="2026-08-31"
      />

      {/* Hero */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <FadeIn>
            <Link
              href="/parquet"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              Torna alle Guide
            </Link>
            <p className="text-rovere font-medium mb-3 text-sm uppercase tracking-wider">
              Knowledge Base
            </p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              {guide.title}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* BLUF Section */}
      <section className="py-12 bg-rovere/10 border-b border-rovere/20">
        <div className="container-wide">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-rovere rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-rovere uppercase tracking-wider mb-2">
                    Risposta Diretta
                  </p>
                  <p className="text-lg md:text-xl text-legno-bruciato leading-relaxed">
                    {guide.bluf}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      {guide.content.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto space-y-12">
              {guide.content.map((section, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">{section.heading}</h2>
                    <p className="text-legno-bruciato/80 leading-relaxed text-lg">{section.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {guide.faq.length > 0 && (
        <section className="py-16 md:py-24 bg-travertino">
          <div className="container-wide max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-center mb-10">
                Domande Correlate
              </h2>
            </FadeIn>
            <div className="space-y-4">
              {guide.faq.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <details className="group bg-white rounded-xl shadow-sm">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold">
                      {faq.q}
                      <span className="text-rovere text-xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-legno-bruciato/80">{faq.a}</div>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-nero-marquina text-white">
        <div className="container-wide text-center">
          <FadeIn>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Hai altre domande?
            </h2>
            <p className="text-white/70 max-w-lg mx-auto mb-8">
              Contattaci su WhatsApp per una consulenza gratuita. Risposta in 5 minuti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/393892407827"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-6 py-3 rounded-xl"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white hover:text-nero-marquina font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <Phone size={18} />
                389 240 7827
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-travertino border-t border-legno-bruciato/10">
        <div className="container-wide">
          <h3 className="font-serif text-xl font-bold mb-6 text-center">Approfondimenti</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {guide.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-white rounded-full text-sm hover:bg-rovere hover:text-white transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
