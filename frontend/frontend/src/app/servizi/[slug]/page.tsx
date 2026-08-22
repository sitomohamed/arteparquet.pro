import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'
import { RelatedLinks } from '@/components/ui/related-links'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

// ── Service data ───────────────────────────────────────────────────────────
const SERVICES: Record<string, {
  title: string
  subtitle: string
  description: string
  category: string
  badge: string
  features: string[]
  faq: { q: string; a: string }[]
  metaTitle: string
  metaDescription: string
}> = {
  'parquet-massello': {
    title: 'Parquet Massello',
    subtitle: 'Legno pieno, tradizione pura',
    description: 'Il parquet massello è il pavimento in legno nella sua forma più autentica: un unico strato di legno pieno, dall\'essenza al suolo. Levigabile più volte nell\'arco di decenni, ogni massello porta con sé storia, calore e un profumo di artigianato che nessun altro materiale può eguagliare.',
    category: 'Parquet',
    badge: 'Il più pregiato',
    features: [
      'Spessore da 10 a 22 mm di legno puro al 100%',
      'Levigabile 4–6 volte nell\'arco di 50+ anni',
      'Disponibile in rovere, noce, frassino, ciliegio e altre essenze',
      'Posa incollata o chiodato su massetto o listelli',
      'Finitura a olio, cera naturale o vernice UV',
      'Ideale per riscaldamento a pavimento',
      'Sopralluogo e preventivo gratuiti',
    ],
    faq: [
      { q: 'Quanto dura il parquet massello?', a: 'Il massello, con la giusta manutenzione, dura tutta la vita. Potendolo levigare più volte, può accompagnare la vostra casa per 50, 60, anche 100 anni.' },
      { q: 'Posso posarlo sopra il riscaldamento a pavimento?', a: 'Sì, ma occorre scegliere essenze stabili (es. rovere) e garantire che la temperatura superficiale non superi i 27°C. Vi guidiamo nella scelta corretta.' },
      { q: 'Quanto tempo richiede la posa?', a: 'Per 80 mq circa 2–3 giorni di posa, poi 24h di presa della colla. Con finitura a olio si può calpestare dopo 24h, con vernice dopo 12h.' },
    ],
    metaTitle: 'Posa Parquet Massello Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Posa parquet massello in rovere, noce, frassino. Artigiani con 30 anni di esperienza a Bergamo e in tutta la Lombardia. Preventivo gratuito.',
  },
  'parquet-prefinito': {
    title: 'Parquet Prefinito',
    subtitle: 'Pronto in pochi giorni',
    description: 'Il parquet prefinito unisce la bellezza del legno vero alla praticità moderna: uno strato nobile in legno naturale (2–6 mm) accoppiato a un supporto multistrato ultra-stabile. Già finito in fabbrica, si installa rapidamente e si calpesta in poche ore.',
    category: 'Parquet',
    badge: 'Installazione rapida',
    features: [
      'Strato nobile in legno vero da 2 a 6 mm',
      'Supporto multistrato ad alta stabilità dimensionale',
      'Già verniciato o oliato in fabbrica con 5–7 strati UV',
      'Posa flottante, incollata o click su qualsiasi sottofondo',
      'Compatibile con riscaldamento a pavimento',
      'Ampia gamma di formati, colori e finiture',
      'Pronto da calpestare dopo poche ore dalla posa',
    ],
    faq: [
      { q: 'Si può levigare il prefinito?', a: 'Dipende dallo spessore dello strato nobile. Con 4–6 mm si può levigare 1–2 volte. Con strato da 2 mm è sconsigliato. Ve lo diciamo in fase di sopralluogo.' },
      { q: 'Qual è la differenza rispetto al massello?', a: 'Il massello è legno pieno (più levigature, più duraturo) ma meno stabile alle variazioni di umidità. Il prefinito è più stabile e si installa prima, ma con meno possibilità di levigatura.' },
      { q: 'Quanto ci vuole per la posa?', a: 'Per 80 mq circa 1–2 giorni. Si può calpestare già il giorno dopo.' },
    ],
    metaTitle: 'Posa Parquet Prefinito Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Posa parquet prefinito a Bergamo e in Lombardia. Installazione rapida, compatibile con riscaldamento a pavimento. Preventivo gratuito.',
  },
  'parquet-tradizionale': {
    title: 'Parquet Tradizionale',
    subtitle: 'Posa classica a listone',
    description: 'La posa tradizionale è l\'arte del parquet nel suo senso più puro: listoni posati a correre, a spina di pesce, a Versailles o con intarsi su misura. Ogni schema racconta un\'epoca, ogni essenza un carattere diverso.',
    category: 'Parquet',
    badge: 'Design classico',
    features: [
      'Posa a listone classico, a correre con sfalsatura',
      'Spina di pesce semplice e doppia (punto d\'Ungheria)',
      'Parquet a Versailles e a cassettoni',
      'Intarsi personalizzati e bordi decorativi',
      'Schemi su misura progettati insieme al cliente',
      'Massello o prefinito in tutte le essenze',
      'Finitura naturale, vintage o moderna',
    ],
    faq: [
      { q: 'Quanto costa la posa a spina di pesce rispetto a quella classica?', a: 'La spina di pesce richiede più tempo e più sfrido di materiale (+15–20%). Vi forniremo un preventivo dettagliato prima di iniziare.' },
      { q: 'Posso scegliere un intarsio personalizzato?', a: 'Assolutamente sì. Realizziamo intarsi su misura: stelle, riquadri, fasce decorative, loghi aziendali. Tutto artigianale.' },
      { q: 'Avete lavorato con schemi complessi?', a: 'Sì, abbiamo realizzato parquet complessi anche per teatri e palazzi storici. Non esistono schemi troppo difficili per noi.' },
    ],
    metaTitle: 'Posa Parquet Tradizionale — Spina di Pesce, Versailles | Arteparquet',
    metaDescription: 'Posa parquet tradizionale: spina di pesce, listone classico, Versailles, intarsi su misura. 30 anni di esperienza a Bergamo e Lombardia.',
  },
  'laminato': {
    title: 'Pavimento Laminato',
    subtitle: 'Resistente e conveniente',
    description: 'Il laminato moderno non ha nulla a che vedere con i vecchi pavimenti plastificati: le nuove generazioni (AC4–AC5) replicano fedelmente la texture del legno con una resistenza all\'usura superiore e prezzi accessibili.',
    category: 'Parquet',
    badge: 'Alta resistenza',
    features: [
      'Classi di resistenza AC3, AC4, AC5 per ogni tipo di utilizzo',
      'Impermeabilità all\'acqua nelle versioni idrorepellenti',
      'Posa flottante click in 1 giorno',
      'Spessore da 7 a 12 mm con HDF ad alta densità',
      'Compatibile con riscaldamento a pavimento',
      'Ideale per ambienti commerciali ad alto traffico',
      'Garanzia del produttore fino a 25 anni',
    ],
    faq: [
      { q: 'Il laminato resiste all\'acqua?', a: 'Le versioni moderne con giunti trattati resistono bene agli schizzi e all\'umidità normale. Non è però consigliato per bagni o ambienti con acqua stagnante.' },
      { q: 'Si può levigare?', a: 'No, il laminato non è levigabile. In caso di danni importanti si sostituisce il listello danneggiato.' },
      { q: 'Si sente il rumore di calpestio?', a: 'Utilizziamo sempre un sottofondo fonoassorbente specifico che riduce drasticamente il rumore di calpestio.' },
    ],
    metaTitle: 'Posa Pavimento Laminato Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Posa pavimento laminato AC4 e AC5 a Bergamo e in Lombardia. Installazione rapida, alta resistenza. Preventivo gratuito.',
  },
  'spc': {
    title: 'Pavimento SPC',
    subtitle: 'Impermeabile al 100%',
    description: 'SPC (Stone Polymer Composite) è la rivoluzione nei pavimenti moderni: un nucleo rigido in pietra e polimero che lo rende completamente impermeabile, anti-graffio e adatto anche a bagni, cucine e cantine. Con la texture del legno, senza i suoi limiti.',
    category: 'Pavimenti Moderni',
    badge: 'Impermeabile 100%',
    features: [
      'Impermeabile al 100%: adatto a bagni, cucine e cantine',
      'Nucleo rigido SPC ultra-stabile alle variazioni termiche',
      'Resistente a graffi, urti e carichi pesanti',
      'Posa click senza colla su qualsiasi sottofondo livellato',
      'Compatibile con riscaldamento a pavimento (max 28°C)',
      'Strato antirumore integrato in molte versioni',
      'Manutenzione facilissima: passa solo un panno umido',
    ],
    faq: [
      { q: 'Posso posarlo in bagno?', a: 'Sì, l\'SPC è impermeabile al 100% ed è la soluzione ideale per bagni, cucine, lavanderie e qualsiasi ambiente umido.' },
      { q: 'Quanto è spesso?', a: 'Generalmente da 4 a 8 mm. Vi consigliamo sempre la versione con strato antirumore integrato (5 mm totali).' },
      { q: 'Sembra davvero legno?', a: 'Le versioni di qualità superiore hanno una texture in rilievo che replica fedelmente le venature del legno. Vi mostriamo i campioni prima di scegliere.' },
    ],
    metaTitle: 'Posa Pavimento SPC Impermeabile Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Posa pavimento SPC impermeabile a Bergamo e in Lombardia. Ideale per bagni e cucine. Aspetto legno, resistenza totale. Preventivo gratuito.',
  },
  'pvc': {
    title: 'Pavimento PVC',
    subtitle: 'Ideale per ambienti umidi',
    description: 'Il pavimento in PVC click (LVT) è pensato per la casa: morbido sotto i piedi, silenzioso e completamente impermeabile. Si installa sopra il pavimento esistente senza demolire, ideale per ristrutturazioni veloci in cucine, corridoi e camere.',
    category: 'Pavimenti Moderni',
    badge: 'Comfort massimo',
    features: [
      'Completamente impermeabile e resistente all\'umidità',
      'Morbido e silenzioso: riduce il rumore di calpestio fino al 20 dB',
      'Si installa sopra il pavimento esistente senza demolire',
      'Strati multipli: usura, decorativo, foam, backing',
      'Disponibile in listoni, lastre e formati extra-large',
      'Ideale per ristrutturazioni veloci senza polvere',
      'Adatto a riscaldamento a pavimento',
    ],
    faq: [
      { q: 'Qual è la differenza tra PVC e SPC?', a: 'Il PVC ha un nucleo più morbido e flessibile (più confortevole sotto i piedi), mentre l\'SPC ha un nucleo rigido (più resistente ai carichi pesanti). Entrambi sono impermeabili.' },
      { q: 'Si può posare sopra le piastrelle esistenti?', a: 'Sì, nella maggior parte dei casi si installa direttamente sopra il pavimento esistente, purché livellato e stabile. Nessuna demolizione, nessuna polvere.' },
      { q: 'Quanto dura il PVC?', a: 'Con normale utilizzo residenziale, 15–25 anni. Per ambienti commerciali consigliamo lo spessore di usura da 0,55 mm.' },
    ],
    metaTitle: 'Posa Pavimento PVC Vinilico Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Posa pavimento PVC vinilico a Bergamo e in Lombardia. Silenzioso, impermeabile, senza demolire. Preventivo gratuito.',
  },
  'vinilico': {
    title: 'Pavimento Vinilico',
    subtitle: 'Comfort e silenzio acustico',
    description: 'Il vinilico in lastre incollate (LVT glue-down) è la scelta contract: uffici, negozi e strutture ricettive dove servono estetica, silenzio e manutenzione minima. A differenza del PVC click residenziale, si fissa al sottofondo e sopporta traffico intenso.',
    category: 'Pavimenti Moderni',
    badge: 'Bassa manutenzione',
    features: [
      'Ampia gamma di formati: listoni, lastre, quadrate',
      'Texture in rilievo che replicano legno, pietra e cemento',
      'Resistente alle macchie e ai prodotti chimici',
      'Facilissimo da pulire: acqua e panno',
      'Installazione con colla o click a seconda del modello',
      'Compatibile con riscaldamento a pavimento',
      'Adatto a uffici, negozi, strutture ricettive',
    ],
    faq: [
      { q: 'Il vinilico è lo stesso del PVC?', a: 'Tecnicamente il vinilico è un sottoinsieme del PVC. "Vinilico" indica spesso le versioni in lastre incollate, mentre il PVC click è tipicamente a listoni.' },
      { q: 'Resiste ai graffi?', a: 'Lo strato di usura protegge dai graffi normali. Per ambienti con animali domestici o alto traffico consigliamo versioni con strato di usura da 0,5 mm o superiore.' },
      { q: 'Posso usarlo in un negozio o in un ufficio?', a: 'Assolutamente sì. Il vinilico contract è appositamente studiato per ambienti commerciali e sopporta migliaia di passaggi al giorno.' },
    ],
    metaTitle: 'Posa Pavimento Vinilico Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Posa pavimento vinilico in lastre e listoni a Bergamo e in Lombardia. Estetica sofisticata, bassa manutenzione. Preventivo gratuito.',
  },
  'posa': {
    title: 'Posa Parquet',
    subtitle: 'Posa professionale certificata',
    description: 'La posa è il momento in cui un pavimento prende vita. Con 30 anni di esperienza, curiamo ogni dettaglio: dalla preparazione del massetto alla dilatazione perimetrale, dalla scelta della colla alla finitura finale. Ogni tecnica — incollata, flottante o chiodato — è eseguita secondo i più alti standard europei.',
    category: 'Servizi',
    badge: 'Dal 1996',
    features: [
      'Posa incollata su massetto cementizio o anidrite',
      'Posa flottante click per massima flessibilità',
      'Posa chiodato su listelli e sottopavimento in legno',
      'Preparazione e autolivellamento del sottofondo',
      'Dilatazioni perimetrali corrette per ogni ambiente',
      'Gestione degli angoli, soglie e raccordi',
      'Pulizia finale e consegna chiavi in mano',
    ],
    faq: [
      { q: 'Il massetto deve essere completamente asciutto?', a: 'Sì. Un massetto cementizio deve avere umidità residua inferiore al 2% (misurata con igrometro). Per massetti in anidrite il limite è 0,5%. Verifichiamo noi prima di iniziare.' },
      { q: 'Quanto tempo dura la posa di 100 mq?', a: 'In media 2–3 giorni lavorativi per la posa, più 24–48h di asciugatura della colla prima di calpestare.' },
      { q: 'Rimuovete il vecchio pavimento?', a: 'Su richiesta, sì. Gestiamo la demolizione e lo smaltimento del vecchio pavimento prima di posare quello nuovo.' },
    ],
    metaTitle: 'Posa Parquet Professionale Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Posa parquet professionale a Bergamo e in tutta la Lombardia. Incollato, flottante o chiodato. Dal 1996. Preventivo gratuito.',
  },
  'levigatura': {
    title: 'Levigatura Parquet',
    subtitle: 'Senza polvere, risultato impeccabile',
    description: 'La levigatura professionale riporta il vostro parquet allo splendore originale, eliminando graffi, macchie, avvallamenti e vecchie finiture. Utilizziamo macchine di ultima generazione con sistema di aspirazione integrata: zero polvere, nessun disagio per la vostra famiglia.',
    category: 'Servizi',
    badge: 'Senza polvere',
    features: [
      'Macchine professionali con aspirazione integrata (polvere ridotta del 95%)',
      'Levigatura a nastro e a disco per bordi e angoli',
      'Stuccatura delle fessure con pasta di legno tinteggiata',
      'Applicazione di olio naturale, cera o vernice UV',
      'Trattamento lucidante o satinato a scelta',
      'Risultato perfettamente liscio e uniforme',
      'Ripristino del colore originale o cambio finitura',
    ],
    faq: [
      { q: 'Quante volte si può levigare un parquet?', a: 'Dipende dallo spessore. Un massello da 14–18 mm si può levigare 4–6 volte. Un prefinito con strato nobile da 4 mm una o due volte al massimo.' },
      { q: 'Quanto dura il lavoro di levigatura per 80 mq?', a: 'In genere 2 giorni: il primo per levigare, il secondo per applicare la finitura. Il pavimento è calpestabile dopo 12–24h.' },
      { q: 'Devo sgomberare tutto?', a: 'Sì, la stanza deve essere vuota di mobili. Per il resto, le nostre macchine con aspirazione integrata lasciano l\'ambiente quasi pulito.' },
    ],
    metaTitle: 'Levigatura Parquet Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Levigatura parquet professionale senza polvere a Bergamo e in Lombardia. Macchine con aspirazione integrata. Risultato impeccabile. Preventivo gratuito.',
  },
  'restauro': {
    title: 'Restauro Parquet',
    subtitle: 'Nuova vita al parquet antico',
    description: 'Il restauro è l\'operazione più delicata che si possa fare su un parquet: riportare in vita un pavimento storico rispettandone l\'anima, i colori e le imperfezioni che lo rendono unico. Lavoriamo su parquet del Novecento, parquet di palazzi storici, pavimenti antichi di qualsiasi essenza.',
    category: 'Servizi',
    badge: 'Parquet storico',
    features: [
      'Valutazione e diagnosi del parquet prima di ogni intervento',
      'Sostituzione selettiva dei listelli irrecuperabili',
      'Levigatura delicata che rispetta lo spessore residuo',
      'Stuccatura con paste cromatizzate ad hoc',
      'Verniciatura con prodotti atossici e duraturi',
      'Trattamento anti-UV per preservare il colore',
      'Certificato di restauro per parquet storici vincolati',
    ],
    faq: [
      { q: 'Il parquet della mia casa del 1940 è recuperabile?', a: 'Nella stragrande maggioranza dei casi sì. Anche parquet molto danneggiati o ridotti di spessore possono essere recuperati con le tecniche giuste.' },
      { q: 'Come capite se un listello va sostituito?', a: 'Durante il sopralluogo valutiamo ogni listello: spessore residuo, attacchi di umidità, tarme del legno, fessurazioni strutturali. Vi diciamo esattamente cosa si può salvare.' },
      { q: 'Il risultato finale sarà diverso dall\'originale?', a: 'Il restauro mira a valorizzare il parquet mantenendo la sua identità. Il colore finale dipende dalla finitura scelta: possiamo rispettare il tono originale o aggiornarlo a un look moderno.' },
    ],
    metaTitle: 'Restauro Parquet Antico Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Restauro parquet antico e storico a Bergamo e in Lombardia. Recupero parquet del Novecento, palazzi storici. Dal 1996. Preventivo gratuito.',
  },
  'riparazioni': {
    title: 'Riparazioni Parquet',
    subtitle: 'Interventi puntuali e rapidi',
    description: 'Non sempre serve una levigatura completa: spesso un intervento puntuale e mirato risolve il problema in poche ore. Scricchiolii, listelli rotti, rigonfiamenti, bordi sollevati — interveniamo rapidamente senza stravolgere il pavimento.',
    category: 'Servizi',
    badge: 'Intervento rapido',
    features: [
      'Eliminazione degli scricchiolii con iniezione di colla',
      'Sostituzione di listelli rotti o danneggiati',
      'Ripristino di bordi e angoli sollevati',
      'Trattamento di rigonfiamenti da umidità',
      'Rattoppo invisibile con pasta di legno tinteggiata',
      'Reinchiodatura e rincollaggio di zone critiche',
      'Intervento in giornata per urgenze',
    ],
    faq: [
      { q: 'Il parquet scricchiola: come si risolve?', a: 'Dipende dalla causa. Se il problema è colla che si è staccata, si inietta colla specifica tra listello e massetto. Se invece c\'è un\'asse che si muove, si reinchioda o si ricolla dall\'alto con un foro invisibile.' },
      { q: 'Ho rotto alcuni listelli: si vede la riparazione?', a: 'Con la sostituzione dei listelli e la stuccatura a colore, la riparazione diventa quasi invisibile. Per un risultato perfetto può servire una mini-levigatura locale.' },
      { q: 'Intervenite anche su piccole superfici?', a: 'Sì, siamo disponibili anche per interventi su pochi metri quadri o su singoli listelli. Nessun lavoro è troppo piccolo per noi.' },
    ],
    metaTitle: 'Riparazione Parquet Bergamo e Lombardia | Arteparquet',
    metaDescription: 'Riparazione parquet a Bergamo e in Lombardia: scricchiolii, listelli rotti, rigonfiamenti. Intervento rapido e preciso. Preventivo gratuito.',
  },
}

