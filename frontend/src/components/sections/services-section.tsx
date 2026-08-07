import Link from 'next/link'
import { Hammer, Sparkles, Layers, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    icon: Hammer,
    title: 'Posa Parquet',
    description:
      'Il pavimento perfetto, posato con precisione millimetrica. Dal massello tradizionale al prefinito: ogni essenza, ogni schema, ogni sogno.',
    href: '/servizi/posa-parquet',
    features: ['Parquet massello', 'Parquet prefinito', 'Scale in legno', 'Battiscopa'],
    accent: 'from-wood-100 to-wood-200',
  },
  {
    icon: Sparkles,
    title: 'Restauro & Levigatura',
    description:
      'Il tuo parquet antico merita le mani giuste. Tecniche professionali che restituiscono vita, colore e lucentezza al legno di una volta.',
    href: '/servizi/restauro-levigatura',
    features: ['Levigatura senza polvere', 'Verniciatura', 'Riparazione listelli', 'Trattamenti'],
    accent: 'from-neutral-50 to-wood-100',
  },
  {
    icon: Layers,
    title: 'SPC, PVC & Laminati',
    description:
      'Un pavimento pronto da vivere in pochi giorni. Soluzioni moderne, resistenti all\'acqua e all\'usura, con l\'estetica del legno naturale.',
    href: '/servizi/spc-pvc-laminati',
    features: ['SPC impermeabile', 'PVC click', 'Laminato premium', 'Pavimenti flottanti'],
    accent: 'from-wood-100 to-neutral-50',
  },
]

interface ServiceCardProps {
  icon: typeof Hammer
  title: string
  description: string
  href: string
  features: string[]
  accent: string
  index: number
}

function ServiceCard({ icon: Icon, title, description, href, features, accent, index }: ServiceCardProps) {
  return (
    <FadeIn delay={index * 0.12} direction="up">
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-wood-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Card top accent */}
        <div className={cn('h-1.5 w-full bg-gradient-to-r', accent)} />

        <div className="p-8 flex flex-col flex-1">
          {/* Icon */}
          <div className="mb-6 w-14 h-14 rounded-xl bg-wood-100 flex items-center justify-center group-hover:bg-rovere transition-colors duration-300">
            <Icon
              size={26}
              className="text-rovere group-hover:text-white transition-colors duration-300"
              aria-hidden="true"
            />
          </div>

          {/* Title */}
          <h3 className="font-serif font-semibold text-legno-bruciato mb-3"
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="font-sans text-[15px] text-neutral-600 leading-relaxed mb-6 flex-1">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8" role="list">
            {features.map((feat) => (
              <li key={feat} className="flex items-center gap-2 font-sans text-[13px] text-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rovere flex-shrink-0" aria-hidden="true" />
                {feat}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={href}
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-rovere hover:text-wood-600 transition-colors group/link"
            aria-label={`Scopri di più sul servizio ${title}`}
          >
            Scopri di più
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </FadeIn>
  )
}

export function ServicesSection() {
  return (
    <section
      className="bg-travertino"
      aria-labelledby="services-heading"
    >
      <div className="container-wide py-24 md:py-32">
        {/* Section header */}
        <FadeIn direction="up" className="text-center mb-16 md:mb-20">
          <span className="inline-block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
            I Nostri Servizi
          </span>
          <h2
            id="services-heading"
            className="font-serif font-semibold text-legno-bruciato mb-5 text-balance"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Non posiamo semplicemente pavimenti.
            <br className="hidden md:block" />
            <em className="not-italic text-rovere">Creiamo le fondamenta del tuo stile di vita.</em>
          </h2>
          <p className="font-sans text-[16px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Dal parquet massello tradizionale alle moderne soluzioni SPC e PVC,
            ogni progetto riceve la stessa cura totale.
          </p>
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.4} className="text-center mt-14">
          <Link
            href="/servizi"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-legno-bruciato text-legno-bruciato font-sans text-[14px] font-semibold hover:bg-legno-bruciato hover:text-white active:scale-[0.98] transition-all duration-200"
          >
            Tutti i servizi
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
