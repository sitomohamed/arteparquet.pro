import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Calculator, Clock, TrendingUp } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Costo Levigatura Parquet 2026 | Prezzi, Fattori e Preventivo Gratuito',
  description: 'Quanto costa levigare il parquet? Scopri i fattori che influenzano il prezzo, i costi medi al mq e richiedi un preventivo gratuito personalizzato per Bergamo e Milano.',
  keywords: [
    'costo levigatura parquet',
    'prezzo levigatura parquet',
    'quanto costa levigare parquet',
    'levigatura parquet prezzo al mq',
    'preventivo levigatura parquet',
    'costo levigatura parquet Bergamo',
    'costo levigatura parquet Milano',
  ],
  alternates: { canonical: 'https://arteparquet.pro/costo-levigatura-parquet' },
  openGraph: {
    title: 'Costo Levigatura Parquet 2026 | Preventivo Gratuito',
    description: 'Scopri i costi reali della levigatura parquet e i fattori che influenzano il prezzo. Preventivo gratuito personalizzato.',
    url: 'https://arteparquet.pro/costo-levigatura-parquet',
    locale: 'it_IT',
    type: 'article',
  },
}

export default function CostoLevigaturaParquetPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-nero-marquina pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn direction="up">
            <span className="inline-block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere bg-rovere/10 border border-rovere/20 px-3 py-1 rounded-full mb-5">
              Guida 2026
            </span>
            <h1
              className="font-serif font-semibold text-white mb-5 text-balance"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
            >
              Costo Levigatura Parquet:<br />Prezzi, Fattori e Consigli
            </h1>
            <p className="font-sans text-white/65 max-w-2xl leading-relaxed mb-8"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Vuoi sapere quanto costa levigare il parquet? In questa guida ti spieghiamo
              i fattori che influenzano il prezzo, i costi medi e come ottenere un preventivo
              gratuito personalizzato.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all"
              >
                Preventivo Gratuito <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a
                href="tel:+393892407827"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 text-white font-sans text-[14px] font-medium hover:bg-white/10 transition-all"
              >
                <Phone size={15} aria-hidden="true" /> +39 389 240 7827
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-travertino py-20 md:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Intro */}
              <FadeIn>
                <div className="prose prose-lg max-w-none">
                  <p className="text-neutral-600 leading-relaxed text-lg">
                    Il costo della levigatura parquet dipende da diversi fattori: superficie, stato del pavimento,
                    tipo di finitura e complessità del lavoro. In questa guida ti aiutiamo a capire come si calcola
                    il prezzo e cosa aspettarti.
                  </p>
                </div>
              </FadeIn>

              {/* Fattori che influenzano il costo */}
              <FadeIn delay={0.1}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-rovere/10 flex items-center justify-center">
                      <Calculator size={20} className="text-rovere" />
                    </div>
                    <h2 className="font-serif font-semibold text-legno-bruciato text-2xl">
                      Fattori che Influenzano il Costo
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Superficie da levigare',
                        desc: 'Più grande è la superficie, più il costo al mq tende a diminuire. Per superfici oltre i 100 mq il prezzo unitario scende.',
                      },
                      {
                        title: 'Stato del parquet',
                        desc: 'Un parquet molto danneggiato richiede più passate di levigatura e più stuccatura, aumentando i tempi e il costo.',
                      },
                      {
                        title: 'Tipo di finitura',
                        desc: 'La verniciatura UV è la più comune. L\'olio naturale richiede più mani e tempi di asciugatura maggiori.',
                      },
                      {
                        title: 'Spessore residuo',
                        desc: 'Se il parquet è già stato levigato più volte, potrebbe richiedere un intervento più delicato.',
                      },
                      {
                        title: 'Accessibilità',
                        desc: 'Appartamenti ai piani alti senza ascensore o ambienti difficili da raggiungere influenzano il costo.',
                      },
                      {
                        title: 'Stuccatura',
                        desc: 'La stuccatura delle fessure è inclusa, ma parquet molto fessurati richiedono più materiale e tempo.',
                      },
                    ].map((factor) => (
                      <div key={factor.title} className="flex items-start gap-3 p-5 rounded-xl bg-white border border-neutral-100">
                        <CheckCircle size={18} className="text-rovere flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-sans font-semibold text-legno-bruciato text-[15px] mb-1">
                            {factor.title}
                          </h3>
                          <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">
                            {factor.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-rovere/10 flex items-center justify-center">
                      <TrendingUp size={20} className="text-rovere" />
                    </div>
                    <h2 className="font-serif font-semibold text-legno-bruciato text-2xl">
                      Perché il preventivo è personalizzato
                    </h2>
                  </div>
                  <div className="bg-white rounded-2xl p-8 border border-neutral-100">
                    <p className="font-sans text-sm text-neutral-500 mb-6">
                      Non pubblichiamo listini fissi: ogni parquet ha uno stato, uno spessore e un sottofondo diversi.
                      Il sopralluogo gratuito serve a darti un preventivo scritto, senza impegno.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-neutral-50">
                        <p className="font-sans text-sm font-medium text-legno-bruciato mb-1">
                          Levigatura e nuova finitura
                        </p>
                        <p className="font-sans text-sm text-neutral-600">
                          Valutiamo quante passate servono e quale olio, cera o vernice è più adatta.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-neutral-50">
                        <p className="font-sans text-sm font-medium text-legno-bruciato mb-1">
                          Stuccatura e ripristino
                        </p>
                        <p className="font-sans text-sm text-neutral-600">
                          Fessure, listelli danneggiati e bordi si valutano sul posto, non a distanza.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-neutral-50">
                        <p className="font-sans text-sm font-medium text-legno-bruciato mb-1">
                          Restauro di parquet esistenti
                        </p>
                        <p className="font-sans text-sm text-neutral-600">
                          Se il pavimento è antico o già levigato, verifichiamo lo spessore residuo prima di procedere.
                        </p>
                      </div>
                    </div>
                    <p className="font-sans text-xs text-neutral-400 mt-6">
                      Il preventivo arriva entro 24 ore dal sopralluogo. Nessun costo nascosto.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Processo */}
              <FadeIn delay={0.3}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-rovere/10 flex items-center justify-center">
                      <Clock size={20} className="text-rovere" />
                    </div>
                    <h2 className="font-serif font-semibold text-legno-bruciato text-2xl">
                      Come Funziona il Nostro Servizio
                    </h2>
                  </div>
                  <ol className="space-y-4">
                    {[
                      'Richiedi un sopralluogo gratuito compilando il form o chiamandoci',
                      'Veniamo da te, valutiamo il parquet e misuriamo la superficie',
                      'Entro 24 ore ricevi il preventivo dettagliato via email',
                      'Se accetti, concordiamo la data del lavoro',
                      'Levigatura professionale con macchine senza polvere',
                      'Consegna finale con garanzia scritta sulla manodopera',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white border border-neutral-100">
                        <div className="w-8 h-8 rounded-full bg-rovere flex items-center justify-center flex-shrink-0 text-white font-sans text-sm font-semibold">
                          {i + 1}
                        </div>
                        <p className="font-sans text-[15px] text-neutral-700 leading-relaxed pt-1">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeIn>

            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <FadeIn delay={0.15}>
                  <div className="bg-nero-marquina rounded-2xl p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
                    <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
                      Arteparquet dal 1996
                    </span>
                    <h3 className="font-serif font-semibold text-[1.5rem] mb-4 leading-snug">
                      Preventivo Gratuito<br />in 24 Ore
                    </h3>
                    <p className="font-sans text-[14px] text-white/60 leading-relaxed mb-8">
                      Sopralluogo senza impegno a Bergamo, Milano e in tutta la Lombardia.
                      Ti diciamo esattamente quanto costa per il tuo specifico caso.
                    </p>
                    <div className="space-y-3">
                      <Link
                        href="/contatti"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 transition-colors"
                      >
                        Richiedi preventivo <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                      <a
                        href="tel:+393892407827"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/15 text-white/80 font-sans text-[14px] hover:bg-white/5 transition-colors"
                      >
                        <Phone size={15} aria-hidden="true" /> +39 389 240 7827
                      </a>
                    </div>
                    <ul className="mt-6 space-y-2">
                      {['Sopralluogo gratuito', 'Preventivo entro 24h', 'Nessun costo nascosto', 'Garanzia scritta'].map((item) => (
                        <li key={item} className="flex items-center gap-2 font-sans text-[13px] text-white/50">
                          <span className="w-1 h-1 rounded-full bg-rovere flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                <FadeIn delay={0.25}>
                  <div className="mt-6 p-6 rounded-xl bg-white border border-neutral-100">
                    <h4 className="font-sans font-semibold text-legno-bruciato text-sm mb-4">
                      Servizi Correlati
                    </h4>
                    <div className="space-y-2">
                      <Link
                        href="/servizi/levigatura"
                        className="block text-sm text-neutral-600 hover:text-rovere transition-colors"
                      >
                        → Levigatura Parquet
                      </Link>
                      <Link
                        href="/servizi/restauro"
                        className="block text-sm text-neutral-600 hover:text-rovere transition-colors"
                      >
                        → Restauro Parquet Antico
                      </Link>
                      <Link
                        href="/servizi/riparazioni"
                        className="block text-sm text-neutral-600 hover:text-rovere transition-colors"
                      >
                        → Riparazioni Parquet
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
