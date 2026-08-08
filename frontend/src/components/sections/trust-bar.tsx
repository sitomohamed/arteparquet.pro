'use client'

import { Award, Building2, MapPin, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { CountUp } from '@/components/animations/count-up'

const STATS = [
  {
    icon: Award,
    type: 'number' as const,
    value: 30,
    suffix: '+',
    label: 'Anni di esperienza',
    description: 'Nel settore parquet dal 1996',
  },
  {
    icon: Building2,
    type: 'text' as const,
    text: 'Teatro alla Scala',
    label: 'Progetto di riferimento',
    description: 'Milano, 2004 — collaborazione in team',
  },
  {
    icon: MapPin,
    type: 'text' as const,
    text: 'Lombardia',
    label: 'Zona principale',
    description: 'Bergamo, Milano e province',
  },
  {
    icon: Star,
    type: 'rating' as const,
    label: 'Recensioni Google',
    description: 'Clienti soddisfatti',
  },
]

export function TrustBar() {
  return (
    <section
      className="bg-white border-b border-neutral-100"
      aria-label="Credenziali e numeri"
    >
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <FadeIn key={stat.label} delay={i * 0.1} direction="up">
                <motion.div
                  className="flex flex-col items-center text-center group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 w-12 h-12 rounded-xl bg-wood-100 flex items-center justify-center group-hover:bg-rovere transition-colors duration-300">
                    <Icon
                      size={22}
                      className="text-rovere group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    className="font-serif font-semibold text-legno-bruciato leading-tight mb-1"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                  >
                    {stat.type === 'number' && (
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    )}
                    {stat.type === 'text' && (
                      <span className="text-[1.15rem] md:text-[1.35rem]">{stat.text}</span>
                    )}
                    {stat.type === 'rating' && (
                      <span className="flex items-center justify-center gap-1">
                        <span>4,9</span>
                        <span className="text-[1rem] text-neutral-400 font-sans font-normal">/5</span>
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-[13px] font-semibold text-legno-bruciato mb-0.5">
                    {stat.label}
                  </p>
                  <p className="font-sans text-[12px] text-neutral-500">
                    {stat.description}
                  </p>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
