import type { MetadataRoute } from 'next'

const BASE = 'https://arteparquet.pro'

// Canonical last-modified dates per content category
// Update these when content is significantly changed.
const D = {
  home: '2026-08-31',
  services: '2026-08-31',
  portfolio: '2026-08-08',
  chiSiamo: '2026-08-01',
  contatti: '2026-08-31',
  faq: '2026-08-31',
  blog: '2026-08-08',
  zone: '2026-08-31',
  guida: '2026-09-20',
}

// Blog article individual dates
const BLOG_DATES: Record<string, string> = {
  'come-scegliere-parquet': '2026-07-15',
  'restauro-parquet-quando-conviene': '2026-06-10',
  'spc-vs-parquet': '2026-05-20',
  'posa-parquet-spina-di-pesce': '2026-04-08',
  'levigatura-parquet-guida': '2026-03-15',
  'parquet-massello-guida': '2026-02-22',
}

// Main Lombardy city landing pages
const MAIN_CITIES = [
  'milano', 'bergamo', 'brescia', 'como', 'monza',
  'varese', 'lecco', 'lodi', 'pavia', 'cremona', 'mantova',
]

// Bergamo province town pages
const BERGAMO_TOWNS = [
  'seriate', 'dalmine', 'treviglio', 'albino', 'zanica',
  'stezzano', 'curno', 'azzano', 'gorle', 'scanzorosciate',
  'lallio', 'grassobbio', 'orio', 'romano', 'clusone',
  'alzano-lombardo', 'terno-disola', 'verdellino', 'ciserano',
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

// In-depth buyer/problem guides (/guida/[slug]) - must match GUIDES keys in guida/[slug]/page.tsx
const GUIDA_SLUGS = [
  'costo-levigatura-parquet',
  'come-scegliere-parquet',
  'parquet-massello-vs-prefinito',
  'parquet-spina-di-pesce',
  'manutenzione-parquet',
  'parquet-riscaldamento-pavimento',
  'parquet-bagno',
  'levigatura-parquet-senza-polvere',
  'restauro-parquet-fai-da-te',
  'parquet-cucina',
  'come-scegliere-posatore',
]

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Core static pages ---
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: D.home, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/servizi`, lastModified: D.services, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portfolio`, lastModified: D.portfolio, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contatti`, lastModified: D.contatti, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/per-architetti`, lastModified: D.services, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/chi-siamo`, lastModified: D.chiSiamo, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: D.faq, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: D.blog, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/preventivo`, lastModified: D.home, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/bergamo-e-provincia`, lastModified: D.zone, changeFrequency: 'monthly', priority: 0.9 },
    // High-value standalone service pages (semantic URLs, link targets for ads)
    { url: `${BASE}/parquet`, lastModified: D.services, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/levigatura-parquet`, lastModified: D.services, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/restauro-parquet`, lastModified: D.services, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/riparazione-parquet`, lastModified: D.services, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pavimenti-spc`, lastModified: D.services, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/costo-levigatura-parquet`, lastModified: '2026-08-31', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/invia-foto`, lastModified: D.home, changeFrequency: 'monthly', priority: 0.8 },
  ]

  // ── /servizi/[slug] detail pages ---
  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((s) => ({
    url: `${BASE}/servizi/${s}`,
    lastModified: D.services,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // ── /zone/parquet-[city] landing pages ---
  const mainCityPages: MetadataRoute.Sitemap = MAIN_CITIES.map((city) => ({
    url: `${BASE}/zone/parquet-${city}`,
    lastModified: D.zone,
    changeFrequency: 'monthly' as const,
    priority: city === 'bergamo' || city === 'milano' ? 0.9 : 0.7,
  }))

  const TOWN_SLUG_MAP: Record<string, string> = {
    'azzano': 'parquet-azzano-san-paolo',
    'orio': 'parquet-orio-al-serio',
    'romano': 'parquet-romano-di-lombardia',
    'alzano-lombardo': 'parquet-alzano-lombardo',
    'terno-disola': 'parquet-terno-disola',
  }
  const townPages: MetadataRoute.Sitemap = BERGAMO_TOWNS.map((town) => ({
    url: `${BASE}/zone/${TOWN_SLUG_MAP[town] ?? `parquet-${town}`}`,
    lastModified: D.zone,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // ── /blog/[slug] articles ---
  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: BLOG_DATES[slug] ?? D.blog,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  // ── /guida/[slug] in-depth guides ---
  const guidaPages: MetadataRoute.Sitemap = GUIDA_SLUGS.map((slug) => ({
    url: `${BASE}/guida/${slug}`,
    lastModified: D.guida,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...mainCityPages,
    ...townPages,
    ...blogPages,
    ...guidaPages,
  ]
}
