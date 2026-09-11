import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, MessageCircle, CheckCircle, Star, Clock } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { BreadcrumbSchema, LocalServiceSchema, ServiceFaqSchema } from '@/components/seo/json-ld'
import { ZoneViewTracker } from '@/components/analytics/page-view-tracker'

// ── Città supportate ---
const CITIES: Record<string, { display: string; region: string; province: string; lat: string; lng: string; isTown?: boolean }> = {
  // Capoluoghi Lombardia
  milano:  { display: 'Milano',  region: 'Lombardia', province: 'MI', lat: '45.464200', lng: '9.190000' },
  bergamo: { display: 'Bergamo', region: 'Lombardia', province: 'BG', lat: '45.698300', lng: '9.677300' },
  brescia: { display: 'Brescia', region: 'Lombardia', province: 'BS', lat: '45.541600', lng: '10.211800' },
  como:    { display: 'Como',    region: 'Lombardia', province: 'CO', lat: '45.808500', lng: '9.085100' },
  monza:   { display: 'Monza',   region: 'Lombardia', province: 'MB', lat: '45.584500', lng: '9.274400' },
  varese:  { display: 'Varese',  region: 'Lombardia', province: 'VA', lat: '45.820500', lng: '8.825700' },
  lecco:   { display: 'Lecco',   region: 'Lombardia', province: 'LC', lat: '45.856600', lng: '9.397600' },
  lodi:    { display: 'Lodi',    region: 'Lombardia', province: 'LO', lat: '45.312900', lng: '9.504200' },
  pavia:   { display: 'Pavia',   region: 'Lombardia', province: 'PV', lat: '45.184400', lng: '9.158200' },
  cremona: { display: 'Cremona', region: 'Lombardia', province: 'CR', lat: '45.133200', lng: '10.025300' },
  mantova: { display: 'Mantova', region: 'Lombardia', province: 'MN', lat: '45.156400', lng: '10.791400' },
  // Comuni provincia di Bergamo
  seriate:        { display: 'Seriate',        region: 'Lombardia', province: 'BG', lat: '45.681000', lng: '9.723000', isTown: true },
  dalmine:        { display: 'Dalmine',        region: 'Lombardia', province: 'BG', lat: '45.649000', lng: '9.605000', isTown: true },
  treviglio:      { display: 'Treviglio',      region: 'Lombardia', province: 'BG', lat: '45.521000', lng: '9.588000', isTown: true },
  albino:         { display: 'Albino',         region: 'Lombardia', province: 'BG', lat: '45.765000', lng: '9.800000', isTown: true },
  zanica:         { display: 'Zanica',         region: 'Lombardia', province: 'BG', lat: '45.651000', lng: '9.700000', isTown: true },
  stezzano:       { display: 'Stezzano',       region: 'Lombardia', province: 'BG', lat: '45.668000', lng: '9.651000', isTown: true },
  curno:          { display: 'Curno',          region: 'Lombardia', province: 'BG', lat: '45.694000', lng: '9.622000', isTown: true },
  azzano:         { display: 'Azzano San Paolo', region: 'Lombardia', province: 'BG', lat: '45.644000', lng: '9.671000', isTown: true },
  gorle:          { display: 'Gorle',          region: 'Lombardia', province: 'BG', lat: '45.702000', lng: '9.706000', isTown: true },
  scanzorosciate: { display: 'Scanzorosciate', region: 'Lombardia', province: 'BG', lat: '45.718000', lng: '9.738000', isTown: true },
  lallio:         { display: 'Lallio',         region: 'Lombardia', province: 'BG', lat: '45.680000', lng: '9.640000', isTown: true },
  grassobbio:     { display: 'Grassobbio',     region: 'Lombardia', province: 'BG', lat: '45.662000', lng: '9.706000', isTown: true },
  orio:           { display: 'Orio al Serio',  region: 'Lombardia', province: 'BG', lat: '45.670000', lng: '9.700000', isTown: true },
  romano:         { display: 'Romano di Lombardia', region: 'Lombardia', province: 'BG', lat: '45.518000', lng: '9.750000', isTown: true },
  clusone:        { display: 'Clusone',        region: 'Lombardia', province: 'BG', lat: '45.889000', lng: '9.943000', isTown: true },
}

