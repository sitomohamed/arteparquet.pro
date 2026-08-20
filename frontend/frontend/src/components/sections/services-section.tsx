'use client'

import { motion } from 'framer-motion'
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
    href: '/servizi/posa',
    features: ['Parquet massello', 'Parquet prefinito', 'Scale in legno', 'Battiscopa'],
    accent: 'from-wood-100 to-wood-200',
  },
  {
    icon: Sparkles,
    title: 'Restauro & Levigatura',
    description:
      'Il tuo parquet antico merita le mani giuste. Tecniche professionali che restituiscono vita, colore e lucentezza al legno di una volta.',
    href: '/servizi/restauro',
    features: ['Levigatura senza polvere', 'Verniciatura', 'Riparazione listelli', 'Trattamenti'],
    accent: 'from-neutral-50 to-wood-100',
  },
  {
    icon: Layers,
    title: 'SPC, PVC & Laminati',
    description:
      'Un pavimento pronto da vivere in pochi giorni. Soluzioni moderne, resistenti all\'acqua e all\'usura, con l\'estetica del legno naturale.',
    href: '/servizi/spc',
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
    <FadeIn delay={index * 0.14} direction="up">
      <div className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-wood-200 hover:shadow-[0_24px_64px_rgba(0,0,0,0.11)] transition-all duration-600 hover:-translate-y-2 h-full flex flex-col">
        {/* Premium card top accent con gradient animation */}
        <div className={cn('h-[3px] w-full bg-gradient-to-r transition-all duration-600', accent)} />

        <div className="p-9 flex flex-col flex-1">
          {/* Premium icon container */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 w-16 h-16 rounded-[18px] bg-wood-50 ring-[1.5px] ring-wood-200/60 flex items-center justify-center group-hover:bg-rovere group-hover:ring-rovere/30 group-hover:shadow-[0_8px_24px_rgba(200,155,123,0.25)] transition-all duration-500"
          >
            <Icon
              size={26}
              className="text-rovere group-hover:text-white transition-colors duration-500"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </motion.div>

          {/* Premium title */}
          <h3 className="font-serif font-semibold text-legno-bruciato mb-4 group-hover:text-rovere transition-colors duration-400"
            style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.625rem)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h3>

          {/* Enhanced description */}
          <p className="font-sans text-[15.5px] text-neutral-600 leading-[1.7] mb-7 flex-1">
            {description}
          </p>

          {/* Premium features list */}
          <ul className="space-y-2.5 mb-9" role="list">
            {features.map((feat, i) => (
              <motion.li
                key={feat}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + i * 0.05 }}
                className="flex items-center gap-2.5 font-sans text-[13.5px] text-neutral-700"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-rovere flex-shrink-0 group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
                <span>{feat}</span>
              </motion.li>
            ))}
          </ul>

          {/* Premium CTA link */}
          <Link
            href={href}
            className="inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-rovere hover:text-wood-600 transition-colors duration-300 group/link"
            aria-label={`Scopri di più sul servizio ${title}`}
          >
            <span className="relative">
              Scopri di più
              <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-rovere origin-left scale-x-100 group-hover/link:scale-x-0 transition-transform duration-300" />
            </span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/link:translate-x-2"
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
      className="bg-travertino relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,155,123,0.04),transparent_50%)]" aria-hidden="true" />
      
      <div className="relative container-wide py-28 md:py-36">
        {/* Premium section header */}
        <FadeIn direction="up" className="text-center mb-20 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-rovere mb-5"
          >
            I Nostri Servizi
          </motion.span>
          <h2
            id="services-heading"
            className="font-serif font-semibold text-legno-bruciato mb-6 text-balance"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', letterSpacing: '-0.025em' }}
          >
            Non posiamo semplicemente pavimenti.
            <br className="hidden md:block" />
            <em className="not-italic text-rovere">Creiamo le fondamenta del tuo stile di vita.</em>
          </h2>
          <p className="font-sans text-[17px] text-neutral-500 max-w-2xl mx-auto leading-[1.7]">
            Dal parquet massello tradizionale alle moderne soluzioni SPC e PVC,
            ogni progetto riceve la stessa cura totale.
          </p>
        </FadeIn>

        {/* Premium cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* Premium bottom CTA */}
        <FadeIn direction="up" delay={0.5} className="text-center mt-16">
          <Link
            href="/servizi"
            className="group relative inline-flex items-center gap-2.5 px-10 py-4.5 rounded-xl border-[2px] border-legno-bruciato text-legno-bruciato font-sans text-[15px] font-semibold hover:bg-legno-bruciato hover:text-white hover:shadow-[0_12px_32px_rgba(26,26,26,0.2)] active:scale-[0.97] transition-all duration-400 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <span className="relative z-10">Tutti i servizi</span>
            <ArrowRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
