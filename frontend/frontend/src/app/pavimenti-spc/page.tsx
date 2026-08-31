import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, MessageCircle, Droplets, Shield, Zap, Volume2 } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { BreadcrumbSchema, ServiceSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Pavimenti SPC Impermeabili',
  description:
    'Posa SPC impermeabile a Bergamo e Lombardia. Ideale per bagni e cucine, anche sopra piastrelle. Preventivo gratuito.',
  alternates: { canonical: 'https://arteparquet.pro/pavimenti-spc' },
}

const FAQ_ITEMS = [
  {
    q: 'Posso installare SPC in bagno?',
    a: 'Sì, l\'SPC è impermeabile al 100% ed è la soluzione ideale per bagni, cucine, lavanderie e qualsiasi ambiente umido. Il nucleo in Stone Polymer Composite non assorbe acqua e non si deforma.',
  },
  {
    q: 'Si può posare SPC sopra le piastrelle esistenti?',
    a: 'Sì, nella maggior parte dei casi l\'SPC click si installa direttamente sopra piastrelle, marmo o pavimenti esistenti, purché siano livellati e stabili. Nessuna demolizione, nessuna polvere, tempi ridotti.',
  },
  {
    q: 'Quanto è realistico l\'effetto legno dell\'SPC?',
    a: 'Le versioni di qualità hanno texture in rilievo sincronizzata che replica fedelmente le venature del legno. Al tatto e alla vista è difficile distinguerlo dal vero parquet. Ti mostriamo i campioni prima di scegliere.',
  },
  {
    q: 'L\'SPC è compatibile con il riscaldamento a pavimento?',
    a: 'Sì, l\'SPC è compatibile con riscaldamento a pavimento fino a 28°C di temperatura superficiale. La resistenza termica è bassa, quindi il calore si trasmette efficientemente.',
  },
  {
    q: 'Quanto dura un pavimento SPC?',
    a: 'Con normale utilizzo residenziale, 20-30 anni. La classe di usura AC5 e lo strato protettivo UV lo rendono resistente a graffi, urti e raggi solari. Garanzia produttore fino a 25 anni.',
  },
]

const FEATURES = [
  { icon: Droplets, title: 'Impermeabile 100%', desc: 'Ideale per bagni, cucine e ambienti umidi' },
  { icon: Shield, title: 'Ultra Resistente', desc: 'Classe AC5, resiste a graffi e urti' },
  { icon: Zap, title: 'Posa Veloce', desc: 'Sistema click, senza colla, su pavimento esistente' },
  { icon: Volume2, title: 'Silenzioso', desc: 'Sottofondo integrato antirumore' },
]

export default function SpcPillarPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Pavimenti SPC', url: 'https://arteparquet.pro/pavimenti-spc' },
        ]}
      />
      <ServiceSchema
        name="Posa Pavimenti SPC Impermeabili"
        description="Installazione pavimenti SPC impermeabili. Effetto legno realistico per bagni e cucine. Posa su piastrelle senza demolire."
        url="https://arteparquet.pro/pavimenti-spc"
      />
      <ServiceFaqSchema items={FAQ_ITEMS} />

      {/* Hero - BLUF */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn>
            <p className="text-rovere font-medium mb-4 text-sm uppercase tracking-wider">
              Pillar Guide — Pavimenti Moderni
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl">
              Pavimenti SPC<br />
              <span className="text-rovere">Impermeabili</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mb-8 leading-relaxed">
              L'SPC (Stone Polymer Composite) è la rivoluzione dei pavimenti moderni: impermeabile al 
              100%, resistente ai graffi, con l'aspetto del vero legno. Si installa sopra piastrelle 
              esistenti senza demolire. Perfetto per bagni, cucine e ristrutturazioni veloci.
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
              <Link
                href="/preventivo"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-rovere hover:text-rovere text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Richiedi Preventivo
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-16">
              Perché Scegliere SPC
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm text-center h-full">
                  <div className="w-16 h-16 bg-rovere/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <f.icon className="text-rovere" size={32} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-legno-bruciato/70">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tabella SPC vs Parquet */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-12">
              SPC vs Parquet Tradizionale
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-travertino rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-nero-marquina text-white">
                    <th className="p-4 text-left">Caratteristica</th>
                    <th className="p-4 text-center">SPC</th>
                    <th className="p-4 text-center">Parquet Vero</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-legno-bruciato/10">
                  <tr>
                    <td className="p-4 font-medium">Impermeabilità</td>
                    <td className="p-4 text-center text-green-600 font-medium">100%</td>
                    <td className="p-4 text-center text-red-600">No (sensibile)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-medium">Posa su piastrelle</td>
                    <td className="p-4 text-center text-green-600">✓ Sì, senza demolire</td>
                    <td className="p-4 text-center text-red-600">✗ Richiede massetto</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Tempo di posa (80mq)</td>
                    <td className="p-4 text-center">1 giorno</td>
                    <td className="p-4 text-center">2-3 giorni</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-medium">Manutenzione</td>
                    <td className="p-4 text-center">Minima</td>
                    <td className="p-4 text-center">Periodica</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Levigabile</td>
                    <td className="p-4 text-center text-red-600">✗ No</td>
                    <td className="p-4 text-center text-green-600">✓ Sì (4-6 volte)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-medium">Durata</td>
                    <td className="p-4 text-center">20-30 anni</td>
                    <td className="p-4 text-center">50+ anni</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-12">
              Domande sui Pavimenti SPC
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <details className="group bg-white rounded-xl">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold">
                    {faq.q}
                    <span className="text-rovere text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-legno-bruciato/80">{faq.a}</div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-nero-marquina text-white text-center">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Vuoi un pavimento impermeabile?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Richiedi un preventivo gratuito per la posa di SPC nel tuo bagno o cucina.
            </p>
            <Link
              href="/preventivo"
              className="inline-flex items-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-8 py-4 rounded-xl"
            >
              Richiedi Preventivo Gratuito
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
