import type { Metadata } from 'next'
import { CheckCircle, Phone, MessageCircle } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { RelatedLinks } from '@/components/ui/related-links'
import { CtaSection } from '@/components/sections/cta-section'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Pavimenti SPC e PVC Bergamo - Impermeabili | Arteparquet',
  description:
    'Posa pavimenti SPC e PVC impermeabili a Bergamo e Lombardia. Adatti a bagni, cucine e ambienti umidi. Installazione rapida. Preventivo gratuito.',
  alternates: {
    canonical: 'https://arteparquet.pro/pavimenti-spc',
  },
  openGraph: {
    title: 'Pavimenti SPC e PVC Bergamo - Impermeabili | Arteparquet',
    description:
      'Posa pavimenti SPC e PVC impermeabili a Bergamo e Lombardia. Adatti a bagni, cucine e ambienti umidi. Installazione rapida.',
    url: 'https://arteparquet.pro/pavimenti-spc',
  },
}

const faqItems = [
  {
    question: 'Qual è la differenza tra SPC e PVC?',
    answer:
      'Il nucleo SPC (Stone Plastic Composite) è rigido, composto da pietra calcarea e PVC. È più dimensionalmente stabile, non si dilata con il calore e sopporta il passaggio di carrelli e mobili pesanti. Il PVC click ha un nucleo più morbido, è più confortevole sotto i piedi ma meno resistente ai pesi. Per bagni e cucine consigliamo sempre SPC; per zone living dove si privilegia il comfort acustico, il PVC click è un\'ottima alternativa.',
  },
  {
    question: 'I pavimenti SPC resistono davvero all\'acqua?',
    answer:
      'Sì. Il nucleo SPC è al 100% impermeabile: non assorbe acqua e non si gonfia in caso di allagamento superficiale. Attenzione però ai giunti perimetrali (vicino alle pareti) che vanno sigillati correttamente. La nostra posa include sempre la sigillatura perimetrale per garantire la tenuta all\'acqua.',
  },
  {
    question: 'Che rumore fa il pavimento SPC sotto i piedi?',
    answer:
      'Il click SPC senza sottofondo può risultare "vuoto" e risonante. Per questo abbiniamo quasi sempre un sottofondo acustico preincollato o in rotolo. Molti prodotti SPC hanno già il foam integrato sul retro, ma per ambienti dove si vuole ridurre al massimo il calpestio rumoroso raccomandiamo un sottofondo dedicato.',
  },
  {
    question: 'I pavimenti SPC sono compatibili con il riscaldamento a pavimento?',
    answer:
      'Sì, la maggior parte dei pavimenti SPC è compatibile con il riscaldamento a pavimento (idronico o elettrico). La resistenza termica (R-value) dell\'SPC è bassa, il che significa che il calore passa bene. Verifichiamo sempre le specifiche tecniche del prodotto prima della posa.',
  },
]

const benefits = [
  { title: '100% Impermeabile', description: 'Il nucleo SPC non assorbe acqua. Ideale per bagni, cucine e lavanderie senza preoccupazioni.' },
  { title: 'Resistente ai Graffi', description: 'Lo strato wear layer di 0,3-0,5 mm protegge dalla graffiatura di mobili, tacchi e animali domestici.' },
  { title: 'Posa Rapida', description: 'Il sistema click permette di posare 30-40 mq al giorno. Meno cantiere, meno stress.' },
  { title: 'Effetto Legno Realistico', description: 'Lo strato decorativo HD riproduce fedelmente le venature del legno. Difficile distinguerlo da un vero parquet.' },
  { title: 'Manutenzione Semplice', description: 'Basta un panno umido. Nessun olio, nessuna cera, nessun trattamento periodico.' },
  { title: 'Compatibile con Riscaldamento', description: 'Compatibile con impianti a pavimento idronici ed elettrici.' },
]

const products = [
  {
    name: 'SPC (Stone Plastic Composite)',
    best: 'Bagni, cucine, ambienti umidi',
    pros: ['Nucleo rigido, dimensionalmente stabile', 'Impermeabile al 100%', 'Altissima resistenza alla compressione', 'Ideale per zone umide'],
    cons: ['Meno morbido sotto i piedi rispetto al PVC', 'Richiede sottofondo acustico'],
  },
  {
    name: 'PVC Click',
    best: 'Soggiorni, camere, residenziale',
    pros: ['Morbido e confortevole', 'Ottimo isolamento acustico', 'Più economico dell\'SPC', 'Facile da posare anche in autotrasporto'],
    cons: ['Meno stabile in grandi superfici', 'Non consigliato per zone a forte umidità'],
  },
  {
    name: 'Vinilico Incollato',
    best: 'Commerciale, alto traffico',
    pros: ['Massima durabilità in ambienti commerciali', 'Zero giunti di dilatazione', 'Superficie continua e facile da pulire', 'Elevata resistenza all\'usura'],
    cons: ['Posa più lunga (attesa colla)', 'Rimozione più complessa in futuro'],
  },
]

