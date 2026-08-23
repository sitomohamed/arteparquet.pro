/**
 * Strategic Internal Linking System
 * 
 * Provides contextual internal links based on content type, keywords, and user intent.
 * Optimizes for SEO authority distribution and conversion path guidance.
 */

export interface InternalLink {
  title: string
  href: string
  description: string
  intent: 'service' | 'zone' | 'content' | 'conversion'
  priority: number // 1-10, higher = more important
}

/**
 * Service pages and their related services (for cross-selling)
 */
const SERVICE_RELATIONSHIPS: Record<string, string[]> = {
  'parquet-massello': ['parquet-prefinito', 'posa', 'levigatura'],
  'parquet-prefinito': ['parquet-massello', 'spc', 'posa'],
  'parquet-tradizionale': ['parquet-massello', 'parquet-prefinito', 'posa'],
  'laminato': ['spc', 'pvc', 'posa'],
  'spc': ['pvc', 'vinilico', 'laminato', 'posa'],
  'pvc': ['spc', 'vinilico', 'posa'],
  'vinilico': ['spc', 'pvc', 'posa'],
  'posa': ['parquet-massello', 'spc', 'levigatura'],
  'levigatura': ['restauro', 'posa', 'parquet-massello'],
  'restauro': ['levigatura', 'riparazioni', 'parquet-massello'],
  'riparazioni': ['restauro', 'levigatura', 'posa'],
}

/**
 * High-priority city pages for strategic linking
 */
export const PRIORITY_CITIES = [
  { slug: 'parquet-bergamo', name: 'Bergamo', priority: 10 },
  { slug: 'parquet-milano', name: 'Milano', priority: 9 },
  { slug: 'parquet-brescia', name: 'Brescia', priority: 7 },
  { slug: 'parquet-monza', name: 'Monza', priority: 6 },
  { slug: 'parquet-como', name: 'Como', priority: 5 },
]

/**
 * Get related service links for a given service
 */
export function getRelatedServices(currentServiceSlug: string): InternalLink[] {
  const related = SERVICE_RELATIONSHIPS[currentServiceSlug] || []
  
  const serviceData: Record<string, { title: string; description: string }> = {
    'parquet-massello': {
      title: 'Parquet Massello',
      description: 'Legno pieno al 100%, levigabile per decenni. Il parquet più pregiato.',
    },
    'parquet-prefinito': {
      title: 'Parquet Prefinito',
      description: 'Installazione rapida, ottima stabilità. Pronto in pochi giorni.',
    },
    'parquet-tradizionale': {
      title: 'Parquet Tradizionale',
      description: 'Posa a spina di pesce, listone classico, Versailles. Design senza tempo.',
    },
    'laminato': {
      title: 'Pavimento Laminato',
      description: 'Alta resistenza AC4/AC5. Ideale per alto traffico.',
    },
    'spc': {
      title: 'Pavimento SPC',
      description: 'Impermeabile 100%. Perfetto per bagni e cucine.',
    },
    'pvc': {
      title: 'Pavimento PVC',
      description: 'Silenzioso e confortevole. Installazione senza demolire.',
    },
    'vinilico': {
      title: 'Pavimento Vinilico',
      description: 'Estetica sofisticata, manutenzione minima. Per ambienti contract.',
    },
    'posa': {
      title: 'Posa Parquet',
      description: 'Posa professionale certificata. Incollato, flottante o chiodato.',
    },
    'levigatura': {
      title: 'Levigatura Parquet',
      description: 'Levigatura senza polvere. Risultato impeccabile con aspirazione integrata.',
    },
    'restauro': {
      title: 'Restauro Parquet',
      description: 'Nuova vita al parquet antico. Recupero listelli e finiture.',
    },
    'riparazioni': {
      title: 'Riparazioni Parquet',
      description: 'Interventi puntuali e rapidi. Scricchiolii, listelli rotti, rigonfiamenti.',
    },
  }

  return related
    .map((slug, index) => ({
      title: serviceData[slug]?.title || slug,
      href: `/servizi/${slug}`,
      description: serviceData[slug]?.description || '',
      intent: 'service' as const,
      priority: 8 - index, // First related service is highest priority
    }))
    .filter((link) => link.title !== slug) // Exclude current page
}

/**
 * Get strategic zone links (high-priority cities)
 */
export function getStrategicZoneLinks(limit = 4): InternalLink[] {
  return PRIORITY_CITIES.slice(0, limit).map((city) => ({
    title: `Parquet ${city.name}`,
    href: `/zone/${city.slug}`,
    description: `Servizi parquet professionali a ${city.name} e provincia. Sopralluogo gratuito.`,
    intent: 'zone' as const,
    priority: city.priority,
  }))
}

/**
 * Get contextual links for a service page (combines related services + top zones)
 */
export function getServicePageLinks(serviceSlug: string): InternalLink[] {
  const relatedServices = getRelatedServices(serviceSlug).slice(0, 3)
  const topZones = getStrategicZoneLinks(2)

  return [...relatedServices, ...topZones].sort((a, b) => b.priority - a.priority)
}

/**
 * Get contextual links for a zone page (combines relevant services + other zones)
 */
export function getZonePageLinks(currentCity: string): InternalLink[] {
  const services: InternalLink[] = [
    {
      title: 'Posa Parquet',
      href: '/servizi/posa',
      description: `Posa professionale di parquet a ${currentCity}. Dal 1996.`,
      intent: 'service',
      priority: 10,
    },
    {
      title: 'Levigatura Parquet',
      href: '/servizi/levigatura',
      description: `Levigatura senza polvere a ${currentCity}. Risultato impeccabile.`,
      intent: 'service',
      priority: 9,
    },
    {
      title: 'Restauro Parquet',
      href: '/servizi/restauro',
      description: `Restauro parquet antico a ${currentCity}. Recupero listelli.`,
      intent: 'service',
      priority: 8,
    },
  ]

  const otherZones = PRIORITY_CITIES.filter(
    (city) => city.name.toLowerCase() !== currentCity.toLowerCase()
  )
    .slice(0, 2)
    .map((city) => ({
      title: `Parquet ${city.name}`,
      href: `/zone/${city.slug}`,
      description: `Servizi parquet a ${city.name}. Ex team Teatro alla Scala.`,
      intent: 'zone' as const,
      priority: city.priority,
    }))

  return [...services, ...otherZones]
}

/**
 * Get conversion-focused links (always available)
 */
export function getConversionLinks(): InternalLink[] {
  return [
    {
      title: 'Richiedi Preventivo Gratuito',
      href: '/contatti',
      description: 'Sopralluogo e preventivo senza impegno. Risposta in 24 ore.',
      intent: 'conversion',
      priority: 10,
    },
    {
      title: 'Portfolio Lavori',
      href: '/portfolio',
      description: 'Scopri i nostri progetti di posa, restauro e levigatura parquet.',
      intent: 'conversion',
      priority: 7,
    },
  ]
}
