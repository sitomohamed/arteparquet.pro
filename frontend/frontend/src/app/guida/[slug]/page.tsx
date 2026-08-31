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
    metaTitle: 'Massello vs Prefinito: quale scegliere',
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
    metaTitle: 'Costo Levigatura Parquet',
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
    metaTitle: 'Parquet su Riscaldamento a Pavimento',
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
    metaTitle: 'Manutenzione Parquet: pulizia e cura',
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
    metaTitle: 'Parquet in Bagno e Cucina',
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
    metaTitle: 'Parquet che Scricchiola: cause e soluzioni',
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
    metaTitle: 'Parquet Gonfiato dall\'Acqua: cosa fare',
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
    metaTitle: 'Spina Italiana vs Francese',
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
    metaTitle: 'Umidità Massetto: quando posare',
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
    metaTitle: 'Graffi e Macchie sul Parquet',
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
  'parquet-vs-laminato-vs-spc': {
    title: 'Parquet vs Laminato vs SPC: Confronto Completo',
    metaTitle: 'Parquet vs Laminato vs SPC',
    metaDescription: 'Confronto tra parquet vero, laminato e SPC: pro, contro, costi, durata. Guida per scegliere il pavimento giusto per ogni ambiente.',
    bluf: 'Il parquet è legno vero (pregio massimo, levigabile, 50+ anni), il laminato è stampa su HDF (economico, non levigabile, 10-15 anni), l\'SPC è vinile rigido (impermeabile 100%, ideale bagni/cucine, 20-30 anni). Per pregio scegli parquet, per budget laminato, per ambienti umidi SPC.',
    content: [
      { heading: 'Parquet Vero (Massello e Prefinito)', text: 'Il parquet è l\'unico con legno vero in superficie. Il massello è legno pieno al 100%, il prefinito ha uno strato nobile di legno su supporto multistrato. Entrambi si levigano, durano decenni e aumentano il valore dell\'immobile. Costo più alto, ma investimento a lungo termine.' },
      { heading: 'Laminato', text: 'Il laminato ha una stampa fotografica di legno su un supporto in HDF. Costa poco, si installa velocemente con sistema click, ma non è legno vero, non si leviga e dura 10-15 anni. Sensibile all\'umidità: l\'HDF si gonfia se bagnato. Adatto per budget limitati o seconde case.' },
      { heading: 'SPC (Stone Polymer Composite)', text: 'L\'SPC è un pavimento vinilico rigido con nucleo in pietra polimerica. Impermeabile al 100%, resistente agli urti, con stampa realistica effetto legno. Non si leviga ma dura 20-30 anni. Ideale per bagni, cucine, lavanderie e chi cerca praticità senza rinunciare all\'estetica.' },
      { heading: 'Quale Scegliere', text: 'Per il massimo pregio e valore immobiliare: parquet. Per budget limitato in ambienti asciutti: laminato. Per bagni, cucine e ambienti umidi: SPC. In soggiorno e camere da letto il parquet non ha rivali. Possiamo mostrarti i campioni durante il sopralluogo gratuito.' },
    ],
    faq: [
      { q: 'Il laminato è parquet?', a: 'No. Il laminato è una stampa su HDF, non contiene legno vero in superficie. Solo massello e prefinito sono "parquet" nel senso proprio del termine.' },
      { q: 'L\'SPC sembra finto?', a: 'I modelli di qualità hanno texture sincronizzata molto realistica. Al tatto e alla vista è difficile distinguerlo dal legno vero.' },
      { q: 'Posso mettere laminato in bagno?', a: 'Sconsigliato. L\'HDF si gonfia con l\'umidità. Per il bagno scegli SPC impermeabile o piastrelle.' },
    ],
    relatedLinks: [
      { title: 'Pavimenti SPC', href: '/pavimenti-spc' },
      { title: 'Parquet Massello', href: '/servizi/parquet-massello' },
      { title: 'Preventivo', href: '/preventivo' },
    ],
  },
  'essenze-legno-parquet': {
    title: 'Essenze di Legno per Parquet: Guida alla Scelta',
    metaTitle: 'Essenze Legno Parquet: rovere e noce',
    metaDescription: 'Quale essenza scegliere per il parquet? Rovere, noce, frassino, teak: caratteristiche, durezza, stabilità, colori. Guida completa alla scelta.',
    bluf: 'Il rovere è l\'essenza più versatile: duro, stabile, adatto a tutti gli ambienti. Il noce è più scuro e pregiato. Il frassino ha venature chiare ed eleganti. Il teak è ideale per ambienti umidi. La scelta dipende da estetica, durezza richiesta e compatibilità con riscaldamento a pavimento.',
    content: [
      { heading: 'Rovere (Quercus)', text: 'Il rovere è l\'essenza più usata in Italia: durezza media-alta (1360 Janka), colore caldo che va dal miele al bruno, venature eleganti. Molto stabile, adatto anche a riscaldamento a pavimento. Disponibile in moltissime finiture: naturale, sbiancato, affumicato, spazzolato.' },
      { heading: 'Noce (Juglans)', text: 'Il noce ha colore bruno scuro con venature marcate. Durezza media (1010 Janka), meno stabile del rovere. Molto pregiato ed elegante, ideale per ambienti classici e di rappresentanza. Richiede più attenzione con riscaldamento a pavimento.' },
      { heading: 'Frassino (Fraxinus)', text: 'Il frassino è chiaro, quasi bianco, con venature lineari ed eleganti. Durezza alta (1320 Janka), buona stabilità. Perfetto per ambienti moderni e luminosi. Si presta bene a finiture sbiancate o grigie.' },
      { heading: 'Teak (Tectona)', text: 'Il teak è naturalmente oleoso e resistente all\'umidità. Colore bruno dorato, durezza media (1070 Janka). Ideale per bagni (con le dovute precauzioni), cucine e ambienti esterni coperti. Molto stabile con riscaldamento a pavimento.' },
    ],
    faq: [
      { q: 'Quale legno è più resistente ai graffi?', a: 'Le essenze più dure come rovere, frassino e bambù resistono meglio. Il noce è più tenero. Ma la finitura (vernice dura o olio) incide più dell\'essenza.' },
      { q: 'Quale essenza per riscaldamento a pavimento?', a: 'Rovere e teak sono i più stabili. Evita faggio e acero che tendono a muoversi con le variazioni termiche.' },
      { q: 'Posso scegliere il colore del parquet?', a: 'Sì. Ogni essenza può essere trattata con oli o vernici pigmentate per schiarire, scurire o cambiare tonalità. Ti mostriamo i campioni.' },
    ],
    relatedLinks: [
      { title: 'Parquet Massello', href: '/servizi/parquet-massello' },
      { title: 'Parquet Prefinito', href: '/servizi/parquet-prefinito' },
      { title: 'Preventivo', href: '/preventivo' },
    ],
  },
  'finiture-parquet-olio-vernice': {
    title: 'Finiture Parquet: Olio vs Vernice',
    metaTitle: 'Olio o Vernice sul Parquet',
    metaDescription: 'Meglio olio o vernice per il parquet? Confronto completo: aspetto, manutenzione, durata, riparabilità. Guida alla scelta della finitura giusta.',
    bluf: 'L\'olio penetra nel legno esaltando le venature naturali, richiede manutenzione periodica ma permette ritocchi locali. La vernice forma un film protettivo più resistente all\'usura, ideale per alto traffico, ma in caso di danno richiede levigatura completa. Olio per look naturale, vernice per praticità.',
    content: [
      { heading: 'Finitura a Olio', text: 'L\'olio penetra nelle fibre del legno senza formare un film superficiale. Il risultato è un aspetto naturale e opaco che esalta le venature. Richiede rioliatura ogni 1-2 anni, ma i graffi e le macchie si riparano localmente senza levigare tutto il pavimento.' },
      { heading: 'Finitura a Vernice', text: 'La vernice (poliuretanica o UV) forma un film protettivo sulla superficie. Resiste meglio all\'usura e all\'acqua, non richiede manutenzione particolare. Disponibile in opaco, satinato o lucido. In caso di danno profondo serve levigatura e riverniciatura completa.' },
      { heading: 'Finiture Speciali', text: 'Esistono anche finiture miste (olio-cera), vernici naturali, e trattamenti UV che combinano vantaggi di entrambe. La cera d\'api è tradizionale ma richiede molta manutenzione. Le vernici all\'acqua sono più ecologiche.' },
      { heading: 'Come Scegliere', text: 'Olio: per chi ama l\'aspetto naturale e non teme la manutenzione periodica. Vernice: per famiglie con bambini, alto traffico, chi cerca praticità. Ti consigliamo durante il sopralluogo in base al tuo stile di vita.' },
    ],
    faq: [
      { q: 'La vernice lucida è superata?', a: 'Il lucido è meno di moda ma ha i suoi estimatori. Oggi si preferisce satinato o opaco per un effetto più naturale e contemporaneo.' },
      { q: 'L\'olio macchia facilmente?', a: 'L\'olio è più sensibile alle macchie di liquidi, ma i danni si riparano localmente. La vernice protegge meglio ma un danno richiede interventi più estesi.' },
      { q: 'Posso cambiare finitura?', a: 'Sì, durante la levigatura. Si rimuove la vecchia finitura e si applica quella nuova. Da olio a vernice o viceversa.' },
    ],
    relatedLinks: [
      { title: 'Levigatura Parquet', href: '/levigatura-parquet' },
      { title: 'Manutenzione', href: '/guida/manutenzione-parquet' },
      { title: 'Preventivo', href: '/preventivo' },
    ],
  },
  'posa-parquet-incollata-flottante': {
    title: 'Posa Incollata vs Flottante: Quale Scegliere',
    metaTitle: 'Posa Incollata vs Flottante',
    metaDescription: 'Meglio posa incollata o flottante per il parquet? Differenze, pro e contro, quando scegliere una o l\'altra. Guida tecnica alla posa.',
    bluf: 'La posa incollata fissa il parquet al massetto con colla: massima stabilità, ideale per riscaldamento a pavimento, nessun rumore di calpestio. La posa flottante appoggia su materassino: più veloce, reversibile, ma meno stabile e può fare rumore. Per qualità preferisci incollata.',
    content: [
      { heading: 'Posa Incollata', text: 'Ogni listello viene fissato al massetto con colla elastica. Il parquet diventa un tutt\'uno con il sottofondo: massima stabilità, nessun movimento, nessun rumore. Obbligatoria per massello, raccomandata per prefinito su riscaldamento a pavimento. Richiede più tempo e manodopera.' },
      { heading: 'Posa Flottante', text: 'I listelli si incastrano tra loro con sistema click e appoggiano su un materassino isolante. Il pavimento "galleggia" sul sottofondo. Installazione veloce (anche fai-da-te), reversibile, ma può fare rumore di calpestio e non è ideale con riscaldamento a pavimento.' },
      { heading: 'Posa Inchiodata', text: 'Tradizionale per massello su magatelli di legno. Oggi poco usata: richiede un\'intercapedine che ruba altezza e non è compatibile con riscaldamento a pavimento. Ancora valida in alcuni contesti storici o su solai in legno.' },
      { heading: 'Quando Scegliere', text: 'Incollata: riscaldamento a pavimento, massello, ambienti di pregio, silenziosità. Flottante: prefinito in affitto, installazione rapida, budget contenuto. Ti consigliamo la soluzione migliore durante il sopralluogo.' },
    ],
    faq: [
      { q: 'La posa flottante si muove?', a: 'Può avere leggeri movimenti e fare rumore di calpestio, soprattutto con materassini economici. Un buon materassino riduce il problema ma non lo elimina del tutto.' },
      { q: 'Posso incollare su piastrelle?', a: 'Sì, se le piastrelle sono stabili e livellate. In alternativa l\'SPC click si posa direttamente sopra senza colla.' },
      { q: 'La posa incollata costa di più?', a: 'Sì, richiede più manodopera e colla. Ma il risultato è superiore: stabilità, silenziosità, durata maggiore.' },
    ],
    relatedLinks: [
      { title: 'Posa Parquet', href: '/servizi/posa' },
      { title: 'Parquet su Piastrelle', href: '/guida/parquet-su-piastrelle' },
      { title: 'Riscaldamento', href: '/guida/parquet-riscaldamento-pavimento' },
    ],
  },
  'parquet-su-piastrelle': {
    title: 'Parquet su Piastrelle: Si Può Fare?',
    metaTitle: 'Posare Parquet su Piastrelle',
    metaDescription: 'Si può posare parquet sopra le piastrelle esistenti? Quando sì, quando no, come preparare il fondo. Guida alla posa senza demolire.',
    bluf: 'Sì, si può posare parquet su piastrelle esistenti se sono stabili, livellate e ben ancorate. L\'SPC click è l\'opzione più semplice: posa diretta senza colla. Il prefinito si incolla con primer specifico. Il massello richiede valutazione caso per caso. Niente demolizioni, niente polvere.',
    content: [
      { heading: 'Quando Si Può Fare', text: 'Si può posare su piastrelle quando: sono stabili (non si muovono), ben ancorate (non "suonano" vuote), livellate (dislivelli max 2-3mm), asciutte. Se le piastrelle sono instabili o hanno dislivelli importanti, meglio rimuoverle o livellare con autolivellante.' },
      { heading: 'SPC su Piastrelle', text: 'L\'SPC click è la soluzione più semplice: si appoggia direttamente sulle piastrelle con un sottile materassino. Posa veloce, nessuna colla, nessuna preparazione se il fondo è livellato. Ideale per ristrutturazioni rapide.' },
      { heading: 'Prefinito su Piastrelle', text: 'Il prefinito si incolla con colla elastica dopo aver applicato un primer aggrappante sulle piastrelle. Il primer garantisce l\'adesione della colla sulla superficie liscia della ceramica. Risultato stabile e duraturo.' },
      { heading: 'Attenzione all\'Altezza', text: 'Posare sopra le piastrelle aggiunge spessore (8-15mm). Verifica che porte, soglie e dislivelli con altri ambienti siano gestibili. Spesso basta piallare le porte e adattare le soglie.' },
    ],
    faq: [
      { q: 'Devo carteggiare le piastrelle?', a: 'Per la posa incollata è utile una leggera carteggiatura o l\'uso di primer aggrappante. Per SPC click non serve nulla.' },
      { q: 'Le fughe delle piastrelle si vedono sotto?', a: 'No. Il materassino (per SPC) o la colla (per prefinito) colmano le fughe. Dopo la posa non si vedono.' },
      { q: 'Posso posare massello su piastrelle?', a: 'È possibile ma va valutato caso per caso. Il massello è più rigido e pesante: servono piastrelle perfettamente stabili e colla ad alte prestazioni.' },
    ],
    relatedLinks: [
      { title: 'Pavimenti SPC', href: '/pavimenti-spc' },
      { title: 'Posa Incollata', href: '/guida/posa-parquet-incollata-flottante' },
      { title: 'Preventivo', href: '/preventivo' },
    ],
  },
  'parquet-macchie-nere': {
    title: 'Macchie Nere sul Parquet: Cause e Soluzioni',
    metaTitle: 'Macchie Nere sul Parquet',
    metaDescription: 'Macchie nere sul parquet: cause (umidità, tannini, muffa) e soluzioni. Quando si rimuovono con levigatura, quando serve sostituire il listello.',
    bluf: 'Le macchie nere sono causate dalla reazione dei tannini del legno con l\'umidità (ossidazione). Compaiono dopo infiltrazioni, perdite o umidità prolungata. Se superficiali, si rimuovono con levigatura. Se penetrate in profondità, possono richiedere sbiancatura chimica o sostituzione del listello.',
    content: [
      { heading: 'Causa delle Macchie Nere', text: 'Il rovere e altre essenze contengono tannini che reagiscono con l\'umidità e il ferro. Il risultato è una colorazione nero-bluastra irreversibile. Le cause comuni: vasi senza sottovaso, infiltrazioni, perdite idriche, tappeti bagnati, pulizia con troppa acqua.' },
      { heading: 'Macchie Superficiali', text: 'Se la macchia è limitata allo strato superiore, la levigatura la rimuove completamente. Il legno sotto è ancora chiaro. Dopo levigatura e finitura il parquet torna come nuovo.' },
      { heading: 'Macchie Profonde', text: 'Se l\'umidità è rimasta a lungo, la macchia penetra in profondità. La levigatura non basta. Si può tentare una sbiancatura con acido ossalico (intervento delicato), oppure sostituire il listello con uno dello stesso legno e finitura.' },
      { heading: 'Prevenzione', text: 'Evita acqua stagnante sul parquet, usa sottovasi, asciuga subito gli schizzi, non pulire con panni troppo bagnati. Se noti macchie scure che si allargano, chiama subito: prima si interviene, meglio è.' },
    ],
    faq: [
      { q: 'Le macchie nere sono muffa?', a: 'Non sempre. Possono essere ossidazione dei tannini (più comune) o muffa (se c\'è odore e la macchia si allarga). In entrambi i casi serve un intervento professionale.' },
      { q: 'Posso schiarirle con candeggina?', a: 'No. La candeggina danneggia il legno e la finitura. Per sbiancatura serve acido ossalico applicato da un professionista.' },
      { q: 'Quanto costa rimuovere le macchie nere?', a: 'Dipende dall\'estensione. Una levigatura locale costa poco; una sostituzione di listelli o levigatura completa costa di più. Valutiamo gratuitamente.' },
    ],
    relatedLinks: [
      { title: 'Levigatura', href: '/levigatura-parquet' },
      { title: 'Danni da Acqua', href: '/guida/parquet-gonfiato-acqua' },
      { title: 'Riparazione', href: '/riparazione-parquet' },
    ],
  },
  'parquet-colore-pareti': {
    title: 'Abbinare Parquet e Colore Pareti',
    metaTitle: 'Abbinare Parquet e Colore Pareti',
    metaDescription: 'Come abbinare il colore del parquet alle pareti? Consigli pratici per arredare: parquet chiaro vs scuro, pareti bianche, grigie, colorate.',
    bluf: 'Parquet chiaro (rovere naturale, frassino) si abbina a tutto: pareti bianche, grigie, colori vivaci. Parquet scuro (noce, wengé) richiede pareti chiare per non appesantire. Crea contrasto per valorizzare il legno: parquet chiaro + parete d\'accento scura, o parquet scuro + pareti luminose.',
    content: [
      { heading: 'Parquet Chiaro', text: 'Il parquet chiaro (rovere naturale, frassino, acero) è versatile. Si abbina a pareti bianche per un effetto scandinavo, a grigi per un look moderno, a colori vivaci per un tocco di personalità. Allarga visivamente gli spazi.' },
      { heading: 'Parquet Scuro', text: 'Il parquet scuro (noce, wengé, rovere affumicato) è elegante ma dominante. Richiede pareti chiare (bianco, beige, grigio chiaro) per evitare ambienti cupi. Perfetto in soggiorni ampi e luminosi, rischioso in stanze piccole.' },
      { heading: 'Parquet Medio', text: 'I toni medi (rovere miele, rovere oliato) sono i più facili da abbinare. Funzionano con pareti chiare, medie e scure. Sono la scelta più sicura se non sei certo del colore delle pareti futuro.' },
      { heading: 'Regole Pratiche', text: 'Evita di abbinare parquet e pareti dello stesso tono: l\'ambiente risulta piatto. Crea contrasto moderato. Il battiscopa fa da transizione: bianco per staccare, legno per continuità. Nel dubbio, scegli parquet medio e pareti chiare.' },
    ],
    faq: [
      { q: 'Parquet chiaro o scuro per stanze piccole?', a: 'Chiaro. Il parquet scuro in stanze piccole può farle sembrare ancora più piccole. Il chiaro riflette la luce e allarga visivamente lo spazio.' },
      { q: 'Posso avere parquet diverso in ogni stanza?', a: 'Sconsigliato. Meglio un unico parquet in tutta la casa con lo stesso verso di posa. Crea continuità e fa sembrare gli spazi più ampi.' },
      { q: 'Il parquet grigio è di moda?', a: 'Il grigio è stato molto di moda ma è un colore "datato" se non scelto con attenzione. I toni naturali del legno sono più senza tempo.' },
    ],
    relatedLinks: [
      { title: 'Spina Italiana vs Francese', href: '/guida/spina-italiana-vs-francese' },
      { title: 'Essenze Legno', href: '/guida/essenze-legno-parquet' },
      { title: 'Finiture', href: '/guida/finiture-parquet-olio-vernice' },
    ],
  },
  'preparare-stanza-levigatura': {
    title: 'Come Preparare la Stanza per la Levigatura',
    metaTitle: 'Preparare la Stanza per la Levigatura',
    metaDescription: 'Come prepararsi prima della levigatura parquet: mobili da spostare, protezioni, cosa aspettarsi. Guida pratica per il giorno dei lavori.',
    bluf: 'La stanza deve essere completamente vuota di mobili. Togli quadri e tendaggi leggeri. Copri con teli ciò che non può uscire. Noi proteggiamo le altre stanze e usiamo macchine con aspirazione che riducono la polvere del 95%. Il resto della casa rimane abitabile.',
    content: [
      { heading: 'Svuotare la Stanza', text: 'La stanza da levigare deve essere completamente vuota: mobili, tappeti, oggetti. Possiamo aiutarti a spostare i mobili pesanti nelle stanze adiacenti. Togli anche quadri bassi e tendaggi leggeri che potrebbero impolvererai.' },
      { heading: 'Cosa Non Spostare', text: 'Non devi smontare mobili a muro, librerie fisse o cucine. Proteggiamo noi i bordi con nastro e teli. Le prese e gli interruttori li copriamo. I battiscopa di solito non si tolgono, li lavoriamo con la bordatrice.' },
      { heading: 'Polvere e Protezioni', text: 'Usiamo levigatrici con aspirazione integrata che riducono la polvere del 95%. Non serve sigillare le porte o coprire i mobili nelle altre stanze. A fine lavoro aspiriamo tutto e puliamo l\'ambiente.' },
      { heading: 'Durante i Lavori', text: 'Il giorno della levigatura avrai rumore per 4-6 ore. Il giorno della finitura meno rumore ma odore di vernice (se scegli vernice). Dopo 12-24 ore puoi calpestare, dopo 48 ore rimettere i mobili.' },
    ],
    faq: [
      { q: 'Devo svuotare tutta la casa?', a: 'No, solo la stanza da levigare. Il resto della casa rimane abitabile e non si impolvera grazie alle macchine con aspirazione.' },
      { q: 'Quanto prima devo preparare?', a: 'La sera prima è sufficiente. Se hai bisogno di aiuto per mobili pesanti, lo diciamo durante il sopralluogo.' },
      { q: 'Posso dormire in casa durante i lavori?', a: 'Sì. La stanza lavorata è off-limits per 12-24 ore, ma il resto della casa è agibile. L\'odore di vernice (se presente) si dissipa in 1-2 giorni con le finestre aperte.' },
    ],
    relatedLinks: [
      { title: 'Levigatura Parquet', href: '/levigatura-parquet' },
      { title: 'Costi Levigatura', href: '/guida/quanto-costa-levigatura' },
      { title: 'Preventivo', href: '/preventivo' },
    ],
  },
  'tempi-posa-parquet': {
    title: 'Tempi di Posa Parquet: Quanto Ci Vuole?',
    metaTitle: 'Tempi di Posa del Parquet',
    metaDescription: 'Quanto tempo serve per posare il parquet? Tempi per posa incollata, flottante, levigatura. Quando calpestare e rimettere i mobili.',
    bluf: 'Per un appartamento medio (80-100 mq): posa incollata 2-3 giorni, posa flottante 1-2 giorni, levigatura e finitura 2 giorni. Il parquet è calpestabile dopo 24-48 ore dalla finitura. Mobili e tappeti dopo 48-72 ore. Tempi più lunghi per massello da levigare in cantiere.',
    content: [
      { heading: 'Posa Prefinito Incollata', text: 'Per 80-100 mq servono 2-3 giorni lavorativi: 1-2 giorni per la posa, 1 giorno per battiscopa e finiture. Il prefinito arriva già verniciato, quindi è calpestabile subito dopo la presa della colla (24 ore).' },
      { heading: 'Posa Prefinito Flottante', text: 'La posa click è più veloce: 1-2 giorni per 80-100 mq. Non serve attendere la presa della colla, quindi è calpestabile immediatamente. Ideale per ristrutturazioni rapide.' },
      { heading: 'Posa Massello (da Levigare)', text: 'Il massello si posa grezzo e poi si leviga e vernicia in cantiere. Servono 4-5 giorni: 2-3 per la posa, 2 per levigatura e finitura. Il risultato è superiore ma i tempi sono più lunghi.' },
      { heading: 'Fattori che Allungano i Tempi', text: 'Scale, corridoi stretti, schemi complessi (spina di pesce), molte stanze piccole, sottofondo da preparare. Durante il sopralluogo ti diciamo i tempi esatti per il tuo caso.' },
    ],
    faq: [
      { q: 'Posso calpestare subito dopo la posa?', a: 'Posa flottante: sì, subito. Posa incollata: dopo 24 ore. Dopo levigatura e vernice: 12-24 ore con calzini puliti, 48 ore normalmente.' },
      { q: 'Quando rimetto i mobili?', a: 'Dopo 48-72 ore dalla finitura. Usa feltrini sotto le gambe per non graffiare. Per mobili pesantissimi aspetta 5-7 giorni.' },
      { q: 'Posso accendere il riscaldamento subito?', a: 'No. Attendi almeno 7 giorni dopo la posa incollata, poi accendi gradualmente aumentando di 2-3°C al giorno.' },
    ],
    relatedLinks: [
      { title: 'Posa Parquet', href: '/servizi/posa' },
      { title: 'Posa Incollata vs Flottante', href: '/guida/posa-parquet-incollata-flottante' },
      { title: 'Cura Dopo Posa', href: '/guida/cura-parquet-dopo-posa' },
    ],
  },
  'cura-parquet-dopo-posa': {
    title: 'Cura del Parquet nei Primi Giorni',
    metaTitle: 'Cura del Parquet dopo la Posa',
    metaDescription: 'Come curare il parquet appena posato: quando calpestare, quando mettere mobili, quando accendere riscaldamento. Guida ai primi giorni.',
    bluf: 'Nei primi giorni il parquet è vulnerabile. Calpesta con calzini puliti dopo 12-24 ore, evita scarpe per 48 ore, rimetti i mobili dopo 48-72 ore con feltrini. Non lavare per 7 giorni. Se hai riscaldamento a pavimento, accendilo gradualmente dopo 7 giorni dalla posa.',
    content: [
      { heading: 'Prime 24 Ore', text: 'Non calpestare la zona lavorata. La colla sta facendo presa e la finitura sta indurendo. Se devi passare per forza, usa tavole di legno appoggiate per distribuire il peso.' },
      { heading: 'Dopo 24-48 Ore', text: 'Puoi calpestare con calzini puliti (no scarpe). Evita di trascinare oggetti. Il parquet è ancora sensibile: un graffio ora rimane per sempre. I bambini giocano in altre stanze.' },
      { heading: 'Dopo 48-72 Ore', text: 'Puoi rimettere i mobili leggeri. Usa sempre feltrini sotto le gambe. I mobili pesantissimi (librerie, armadi) aspettano 5-7 giorni. Non trascinare mai: solleva e appoggia.' },
      { heading: 'Prima Settimana', text: 'Non lavare con acqua per almeno 7 giorni (solo aspirapolvere con spazzola morbida). Se hai riscaldamento a pavimento, accendilo gradualmente dopo 7 giorni: +2-3°C al giorno fino a regime.' },
    ],
    faq: [
      { q: 'Quando posso lavare il parquet?', a: 'Dopo 7 giorni dalla finitura. Usa un panno umido ben strizzato, mai bagnato. Aspetta 2-3 settimane per il primo lavaggio completo.' },
      { q: 'Quando posso mettere i tappeti?', a: 'Dopo 2-3 settimane. I tappeti bloccano la traspirazione della finitura che continua a indurire nei primi tempi.' },
      { q: 'Ho graffiato il parquet nuovo, cosa faccio?', a: 'Se il graffio è nella finitura fresca, potrebbe attenuarsi con l\'indurimento. Se è profondo, potrebbe restare. Chiamaci per una valutazione.' },
    ],
    relatedLinks: [
      { title: 'Manutenzione', href: '/guida/manutenzione-parquet' },
      { title: 'Graffi e Macchie', href: '/guida/parquet-graffi-macchie' },
      { title: 'Tempi Posa', href: '/guida/tempi-posa-parquet' },
    ],
  },
  'come-scegliere-posatore': {
    title: 'Come Scegliere un Posatore di Parquet',
    metaTitle: 'Come Scegliere il Posatore di Parquet',
    metaDescription: 'Come riconoscere un bravo posatore di parquet? Cosa chiedere, cosa controllare, segnali di allarme. Guida alla scelta del professionista giusto.',
    bluf: 'Un bravo posatore: fa sopralluogo prima del preventivo, misura l\'umidità del massetto, spiega le opzioni, dà garanzia scritta, mostra lavori precedenti. Diffida di chi dà prezzi al telefono, non vuole vedere il cantiere, non parla di preparazione del fondo. L\'esperienza conta più del prezzo basso.',
    content: [
      { heading: 'Il Sopralluogo', text: 'Un professionista serio fa sempre un sopralluogo prima del preventivo. Deve vedere il massetto, misurare l\'umidità, valutare gli accessi, capire le tue esigenze. Chi dà prezzi al telefono senza vedere il cantiere sta improvvisando.' },
      { heading: 'Domande da Fare', text: 'Chiedi: quanti anni di esperienza? Posso vedere foto di lavori precedenti? Che garanzia date sulla posa? Come preparate il massetto? Che colla usate? Un professionista risponde volentieri e con competenza.' },
      { heading: 'Segnali di Allarme', text: 'Diffida di: prezzi molto più bassi della media, preventivi vaghi senza dettagli, fretta di iniziare senza preparazione, nessuna garanzia scritta, posa "a nero" senza fattura. Un lavoro mal fatto costa il doppio da rifare.' },
      { heading: 'Garanzia e Assistenza', text: 'Pretendi garanzia scritta sulla manodopera (almeno 2 anni). Un professionista serio interviene se ci sono problemi. Controlla le recensioni online ma non fidarti ciecamente: contano i dettagli dei feedback.' },
    ],
    faq: [
      { q: 'Il prezzo più basso è sempre sbagliato?', a: 'Non sempre, ma spesso. Un prezzo molto basso nasconde materiali scadenti, manodopera inesperta o lavoro "a nero" senza garanzie. Confronta preventivi dettagliati, non solo cifre.' },
      { q: 'Posso posare il parquet da solo?', a: 'Il prefinito flottante click sì, con pazienza. Incollato e massello no: servono esperienza, attrezzature e conoscenza delle tecniche. Gli errori costano caro.' },
      { q: 'Come verifico l\'esperienza del posatore?', a: 'Chiedi foto di lavori precedenti, referenze di clienti, anni di attività. Un professionista con 30 anni di esperienza ha visto ogni situazione possibile.' },
    ],
    relatedLinks: [
      { title: 'Chi Siamo', href: '/chi-siamo' },
      { title: 'Garanzia', href: '/guida/garanzia-parquet' },
      { title: 'Contatti', href: '/contatti' },
    ],
  },
  'garanzia-parquet': {
    title: 'Garanzia sul Parquet: Cosa Copre',
    metaTitle: 'Garanzia sul Parquet: cosa copre',
    metaDescription: 'Cosa copre la garanzia sul parquet? Differenza tra garanzia materiale e manodopera. Quando vale e quando no. Guida ai tuoi diritti.',
    bluf: 'La garanzia ha due componenti: materiale (dal produttore, 10-25 anni) e manodopera (dal posatore, 2-5 anni). La garanzia materiale copre difetti di fabbricazione. La garanzia manodopera copre errori di posa. Non sono coperti: danni da uso improprio, manutenzione errata, eventi accidentali.',
    content: [
      { heading: 'Garanzia Materiale', text: 'Il produttore garantisce il parquet contro difetti di fabbricazione: delaminazione, difetti di verniciatura, deformazioni non dovute all\'ambiente. Durata tipica: 10-25 anni per prefinito, lifetime per alcuni masselli. Conserva lo scontrino e la documentazione.' },
      { heading: 'Garanzia Manodopera', text: 'Il posatore garantisce il proprio lavoro: la posa è stata eseguita a regola d\'arte. Copre: scricchiolii da posa errata, listelli che si staccano, difetti di finitura. Durata tipica: 2-5 anni. Noi diamo garanzia scritta su ogni lavoro.' },
      { heading: 'Cosa Non È Coperto', text: 'Non sono coperti: graffi e urti da uso normale, danni da acqua per negligenza, deformazioni da umidità ambientale errata, usura normale, manutenzione non eseguita o errata. Leggi sempre le condizioni di garanzia.' },
      { heading: 'Come Far Valere la Garanzia', text: 'Documenta il problema con foto. Contatta prima il posatore per problemi di posa, il rivenditore/produttore per difetti del materiale. Conserva fattura, documentazione tecnica e condizioni di garanzia.' },
    ],
    faq: [
      { q: 'Gli scricchiolii sono coperti da garanzia?', a: 'Dipende. Se dovuti a posa errata, sì. Se dovuti ad assestamento normale o umidità ambientale, no. Valutiamo caso per caso.' },
      { q: 'La garanzia decade se lavo male il parquet?', a: 'La garanzia materiale può decadere se dimostri di aver usato prodotti non idonei o acqua eccessiva. Segui le istruzioni di manutenzione.' },
      { q: 'Arteparquet cosa garantisce?', a: 'Diamo garanzia scritta sulla manodopera. Se un difetto è imputabile alla nostra posa, interveniamo gratuitamente. Per i materiali vale la garanzia del produttore.' },
    ],
    relatedLinks: [
      { title: 'Scegliere Posatore', href: '/guida/come-scegliere-posatore' },
      { title: 'Contatti', href: '/contatti' },
      { title: 'Chi Siamo', href: '/chi-siamo' },
    ],
  },
  'miglior-parquet-casa': {
    title: 'Miglior Parquet per Casa: Come Scegliere',
    metaTitle: 'Miglior Parquet per Casa',
    metaDescription: 'Qual è il miglior parquet per la tua casa? Dipende da budget, ambiente, stile di vita. Guida pratica per scegliere il pavimento giusto.',
    bluf: 'Non esiste "il migliore" in assoluto: dipende dalle tue esigenze. Per pregio massimo: massello di rovere. Per praticità: prefinito click. Per bagni/cucine: SPC. Per budget contenuto: laminato di qualità. La scelta giusta considera ambiente, traffico, riscaldamento, budget e gusto estetico.',
    content: [
      { heading: 'Per il Soggiorno', text: 'Il soggiorno è l\'ambiente di rappresentanza: scegli il meglio che puoi permetterti. Il massello di rovere è senza tempo. Il prefinito di qualità è un\'ottima alternativa. Schemi a spina di pesce valorizzano gli ambienti ampi.' },
      { heading: 'Per le Camere da Letto', text: 'Le camere hanno meno traffico: anche un prefinito con strato nobile più sottile funziona bene. Puoi osare con essenze più morbide (noce) se vuoi un look particolare. Il calore del legno è perfetto per i piedi nudi al mattino.' },
      { heading: 'Per Bagni e Cucine', text: 'L\'SPC impermeabile è la scelta più sicura: effetto legno, zero rischi. Il parquet vero in cucina funziona con attenzione. In bagno, solo teak con finitura olio-cera e manutenzione scrupolosa, oppure SPC.' },
      { heading: 'Con Bambini e Animali', text: 'Scegli essenze dure (rovere, frassino) e finiture resistenti (vernice UV). L\'SPC è praticamente indistruttibile. Evita legni teneri (noce, ciliegio) se hai cani grandi o bambini scatenati.' },
    ],
    faq: [
      { q: 'Qual è il parquet più resistente?', a: 'Il massello di rovere con finitura a vernice UV è molto resistente. L\'SPC è praticamente indistruttibile. Il laminato AC5 resiste bene ma non è levigabile.' },
      { q: 'Meglio spendere di più per il materiale o per la posa?', a: 'Entrambi contano. Un materiale eccellente posato male dà problemi. Un materiale medio posato perfettamente funziona bene. L\'ideale è non risparmiare su nessuno dei due.' },
      { q: 'Posso avere parquet diversi in stanze diverse?', a: 'Sconsigliato. Meglio un unico parquet con lo stesso verso di posa in tutta la casa. Crea continuità e valorizza gli spazi.' },
    ],
    relatedLinks: [
      { title: 'Massello vs Prefinito', href: '/guida/parquet-massello-vs-prefinito' },
      { title: 'Essenze', href: '/guida/essenze-legno-parquet' },
      { title: 'Preventivo', href: '/preventivo' },
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
    // Gruppo 1: Generali e Scelta
    'parquet-massello-vs-prefinito',
    'parquet-vs-laminato-vs-spc',
    'essenze-legno-parquet',
    'finiture-parquet-olio-vernice',
    // Gruppo 2: Posa e Preparazione
    'posa-parquet-incollata-flottante',
    'umidita-massetto-posa',
    'parquet-su-piastrelle',
    // Gruppo 3: Levigatura e Manutenzione
    'quanto-costa-levigatura',
    'manutenzione-parquet',
    'parquet-graffi-macchie',
    // Gruppo 4: Problemi e Riparazioni
    'parquet-scricchiola',
    'parquet-gonfiato-acqua',
    'parquet-macchie-nere',
    // Gruppo 5: Ambienti Specifici
    'parquet-bagno-cucina',
    'parquet-riscaldamento-pavimento',
    // Gruppo 6: Estetica e Design
    'spina-italiana-vs-francese',
    'parquet-colore-pareti',
    // Gruppo 7: Preparazione Lavori
    'preparare-stanza-levigatura',
    'tempi-posa-parquet',
    // Gruppo 8: Post-Intervento
    'cura-parquet-dopo-posa',
    // Gruppo 9: Commerciale
    'come-scegliere-posatore',
    'garanzia-parquet',
    // Gruppo 10: AI Queries
    'miglior-parquet-casa',
  ]
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES[slug] || PLACEHOLDER_GUIDE
  const description =
    guide.metaDescription.length <= 155
      ? guide.metaDescription
      : `${guide.metaDescription.slice(0, 154).replace(/\s+\S*$/, '')}.`
  return {
    title: guide.metaTitle,
    description,
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