const posazSteps = [
  {
    num: '01',
    title: 'Sopralluogo e Misurazione',
    description: 'Valutiamo il sottofondo (umidità, planarità), le dimensioni della stanza e le esigenze estetiche per consigliarti il prodotto più adatto.',
  },
  {
    num: '02',
    title: 'Preparazione del Sottofondo',
    description: 'Un sottofondo piano è fondamentale per il click SPC. Dove necessario, eseguiamo rasature di livellamento o applichiamo primer barriera all\'umidità.',
  },
  {
    num: '03',
    title: 'Posa a Click',
    description: 'Le doghe vengono posate a correre, a spina o con offset variabile (a scelta del cliente), assicurando giunto di dilatazione perimetrale corretto.',
  },
  {
    num: '04',
    title: 'Zoccolini e Rifinitura',
    description: 'Posiamo zoccolini in PVC o MDF e sigilliamo il perimetro. Il lavoro finisce sempre in modo pulito, con attenzione ai dettagli.',
  },
]

export default function PavimentiSpcPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Pavimenti SPC e PVC', url: 'https://arteparquet.pro/pavimenti-spc' },
        ]}
      />
      <ServiceFaqSchema items={faqItems.map(f => ({ q: f.question, a: f.answer }))} />

      {/* HERO */}
      <section className="bg-nero-marquina text-travertino pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <span className="inline-block bg-rovere/20 border border-rovere/40 text-rovere text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Impermeabile e Resistente
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-travertino">
              Pavimenti SPC e PVC:<br />
              <span className="text-rovere">L&apos;Alternativa Impermeabile al Parquet</span>
            </h1>
            <p className="text-lg md:text-xl text-travertino/80 max-w-2xl mb-10 leading-relaxed">
              Vuoi l&apos;estetica del legno in bagno o in cucina? I pavimenti SPC e PVC combinano
              la bellezza delle venature naturali con la resistenza totale all&apos;acqua.
              Posa professionale a Bergamo e in tutta la Lombardia.
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
                href="https://wa.me/393892407827?text=Ciao!%20Vorrei%20informazioni%20sui%20pavimenti%20SPC%20e%20PVC."
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

      {/* CONFRONTO SPC vs PVC vs VINILICO */}
      <section className="bg-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              SPC vs PVC vs Vinilico: Quale Scegliere?
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Ogni prodotto ha caratteristiche diverse. Ecco un confronto chiaro per aiutarti a scegliere.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((prod, idx) => (
              <FadeIn key={prod.name}>
                <div className={`rounded-2xl p-8 h-full border ${idx === 0 ? 'bg-white border-rovere/30 shadow-md' : 'bg-white border-legno-bruciato/10'}`}>
                  {idx === 0 && (
                    <span className="inline-block bg-rovere text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                      Più Richiesto
                    </span>
                  )}
                  <h3 className="font-bold text-legno-bruciato text-xl mb-1">{prod.name}</h3>
                  <p className="text-rovere text-sm font-medium mb-5">Ideale per: {prod.best}</p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-legno-bruciato/50 uppercase tracking-wide mb-2">Vantaggi</p>
                    <ul className="space-y-2">
                      {prod.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-legno-bruciato/80">
                          <CheckCircle size={14} className="text-rovere mt-0.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-legno-bruciato/50 uppercase tracking-wide mb-2">Considerazioni</p>
                    <ul className="space-y-2">
                      {prod.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-legno-bruciato/60">
                          <span className="w-1 h-1 rounded-full bg-legno-bruciato/30 mt-2 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PERCHÉ SPC PER BAGNO/CUCINA */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-legno-bruciato mb-4">
              Perché Scegliere SPC per Bagno e Cucina
            </h2>
            <p className="text-legno-bruciato/70 text-lg mb-12 max-w-2xl">
              Nei locali umidi, il parquet tradizionale è sconsigliato. L&apos;SPC offre lo stesso effetto
              estetico del legno con zero rischi legati all&apos;umidità.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <FadeIn key={b.title}>
                <div className="bg-travertino rounded-xl p-6 border border-legno-bruciato/10 h-full">
                  <CheckCircle className="text-rovere mb-3" size={24} />
                  <h3 className="font-bold text-legno-bruciato mb-2">{b.title}</h3>
                  <p className="text-legno-bruciato/70 text-sm leading-relaxed">{b.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LA NOSTRA POSA */}
      <section className="bg-nero-marquina text-travertino py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-travertino mb-4">
              La Nostra Posa SPC
            </h2>
            <p className="text-travertino/70 text-lg mb-12 max-w-2xl">
              Un processo preciso, dalla preparazione del sottofondo fino ai dettagli perimetrali.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            {posazSteps.map((step) => (
              <FadeIn key={step.num}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                  <span className="text-5xl font-extrabold text-rovere/30 leading-none block mb-4">{step.num}</span>
                  <h3 className="text-xl font-bold text-travertino mb-3">{step.title}</h3>
                  <p className="text-travertino/70 leading-relaxed">{step.description}</p>
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
              Domande Frequenti su SPC e PVC
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
          { title: 'I Nostri Servizi', description: 'Tutti i servizi di parquetteria offerti da Arteparquet.', href: '/servizi' },
          { title: 'Parquet Massello', description: 'Il massello in legno puro: duraturo e levigabile più volte.', href: '/servizi/parquet-massello' },
          { title: 'Preventivo Gratuito', description: 'Sopralluogo gratuito e preventivo scritto senza impegno.', href: '/preventivo' },
          { title: 'Contattaci', description: 'Richiedi un sopralluogo gratuito e senza impegno.', href: '/contatti' },
        ]}
      />
    </>
  )
}
