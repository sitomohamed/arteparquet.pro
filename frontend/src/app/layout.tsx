import type { Metadata, Viewport } from 'next'
import { playfair, inter } from '@/styles/fonts'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBottomBar } from '@/components/layout/mobile-bottom-bar'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { CookieConsent } from '@/components/ui/cookie-consent'
import { LocalBusinessSchema } from '@/components/seo/json-ld'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F9F8F6',
}

export const metadata: Metadata = {
  title: {
    default: 'Arteparquet | Posa e Restauro Parquet in Italia — Dal 1996',
    template: '%s | Arteparquet',
  },
  description:
    'Specialisti in posa, restauro e levigatura parquet dal 1996. SPC, PVC, laminato. Ex team Teatro alla Scala di Milano. Operiamo in tutta Italia. Sopralluogo e preventivo gratuiti.',
  keywords: [
    'posa parquet',
    'restauro parquet',
    'levigatura parquet',
    'parquet massello',
    'parquet prefinito',
    'SPC',
    'PVC',
    'laminato',
    'parquet Milano',
    'parquet Bergamo',
    'parquet Italia',
    'posatore parquet',
    'parquet Teatro alla Scala',
  ],
  authors: [{ name: 'Arteparquet', url: 'https://arteparquet.pro' }],
  creator: 'Arteparquet di Arabi Mohamed',
  publisher: 'Arteparquet',
  metadataBase: new URL('https://arteparquet.pro'),
  openGraph: {
    title: 'Arteparquet | Maestri del Parquet in Italia dal 1996',
    description: 'Posa, restauro e soluzioni parquet premium in tutta Italia. Ex team Teatro alla Scala. Preventivo gratuito.',
    url: 'https://arteparquet.pro',
    siteName: 'Arteparquet',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Arteparquet — Maestri del Parquet' }],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arteparquet | Maestri del Parquet in Italia dal 1996',
    description: 'Posa e restauro parquet premium. Ex team Teatro alla Scala. Preventivo gratuito.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'VXC4qkDDPbSXDo2jFxqIWGakDT6muXBAmwprE-wmzLs',
    other: {
      'msvalidate.01': '85FD296AB7B9AEA1D22F1006DD8FC4E6',
    },
  },
  category: 'construction',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <head>
        {/* Preconnect to speed up Google Fonts / external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Global JSON-LD — appears on every page */}
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col bg-travertino text-legno-bruciato font-sans">
        <Header />
        <main className="flex-1 pb-14 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  )
}
