'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    id: 'q1',
    question: 'Quale parquet è più adatto alla mia casa?',
    answer:
      'Dipende dall\'utilizzo, dall\'umidità dell\'ambiente e dal tuo gusto estetico. Il massello è il più duraturo e pregiato, ideale per chi cerca il meglio e vuole un pavimento che duri tutta la vita. Il prefinito è più stabile e si installa rapidamente. Per cucine, bagni o ambienti umidi, SPC o PVC sono impermeabili al 100%. Durante il sopralluogo gratuito valutiamo insieme la soluzione perfetta per il tuo spazio.',
  },
  {
    id: 'q2',
    question: 'Quanto tempo richiede la posa del parquet?',
    answer:
      'Per un appartamento medio (80–120 mq), la posa richiede generalmente 2–4 giorni lavorativi. Il parquet massello con incollaggio richiede poi 24–48 ore di asciugatura prima del calpestio. Per interventi più grandi o complessi, forniamo una pianificazione dettagliata durante il sopralluogo.',
  },
  {
    id: 'q3',
    question: 'Ogni quanto si leviga il parquet?',
    answer:
      'In media ogni 10–15 anni per ambienti residenziali normali. Prima se il pavimento ha molto traffico, animali domestici o graffi profondi. Il parquet massello si può levigare 4–6 volte nel corso della vita, quindi non aver paura di farlo quando è necessario: è la manutenzione più importante che puoi fare per il tuo pavimento.',
  },
  {
    id: 'q4',
    question: 'Che garanzia offrite sulla posa?',
    answer:
      'Offriamo garanzia scritta sulla manodopera della posa. In caso di difetti imputabili alla nostra esecuzione, interveniamo gratuitamente. Per i materiali, la garanzia segue quella del produttore (generalmente 5–25 anni a seconda del prodotto). Utilizziamo solo materiali di prima scelta da fornitori certificati.',
  },
  {
    id: 'q5',
    question: 'Operate anche fuori dalla Lombardia?',
    answer:
      'Sì, siamo basati a Bergamo ma operiamo in tutta Italia. Molti dei nostri progetti si trovano a Milano, Como, Brescia, Monza, Lecco e nelle province lombarde. Per cantieri fuori regione, contattaci per un preventivo che includa eventuali costi di trasferta.',
  },
  {
    id: 'q6',
    question: 'Come funziona il sopralluogo gratuito?',
    answer:
      'Basta contattarci via telefono, WhatsApp o compilando il form. Concordiamo giorno e ora più comodi per te, veniamo a casa tua, misuriamo lo spazio e ascoltiamo le tue esigenze. Entro 24 ore dal sopralluogo ricevi il preventivo dettagliato. Tutto completamente gratuito e senza alcun impegno.',
  },
  {
    id: 'q7',
    question: 'Il parquet si può installare sul riscaldamento a pavimento?',
    answer:
      'Sì, ma dipende dal tipo di parquet e dal sistema di riscaldamento. Il prefinito multistrato è in genere la scelta più indicata per il riscaldamento a pavimento. Il massello richiede un sistema a bassa temperatura (max 29°C in superficie). Lo SPC è compatibile fino a 28°C. Verifichiamo sempre la compatibilità durante il sopralluogo gratuito.',
  },
  {
    id: 'q8',
    question: 'Parquet massello o prefinito: quale scegliere?',
    answer:
      'Il massello dura tutta la vita (50–100 anni), si leviga 4–6 volte, aumenta il valore dell\'immobile. Il prefinito è più stabile agli sbalzi di umidità, si installa più velocemente e costa meno. Se hai un budget flessibile e vuoi il massimo, scegli il massello. Se vuoi un ottimo risultato con un approccio più pratico, il prefinito è una scelta eccellente.',
  },
]

interface FaqItemProps {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FaqItem({ id, question, answer, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <FadeIn delay={index * 0.07} direction="up">
      <div className={cn(
        'border rounded-xl overflow-hidden transition-all duration-200',
        isOpen ? 'border-rovere/40 bg-white shadow-sm' : 'border-neutral-200 bg-white hover:border-neutral-300'
      )}>
        <button
          id={`faq-btn-${id}`}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${id}`}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rovere focus-visible:ring-inset"
        >
          <span className="font-sans text-[15px] md:text-[16px] font-semibold text-legno-bruciato leading-snug">
            {question}
          </span>
          <span
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
              isOpen ? 'bg-rovere text-white' : 'bg-neutral-100 text-neutral-600'
            )}
            aria-hidden="true"
          >
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-panel-${id}`}
              role="region"
              aria-labelledby={`faq-btn-${id}`}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="h-px bg-neutral-100 mb-5" aria-hidden="true" />
                <p className="font-sans text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('q1')

  return (
    <section className="bg-travertino" aria-labelledby="faq-heading">
      <div className="container-wide py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left — header */}
          <FadeIn direction="left" className="lg:col-span-1">
            <div className="lg:sticky lg:top-32">
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
                FAQ
              </span>
              <h2
                id="faq-heading"
                className="font-serif font-semibold text-legno-bruciato mb-5 text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                Domande Frequenti
              </h2>
              <p className="font-sans text-[15px] text-neutral-500 leading-relaxed mb-8">
                Hai altre domande? Siamo a tua disposizione via telefono, WhatsApp o email.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-rovere hover:text-wood-600 transition-colors group"
                aria-label="Vedi tutte le domande frequenti"
              >
                Vedi tutte le FAQ
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeIn>

          {/* Right — accordion */}
          <div className="lg:col-span-2 space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.id}
                {...faq}
                index={i}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