// ── Contenuto unico per città (prevenzione thin content) ---
const CITY_CONTENT: Record<string, {
  intro: string
  highlights: string[]
  zones?: string[]
  faq: { q: string; a: string }[]
}> = {
  bergamo: {
    intro: `Bergamo è la nostra sede principale. Operiamo quotidianamente nella città e in tutta la provincia, dalla Città Alta alle zone residenziali di pianura. Conosciamo le caratteristiche costruttive degli edifici bergamaschi - dagli appartamenti in Città Alta ai condomini moderni di Loreto e Boccaleone - e sappiamo adattare ogni intervento alle specificità locali. La nostra sede è in Via Vittorio Alfieri 7, a Bergamo città.`,
    highlights: [
      'Sopralluogo entro 24 ore in città e provincia',
      'Sede operativa a Bergamo - Via Vittorio Alfieri 7',
      'Conoscenza approfondita del territorio bergamasco',
      'Interventi sia in Città Alta che in pianura',
    ],
    zones: ['Città Alta', 'Longuelo', 'Loreto', 'Boccaleone', 'Dalmine', 'Seriate', 'Azzano San Paolo', 'Stezzano', 'Lallio', 'Curno'],
    faq: [
      { q: 'Fate sopralluogo a Bergamo in giornata?', a: 'Sì. La sede è in Via Vittorio Alfieri 7: in città e hinterland (Dalmine, Seriate, Stezzano, Curno) arriviamo spesso lo stesso giorno o il giorno successivo.' },
      { q: 'Intervenite anche in Città Alta?', a: 'Sì. Lavoriamo sia negli appartamenti storici di Città Alta, dove il parquet antico richiede restauro delicato, sia nei condomini moderni di Loreto e Boccaleone.' },
      { q: 'Quanto costa la posa parquet a Bergamo?', a: 'Dipende da essenza, metratura e sottofondo. Il sopralluogo a Bergamo è gratuito e il preventivo scritto arriva entro 24 ore, senza impegno.' },
    ],
  },
  milano: {
    intro: `Milano è il nostro secondo mercato principale. Operiamo regolarmente nelle zone residenziali di pregio e nei cantieri privati della città. La nostra partecipazione al progetto del Teatro alla Scala di Milano nel 2004 testimonia la capacità di operare ai massimi livelli. Raggiungiamo Milano e hinterland con sopralluogo gratuito incluso nel preventivo.`,
    highlights: [
      'Esperienza diretta Teatro alla Scala (2004)',
      'Zone di pregio: Brera, Navigli, Porta Romana',
      'Preventivo gratuito entro 24 ore',
      'Interventi residenziali e commerciali',
    ],
    zones: ['Brera', 'Navigli', 'Porta Romana', 'Isola', 'City Life', 'Prati', 'Sempione', 'Porta Venezia'],
    faq: [
      { q: 'Fate posa parquet a Milano e hinterland?', a: 'Sì. Copriamo Milano città (Brera, Navigli, Porta Romana, Isola, City Life) e hinterland. Il sopralluogo è gratuito e incluso nel preventivo.' },
      { q: 'Avete esperienza su cantieri di pregio a Milano?', a: 'Sì. Nel 2004 abbiamo partecipato in team al progetto del Teatro alla Scala. Oggi applichiamo lo stesso standard su residenze private e immobili commerciali milanesi.' },
      { q: 'In quanto tempo arriva il preventivo a Milano?', a: 'Entro 24 ore dal sopralluogo. Per urgenze in città rispondiamo su WhatsApp entro pochi minuti in orario lavorativo.' },
    ],
  },
  brescia: {
    intro: `Operiamo regolarmente a Brescia e in tutta la provincia per posa, restauro e levigatura parquet. La nostra squadra raggiunge Brescia con sopralluogo gratuito incluso nel preventivo. Serviamo sia residenze private che immobili commerciali, con la stessa cura e professionalità che mettiamo in ogni cantiere.`,
    highlights: [
      'Sopralluogo gratuito a Brescia e provincia',
      'Preventivo dettagliato in 24 ore',
      'Posa, restauro e levigatura parquet',
      'Garanzia scritta sulla manodopera',
    ],
    zones: ['Brescia centro', 'Rezzato', 'Roncadelle', 'Castegnato', 'Palazzolo sull\'Oglio'],
    faq: [
      { q: 'Coprite Brescia e tutta la provincia?', a: 'Sì. Operiamo a Brescia centro, Rezzato, Roncadelle, Castegnato e Palazzolo sull\'Oglio, con sopralluogo gratuito incluso nel preventivo.' },
      { q: 'Fate anche levigatura e restauro a Brescia?', a: 'Sì. Oltre alla posa nuova, levighiamo e restauriamo parquet esistenti in residenze private e immobili commerciali della provincia.' },
      { q: 'Il preventivo a Brescia è senza impegno?', a: 'Sì. Sopralluogo gratuito, preventivo dettagliato in 24 ore e garanzia scritta sulla manodopera.' },
    ],
  },
  como: {
    intro: `Como e il suo territorio lacuale richiedono attenzione particolare all'umidità e alle escursioni termiche stagionali. La nostra esperienza ci permette di scegliere i materiali e le tecniche di posa più adatti agli ambienti lacuali, dove l'umidità può compromettere un parquet mal installato. Utilizziamo barriere al vapore specifiche e collanti certificati per ambienti umidi.`,
    highlights: [
      'Esperienza specifica ambienti lacuali e umidi',
      'Materiali e collanti certificati per alta umidità',
      'Sopralluogo gratuito a Como e provincia',
      'Garanzia scritta sulla posa',
    ],
    zones: ['Como centro', 'Cernobbio', 'Brunate', 'Erba', 'Cantù', 'Mariano Comense'],
    faq: [
      { q: 'Il parquet resiste all\'umidità del lago di Como?', a: 'Sì, se posato correttamente. A Como usiamo barriere al vapore e collanti certificati per ambienti lacuali, dove l\'umidità stagionale può compromettere una posa standard.' },
      { q: 'Coprite anche Cernobbio, Erba e Cantù?', a: 'Sì. Raggiungiamo Como centro, Cernobbio, Brunate, Erba, Cantù e Mariano Comense con sopralluogo gratuito.' },
      { q: 'Quale parquet consigliate nelle case sul lago?', a: 'Dipende dal sottofondo e dall\'esposizione. Spesso il prefinito o essenze stabili come il rovere sono la scelta più sicura; lo valutiamo in sopralluogo.' },
    ],
  },
  monza: {
    intro: `Monza e la Brianza sono zone ad alta richiesta per parquet di qualità. Serviamo Monza e tutti i comuni limitrofi della Brianza con sopralluogo gratuito e preventivo dettagliato entro 24 ore. La vicinanza a Milano e la presenza di immobili di pregio rendono la Brianza un territorio dove la qualità del parquet è particolarmente apprezzata.`,
    highlights: [
      'Copertura completa Monza e Brianza',
      'Sopralluogo gratuito in tutta la provincia',
      'Preventivo in 24 ore senza impegno',
      'Interventi residenziali e ville private',
    ],
    zones: ['Monza', 'Desio', 'Seregno', 'Lissone', 'Cesano Maderno', 'Carate Brianza', 'Vimercate'],
    faq: [
      { q: 'Fate posa parquet a Monza e in Brianza?', a: 'Sì. Copriamo Monza, Desio, Seregno, Lissone, Cesano Maderno, Carate Brianza e Vimercate, con sopralluogo gratuito in tutta la provincia.' },
      { q: 'Lavorate anche su ville private in Brianza?', a: 'Sì. La Brianza ha molti immobili di pregio: posiamo massello e prefinito, schemi a spina di pesce e restauri di parquet esistenti.' },
      { q: 'Quanto tempo serve per un preventivo a Monza?', a: 'Sopralluogo gratuito e preventivo dettagliato entro 24 ore, senza impegno.' },
    ],
  },
  varese: {
    intro: `Operiamo a Varese e provincia per tutti i servizi parquet: posa di parquet massello e prefinito, levigatura e restauro di parquet esistenti, installazione di SPC, PVC e laminato. Raggiungiamo la zona lacuale varesina con sopralluogo gratuito incluso nel preventivo. Risposta garantita entro 24 ore dalla richiesta.`,
    highlights: [
      'Copertura Varese e provincia',
      'Sopralluogo gratuito incluso',
      'Preventivo in 24 ore',
      'Garanzia scritta sulla manodopera',
    ],
    zones: ['Varese', 'Busto Arsizio', 'Gallarate', 'Saronno', 'Luino', 'Laveno-Mombello'],
    faq: [
      { q: 'Operate a Varese, Busto Arsizio e Gallarate?', a: 'Sì. Copriamo Varese città, Busto Arsizio, Gallarate, Saronno e la zona lacuale (Luino, Laveno-Mombello) con sopralluogo gratuito.' },
      { q: 'Posate anche SPC e PVC a Varese?', a: 'Sì. Oltre a massello e prefinito installiamo SPC, PVC e laminato, utili in ambienti umidi o per ristrutturazioni veloci.' },
      { q: 'Quanto tempo per la risposta a Varese?', a: 'Risposta garantita entro 24 ore dalla richiesta. Il preventivo è gratuito e senza impegno.' },
    ],
  },
  lecco: {
    intro: `Lecco e il territorio lariano richiedono, come Como, competenza specifica per ambienti in quota e vicini al lago. L'umidità del Lago di Como e le escursioni termiche invernali impongono una scelta accurata di materiali e barriere al vapore. Operiamo a Lecco e in tutta la provincia con sopralluogo gratuito e preventivo dettagliato.`,
    highlights: [
      'Esperienza ambienti lacuali e montagna',
      'Materiali certificati per alta umidità',
      'Sopralluogo gratuito a Lecco e provincia',
      'Preventivo senza impegno in 24 ore',
    ],
    zones: ['Lecco', 'Merate', 'Calolziocorte', 'Mandello del Lario', 'Bellano'],
    faq: [
      { q: 'Il territorio lariano richiede una posa particolare?', a: 'Sì. A Lecco l\'umidità del lago e le escursioni termiche in quota impongono barriere al vapore e materiali certificati. Lo valutiamo sempre in sopralluogo.' },
      { q: 'Coprite Merate, Mandello e Bellano?', a: 'Sì. Operiamo a Lecco, Merate, Calolziocorte, Mandello del Lario e Bellano, con preventivo gratuito entro 24 ore.' },
      { q: 'Fate restauro parquet a Lecco?', a: 'Sì. Recuperiamo parquet esistenti e posiamo massello o prefinito nuovo, con garanzia scritta sulla manodopera.' },
    ],
  },
  lodi: {
    intro: `Operiamo a Lodi e nel lodigiano per posa, restauro e levigatura parquet. La pianura lodigiana ospita numerosi immobili storici e ville padronali dove il parquet massello originale richiede attenzione e competenza specializzata. Offriamo sopralluogo gratuito e preventivo dettagliato entro 24 ore dalla richiesta.`,
    highlights: [
      'Esperienza parquet storico e massello',
      'Sopralluogo gratuito a Lodi e provincia',
      'Preventivo in 24 ore',
      'Garanzia scritta sulla posa',
    ],
    zones: ['Lodi', 'Codogno', 'Casalpusterlengo', 'Sant\'Angelo Lodigiano', 'Lodi Vecchio'],
    faq: [
      { q: 'Restauriate parquet storici nel lodigiano?', a: 'Sì. La pianura lodigiana ha ville padronali e immobili storici con massello originale: valutiamo spessore residuo, umidità e listelli da sostituire prima di ogni intervento.' },
      { q: 'Coprite Codogno e Casalpusterlengo?', a: 'Sì. Operiamo a Lodi, Codogno, Casalpusterlengo, Sant\'Angelo Lodigiano e Lodi Vecchio, con sopralluogo gratuito.' },
      { q: 'Il preventivo a Lodi è gratuito?', a: 'Sì. Sopralluogo e preventivo dettagliato entro 24 ore, senza impegno, con garanzia scritta sulla posa.' },
    ],
  },
  pavia: {
    intro: `Serviamo Pavia e la zona del pavese per tutti i servizi parquet. Pavia è una città universitaria con un vasto patrimonio di edifici storici - appartamenti e palazzi dove il parquet vecchio necessita di restauro o levigatura professionale. Raggiungiamo Pavia con sopralluogo gratuito incluso nel preventivo, con risposta entro 24 ore.`,
    highlights: [
      'Esperienza parquet storico e restauro',
      'Sopralluogo gratuito a Pavia e provincia',
      'Preventivo in 24 ore senza impegno',
      'Garanzia scritta sulla manodopera',
    ],
    zones: ['Pavia', 'Vigevano', 'Voghera', 'Mortara', 'Stradella', 'Certosa di Pavia'],
    faq: [
      { q: 'Lavorate sul parquet degli edifici storici di Pavia?', a: 'Sì. Pavia ha un patrimonio di palazzi e appartamenti universitari con parquet vecchio: facciamo levigatura, restauro e sostituzione selettiva dei listelli.' },
      { q: 'Coprite Vigevano, Voghera e Certosa?', a: 'Sì. Raggiungiamo Pavia, Vigevano, Voghera, Mortara, Stradella e Certosa di Pavia con sopralluogo gratuito incluso nel preventivo.' },
      { q: 'Quanto tempo per un preventivo a Pavia?', a: 'Risposta entro 24 ore. Sopralluogo gratuito e preventivo senza impegno, con garanzia scritta sulla manodopera.' },
    ],
  },
  cremona: {
    intro: `Operiamo a Cremona e provincia per posa, restauro e levigatura parquet in ambienti residenziali e storici. Cremona, città della liuteria e del violino, è ricca di edifici storici e palazzi dove il parquet tradizionale in legno è parte integrante del valore immobiliare. La nostra esperienza con il legno massello di qualità si sposa perfettamente con le esigenze di questa città.`,
    highlights: [
      'Esperienza parquet in edifici storici e vincolati',
      'Sopralluogo gratuito a Cremona e provincia',
      'Preventivo dettagliato in 24 ore',
      'Garanzia scritta sulla posa',
    ],
    zones: ['Cremona', 'Crema', 'Casalmaggiore', 'Soresina', 'Pizzighettone'],
    faq: [
      { q: 'Intervenite su parquet in palazzi storici a Cremona?', a: 'Sì. Cremona è ricca di edifici dove il legno massello è parte del valore immobiliare: posiamo e restauriamo con rispetto dei materiali originali.' },
      { q: 'Coprite anche Crema e Casalmaggiore?', a: 'Sì. Operiamo a Cremona, Crema, Casalmaggiore, Soresina e Pizzighettone, con sopralluogo gratuito in provincia.' },
      { q: 'Il preventivo a Cremona è senza impegno?', a: 'Sì. Sopralluogo gratuito, preventivo dettagliato in 24 ore e garanzia scritta sulla posa.' },
    ],
  },
  mantova: {
    intro: `Mantova e il mantovano sono raggiunti dal nostro team per qualsiasi intervento parquet. Mantova, patrimonio UNESCO, è una città di grande valore storico dove gli edifici antichi richiedono artigiani esperti con rispetto per i materiali originali. Operiamo con sopralluogo gratuito e preventivo dettagliato senza impegno, garantendo la massima cura per ogni ambiente.`,
    highlights: [
      'Esperienza interventi in contesti storici UNESCO',
      'Sopralluogo gratuito a Mantova e provincia',
      'Preventivo senza impegno in 24 ore',
      'Garanzia scritta sulla manodopera',
    ],
    zones: ['Mantova', 'Suzzara', 'Guidizzolo', 'Viadana', 'Asola', 'Castiglione delle Stiviere'],
    faq: [
      { q: 'Lavorate su edifici storici a Mantova?', a: 'Sì. Mantova è patrimonio UNESCO: interveniamo su parquet in contesti storici con cura per i materiali originali e, dove serve, con tecniche di restauro conservative.' },
      { q: 'Coprite Suzzara, Viadana e Castiglione?', a: 'Sì. Raggiungiamo Mantova, Suzzara, Guidizzolo, Viadana, Asola e Castiglione delle Stiviere con sopralluogo gratuito.' },
      { q: 'Quanto costa un sopralluogo a Mantova?', a: 'Il sopralluogo è gratuito. Il preventivo arriva entro 24 ore, senza impegno, con garanzia scritta sulla manodopera.' },
    ],
  },
  // ── Comuni provincia BG ---
  seriate: {
    intro: `Seriate è uno dei comuni più vicini a Bergamo città, a pochi chilometri dalla nostra sede in Via Vittorio Alfieri 7. Operiamo a Seriate quotidianamente per posa, restauro e levigatura parquet in appartamenti, villette e condomini. Il sopralluogo gratuito viene organizzato spesso in giornata.`,
    highlights: ['Sopralluogo in giornata da Bergamo', 'Conoscenza del territorio seriate', 'Preventivo entro 24 ore', 'Garanzia scritta sulla manodopera'],
    faq: [
      { q: 'Fate posa parquet a Seriate?', a: 'Sì. Seriate è a pochi chilometri dalla nostra sede a Bergamo: sopralluogo gratuito spesso in giornata, preventivo entro 24 ore.' },
      { q: 'Quale parquet consigliate per gli appartamenti a Seriate?', a: 'Dipende dal sottofondo e dal riscaldamento. In sopralluogo valutiamo umidità residua e tipo di massetto per consigliarti massello, prefinito o SPC.' },
    ],
  },
  dalmine: {
    intro: `Dalmine e il suo polo industriale ospitano anche numerosi complessi residenziali e abitazioni private dove il parquet rappresenta la scelta premium. Raggiungiamo Dalmine rapidamente dalla nostra sede bergamasca per sopralluogo gratuito e preventivo dettagliato.`,
    highlights: ['Rapida raggiungibilità da Bergamo', 'Servizio residenziale e commerciale', 'Preventivo gratuito entro 24 ore', 'Garanzia scritta sulla posa'],
    faq: [
      { q: 'Operate a Dalmine per la posa parquet?', a: 'Sì. Dalmine è a pochi minuti da Bergamo: sopralluogo gratuito e preventivo dettagliato entro 24 ore, senza impegno.' },
      { q: 'Fate anche levigatura parquet a Dalmine?', a: 'Sì. Levighiamo parquet esistenti con macchine a bassa emissione di polvere, sia in abitazioni private che in spazi commerciali.' },
    ],
  },
  treviglio: {
    intro: `Treviglio è il principale centro della Bassa Bergamasca, un territorio con un crescente mercato immobiliare residenziale. Serviamo Treviglio e i comuni della pianura bergamasca per posa, restauro e levigatura parquet. Sopralluogo gratuito con preventivo entro 24 ore.`,
    highlights: ['Copertura Treviglio e Bassa Bergamasca', 'Preventivo gratuito in 24 ore', 'Posa, restauro e levigatura', 'Garanzia scritta sulla manodopera'],
    faq: [
      { q: 'Raggiungete Treviglio per la posa del parquet?', a: 'Sì. Operiamo a Treviglio e in tutta la Bassa Bergamasca con sopralluogo gratuito e preventivo senza impegno.' },
      { q: 'Posate anche SPC e PVC a Treviglio?', a: 'Sì. Oltre al parquet tradizionale, installiamo SPC, PVC e laminato, utili per ristrutturazioni rapide o ambienti umidi.' },
    ],
  },
  albino: {
    intro: `Albino è il principale comune della Val Seriana, una vallata con numerosi edifici storici e residenze di pregio. L'umidità della valle richiede attenzione nella scelta del materiale e nella preparazione del sottofondo. La nostra esperienza trentennale garantisce interventi sicuri anche in ambienti difficili.`,
    highlights: ['Esperienza in ambienti vallivi e umidi', 'Materiali certificati per alta umidità', 'Sopralluogo gratuito in Val Seriana', 'Preventivo senza impegno'],
    faq: [
      { q: 'Il parquet si adatta agli ambienti umidi di Albino e Val Seriana?', a: 'Sì, con le giuste precauzioni. Valutiamo umidità residua e ventilazione in sopralluogo, e consigliamo il materiale più adatto (es. prefinito stabile o SPC per ambienti più umidi).' },
      { q: 'Fate sopralluogo ad Albino?', a: 'Sì. Raggiungiamo Albino e la Val Seriana con sopralluogo gratuito, preventivo dettagliato entro 24 ore.' },
    ],
  },
  zanica: {
    intro: `Zanica è un comune della pianura bergamasca in forte espansione residenziale. Nuove costruzioni e ristrutturazioni rendono Zanica un mercato attivo per l'installazione di pavimenti in legno. Operiamo a Zanica con sopralluogo gratuito e preventivo entro 24 ore.`,
    highlights: ['Copertura Zanica e hinterland bergamasco', 'Nuove installazioni e ristrutturazioni', 'Sopralluogo gratuito', 'Preventivo in 24 ore'],
    faq: [
      { q: 'Posate parquet a Zanica?', a: 'Sì. Zanica è a pochi chilometri da Bergamo: raggiungiamo il cantiere in giornata per il sopralluogo gratuito.' },
      { q: 'Qual è il parquet consigliato per le nuove costruzioni a Zanica?', a: 'Per le nuove costruzioni con massetto cementizio fresco consigliamo massello o prefinito incollato, previa verifica dell\'umidità residua del sottofondo.' },
    ],
  },
  stezzano: {
    intro: `Stezzano è un comune dell'hinterland bergamasco confinante con la città. Raggiungiamo Stezzano quotidianamente per sopralluogo e posa parquet. La vicinanza alla sede di Bergamo consente risposte rapide e interventi in giornata per urgenze.`,
    highlights: ['Vicinanza alla sede di Bergamo', 'Interventi rapidi anche in urgenza', 'Posa, restauro e levigatura', 'Preventivo gratuito entro 24 ore'],
    faq: [
      { q: 'Operate a Stezzano?', a: 'Sì. Stezzano confina con Bergamo: siamo spesso disponibili per il sopralluogo gratuito già in giornata.' },
      { q: 'Fate levigatura parquet a Stezzano?', a: 'Sì. Levighiamo parquet esistenti con macchine professionali ad aspirazione integrata, per un risultato senza polvere.' },
    ],
  },
  curno: {
    intro: `Curno è un comune strategico a nord di Bergamo, a pochi minuti dall'uscita autostradale A4. Serviamo Curno e la zona nord di Bergamo per tutti i servizi parquet: posa, restauro, levigatura e riparazione. Sopralluogo gratuito con risposta rapida.`,
    highlights: ['Posizione strategica vicino A4', 'Rapida raggiungibilità', 'Tutti i servizi parquet disponibili', 'Preventivo entro 24 ore'],
    faq: [
      { q: 'Fate posa parquet a Curno?', a: 'Sì. Curno è a pochi minuti dalla nostra sede di Bergamo. Organizziamo il sopralluogo gratuito spesso in giornata.' },
      { q: 'Intervenite anche per piccole riparazioni a Curno?', a: 'Sì. Scricchiolii, listelli rotti, bordi sollevati: interveniamo anche su piccole superfici, senza costi minimi eccessivi.' },
    ],
  },
  azzano: {
    intro: `Azzano San Paolo è un comune dell'hinterland bergamasco sud-ovest, in crescita residenziale. Raggiungiamo Azzano San Paolo con sopralluogo gratuito per posa, restauro e levigatura parquet. La vicinanza all'aeroporto di Orio al Serio rende questa zona facilmente accessibile.`,
    highlights: ['Zona hinterland bergamasco sud-ovest', 'Nuove costruzioni e ristrutturazioni', 'Sopralluogo gratuito', 'Preventivo senza impegno'],
    faq: [
      { q: 'Posate parquet ad Azzano San Paolo?', a: 'Sì. Raggiungiamo Azzano San Paolo con sopralluogo gratuito e preventivo entro 24 ore.' },
      { q: 'Lavorate anche in zone industriali e commerciali ad Azzano?', a: 'Sì. Installiamo pavimentazioni in legno, SPC e vinilico anche in ambienti commerciali e uffici.' },
    ],
  },
  gorle: {
    intro: `Gorle è un comune dell'hinterland bergamasco est, residenziale e tranquillo. Serviamo Gorle per posa, restauro e levigatura parquet in abitazioni private e condomini. Sopralluogo gratuito dalla sede di Bergamo, spesso in giornata.`,
    highlights: ['Hinterland bergamasco est', 'Sopralluogo in giornata', 'Posa, restauro, levigatura', 'Preventivo entro 24 ore'],
    faq: [
      { q: 'Fate posa parquet a Gorle?', a: 'Sì. Gorle è adiacente a Bergamo: sopralluogo gratuito spesso in giornata, preventivo dettagliato entro 24 ore.' },
    ],
  },
  scanzorosciate: {
    intro: `Scanzorosciate è nota per il Moscato di Scanzo, uno dei DOCG più pregiati d'Italia, e per le sue ville e residenze di charme. Il parquet è una scelta naturale per queste abitazioni. Operiamo a Scanzorosciate con posa di massello e prefinito di qualità, sopralluogo gratuito incluso.`,
    highlights: ['Zona residenziale di pregio', 'Parquet massello e prefinito di qualità', 'Sopralluogo gratuito', 'Garanzia scritta'],
    faq: [
      { q: 'Posate parquet nelle ville di Scanzorosciate?', a: 'Sì. Scanzorosciate ha ville e residenze di pregio: lavoriamo con massello e prefinito di qualità, schemi a spina di pesce e finiture naturali a olio.' },
    ],
  },
  lallio: {
    intro: `Lallio è un piccolo comune a nord di Bergamo con un tessuto residenziale consolidato. Raggiungiamo Lallio rapidamente per sopralluogo gratuito e posa parquet, sia in appartamenti che in villette. Preventivo dettagliato entro 24 ore, senza impegno.`,
    highlights: ['Comune residenziale a nord di Bergamo', 'Sopralluogo in giornata', 'Preventivo gratuito in 24 ore', 'Garanzia scritta'],
    faq: [
      { q: 'Fate posa parquet a Lallio?', a: 'Sì. Lallio è a pochi minuti da Bergamo: sopralluogo gratuito e preventivo entro 24 ore.' },
    ],
  },
  grassobbio: {
    intro: `Grassobbio è un comune industriale e residenziale vicino all'aeroporto di Orio al Serio. Serviamo Grassobbio per posa, restauro e levigatura parquet, sia in residenze private che in spazi commerciali. Sopralluogo gratuito, preventivo entro 24 ore.`,
    highlights: ['Vicino aeroporto Orio al Serio', 'Residenziale e commerciale', 'Sopralluogo gratuito', 'Preventivo in 24 ore'],
    faq: [
      { q: 'Operate a Grassobbio per la posa parquet?', a: 'Sì. Grassobbio è a pochi minuti da Bergamo: prenotiamo il sopralluogo gratuito in tempi brevi.' },
    ],
  },
  orio: {
    intro: `Orio al Serio, sede dell'aeroporto internazionale di Bergamo, è un comune con un tessuto commerciale e residenziale vivace. Raggiungiamo Orio al Serio per posa parquet, SPC e vinilico sia in abitazioni private che in strutture commerciali. Risposta rapida, sopralluogo gratuito.`,
    highlights: ['Zona aeroporto e polo commerciale', 'Residenziale e commerciale', 'SPC e vinilico per ambienti ad alto traffico', 'Preventivo entro 24 ore'],
    faq: [
      { q: 'Fate posa parquet a Orio al Serio?', a: 'Sì. Raggiungiamo Orio al Serio per sopralluogo gratuito e posa parquet, SPC o vinilico, sia in abitazioni che in ambienti commerciali.' },
    ],
  },
  romano: {
    intro: `Romano di Lombardia è il principale centro della Bassa Bergamasca occidentale. Operiamo a Romano di Lombardia per posa, restauro e levigatura parquet. La cittadina ha numerosi immobili storici e nuove costruzioni, entrambi mercati in cui siamo specializzati.`,
    highlights: ['Centro Bassa Bergamasca occidentale', 'Storico e nuove costruzioni', 'Sopralluogo gratuito', 'Preventivo in 24 ore'],
    faq: [
      { q: 'Raggiungete Romano di Lombardia?', a: 'Sì. Operiamo a Romano di Lombardia con sopralluogo gratuito e preventivo dettagliato entro 24 ore.' },
    ],
  },
  clusone: {
    intro: `Clusone è il capoluogo della Val Seriana alta, un territorio montano con edifici tradizionali in legno e pietra dove il parquet massello è spesso parte dell'architettura originale. L'umidità montana e le escursioni termiche richiedono materiali certificati e tecniche di posa specifiche. Valutiamo sempre in sopralluogo gratuito.`,
    highlights: ['Esperienza ambienti montani e alta umidità', 'Parquet massello storico e restauro', 'Sopralluogo gratuito in Val Seriana alta', 'Preventivo senza impegno'],
    faq: [
      { q: 'Raggiungete Clusone per la posa o il restauro parquet?', a: 'Sì. Raggiungiamo Clusone e la Val Seriana alta. L\'ambiente montano richiede materiali e tecniche specifiche che conosciamo bene dopo 30 anni di attività.' },
      { q: 'Il parquet massello antico di Clusone è recuperabile?', a: 'Nella stragrande maggioranza dei casi sì. Valutiamo spessore residuo e stato delle assi durante il sopralluogo gratuito.' },
    ],
  },
}

