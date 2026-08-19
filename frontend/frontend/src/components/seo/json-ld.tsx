// ── Global LocalBusiness schema ─────────────────────────────────────────
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': 'https://arteparquet.pro/#business',
    name: 'Arteparquet',
    alternateName: 'Arabi Mohamed Parquet',
    description:
      'Posa, restauro e levigatura parquet a Bergamo, Milano e in tutta la Lombardia. Attività nel parquet dal 1996. Nel 2004 partecipazione in team al progetto Teatro alla Scala di Milano.',
    url: 'https://arteparquet.pro',
    telephone: '+393892407827',
    email: 'info@arteparquet.pro',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Vittorio Alfieri 7',
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
    areaServed: [
      { '@type': 'City', name: 'Bergamo', addressCountry: 'IT' },
      { '@type': 'City', name: 'Milano', addressCountry: 'IT' },
      { '@type': 'City', name: 'Brescia', addressCountry: 'IT' },
      { '@type': 'City', name: 'Como', addressCountry: 'IT' },
      { '@type': 'State', name: 'Lombardia', addressCountry: 'IT' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi Parquet',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Posa Parquet' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restauro Parquet' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Levigatura Parquet' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lamatura Parquet' } },
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
      name: 'Mohamed Arabi',
      jobTitle: 'Maestro Parquettista',
      worksFor: { '@type': 'Organization', name: 'Arteparquet' },
    },
    knowsAbout: [
      'Posa Parquet',
      'Restauro Parquet',
      'Levigatura Parquet',
      'Lamatura Parquet',
      'Parquet Massello',
      'Parquet Prefinito',
      'Parquet a Spina di Pesce',
      'SPC Flooring',
      'PVC Flooring',
      'Pavimenti Laminati',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Person schema for Mohamed Arabi ──────────────────────────────────────
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://arteparquet.pro/#founder',
    name: 'Mohamed Arabi',
    jobTitle: 'Maestro Parquettista',
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://arteparquet.pro/#business',
      name: 'Arteparquet',
    },
    knowsAbout: [
      'Posa Parquet',
      'Restauro Parquet',
      'Levigatura Parquet',
      'Parquet Massello',
      'Parquet Prefinito',
      'Posa a Spina di Pesce',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bergamo',
      addressRegion: 'Lombardia',
      addressCountry: 'IT',
    },
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
        name: 'Ogni quanto si leviga il parquet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In media ogni 10–15 anni per ambienti residenziali. Il parquet massello si può levigare 4–6 volte nel corso della vita. Prima si interviene, meno materiale si perde.',
        },
      },
      {
        '@type': 'Question',
        name: 'Operate in tutta la Lombardia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, operiamo in tutta la Lombardia: Bergamo, Milano, Brescia, Como, Monza, Varese, Lecco, Lodi, Pavia, Cremona e Mantova. Sopralluogo e preventivo gratuiti ovunque in regione.',
        },
      },
      {
        '@type': 'Question',
        name: 'Che garanzia offrite sulla posa del parquet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Offriamo garanzia scritta sulla manodopera della posa. In caso di difetti imputabili alla nostra esecuzione, interveniamo gratuitamente. Per i materiali, la garanzia segue quella del produttore.',
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
      {
        '@type': 'Question',
        name: 'Parquet massello o prefinito: quale è meglio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Il massello dura tutta la vita (50–100 anni) e si leviga 4–6 volte. Il prefinito è più stabile e si installa più velocemente. Per il massimo del pregio e del valore immobiliare, il massello non ha rivali. Per un ottimo risultato con un approccio più pratico, il prefinito è eccellente.',
        },
      },
      {
        '@type': 'Question',
        name: 'Il parquet si può installare sul riscaldamento a pavimento?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì. Il prefinito è la scelta più indicata. Il massello richiede un sistema a bassa temperatura (max 29°C in superficie). Lo SPC è compatibile fino a 28°C. Verifichiamo sempre la compatibilità durante il sopralluogo gratuito.',
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
