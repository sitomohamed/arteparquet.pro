import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

// ─── Article content ──────────────────────────────────────────────────────────

const ARTICLES: Record<string, {
  title: string
  subtitle: string
  excerpt: string
  category: string
  readTime: string
  date: string
  dateISO: string
  image: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  sections: {
    heading: string
    content: string
    list?: string[]
    tip?: string
  }[]
  faq: { q: string; a: string }[]
}> = {

  'come-scegliere-parquet': {
    title: 'Come Scegliere il Parquet Perfetto per la Tua Casa',
    subtitle: 'Guida completa: massello, prefinito, SPC. Tutti i fattori da valutare prima di decidere.',
    excerpt: 'Massello, prefinito o multistrato? Rovere, noce o frassino? Una guida completa per orientarsi nel mondo del parquet e scegliere con consapevolezza.',
    category: 'Guida',
    readTime: '8 min',
    date: 'Luglio 2026',
    dateISO: '2026-07-15',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=1200&q=80',
    metaTitle: 'Come Scegliere il Parquet: Guida Completa 2026 | Arteparquet',
    metaDescription: 'Come scegliere il parquet giusto per la tua casa? Massello, prefinito, SPC o laminato? Confronto completo con consigli da 30 anni di esperienza.',
    keywords: ['come scegliere parquet', 'parquet massello o prefinito', 'tipi di parquet', 'parquet migliore'],
    sections: [
      {
        heading: 'I Tre Tipi di Parquet: Qual È il Tuo?',
        content: 'Prima di scegliere il parquet bisogna capire le differenze fondamentali tra i materiali disponibili. Non esiste il "parquet migliore in assoluto" — esiste il parquet giusto per il tuo spazio, il tuo stile di vita e il tuo budget.',
        list: [
          'Parquet massello: legno pieno al 100%, lo spessore va dai 10 ai 22 mm. Il più pregiato, levigabile 4–6 volte nell\'arco di 50+ anni.',
          'Parquet prefinito: strato nobile di legno (2–6 mm) su supporto multistrato. Più stabile in ambienti con umidità variabile.',
          'SPC / PVC / Laminato: non è vero legno, ma simula l\'effetto parquet. Impermeabile al 100%, ideale per cucine e bagni.',
        ],
      },
      {
        heading: 'L\'Umidità: Il Fattore Decisivo',
        content: 'Il legno è un materiale vivo: si dilata con l\'umidità e si restringe con il secco. Prima di scegliere qualsiasi pavimento, devi valutare l\'umidità degli ambienti.',
        list: [
          'Soggiorno, camere da letto (umidità stabile): ideale il parquet massello o prefinito.',
          'Cucina con finestra o zona giorno aperta: prefinito o SPC. Il massello è sconsigliato vicino ai fornelli.',
          'Bagno, lavanderia, spogliatoio: solo SPC o PVC al 100% impermeabile. Il legno naturale non è adatto.',
          'Mansarda sotto il tetto: prefinito multistrato, che regge meglio le escursioni termiche.',
        ],
        tip: 'Regola d\'oro: se c\'è umidità o acqua, scegli SPC. Se vuoi il massimo del pregio in zone asciutte, scegli il massello.',
      },
      {
        heading: 'Quale Essenza di Legno Scegliere?',
        content: 'L\'essenza è la specie di legno. Ogni essenza ha caratteristiche diverse in termini di durezza, colore e pregio. In Italia, le più richieste sono:',
        list: [
          'Rovere: il re del parquet italiano. Duro, versatile, disponibile in decine di finiture. Si abbina a qualsiasi stile, dal classico al moderno.',
          'Noce: colore caldo e avvolgente, venatura ricca. Molto pregiato, perfetto per ambienti di rappresentanza.',
          'Frassino: tono chiaro e neutro, perfetto per interni nordici o minimal.',
          'Merbau: legno esotico dal colore scuro rossiccio. Molto duro e resistente.',
          'Abete e pino: legni "rustici" per stili country o montagna. Morbidi ma suggestivi.',
        ],
      },
      {
        heading: 'La Posa: Come Incide sulla Scelta',
        content: 'Il tipo di posa cambia l\'aspetto finale del pavimento quanto il materiale stesso. Le pose più richieste in Lombardia oggi sono:',
        list: [
          'Posa a correre: la classica, listelli paralleli. Semplice, elegante, senza tempo.',
          'Posa a spina di pesce (chevron): i listelli formano una "V" continua. L\'abbinamento perfetto per interni di design.',
          'Posa a quadrotte o mattone: alternanza di orientamenti, crea movimento visivo.',
          'Posa versailles o Punto Ungheria: lavorazioni artigianali per ambienti di lusso.',
        ],
        tip: 'La posa a spina di pesce richiede più materiale (scarto di taglio ~15%) e più tempo. Calcola un budget più alto, ma il risultato è straordinario.',
      },
      {
        heading: 'Massello vs Prefinito: Il Confronto Definitivo',
        content: 'Questa è la domanda che ci fanno più spesso. Ecco il confronto onesto, senza pubblicità:',
        list: [
          'Durata: massello dura 50–100 anni se curato. Prefinito 20–40 anni.',
          'Manutenzione: massello si leviga 4–6 volte nel corso della vita. Prefinito 1–2 volte.',
          'Stabilità: prefinito è più stabile agli sbalzi di temperatura e umidità.',
          'Posa: prefinito si installa più velocemente. Massello richiede acclimatazione (48h).',
          'Valore: massello aumenta il valore dell\'immobile. Prefinito meno, ma comunque positivo.',
        ],
      },
      {
        heading: 'Cosa Fare Prima di Comprare',
        content: 'Il nostro consiglio dopo 30 anni di posa parquet in Lombardia è sempre lo stesso: non comprare prima di un sopralluogo. Ogni ambiente è diverso, ogni sottofondo ha caratteristiche diverse, ogni stile di vita porta esigenze diverse.',
        list: [
          'Richiedi un sopralluogo gratuito: valutiamo il sottofondo, misuriamo l\'umidità, capiamo le tue esigenze.',
          'Non fidarti dei preventivi online senza misurazioni: i prezzi variano molto in base al sottofondo.',
          'Chiedi sempre la garanzia scritta sulla posa.',
          'Considera il costo totale: materiale + posa + eventuale preparazione del sottofondo.',
        ],
      },
    ],
    faq: [
      { q: 'Quanto dura il parquet massello?', a: 'Il parquet massello, con la giusta manutenzione, dura tutta la vita: 50, 80, anche 100 anni. Si leviga quando necessario (ogni 10–15 anni circa) e si rinnova come nuovo.' },
      { q: 'Il parquet prefinito si può levigare?', a: 'Sì, ma al massimo 1–2 volte. Lo strato nobile è più sottile (2–6 mm), quindi ha meno margine di levigatura rispetto al massello.' },
      { q: 'Posso mettere il parquet in bagno?', a: 'Il parquet in legno naturale non è consigliato in bagno. In ambienti bagnati è meglio optare per SPC o PVC, che sono impermeabili al 100% e resistenti all\'acqua.' },
      { q: 'Qual è il parquet più economico?', a: 'Il laminato è il meno costoso, ma non è vero legno. Tra i parquet veri, il prefinito in essenze comuni (rovere, frassino) è più accessibile del massello. Il prezzo dipende molto anche dalla posa.' },
    ],
  },

  'restauro-parquet-quando-conviene': {
    title: 'Restaurare o Sostituire il Parquet? La Guida Definitiva',
    subtitle: 'Come capire quando il restauro è la scelta giusta e quando conviene ripartire da zero.',
    excerpt: 'Il tuo parquet è rovinato? Non sempre la soluzione migliore è sostituirlo. Scopri quando conviene il restauro e quando è meglio ripartire da zero.',
    category: 'Restauro',
    readTime: '6 min',
    date: 'Giugno 2026',
    dateISO: '2026-06-10',
    image: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=1200&q=80',
    metaTitle: 'Restauro Parquet: Quando Conviene? Guida 2026 | Arteparquet',
    metaDescription: 'Il tuo parquet è rovinato, graffiato o opaco? Scopri quando conviene restaurare il parquet e quando è meglio sostituirlo. Consigli da esperti.',
    keywords: ['restauro parquet', 'levigatura parquet', 'parquet rovinato', 'ripristino parquet'],
    sections: [
      {
        heading: 'Il Parquet Non è Finito: Spesso si Salva',
        content: 'Ogni anno riceviamo decine di chiamate da proprietari di casa convinti di dover buttar via il loro parquet. Nella maggior parte dei casi, il parquet si salva — e il risultato dopo il restauro è spesso migliore del nuovo. Il legno è straordinario: si può levigare, rasare, oliare, verniciare. Rinasce.',
      },
      {
        heading: 'Quando il Restauro è la Scelta Giusta',
        content: 'Il restauro del parquet conviene in questi casi:',
        list: [
          'Parquet graffiato o opaco: basta la levigatura e una nuova finitura (olio o vernice). Risultato: come nuovo.',
          'Parquet con qualche listello sollevato o cigolante: riparazione localizzata senza toccare il resto.',
          'Parquet antico o di pregio: non si butta mai. Un massello di 50 anni ha un valore che il nuovo non può avere.',
          'Parquet con piccole fessure o giunzioni: si stucca, si leviga, spariscono.',
          'Cambio di colore o finitura: si leviga e si rilacca di un altro colore. Trasformazione completa.',
        ],
        tip: 'Se il parquet ha ancora almeno 3–4 mm di legno sopra la "tacca di levigatura", si può sempre restaurare.',
      },
      {
        heading: 'Quando Invece Conviene Sostituire',
        content: 'Ci sono situazioni in cui il restauro non è possibile o non è conveniente:',
        list: [
          'Parquet con marcescenza o danni da umidità strutturale: il legno marcio non si recupera.',
          'Prefinito già levigato al limite: se lo strato nobile è consumato, non c\'è più margine.',
          'Parquet con deformazioni profonde o bombature: indica problemi al sottofondo che vanno risolti.',
          'Danni da allagamento esteso: se l\'acqua ha permanentemente deformato i listelli.',
          'Materiale di scarsa qualità originale: a volte costa meno ripartire che recuperare.',
        ],
      },
      {
        heading: 'Il Processo di Restauro Parquet: Come Funziona',
        content: 'Quando interveniamo per un restauro parquet, seguiamo sempre questo processo:',
        list: [
          '1. Sopralluogo gratuito: valutiamo la gravità del danno, misuriamo l\'umidità, controlliamo il sottofondo.',
          '2. Eventuali riparazioni: sostituiamo i listelli irrecuperabili, fissiamo quelli sollevati.',
          '3. Levigatura a secco: rimuoviamo la finitura vecchia, livelliamo il piano, eliminiamo graffi e segni.',
          '4. Stuccatura: riempiamo le fessure con stucco di legno nella tonalità giusta.',
          '5. Finitura: applichiamo olio naturale, cera o vernice a water-based per proteggere e valorizzare.',
          '6. Lucidatura finale: il pavimento torna a brillare come al primo giorno.',
        ],
      },
      {
        heading: 'Levigatura Parquet: Quante Volte si Può Fare?',
        content: 'Una domanda che ci fanno spesso. La risposta dipende dal tipo di parquet:',
        list: [
          'Parquet massello (10–22 mm): si può levigare 4–6 volte nell\'arco di 50–80 anni.',
          'Parquet prefinito (strato nobile 2–6 mm): al massimo 1–2 levigature.',
          'Prefinito thin (strato ≤ 2 mm): non si leviga, va sostituito.',
          'Come capire se c\'è ancora margine: cercare la "tacca di levigatura" — un segno sul bordo del listello che indica il limite minimo.',
        ],
        tip: 'Non aspettare che il parquet sia completamente rovinato per levigarlo. Prima intervieni, meno materiale perdi e meno costi.',
      },
    ],
    faq: [
      { q: 'Quanto dura il processo di levigatura?', a: 'Per un appartamento medio (80–100 mq) la levigatura richiede 1–2 giorni. Il parquet è calpestabile dopo 24–48 ore dalla finitura.' },
      { q: 'Si può levigare il parquet senza togliere i mobili?', a: 'No, è necessario liberare completamente l\'ambiente. Le macchine leva parquet sono grandi e devono passare liberamente.' },
      { q: 'Ogni quanto si leviga il parquet?', a: 'Dipende dall\'usura. In media ogni 10–15 anni per ambienti residenziali. Prima se il pavimento ha molto traffico o animali domestici.' },
      { q: 'Il restauro crea polvere?', a: 'Lavoriamo con aspiratori industriali collegati alle levigatrici per ridurre al minimo la polvere. Consigliamo comunque di proteggere mobili e tendaggi adiacenti.' },
    ],
  },

  'spc-vs-parquet': {
    title: 'SPC vs Parquet Tradizionale: Confronto Onesto 2026',
    subtitle: 'Quando scegliere l\'SPC e quando il parquet in legno? La verità senza filtri.',
    excerpt: 'SPC, PVC e laminato stanno conquistando sempre più spazio. Ma vale davvero la pena sceglierli rispetto al parquet in legno? Confronto onesto da esperti.',
    category: 'Confronto',
    readTime: '5 min',
    date: 'Maggio 2026',
    dateISO: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80',
    metaTitle: 'SPC vs Parquet: Quale Scegliere? Confronto 2026 | Arteparquet',
    metaDescription: 'Confronto completo SPC vs parquet tradizionale. Prezzi, durata, aspetto, posa. Quale scegliere nel 2026? La guida degli esperti Arteparquet.',
    keywords: ['SPC vs parquet', 'pavimento SPC', 'PVC vs parquet', 'laminato o parquet'],
    sections: [
      {
        heading: 'Cos\'è l\'SPC e Perché Sta Crescendo',
        content: 'SPC sta per Stone Plastic Composite: un pavimento rigido composto da calcare e PVC, con un film decorativo che riproduce fedelmente l\'aspetto del legno. Negli ultimi anni il settore ha fatto passi enormi in qualità estetica, e oggi molti SPC di fascia alta sono quasi indistinguibili dal parquet a prima vista.',
        list: [
          'Impermeabile al 100%: non teme acqua, vapore, umidità.',
          'Stabile: non si dilata, non si contrae con il calore.',
          'Resistente ai graffi: più del legno.',
          'Posa rapida: galleggiante con click, spesso anche su pavimento esistente.',
          'Manutenzione minima: si pulisce con acqua e panno.',
        ],
      },
      {
        heading: 'Dove l\'SPC Vince sul Parquet',
        content: 'Ci sono ambienti in cui l\'SPC è chiaramente la scelta migliore:',
        list: [
          'Bagni e lavanderie: l\'unica alternativa sensata. Il legno non può reggere l\'umidità costante.',
          'Cucine aperte: vicino al lavello e ai fornelli, l\'SPC non soffre.',
          'Appartamenti in affitto: resistenza alta, manutenzione bassa, sostituzione economica.',
          'Posa su riscaldamento a pavimento instabile: l\'SPC è più indifferente agli sbalzi termici.',
          'Budget limitato: l\'SPC di qualità costa meno del parquet in legno, posa inclusa.',
        ],
        tip: 'Se vuoi riscaldamento a pavimento con un sistema ad acqua ad alte temperature, valuta sempre la compatibilità del materiale prima di scegliere.',
      },
      {
        heading: 'Dove il Parquet Vince sull\'SPC',
        content: 'Per quanto l\'SPC sia migliorato, il legno naturale mantiene vantaggi che non si possono replicare:',
        list: [
          'Valore dell\'immobile: il parquet massello aumenta il valore di vendita. L\'SPC no.',
          'Invecchiamento: il legno migliora con gli anni, acquista patina e carattere. L\'SPC si consuma.',
          'Sensazione al tatto e al passo: il legno è caldo, vivo. L\'SPC suona "vuoto" se non ha buon sottofondo.',
          'Sostenibilità: il legno è una risorsa rinnovabile. Il PVC è plastica.',
          'Longevità: un parquet massello curato dura 50–100 anni. L\'SPC di buona qualità 20–25 anni.',
          'Restauro: il parquet si leviga e si rinnova. L\'SPC si butta e si ricompra.',
        ],
      },
      {
        heading: 'Il Laminato: Il Meno Consigliato',
        content: 'Il laminato è spesso confuso con l\'SPC o con il parquet. È un prodotto diverso: un supporto in HDF con un film fotografico in superficie. La qualità è in genere inferiore sia all\'SPC sia al parquet. Non si leviga, non è impermeabile, e dopo 10–15 anni va sostituito. Lo consigliamo solo per budget molto ridotti o installazioni temporanee.',
      },
      {
        heading: 'Il Nostro Consiglio',
        content: 'Dopo 30 anni in questo settore, la nostra risposta è sempre la stessa: dipende dall\'ambiente e dall\'uso.',
        list: [
          'Bagno, cucina, zona umida → SPC o PVC di qualità.',
          'Soggiorno, camere, corridoio in appartamento → parquet prefinito se vuoi sicurezza, massello se vuoi il massimo.',
          'Immobile di pregio, ristrutturazione importante → parquet massello senza dubbi.',
          'Affitto, lavoro temporaneo → SPC galleggiante.',
        ],
      },
    ],
    faq: [
      { q: 'L\'SPC si può levigare?', a: 'No. L\'SPC non si leviga: quando è consumato va sostituito. Il parquet in legno massello si leviga 4–6 volte nel corso della vita.' },
      { q: 'SPC o parquet per il riscaldamento a pavimento?', a: 'Entrambi possono essere compatibili, ma dipende dal sistema. L\'SPC tolera temperature fino a 28°C. Il massello richiede un sistema a bassa temperatura (max 40°C). Il prefinito è spesso la scelta ottimale per il riscaldamento a pavimento.' },
      { q: 'Il laminato è parquet?', a: 'No. Il laminato non è parquet. È un prodotto diverso: un supporto in HDF con un film fotografico. Non è legno, non si leviga, e la durata è inferiore. Spesso viene confuso nei preventivi online.' },
    ],
  },

  'posa-parquet-spina-di-pesce': {
    title: 'Parquet a Spina di Pesce: Guida Completa alla Posa',
    subtitle: 'Il pattern più elegante del momento. Come funziona, quanto costa e quando sceglierlo.',
    excerpt: 'Il parquet a spina di pesce è il pattern più richiesto negli interni di design. Scopri cos\'è, come si posa, i pro e contro e come sceglierlo.',
    category: 'Posa',
    readTime: '7 min',
    date: 'Aprile 2026',
    dateISO: '2026-04-08',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=1200&q=80',
    metaTitle: 'Parquet a Spina di Pesce: Guida e Posa 2026 | Arteparquet',
    metaDescription: 'Come si posa il parquet a spina di pesce? Cos\'è il chevron? Guida completa con differenze, vantaggi e consigli per il tuo progetto in Lombardia.',
    keywords: ['parquet spina di pesce', 'posa spina di pesce', 'parquet chevron', 'parquet herringbone'],
    sections: [
      {
        heading: 'Cos\'è la Posa a Spina di Pesce',
        content: 'La posa a spina di pesce (in inglese "herringbone") è uno dei pattern più antichi e pregiati nella storia del parquet. I listelli vengono posati a 45° o 90° in modo da formare un motivo a "V" o "zigzag" continuo, che ricorda appunto la lisca di un pesce. Si ritrova nei palazzi storici di Milano, nelle ville del Settecento, nei teatri d\'opera — e oggi è tornato protagonista assoluto del design d\'interni moderno.',
      },
      {
        heading: 'Spina di Pesce vs Chevron: La Differenza',
        content: 'Molti li confondono, ma sono due pose diverse:',
        list: [
          'Spina di pesce (herringbone): i listelli sono tagliati a 90° e si incastrano in modo da formare la "V". La giunzione crea uno zigzag perfetto.',
          'Chevron: i listelli sono tagliati con un angolo (45° o 60°) e si incontrano a punta, formando un pattern a "V" continuo senza interruzioni.',
          'Visivamente: il chevron è più fluido e moderno, la spina di pesce è più classica e strutturata.',
          'Costo: il chevron è leggermente più caro perché ogni listello richiede un taglio angolato preciso.',
        ],
        tip: 'Per interni classici o ristrutturazioni storiche, la spina di pesce tradizionale. Per ambienti contemporanei e minimalisti, il chevron è spesso più d\'effetto.',
      },
      {
        heading: 'Perché Scegliere la Spina di Pesce',
        content: 'Il parquet a spina di pesce non è solo una questione di moda: ha vantaggi pratici e estetici concreti.',
        list: [
          'Visivamente amplia gli spazi: il pattern diagonale allunga visivamente le stanze strette.',
          'Movimento e carattere: rompe la monotonia delle pose a correre, dà vita all\'ambiente.',
          'Senza tempo: non invecchia. A differenza di altre mode del design, la spina di pesce era bella nel 1700 ed è bella nel 2026.',
          'Valorizza l\'immobile: è percepita come una lavorazione di pregio, aumenta il valore percepito dell\'appartamento.',
          'Si abbina a tutto: rovere naturale, tinto grigio, biondo scandinavo — funziona con qualsiasi finitura.',
        ],
      },
      {
        heading: 'I Punti di Attenzione Prima di Sceglierla',
        content: 'La spina di pesce è più complessa della posa a correre. Ecco cosa devi sapere prima di decidere:',
        list: [
          'Più scarto di materiale: il taglio a 45° genera uno scarto del 10–15% in più rispetto alla posa a correre. Calcola più materiale.',
          'Più tempo di posa: un posatore esperto impiega circa il 30–40% in più rispetto alla posa classica.',
          'Richiede un posatore esperto: gli errori nel pattern si vedono subito e sono difficili da correggere. Non è lavoro per principianti.',
          'Il sottofondo deve essere perfetto: irregolarità nel massetto si amplificano con la posa diagonale.',
        ],
        tip: 'Non comprare il materiale senza prima misurare lo scarto con il tuo posatore. Ogni ambiente e ogni essenza ha un tasso di scarto diverso.',
      },
      {
        heading: 'Le Essenze Migliori per la Spina di Pesce',
        content: 'Non tutte le essenze si adattano ugualmente bene alla posa a spina di pesce:',
        list: [
          'Rovere: il classico intramontabile. Disponibile in centinaia di finiture, dalla naturale alla tinta grigio cemente.',
          'Noce: per un effetto più caldo e avvolgente, perfetto nei soggiorni di rappresentanza.',
          'Frassino biondo: per uno stile scandinavo luminoso.',
          'Rovere fumé o carbonizzato: per interni dark e contemporanei.',
        ],
      },
    ],
    faq: [
      { q: 'Il parquet a spina di pesce si può fare in tutti gli ambienti?', a: 'Sì, ma con alcune accortezze. In stanze molto piccole o molto strette, il pattern diagonale può confondere la percezione. Per ambienti sotto i 15 mq, valuta insieme al posatore se è la scelta giusta.' },
      { q: 'Quanto scarto devo calcolare per la spina di pesce?', a: 'Calcola uno scarto del 15–20% rispetto alla superficie da coprire. Se la stanza è 30 mq, ordina materiale per almeno 34–36 mq.' },
      { q: 'Si può posare la spina di pesce su pavimento esistente?', a: 'Dipende. Se il sottofondo è in legno (vecchio parquet), spesso è possibile con le opportune preparazioni. Su piastrelle, è necessario valutare l\'altezza e la planarità. Il sopralluogo gratuito è fondamentale per capirlo.' },
    ],
  },

  'levigatura-parquet-guida': {
    title: 'Levigatura Parquet: La Guida Completa per Rinnovarlo',
    subtitle: 'Quando farlo, come funziona e cosa aspettarsi. Tutto sulla levigatura del parquet.',
    excerpt: 'La levigatura è il modo migliore per rinnovare un parquet consumato. Scopri come funziona, quando farla e come scegliere la finitura giusta.',
    category: 'Restauro',
    readTime: '6 min',
    date: 'Marzo 2026',
    dateISO: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=1200&q=80',
    metaTitle: 'Levigatura Parquet: Guida Completa 2026 | Arteparquet Bergamo',
    metaDescription: 'Levigatura parquet: come funziona, quando farla, quale finitura scegliere. Guida completa da esperti con 30 anni di esperienza in Lombardia.',
    keywords: ['levigatura parquet', 'levigare parquet', 'parquet levigato', 'rinnovare parquet'],
    sections: [
      {
        heading: 'Perché la Levigatura è il Miglior Investimento per il Tuo Parquet',
        content: 'La levigatura del parquet è l\'operazione di manutenzione straordinaria più importante che puoi fare per il tuo pavimento in legno. Elimina graffi, opacità, macchie e segni dell\'usura, riportando il parquet al suo splendore originale — spesso anche meglio di come era in origine, se si sceglie una nuova finitura di qualità.',
      },
      {
        heading: 'Quando è il Momento di Levigare',
        content: 'Il parquet ti manda segnali quando ha bisogno di levigatura:',
        list: [
          'Graffi profondi visibili anche da lontano.',
          'Superficie opaca e spenta nonostante la pulizia.',
          'Macchie che non si rimuovono con i normali prodotti.',
          'Vernice che si screpola o si stacca in piccole schegge.',
          'Cambiamento di colore ingiallito o annerito.',
          'Vuoi cambiare completamente finitura (da verniciato a oliato, o da chiaro a scuro).',
        ],
        tip: 'Non aspettare che il parquet sia completamente rovinato. Prima intervieni, meno materiale perdi. Un parquet levigato in tempo dura il doppio.',
      },
      {
        heading: 'Il Processo di Levigatura Passo per Passo',
        content: 'Ecco come lavoriamo noi di Arteparquet quando interveniamo per una levigatura:',
        list: [
          '1. Preparazione: protezione di porte, arredi vicini, rimozione zoccolini se necessario.',
          '2. Prima levigatura grezza (grana 24–40): rimozione della vecchia finitura con levigatrice a nastro.',
          '3. Levigatura intermedia (grana 60–80): eliminazione dei segni della prima passata.',
          '4. Levigatura fine (grana 100–120): superficie liscia pronta per la finitura.',
          '5. Stuccatura: riempimento di fessure e nodi con stucco nella tonalità del legno.',
          '6. Applicazione della finitura: olio naturale, vernice a water-based o cera.',
          '7. Lucidatura finale: il parquet torna a brillare.',
        ],
      },
      {
        heading: 'Olio, Vernice o Cera? Come Scegliere la Finitura',
        content: 'La finitura determina l\'aspetto finale e le necessità di manutenzione del tuo parquet:',
        list: [
          'Verniciato (polyurethano): la finitura più resistente e più facile da pulire. Forma un film protettivo sopra il legno. Aspetto più brillante o satinato. Manutenzione minima.',
          'Oliato (olio naturale): penetra nel legno e lo nutre dall\'interno. Aspetto più naturale e "vivo". Richiede rioli annuali con olio manutenzione. Perfetto per chi ama il legno autentico.',
          'Ceroso: finitura tradizionale, aspetto materico e antico. Richiede lucidatura periodica. Più adatto per parquet storici.',
          'Water-based (idrosolubile): la versione moderna della vernice. Resistente, ecologica, odore minimo durante l\'applicazione.',
        ],
        tip: 'La scelta tra olio e vernice è personale. L\'olio è più naturale ma richiede più cura. La vernice è più pratica ma meno "viva". Entrambe sono ottime se applicate bene.',
      },
      {
        heading: 'Quanto Tempo Ci Vuole e Quando si può Calpestare',
        content: 'Tempi tipici per un appartamento di 80–100 mq:',
        list: [
          'Levigatura + finitura verniciata: 2 giorni lavorativi. Calpestabile dopo 24–48 ore.',
          'Levigatura + finitura oliata: 2–3 giorni (l\'olio richiede più mani e tempi di asciugatura).',
          'Stanze con molto lavoro artigianale: anche 3–4 giorni.',
          'I mobili si possono rimettere dopo 5–7 giorni dalla finitura per non rischiare segni.',
        ],
      },
    ],
    faq: [
      { q: 'Quante volte si può levigare un parquet massello?', a: 'Un parquet massello standard (18–22 mm) si può levigare 4–6 volte nell\'arco della vita. Ogni levigatura rimuove circa 1–2 mm di legno.' },
      { q: 'La levigatura fa molta polvere?', a: 'Lavoriamo con aspiratori professionali collegati alle levigatrici. La polvere viene ridotta al minimo, ma consigliamo di proteggere i mobili adiacenti e di non essere in casa durante la levigatura.' },
      { q: 'Si può levigare solo una parte del parquet?', a: 'È possibile levigare zone localizzate, ma il risultato estetico potrebbe non essere uniforme tra la parte levigata e quella non levigata. In genere consigliamo di levigare l\'intero ambiente.' },
      { q: 'Quanto costa la levigatura parquet?', a: 'Il prezzo dipende dalla superficie, dal tipo di finitura e dallo stato del parquet. Il preventivo è sempre gratuito e senza impegno: contattateci per un sopralluogo.' },
    ],
  },

  'parquet-massello-guida': {
    title: 'Parquet Massello: Tutto Quello che Devi Sapere',
    subtitle: 'Il migliore pavimento in legno esistente. Caratteristiche, vantaggi, manutenzione e posa.',
    excerpt: 'Il parquet massello è legno puro al 100%. La scelta più pregiata, duratura e valorizzante per la tua casa. Guida completa da esperti posatori.',
    category: 'Materiali',
    readTime: '7 min',
    date: 'Febbraio 2026',
    dateISO: '2026-02-22',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=1200&q=80',
    metaTitle: 'Parquet Massello: Guida Completa 2026 | Arteparquet',
    metaDescription: 'Parquet massello: cos\'è, vantaggi, essenze, manutenzione e posa. Guida completa di esperti posatori con 30 anni di esperienza in Lombardia.',
    keywords: ['parquet massello', 'pavimento legno massello', 'parquet massello rovere', 'posa parquet massello'],
    sections: [
      {
        heading: 'Cos\'è il Parquet Massello',
        content: 'Il parquet massello è il pavimento in legno nella sua forma più pura: ogni listello è ricavato da un unico blocco di legno pieno, senza strati, senza colle interne, senza materiali di supporto. Puro legno dall\'alto al basso. Lo spessore varia dai 10 ai 22 mm — più è spesso, più volte si può levigare nel corso degli anni.',
      },
      {
        heading: 'Perché il Massello è il Migliore',
        content: 'Il parquet massello non è il più costoso per caso. Ha caratteristiche che nessun altro pavimento può replicare:',
        list: [
          'Longevità eccezionale: con la giusta manutenzione dura 50, 80, anche 100 anni.',
          'Levigabile 4–6 volte: ogni levigatura toglie 1–2 mm di legno, rinnovando completamente la superficie.',
          'Valore immobiliare: aumenta il valore di vendita dell\'appartamento in modo significativo.',
          'Calore naturale: il legno pieno è il materiale più caldo al piede — in estate fresco, in inverno caldo.',
          'Unicità: ogni listello è diverso dagli altri. Il tuo pavimento è unico al mondo.',
          'Sostenibile: il legno è rinnovabile. Un massello curato non va a rifiuti per 100 anni.',
        ],
      },
      {
        heading: 'Le Essenze di Massello Più Richieste',
        content: 'Le specie di legno hanno caratteristiche fisiche diverse (durezza, stabilità, colore) che influenzano la scelta:',
        list: [
          'Rovere (quercus): il più richiesto. Durezza media-alta, venatura nobile, disponibile in infinite finiture. Perfetto per ogni stile.',
          'Noce (juglans): venatura ricca e calda, colore cioccolato. Pregiato e di carattere, ideale per ambienti formali.',
          'Frassino (fraxinus): tono chiaro e nordico, venatura fine. Perfetto per interni scandinavi o minimal.',
          'Merbau: legno tropicale duro e stabile, colore scuro rossiccio. Molto resistente.',
          'Iroko: esotico ma meno costoso del merbau, caldo e omogeneo.',
          'Ciliegio americano: colore rosato con venature fini, migliora col tempo diventando più dorato.',
        ],
      },
      {
        heading: 'Come si Posa il Parquet Massello',
        content: 'Il massello richiede la posa incollata — non si può usare il sistema galleggiante (click). Questo perché il legno pieno "respira" con l\'umidità e deve essere ancorato al sottofondo.',
        list: [
          'Acclimatazione: prima della posa, il massello deve restare nell\'ambiente per 48–72 ore per adattarsi all\'umidità locale.',
          'Preparazione del sottofondo: il massetto deve essere perfettamente piano (tolleranza max 2 mm su 2 metri), secco (umidità < 2%) e pulito.',
          'Incollaggio: si usa colla bituminosa o poliuretanica monocomponente, stesa con spatola dentata.',
          'Chiodatura (opzionale): su sottofondo in legno esistente, si chioda il massello in aggiunta alla colla.',
          'Levigatura post-posa: dopo 48h dall\'incollaggio, si leva la superficie per livellare eventuali differenze tra i listelli.',
          'Finitura: si applica la finitura scelta (olio o vernice).',
        ],
        tip: 'Il massetto deve essere completamente asciutto prima della posa. Se c\'è ancora umidità residua, il massello si solleverà. Misuriamo sempre l\'umidità al sopralluogo gratuito.',
      },
      {
        heading: 'Manutenzione del Parquet Massello',
        content: 'Un massello ben curato dura per sempre. Ecco cosa fare:',
        list: [
          'Pulizia quotidiana: panno in microfibra leggermente umido. Evitare acqua in eccesso.',
          'Prodotti specifici: usare solo detergenti per parquet, mai prodotti aggressivi.',
          'Tappeti e feltri: mettere sotto i mobili pesanti i feltri protettivi. Evitare rotelle metalliche sulle sedie.',
          'Umidità costante: l\'ideale è 40–60% di umidità relativa. Evitare sbalzi bruschi.',
          'Manutenzione parquet oliato: ritrattamento con olio manutenzione ogni 1–2 anni.',
          'Levigatura ogni 10–15 anni: o quando i segni diventano troppo evidenti.',
        ],
      },
    ],
    faq: [
      { q: 'Il parquet massello si può mettere sul riscaldamento a pavimento?', a: 'Sì, ma con alcune condizioni. Il sistema deve essere a bassa temperatura (massimo 40°C di mandata, 29°C in superficie). Il massetto deve essere completamente asciutto. Consigliamo essenze stabili come rovere o merbau.' },
      { q: 'Quanto costa il parquet massello?', a: 'Il prezzo varia molto in base all\'essenza, alla larghezza dei listelli e alla finitura. Il preventivo è sempre gratuito: contattateci per un sopralluogo senza impegno.' },
      { q: 'Parquet massello o prefinito: quale vale di più?', a: 'Il massello vale di più sia in termini di pregio percepito sia di valore immobiliare reale. In una trattativa di acquisto casa, un parquet massello ben conservato è un plus concreto.' },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) return {}
  return {
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: `https://arteparquet.pro/blog/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.dateISO,
      authors: ['Arteparquet — Arabi Mohamed'],
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: {
      '@type': 'Person',
      name: 'Arabi Mohamed',
      jobTitle: 'Maestro Posatore',
      url: 'https://arteparquet.pro/chi-siamo',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Arteparquet',
      url: 'https://arteparquet.pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://arteparquet.pro/og-image.jpg',
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://arteparquet.pro/blog/${slug}` },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-nero-marquina pt-32 pb-0 md:pt-44">
        <div className="container-wide pb-16">
          <FadeIn direction="up">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sans text-[12px] text-white/50 hover:text-white/80 transition-colors mb-8"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Torna al Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere bg-rovere/10 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 font-sans text-[12px] text-white/40">
                <Clock size={12} aria-hidden="true" /> {article.readTime} di lettura
              </span>
              <span className="flex items-center gap-1.5 font-sans text-[12px] text-white/40">
                <Calendar size={12} aria-hidden="true" /> {article.date}
              </span>
            </div>
            <h1
              className="font-serif font-semibold text-white leading-[1.08] mb-5 text-balance max-w-3xl"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
            >
              {article.title}
            </h1>
            <p className="font-sans text-white/65 max-w-2xl leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.125rem)' }}
            >
              {article.subtitle}
            </p>
          </FadeIn>
        </div>

        {/* Cover image */}
        <div className="container-wide pb-0">
          <div
            className="w-full aspect-[16/7] rounded-t-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image})` }}
            role="img"
            aria-label={article.title}
          />
        </div>
      </section>

      {/* Article content */}
      <section className="bg-travertino">
        <div className="container-wide py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Main content */}
            <div className="max-w-none">
              {article.sections.map((section, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.06}>
                  <div className="mb-12">
                    <h2 className="font-serif font-semibold text-legno-bruciato mb-4 text-balance"
                      style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                    >
                      {section.heading}
                    </h2>
                    <p className="font-sans text-[16px] text-neutral-600 leading-relaxed mb-4">
                      {section.content}
                    </p>
                    {section.list && (
                      <ul className="space-y-2.5 mb-4">
                        {section.list.map((item, j) => (
                          <li key={j} className="flex gap-3 items-start">
                            <CheckCircle size={17} className="text-rovere flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="font-sans text-[15px] text-neutral-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.tip && (
                      <div className="bg-wood-50 border-l-4 border-rovere rounded-r-xl p-5">
                        <p className="font-sans text-[14px] text-legno-bruciato leading-relaxed">
                          <strong>Consiglio dell&apos;esperto:</strong> {section.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}

              {/* FAQ */}
              <FadeIn direction="up">
                <div className="mt-12 pt-12 border-t border-neutral-200">
                  <h2 className="font-serif font-semibold text-legno-bruciato mb-8"
                    style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                  >
                    Domande Frequenti
                  </h2>
                  <div className="space-y-5">
                    {article.faq.map((item, i) => (
                      <div key={i} className="rounded-2xl border border-neutral-100 bg-white p-6">
                        <h3 className="font-sans font-semibold text-legno-bruciato text-[15px] mb-3">
                          {item.q}
                        </h3>
                        <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-28">
              {/* Author card */}
              <FadeIn direction="right">
                <div className="rounded-2xl border border-neutral-100 bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-nero-marquina flex items-center justify-center">
                      <span className="font-serif font-bold text-rovere text-xl">A</span>
                    </div>
                    <div>
                      <p className="font-sans text-[14px] font-semibold text-legno-bruciato">Arabi Mohamed</p>
                      <p className="font-sans text-[12px] text-neutral-500">Maestro Posatore · 30 anni di esperienza</p>
                    </div>
                  </div>
                  <p className="font-sans text-[13px] text-neutral-600 leading-relaxed">
                    Carriera nel parquet dal 1996. Nel 2004 fa parte del team per il Teatro alla Scala di Milano.
                    Oggi al tuo servizio in Lombardia e tutta Italia.
                  </p>
                </div>
              </FadeIn>

              {/* CTA card */}
              <FadeIn direction="right" delay={0.1}>
                <div className="rounded-2xl bg-nero-marquina p-6 text-white">
                  <p className="font-serif font-semibold text-[1.1rem] text-white mb-3">
                    Hai un progetto in mente?
                  </p>
                  <p className="font-sans text-[13px] text-white/65 leading-relaxed mb-5">
                    Sopralluogo e preventivo gratuiti. Senza impegno.
                  </p>
                  <Link
                    href="/contatti"
                    className="group inline-flex items-center gap-2 w-full justify-center px-5 py-3.5 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 transition-all duration-200"
                  >
                    Richiedi Preventivo
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <a
                    href="tel:+393892407827"
                    className="mt-3 inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-lg border border-white/20 text-white/80 font-sans text-[13px] hover:border-white/50 hover:bg-white/5 transition-all duration-200"
                  >
                    +39 389 240 7827
                  </a>
                </div>
              </FadeIn>

              {/* Related articles */}
              <FadeIn direction="right" delay={0.15}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-6">
                  <p className="font-sans text-[12px] font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                    Leggi anche
                  </p>
                  <div className="space-y-3">
                    {Object.entries(ARTICLES)
                      .filter(([s]) => s !== slug)
                      .slice(0, 3)
                      .map(([s, a]) => (
                        <Link
                          key={s}
                          href={`/blog/${s}`}
                          className="group flex items-start gap-2 text-left"
                        >
                          <ArrowRight size={13} className="text-rovere flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          <span className="font-sans text-[13px] text-neutral-700 group-hover:text-rovere transition-colors leading-snug">
                            {a.title}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              </FadeIn>
            </aside>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