// Normalizza slug: "parquet-seriate" → "seriate", "parquet-azzano-san-paolo" → "azzano" etc.
const SLUG_MAP: Record<string, string> = {
  'parquet-azzano-san-paolo': 'azzano',
  'parquet-orio-al-serio': 'orio',
  'parquet-romano-di-lombardia': 'romano',
}

function extractCity(slug: string) {
  // Explicit slug overrides
  if (SLUG_MAP[slug]) return SLUG_MAP[slug]
  // Standard: "parquet-{city}"
  if (!slug.startsWith('parquet-')) return null
  const city = slug.slice('parquet-'.length)
  return CITIES[city] ? city : null
}

// ── Static params ---
export async function generateStaticParams() {
  const explicit = Object.entries(SLUG_MAP).map(([slug]) => ({ slug }))
  const standard = Object.keys(CITIES)
    .filter((city) => !['azzano', 'orio', 'romano'].includes(city))
    .map((city) => ({ slug: `parquet-${city}` }))
  return [...standard, ...explicit]
}

// ── Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cityKey = extractCity(slug)
  if (!cityKey) return {}

  const c = CITIES[cityKey]
  const title = `Parquet ${c.display} | Posa, Restauro e Levigatura`
  const description = `Posa, restauro e levigatura parquet professionale a ${c.display} e provincia. Ex team Teatro alla Scala. 30 anni di esperienza dal 1996. Sopralluogo e preventivo gratuiti.  389 240 7827`

  return {
    title: { absolute: title },
    description,
    keywords: [
      `parquet ${c.display}`,
      `posa parquet ${c.display}`,
      `restauro parquet ${c.display}`,
      `levigatura parquet ${c.display}`,
      `posatore parquet ${c.display}`,
      `parquet ${c.province}`,
    ],
    alternates: { canonical: `https://arteparquet.pro/zone/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://arteparquet.pro/zone/${slug}`,
      locale: 'it_IT',
      images: [
        {
          url: 'https://arteparquet.pro/opengraph-image',
          width: 1200,
          height: 630,
          alt: `Arteparquet - Servizi parquet ${c.display}`,
        },
      ],
    },
  }
}

