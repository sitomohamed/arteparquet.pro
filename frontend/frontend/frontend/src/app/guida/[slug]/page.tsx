import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Phone, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

// ---
// DATA
// ---

interface GuideSection {
  title: string
  content: string
  list?: string[]
}

interface FaqItem {
  q: string
  a: string
}

interface Guide {
  title: string
  description: string
  category: string
  readingTime: string
  intro: string
  sections: GuideSection[]
  faq: FaqItem[]
  related: { title: string; description: string; href: string }[]
}

const GUIDES: Record<string, Guide> = {
  'costo-levigatura-parquet': {
    title: 'Costo Levigatura Parquet: Quanto Si Spende nel 2026?',
    description:
      'Scopri quanto costa la levigatura parquet a Bergamo e Lombardia. Fattori che influenzano il prezzo, cosa è incluso, come richiedere un preventivo.',
    category: 'Manutenzione',
    readingTime: '5 min',
    intro:
      'La levigatura è uno dei lavori più richiesti sul parquet: restituisce colore, rimuove graffi e rinnova la finitura senza dover sostituire il pavimento. Ma quanto costa davvero? La risposta onesta è: dipende. In questa guida ti spieghiamo da cosa dipende e come ottenere un preventivo preciso.',
    sections: [
      {
        title: 'Cosa Influenza il Costo della Levigatura',
        content:
          'Il costo di una levigatura professionale varia in base a diversi fattori, tutti valutabili durante il sopralluogo gratuito. I principali sono la superficie da trattare (espressa in metri quadri), il tipo e lo stato della finitura attuale (verniciata, oliata o cerata), le condizioni generali del parquet (quanti passaggi di abrasivo sono necessari), la necessità di stuccatura e il tipo di finitura scelta per la conclusione del lavoro.',
        list: [
          'Superficie totale in mq da trattare',
          'Stato del parquet: graffi profondi richiedono più passate abrasive',
          'Tipo di finitura scelta: vernice, olio naturale o cera',
          'Stuccatura: se i giunti sono aperti, la stuccatura richiede tempo aggiuntivo',
          'Accessibilità del cantiere: scale, ascensori piccoli o zone difficili',
          'Bordi e angoli: più complessi da trattare rispetto alla superficie centrale',
        ],
      },
      {
        title: 'La Finitura Fa la Differenza',
        content:
          "La finitura che scegli dopo la levigatura incide significativamente sul risultato finale e sul costo. La verniciatura a base acqua è la più rapida da applicare, asciuga in poche ore e ha un'ottima resistenza all'usura: è la scelta più diffusa. L'olio naturale richiede più mani e tempi di asciugatura più lunghi, ma dà un aspetto caldo e vissuto al legno, molto apprezzato per interni contemporanei o rustici. La cera è la finitura più tradizionale, ottima per parquet storici, ma richiede manutenzione periodica con lucidatura.",
      },
      {
        title: 'Come Richiedere un Preventivo Preciso',
        content:
          "Il modo più affidabile per avere un costo reale è il sopralluogo gratuito. In pochi minuti valutiamo il parquet, lo spessore residuo dei listelli, il sottofondo e le condizioni generali. Il risultato è un preventivo scritto, firmato e senza costi nascosti. Non crediamo nei preventivi telefonici o per email basati solo sui metri quadri: ogni parquet è diverso e merita una valutazione diretta.",
      },
    ],
    faq: [
      {
        q: 'Il preventivo di levigatura è gratuito?',
        a: 'Sì. Il sopralluogo e il preventivo scritto sono sempre gratuiti e senza impegno.',
      },
      {
        q: 'Il costo include anche la finitura?',
        a: "Il preventivo include tutto: levigatura, stuccatura e finitura con olio, vernice o cera. Nessun costo nascosto.",
      },
      {
        q: 'Posso richiedere la levigatura senza la finitura?',
        a: "Non lo consigliamo. Un parquet levigato senza finitura è poroso e si sporca rapidamente. La finitura fa parte integrante del lavoro e lo protegge nel lungo periodo.",
      },
    ],
    related: [
      { title: 'Levigatura Parquet', description: 'Servizio professionale di levigatura senza polvere.', href: '/levigatura-parquet' },
      { title: 'Restauro Parquet', description: 'Recupero e restauro di parquet antichi e storici.', href: '/restauro-parquet' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
      { title: 'Come Scegliere il Parquet', description: 'Guida completa alla scelta del parquet giusto.', href: '/guida/come-scegliere-parquet' },
    ],
  },

  'come-scegliere-parquet': {
    title: 'Come Scegliere il Parquet Giusto per la Tua Casa',
    description:
      'Guida completa alla scelta del parquet: massello, prefinito, SPC o laminato? Essenze, spessori, finiture e consigli per ogni ambiente.',
    category: 'Guida all\'Acquisto',
    readingTime: '7 min',
    intro:
      "Scegliere il parquet giusto non è semplice: ci sono decine di opzioni, materiali, spessori e finiture. Ma con poche domande chiave si arriva sempre alla soluzione giusta. In questa guida ti accompagniamo passo dopo passo, senza termini tecnici inutili.",
    sections: [
      {
        title: 'Prima Domanda: Dove Va Posato?',
        content:
          "L'ambiente di destinazione è il primo filtro. In soggiorno e camere puoi scegliere praticamente tutto: massello, prefinito, SPC o PVC. In cucina e bagno, dove c'è umidità, il massello tradizionale è sconsigliato: meglio SPC o prefinito con trattamento idrorepellente. Per ambienti commerciali o con alto traffico, il vinilico incollato o il PVC di alta qualità sono le scelte più durature.",
        list: [
          'Soggiorno e camere: massello, prefinito, SPC o PVC',
          'Cucina: SPC o prefinito con strato idrorepellente',
          'Bagno: SPC (100% impermeabile) o piastrella effetto legno',
          'Ufficio/commerciale: vinilico incollato o PVC alta resistenza',
          'Mansarda: prefinito (più stabile alle variazioni termiche) o SPC',
        ],
      },
      {
        title: 'Massello, Prefinito o SPC: Le Differenze Reali',
        content:
          "Il massello è un unico blocco di legno massiccio, levigabile più volte, con durata centenaria. È la scelta di chi vuole il meglio senza compromessi. Il prefinito multistrato ha uno strato nobile in legno (2-6 mm) su un supporto di legno incrociato: è più stabile alle variazioni di umidità e più rapido da posare. L'SPC non è legno ma ne imita perfettamente l'aspetto: è impermeabile, graffio-resistente e compatibile con riscaldamento a pavimento. Ideale dove il legno vero non può andare.",
      },
      {
        title: 'L\'Essenza: Rovere, Noce o Frassino?',
        content:
          "Il rovere europeo è l'essenza più diffusa: ha venature regolari, buona durezza e risponde bene a tutti i trattamenti. Il noce ha tonalità più calde e scure, venature caratteristiche: è la scelta per ambienti dal gusto classico o contemporaneo ricercato. Il frassino è più chiaro, con venature evidenti: molto trendy negli ultimi anni per interni scandinavi o minimal. Per schemi come la spina di pesce, il rovere è quasi sempre la scelta più equilibrata.",
      },
      {
        title: 'La Finitura: Olio, Vernice o Cera?',
        content:
          "La finitura cambia radicalmente l'aspetto e la manutenzione del parquet. La vernice crea una pellicola protettiva superficiale: facile da pulire, molto resistente, aspetto da satinato a lucido. L'olio penetra nel legno e lo nutre dall'interno: aspetto naturale e caldo, ma richiede trattamento periodico con olio manutenzione. La cera è la finitura più tradizionale: molto usata nei parquet storici, richiede lucidatura periodica ma dona un aspetto antico ineguagliabile.",
      },
    ],
    faq: [
      {
        q: 'Quale parquet è più facile da mantenere?',
        a: 'Il parquet verniciato è il più facile da mantenere: basta uno straccio umido. Il prefinito con vernice UV di fabbrica è ancora più resistente. L\'SPC è praticamente indistruttibile e si pulisce con acqua.',
      },
      {
        q: 'Si può posare il parquet sopra le piastrelle?',
        a: "In molti casi sì, ma è necessario verificare che l'altezza totale sia compatibile con porte e gradini. Il prefinito flottante o l'SPC click sono i prodotti più adatti per la posa su piastrella esistente.",
      },
    ],
    related: [
      { title: 'Parquet Massello vs Prefinito', description: 'Confronto dettagliato tra le due tipologie principali.', href: '/guida/parquet-massello-vs-prefinito' },
      { title: 'Pavimenti SPC', description: 'Pavimenti impermeabili con effetto legno per ambienti umidi.', href: '/pavimenti-spc' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
      { title: 'I Nostri Servizi', description: 'Tutti i servizi di parquetteria offerti da Arteparquet.', href: '/servizi' },
    ],
  },

  'parquet-massello-vs-prefinito': {
    title: 'Parquet Massello vs Prefinito: Differenze, Pro e Contro',
    description:
      'Confronto completo tra parquet massello e prefinito multistrato. Durabilità, costi, posa, manutenzione e quando scegliere l\'uno o l\'altro.',
    category: 'Confronto',
    readingTime: '6 min',
    intro:
      "Massello o prefinito? È una delle domande più frequenti che ci sentiamo fare. La risposta non è mai assoluta: dipende dall'ambiente, dal budget, dalle aspettative e da quanto a lungo si vuole mantenere il parquet. Ecco il confronto onesto tra i due.",
    sections: [
      {
        title: 'Il Parquet Massello: La Scelta Definitiva',
        content:
          "Il massello è un unico pezzo di legno solido, tagliato da un tronco. Spessore tipico: 22 mm. Non ha strati, non ha supporti artificiali: è legno puro. Questo significa che può essere levigato 5-6 volte nel corso della sua vita, durando facilmente 50-100 anni se ben mantenuto. Lo svantaggio è la maggiore sensibilità alle variazioni di umidità: in ambienti molto secchi o con riscaldamento forte, i listelli possono muoversi leggermente nel tempo.",
        list: [
          'Levigabile 5-6 volte nel corso della vita',
          'Durata potenzialmente centenaria',
          'Solo legno puro, nessun additivo artificiale',
          'Ideale per ristrutturazioni importanti e case di pregio',
          'Maggiore sensibilità all\'umidità rispetto al prefinito',
          'Posa a colla o a incastro su massetto',
        ],
      },
      {
        title: 'Il Parquet Prefinito: Versatilità e Praticità',
        content:
          "Il prefinito è composto da uno strato nobile di legno (2-6 mm) incollato su un supporto di legno multistrato incrociato. La finitura viene applicata in fabbrica con vernici UV di alta resistenza. Risultato: è più stabile del massello alle variazioni di umidità, si posa più velocemente (anche flottante) e la finitura è immediata. Il limite è che lo strato nobile sottile permette al massimo 1-2 levigature leggere.",
        list: [
          'Strato nobile 2-6 mm (levigabile 1-2 volte)',
          'Più stabile alle variazioni di umidità',
          'Finitura UV applicata in fabbrica: alta resistenza immediata',
          'Compatibile con riscaldamento a pavimento (verificare specifiche)',
          'Posa flottante, a colla o su clic a seconda del prodotto',
          'Ampia scelta di formati e finiture',
        ],
      },
      {
        title: 'Come Scegliere: Le Domande Giuste',
        content:
          "Per scegliere tra massello e prefinito, poniti queste domande: Quanto a lungo vuoi tenere questo parquet? Se stai ristrutturando la casa in cui vivrai per 20+ anni, il massello è quasi sempre la scelta migliore. C'è riscaldamento a pavimento? In questo caso il prefinito (o l'SPC) è più adatto. Hai un budget più limitato? Il prefinito multistrato di qualità offre ottimi risultati a costi inferiori. È un appartamento in affitto? Il prefinito o l'SPC sono più pratici e resistenti all'usura quotidiana.",
      },
    ],
    faq: [
      {
        q: 'Il prefinito è meno pregiato del massello?',
        a: "Non necessariamente. Un prefinito di alta gamma con strato nobile da 6 mm in rovere europeo è un prodotto nobile, durevole e di bella presenza. La differenza principale è la longevità e la possibilità di levigatura nel tempo, non la qualità estetica.",
      },
      {
        q: 'Il massello si posa su riscaldamento a pavimento?',
        a: "Il massello tradizionale non è consigliato con il riscaldamento a pavimento perché le variazioni di temperatura possono causare movimenti nel legno. Se vuoi assolutamente legno massiccio con riscaldamento, scegli un massello termo-trattato o un prefinito con strato nobile spesso, sempre verificando le specifiche tecniche del prodotto.",
      },
    ],
    related: [
      { title: 'Come Scegliere il Parquet', description: 'Guida completa alla scelta del parquet giusto.', href: '/guida/come-scegliere-parquet' },
      { title: 'Parquet e Riscaldamento', description: 'Quale parquet è compatibile con il riscaldamento a pavimento.', href: '/guida/parquet-riscaldamento-pavimento' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
      { title: 'Pavimenti SPC', description: 'Pavimenti impermeabili con effetto legno per ambienti umidi.', href: '/pavimenti-spc' },
    ],
  },

  'parquet-spina-di-pesce': {
    title: 'Parquet a Spina di Pesce: Storia, Varianti e Consigli',
    description:
      'Guida completa alla spina di pesce: storia del pattern, varianti (45°, 90°, punto d\'Ungheria), essenze consigliate, abbinamenti e consigli pratici.',
    category: 'Schemi di Posa',
    readingTime: '6 min',
    intro:
      "La spina di pesce è forse lo schema di posa del parquet più amato e riconoscibile. Millenaria nella storia, torna ciclicamente di moda perché è semplicemente bellissima. Ma esistono varianti, proporzioni e dettagli che fanno tutta la differenza tra una spina mediocre e una memorabile.",
    sections: [
      {
        title: 'La Spina di Pesce: Due Varianti Principali',
        content:
          "La spina di pesce classica prevede listelli posati a 45° rispetto alle pareti. È lo schema che si vede nei palazzi storici milanesi, nei castelli e nelle ville d'epoca. Dà dinamismo, profondità e un senso di movimento agli ambienti. La variante a 90° - chiamata anche spina dritta - posiziona i listelli parallelamente alle pareti, con un effetto più geometrico e contemporaneo. È molto apprezzata negli interni moderni e minimal.",
        list: [
          'Spina di pesce a 45°: classica, dinamica, adatta a interni tradizionali e moderni',
          'Spina di pesce a 90°: contemporanea, geometrica, più semplice da posare',
          'Punto d\'Ungheria: variante premium con taglio a 45° sui listelli, effetto a V',
          'La lunghezza dei listelli influenza molto l\'effetto: listelli corti = più dinamico, listelli lunghi = più elegante',
        ],
      },
      {
        title: 'Il Punto d\'Ungheria: La Variante Più Raffinata',
        content:
          "Il punto d'Ungheria si distingue dalla spina di pesce classica perché i listelli sono tagliati con un angolo preciso di 45° alle estremità. Questo crea un allineamento perfetto delle venature e un effetto visivo molto più raffinato. È tecnicamente più impegnativo da posare: richiede listelli pre-tagliati e un posatore esperto. Il risultato è un pavimento di grande eleganza, molto apprezzato nei progetti di interior design di alto livello.",
      },
      {
        title: 'Quale Essenza Scegliere per la Spina di Pesce',
        content:
          "Il rovere europeo è l'essenza più usata per la spina di pesce: la sua venatura naturale si presta perfettamente allo schema. Anche in versione naturale, sbiancata, fumé o termo-trattata, il rovere a spina di pesce è sempre una certezza. Il noce crea un effetto più caldo e drammatico, perfetto per ambienti con illuminazione calda. Il frassino chiaro è ideale per interni nordici o minimal. Per i formati, i listelli stretti (circa 70-100 mm) danno un effetto tradizionale, quelli larghi (120-160 mm) un effetto più moderno e arioso.",
      },
    ],
    faq: [
      {
        q: 'La spina di pesce è più cara della posa dritta?',
        a: 'Sì, la spina di pesce richiede più materiale (maggiore sfrido) e più tempo di posa rispetto alla posa dritta a correre. Il punto d\'Ungheria è ancora più impegnativo. Tuttavia il risultato estetico giustifica ampiamente il costo aggiuntivo per chi vuole un pavimento di carattere.',
      },
      {
        q: 'La spina di pesce fa sembrare la stanza più piccola?',
        a: 'Dipende dall\'orientamento. La spina a 45° tenderebbe ad allungare visivamente la stanza. In ambienti molto piccoli, meglio orientarsi sulla posa dritta o su un formato di listello più stretto per non sovraccaricare visivamente lo spazio.',
      },
    ],
    related: [
      { title: 'Come Scegliere il Parquet', description: 'Guida completa alla scelta del parquet giusto.', href: '/guida/come-scegliere-parquet' },
      { title: 'Per Architetti e Designer', description: 'Servizi e campionature per professionisti del settore.', href: '/per-architetti' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
      { title: 'Posa Parquet', description: 'Posa professionale di tutti gli schemi di parquet.', href: '/servizi/posa' },
    ],
  },

  'manutenzione-parquet': {
    title: 'Manutenzione del Parquet: Come Farlo Durare Decenni',
    description:
      'Guida completa alla manutenzione del parquet: come pulirlo correttamente, proteggerlo dall\'usura, trattarlo con olio o cera e quando chiamare il professionista.',
    category: 'Cura e Manutenzione',
    readingTime: '5 min',
    intro:
      "Un parquet ben mantenuto dura decenni. Uno maltrattato si deteriora in pochi anni. La buona notizia è che la corretta manutenzione è più semplice di quanto si pensi: basta conoscere le regole base e rispettarle. Questa guida è scritta da chi il parquet lo vede ogni giorno - e conosce gli errori più comuni.",
    sections: [
      {
        title: 'La Pulizia Ordinaria: Le Regole d\'Oro',
        content:
          "La regola principale: il parquet odia l'acqua in eccesso. Non lavare mai il parquet con un mocio bagnato o con l'acqua in eccesso: l'umidità penetra nei giunti, fa gonfiare i listelli e nel tempo li deteriora irrimediabilmente. Usa sempre un panno o mocio strizzato al massimo. Per la pulizia ordinaria, un aspirapolvere con spazzola morbida o una scopa in microfibra sono sufficienti. Evita i detersivi aggressivi, la varechina e i prodotti multiuso: usali solo su piastrella.",
        list: [
          'Mai acqua in eccesso: usa sempre il mocio ben strizzato',
          'Aspirapolveree con spazzola morbida per la polvere quotidiana',
          'Detersivo specifico per parquet, diluito secondo le istruzioni',
          'Asciuga sempre subito eventuali spandimenti di liquidi',
          'Evita scarpe con tacchi a spillo o suole dure abrasive',
          'Metti feltri protettivi sotto i piedi dei mobili',
        ],
      },
      {
        title: 'Manutenzione per Finitura: Vernice, Olio e Cera',
        content:
          "La manutenzione dipende molto dalla finitura del tuo parquet. Il parquet verniciato è il più semplice: la pellicola di vernice protegge il legno e basta la pulizia ordinaria. Ogni 3-5 anni, se la vernice è consumata, si procede con una levigatura e una ri-verniciatura. Il parquet oliato richiede una rioliatura periodica (ogni 1-2 anni sulle zone di maggior passaggio) con olio manutenzione. Il parquet cerato richiede lucidatura periodica con cera specifica per mantenere la protezione e la lucentezza.",
      },
      {
        title: 'Quando Chiamare il Professionista',
        content:
          "La manutenzione fai-da-te funziona per la pulizia ordinaria. Ma ci sono situazioni in cui è necessario un professionista: quando la finitura è completamente consumata o scrostata, quando compaiono graffi profondi che non si nascondono con prodotti di superficie, quando il parquet inizia a scricchiolare, quando i listelli si sollevano o si fessurano. In questi casi, la levigatura professionale è la soluzione più efficace e duratura.",
      },
    ],
    faq: [
      {
        q: 'Ogni quanto va levigato il parquet?',
        a: 'Non esiste un intervallo fisso. Dipende dall\'intensità del calpestio, dalla finitura e dal tipo di parquet. Un parquet verniciato in una casa con due persone può durare 10-15 anni senza levigatura. In una famiglia con bambini e animali, potrebbe servire dopo 6-8 anni. Il segnale è visivo: quando la finitura è consumata e il legno appare opaco e graffiato.',
      },
      {
        q: 'Posso usare il robot aspirapolvere sul parquet?',
        a: 'Sì, la maggior parte dei robot aspirapolvere con spazzola morbida è compatibile con il parquet. Attenzione ai robot che usano acqua (robot lavapavimenti): vanno usati con estrema moderazione e mai su parquet oliato o cerato.',
      },
    ],
    related: [
      { title: 'Levigatura Parquet', description: 'Ripristino del parquet con macchine senza polvere.', href: '/levigatura-parquet' },
      { title: 'Restauro Parquet', description: 'Recupero e restauro di parquet antichi e storici.', href: '/restauro-parquet' },
      { title: 'Riparazione Parquet', description: 'Interventi puntuali su scricchiolii e listelli rotti.', href: '/riparazione-parquet' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
    ],
  },

  'parquet-riscaldamento-pavimento': {
    title: 'Parquet e Riscaldamento a Pavimento: Tutto Quello Che Devi Sapere',
    description:
      'Guida tecnica su parquet e riscaldamento a pavimento: quali prodotti sono compatibili, temperature massime, spessori consigliati e consigli di posa.',
    category: 'Installazione Tecnica',
    readingTime: '6 min',
    intro:
      "Riscaldamento a pavimento e parquet possono convivere perfettamente - ma solo se si scelgono i prodotti giusti e si rispettano alcune regole tecniche fondamentali. Questa guida spiega tutto quello che devi sapere prima di installare il parquet su un impianto radiante.",
    sections: [
      {
        title: 'Come Funziona il Riscaldamento a Pavimento con il Legno',
        content:
          "L'impianto radiante riscalda il pavimento dal basso, distribuendo il calore uniformemente. Per il parquet, la sfida è la variazione di temperatura: il legno si dilata quando è caldo e si ritira quando è freddo. Se il prodotto non è adatto o se la temperatura è troppo alta, si possono formare fessure tra i listelli o deformazioni superficiali. La temperatura superficiale del pavimento non deve mai superare i 27°C - un limite che quasi tutti gli impianti moderni rispettano se ben progettati.",
        list: [
          'Temperatura massima superficiale: 27°C (norma EN 1264)',
          'Aumento graduale della temperatura prima e dopo la posa',
          'Periodo di adattamento del parquet prima della posa (acclimatazione)',
          'Resistenza termica massima consigliata: 0,10-0,15 m²K/W',
          'Verificare sempre la scheda tecnica del prodotto scelto',
        ],
      },
      {
        title: 'Quali Parquet Sono Compatibili',
        content:
          "Non tutti i parquet sono adatti al riscaldamento a pavimento. Il prefinito multistrato è il più compatibile: la struttura incrociata del supporto lo rende molto più stabile alle variazioni termiche rispetto al massello. Il massello è sconsigliato, a meno che non sia un massello termo-trattato o di specie molto stabili (rovere in particolare). L'SPC è ottimamente compatibile: il nucleo rigido in pietra calcarea si dilata pochissimo con il calore. L'ideale per chi vuole effetto legno in ambienti con riscaldamento a pavimento.",
      },
      {
        title: 'Come Si Posa il Parquet su Riscaldamento a Pavimento',
        content:
          "La posa su riscaldamento a pavimento richiede attenzione in più fasi: prima della posa, l'impianto va avviato e la temperatura aumentata progressivamente (circa 5°C al giorno) fino alla temperatura di esercizio, poi ridotta gradualmente. Il parquet deve acclimatarsi nel cantiere per almeno 48-72 ore. La posa consigliata è a colla piena (non flottante) per garantire il migliore trasferimento termico. Dopo la posa, si riprende l'avvio progressivo dell'impianto.",
      },
    ],
    faq: [
      {
        q: 'Posso usare il massello con il riscaldamento a pavimento?',
        a: "Il massello tradizionale non è la scelta ottimale con il riscaldamento a pavimento. Se vuoi assolutamente legno massiccio, scegli specie molto stabili (rovere termico, teak) con listelli stretti (max 70-80 mm di larghezza) e una posa a colla piena. Verifica sempre con il produttore la compatibilità.",
      },
      {
        q: 'Il parquet si fessura con il riscaldamento a pavimento?',
        a: "Le fessurazioni tra i listelli possono verificarsi se l'impianto scalda troppo velocemente, se la temperatura supera i 27°C in superficie, se il parquet non è stato acclimatato correttamente o se è stato scelto un prodotto non adatto. Con i prodotti giusti e una corretta posa professionale, il rischio è minimo.",
      },
    ],
    related: [
      { title: 'Come Scegliere il Parquet', description: 'Guida completa alla scelta del parquet giusto.', href: '/guida/come-scegliere-parquet' },
      { title: 'Massello vs Prefinito', description: 'Confronto dettagliato tra le due tipologie principali.', href: '/guida/parquet-massello-vs-prefinito' },
      { title: 'Pavimenti SPC', description: 'Pavimenti impermeabili compatibili con riscaldamento a pavimento.', href: '/pavimenti-spc' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
    ],
  },

  'parquet-bagno': {
    title: 'Parquet in Bagno: Si Può Fare? La Guida Completa',
    description:
      'Il parquet in bagno è possibile con i prodotti giusti. Scopri quali scegliere, come posarli e perché l\'SPC è la scelta più consigliata per i bagni.',
    category: 'Ambienti Speciali',
    readingTime: '5 min',
    intro:
      "Il parquet in bagno è un sogno di molti e un paradosso apparente: il legno e l'acqua non sembrano fatti per andare d'accordo. Ma la realtà è più sfumata. Con i prodotti giusti, è possibile avere un pavimento con effetto legno bellissimo anche in bagno, in totale sicurezza.",
    sections: [
      {
        title: 'Il Parquet Tradizionale in Bagno: Perché È Rischioso',
        content:
          "Il parquet massello o prefinito tradizionale in bagno presenta rischi reali: l'umidità costante (vapore doccia, spandimenti, condensazione) penetra nei giunti, causa rigonfiamenti, muffe e deterioramento rapido del legno. Anche con prodotti idrorepellenti, un bagno piccolo e scarsamente ventilato è un ambiente ostile per il legno naturale. Non è impossibile, ma richiede attenzione e manutenzione costante.",
        list: [
          'Umidità costante da doccia e vasca è il nemico principale',
          'I giunti tra i listelli sono punti vulnerabili all\'infiltrazione',
          'La ventilazione del bagno è fondamentale per ridurre il rischio',
          'Il parquet massello in bagno richiede manutenzione più frequente',
          'In bagni piccoli senza finestra, meglio optare per l\'alternativa SPC',
        ],
      },
      {
        title: 'L\'SPC: La Soluzione Ideale per il Bagno con Effetto Legno',
        content:
          "L'SPC (Stone Plastic Composite) è la risposta definitiva al problema parquet-bagno. Il nucleo rigido in pietra calcarea e PVC è 100% impermeabile: non assorbe acqua, non si gonfia, non ammufisce. Lo strato decorativo HD riproduce fedelmente le venature del legno - in molti casi è davvero difficile distinguerlo a occhio nudo da un vero parquet. La posa click permette una messa in opera rapida e pulita, con sigillatura perimetrale per tenuta totale all'acqua.",
      },
      {
        title: 'Come Scegliere il Prodotto Giusto per il Tuo Bagno',
        content:
          "Per il bagno, l'SPC è la nostra prima raccomandazione. Scegli uno spessore minimo di 6 mm (meglio 8 mm) con strato wear layer da almeno 0,3 mm. Verifica che il prodotto abbia certificazione di impermeabilità e sia compatibile con ambienti umidi. Se il bagno è piccolo e la doccia è ravvicinata, opta per un SPC con foam preincollato per l'isolamento acustico. Fai posare il perimetro con sigillante impermeabile per prevenire le infiltrazioni dalle pareti.",
      },
    ],
    faq: [
      {
        q: 'Il parquet vero va bene in bagno?',
        a: "Il parquet massello o prefinito tradizionale in bagno è sconsigliato nella maggior parte dei casi, soprattutto in bagni piccoli o con doccia. Se ci tieni all'effetto legno in bagno, l'SPC è la scelta più intelligente: impermeabile, esteticamente identico, più facile da mantenere.",
      },
      {
        q: 'L\'SPC in bagno si scivola?',
        a: "I prodotti SPC di qualità per ambienti bagnati hanno una classificazione antiscivolo (R10 o superiore). Verificate sempre questa specifica prima dell'acquisto, specialmente per il bagno dove il pavimento può bagnarsi frequentemente.",
      },
    ],
    related: [
      { title: 'Pavimenti SPC', description: 'Pavimenti impermeabili con effetto legno per ambienti umidi.', href: '/pavimenti-spc' },
      { title: 'Come Scegliere il Parquet', description: 'Guida completa alla scelta del parquet giusto.', href: '/guida/come-scegliere-parquet' },
      { title: 'Parquet in Cucina', description: "Soluzioni per avere l'effetto legno anche in cucina.", href: '/guida/parquet-cucina' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
    ],
  },

  'levigatura-parquet-senza-polvere': {
    title: 'Levigatura Parquet Senza Polvere: Come Funziona Davvero',
    description:
      'Guida completa alla levigatura parquet senza polvere: tecnologia di aspirazione, benefici, cosa aspettarsi e perché è la scelta migliore per casa tua.',
    category: 'Tecnologia',
    readingTime: '4 min',
    intro:
      "La levigatura tradizionale del parquet lascia casa coperta di polvere fine per giorni. Quella professionale con aspirazione integrata, no. Ma come funziona davvero la levigatura senza polvere? E quali sono i limiti da conoscere? Ecco la guida completa.",
    sections: [
      {
        title: 'Come Funziona il Sistema di Aspirazione Integrata',
        content:
          "Le moderne macchine levigatrici professionali sono collegate direttamente a un sistema di aspirazione industriale ad alta potenza. L'aspiratore cattura la polvere nel momento esatto in cui viene prodotta dall'abrasivo, prima che si dispenda nell'aria. Il filtro HEPA trattiene anche le particelle più fini (PM2.5), quelle che nei sistemi tradizionali resterebbero in sospensione nell'aria per ore. Il risultato è una riduzione della polvere dispersa nell'ambiente superiore al 95% rispetto alla levigatura convenzionale.",
        list: [
          'Aspiratore industriale collegato direttamente alla macchina levigatrice',
          'Filtri HEPA che catturano le particelle fini PM2.5',
          'Riduzione della polvere dispersa superiore al 95%',
          'La polvere raccolta viene usata per la stuccatura dei giunti',
          'Sacchi filtranti sigillati per lo smaltimento sicuro dei residui',
        ],
      },
      {
        title: 'Cosa Si Può Fare Durante i Lavori',
        content:
          "Con la levigatura senza polvere, è possibile continuare a vivere nelle altre stanze dell'appartamento durante i lavori. Non è necessario sgomberare l'intera casa, coprire tutti i mobili o trasferirsi per giorni. La zona trattata deve ovviamente essere libera e inaccessibile durante la levigatura, ma il resto dell'appartamento rimane praticabile. Questo è un enorme vantaggio rispetto alla levigatura tradizionale, che richiedeva la chiusura dell'intera abitazione.",
      },
      {
        title: 'I Limiti della Levigatura Senza Polvere',
        content:
          "È giusto essere onesti: la levigatura senza polvere riduce drasticamente la dispersione nell'aria, ma non la elimina al 100%. Nelle fasi di lavoro in angoli stretti o sotto i battiscopa, dove la macchina principale non arriva e si usa la levigatrice orbitale, qualche particella può sfuggire. Consigliamo sempre di coprire gli oggetti preziosi e di aerare bene la zona trattata durante e dopo il lavoro. Ma il confronto con la levigatura tradizionale rimane nettamente favorevole.",
      },
    ],
    faq: [
      {
        q: 'Devo coprire i mobili delle stanze vicine?',
        a: "Con la levigatura senza polvere non è necessario coprire i mobili delle stanze non trattate. Basta chiudere le porte delle stanze adiacenti e il rischio di diffusione della polvere è minimo. Nella stanza dove si lavora, tutti gli oggetti devono ovviamente essere rimossi.",
      },
      {
        q: 'Posso stare in casa durante la levigatura senza polvere?',
        a: "Sì, puoi rimanere nelle stanze non trattate. Ti consigliamo comunque di uscire durante le fasi di levigatura più intense se sei allergico o hai bambini piccoli, e di aerare bene l'appartamento durante le pause. Il rumore delle macchine è la principale scomodità, non la polvere.",
      },
    ],
    related: [
      { title: 'Levigatura Parquet', description: 'Servizio professionale di levigatura senza polvere.', href: '/levigatura-parquet' },
      { title: 'Costo Levigatura', description: 'Quanto costa la levigatura e cosa influenza il prezzo.', href: '/guida/costo-levigatura-parquet' },
      { title: 'Restauro Parquet', description: 'Recupero e restauro di parquet antichi e storici.', href: '/restauro-parquet' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
    ],
  },

  'restauro-parquet-fai-da-te': {
    title: 'Restauro Parquet Fai da Te: Cosa Puoi Fare e Cosa No',
    description:
      'Guida onesta al restauro parquet fai da te: cosa è davvero alla portata di un appassionato e quando è indispensabile chiamare un professionista.',
    category: 'Fai da Te',
    readingTime: '5 min',
    intro:
      "Il restauro del parquet fai da te fa gola a molti: sembra un modo per risparmiare e per mettere le mani su qualcosa di bello. La realtà è che alcune piccole operazioni sono davvero alla portata di tutti, ma la levigatura e la finitura professionali sono un'altra storia. Ecco una guida onesta su cosa puoi fare da solo e cosa è meglio lasciare agli esperti.",
    sections: [
      {
        title: 'Cosa Puoi Fare Da Solo',
        content:
          "Ci sono piccole operazioni di manutenzione e restauro che non richiedono attrezzatura professionale. La pulizia in profondità con prodotti specifici per il tipo di finitura (olio, vernice, cera) è alla portata di tutti. La rioliatura di un parquet oliato si può fare con un olio manutenzione applicato con un panno in microfibra - i produttori forniscono istruzioni chiare. La stuccatura di fessurazioni superficiali con stucco pronto colorato può dare risultati accettabili su piccole zone. La sostituzione di un listello singolo rotto è tecnicamente possibile, ma richiede gli strumenti giusti e un po' di manualità.",
        list: [
          'Pulizia in profondità con prodotti specifici per parquet',
          'Rioliatura con olio manutenzione (per parquet oliati)',
          'Lucidatura con cera (per parquet cerati)',
          'Stuccatura superficiale con stucco colorato su piccole zone',
          'Applicazione di prodotti anti-scricchiolio in spray per giunti lievi',
        ],
      },
      {
        title: 'Cosa Rischi a Fare da Solo',
        content:
          "La levigatura fai da te è il caso più rischioso. Le macchine levigatrici noleggiabili sono difficili da controllare: una mossa sbagliata lascia segni permanenti nel parquet. Le abrasioni eccessive rimuovono troppo legno, riducendo lo spessore utile del listello in modo irreversibile. La finitura dopo la levigatura richiede prodotti professionali e tecnica corretta: una vernice applicata male si gonfia, fa bolle o non aderisce uniformemente. Il risultato di un restauro fai da te mal eseguito spesso costa più del doppio da correggere rispetto a un lavoro professionale fatto bene fin dall'inizio.",
      },
      {
        title: 'Quando Chiamare il Professionista È Sempre la Scelta Giusta',
        content:
          "Chiama un professionista quando: il parquet ha graffi profondi che richiedono levigatura, la finitura è consumata o scrostata su più di 1-2 mq, ci sono listelli sollevati o scricchiolii strutturali, il parquet è storico e di valore, stai affrontando una ristrutturazione importante. Il sopralluogo gratuito di Arteparquet ti dice esattamente cosa serve - e se c'è qualcosa che puoi fare da solo, te lo diciamo. Non abbiamo interesse a venderti lavori che non servono.",
      },
    ],
    faq: [
      {
        q: 'Il noleggio di una levigatrice è una buona idea?',
        a: "Raramente. Le macchine da noleggio sono spesso usurate e difficili da controllare per chi non ha esperienza. Il rischio di rovinare il parquet in modo irreversibile è alto. Se hai un piccolo parquet economico e vuoi fare esperienza, può avere senso. Su un parquet di valore, no.",
      },
      {
        q: 'Come rimuovo i graffi leggeri dal parquet da solo?',
        a: "Per graffi superficiali su parquet verniciato, esistono prodotti touch-up (penne o cere colorate) che migliorano visibilmente l'aspetto. Su parquet oliato, una rioliatura con olio manutenzione può ridurre notevolmente la visibilità dei graffi lievi. Per graffi profondi che raggiungono il legno grezzo, è necessaria la levigatura professionale.",
      },
    ],
    related: [
      { title: 'Restauro Parquet', description: 'Recupero e restauro professionale di parquet antichi.', href: '/restauro-parquet' },
      { title: 'Riparazione Parquet', description: 'Interventi puntuali su scricchiolii e listelli rotti.', href: '/riparazione-parquet' },
      { title: 'Manutenzione Parquet', description: 'Come pulire e proteggere il parquet per farlo durare.', href: '/guida/manutenzione-parquet' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
    ],
  },

  'parquet-cucina': {
    title: 'Parquet in Cucina: Si Può? Guida Pratica per Scegliere Bene',
    description:
      'Parquet in cucina: rischi, prodotti consigliati, manutenzione e consigli pratici per avere un pavimento in legno (o effetto legno) anche in cucina.',
    category: 'Ambienti Speciali',
    readingTime: '5 min',
    intro:
      "La cucina è uno degli ambienti più ostili per il parquet: umidità, spandimenti, calore dei fornelli, grasso. Eppure sempre più persone vogliono continuità del pavimento in legno tra cucina e soggiorno. È possibile? Sì, ma va fatto con i prodotti giusti e qualche precauzione.",
    sections: [
      {
        title: 'I Rischi del Parquet in Cucina',
        content:
          "La cucina espone il parquet a sfide che in soggiorno non esistono: spandimenti frequenti di acqua e liquidi, vapore durante la cottura, grasso in sospensione che si deposita sulla superficie, carichi di traffico elevato davanti ai fornelli e al lavello. Un parquet massello tradizionale non è la scelta ideale, specialmente davanti al lavello dove i gocciolamenti sono frequenti. Ma con il prodotto giusto, è possibile avere un bellissimo effetto legno in cucina.",
        list: [
          'Spandimenti di acqua e liquidi frequenti',
          'Vapore durante la cottura che aumenta l\'umidità ambientale',
          'Grasso che si deposita e sporca la superficie',
          'Traffico intenso in zone specifiche (davanti al lavello, ai fornelli)',
          'Caduta di oggetti pesanti e utensili da cucina',
        ],
      },
      {
        title: 'Le Soluzioni Migliori per la Cucina',
        content:
          "Il prefinito con verniciatura UV di alta resistenza è una scelta valida per cucine ben ventilate e dove si fa attenzione agli spandimenti. Ma la soluzione più consigliata per la cucina è l'SPC: impermeabile, graffio-resistente, facile da pulire anche con prodotti sgrassanti. Se vuoi la continuità del pavimento tra cucina e soggiorno, puoi usare lo stesso prodotto SPC in entrambi gli ambienti - l'effetto legno moderno è praticamente identico al parquet. Alternativa pratica: parquet in soggiorno, SPC in cucina dello stesso colore e venatura: la differenza è minima a occhio nudo.",
      },
      {
        title: 'Come Mantenere il Parquet in Cucina',
        content:
          "Se hai già il parquet in cucina o hai deciso di posarlo comunque, ecco le regole fondamentali: asciuga subito qualsiasi spandimento di liquidi, non lasciare mai pozzanghere davanti al lavello, usa un tappeto antiscivolo con base traspirante davanti al lavello e ai fornelli. Ventila bene la cucina durante la cottura per ridurre l'umidità in sospensione. Pulisci regolarmente con un mocio ben strizzato e prodotti specifici per parquet, mai con detersivi sgrassanti aggressivi che possono scrostare la finitura.",
      },
    ],
    faq: [
      {
        q: 'Quale finitura è migliore per il parquet in cucina?',
        a: "La verniciatura con vernice a base acqua di alta resistenza (HS o extra dura) è la scelta migliore per il parquet in cucina: forma uno strato protettivo impermeabile sulla superficie. Evita la cera e l'olio in cucina: sono finiture che richiedono manutenzione frequente e sono molto più vulnerabili agli spandimenti.",
      },
      {
        q: 'L\'SPC in cucina è bello quanto il parquet vero?',
        a: "I prodotti SPC di alta gamma hanno layer decorativi fotorealistici che replicano fedelmente le venature del legno naturale. La differenza a occhio nudo è minima, specialmente con le finiture moderne satinate o mat. Per chi deve scegliere tra estetica e praticità in cucina, l'SPC è spesso la scelta più intelligente.",
      },
    ],
    related: [
      { title: 'Parquet in Bagno', description: "Come avere l'effetto legno nel bagno in totale sicurezza.", href: '/guida/parquet-bagno' },
      { title: 'Pavimenti SPC', description: 'Pavimenti impermeabili con effetto legno per ambienti umidi.', href: '/pavimenti-spc' },
      { title: 'Come Scegliere il Parquet', description: 'Guida completa alla scelta del parquet giusto.', href: '/guida/come-scegliere-parquet' },
      { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
    ],
  },
}

// ---
// generateStaticParams
// ---

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }))
}

// ---
// generateMetadata
// ---

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const guide = GUIDES[params.slug]
  if (!guide) return { title: 'Guida non trovata | Arteparquet' }

  return {
    title: guide.title + ' | Arteparquet',
    description: guide.description,
    alternates: {
      canonical: `https://arteparquet.pro/guida/${params.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://arteparquet.pro/guida/${params.slug}`,
    },
  }
}

// ---
// PAGE COMPONENT
// ---

export default function GuidaPage({ params }: { params: { slug: string } }) {
  const guide = GUIDES[params.slug]

  if (!guide) {
    notFound()
  }

  const faqForSchema = guide.faq

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Guide', url: 'https://arteparquet.pro/parquet' },
          { name: guide.title, url: `https://arteparquet.pro/guida/${params.slug}` },
        ]}
      />
      <ServiceFaqSchema items={faqForSchema} />

      {/* ARTICLE HEADER */}
      <header className="bg-travertino pt-32 pb-10 md:pt-40 md:pb-14 border-b border-legno-bruciato/10">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-legno-bruciato/50 mb-6">
              <Link href="/" className="hover:text-rovere transition-colors">Home</Link>
              <ArrowRight size={12} />
              <Link href="/parquet" className="hover:text-rovere transition-colors">Guide</Link>
              <ArrowRight size={12} />
              <span className="text-legno-bruciato/80">{guide.category}</span>
            </nav>

            {/* Category + reading time */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-bold text-rovere uppercase tracking-wider bg-rovere/10 px-3 py-1 rounded-full">
                {guide.category}
              </span>
              <span className="flex items-center gap-1 text-legno-bruciato/50 text-sm">
                <Clock size={14} />
                {guide.readingTime} di lettura
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl md:text-5xl font-bold text-legno-bruciato leading-tight mb-6">
              {guide.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rovere flex items-center justify-center text-white font-bold text-sm">A</div>
              <div>
                <p className="text-sm font-semibold text-legno-bruciato">Arteparquet</p>
                <p className="text-xs text-legno-bruciato/50">Bergamo | Dal 1996</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <article className="bg-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Intro */}
          <FadeIn>
            <p className="text-lg text-legno-bruciato/80 leading-relaxed mb-12 font-medium border-l-4 border-rovere pl-5">
              {guide.intro}
            </p>
          </FadeIn>

          {/* Sections */}
          {guide.sections.map((section, idx) => (
            <FadeIn key={section.title}>
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-legno-bruciato mb-5">
                  {section.title}
                </h2>
                <p className="text-legno-bruciato/70 leading-relaxed mb-5 text-base">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="space-y-2 mb-5">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-legno-bruciato/80 text-sm">
                        <CheckCircle size={16} className="text-rovere mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              {/* Mid-article CTA after 2nd section */}
              {idx === 1 && (
                <div className="my-10 bg-nero-marquina text-travertino rounded-2xl p-8">
                  <h3 className="font-bold text-xl text-travertino mb-2">Hai bisogno di aiuto?</h3>
                  <p className="text-travertino/70 mb-6 text-sm leading-relaxed">
                    Non devi decidere tutto da solo. Veniamo da te per un sopralluogo gratuito
                    e ti aiutiamo a fare la scelta giusta per il tuo parquet.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+393892407827"
                      className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-6 py-3 rounded-lg hover:bg-wood-500 transition-colors text-sm"
                    >
                      <Phone size={16} />
                      Chiama Ora
                    </a>
                    <a
                      href="https://wa.me/393892407827?text=Ciao!%20Ho%20letto%20una%20guida%20sul%20vostro%20sito%20e%20vorrei%20un%20consiglio."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:border-rovere hover:text-rovere transition-colors text-sm"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </FadeIn>
          ))}

          {/* FAQ Section */}
          <FadeIn>
            <section className="mt-12 pt-10 border-t border-legno-bruciato/10">
              <h2 className="text-2xl md:text-3xl font-bold text-legno-bruciato mb-8">
                Domande Frequenti
              </h2>
              <div className="space-y-6">
                {guide.faq.map((faq) => (
                  <div key={faq.q} className="bg-travertino rounded-xl p-6 border border-legno-bruciato/10">
                    <h3 className="font-bold text-legno-bruciato mb-3 text-base">{faq.q}</h3>
                    <p className="text-legno-bruciato/70 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        </div>
      </article>

      {/* FINAL CTA */}
      <section className="bg-travertino py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-legno-bruciato mb-4">
              Pronto a Passare all&apos;Azione?
            </h2>
            <p className="text-legno-bruciato/70 mb-8">
              Il sopralluogo è gratuito e senza impegno. Veniamo da te, valutiamo e ti consigliamo la soluzione migliore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/preventivo"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-8 py-4 rounded-lg hover:bg-wood-500 transition-colors"
              >
                Preventivo Gratuito
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Ho%20letto%20la%20guida%20sul%20vostro%20sito%20e%20vorrei%20un%20preventivo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-legno-bruciato/20 text-legno-bruciato font-semibold px-8 py-4 rounded-lg hover:border-rovere hover:text-rovere transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedLinks links={guide.related} />
    </>
  )
}
