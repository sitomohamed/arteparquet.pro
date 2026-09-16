import { mkdir, readFile, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { randomUUID } from 'crypto'
import type { Quote } from './quotes'

/* ─────────────────────────────────────────────────────────────────────────────
   JOBS — Lavori in corso da preventivi accettati
───────────────────────────────────────────────────────────────────────────── */

export const JOB_STATUSES = [
  'scheduled', // programmato
  'in_progress', // in corso
  'paused', // sospeso
  'completed', // completato
  'invoiced', // fatturato
  'cancelled', // annullato
] as const

export type JobStatus = (typeof JOB_STATUSES)[number]

export type Job = {
  id: string
  number: string // es. 'LAV-2026-001'
  createdAt: string
  updatedAt: string
  status: JobStatus

  // Cliente (da preventivo)
  clientId: string
  clientName: string
  clientPhone: string
  clientEmail?: string
  clientCity?: string

  // Progetto
  projectTitle?: string
  projectDescription?: string
  projectAddress?: string

  // Riferimento preventivo
  quoteId: string
  quoteNumber: string

  // Dati economici (da preventivo)
  totalCents: number
  
  // Planning
  startDate?: string
  endDate?: string
  estimatedDays?: number
  
  // Pagamenti
  depositPaidAt?: string
  depositAmountCents?: number
  finalPaymentAt?: string
  
  // Note lavoro
  workNotes?: string
  internalNotes?: string
}

/* ─────────────────────────────────────────────────────────────────────────────
   PERSISTENCE
───────────────────────────────────────────────────────────────────────────── */

let memory: Job[] | null = null
let writableFile: string | null | undefined

function candidates() {
  return [
    process.env.JOBS_DATA_PATH,
    path.join(process.cwd(), 'data', 'jobs.json'),
    path.join(tmpdir(), 'arteparquet-jobs.json'),
  ].filter((p): p is string => Boolean(p))
}

async function loadFromDisk(): Promise<Job[]> {
  for (const file of candidates()) {
    try {
      const raw = await readFile(file, 'utf8')
      const parsed = JSON.parse(raw) as Job[]
      if (Array.isArray(parsed)) return parsed
    } catch {
      /* try next */
    }
  }
  return []
}

async function readAll(): Promise<Job[]> {
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
      console.error('[jobs] cannot write to', file, err)
    }
  }
  writableFile = null
  return null
}

async function writeAll(jobs: Job[]) {
  memory = jobs
  const file = await resolveWritable()
  if (!file) return
  try {
    await writeFile(file, JSON.stringify(jobs, null, 2), 'utf8')
  } catch (err) {
    console.error('[jobs] persist failed:', err)
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   NUMBER GENERATION
───────────────────────────────────────────────────────────────────────────── */

export async function generateJobNumber(): Promise<string> {
  const jobs = await readAll()
  const year = new Date().getFullYear()
  const thisYear = jobs.filter((j) => j.number.includes(`-${year}-`))
  const next = thisYear.length + 1
  return `LAV-${year}-${String(next).padStart(3, '0')}`
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────────────────────────────────────── */

/**
 * Crea lavoro da preventivo accettato
 */
export async function createJobFromQuote(quote: Quote): Promise<Job> {
  if (quote.status !== 'accepted') {
    throw new Error('Il preventivo deve essere accettato per creare un lavoro')
  }

  const job: Job = {
    id: randomUUID(),
    number: await generateJobNumber(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'scheduled',
    clientId: quote.clientId,
    clientName: quote.clientName,
    clientPhone: quote.clientPhone,
    clientEmail: quote.clientEmail,
    clientCity: quote.clientCity,
    projectTitle: quote.projectTitle,
    projectDescription: quote.projectDescription,
    projectAddress: quote.projectAddress,
    quoteId: quote.id,
    quoteNumber: quote.number,
    totalCents: quote.totalCents,
  }

  const jobs = await readAll()
  jobs.unshift(job)
  await writeAll(jobs)
  return job
}

export async function listJobs(filter?: { status?: JobStatus }): Promise<Job[]> {
  const all = await readAll()
  if (!filter?.status) return all
  return all.filter((j) => j.status === filter.status)
}

export async function getJob(id: string): Promise<Job | null> {
  const jobs = await readAll()
  return jobs.find((j) => j.id === id) ?? null
}

export async function getJobByQuoteId(quoteId: string): Promise<Job | null> {
  const jobs = await readAll()
  return jobs.find((j) => j.quoteId === quoteId) ?? null
}

export async function updateJob(id: string, patch: Partial<Job>): Promise<Job | null> {
  const jobs = await readAll()
  const idx = jobs.findIndex((j) => j.id === id)
  if (idx < 0) return null
  jobs[idx] = {
    ...jobs[idx],
    ...patch,
    id: jobs[idx].id,
    updatedAt: new Date().toISOString(),
  }
  await writeAll(jobs)
  return jobs[idx]
}

export async function deleteJob(id: string): Promise<string | null> {
  const jobs = await readAll()
  const filtered = jobs.filter((j) => j.id !== id)
  if (filtered.length === jobs.length) return null
  await writeAll(filtered)
  return id
}

/**
 * Stats lavori
 */
export async function getJobsStats() {
  const jobs = await readAll()
  return {
    total: jobs.length,
    scheduled: jobs.filter((j) => j.status === 'scheduled').length,
    in_progress: jobs.filter((j) => j.status === 'in_progress').length,
    completed: jobs.filter((j) => j.status === 'completed').length,
    invoiced: jobs.filter((j) => j.status === 'invoiced').length,
  }
}
