import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, MessageCircle, Sparkles, Shield, Clock, Wrench } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { BreadcrumbSchema, ServiceSchema, FaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Levigatura Parquet Senza Polvere | Bergamo e Lombardia',
  description:
    'Levigatura parquet professionale senza polvere a Bergamo e Lombardia. Macchinari con aspirazione integrata. Risultato impeccabile in 2 giorni. Preventivo gratuito.',
  alternates: { canonical: 'https://arteparquet.pro/levigatura-parquet' },
  openGraph: {
    title: 'Levigatura Parquet Senza Polvere | Arteparquet',
    description: 'Levigatura professionale con aspirazione integrata. Zero polvere, risultato perfetto.',
    url: 'https://arteparquet.pro/levigatura-parquet',
  },
}

const FAQ_ITEMS = [
  {
    q: 'Quante volte si può levigare un parquet?',
    a: 'Un parquet massello da 14-18mm si può levigare 4-6 volte nell\'arco di 50+ anni. Il prefinito con strato nobile da 4mm si leviga 1-2 volte al massimo. Durante il sopralluogo misuriamo lo spessore residuo e ti diciamo esattamente quante levigature sono ancora possibili.',
  },
  {
    q: 'Quanto tempo richiede la levigatura di 80 mq?',
    a: 'Per 80 mq servono circa 2 giorni lavorativi: il primo per la levigatura vera e propria, il secondo per l\'applicazione della finitura (olio o vernice). Il pavimento è calpestabile dopo 12-24 ore dalla finitura.',
  },
  {
    q: 'La levigatura senza polvere è davvero senza polvere?',
    a: 'I nostri macchinari professionali con aspirazione integrata eliminano il 95% della polvere durante la lavorazione. Non è necessario coprire i mobili nelle altre stanze né sigillare le porte. Residui minimi vengono aspirati a fine lavoro.',
  },
  {
    q: 'Devo svuotare completamente la stanza?',
    a: 'Sì, la stanza da levigare deve essere completamente vuota di mobili. Possiamo aiutarti a spostare i mobili pesanti nelle stanze adiacenti. Il resto della casa rimane abitabile durante i lavori.',
  },
  {
    q: 'Meglio finitura a olio o a vernice?',
    a: 'L\'olio penetra nel legno esaltando le venature naturali, richiede manutenzione periodica ma permette ritocchi locali. La vernice forma un film protettivo più resistente all\'usura, ideale per alto traffico, ma in caso di danno richiede rilevigatura completa.',
  },
  {
    q: 'Si può cambiare il colore del parquet durante la levigatura?',
    a: 'Sì. Dopo la levigatura il legno torna al colore naturale e possiamo applicare oli o vernici pigmentate per schiarire, scurire o dare tonalità diverse (grigio, bianco, miele, noce). Ti mostriamo i campioni prima di procedere.',
  },
]

const PROCESS_STEPS = [
  {
    title: 'Sopralluogo e Diagnosi',
    description: 'Valutiamo lo spessore del legno, lo stato del pavimento e le tue esigenze. Preventivo dettagliato entro 24 ore.',
    icon: Wrench,
  },
  {
    title: 'Levigatura Professionale',
    description: 'Macchine a nastro e a disco con aspirazione integrata. Levigatura progressiva da grana grossa a finissima.',
    icon: Sparkles,
  },
  {
    title: 'Stuccatura e Preparazione',
    description: 'Riempiamo le fessure con pasta di legno tinteggiata. Levigatrice bordatrice per angoli e battiscopa.',
    icon: Shield,
  },
  {
    title: 'Finitura e Consegna',
    description: 'Applicazione di olio naturale o vernice UV. Pulizia finale inclusa. Calpestabile in 12-24 ore.',
    icon: Clock,
  },
]

