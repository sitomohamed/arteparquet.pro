import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { CtaSection } from '@/components/sections/cta-section'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Parquet Bergamo e Provincia | Posa, Restauro e Levigatura | Arteparquet',
  description:
    'Parquettista a Bergamo e in tutta la provincia. Seriate, Dalmine, Treviglio, Albino e tutti i comuni BG. Sede in Via Vittorio Alfieri 7. Preventivo gratuito.',
  alternates: {
    canonical: 'https://arteparquet.pro/bergamo-e-provincia',
  },
  openGraph: {
    title: 'Parquet Bergamo e Provincia | Posa, Restauro e Levigatura | Arteparquet',
    description:
      'Parquettista a Bergamo e in tutta la provincia. Seriate, Dalmine, Treviglio, Albino e tutti i comuni BG. Sede in Via Vittorio Alfieri 7.',
    url: 'https://arteparquet.pro/bergamo-e-provincia',
  },
}

const faqItems = [
  {
    question: 'Coprite tutta la provincia di Bergamo?',
    answer:
      'Sì. Interveniamo in tutti i comuni della provincia di Bergamo, dalla pianura alle valli (Val Seriana, Val Brembana, Val Cavallina). Con sede in Via Vittorio Alfieri 7 a Bergamo, siamo al centro del territorio e raggiungiamo ogni comune in tempi brevi.',
  },
  {
    question: 'In quanto tempo arrivate per il sopralluogo?',
    answer:
      'Per la città di Bergamo e i comuni limitrofi (Seriate, Dalmine, Stezzano, Curno, Azzano, Gorle, Scanzorosciate, Lallio, Grassobbio) il sopralluogo viene generalmente organizzato entro pochi giorni dalla richiesta. Per comuni più lontani i tempi dipendono dal calendario, ma ci organizziamo sempre per venire incontro alle esigenze del cliente.',
  },
  {
    question: 'Fate interventi urgenti in provincia?',
    answer:
      'Sì, gestiamo interventi prioritari per situazioni urgenti: bordi pericolosi, parquet danneggiato che impedisce l\'utilizzo di una stanza, emergenze nei cantieri. Contattateci direttamente per telefono o WhatsApp per valutare la priorità.',
  },
  {
    question: 'Siete presenti su Google Maps?',
    answer:
      'Sì. Trovi Arteparquet su Google Maps cercando "Arteparquet Bergamo". La nostra scheda Google Business include foto dei lavori, recensioni verificate e i nostri orari. La sede è in Via Vittorio Alfieri 7, Bergamo.',
  },
]

const zones = [
  { name: 'Bergamo', href: '/zona/parquet-bergamo', highlight: true },
  { name: 'Seriate', href: '/zona/parquet-seriate' },
  { name: 'Dalmine', href: '/zona/parquet-dalmine' },
  { name: 'Treviglio', href: '/zona/parquet-treviglio' },
  { name: 'Albino', href: '/zona/parquet-albino' },
  { name: 'Zanica', href: '/zona/parquet-zanica' },
  { name: 'Stezzano', href: '/zona/parquet-stezzano' },
  { name: 'Curno', href: '/zona/parquet-curno' },
  { name: 'Azzano San Paolo', href: '/zona/parquet-azzano' },
  { name: 'Gorle', href: '/zona/parquet-gorle' },
  { name: 'Scanzorosciate', href: '/zona/parquet-scanzorosciate' },
  { name: 'Lallio', href: '/zona/parquet-lallio' },
  { name: 'Grassobbio', href: '/zona/parquet-grassobbio' },
  { name: 'Orio al Serio', href: '/zona/parquet-orio' },
  { name: 'Romano di Lombardia', href: '/zona/parquet-romano' },
  { name: 'Clusone', href: '/zona/parquet-clusone' },
  { name: 'Ciserano', href: '/zona/parquet-ciserano' },
  { name: 'Verdellino', href: '/zona/parquet-verdellino' },
  { name: 'Terno d\'Isola', href: '/zona/parquet-terno' },
  { name: 'Alzano Lombardo', href: '/zona/parquet-alzano' },
]

