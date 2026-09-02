import type { MetadataRoute } from 'next'

const BASE = 'https://arteparquet.pro'
const TODAY = '2026-08-31'

const D = {
  home:      TODAY,
  services:  TODAY,
  portfolio: '2026-08-08',
  chiSiamo:  '2026-08-01',
  contatti:  TODAY,
  faq:       TODAY,
  blog:      '2026-08-08',
  zone:      TODAY,
  pillar:    TODAY,
}

const BLOG_DATES: Record<string, string> = {
  'come-scegliere-parquet':           '2026-07-15',
  'restauro-parquet-quando-conviene':  '2026-06-10',
  'spc-vs-parquet':                    '2026-05-20',
  'posa-parquet-spina-di-pesce':       '2026-04-08',
  'levigatura-parquet-guida':          '2026-03-15',
  'parquet-massello-guida':            '2026-02-22',
}

const CITIES = [
  'milano', 'bergamo', 'brescia', 'como', 'monza',
  'varese', 'lecco', 'lodi', 'pavia', 'cremona', 'mantova',
]

const BERGAMO_COMMUNES = [
  'seriate', 'dalmine', 'treviglio', 'albino', 'zanica',
  'stezzano', 'curno', 'azzano', 'gorle', 'scanzorosciate',
  'lallio', 'grassobbio', 'orio', 'romano', 'clusone',
]

const SERVICE_SLUGS = [
  'posa', 'restauro', 'levigatura', 'spc', 'laminato', 'pvc', 'vinilico',
  'parquet-massello', 'parquet-prefinito', 'parquet-tradizionale', 'riparazioni',
]

const BLOG_SLUGS = Object.keys(BLOG_DATES)

const PILLAR_PAGES = [
  { slug: 'parquet', priority: 0.95 },
  { slug: 'levigatura-parquet', priority: 0.95 },
  { slug: 'restauro-parquet', priority: 0.90 },
  { slug: 'riparazione-parquet', priority: 0.85 },
  { slug: 'pavimenti-spc', priority: 0.85 },
  { slug: 'preventivo', priority: 0.90 },
  { slug: 'bergamo-e-provincia', priority: 0.90 },
]

const KNOWLEDGE_SLUGS = [
  'parquet-massello-vs-prefinito',
  'parquet-vs-laminato-vs-spc',
  'essenze-legno-parquet',
  'finiture-parquet-olio-vernice',
  'posa-parquet-incollata-flottante',
  'umidita-massetto-posa',
  'parquet-su-piastrelle',
  'quanto-costa-levigatura',
  'manutenzione-parquet',
  'parquet-graffi-macchie',
  'parquet-scricchiola',
  'parquet-gonfiato-acqua',
  'parquet-macchie-nere',
  'parquet-bagno-cucina',
  'parquet-riscaldamento-pavimento',
  'spina-italiana-vs-francese',
  'parquet-colore-pareti',
  'preparare-stanza-levigatura',
  'tempi-posa-parquet',
  'cura-parquet-dopo-posa',
  'come-scegliere-posatore',
  'garanzia-parquet',
  'miglior-parquet-casa',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                lastModified: D.home,      changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/servizi`,   lastModified: D.services,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portfolio`, lastModified: D.portfolio, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contatti`,  lastModified: D.contatti,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/per-architetti`, lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/chi-siamo`, lastModified: D.chiSiamo,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq`,       lastModified: D.faq,       changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/blog`,      lastModified: D.blog,      changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/costo-levigatura-parquet`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const pillarPages: MetadataRoute.Sitemap = PILLAR_PAGES.map((p) => ({
    url: `${BASE}/${p.slug}`,
    lastModified: D.pillar,
    changeFrequency: 'weekly' as const,
    priority: p.priority,
  }))

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((s) => ({
    url: `${BASE}/servizi/${s}`,
    lastModified: D.services,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE}/zone/parquet-${city}`,
    lastModified: D.zone,
    changeFrequency: 'monthly' as const,
    priority: city === 'bergamo' ? 0.9 : 0.8,
  }))

  const communePages: MetadataRoute.Sitemap = BERGAMO_COMMUNES.map((commune) => ({
    url: `${BASE}/zone/parquet-${commune}`,
    lastModified: D.zone,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: BLOG_DATES[slug] ?? D.blog,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const knowledgePages: MetadataRoute.Sitemap = KNOWLEDGE_SLUGS.map((slug) => ({
    url: `${BASE}/guida/${slug}`,
    lastModified: D.faq,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [
    ...staticPages,
    ...pillarPages,
    ...servicePages,
    ...cityPages,
    ...communePages,
    ...blogPages,
    ...knowledgePages,
  ]
}
