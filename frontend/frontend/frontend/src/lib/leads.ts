import { mkdir, readFile, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { randomUUID } from 'crypto'

export const LEAD_STATUSES = ['new', 'contacted', 'quote', 'won', 'lost'] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export type Lead = {
  id: string
  createdAt: string
  status: LeadStatus
  source: string
  name: string
  phone: string
  email?: string
  city?: string
  jobType?: string
  message?: string
  photoCount: number
  landingVariant?: string
  ctaVariant?: string
  utm?: Record<string, string>
}

/** Same Node process as the form API — keeps leads visible even if disk is read-only. */
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
      console.error('[leads] cannot write', file, err)
    }
  }
  writableFile = null
  return null
}

async function writeAll(leads: Lead[]) {
  memory = leads
  await resolveWritable()
}

export async function saveLead(input: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }) {
  const lead: Lead = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: input.status ?? 'new',
  }
  const leads = await readAll()
  leads.unshift(lead)
  await writeAll(leads)
  return lead
}

export async function listLeads() {
  return readAll()
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  if (!LEAD_STATUSES.includes(status)) return null
  const leads = await readAll()
  const idx = leads.findIndex((l) => l.id === id)
  if (idx < 0) return null
  leads[idx] = { ...leads[idx], status }
  await writeAll(leads)
  return leads[idx]
}
