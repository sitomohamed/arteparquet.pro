import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

export function ScalaStory() {
  return (
    <section
      className="bg-nero-marquina relative overflow-hidden"
      aria-labelledby="scala-heading"
    >
      {/* Decorative background texture */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1536437075651-01d675529a7a?w=1200&q=60)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-nero-marquina via-nero-marquina/95 to-nero-marquina/60" aria-hidden="true" />

      <div className="relative z-10 container-wide py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <FadeIn direction="left">
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-6">
                La Nostra Storia
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <h2
                id="scala-heading"
                className="font-serif font-semibold text-white leading-[1.08] mb-8 text-balance"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Dal palcoscenico<br />
                <em className="not-italic text-rovere">della Scala.</em>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-5 mb-10">
                <p className="font-sans text-[16px] text-white/75 leading-relaxed">
                  Nel 2004, Arabi Mohamed venne selezionato per il team incaricato
                  della <strong className="text-white font-semibold">posa, del restauro e della manutenzione
                  del parquet nel Teatro alla Scala di Milano</strong> — il tempio mondiale
                  dell'opera e dell'eccellenza italiana.
                </p>
                <p className="font-sans text-[16px] text-white/75 leading-relaxed">
                  Quella stessa dedizione maniacale all'eccellenza, quella stessa
                  cura per ogni dettaglio invisibile, oggi è al servizio del tuo progetto.
                </p>
              </div>
            </FadeIn>

            {/* Quote */}
            <FadeIn direction="left" delay={0.3}>
              <blockquote className="relative pl-6 border-l-2 border-rovere mb-10">
                <Quote
                  size={20}
                  className="absolute -top-2 -left-2 text-rovere"
                  aria-hidden="true"
                />
                <p className="font-serif italic text-[18px] text-white/90 leading-relaxed">
                  "Ogni listello di legno racconta una storia. Il nostro compito
                  è orchestrare queste storie in una sinfonia perfetta sotto i tuoi piedi."
                </p>
                <footer className="mt-3 font-sans text-[13px] text-white/50">
                  — Arabi Mohamed, Fondatore
                </footer>
              </blockquote>
            </FadeIn>

            <FadeIn direction="left" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/chi-siamo"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all duration-200"
                >
                  Scopri la nostra storia
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 text-white font-sans text-[14px] font-medium hover:border-white/50 hover:bg-white/5 transition-all duration-200"
                >
                  Richiedi Consulenza
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right — credentials */}
          <FadeIn direction="right" delay={0.2}>
            <div className="grid grid-cols-1 gap-4">
              {/* Main credential card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rovere/20 border border-rovere/40 flex items-center justify-center">
                    <span className="font-serif font-bold text-rovere text-xl">A</span>
                  </div>
                  <div>
                    <p className="font-sans text-[13px] font-semibold text-white">Arabi Mohamed</p>
                    <p className="font-sans text-[12px] text-white/50">Maestro Posatore • Fondatore</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { year: '2004', event: 'Teatro alla Scala, Milano', detail: 'Posa, restauro e manutenzione parquet' },
                    { year: '2026', event: '10.000+ progetti completati', detail: 'Ville, hotel, ristoranti, residenze' },
                  ].map((item) => (
                    <div key={item.year} className="flex gap-4 items-start">
                      <span className="font-sans text-[12px] font-semibold text-rovere w-12 flex-shrink-0 mt-0.5">
                        {item.year}
                      </span>
                      <div>
                        <p className="font-sans text-[14px] font-medium text-white">{item.event}</p>
                        <p className="font-sans text-[12px] text-white/50">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust signals row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '20+', label: 'Anni' },
                  { value: '10.000+', label: 'Progetti' },
                  { value: '98%', label: 'Soddisfatti' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
                  >
                    <p className="font-serif font-semibold text-rovere text-[1.5rem]">{s.value}</p>
                    <p className="font-sans text-[11px] text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
