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
      { heading: 'Pulizia Quotidiana', text: 'Passa l\'aspirapolvere con spazzola morbida o un panno in microfibra asciutto per rimuovere polvere e detriti. I granelli di sabbia sono il nemico numero uno: graffiano la superficie ad ogni passo. Metti zerbini agli ingressi.' },
      { heading: 'Pulizia Periodica', text: 'Una volta a settimana usa un panno umido (strizzato bene, non gocciolante) con detergente neutro specifico per parquet. Mai acqua abbondante sul legno. Asciuga subito eventuali schizzi o versamenti.' },
      { heading: 'Cosa Evitare Assolutamente', text: 'No a: vapore (gonfia il legno), ammoniaca e candeggina (scoloriscono), cere siliconiche su vernice (creano patina scivolosa), panni bagnati, acqua stagnante. Questi errori danneggiano la finitura e il legno.' },
      { heading: 'Manutenzione Finitura Olio', text: 'Il parquet oliato richiede rioliatura periodica (ogni 1-2 anni in ambienti residenziali). Applica olio di manutenzione con panno, lascia assorbire, lucida. Puoi farlo da solo o chiamarci per un trattamento professionale.' },
    ],
    faq: [
      { q: 'Ogni quanto devo riverniciare il parquet?', a: 'La vernice dura 10-15 anni in condizioni normali. Quando inizia a opacizzarsi o graffiarsi facilmente è il momento di levigare e riverniciare.' },
      { q: 'Posso usare il vaporetto sul parquet?', a: 'No. Il vapore penetra nelle fessure e fa gonfiare il legno, causando sollevamenti e deformazioni. Usa solo panni umidi strizzati.' },
      { q: 'Come tolgo una macchia dal parquet?', a: 'Dipende dalla macchia. Per liquidi agisci subito con panno assorbente. Per macchie secche prova con detergente neutro. Per danni profondi potrebbe servire una levigatura locale. Contattaci per una valutazione.' },
    ],
    relatedLinks: [
      { title: 'Levigatura Parquet', href: '/levigatura-parquet' },
      { title: 'Riparazione Parquet', href: '/riparazione-parquet' },
      { title: 'Contattaci', href: '/contatti' },
    ],
  },
  'parquet-bagno-cucina': {
    title: 'Parquet in Bagno e Cucina: Si Può Fare?',
    metaTitle: 'Parquet in Bagno e Cucina | Guida Completa',
    metaDescription: 'Si può mettere il parquet in bagno o cucina? Pro, contro, alternative impermeabili come SPC. Consigli pratici per ambienti umidi.',
    bluf: 'Il parquet vero in bagno è possibile ma rischioso: richiede essenze resistenti (teak, iroko), finitura olio-cera, manutenzione attenta e asciugatura immediata degli schizzi. Per la maggior parte delle persone consigliamo SPC impermeabile al 100%: stesso effetto legno, zero rischi, manutenzione minima.',
    content: [
      { heading: 'Il Problema dell\'Umidità', text: 'Il legno è igroscopico: assorbe e rilascia umidità. In bagno e cucina l\'esposizione costante a vapore, schizzi e possibili allagamenti mette a dura prova qualsiasi parquet. Il rischio principale è il gonfiamento e la deformazione irreversibile.' },
      { heading: 'Parquet Vero in Bagno: Quando Funziona', text: 'Può funzionare con: essenze naturalmente oleose e resistenti (teak, iroko, doussiè), finitura a olio-cera (penetra nel legno), manutenzione scrupolosa, tappetini assorbenti vicino a doccia/vasca, asciugatura immediata di ogni schizzo. Non è per tutti.' },
      { heading: 'L\'Alternativa Perfetta: Pavimenti SPC', text: 'L\'SPC (Stone Polymer Composite) è impermeabile al 100%, ha l\'aspetto del legno vero con texture in rilievo, si installa sopra piastrelle esistenti senza demolire e non richiede manutenzione particolare. È la soluzione ideale per bagni e cucine.' },
      { heading: 'Parquet in Cucina', text: 'La cucina è meno critica del bagno: l\'umidità è occasionale, non costante. Un buon parquet verniciato o oliato funziona bene se asciughi subito gli schizzi. Evita zone direttamente davanti al lavello senza tappetino protettivo.' },
    ],
    faq: [
      { q: 'Il parquet in bagno si rovina subito?', a: 'Non necessariamente. Con le giuste precauzioni può durare anni. Ma richiede attenzione costante che molti non vogliono o non possono garantire. L\'SPC è la scelta più pratica.' },
      { q: 'Posso mettere parquet vicino alla doccia?', a: 'Sconsigliato. Anche con teak e olio-cera, l\'esposizione diretta a schizzi frequenti è troppo aggressiva. Meglio una zona piastrellata o SPC vicino alla doccia e parquet nel resto del bagno.' },
      { q: 'L\'SPC sembra finto?', a: 'I modelli di qualità hanno texture sincronizzata che replica fedelmente le venature. Al tatto e alla vista è difficile distinguerlo dal vero legno. Ti mostriamo i campioni.' },
    ],
    relatedLinks: [
      { title: 'Pavimenti SPC', href: '/pavimenti-spc' },
      { title: 'Posa su Piastrelle', href: '/servizi/spc' },
      { title: 'Preventivo', href: '/preventivo' },
    ],
  },
  'parquet-scricchiola': {
    title: 'Parquet che Scricchiola: Cause e Soluzioni',
    metaTitle: 'Parquet Scricchiola | Cause e Come Risolvere',
    metaDescription: 'Perché il parquet scricchiola? Cause comuni e soluzioni professionali. Quando preoccuparsi e quando è normale. Interventi mirati senza rifare tutto.',
    bluf: 'Il parquet può scricchiolare per assestamento naturale (normale nei primi mesi), variazioni di umidità stagionali, problemi di posa (sottofondo irregolare, colla insufficiente) o usura. Spesso si risolve con interventi mirati come iniezione di resina o fissaggio puntuale, senza rifare l\'intero pavimento.',
    content: [
      { heading: 'Scricchiolii Normali vs Problematici', text: 'Nei primi 6-12 mesi dalla posa, leggeri scricchiolii sono normali: il legno si assesta. Anche in inverno, con riscaldamento acceso e aria secca, il parquet può "parlare". Preoccupati se gli scricchiolii sono forti, localizzati sempre nello stesso punto, o accompagnati da listelli che si muovono visibilmente.' },
      { heading: 'Cause Comuni', text: 'Sottofondo non perfettamente livellato, colla che ha ceduto in alcuni punti, umidità del massetto non corretta alla posa, dilatazione insufficiente ai bordi, listelli che sfregano tra loro. La diagnosi corretta è fondamentale per l\'intervento giusto.' },
      { heading: 'Soluzioni Professionali', text: 'Iniezione di resina sotto i listelli (riempie i vuoti), viti nascoste per fissare il parquet al sottofondo, stuccatura delle fessure, in casi gravi rimozione e riposa della zona interessata. Spesso bastano interventi localizzati.' },
      { heading: 'Quando Chiamare un Professionista', text: 'Se gli scricchiolii persistono da mesi, se sono forti e fastidiosi, se i listelli si muovono visibilmente, se noti sollevamenti o avvallamenti. Un sopralluogo permette di capire la causa e l\'intervento più adatto.' },
    ],
    faq: [
      { q: 'È normale che il parquet nuovo scricchioli?', a: 'Sì, nei primi mesi. Il legno si adatta all\'umidità dell\'ambiente. Se persistono oltre 6-12 mesi o sono molto forti, fai controllare.' },
      { q: 'Posso risolvere da solo?', a: 'Per scricchiolii lievi puoi provare talco nelle fessure (temporaneo). Per problemi persistenti serve un intervento professionale che non danneggi il parquet.' },
      { q: 'Bisogna rifare tutto il pavimento?', a: 'Quasi mai. Nella maggior parte dei casi bastano interventi mirati sulla zona interessata. Valutiamo sempre la soluzione meno invasiva.' },
    ],
    relatedLinks: [
      { title: 'Riparazione Parquet', href: '/riparazione-parquet' },
      { title: 'Levigatura', href: '/levigatura-parquet' },
      { title: 'Contattaci', href: '/contatti' },
    ],
  },
  'parquet-gonfiato-acqua': {
    title: 'Parquet Gonfiato dall\'Acqua: Cosa Fare',
    metaTitle: 'Parquet Gonfiato Acqua | Pronto Intervento e Soluzioni',
    metaDescription: 'Il parquet si è gonfiato per una perdita d\'acqua? Guida al pronto intervento: cosa fare subito, quando si recupera, quando va sostituito.',
    bluf: 'Agisci subito: asciuga l\'acqua visibile con panni, non usare phon o stufe (peggiorano), arieggia e chiama un professionista entro 24-48 ore. Il recupero dipende da: tempo di esposizione, tipo di parquet (massello recupera meglio del prefinito economico), quantità d\'acqua. Spesso si salva con asciugatura controllata e levigatura.',
    content: [
      { heading: 'Pronto Intervento: Cosa Fare Subito', text: '1) Blocca la fonte d\'acqua. 2) Asciuga l\'acqua visibile con panni assorbenti o aspiraliquidi. 3) NON usare phon, stufe o deumidificatori potenti direttamente sul parquet (causano deformazioni). 4) Arieggia l\'ambiente. 5) Chiama un professionista entro 24-48 ore.' },
      { heading: 'Cosa NON Fare', text: 'Non camminare sulla zona gonfia (peggiora il danno), non applicare calore diretto, non aspettare "che si asciughi da solo" (il danno progredisce), non tentare di schiacciare i rigonfiamenti (si spezzano i listelli).' },
      { heading: 'Quando Si Recupera', text: 'Il parquet massello ha ottime possibilità se l\'intervento è rapido (24-48 ore). Dopo asciugatura controllata (può richiedere settimane), si leviga e rifinisce. Il prefinito economico con supporto in HDF spesso non si recupera perché il supporto si sgretola.' },
      { heading: 'Quando Va Sostituito', text: 'Se l\'acqua è rimasta per giorni, se il supporto del prefinito si è disgregato, se il legno è diventato nero (muffe), se i listelli si sono spezzati. In questi casi si sostituiscono le zone danneggiate con legno compatibile.' },
    ],
    faq: [
      { q: 'Il parquet tornerà come prima?', a: 'Spesso sì, se intervieni in tempo. Dopo asciugatura e levigatura il risultato può essere ottimo. In alcuni casi restano lievi ondulazioni visibili solo in controluce.' },
      { q: 'Quanto tempo serve per asciugare?', a: 'Da 2 a 6 settimane con asciugatura controllata. La fretta è nemica: asciugare troppo velocemente causa crepe e deformazioni.' },
      { q: 'L\'assicurazione copre i danni?', a: 'Spesso sì, se hai una polizza casa con copertura danni da acqua. Documenta tutto con foto e conserva le fatture degli interventi. Possiamo fornirti documentazione tecnica per la pratica.' },
    ],
    relatedLinks: [
      { title: 'Riparazione Parquet', href: '/riparazione-parquet' },
      { title: 'Levigatura', href: '/levigatura-parquet' },
      { title: 'Restauro', href: '/restauro-parquet' },
    ],
  },
  'spina-italiana-vs-francese': {
    title: 'Spina Italiana vs Francese: Differenze e Scelta',
    metaTitle: 'Spina Italiana vs Francese | Quale Schema Scegliere',
    metaDescription: 'Differenze tra posa a spina italiana e spina francese. Pro e contro, effetto estetico, costi. Guida alla scelta dello schema di posa del parquet.',
    bluf: 'La spina italiana ha listelli tagliati a 90° che formano un angolo retto: effetto geometrico, moderno, elegante. La spina francese ha listelli tagliati a 45° (o 60°) con punte sfalsate: effetto più dinamico, classico, regale. Entrambe sono prestigiose e richiedono più materiale (+15-20%) e manodopera rispetto alla posa dritta.',
    content: [
      { heading: 'Spina Italiana (Spina di Pesce)', text: 'I listelli sono tagliati a 90° alle estremità e si incastrano formando un angolo retto. L\'effetto è geometrico e ordinato. È lo schema più diffuso in Italia (da qui il nome). Funziona bene in ambienti moderni e classici. Posa più semplice rispetto alla francese.' },
      { heading: 'Spina Francese (Spina Ungherese)', text: 'I listelli sono tagliati a 45° (o 60°) alle estremità. Le punte si allineano formando una linea continua che attraversa la stanza. L\'effetto è più dinamico e sfarzoso, tipico dei palazzi d\'epoca. Posa più complessa, richiede esperienza.' },
      { heading: 'Quale Scegliere', text: 'Spina italiana: ambienti moderni, minimalisti, geometrici. Spina francese: ambienti classici, palazzi storici, chi cerca il massimo del pregio. In entrambi i casi, la direzione della spina influenza la percezione dello spazio: lungo la stanza la allunga, trasversale la allarga.' },
      { heading: 'Costi e Materiale', text: 'Entrambe richiedono circa 15-20% di materiale in più rispetto alla posa dritta (per gli sfridi dei tagli). La manodopera costa di più perché richiede più tempo e precisione. La spina francese è leggermente più costosa della italiana per la complessità dei tagli.' },
    ],
    faq: [
      { q: 'Si può fare la spina su parquet esistente?', a: 'No. Lo schema di posa è definito all\'installazione. Per cambiare schema bisogna rimuovere il parquet e riposarlo (o sostituirlo). Non si può "convertire" una posa dritta in spina.' },
      { q: 'Quale schema è più resistente?', a: 'Sono equivalenti dal punto di vista strutturale. La differenza è puramente estetica. Entrambi sono stabili e duraturi se posati correttamente.' },
      { q: 'La spina va bene in stanze piccole?', a: 'Sì, ma attenzione alla direzione. In stanze piccole la spina può risultare "troppo" se i listelli sono larghi. Listelli stretti (6-7 cm) funzionano meglio. Possiamo consigliarti durante il sopralluogo.' },
    ],
    relatedLinks: [
      { title: 'Posa Parquet', href: '/servizi/posa' },
      { title: 'Parquet Massello', href: '/servizi/parquet-massello' },
      { title: 'Preventivo', href: '/preventivo' },
    ],
  },
  'umidita-massetto-posa': {
    title: 'Umidità del Massetto: Quando Posare il Parquet',
    metaTitle: 'Umidità Massetto Parquet | Valori Corretti per la Posa',
    metaDescription: 'Qual è l\'umidità corretta del massetto per posare il parquet? Come si misura, valori limite, tempi di asciugatura. Guida tecnica completa.',
    bluf: 'Il massetto deve avere umidità residua max 2% (misurata con igrometro a carburo) per massetti cementizi, max 0.5% per anidrite. Posare su massetto umido causa rigonfiamenti, scollamenti e muffe. Un massetto nuovo richiede 4-8 settimane di asciugatura. Misuriamo sempre prima della posa.',
    content: [
      { heading: 'Perché l\'Umidità è Critica', text: 'Il legno assorbe l\'umidità. Se il massetto è troppo umido, il vapore acqueo risale e viene assorbito dal parquet, causando rigonfiamenti, deformazioni, scollamento della colla e formazione di muffe. I danni possono manifestarsi anche mesi dopo la posa.' },
      { heading: 'Valori Limite', text: 'Massetto cementizio: max 2% di umidità residua. Massetto in anidrite (solfato di calcio): max 0.5%. Massetti con riscaldamento a pavimento: gli stessi valori, ma dopo aver fatto funzionare l\'impianto per almeno 2 settimane.' },
      { heading: 'Come si Misura', text: 'L\'unica misura affidabile è con igrometro a carburo (metodo CM). Si preleva un campione di massetto, si polverizza, si mette in una bomboletta con carburo di calcio e si misura la pressione generata. Strumenti a contatto o elettronici sono meno precisi.' },
      { heading: 'Tempi di Asciugatura', text: 'Un massetto cementizio tradizionale richiede circa 1 settimana per cm di spessore (quindi 4-6 settimane per un massetto da 4-6 cm). Massetti ad asciugatura rapida riducono i tempi. L\'ambiente deve essere ventilato e a temperatura stabile (15-25°C).' },
    ],
    faq: [
      { q: 'Il muratore dice che il massetto è asciutto. Basta?', a: 'No. La superficie può sembrare asciutta mentre l\'interno è ancora umido. Solo la misura con igrometro a carburo certifica l\'idoneità. Non rischiare danni costosi per fretta.' },
      { q: 'Cosa succede se poso su massetto umido?', a: 'Nei primi mesi può sembrare tutto ok. Poi iniziano rigonfiamenti, listelli che si sollevano, macchie scure (muffe sotto il parquet). Il danno spesso richiede la rimozione totale del pavimento.' },
      { q: 'Misurate voi l\'umidità?', a: 'Sì, sempre. Prima di ogni posa facciamo la verifica con igrometro a carburo. Se i valori non sono corretti, non posiamo e ti spieghiamo cosa fare per accelerare l\'asciugatura.' },
    ],
    relatedLinks: [
      { title: 'Posa Parquet', href: '/servizi/posa' },
      { title: 'Parquet e Riscaldamento', href: '/guida/parquet-riscaldamento-pavimento' },
      { title: 'Contattaci', href: '/contatti' },
    ],
  },
  'parquet-graffi-macchie': {
    title: 'Graffi e Macchie sul Parquet: Come Rimuoverli',
    metaTitle: 'Graffi e Macchie Parquet | Guida alla Rimozione',
    metaDescription: 'Come togliere graffi e macchie dal parquet: soluzioni fai-da-te per danni lievi, quando serve un professionista. Guida pratica completa.',
    bluf: 'Graffi superficiali sulla vernice si attenuano con prodotti specifici (penne ritocco, cere colorate). Graffi profondi nel legno richiedono stuccatura e levigatura locale o totale. Le macchie dipendono dalla causa: acqua, vino, inchiostro, urina hanno trattamenti diversi. Per macchie nere penetrate nel legno spesso serve la sostituzione del listello.',
    content: [
      { heading: 'Graffi Superficiali', text: 'Se il graffio è solo sulla vernice (si vede il colore uniforme, non il legno sotto), puoi provare: penne ritocco del colore giusto, cere riparatrici, olio di noce su parquet oliati. Questi rimedi attenuano il graffio ma non lo eliminano del tutto.' },
      { heading: 'Graffi Profondi', text: 'Se si vede il legno chiaro sotto la finitura, il graffio è profondo. Servono stuccatura con pasta colorata e riverniciatura locale (che può creare differenze di tonalità) oppure levigatura e riverniciatura dell\'intera stanza per un risultato uniforme.' },
      { heading: 'Macchie da Liquidi', text: 'Acqua: se asciugata subito non lascia tracce. Se rimane a lungo causa aloni bianchi (su vernice) o neri (reazione tannini). Vino rosso: tampona subito, non strofinare. Inchiostro: molto difficile, spesso serve sostituzione del listello.' },
      { heading: 'Macchie Nere', text: 'Le macchie nere sono causate da umidità prolungata che ha fatto reagire i tannini del legno (tipico del rovere). Se superficiali, la levigatura le rimuove. Se penetrate in profondità, possono richiedere sbiancatura chimica o sostituzione del listello.' },
    ],
    faq: [
      { q: 'Posso usare candeggina sulle macchie?', a: 'No. La candeggina scolora il legno e danneggia la finitura. Per macchie ostinate servono prodotti specifici o l\'intervento di un professionista.' },
      { q: 'I graffi del cane si possono eliminare?', a: 'Dipende dalla profondità. Graffi leggeri si attenuano con cere. Graffi profondi di unghie richiedono levigatura. Per case con cani consigliamo finiture molto resistenti o SPC.' },
      { q: 'Quanto costa riparare un graffio profondo?', a: 'Dipende dall\'estensione. Una riparazione locale costa poco ma può risultare visibile. Una levigatura totale costa di più ma dà un risultato uniforme. Valutiamo insieme la soluzione migliore.' },
    ],
    relatedLinks: [
      { title: 'Levigatura Parquet', href: '/levigatura-parquet' },
      { title: 'Riparazione Parquet', href: '/riparazione-parquet' },
      { title: 'Manutenzione', href: '/guida/manutenzione-parquet' },
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
