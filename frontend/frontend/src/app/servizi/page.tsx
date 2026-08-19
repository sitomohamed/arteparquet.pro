import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'
import { RelatedLinks } from '@/components/ui/related-links'

export const metadata: Metadata = {
  title: 'Servizi | Posa, Levigatura, Restauro, SPC, PVC, Laminato',
  description:
    'Tutti i servizi Arteparquet: posa parquet massello, prefinito, laminato, SPC, PVC, vinilico. Levigatura, restauro e riparazione parquet. Preventivo gratuito in tutta Italia.',
}

// ── Data ──────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'parquet',
    heading: 'Parquet',
    color: 'bg-wood-100',
    accent: 'text-wood-700',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=700&q=80',
    intro: 'Il legno nella sua forma più autentica. Dalla quercia al noce, dal rovere al frassino — ogni essenza racconta una storia unica per il tuo spazio.',
    types: [
      {
        title: 'Massello',
        href: '/servizi/parquet-massello',
        desc: 'Legno pieno al 100%, levigabile più volte nel corso della vita. Il più duraturo e pregiato. Adatto a chi cerca il meglio senza compromessi.',
        badge: 'Il più pregiato',
      },
      {
        title: 'Prefinito',
        href: '/servizi/parquet-prefinito',
        desc: 'Multistrato con strato nobile in legno vero, già finito in fabbrica. Pronto da calpestare in pochi giorni, stabile e versatile.',
        badge: 'Installazione rapida',
      },
      {
        title: 'Tradizionale',
        href: '/servizi/parquet-tradizionale',
        desc: 'Posa a listone classico, a spina di pesce o a Versailles. Schemi senza tempo che valorizzano qualsiasi ambiente con eleganza discreta.',
        badge: 'Design classico',
      },
      {
        title: 'Laminato',
        href: '/servizi/laminato',
        desc: 'Resistente, conveniente e dall\'aspetto del legno naturale. Ideale per ambienti ad alto traffico. Certificato AC4 e AC5.',
        badge: 'Alta resistenza',
      },
    ],
  },
  {
    id: 'moderni',
    heading: 'Pavimenti Moderni',
    color: 'bg-neutral-100',
    accent: 'text-neutral-700',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=700&q=80',
    intro: 'Le soluzioni di nuova generazione: impermeabili, silenziose, adatte al riscaldamento a pavimento. Estetica del legno, performance superiori.',
    types: [
      {
        title: 'SPC',
        href: '/servizi/spc',
        desc: 'Stone Polymer Composite: impermeabile al 100%, anti-graffio, adatto a bagni e cucine. Il futuro dei pavimenti in ambienti difficili.',
        badge: 'Impermeabile 100%',
      },
      {
        title: 'PVC',
        href: '/servizi/pvc',
        desc: 'Pavimento vinilico click: silenzioso, morbido sotto i piedi, facilissimo da installare su qualsiasi pavimento esistente.',
        badge: 'Comfort massimo',
      },
      {
        title: 'Vinilico',
        href: '/servizi/vinilico',
        desc: 'In lastre o listoni, il vinilico offre un\'estetica sofisticata con una manutenzione minima. Compatibile con tutti i sistemi di riscaldamento.',
        badge: 'Bassa manutenzione',
      },
    ],
  },
  {
    id: 'servizi',
    heading: 'Servizi',
    color: 'bg-wood-50',
    accent: 'text-wood-600',
    image: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=700&q=80',
    intro: 'Dal sopralluogo alla consegna finale, gestiamo ogni fase del tuo progetto con la stessa cura di chi ha lavorato al Teatro alla Scala di Milano.',
    types: [
      {
        title: 'Posa',
        href: '/servizi/posa',
        desc: 'Posa professionale di ogni tipo di pavimento. Incollato, flottante o chiodato — scegliamo la tecnica giusta per il tuo specifico caso.',
        badge: 'Dal 1996',
      },
      {
        title: 'Levigatura',
        href: '/servizi/levigatura',
        desc: 'Levigatura con macchine professionali a bassa emissione di polvere. Il tuo parquet torna liscio come seta e pronto per una nuova finitura.',
        badge: 'Senza polvere',
      },
      {
        title: 'Restauro',
        href: '/servizi/restauro',
        desc: 'Diamo nuova vita al parquet antico. Stuccatura, verniciatura, trattamento anti-UV e impermeabilizzante. Risultati che durano decenni.',
        badge: 'Parquet storico',
      },
      {
        title: 'Riparazioni',
        href: '/servizi/riparazioni',
        desc: 'Interventi puntuali su listelli rotti, scricchiolii, rigonfiamenti e danni localizzati. Rapidità senza compromettere la qualità.',
        badge: 'Intervento rapido',
      },
    ],
  },
]

