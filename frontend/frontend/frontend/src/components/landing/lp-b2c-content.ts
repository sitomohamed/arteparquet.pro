import type { LpTrackerVariant } from '@/components/analytics/lp-tracker'

export interface LpProblem {
  title: string
  desc: string
}

export interface LpPortfolioCard {
  src: string
  alt: string
  tag: string
  title: string
  place: string
}

export interface LpB2cContent {
  trackerVariant: Extract<LpTrackerVariant, 'levigatura' | 'restauro' | 'spc'>
  defaultJobType: string
  waMessage: string
  heroBadge: string
  h1Lead: string
  h1Accent: string
  subhead: string
  heroImage: string
  heroAlt: string
  trustStrip: string[]
  problemsTitle: string
  problemsIntro: string
  problems: LpProblem[]
  midCta: string
  portfolio: LpPortfolioCard[]
  caseStudies: LpPortfolioCard[]
  servicesLead: string
  faqs: { q: string; a: string }[]
  formTitle: string
  formIntro: string
}

const SCALA =
  "Un percorso professionale che include esperienze maturate all'interno di team coinvolti in lavori legati al Teatro alla Scala di Milano nel 2004."

export const LP_TRUST_SCALA = SCALA

export const LP_LEVIGATURA: LpB2cContent = {
  trackerVariant: 'levigatura',
  defaultJobType: 'Levigatura parquet esistente',
  waMessage:
    'Ciao! Ho visto l’annuncio sulla levigatura parquet (pavimento opaco, da rinnovare, lavoro a bassa polvere). Vi invio alcune foto per una valutazione. La casa è a [scrivi la città].',
  heroBadge: 'Bergamo | Milano | Lombardia | Levigatura parquet',
  h1Lead: 'Parquet opaco?',
  h1Accent: 'Si può levigare.',
  subhead:
    'Inviaci 2-3 foto del pavimento. In orario lavorativo valutiamo se basta una levigatura a bassa polvere - senza impegno, senza sostituire tutto.',
  heroImage: '/portfolio/google-levigatura-mosaico-01.jpg',
  heroAlt: 'Levigatura parquet mosaico - lavoro Arteparquet a Bergamo',
  trustStrip: ['Valutazione gratuita', 'Senza impegno', 'Bassa polvere', 'Dal 1996'],
  problemsTitle: 'Il parquet ha perso lucentezza?',
  problemsIntro:
    'Graffi, grigio, finitura sbiadita: in molti casi si leviga e si rivernicia, senza posare un pavimento nuovo.',
  problems: [
    {
      title: 'Finitura opaca o grigia',
      desc: 'Il colore originale è spento, la superficie non riflette più la luce.',
    },
    {
      title: 'Graffi e segni del tempo',
      desc: 'Passi, sedie, animali: il legno c’è ancora, manca la finitura.',
    },
    {
      title: 'Vuoi rinnovare senza rifare',
      desc: 'Il parquet è solido, ma stanco. La levigatura riporta il piano a nuovo.',
    },
    {
      title: 'Polvere in casa: ti preoccupa',
      desc: 'Lavoriamo con macchine a bassa emissione. Te lo spieghiamo prima, in sopralluogo.',
    },
    {
      title: 'Non sai se conviene',
      desc: 'Dalle foto capiamo se la levigatura basta o se serve un restauro più profondo.',
    },
    {
      title: 'Stanza o casa intera',
      desc: 'Si può intervenire su una zona o su tutta la superficie. Lo valutiamo sul posto.',
    },
  ],
  midCta: 'Invia le foto della levigatura su WhatsApp',
  portfolio: [
    {
      src: '/portfolio/google-levigatura-mosaico-01.jpg',
      alt: 'Levigatura parquet mosaico - Bergamo',
      tag: 'Levigatura',
      title: 'Levigatura parquet mosaico',
      place: 'Bergamo',
    },
    {
      src: '/portfolio/levigatura-parquet-01.jpg',
      alt: 'Levigatura parquet - lavoro Arteparquet',
      tag: 'Levigatura',
      title: 'Levigatura parquet',
      place: 'Bergamo',
    },
    {
      src: '/portfolio/google-verniciatura-mosaico-01.jpg',
      alt: 'Verniciatura dopo levigatura parquet mosaico - Bergamo',
      tag: 'Verniciatura',
      title: 'Finitura dopo levigatura',
      place: 'Bergamo',
    },
  ],
  caseStudies: [
    {
      src: '/portfolio/google-levigatura-mosaico-01.jpg',
      alt: 'Levigatura parquet mosaico storico - Bergamo',
      tag: 'Levigatura',
      title: 'Levigatura mosaico',
      place: 'Bergamo | Parquet mosaico | Levigatura + verniciatura',
    },
    {
      src: '/portfolio/google-verniciatura-ecostar-01.jpg',
      alt: 'Verniciatura parquet dopo levigatura - Arteparquet',
      tag: 'Finitura',
      title: 'Nuova verniciatura',
      place: 'Bergamo | Parquet esistente | Finitura dopo levigatura',
    },
  ],
  servicesLead: 'Levigatura, verniciatura e, se serve, riparazioni puntuali prima di carteggiare.',
  faqs: [
    {
      q: 'La levigatura alza molta polvere?',
      a: 'Usiamo macchine a bassa emissione di polvere. In sopralluogo vi spieghiamo come proteggiamo gli ambienti. Non promettiamo “zero polvere”: riduciamo il disturbo in modo professionale.',
    },
    {
      q: 'Si può levigare un parquet molto graffiato?',
      a: 'Spesso sì, se lo strato di legno è sufficiente. Dalle foto facciamo una prima lettura; la conferma è in sopralluogo.',
    },
    {
      q: 'Quanto tempo ci vuole?',
      a: 'Dipende dai metri quadri e dallo stato del pavimento. I tempi ve li diciamo in sopralluogo, prima di iniziare. Nessuna stima inventata da un annuncio.',
    },
    {
      q: 'Dove operate?',
      a: 'Sede a Bergamo, Via Vittorio Alfieri 7. Operiamo in provincia e in Lombardia (Milano, Brescia, Como, Monza e altre). Scrivici la città nel messaggio.',
    },
    {
      q: 'Dopo le foto cosa succede?',
      a: 'Esaminiamo le foto in orario lavorativo e vi rispondiamo con una prima valutazione. Se serve, organizziamo un sopralluogo gratuito.',
    },
  ],
  formTitle: 'Invia le foto del parquet da levigare',
  formIntro:
    'Due o tre scatti del piano e dei punti più opachi. Ti rispondiamo in orario lavorativo. Nessun impegno.',
}