const services = [
  {
    title: 'Posa Parquet',
    description:
      'Posa di parquet massello, prefinito, SPC e PVC in tutta la provincia. Schemi a correre, spina di pesce, punto d\'Ungheria e schemi personalizzati. Sopralluogo e preventivo gratuiti.',
    href: '/servizi/posa',
  },
  {
    title: 'Levigatura',
    description:
      'Levigatura professionale con macchine ad aspirazione integrata. Zero polvere. Ripristiniamo la finitura e il colore del parquet, ovunque tu sia in provincia.',
    href: '/levigatura-parquet',
  },
  {
    title: 'Restauro',
    description:
      'Recuperiamo parquet antichi e storici. Sostituzione listelli, stuccatura cromatizzata, finitura a olio o vernice. Ideale per edifici storici e ville della Bergamasca.',
    href: '/restauro-parquet',
  },
  {
    title: 'Riparazione',
    description:
      'Interventi puntuali su scricchiolii, listelli rotti, bordi sollevati e rigonfiamenti. Senza stravolgere tutto, risolviamo il problema nel modo più efficiente.',
    href: '/riparazione-parquet',
  },
]

const differentiators = [
  {
    title: 'Sede Fisica a Bergamo',
    description: 'Non siamo un\'azienda di passaggio: abbiamo una sede stabile in Via Vittorio Alfieri 7, Bergamo. Puoi venire a trovarci, portare campioni di pavimento, confrontare materiali.',
  },
  {
    title: '30 Anni sul Territorio Bergamasco',
    description: 'Dal 1996 lavoriamo nella Bergamasca. Conosciamo le case, gli edifici storici di Città Alta, le villette dell\'hinterland e gli appartamenti nelle valli. Questa conoscenza locale fa la differenza.',
  },
  {
    title: 'Conoscenza degli Edifici Locali',
    description: 'Ogni zona ha le sue caratteristiche: le pavimentazioni dei palazzi storici di Città Alta, i sottofondo in laterocemento dell\'hinterland anni \'80, le costruzioni recenti delle zone industriali. Conoscerle ci permette di intervenire in modo più preciso.',
  },
  {
    title: 'Risposta Rapida',
    description: 'Siamo vicini. Per preventivi urgenti, sopralluoghi in cantiere o consulenze telefoniche, la nostra prossimità geografica è un vantaggio concreto per chi lavora in provincia.',
  },
]

