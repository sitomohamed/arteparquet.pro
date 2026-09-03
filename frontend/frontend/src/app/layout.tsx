import type { Metadata, Viewport } from 'next'
import { playfair, inter } from '@/styles/fonts'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBottomBar } from '@/components/layout/mobile-bottom-bar'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { CookieConsent } from '@/components/ui/cookie-consent'
import { GoogleAnalyticsConsent } from '@/components/analytics/google-analytics'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { ScrollTracker } from '@/components/analytics/scroll-tracker'
import { LocalBusinessSchema, WebSiteSchema } from '@/components/seo/json-ld'
import { SmoothScroll } from '@/components/animations/smooth-scroll'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { GA_MEASUREMENT_ID, META_PIXEL_ID } from '@/lib/analytics'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F9F8F6',
}

export const metadata: Metadata = {
  title: {
    default: 'Posa e Restauro Parquet in Italia | Arteparquet',
    template: '%s | Arteparquet',
  },
  description:
    'Posa, restauro e levigatura parquet dal 1996. Ex team Teatro alla Scala. Sopralluogo gratuito a Bergamo, Milano e in Lombardia.',
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
    title: 'Posa e Restauro Parquet in Italia | Arteparquet',
    description: 'Posa, restauro e levigatura parquet dal 1996. Sopralluogo gratuito in Lombardia.',
    url: 'https://arteparquet.pro',
    siteName: 'Arteparquet',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posa e Restauro Parquet in Italia | Arteparquet',
    description: 'Posa, restauro e levigatura parquet dal 1996. Sopralluogo gratuito in Lombardia.',
    creator: '@arteparquet',
    site: '@arteparquet',
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
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    title: 'Arteparquet',
    statusBarStyle: 'default',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <head>
        {/* Preconnect + dns-prefetch for Unsplash images used in chi-siamo and blog */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preload hero LCP background image for faster FCP/LCP */}
        <link
          rel="preload"
          as="image"
          href="/portfolio/google-spina-pesce-lucida-01.jpg"
          fetchPriority="high"
        />
        {/* Global JSON-LD — appears on every page */}
        <LocalBusinessSchema />
        <WebSiteSchema />
        {/* Native tags so Google's installer can see G-CXJX669QNK in the HTML source. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        {/* Native Meta Pixel so Events Manager finds the ID in HTML. Events stay revoked until marketing consent. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('consent', 'revoke');
              fbq('init', '${META_PIXEL_ID}');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-travertino text-legno-bruciato font-sans custom-cursor-enabled">
        <SmoothScroll />
        <CustomCursor />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-legno-bruciato px-4 py-2 z-[9999] rounded shadow font-sans text-sm font-semibold"
        >
          Vai al contenuto principale
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-14 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
        <WhatsAppButton />
        <CookieConsent />
        <GoogleAnalyticsConsent />
        <MetaPixel />
        <ScrollTracker />
      </body>
    </html>
  )
}
