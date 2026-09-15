import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Phone, Mail } from 'lucide-react'
import { LpHeader } from '@/components/layout/lp-header'
import { LpFooter } from '@/components/layout/lp-footer'
import { LpTracker } from '@/components/analytics/lp-tracker'
import { BUSINESS } from '@/lib/constants'
import {
  HeroSection,
  TrustStrip,
  ProblemSection,
  SolutionSection,
  PortfolioSection,
  TechnicalSection,
  SchemesSection,
  WhyUsSection,
  HeritageSection,
  ProcessSection,
  AreaSection,
  FaqSection,
  FinalCtaSection,
} from './_components'

/* ═══════════════════════════════════════════════════════════════════════════
   METADATA
═══════════════════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: 'Partner Tecnico Parquet per Architetti e Progettisti | Arteparquet Bergamo',
  description:
    'Collaborazione B2B per studi di architettura, interior design e imprese. Pose complesse, transizioni, massetti, restauri. Bergamo e Lombardia dal 1996.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Partner Tecnico Parquet per Architetti | Arteparquet',
    description: 'Pose complesse, transizioni, massetti, restauri. Dal 1996 al fianco dei professionisti.',
    type: 'website',
    locale: 'it_IT',
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function LpArchitettiPage() {
  return (
    <>
      <LpHeader />

      <Suspense fallback={null}>
        <LpTracker variant="b2b" />
      </Suspense>

      <main className="bg-nero-marquina text-travertino overflow-x-hidden">
        {/* 01 — HERO */}
        <HeroSection />

        {/* 02 — TRUST STRIP */}
        <TrustStrip />

        {/* 03 — IL PROBLEMA DELL'ARCHITETTO */}
        <ProblemSection />

        {/* 04 — LA NOSTRA RISPOSTA */}
        <SolutionSection />

        {/* 05 — PORTFOLIO EDITORIALE */}
        <PortfolioSection />

        {/* 06 — COMPETENZA TECNICA */}
        <TechnicalSection />

        {/* 07 — SCHEMI DI POSA */}
        <SchemesSection />

        {/* 08 — PERCHÉ ARTEPARQUET */}
        <WhyUsSection />

        {/* 09 — DAL 1996 + SCALA */}
        <HeritageSection />

        {/* 10 — PROCESSO */}
        <ProcessSection />

        {/* 11 — AREA OPERATIVA */}
        <AreaSection />

        {/* 12 — FAQ */}
        <FaqSection />

        {/* 13 — FINAL CTA */}
        <FinalCtaSection />
      </main>

      {/* STICKY MOBILE BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-nero-marquina/95 backdrop-blur-md border-t border-white/10 px-4 py-3 z-50 sm:hidden">
        <div className="flex gap-3">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-rovere text-white font-sans text-[14px] font-bold px-4 py-3.5 rounded-xl shadow-lg"
          >
            <Phone size={16} aria-hidden="true" />
            Chiama
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-white/25 text-travertino font-sans text-[14px] font-semibold px-4 py-3.5 rounded-xl"
          >
            <Mail size={16} aria-hidden="true" />
            Email
          </a>
        </div>
      </div>

      <LpFooter />
    </>
  )
}
