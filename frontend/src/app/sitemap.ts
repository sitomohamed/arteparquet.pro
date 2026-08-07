import type { MetadataRoute } from 'next'

const BASE = 'https://arteparquet.pro'

const CITIES = [
  'milano', 'bergamo', 'brescia', 'como', 'monza',
  'varese', 'lecco', 'lodi', 'pavia', 'cremona', 'mantova'
]

const SERVICES = [
  'posa-parquet', 'restauro-levigatura', 'spc-pvc-laminati',
  'scale-battiscopa', 'parquet-massello', 'parquet-prefinito',
  'levigatura', 'restauro', 'riparazioni',
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
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                       lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/servizi`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portfolio`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/chi-siamo`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contatti`,         lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/faq`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/privacy-policy`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/cookie-policy`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/servizi/${s}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Local landing pages — città
  const localPages: MetadataRoute.Sitemap = CITIES.flatMap((city) => [
    {
      url: `${BASE}/zone/parquet-${city}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/zone/posa-parquet-${city}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ])

  // Blog articles
  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...servicePages, ...localPages, ...blogPages]
}