export const LP_RESTAURO: LpB2cContent = {
  trackerVariant: 'restauro',
  defaultJobType: 'Restauro parquet',
  waMessage:
    'Ciao! Ho visto l’annuncio sul restauro parquet (pavimento rovinato / antico da recuperare). Vi invio alcune foto per capire se si può salvare. La casa è a [scrivi la città].',
  heroBadge: 'Bergamo | Milano | Lombardia | Restauro parquet',
  h1Lead: 'Parquet rovinato?',
  h1Accent: 'Spesso si recupera.',
  subhead:
    'Inviaci 2-3 foto. In orario lavorativo valutiamo se il legno si può restaurare - senza impegno, senza buttarlo via a prescindere.',
  heroImage: '/portfolio/google-mosaico-ristrutturazione-01.jpg',
  heroAlt: 'Restauro parquet mosaico in ristrutturazione - Arteparquet Bergamo',
  trustStrip: ['Valutazione gratuita', 'Senza impegno', 'Recupero del legno', 'Dal 1996'],
  problemsTitle: 'Il parquet merita un recupero?',
  problemsIntro:
    'Listelli stanchi, mosaico storico, zone scollate: il restauro interviene sul legno che c’è, non lo sostituisce a occhi chiusi.',
  problems: [
    {
      title: 'Parquet antico o d’epoca',
      desc: 'Mosaico, spina, listoni vecchi: si valuta se il materiale regge un restauro rispettoso.',
    },
    {
      title: 'Zone rovinate, non tutta la casa',
      desc: 'A volte si recupera una stanza o un tratto, senza rifare l’intero piano.',
    },
    {
      title: 'Listelli scollati o fessurati',
      desc: 'Riparazione puntuale e poi, se serve, levigatura e finitura.',
    },
    {
      title: 'Umidità o rigonfiamenti',
      desc: 'Prima si capisce la causa. Non si carteggia su un problema strutturale irrisolto.',
    },
    {
      title: 'Hai sentito “tanto vale cambiarlo”',
      desc: 'Spesso il legno si salva. Lo diciamo dopo aver visto foto e, se serve, il cantiere.',
    },
    {
      title: 'Ristrutturazione in corso',
      desc: 'Possiamo coordinare restauro parquet con altri lavori in casa.',
    },
  ],
  midCta: 'Invia le foto del parquet da restaurare',
  portfolio: [
    {
      src: '/portfolio/google-mosaico-ristrutturazione-01.jpg',
      alt: 'Parquet mosaico in ristrutturazione - Bergamo',
      tag: 'Restauro',
      title: 'Mosaico in ristrutturazione',
      place: 'Bergamo',
    },
    {
      src: '/portfolio/google-levigatura-mosaico-01.jpg',
      alt: 'Levigatura parquet mosaico dopo restauro - Bergamo',
      tag: 'Restauro e levigatura',
      title: 'Mosaico riportato a nuovo',
      place: 'Bergamo',
    },
    {
      src: '/portfolio/google-verniciatura-mosaico-01.jpg',
      alt: 'Verniciatura parquet mosaico restaurato - Bergamo',
      tag: 'Finitura',
      title: 'Finitura dopo restauro',
      place: 'Bergamo',
    },
  ],
  caseStudies: [
    {
      src: '/portfolio/google-mosaico-ristrutturazione-01.jpg',
      alt: 'Restauro parquet mosaico in ristrutturazione - Bergamo',
      tag: 'Restauro',
      title: 'Recupero mosaico',
      place: 'Bergamo | Parquet mosaico | Restauro in ristrutturazione',
    },
    {
      src: '/portfolio/google-levigatura-mosaico-01.jpg',
      alt: 'Levigatura parquet mosaico storico - Bergamo',
      tag: 'Levigatura',
      title: 'Levigatura dopo recupero',
      place: 'Bergamo | Parquet storico | Levigatura + verniciatura',
    },
  ],
  servicesLead: 'Restauro, riparazioni, levigatura: recuperiamo il legno quando è possibile.',
  faqs: [
    {
      q: 'Si può salvare un parquet molto rovinato?',
      a: 'Nella maggior parte dei casi sì, se il legno ha ancora spessore e non è compromesso da umidità strutturale. Lo valutiamo da foto e in sopralluogo. Non promettiamo il recupero a prescindere.',
    },
    {
      q: 'Restauro e levigatura sono la stessa cosa?',
      a: 'No. Il restauro può includere riparazioni, sostituzioni puntuali, consolidamento. La levigatura è la carteggiatura e la nuova finitura. Spesso vanno insieme.',
    },
    {
      q: 'Quanto tempo ci vuole?',
      a: 'Dipende dallo stato del pavimento e dalla superficie. I tempi ve li comunichiamo in sopralluogo, prima di iniziare.',
    },
    {
      q: 'Dove operate?',
      a: 'Sede a Bergamo, Via Vittorio Alfieri 7. Operiamo in provincia e in Lombardia. Indica la città nel messaggio WhatsApp o nel modulo.',
    },
    {
      q: 'Dopo le foto cosa succede?',
      a: 'Rispondiamo in orario lavorativo con una prima lettura. Se il restauro è plausibile, proponiamo sopralluogo gratuito e poi un preventivo scritto.',
    },
  ],
  formTitle: 'Invia le foto del parquet da restaurare',
  formIntro:
    'Inquadra i danni e un’ampia zona del pavimento. Valutiamo in orario lavorativo se si può recuperare. Nessun impegno.',
}