// ── Full checklist ────────────────────────────────────────────────────────
const CHECKLIST = [
  { group: 'Posa', items: ['Posa parquet nuovo', 'Posa SPC e PVC', 'Posa laminato'] },
  { group: 'Levigatura & Finitura', items: ['Levigatura parquet', 'Lucidatura parquet', 'Verniciatura parquet'] },
  { group: 'Restauro & Riparazione', items: ['Restauro parquet antico', 'Riparazione parquet danneggiato'] },
  { group: 'Extra', items: ['Installazione battiscopa', 'Sopralluogo e preventivo gratuito', 'Consulenza scelta materiali'] },
]

// ── Page ──────────────────────────────────────────────────────────────────
export default function ServiziPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-nero-marquina pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              Servizi
            </span>
            <h1
              className="font-serif font-semibold text-white mb-5 text-balance"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              L'arte della posa,<br />in ogni sua forma.
            </h1>
            <p className="font-sans text-white/65 max-w-xl leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Dal parquet massello alle moderne soluzioni SPC, dalla levigatura al restauro:
              ogni progetto riceve la stessa cura totale.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      {CATEGORIES.map((cat, catIdx) => (
        <section key={cat.id} className={catIdx % 2 === 0 ? 'bg-travertino' : 'bg-white'}>
          <div className="container-wide py-20 md:py-28">

            {/* Section header */}
            <FadeIn direction="up" className="mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div className="flex-1">
                  <span className={`inline-block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 ${cat.accent}`}>
                    {cat.heading}
                  </span>
                  <p className="font-sans text-[15px] text-neutral-600 leading-relaxed max-w-2xl">
                    {cat.intro}
                  </p>
                </div>
                <Link
                  href="/contatti"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 transition-colors"
                >
                  Preventivo gratuito <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </FadeIn>

            {/* Type cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cat.types.map((type, i) => (
                <FadeIn key={type.title} delay={i * 0.08} direction="up">
                  <div className="group bg-white rounded-2xl border border-neutral-100 hover:border-wood-200 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1.5 h-full flex flex-col overflow-hidden">
                    {/* Badge */}
                    <div className="px-5 pt-5">
                      <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-wider text-rovere bg-wood-50 ring-1 ring-wood-100 px-2.5 py-1 rounded-full mb-3">
                        {type.badge}
                      </span>
                      <h2 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-2">
                        <Link href={type.href} className="hover:text-rovere transition-colors">
                          {type.title}
                        </Link>
                      </h2>
                      <p className="font-sans text-[13px] text-neutral-500 leading-[1.7] flex-1 pb-5">
                        {type.desc}
                      </p>
                    </div>
                    {/* Footer link */}
                    <div className="mt-auto px-5 py-4 border-t border-neutral-50">
                      <Link
                        href={type.href}
                        className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-rovere hover:text-wood-600 transition-colors group/link"
                        aria-label={`Scopri ${type.title}`}
                      >
                        Scopri il servizio
                        <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Full Checklist */}
      <section className="bg-nero-marquina" aria-labelledby="checklist-heading">
        <div className="container-wide py-20 md:py-28">
          <FadeIn direction="up" className="text-center mb-14">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
              Tutto incluso
            </span>
            <h2
              id="checklist-heading"
              className="font-serif font-semibold text-white text-balance"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Cosa facciamo per te.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {CHECKLIST.map((group, gi) => (
              <FadeIn key={group.group} delay={gi * 0.1} direction="up">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-full">
                  <h3 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-rovere mb-4 pb-3 border-b border-white/10">
                    {group.group}
                  </h3>
                  <ul className="space-y-3" role="list">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle
                          size={16}
                          className="text-rovere flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="font-sans text-[14px] text-white/80 leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={0.3} className="text-center mt-14">
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-rovere text-white font-sans text-[15px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all duration-200"
            >
              Sopralluogo e preventivo gratuiti
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Related Zone Links */}
      <RelatedLinks
        title="Dove Operiamo"
        links={[
          {
            title: 'Parquet Bergamo',
            href: '/zone/parquet-bergamo',
            description: 'Posa e restauro parquet a Bergamo e provincia. Sede operativa in città. Sopralluogo gratuito.',
          },
          {
            title: 'Parquet Milano',
            href: '/zone/parquet-milano',
            description: 'Servizi parquet a Milano e hinterland. Ex team Teatro alla Scala. Preventivo entro 24h.',
          },
          {
            title: 'Parquet Brescia',
            href: '/zone/parquet-brescia',
            description: 'Posa, levigatura e restauro parquet a Brescia e provincia. 30 anni di esperienza.',
          },
          {
            title: 'Parquet Monza',
            href: '/zone/parquet-monza',
            description: 'Servizi parquet professionale a Monza e Brianza. Garanzia scritta sulla posa.',
          },
        ]}
        columns={4}
      />

      <CtaSection />
    </>
  )
}