// ── Static params ──────────────────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }))
}

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) return {}
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `https://arteparquet.pro/servizi/${slug}` },
  }
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function ServizioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) notFound()

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Servizi', url: 'https://arteparquet.pro/servizi' },
          { name: service.title, url: `https://arteparquet.pro/servizi/${slug}` },
        ]}
      />
      <ServiceFaqSchema items={service.faq} />

      {/* Hero */}
      <section className="bg-nero-marquina pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn direction="up">
            {/* Breadcrumb visibile */}
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-1.5 flex-wrap">
                <li>
                  <Link href="/" className="font-sans text-[12px] text-white/40 hover:text-rovere transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="font-sans text-[12px] text-white/25">/</li>
                <li>
                  <Link href="/servizi" className="font-sans text-[12px] text-rovere hover:text-wood-400 transition-colors font-semibold uppercase tracking-wider">
                    Servizi
                  </Link>
                </li>
                <li aria-hidden="true" className="font-sans text-[12px] text-white/25">/</li>
                <li>
                  <span className="font-sans text-[12px] text-white/50 font-semibold uppercase tracking-wider" aria-current="page">
                    {service.title}
                  </span>
                </li>
              </ol>
            </nav>
            <span className="inline-block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-rovere bg-rovere/10 border border-rovere/20 px-3 py-1 rounded-full mb-5 mt-2">
              {service.badge}
            </span>
            <h1
              className="font-serif font-semibold text-white mb-5 text-balance"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
            >
              {service.title}
            </h1>
            <p className="font-sans text-white/65 max-w-2xl leading-relaxed mb-8"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              {service.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all"
              >
                Preventivo Gratuito <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a
                href="tel:+393892407827"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 text-white font-sans text-[14px] font-medium hover:bg-white/10 transition-all"
              >
                <Phone size={15} aria-hidden="true" /> +39 389 240 7827
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="bg-travertino">
        <div className="container-wide py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: feature list */}
            <FadeIn direction="up">
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
                Cosa include il servizio
              </span>
              <h2 className="font-serif font-semibold text-legno-bruciato mb-8"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Tutto quello che ti serve, <br />niente di superfluo.
              </h2>
              <ul className="space-y-4" role="list">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-rovere flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-sans text-[15px] text-neutral-700 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Right: CTA card */}
            <FadeIn direction="up" delay={0.15}>
              <div className="bg-nero-marquina rounded-2xl p-8 md:p-10 text-white shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
                <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
                  Arteparquet dal 1996
                </span>
                <h3 className="font-serif font-semibold text-[1.5rem] mb-4 leading-snug">
                  Sopralluogo gratuito<br />senza impegno.
                </h3>
                <p className="font-sans text-[14px] text-white/60 leading-relaxed mb-8">
                  Veniamo da te, valutiamo il pavimento e ti consegniamo un preventivo dettagliato entro 24 ore.
                  Nessun costo nascosto, nessuna sorpresa.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/contatti"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 transition-colors"
                  >
                    Richiedi preventivo gratuito <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <a
                    href="tel:+393892407827"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/15 text-white/80 font-sans text-[14px] hover:bg-white/5 transition-colors"
                  >
                    <Phone size={15} aria-hidden="true" /> +39 389 240 7827
                  </a>
                </div>
                <ul className="mt-6 space-y-2">
                  {['Sopralluogo gratuito', 'Preventivo entro 24h', 'Nessun costo nascosto', 'Garanzia scritta sulla posa'].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-sans text-[13px] text-white/50">
                      <span className="w-1 h-1 rounded-full bg-rovere flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-wide py-20 md:py-28">
          <FadeIn direction="up" className="text-center mb-14">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              Domande frequenti
            </span>
            <h2 className="font-serif font-semibold text-legno-bruciato"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Hai dubbi? Rispondo io.
            </h2>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-5">
            {service.faq.map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.08}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-6 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-shadow duration-300">
                  <h3 className="font-sans font-semibold text-legno-bruciato text-[15px] mb-3 leading-snug">
                    {item.q}
                  </h3>
                  <p className="font-sans text-[14px] text-neutral-500 leading-[1.75]">
                    {item.a}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={0.3} className="text-center mt-12">
            <p className="font-sans text-[14px] text-neutral-500 mb-4">
              Hai altre domande? Scrivici o chiamaci.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 transition-all"
            >
              Contattaci <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <RelatedLinks
        title="Altri servizi"
        links={Object.entries(SERVICES)
          .filter(([s]) => s !== slug)
          .filter(([, svc]) => svc.category === service.category)
          .slice(0, 4)
          .map(([s, svc]) => ({
            title: svc.title,
            href: `/servizi/${s}`,
            description: svc.subtitle,
          }))}
        columns={4}
      />

      <CtaSection />
    </>
  )
}
