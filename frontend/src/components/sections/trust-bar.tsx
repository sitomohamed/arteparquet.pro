'use client'

import { Award, Building2, MapPin, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { CountUp } from '@/components/animations/count-up'

const STATS = [
  {
    icon: Award,
    value: 20,
    suffix: '+',
    label: 'Anni di esperienza',
    description: 'Dal 2004 al tuo servizio',
    isNumber: true,
  },
  {
    icon: Building2,
    value: null,
    suffix: '',
    label: 'Teatro alla Scala',
    description: 'Milano, 2004',
    isNumber: false,
    text: 'Teatro alla Scala',
  },
  {
    icon: MapPin,
    value: null,
    suffix: '',
    label: 'Tutta Italia',
    description: 'Nord, Centro e Sud',
    isNumber: false,
    text: 'Tutta Italia',
  },
  {
    icon: Star,
    value: 49,
    suffix: '/5',
    label: 'Recensioni Google',
    description: '100+ clienti soddisfatti',
    isNumber: true,
    decimal: true,
  },
]

export function TrustBar() {
  return (
    <section
      className="bg-white border-b border-neutral-100"
      aria-label="Numeri e credenziali"
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

                  <div className="font-serif font-semibold text-legno-bruciato leading-tight mb-1"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                  >
                    {stat.isNumber ? (
                      stat.decimal ? (
                        <span>
                          <CountUp value={stat.value!} /> /5
                        </span>
                      ) : (
                        <CountUp value={stat.value!} suffix={stat.suffix} />
                      )
                    ) : (
                      <span className="text-[1.25rem] md:text-[1.5rem]">{stat.text}</span>
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
