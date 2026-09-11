import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, MessageCircle, Star, MapPin } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { CtaSection } from '@/components/sections/cta-section'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Levigatura Parquet Bergamo e Lombardia | Senza Polvere | Arteparquet',
  description:
    'Levigatura parquet professionale a Bergamo, Milano e in Lombardia. Macchine con aspirazione integrata: zero polvere. Ripristino finitura e colore. Preventivo gratuito.',
  alternates: {
    canonical: 'https://arteparquet.pro/levigatura-parquet',
  },
  openGraph: {
    title: 'Levigatura Parquet Bergamo e Lombardia | Senza Polvere | Arteparquet',
    description:
      'Levigatura parquet professionale a Bergamo, Milano e in Lombardia. Macchine con aspirazione integrata: zero polvere. Ripristino finitura e colore.',
    url: 'https://arteparquet.pro/levigatura-parquet',
  },
}

const faqItems = [
  {
    question: 'Quante volte si può levigare un parquet?',
    answer:
      'Dipende dallo spessore dello strato di usura del listello. Un parquet massello da 22 mm può essere levigato mediamente 4-6 volte nel corso della sua vita. Un prefinito multistrato, invece, ha uno strato nobile di 2-4 mm e tollera al massimo 1-2 levigature leggere. Durante il sopralluogo gratuito valutiamo sempre lo spessore residuo prima di procedere.',
  },
  {
    question: 'Quanto tempo dura una levigatura? Posso stare in casa?',
    answer:
      'Un appartamento di 80 mq richiede in genere 1-2 giorni lavorativi per levigatura e stuccatura, più il tempo di asciugatura della finitura (12-48 ore a seconda del prodotto). Consigliamo di non calpestare il pavimento nelle prime 24 ore dalla finitura.',
  },
  {
    question: 'Devo sgomberare tutti i mobili?',
    answer:
      'Sì, la zona da trattare va liberata da mobili e oggetti. Questo ci permette di lavorare in modo uniforme e di non danneggiare nulla. Nelle fasi preliminari concordiamo sempre con il cliente le modalità di sgombero.',
  },
  {
    question: 'Che finitura applicano dopo la levigatura?',
    answer:
      'Dopo la levigatura proponiamo tre finiture principali: vernice all\'acqua (rapida, molto resistente, aspetto satinato o lucido), olio naturale (aspetto caldo e vissuto, richiede manutenzione periodica) e cera (finitura tradizionale, adatta a parquet storici). La scelta dipende dallo stile dell\'ambiente e dall\'uso quotidiano.',
  },
  {
    question: 'Il parquet prefinito si può levigare?',
    answer:
      'Il parquet prefinito multistrato può essere levigato, ma solo con estrema cautela e con macchine professionali a velocità controllata, poiché lo strato nobile è sottile (2-4 mm). Prima di procedere eseguiamo sempre una misurazione dello spessore. Se il listello è troppo sottile, consigliamo alternative come la riverniciatura senza levigatura o la sostituzione dei punti più deteriorati.',
  },
]