// ── Page ---
export default async function ZonePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cityKey = extractCity(slug)
  if (!cityKey) notFound()

  const c = CITIES[cityKey]!
  const cityContent = CITY_CONTENT[cityKey]
  const h1 = `Parquet a ${c.display}: Posa, Restauro e Levigatura`

  const waMessage = encodeURIComponent(
    `Ciao Arteparquet! Sono di ${c.display} e vorrei un preventivo per parquet.`
  )

  return (
    <>
      <ZoneViewTracker cityName={c.display} />
      {/* Structured data */}
      <LocalServiceSchema
        city={c.display}
        service="Servizi Parquet"
        description={`Servizio professionale di posa, restauro e levigatura parquet a ${c.display} e ${c.region}.`}
      />
      {cityContent?.faq && <ServiceFaqSchema items={cityContent.faq} />}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: `Parquet ${c.display}`, url: `https://arteparquet.pro/zone/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          {/* Breadcrumb visivo */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-rovere transition-colors">Home</Link>
            <span>/</span>
            <span className="text-rovere">Parquet {c.display}</span>
          </nav>

          <FadeIn>
            <div className="flex items-center gap-2 text-rovere text-sm font-medium mb-4">
              <MapPin size={14} />
              <span>{c.display}, {c.region}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {h1}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-8">
              Dal 1996 portiamo l'eccellenza del parquet nella tua casa a {c.display}.
              Sopralluogo e preventivo gratuiti. Ex team Teatro alla Scala di Milano.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <Phone size={18} />
                Chiama Ora: 389 240 7827
              </a>
              <a
                href={`https://wa.me/393892407827?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-rovere hover:text-rovere text-white/90 font-medium px-6 py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle size={18} />
                Scrivici su WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Servizi offerti */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                I Nostri Servizi a {c.display}
              </h2>
              <p className="text-neutral-600 mb-8 text-lg">
                Operiamo a {c.display} e in tutta la provincia di {c.province} con un team di
                maestri posatori specializzati. Ogni intervento include sopralluogo gratuito
                e preventivo dettagliato.
              </p>

              <ul className="space-y-3">
                {[
                  { label: `Posa parquet massello a ${c.display}`, href: '/servizi/parquet-massello' },
                  { label: `Posa parquet prefinito a ${c.display}`, href: '/servizi/parquet-prefinito' },
                  { label: `Posa SPC e PVC a ${c.display}`, href: '/servizi/spc' },
                  { label: `Posa laminato a ${c.display}`, href: '/servizi/laminato' },
                  { label: `Levigatura parquet ${c.display}`, href: '/servizi/levigatura' },
                  { label: `Restauro parquet antico ${c.display}`, href: '/servizi/restauro' },
                  { label: `Riparazione parquet danneggiato`, href: '/servizi/riparazioni' },
                ].map((item) => (
                  <li key={item.href} className="flex items-start gap-3 text-neutral-700">
                    <CheckCircle size={18} className="text-rovere flex-shrink-0 mt-0.5" />
                    <Link href={item.href} className="hover:text-rovere transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15} direction="left">
              {/* Card perché sceglierci */}
              <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.07)]">
                <h3 className="font-serif text-2xl font-bold mb-6">
                  Perché Scegliere Arteparquet a {c.display}
                </h3>

                <div className="space-y-5">
                  {[
                    {
                      icon: Star,
                      title: 'Ex team Teatro alla Scala',
                      desc: 'L\'esperienza maturata sui palcoscenici più prestigiosi d\'Italia, ora al servizio della tua casa.',
                    },
                    {
                      icon: CheckCircle,
                      title: '30 anni di esperienza',
                      desc: `Dal 1996 posiamo parquet in tutta Italia, inclusa ${c.display} e la ${c.region}.`,
                    },
                    {
                      icon: Clock,
                      title: 'Preventivo in 24 ore',
                      desc: 'Sopralluogo gratuito e preventivo dettagliato entro 24 ore. Nessun impegno.',
                    },
                    {
                      icon: MapPin,
                      title: `Copertura ${c.display} e provincia`,
                      desc: `Operiamo a ${c.display} città e in tutti i comuni della provincia di ${c.province}.`,
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 bg-rovere/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-rovere" />
                      </div>
                      <div>
                        <p className="font-semibold text-legno-bruciato mb-1">{title}</p>
                        <p className="text-sm text-neutral-600">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <Link
                    href="/contatti"
                    className="block w-full text-center bg-legno-bruciato hover:bg-rovere text-travertino font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    Richiedi Preventivo Gratuito a {c.display}
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contenuto unico per città */}
      {CITY_CONTENT[cityKey] && (
        <section className="bg-white py-14 md:py-20 border-t border-neutral-100">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <FadeIn>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-5">
                  Arteparquet a {c.display}
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {CITY_CONTENT[cityKey]!.intro}
                </p>
                {CITY_CONTENT[cityKey]!.zones && (
                  <div>
                    <p className="font-semibold text-legno-bruciato mb-3 text-sm uppercase tracking-wide">
                      Zone coperte a {c.display}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CITY_CONTENT[cityKey]!.zones!.map((zone) => (
                        <span
                          key={zone}
                          className="px-3 py-1 bg-wood-100 text-rovere text-sm rounded-full font-medium"
                        >
                          {zone}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </FadeIn>

              <FadeIn delay={0.1} direction="left">
                <ul className="space-y-3">
                  {CITY_CONTENT[cityKey]!.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-neutral-700">
                      <CheckCircle size={18} className="text-rovere flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {cityContent?.faq && (
        <section className="bg-white py-14 md:py-20 border-t border-neutral-100">
          <div className="container-wide">
            <FadeIn>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">
                Domande frequenti sulla posa parquet a {c.display}
              </h2>
            </FadeIn>
            <div className="max-w-3xl mx-auto space-y-4">
              {cityContent.faq.map((item) => (
                <FadeIn key={item.q}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <h3 className="font-sans font-semibold text-legno-bruciato text-[15px] mb-2">
                      {item.q}
                    </h3>
                    <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Zone coperte */}
      <section className="bg-neutral-50 py-12 md:py-16 border-t border-neutral-200">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-2xl font-bold mb-4 text-center">
              Zone Servite vicino a {c.display}
            </h2>
            <p className="text-center text-neutral-500 mb-8">
              Operiamo in tutta la {c.region} e nelle regioni limitrofe
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.values(CITIES)
                .filter((city) => city.display !== c.display)
                .map((city) => (
                  <Link
                    key={city.display}
                    href={`/zone/parquet-${city.display.toLowerCase()}`}
                    className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-700 hover:border-rovere hover:text-rovere transition-colors"
                  >
                    Parquet {city.display}
                  </Link>
                ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedLinks
        title={`Servizi parquet a ${c.display}`}
        links={[
          {
            title: 'Posa Parquet',
            href: '/servizi/posa',
            description: `Posa professionale di parquet massello e prefinito a ${c.display} e provincia.`,
          },
          {
            title: 'Levigatura Parquet',
            href: '/servizi/levigatura',
            description: `Levigatura senza polvere a ${c.display}. Macchine con aspirazione integrata.`,
          },
          {
            title: 'Restauro Parquet',
            href: '/servizi/restauro',
            description: `Restauro parquet antico e storico a ${c.display}. Recupero listelli e finiture.`,
          },
          {
            title: 'Parquet Massello',
            href: '/servizi/parquet-massello',
            description: 'Legno pieno al 100%, levigabile per decenni. Il parquet più pregiato.',
          },
        ]}
        columns={4}
      />

      {/* CTA finale */}
      <section className="bg-nero-marquina text-travertino py-16 md:py-20">
        <div className="container-wide text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Pronti per il tuo progetto a {c.display}?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Contattaci oggi per un sopralluogo gratuito. Risposta entro 1 ora.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                <Phone size={20} />
                389 240 7827
              </a>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-rovere hover:text-rovere text-white/90 font-medium px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Scrivi online
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