export const LP_SPC: LpB2cContent = {
  trackerVariant: 'spc',
  defaultJobType: 'Installazione SPC / PVC',
  waMessage:
    'Ciao! Ho visto l’annuncio sui pavimenti SPC (bagno / impermeabile / alternativa al parquet). Vorrei una valutazione. La casa è a [scrivi la città].',
  heroBadge: 'Bergamo | Milano | Lombardia | Pavimenti SPC',
  h1Lead: 'Bagno o umidità?',
  h1Accent: 'Un piano impermeabile.',
  subhead:
    'SPC è un’alternativa al parquet dove il legno non è la scelta giusta: bagno, cucina, locali umidi. Inviaci 2-3 foto del locale. Valutazione in orario lavorativo, senza impegno.',
  heroImage: '/portfolio/google-parquet-corridoio-01.jpg',
  heroAlt: 'Interno residenziale - Arteparquet Bergamo. Per bagno e umidità valutiamo SPC, non il legno in foto.',
  trustStrip: ['Valutazione gratuita', 'Senza impegno', 'Adatto all’umido', 'Dal 1996'],
  problemsTitle: 'Il parquet non è adatto a quel locale?',
  problemsIntro:
    'Bagno, cucina, taverna umida: il legno massello può non essere la scelta. Lo SPC è impermeabile e si posa come alternativa, senza fingere che sia parquet.',
  problems: [
    {
      title: 'Bagno o zona doccia',
      desc: 'Serve un piano che non tema l’acqua. Lo SPC è pensato per ambienti umidi.',
    },
    {
      title: 'Cucina e schizzi',
      desc: 'Un’alternativa al parquet dove il legno soffrirebbe di più.',
    },
    {
      title: 'Vuoi l’aspetto legno, non il legno',
      desc: 'Finiture effetto legno, con comportamento da pavimento tecnico. Te lo spieghiamo in chiaro, senza confonderlo col massello.',
    },
    {
      title: 'Ristrutturazione bagno / cucina',
      desc: 'Possiamo valutare SPC in posa professionale, coordinata col resto della casa.',
    },
    {
      title: 'Hai già piastrelle e vuoi cambiare',
      desc: 'Dalle foto del locale capiamo vincoli, soglie e se lo SPC è realistico.',
    },
    {
      title: 'Non sai se parquet o SPC',
      desc: 'Lo decidiamo insieme: legno dove sta bene, SPC dove l’acqua è un tema.',
    },
  ],
  midCta: 'Invia le foto del locale su WhatsApp',
  portfolio: [
    {
      src: '/portfolio/google-parquet-corridoio-01.jpg',
      alt: 'Posa pavimento residenziale - Arteparquet Bergamo',
      tag: 'Posa',
      title: 'Posa in interno residenziale',
      place: 'Bergamo - foto di cantiere legno; per bagno valutiamo SPC',
    },
    {
      src: '/portfolio/posa-parquet-camera-01.jpg',
      alt: 'Posa pavimento in camera - Arteparquet',
      tag: 'Posa',
      title: 'Posa in ambiente domestico',
      place: 'Bergamo',
    },
    {
      src: '/portfolio/google-posa-listoni-01.jpg',
      alt: 'Posa listoni - Arteparquet Bergamo',
      tag: 'Posa',
      title: 'Posa listoni',
      place: 'Bergamo',
    },
  ],
  caseStudies: [
    {
      src: '/portfolio/google-parquet-corridoio-01.jpg',
      alt: 'Cantiere residenziale Arteparquet - Bergamo',
      tag: 'Posa',
      title: 'Interni residenziali',
      place: 'Bergamo | Posa professionale | Per locali umidi proponiamo SPC in sopralluogo',
    },
    {
      src: '/portfolio/google-posa-listoni-01.jpg',
      alt: 'Posa listoni - Arteparquet Bergamo',
      tag: 'Posa',
      title: 'Listoni in casa',
      place: 'Bergamo | Legno in zona giorno; SPC dove serve impermeabilità',
    },
  ],
  servicesLead:
    'SPC e PVC per locali umidi; parquet dove il legno è la scelta giusta. Nessuna foto di stock SPC: i cantieri in galleria sono lavori reali in legno.',
  faqs: [
    {
      q: 'Lo SPC è parquet?',
      a: 'No. È un pavimento vinilico rigido, impermeabile, spesso effetto legno. Non è legno massello. Lo spieghiamo così, senza confondere i materiali.',
    },
    {
      q: 'Va bene in bagno?',
      a: 'Sì, è tra le destinazioni per cui si valuta lo SPC. Vincoli di soglie, scarichi e umidità di risalita li vediamo in sopralluogo.',
    },
    {
      q: 'Avete foto di bagni in SPC?',
      a: 'In questa pagina mostriamo cantieri reali in legno già in archivio. Per lo SPC valutiamo il vostro locale dalle foto che ci mandate, senza inventare un “prima/dopo” che non abbiamo.',
    },
    {
      q: 'Dove operate?',
      a: 'Sede a Bergamo, Via Vittorio Alfieri 7, e in Lombardia. Scrivi la città nel messaggio.',
    },
    {
      q: 'Dopo le foto cosa succede?',
      a: 'Rispondiamo in orario lavorativo. Se lo SPC (o il parquet) è adatto, organizziamo sopralluogo gratuito e un preventivo scritto.',
    },
  ],
  formTitle: 'Invia le foto del locale per lo SPC',
  formIntro:
    'Foto del bagno, della cucina o della stanza umida. Ti rispondiamo in orario lavorativo. Nessun impegno.',
}
