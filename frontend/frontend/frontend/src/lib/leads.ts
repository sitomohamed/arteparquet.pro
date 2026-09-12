import { mkdir, readFile, writeFile } from 'fs/promises'
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

function dataPath() {
  return process.env.LEADS_DATA_PATH || path.join(process.cwd(), 'data', 'leads.json')
}

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await readFile(dataPath(), 'utf8')
    const parsed = JSON.parse(raw) as Lead[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeAll(leads: Lead[]) {
  const file = dataPath()
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, JSON.stringify(leads, null, 2), 'utf8')
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
