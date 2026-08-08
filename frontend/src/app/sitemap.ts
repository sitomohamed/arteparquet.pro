import type { MetadataRoute } from 'next'

const BASE = 'https://arteparquet.pro'

// Data ultima modifica reale dei contenuti (aggiornare manualmente quando si modificano pagine)
const DATES = {
  home: '2026-08-08',
  services: '2026-08-08',
  portfolio: '2026-08-08',
  chiSiamo: '2026-08-01',
  contatti: '2026-08-01',
  faq: '2026-08-01',
  blog: '2026-08-08',
  legal: '2026-01-01',
  zone: '2026-08-01',
  blogPosts: '2026-08-01',
}

const CITIES = [
  'milano', 'bergamo', 'brescia', 'como', 'monza',
  'varese', 'lecco', 'lodi', 'pavia', 'cremona', 'mantova',
]

const SERVICE_SLUGS = [
  'posa', 'restauro', 'levigatura', 'spc', 'laminato', 'pvc', 'vinilico',
  'parquet-massello', 'parquet-prefinito', 'parquet-tradizionale', 'riparazioni',
]

const BLOG_SLUGS = [
  'come-scegliere-parquet',
  'restauro-parquet-quando-conviene',
  'spc-vs-parquet',
  'posa-parquet-spina-di-pesce',
  'levigatura-parquet-guida',
  'parquet-massello-guida',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: DATES.home,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/servizi`,
      lastModified: DATES.services,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/portfolio`,
      lastModified: DATES.portfolio,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/contatti`,
      lastModified: DATES.contatti,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/chi-siamo`,
      lastModified: DATES.chiSiamo,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/faq`,
      lastModified: DATES.faq,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog`,
      lastModified: DATES.blog,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/privacy-policy`,
      lastModified: DATES.legal,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE}/cookie-policy`,
      lastModified: DATES.legal,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((s) => ({
    url: `${BASE}/servizi/${s}`,
    lastModified: DATES.services,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Pagine locali — solo 2 varianti per città (parquet-{city} e posa-parquet-{city})
  const localPages: MetadataRoute.Sitemap = CITIES.flatMap((city) => [
    {
      url: `${BASE}/zone/parquet-${city}`,
      lastModified: DATES.zone,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${BASE}/zone/posa-parquet-${city}`,
      lastModified: DATES.zone,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
  ])

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: DATES.blogPosts,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...localPages, ...blogPages]
}
