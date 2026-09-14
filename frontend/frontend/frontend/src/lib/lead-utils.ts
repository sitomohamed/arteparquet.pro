/**
 * Lead utilities — Domain extraction, validation, formatting
 * Supporto per il workflow B2B di discovery e anti-duplicati
 */

import { extractDomain, findLeadByDomain, findLeadByEmail } from './leads'

export { extractDomain }

/* ─────────────────────────────────────────────────────────────────────────────
   DOMAIN & EMAIL UTILITIES
───────────────────────────────────────────────────────────────────────────── */

/**
 * Valida se una stringa è un dominio valido (sintatticamente).
 * Non verifica che il dominio esista realmente (no DNS lookup).
 */
export function isValidDomain(value: string): boolean {
  if (!value) return false
  const trimmed = value.trim().toLowerCase()
  // Pattern base: almeno un punto, no spazi, no caratteri strani
  return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed)
}

/**
 * Valida se una stringa è un'email valida (sintatticamente).
 */
export function isValidEmail(value: string): boolean {
  if (!value) return false
  const trimmed = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

/**
 * Normalizza un URL aggiungendo https:// se manca lo schema.
 */
export function normalizeUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return `https://${trimmed}`
}

/**
 * Estrae il nome dell'azienda dal dominio.
 * Esempi:
 *   "studioarch.it" → "studioarch"
 *   "architettura-design.com" → "architettura-design"
 *   "www.studio-abc.it" → "studio-abc"
 */
export function companyNameFromDomain(domain: string): string {
  if (!domain) return ''
  const normalized = domain.toLowerCase().replace(/^www\./, '')
  const parts = normalized.split('.')
  return parts[0] || ''
}

/* ─────────────────────────────────────────────────────────────────────────────
   DUPLICATE DETECTION
───────────────────────────────────────────────────────────────────────────── */

export type DuplicateCheckResult =
  | { isDuplicate: false }
  | {
      isDuplicate: true
      reason: 'domain' | 'email'
      existingLeadId: string
      existingLeadName: string
    }

/**
 * Verifica duplicati B2B completi.
 * Controlla sia dominio che email.
 * Ritorna dettagli del conflitto se trovato.
 */
export async function checkB2BDuplicate(input: {
  website?: string
  email?: string
}): Promise<DuplicateCheckResult> {
  const domain = extractDomain(input.website || input.email || '')
  if (!domain) return { isDuplicate: false }

  const byDomain = await findLeadByDomain(domain)
  if (byDomain) {
    return {
      isDuplicate: true,
      reason: 'domain',
      existingLeadId: byDomain.id,
      existingLeadName: byDomain.name,
    }
  }

  if (input.email) {
    const byEmail = await findLeadByEmail(input.email)
    if (byEmail) {
      return {
        isDuplicate: true,
        reason: 'email',
        existingLeadId: byEmail.id,
        existingLeadName: byEmail.name,
      }
    }
  }

  return { isDuplicate: false }
}

/* ─────────────────────────────────────────────────────────────────────────────
   FORMATTING UTILITIES
───────────────────────────────────────────────────────────────────────────── */

/**
 * Genera un slug URL-friendly dal nome.
 * Esempio: "Studio Arch Milano" → "studio-arch-milano"
 */
export function generateLeadSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

/**
 * Formatta una città in modo consistente.
 * Esempio: "bergamo" → "Bergamo", "MILANO" → "Milano"
 */
export function formatCity(city?: string): string {
  if (!city) return ''
  const trimmed = city.trim()
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
}

/**
 * Tronca testo a N caratteri aggiungendo "..." se necessario.
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/* ─────────────────────────────────────────────────────────────────────────────
   BUSINESS LOGIC HELPERS
───────────────────────────────────────────────────────────────────────────── */

/**
 * Determina se un lead B2B è "nel cimitero" (scartato definitivamente).
 */
export function isInCemetery(status: string): boolean {
  return status === 'rejected_already_covered' || status === 'rejected_out_of_target'
}

/**
 * Determina se un lead B2B è "attivo" (può ancora diventare cliente).
 */
export function isActiveLead(status: string): boolean {
  return !isInCemetery(status) && status !== 'closed_silence'
}

/**
 * Calcola i giorni passati da una data ISO.
 */
export function daysSince(isoDate?: string): number | null {
  if (!isoDate) return null
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Verifica se è il momento di inviare un follow-up (dopo 10+ giorni).
 */
export function shouldSendFollowUp(lastInteractionAt?: string): boolean {
  const days = daysSince(lastInteractionAt)
  return days !== null && days >= 10
}
