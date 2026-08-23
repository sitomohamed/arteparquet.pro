import type { MetadataRoute } from 'next'

const BASE = 'https://arteparquet.pro'

const D = {
  home:      '2026-08-21',
  services:  '2026-08-21',
  portfolio: '2026-08-08',
  chiSiamo:  '2026-08-01',
  contatti:  '2026-08-01',
  faq:       '2026-08-01',
  blog:      '2026-08-08',
  zone:      '2026-08-21',
}

const BLOG_DATES: Record<string, string> = {
  'come-scegliere-parquet':          '2026-07-15',
  'restauro-parquet-quando-conviene': '2026-06-10',
  'spc-vs-parquet':                   '2026-05-20',
  'posa-parquet-spina-di-pesce':      '2026-04-08',
  'levigatura-parquet-guida':         '2026-03-15',
  'parquet-massello-guida':           '2026-02-22',
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
    { url: BASE,                lastModified: D.home,      changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/servizi`,   lastModified: D.services,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portfolio`, lastModified: D.portfolio, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contatti`,  lastModified: D.contatti,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/chi-siamo`, lastModified: D.chiSiamo,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq`,       lastModified: D.faq,       changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,      lastModified: D.blog,      changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/costo-levigatura-parquet`, lastModified: '2026-08-23', changeFrequency: 'monthly', priority: 0.8 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((s) => ({
    url: `${BASE}/servizi/${s}`,
    lastModified: D.services,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const localPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE}/zone/parquet-${city}`,
    lastModified: D.zone,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: BLOG_DATES[slug] ?? D.blog,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...localPages, ...blogPages]
}
