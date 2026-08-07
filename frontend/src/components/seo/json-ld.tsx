// ── Global LocalBusiness schema ─────────────────────────────────────────
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': 'https://arteparquet.pro/#business',
    name: 'Arteparquet',
    alternateName: 'Arteparquet.pro',
    description:
      'Specialisti in posa, restauro e manutenzione di parquet, SPC, PVC e laminati. Ex team Teatro alla Scala di Milano. Operiamo in tutta Italia dal 1996.',
    url: 'https://arteparquet.pro',
    telephone: '+393892407827',
    email: 'info@arteparquet.pro',
    foundingDate: '1996',
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bergamo',
      addressRegion: 'Lombardia',
      postalCode: '24100',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '45.6983',
      longitude: '9.6773',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Italy',
      '@id': 'https://www.wikidata.org/wiki/Q38',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi Parquet',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Posa Parquet' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restauro Parquet' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Levigatura Parquet' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Posa SPC e PVC' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Posa Laminato' } },
      ],
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Arabi Mohamed',
      jobTitle: 'Maestro Posatore & Fondatore',
    },
    knowsAbout: [
      'Posa Parquet',
      'Restauro Parquet',
      'Levigatura Parquet',
      'Parquet Massello',
      'Parquet Prefinito',
      'SPC Flooring',
      'PVC Flooring',
      'Pavimenti Laminati',
      'Teatro alla Scala Parquet',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      reviewCount: '100',
    },
    sameAs: [
      'https://www.instagram.com/arteparquet',
      'https://www.facebook.com/arteparquet',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── FAQ schema for FAQ page ──────────────────────────────────────────────
export function FaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quale parquet è più adatto alla mia casa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dipende dall\'utilizzo e dall\'ambiente. Il massello è il più duraturo e pregiato. Il prefinito è stabile e si installa rapidamente. Per ambienti umidi come cucine e bagni, SPC o PVC sono impermeabili al 100%. Durante il sopralluogo gratuito valutiamo insieme la soluzione perfetta.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo richiede la posa del parquet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Per un appartamento medio (80–120 mq) la posa richiede 2–4 giorni lavorativi. Il parquet massello incollato necessita di 24–48 ore di asciugatura prima del calpestio.',
        },
      },
      {
        '@type': 'Question',
        name: 'Operate in tutta Italia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, operiamo in tutta Italia. Siamo basati a Bergamo ma eseguiamo interventi dalla Lombardia alla Sicilia, incluse le isole.',
        },
      },
      {
        '@type': 'Question',
        name: 'Che garanzia offrite sulla posa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Offriamo garanzia scritta sulla manodopera della posa. In caso di difetti imputabili alla nostra esecuzione, interveniamo gratuitamente.',
        },
      },
      {
        '@type': 'Question',
        name: 'Come funziona il sopralluogo gratuito?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Contattateci e concordiamo il giorno. Veniamo da voi, misuriamo lo spazio e ascoltiamo le esigenze. Entro 24 ore dal sopralluogo ricevete il preventivo. Tutto gratuito e senza impegno.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── BreadcrumbList schema ────────────────────────────────────────────────
interface BreadcrumbItem { name: string; url: string }

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Local Service schema (per-city pages) ────────────────────────────────
export function LocalServiceSchema({
  city,
  service,
  description,
}: {
  city: string
  service: string
  description: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service,
    name: `${service} ${city}`,
    description,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': 'https://arteparquet.pro/#business',
      name: 'Arteparquet',
      telephone: '+393892407827',
    },
    areaServed: {
      '@type': 'City',
      name: city,
      addressCountry: 'IT',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
        description: 'Preventivo gratuito su misura',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
