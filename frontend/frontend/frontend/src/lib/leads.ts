import { mkdir, readFile, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { randomUUID } from 'crypto'

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

export const LEAD_STATUSES = [
  // B2C pipeline (esistenti)
  'new',
  'contacted',
  'quote',
  'won',
  'lost',
  // B2B pipeline (nuovi)
  'approved',
  'follow_up_sent',
  'closed_silence',
  'rejected_already_covered',
  'rejected_out_of_target',
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

export type LeadType = 'b2c' | 'b2b'

export type CanReachSite = 'YES' | 'NO' | 'UNCERTAIN'

export type Lead = {
  id: string
  createdAt: string
  status: LeadStatus
  leadType: LeadType

  // ── Campi comuni B2C + B2B ──
  source: string
  name: string
  phone: string
  email?: string
  city?: string
  jobType?: string
  message?: string

  // ── Tracking B2C ──
  photoCount: number
  landingVariant?: string
  ctaVariant?: string
  utm?: Record<string, string>

  // ── Email delivery ──
  emailSent?: boolean
  emailError?: string

  // ── Campi B2B ──
  website?: string
  why_them?: string
  why_arteparquet?: string
  can_reach_site?: CanReachSite
  email_draft?: string
  discovered_at?: string // Data discovery automatica
  last_interaction_at?: string // Ultimo contatto/follow-up
}

/* ─────────────────────────────────────────────────────────────────────────────
   IN-MEMORY CACHE & PERSISTENCE
───────────────────────────────────────────────────────────────────────────── */

let memory: Lead[] | null = null
let writableFile: string | null | undefined

function candidates() {
  return [
    process.env.LEADS_DATA_PATH,
    path.join(process.cwd(), 'data', 'leads.json'),
    path.join(tmpdir(), 'arteparquet-leads.json'),
  ].filter((p): p is string => Boolean(p))
}

async function loadFromDisk(): Promise<Lead[]> {
  for (const file of candidates()) {
    try {
      const raw = await readFile(file, 'utf8')
      const parsed = JSON.parse(raw) as Lead[]
      if (Array.isArray(parsed)) return parsed
    } catch {
      /* try next path */
    }
  }
  return []
}

async function readAll(): Promise<Lead[]> {
  if (memory) return memory
  memory = await loadFromDisk()
  return memory
}

async function resolveWritable(): Promise<string | null> {
  if (writableFile !== undefined) return writableFile
  for (const file of candidates()) {
    try {
      await mkdir(path.dirname(file), { recursive: true })
      await writeFile(file, JSON.stringify(memory ?? [], null, 2), 'utf8')
      writableFile = file
      return file
    } catch (err) {
      console.error('[leads] cannot write to', file, err)
    }
  }
  writableFile = null
  return null
}

async function writeAll(leads: Lead[]) {
  memory = leads
  const file = await resolveWritable()
  if (!file) return
  try {
    await writeFile(file, JSON.stringify(leads, null, 2), 'utf8')
  } catch (err) {
    console.error('[leads] persist failed:', err)
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────────────────────────────────────── */

export async function saveLead(
  input: Omit<Lead, 'id' | 'createdAt' | 'status' | 'leadType'> & {
    status?: LeadStatus
    leadType?: LeadType
  },
) {
  const lead: Lead = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: input.status ?? 'new',
    leadType: input.leadType ?? 'b2c',
  }
  const leads = await readAll()
  leads.unshift(lead)
  await writeAll(leads)
  return lead
}

export async function listLeads(filter?: { leadType?: LeadType; status?: LeadStatus }) {
  const all = await readAll()
  if (!filter) return all
  return all.filter((lead) => {
    if (filter.leadType && lead.leadType !== filter.leadType) return false
    if (filter.status && lead.status !== filter.status) return false
    return true
  })
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  if (!LEAD_STATUSES.includes(status)) return null
  return updateLead(id, { status })
}

export async function updateLead(id: string, patch: Partial<Lead>) {
  const leads = await readAll()
  const idx = leads.findIndex((l) => l.id === id)
  if (idx < 0) return null
  leads[idx] = { ...leads[idx], ...patch, id: leads[idx].id }
  await writeAll(leads)
  return leads[idx]
}

export async function deleteLead(id: string) {
  const leads = await readAll()
  const filtered = leads.filter((l) => l.id !== id)
  if (filtered.length === leads.length) return null
  await writeAll(filtered)
  return id
}

/* ─────────────────────────────────────────────────────────────────────────────
   B2B UTILITIES
───────────────────────────────────────────────────────────────────────────── */

/**
 * Estrae il dominio da email o URL.
 * Esempi:
 *   "info@studioarch.it" → "studioarch.it"
 *   "https://www.studioarch.it/contatti" → "studioarch.it"
 *   "studioarch.it" → "studioarch.it"
 */
export function extractDomain(value?: string): string | null {
  if (!value) return null
  const trimmed = value.trim().toLowerCase()

  // Email
  if (trimmed.includes('@')) {
    const parts = trimmed.split('@')
    return parts[1] || null
  }

  // URL
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    return url.hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

/**
 * Cerca lead per dominio (website o email).
 * Ritorna il primo match trovato.
 */
export async function findLeadByDomain(domain: string): Promise<Lead | null> {
  if (!domain) return null
  const normalized = domain.toLowerCase()
  const all = await readAll()
  return (
    all.find((lead) => {
      const webDomain = extractDomain(lead.website)
      const emailDomain = extractDomain(lead.email)
      return webDomain === normalized || emailDomain === normalized
    }) ?? null
  )
}

/**
 * Verifica se esiste già un lead con questo dominio.
 */
export async function isDuplicateLead(domain: string): Promise<boolean> {
  const existing = await findLeadByDomain(domain)
  return existing !== null
}

/**
 * Cerca lead per email esatta (case-insensitive).
 */
export async function findLeadByEmail(email: string): Promise<Lead | null> {
  if (!email) return null
  const normalized = email.trim().toLowerCase()
  const all = await readAll()
  return all.find((lead) => lead.email?.toLowerCase() === normalized) ?? null
}

/**
 * Statistiche pipeline B2B.
 */
export async function getB2BStats() {
  const b2bLeads = await listLeads({ leadType: 'b2b' })
  return {
    total: b2bLeads.length,
    approved: b2bLeads.filter((l) => l.status === 'approved').length,
    follow_up_sent: b2bLeads.filter((l) => l.status === 'follow_up_sent').length,
    closed_silence: b2bLeads.filter((l) => l.status === 'closed_silence').length,
    cemetery: b2bLeads.filter(
      (l) => l.status === 'rejected_already_covered' || l.status === 'rejected_out_of_target',
    ).length,
  }
}