export default function LevigaturaPillarPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Levigatura Parquet', url: 'https://arteparquet.pro/levigatura-parquet' },
        ]}
      />
      <ServiceSchema
        name="Levigatura Parquet Senza Polvere"
        description="Servizio professionale di levigatura parquet con macchinari ad aspirazione integrata. Zero polvere, risultato impeccabile."
        url="https://arteparquet.pro/levigatura-parquet"
      />
      <FaqSchema items={FAQ_ITEMS} />

      {/* Hero Section - BLUF Format */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn>
            <p className="text-rovere font-medium mb-4 text-sm uppercase tracking-wider">
              Pillar Guide — Levigatura Professionale
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl">
              Levigatura Parquet<br />
              <span className="text-rovere">Senza Polvere</span>
            </h1>
            
            {/* BLUF - Bottom Line Up Front (40-60 parole per AEO) */}
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mb-8 leading-relaxed">
              La levigatura professionale riporta il parquet allo splendore originale eliminando graffi, 
              macchie e vecchie finiture. I nostri macchinari con aspirazione integrata riducono la polvere 
              del 95%. Risultato impeccabile in 2 giorni, calpestabile dopo 12-24 ore.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                <Phone size={20} />
                Chiama: 389 240 7827
              </a>
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20un%20preventivo%20per%20levigatura%20parquet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-rovere hover:text-rovere text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                <MessageCircle size={20} />
                Foto su WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Processo in 4 Step */}
      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4">
              Come Funziona la Levigatura
            </h2>
            <p className="text-center text-legno-bruciato/70 max-w-2xl mx-auto mb-16">
              Un processo collaudato in 30 anni di esperienza per risultati garantiti.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-14 h-14 bg-rovere/10 rounded-xl flex items-center justify-center mb-6">
                    <step.icon className="text-rovere" size={28} />
                  </div>
                  <div className="text-sm text-rovere font-semibold mb-2">Step {index + 1}</div>
                  <h3 className="font-serif text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-legno-bruciato/70">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tabella Comparativa AEO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4">
              Finitura Olio vs Vernice
            </h2>
            <p className="text-center text-legno-bruciato/70 max-w-2xl mx-auto mb-12">
              Quale finitura scegliere dopo la levigatura? Ecco un confronto tecnico.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-travertino rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-nero-marquina text-white">
                    <th className="p-4 text-left font-semibold">Caratteristica</th>
                    <th className="p-4 text-center font-semibold">Olio Naturale</th>
                    <th className="p-4 text-center font-semibold">Vernice UV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-legno-bruciato/10">
                  <tr>
                    <td className="p-4 font-medium">Aspetto</td>
                    <td className="p-4 text-center">Naturale, opaco, venature esaltate</td>
                    <td className="p-4 text-center">Lucido o satinato, uniforme</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-medium">Resistenza all'usura</td>
                    <td className="p-4 text-center">Media (richiede manutenzione)</td>
                    <td className="p-4 text-center">Alta (film protettivo)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Manutenzione</td>
                    <td className="p-4 text-center">Oliatura ogni 1-2 anni</td>
                    <td className="p-4 text-center">Nessuna (solo pulizia)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-medium">Riparazioni locali</td>
                    <td className="p-4 text-center text-green-600 font-medium">✓ Possibili</td>
                    <td className="p-4 text-center text-red-600 font-medium">✗ Richiede rilevigatura</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Ideale per</td>
                    <td className="p-4 text-center">Ambienti residenziali, look naturale</td>
                    <td className="p-4 text-center">Alto traffico, famiglie con bambini</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-medium">Tempo asciugatura</td>
                    <td className="p-4 text-center">24 ore</td>
                    <td className="p-4 text-center">12 ore</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section con Schema */}
      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4">
              Domande Frequenti sulla Levigatura
            </h2>
            <p className="text-center text-legno-bruciato/70 max-w-2xl mx-auto mb-12">
              Risposte chiare alle domande più comuni dei nostri clienti.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-6">
            {FAQ_ITEMS.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <details className="group bg-white rounded-xl shadow-sm">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="font-semibold text-lg pr-4">{faq.q}</h3>
                    <span className="text-rovere text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-legno-bruciato/80 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 md:py-28 bg-nero-marquina text-white">
        <div className="container-wide text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Il tuo parquet merita una nuova vita
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Inviaci le foto del pavimento su WhatsApp e ricevi una valutazione gratuita 
              in 5 minuti. Sopralluogo e preventivo senza impegno a Bergamo e Lombardia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20un%20preventivo%20per%20levigatura%20parquet.%20Vi%20mando%20le%20foto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                <MessageCircle size={20} />
                Invia Foto su WhatsApp
              </a>
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:bg-white hover:text-nero-marquina font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Richiedi Sopralluogo Gratuito
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Internal Linking */}
      <section className="py-16 bg-travertino border-t border-legno-bruciato/10">
        <div className="container-wide">
          <h3 className="font-serif text-2xl font-bold mb-8 text-center">Servizi Correlati</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Restauro Parquet', href: '/servizi/restauro', desc: 'Recupero parquet antichi' },
              { title: 'Riparazione Parquet', href: '/servizi/riparazioni', desc: 'Scricchiolii e danni' },
              { title: 'Posa Parquet', href: '/servizi/posa', desc: 'Installazione professionale' },
              { title: 'Parquet Bergamo', href: '/zone/parquet-bergamo', desc: 'Servizi nella tua zona' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white p-5 rounded-xl hover:shadow-md transition-shadow group"
              >
                <h4 className="font-semibold group-hover:text-rovere transition-colors">{link.title}</h4>
                <p className="text-sm text-legno-bruciato/60 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
