'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, MapPin, Wrench, Shield, Clock, Star } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

const PHONE_CLEAN = '+393892407827'
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/Arteparquet+Bergamo'

const REASONS = [
  {
    icon: CheckCircle,
    title: '30 anni di esperienza reale',
    body: 'Mohamed Arabi lavora il parquet dal 1996. Non esperienza generica: decenni trascorsi a posare, levigare e restaurare pavimenti in legno in Lombardia e oltre.',
  },
  {
    icon: MapPin,
    title: 'Sede a Bergamo, operativi in Lombardia',
    body: 'Via Vittorio Alfieri 7, Bergamo. Raggiungiamo Milano, Brescia, Como, Monza e tutta la regione. Sopralluogo gratuito, senza rimborso spese.',
  },
  {
    icon: Wrench,
    title: 'Solo lavori che sappiamo fare bene',
    body: 'Non prendiamo cantieri fuori dalla nostra competenza. Se il tuo caso richiede qualcosa che non gestiamo, ti lo diciamo chiaramente.',
  },
  {
    icon: Shield,
    title: 'Garanzia scritta sulla manodopera',
    body: 'Ogni posa è coperta da garanzia scritta. Se si riscontrano difetti imputabili alla nostra esecuzione, interveniamo gratuitamente.',
  },
  {
    icon: Clock,
    title: 'Risposta in 5 minuti su WhatsApp',
    body: 'Invia le foto del tuo parquet: ricevi una prima valutazione gratuita senza aspettare giorni. Il cantiere viene concordato in tempi brevi.',
  },
  {
    icon: Star,
    title: 'Recensioni Google reali e verificabili',
    body: (
      <>
        I nostri clienti lasciano recensioni su Google. Puoi leggerle liberamente —{' '}
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rovere underline hover:text-wood-600 transition-colors"
          aria-label="Vedi le recensioni di Arteparquet su Google Maps"
        >
          cerca Arteparquet su Google Maps
        </a>
        .
      </>
    ),
  },
]

export function WhyUsSection() {
  return (
    <section
      className="bg-travertino border-t border-neutral-100 relative overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,155,123,0.04),transparent_50%)]" aria-hidden="true" />
      
      <div className="relative container-wide py-28 md:py-36">

        {/* Premium header */}
        <FadeIn direction="up" className="text-center mb-18 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-rovere mb-5"
          >
            Perché scegliere Arteparquet
          </motion.span>
          <h2
            id="why-us-heading"
            className="font-serif font-semibold text-legno-bruciato text-balance"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Motivi concreti, non promesse.
          </h2>
          <p className="font-sans text-neutral-500 mt-5 max-w-2xl mx-auto text-[16px] leading-[1.7]">
            Queste non sono slogan: sono fatti verificabili che puoi controllare prima di chiamarci.
          </p>
        </FadeIn>

        {/* Premium grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
          {REASONS.map(({ icon: Icon, title, body }, i) => (
            <FadeIn key={title} direction="up" delay={i * 0.09}>
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl border border-neutral-100 p-8 h-full flex flex-col gap-5 hover:border-rovere/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)] transition-all duration-500 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-[16px] bg-wood-50 ring-[1.5px] ring-wood-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rovere group-hover:ring-rovere/30 transition-all duration-400"
                >
                  <Icon size={19} className="text-rovere group-hover:text-white transition-colors duration-400" strokeWidth={1.8} aria-hidden="true" />
                </motion.div>
                <div>
                  <h3 className="font-sans font-semibold text-legno-bruciato text-[15.5px] mb-3 leading-snug group-hover:text-rovere transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="font-sans text-[14px] text-neutral-500 leading-[1.75]">
                    {body}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Premium CTA footer */}
        <FadeIn direction="up" delay={0.4} className="text-center mt-18">
          <p className="font-sans text-[16px] text-neutral-600 mb-7">
            Hai ancora dubbi? Scrivici, senza impegno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent('Ciao! Vorrei informazioni sui vostri servizi di parquet.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-sans text-[15px] font-semibold hover:bg-[#20b858] hover:shadow-[0_12px_32px_rgba(37,211,102,0.35)] active:scale-[0.97] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Scrivici su WhatsApp</span>
            </a>
            <Link
              href="/chi-siamo"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border-[1.5px] border-neutral-300 text-legno-bruciato font-sans text-[15px] font-medium hover:border-rovere hover:text-rovere hover:bg-wood-50/30 active:scale-[0.97] transition-all duration-300"
            >
              <span>La nostra storia</span>
            </Link>
          </div>
        </FadeIn>

        {/* NAP — Local SEO */}
        <address className="not-italic mt-16 pt-12 border-t border-neutral-200 text-center font-sans text-[12.5px] text-neutral-400 leading-relaxed">
          <strong className="text-neutral-600">Arteparquet</strong> — Via Vittorio Alfieri 7, 24100 Bergamo BG —{' '}
          <a href={`tel:${PHONE_CLEAN}`} className="hover:text-rovere transition-colors duration-200">
            +39 389 240 7827
          </a>{' '}
          —{' '}
          <a href="mailto:info@arteparquet.pro" className="hover:text-rovere transition-colors duration-200">
            info@arteparquet.pro
          </a>
        </address>
      </div>
    </section>
  )
}