const signs = [
  {
    title: 'Graffi profondi',
    description: 'Solchi visibili che non si rimuovono con la normale manutenzione. La levigatura li elimina alla radice.',
  },
  {
    title: 'Finitura opaca o scrostata',
    description: 'La vernice si è sollevata, è ingiallita o ha perso uniformità. Levigare riporta il listello al grezzo per ricominciare.',
  },
  {
    title: 'Listelli anneriti',
    description: 'Zone scure dovute a umidità o sporco incastrato nel legno. La levigatura rimuove lo strato superficiale compromesso.',
  },
  {
    title: 'Dislivelli tra listelli',
    description: 'Bordi rialzati o avvallamenti che creano inciampi. La macchina a nastro livella e uniforma il piano di calpestio.',
  },
  {
    title: 'Parquet che scricchiola',
    description: 'In certi casi i rumori derivano da giunti allentati che si risolvono con la levigatura e una corretta stuccatura dei giunti.',
  },
  {
    title: 'Colore sbiadito e non uniforme',
    description: 'Il passaggio degli anni ha decolorato alcune zone. La levigatura riporta il legno al suo colore naturale omogeneo.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Sopralluogo Gratuito',
    description:
      'Valutiamo il tipo di parquet, lo spessore residuo dei listelli, le condizioni del sottofondo e la presenza di eventuali danni localizzati. Il sopralluogo è sempre senza impegno.',
  },
  {
    num: '02',
    title: 'Levigatura a Nastro',
    description:
      'La macchina professionale a nastro rimuove lo strato superficiale in modo uniforme, eliminando graffi, vernice vecchia e dislivelli. Ogni passata è controllata per non asportare più legno del necessario.',
  },
  {
    num: '03',
    title: 'Stuccatura',
    description:
      'Raccogliamo la polvere fine di levigatura e la misceliamo con lo stucco per ottenere una tonalità identica al parquet. Riempiamo fessure e giunti per un risultato omogeneo e continuo.',
  },
  {
    num: '04',
    title: 'Finitura Professionale',
    description:
      'Applichiamo la finitura scelta (vernice all\'acqua, olio naturale o cera) in più mani. Ogni mano è levigata con carta fine tra un\'applicazione e l\'altra per un risultato liscio e durevole.',
  },
]

const zones = [
  { name: 'Bergamo', href: '/zona/parquet-bergamo' },
  { name: 'Milano', href: '/zona/parquet-milano' },
  { name: 'Brescia', href: '/zona/parquet-brescia' },
  { name: 'Como', href: '/zona/parquet-como' },
  { name: 'Monza', href: '/zona/parquet-monza' },
  { name: 'Lecco', href: '/zona/parquet-lecco' },
]