export default function BergamoEProvinciaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Bergamo e Provincia', url: 'https://arteparquet.pro/bergamo-e-provincia' },
        ]}
      />
      <ServiceFaqSchema items={faqItems.map(f => ({ q: f.question, a: f.answer }))} />

      {/* HERO */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <span className="inline-block bg-rovere/20 border border-rovere/40 text-rovere text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Sede a Bergamo dal 1996
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-travertino">
              Parquettista a Bergamo<br />
              <span className="text-rovere">e Provincia - La Nostra Casa</span>
            </h1>
            <p className="text-lg md:text-xl text-travertino/80 max-w-2xl mb-6 leading-relaxed">
              Arteparquet è nata a Bergamo nel 1996 e non ha mai smesso di lavorare su questo territorio.
              Dalla Città Alta alla Val Seriana, dall&apos;hinterland pianeggiante alle valli alpine:
              conosciamo le case bergamasche meglio di chiunque altro.
            </p>
            <div className="flex items-center gap-2 text-travertino/60 mb-10">
              <MapPin size={16} className="text-rovere" />
              <span>Via Vittorio Alfieri 7, Bergamo</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere text-white font-semibold px-8 py-4 rounded-lg hover:bg-wood-500 transition-colors"
              >
                <Phone size={20} />
                Chiama Ora
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20un%20preventivo%20per%20parquet%20a%20Bergamo."
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

      {/* BERGAMO È CASA NOSTRA */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-6">
                Bergamo È Casa Nostra
              </h2>
              <p className="text-legno-bruciato/70 leading-relaxed mb-5">
                Quando nel 1996 Mohamed Arabi ha fondato Arteparquet, ha scelto Bergamo non per caso.
                Questa città e la sua provincia rappresentano per noi molto più di un mercato:
                sono il territorio che conosciamo profondamente, in cui abbiamo costruito
                relazioni durature con famiglie, artigiani e professionisti.
              </p>
              <p className="text-legno-bruciato/70 leading-relaxed mb-5">
                In trent&apos;anni abbiamo posato e restaurato parquet in centinaia di appartamenti,
                ville, palazzi storici e uffici bergamaschi. Dai palazzi d&apos;epoca di Città Alta
                con le loro pavimentazioni ottocentesche, alle costruzioni degli anni &apos;70 in Città Bassa,
                fino alle case nuove di Dalmine, Seriate e Stezzano: conosciamo ogni tipo di edificio
                e ogni tipo di sottofondo.
              </p>
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-legno-bruciato/10">
                <MapPin size={20} className="text-rovere mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-legno-bruciato">La Nostra Sede</p>
                  <p className="text-legno-bruciato/70 text-sm">Via Vittorio Alfieri 7, Bergamo</p>
                  <p className="text-legno-bruciato/70 text-sm">+39 389 240 7827</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-nero-marquina rounded-2xl p-8 text-travertino">
                <h3 className="font-bold text-xl mb-6 text-travertino">In Numeri</h3>
                <div className="space-y-5">
                  {[
                    { val: '1996', label: 'Anno di fondazione a Bergamo' },
                    { val: '30+', label: 'Anni di operatività in provincia' },
                    { val: 'BG', label: 'Provincia di appartenenza e cuore del lavoro' },
                    { val: '100+', label: 'Comuni raggiunti in tutta la Bergamasca' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                      <span className="text-3xl font-extrabold text-rovere w-20 shrink-0">{stat.val}</span>
                      <span className="text-travertino/70 text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ZONE COPERTE */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Zone Coperte in Provincia di Bergamo
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-10 max-w-2xl">
              Operiamo in tutta la provincia di Bergamo. Clicca sulla tua città per saperne di più.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {zones.map((zone) => (
              <FadeIn key={zone.name}>
                <Link
                  href={zone.href}
                  className={`flex items-center gap-2 rounded-xl p-4 border transition-colors group ${
                    zone.highlight
                      ? 'bg-rovere/10 border-rovere/40 hover:bg-rovere/20'
                      : 'bg-travertino border-legno-bruciato/10 hover:border-rovere hover:bg-wood-50'
                  }`}
                >
                  <MapPin size={14} className="text-rovere shrink-0" />
                  <span className={`text-sm font-semibold ${zone.highlight ? 'text-rovere' : 'text-legno-bruciato group-hover:text-rovere'} transition-colors`}>
                    {zone.name}
                  </span>
                  {zone.highlight && <span className="ml-auto text-xs text-rovere font-bold">●</span>}
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="text-legno-bruciato/50 text-sm mt-6 text-center">
              Non trovi il tuo comune? Contattaci: operiamo in tutta la provincia di Bergamo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SERVIZI IN PROVINCIA */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              I Nostri Servizi in Provincia
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Offriamo la gamma completa dei servizi di parquetteria in tutto il territorio bergamasco.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((svc) => (
              <FadeIn key={svc.title}>
                <Link
                  href={svc.href}
                  className="block bg-white rounded-2xl p-8 shadow-sm border border-legno-bruciato/10 hover:border-rovere transition-colors group h-full"
                >
                  <h3 className="font-bold text-legno-bruciato text-xl mb-3 group-hover:text-rovere transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-legno-bruciato/70 text-sm leading-relaxed mb-4">{svc.description}</p>
                  <div className="flex items-center gap-1 text-rovere text-sm font-medium">
                    Scopri di più <ArrowRight size={14} />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PERCHÉ SIAMO DIVERSI */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Perché Siamo Diversi dagli Altri a Bergamo
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Ci sono molte aziende di parquet in Lombardia. Ecco cosa ci distingue nella Bergamasca.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((d) => (
              <FadeIn key={d.title}>
                <div className="bg-travertino rounded-xl p-7 border border-legno-bruciato/10 flex gap-4">
                  <CheckCircle size={22} className="text-rovere mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-legno-bruciato mb-2">{d.title}</h3>
                    <p className="text-legno-bruciato/70 text-sm leading-relaxed">{d.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-12">
              Domande sul Servizio in Provincia
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

      {/* CTA */}
      <CtaSection />

      <RelatedLinks
        links={[
          { title: 'Posa Parquet', description: 'Posa professionale di parquet massello, prefinito e SPC.', href: '/servizi/posa' },
          { title: 'Levigatura Parquet', description: 'Ripristino del parquet con macchine senza polvere.', href: '/levigatura-parquet' },
          { title: 'Restauro Parquet', description: 'Recupero e restauro di parquet antichi e storici.', href: '/restauro-parquet' },
          { title: 'Contattaci', description: 'Richiedi un sopralluogo gratuito e senza impegno.', href: '/contatti' },
        ]}
      />
    </>
  )
}
