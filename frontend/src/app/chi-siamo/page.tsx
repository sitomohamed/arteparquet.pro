import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, Heart, Shield, Zap } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: "L'Atelier | Chi Siamo — Ex Team Teatro alla Scala",
  description:
    'La storia di Arteparquet: dal Teatro alla Scala di Milano al tuo pavimento. 20+ anni di eccellenza nella posa e restauro parquet in Italia.',
}

const VALUES = [
  { icon: Award, title: 'Eccellenza', description: 'Solo il meglio, sempre. Ogni progetto riceve la stessa cura del Teatro alla Scala.' },
  { icon: Shield, title: 'Trasparenza', description: 'Preventivi chiari e dettagliati. Nessuna sorpresa in corso d\'opera. Mai.' },
  { icon: Heart, title: 'Passione', description: 'Amiamo il legno. È artigianato, non mestiere. Si sente in ogni listello posato.' },
  { icon: Zap, title: 'Rispetto', description: 'Per il legno, per lo spazio, per te. Pulizia totale del cantiere garantita.' },
]

export default function ChiSiamoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-nero-marquina overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=1400&q=60)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nero-marquina to-nero-marquina/80" aria-hidden="true" />
        <div className="relative z-10 container-wide">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              L'Atelier
            </span>
            <h1
              className="font-serif font-semibold text-white mb-5 text-balance"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
            >
              L'Arte del Legno.
            </h1>
            <p className="font-sans text-white/65 max-w-xl leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
            >
              Dal palcoscenico del Teatro alla Scala di Milano alla tua casa.
              Maestri posatori con oltre 30 anni di storia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* La Scala story */}
      <section className="bg-travertino">
        <div className="container-wide py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-5">
                La Nostra Storia
              </span>
              <h2 className="font-serif font-semibold text-legno-bruciato mb-6 text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              >
                Nel 1996, Teatro alla Scala di Milano.
              </h2>
              <div className="space-y-5 mb-8">
                <p className="font-sans text-[16px] text-neutral-600 leading-relaxed">
                  Arabi Mohamed viene selezionato per il team incaricato della{' '}
                  <strong className="text-legno-bruciato">posa, del restauro e della manutenzione
                  del parquet nel tempio mondiale dell'opera</strong> — il Teatro alla Scala di Milano.
                </p>
                <p className="font-sans text-[16px] text-neutral-600 leading-relaxed">
                  In quei corridoi storici, tra legni antichi e palchi dorati, si affina una filosofia:
                  il legno non si posa. Si <em>interpreta</em>. Ogni essenza ha la sua voce, ogni spazio
                  la sua acustica visiva.
                </p>
                <p className="font-sans text-[16px] text-neutral-600 leading-relaxed">
                  Quella stessa dedizione maniacale all'eccellenza, quella stessa cura per ogni dettaglio
                  invisibile, oggi è al servizio del tuo progetto — villa privata, hotel boutique o
                  semplice appartamento che vuoi rendere straordinario.
                </p>
              </div>
              <blockquote className="pl-5 border-l-2 border-rovere">
                <p className="font-serif italic text-[18px] text-legno-bruciato leading-relaxed mb-2">
                  "Ogni listello di legno racconta una storia. Il nostro compito è orchestrare queste
                  storie in una sinfonia perfetta sotto i tuoi piedi."
                </p>
                <footer className="font-sans text-[13px] text-neutral-500">— Arabi Mohamed, Fondatore</footer>
              </blockquote>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="space-y-4">
                {/* Credential card */}
                <div className="rounded-2xl bg-nero-marquina p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-rovere/20 border border-rovere/40 flex items-center justify-center">
                      <span className="font-serif font-bold text-rovere text-xl">A</span>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-white">Arabi Mohamed</p>
                      <p className="font-sans text-[12px] text-white/50">Maestro Posatore • Fondatore</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { year: '1996', event: 'Teatro alla Scala, Milano', detail: 'Posa, restauro e manutenzione del parquet storico' },
                      { year: '2026', event: '10.000+ Progetti Realizzati', detail: 'Ville, hotel, appartamenti, ristoranti' },
                    ].map((item) => (
                      <div key={item.event} className="flex gap-4">
                        <span className="font-sans text-[12px] font-semibold text-rovere w-10 flex-shrink-0 mt-0.5">{item.year}</span>
                        <div>
                          <p className="font-sans text-[14px] font-medium text-white">{item.event}</p>
                          <p className="font-sans text-[12px] text-white/50">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: '20+', label: 'Anni' },
                    { value: '10.000+', label: 'Progetti' },
                    { value: '98%', label: 'Soddisfatti' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-white border border-neutral-200 p-4 text-center">
                      <p className="font-serif font-semibold text-rovere text-[1.5rem]">{s.value}</p>
                      <p className="font-sans text-[11px] text-neutral-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white">
        <div className="container-wide py-24 md:py-28">
          <FadeIn direction="up" className="text-center mb-14">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">I Nostri Valori</span>
            <h2 className="font-serif font-semibold text-legno-bruciato" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              Ciò in cui crediamo.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <FadeIn key={v.title} delay={i * 0.1} direction="up">
                  <div className="p-6 rounded-2xl border border-neutral-100 hover:border-wood-300 hover:shadow-md transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wood-100 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-rovere" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif font-semibold text-legno-bruciato text-[1.125rem] mb-2">{v.title}</h3>
                    <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">{v.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  )
}