export default function LeviaturaParquetPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Levigatura Parquet', url: 'https://arteparquet.pro/levigatura-parquet' },
        ]}
      />
      <ServiceFaqSchema items={faqItems.map(f => ({ q: f.question, a: f.answer }))} />

      {/* HERO */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <span className="inline-block bg-rovere/20 border border-rovere/40 text-rovere text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Senza Polvere
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-travertino">
              Levigatura Parquet<br />
              <span className="text-rovere">Bergamo e Lombardia</span>
            </h1>
            <p className="text-lg md:text-xl text-travertino/80 max-w-2xl mb-10 leading-relaxed">
              Riportiamo il tuo parquet all&apos;originale bellezza con macchine professionali dotate di aspirazione integrata.
              Niente polvere, niente stress: solo un pavimento che torna a splendere.
              Dalla Val Seriana a Milano, siamo dove serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-8 py-4 rounded-lg hover:bg-wood-500 transition-colors"
              >
                <Phone size={20} />
                Chiama Ora
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20un%20preventivo%20per%20levigatura%20parquet."
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

      {/* COME FUNZIONA */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Come Funziona la Levigatura
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Un processo rodato in 30 anni di esperienza, eseguito con cura e attenzione ad ogni fase.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <FadeIn key={step.num}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-legno-bruciato/10 h-full">
                  <span className="text-5xl font-extrabold text-rovere/20 leading-none block mb-4">{step.num}</span>
                  <h3 className="text-xl font-bold text-legno-bruciato mb-3">{step.title}</h3>
                  <p className="text-legno-bruciato/70 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* QUANDO È NECESSARIA */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Quando È Necessaria la Levigatura
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Sei in dubbio se il tuo parquet abbia davvero bisogno di una levigatura? Ecco i segnali più comuni.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {signs.map((sign) => (
              <FadeIn key={sign.title}>
                <div className="bg-travertino rounded-xl p-6 border border-legno-bruciato/10 h-full">
                  <CheckCircle className="text-rovere mb-3" size={24} />
                  <h3 className="font-bold text-legno-bruciato mb-2">{sign.title}</h3>
                  <p className="text-legno-bruciato/70 text-sm leading-relaxed">{sign.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LE NOSTRE MACCHINE */}
      <section className="bg-nero-marquina text-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-travertino mb-4">
              Le Nostre Macchine: Zero Polvere
            </h2>
            <p className="text-travertino/70 text-lg mb-12 max-w-2xl">
              Usiamo attrezzature professionali di ultima generazione con sistema di aspirazione integrata.
              Il risultato: cantieri puliti, niente polvere in casa, massimo rispetto per il tuo spazio.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <FadeIn>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-travertino mb-4">Levigatrice a Nastro</h3>
                <p className="text-travertino/70 leading-relaxed mb-4">
                  La macchina principale lavora sulle superfici aperte con nastri abrasivi di granulometria progressiva.
                  Gestisce dislivelli, graffi profondi e vecchie finiture con precisione millimetrica.
                  Il motore ad alta potenza è collegato direttamente all&apos;aspiratore industriale.
                </p>
                <ul className="space-y-2">
                  {['Granulometria progressiva 24 → 120', 'Aspirazione integrata classe M', 'Passa in sicurezza sui bordi incollati'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-travertino/80 text-sm">
                      <CheckCircle size={16} className="text-rovere mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-travertino mb-4">Levigatrice Orbitale per Bordi e Angoli</h3>
                <p className="text-travertino/70 leading-relaxed mb-4">
                  I bordi, gli angoli e le zone vicino ai battiscopa richiedono una macchina diversa:
                  la levigatrice orbitale è più compatta e manovrabile, per non lasciare nemmeno un centimetro di parquet non trattato.
                </p>
                <ul className="space-y-2">
                  {['Raggiunge fino a 2 mm dal muro', 'Disco orbitale anti-segno', 'Collegata al sistema di aspirazione'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-travertino/80 text-sm">
                      <CheckCircle size={16} className="text-rovere mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
          <FadeIn>
            <div className="bg-rovere/20 border border-rovere/40 rounded-xl p-6 flex items-start gap-4">
              <Star className="text-rovere shrink-0 mt-1" size={24} />
              <p className="text-travertino font-medium">
                Il nostro sistema di aspirazione integrata riduce la dispersione di polvere di oltre il 95% rispetto alle macchine tradizionali.
                Puoi restare in casa durante i lavori - la polvere rimane nel filtro, non nei tuoi polmoni.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-12">
              Domande Frequenti sulla Levigatura
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

      {/* COPERTURA GEOGRAFICA */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Dove Operiamo
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-10 max-w-2xl">
              Con sede a Bergamo, operiamo in tutta la Lombardia. Ecco le principali città in cui siamo presenti.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {zones.map((zone) => (
              <FadeIn key={zone.name}>
                <Link
                  href={zone.href}
                  className="flex items-center gap-3 bg-travertino rounded-xl p-5 border border-legno-bruciato/10 hover:border-rovere hover:bg-wood-50 transition-colors group"
                >
                  <MapPin className="text-rovere shrink-0" size={20} />
                  <span className="font-semibold text-legno-bruciato group-hover:text-rovere transition-colors">
                    {zone.name}
                  </span>
                  <ArrowRight size={16} className="ml-auto text-legno-bruciato/40 group-hover:text-rovere transition-colors" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />

      {/* RELATED LINKS */}
      <RelatedLinks
        links={[
          { title: 'Restauro Parquet', description: 'Recupero e restauro di parquet antichi e storici.', href: '/restauro-parquet' },
          { title: 'Riparazione Parquet', description: 'Interventi puntuali su scricchiolii e listelli rotti.', href: '/riparazione-parquet' },
          { title: 'Posa Parquet', description: 'Posa professionale di parquet massello, prefinito e SPC.', href: '/servizi/posa' },
          { title: 'Contattaci', description: 'Richiedi un sopralluogo gratuito e senza impegno.', href: '/contatti' },
        ]}
      />
    </>
  )
}
