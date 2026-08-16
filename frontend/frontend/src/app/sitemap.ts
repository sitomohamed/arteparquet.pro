import type { MetadataRoute } from 'next'

const BASE = 'https://arteparquet.pro'

const D = {
  home:      new Date('2026-08-15'),
  services:  new Date('2026-08-15'),
  portfolio: new Date('2026-08-08'),
  chiSiamo:  new Date('2026-08-01'),
  contatti:  new Date('2026-08-01'),
  faq:       new Date('2026-08-01'),
  blog:      new Date('2026-08-08'),
  legal:     new Date('2026-01-01'),
  zone:      new Date('2026-08-15'),
  blogPosts: new Date('2026-08-01'),
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
    { url: BASE,                    lastModified: D.home,      changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/servizi`,       lastModified: D.services,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portfolio`,     lastModified: D.portfolio, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contatti`,      lastModified: D.contatti,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/chi-siamo`,     lastModified: D.chiSiamo,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq`,           lastModified: D.faq,       changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,          lastModified: D.blog,      changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/privacy-policy`,lastModified: D.legal,     changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/cookie-policy`, lastModified: D.legal,     changeFrequency: 'yearly',  priority: 0.2 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((s) => ({
    url: `${BASE}/servizi/${s}`,
    lastModified: D.services,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const localPages: MetadataRoute.Sitemap = CITIES.flatMap((city) => [
    { url: `${BASE}/zone/parquet-${city}`,      lastModified: D.zone, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/zone/posa-parquet-${city}`, lastModified: D.zone, changeFrequency: 'monthly' as const, priority: 0.75 },
  ])

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: D.blogPosts,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...localPages, ...blogPages]
}
