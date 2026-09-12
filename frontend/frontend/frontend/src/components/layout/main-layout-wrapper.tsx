'use client'

/**
 * MainLayoutWrapper
 * Renders global Header/Footer for standard routes.
 * LP routes (/lp/*) skip global chrome to maximise focus + message match.
 */

import { usePathname } from 'next/navigation'
import { Header } from './header'
import { Footer } from './footer'
import { MobileBottomBar } from './mobile-bottom-bar'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'

const BARE_PREFIXES = ['/lp', '/crm']

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLP = BARE_PREFIXES.some((p) => pathname.startsWith(p))

  return (
    <>
      {!isLP && <Header />}
      <main
        id="main-content"
        className={isLP ? 'min-h-screen' : 'flex-1 pb-14 md:pb-0'}
      >
        {children}
      </main>
      {!isLP && <Footer />}
      {!isLP && <MobileBottomBar />}
      {!isLP && <WhatsAppButton />}
    </>
  )
}
