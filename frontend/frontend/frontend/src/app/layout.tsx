import type { Metadata, Viewport } from 'next'
import { playfair, inter } from '@/styles/fonts'
import { MainLayoutWrapper } from '@/components/layout/main-layout-wrapper'
import { CookieConsent } from '@/components/ui/cookie-consent'
import { GoogleAnalyticsConsent } from '@/components/analytics/google-analytics'
import { ScrollTracker } from '@/components/analytics/scroll-tracker'
import { LocalBusinessSchema, WebSiteSchema } from '@/components/seo/json-ld'
import { SmoothScroll } from '@/components/animations/smooth-scroll'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { UTMTracker } from '@/components/analytics/utm-tracker'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F9F8F6',
}

export const metadata: Metadata = {
  title: {
    default: 'Arteparquet | Posa e Restauro Parquet in Italia - Dal 1996',
    template: '%s | Arteparquet',
  },
  description:
    'Specialisti in posa, restauro e levigatura parquet dal 1996. SPC, PVC, laminato. Bergamo, Milano e tutta la Lombardia. Sopralluogo e preventivo gratuiti.',
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
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arteparquet | Maestri del Parquet in Italia dal 1996',
    description: 'Posa e restauro parquet premium. Ex team Teatro alla Scala. Preventivo gratuito.',
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
        {/* Preload hero LCP background image for faster FCP/LCP */}
        <link
          rel="preload"
          as="image"
          href="/portfolio/google-spina-pesce-lucida-01.jpg"
          fetchPriority="high"
        />
        {/* Global JSON-LD - appears on every page */}
        <LocalBusinessSchema />
        <WebSiteSchema />
        {/* Native tags so Google's installer can see G-CXJX669QNK in the HTML source. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              var eeaUkCh = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'];
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                region: eeaUkCh
              });
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
              try {
                var raw = localStorage.getItem('arteparquet_cookie_consent');
                if (raw) {
                  var saved = JSON.parse(raw);
                  var ageDays = (Date.now() - saved.timestamp) / 86400000;
                  if (ageDays <= 365) {
                    var ads = saved.marketing ? 'granted' : 'denied';
                    gtag('consent', 'update', {
                      analytics_storage: saved.analytics ? 'granted' : 'denied',
                      ad_storage: ads,
                      ad_user_data: ads,
                      ad_personalization: ads
                    });
                  }
                }
              } catch (e) {}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MB87WRK3');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-travertino text-legno-bruciato font-sans custom-cursor-enabled">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MB87WRK3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SmoothScroll />
        <CustomCursor />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-legno-bruciato px-4 py-2 z-[9999] rounded shadow font-sans text-sm font-semibold"
        >
          Vai al contenuto principale
        </a>
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
        <CookieConsent />
        <GoogleAnalyticsConsent />
        <MetaPixel />
        <UTMTracker />
        <ScrollTracker />
      </body>
    </html>
  )
}
