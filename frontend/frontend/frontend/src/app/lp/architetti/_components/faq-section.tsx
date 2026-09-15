'use client'

import { useRef, useEffect, useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ SECTION — Accordion with refined styling
═══════════════════════════════════════════════════════════════════════════ */

const faqs = [
  {
    q: 'Fate campionature per le presentazioni ai clienti?',
    a: 'Sì. Forniamo campioni di essenze e finiture. Contattateci per concordare quali materiali mostrare prima di decidere.',
  },
  {
    q: 'Lavorate con architetti e studi professionali?',
    a: 'Sì, è il nostro focus principale. Collaboriamo regolarmente con studi di architettura, interior designer e imprese edili. Forniamo preventivi tecnici dettagliati e tutta la documentazione necessaria.',
  },
  {
    q: 'Gestite schemi complessi come Versailles o intarsi?',
    a: 'Sì. Realizziamo tutti gli schemi classici e moderni, compresi intarsi su misura, Versailles, spina di pesce, chevron e lavorazioni geometriche complesse su disegno del progettista.',
  },
  {
    q: 'Come gestite le transizioni tra materiali diversi?',
    a: 'Valutiamo ogni passaggio tecnicamente: soglie tra parquet e altri materiali, giunti di dilatazione, compensazioni di livello. Ogni raccordo è progettato caso per caso per garantire funzionalità ed estetica.',
  },
  {
    q: 'Siete disponibili per sopralluogo prima del preventivo?',
    a: 'Sì, sempre. Il sopralluogo è gratuito e fortemente consigliato. Suggeriamo di farlo prima della firma con il cliente finale, così abbiamo tutti i dati tecnici per un preventivo accurato.',
  },
  {
    q: 'Quale area geografica coprite?',
    a: 'Bergamo e provincia come sede operativa principale. Milano, Brescia, Como, Monza e Brianza, tutta la Lombardia. Per cantieri fuori regione valutiamo caso per caso.',
  },
  {
    q: 'Quanto tempo richiede un cantiere tipo?',
    a: 'Dipende dalla metratura, dallo schema e dalla complessità. In fase di preventivo forniamo sempre una stima realistica dei tempi, che rispettiamo.',
  },
  {
    q: 'Fornite garanzia sul lavoro?',
    a: 'Sì, sempre. Garanzia scritta sulla manodopera per ogni intervento. Su richiesta forniamo anche schede tecniche dei materiali utilizzati.',
  },
]

function FaqItem({ 
  faq, 
  isOpen, 
  onToggle 
}: { 
  faq: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
}) {
  const answerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    if (isOpen) {
      gsap.to(answerRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: EASE.expo,
      })
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      })
    }
  }, [isOpen])

  return (
    <div
      className={cn(
        'border border-white/10 rounded-xl overflow-hidden transition-colors duration-300',
        isOpen ? 'bg-white/5' : 'bg-transparent hover:bg-white/[0.02]'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rovere focus-visible:ring-offset-2 focus-visible:ring-offset-nero-marquina"
        aria-expanded={isOpen}
      >
        <span className="flex-1 font-sans text-[15px] font-semibold text-travertino leading-relaxed">
          {faq.q}
        </span>
        <ChevronDown
          size={20}
          className={cn(
            'flex-shrink-0 text-travertino/50 transition-transform duration-300 mt-0.5',
            isOpen && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 pb-5">
          <p className="font-sans text-[14px] text-travertino/60 leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (getReducedMotion()) return

    const ctx = gsap.context(() => {
      // Header
      const headerElements = headerRef.current?.querySelectorAll('.reveal-item')
      if (headerElements) {
        gsap.set(headerElements, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(headerElements, {
              opacity: 1,
              y: 0,
              duration: DURATION.base,
              stagger: 0.1,
              ease: EASE.expo,
            })
          },
        })
      }

      // FAQ items
      const items = listRef.current?.children
      if (items) {
        gsap.set(items, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: listRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: DURATION.base,
              stagger: 0.08,
              ease: EASE.expo,
            })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-nero-marquina overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="reveal-item flex items-center justify-center gap-4 mb-6">
            <HelpCircle size={20} className="text-rovere" aria-hidden="true" />
            <span className="font-sans text-[11px] font-semibold text-rovere tracking-[0.2em] uppercase">
              Domande frequenti
            </span>
          </div>

          <h2
            className="reveal-item font-serif text-travertino leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            Risposte alle domande
            <span className="text-travertino/40"> più comuni.</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div ref={listRef} className="space-y-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
