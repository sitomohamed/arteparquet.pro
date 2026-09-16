import { mkdir, readFile, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { randomUUID } from 'crypto'
import { createHash } from 'crypto'

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

export const QUOTE_STATUSES = ['draft', 'sent', 'viewed', 'accepted', 'declined', 'expired'] as const
export type QuoteStatus = (typeof QUOTE_STATUSES)[number]

export type QuoteLine = {
  id: string
  description: string
  category?: string // es. 'parquet', 'levigatura', 'posa'
  quantity: number
  unit: string // es. 'm²', 'mq', 'pz', 'ml'
  unitPriceCents: number // prezzo unitario in centesimi
  order: number // per riordinare righe
}

export type Quote = {
  id: string
  number: string // es. 'AP-2026-001'
  createdAt: string
  updatedAt: string
  status: QuoteStatus

  // Cliente (dal CRM lead)
  clientId: string // Lead.id
  clientName: string
  clientPhone: string
  clientEmail?: string
  clientCity?: string

  // Progetto
  projectTitle?: string
  projectDescription?: string
  projectAddress?: string

  // Righe preventivo
  lines: QuoteLine[]

  // Totali (in centesimi)
  subtotalCents: number
  discountPercent: number // sconto globale %
  taxPercent: number // IVA % (default 22)
  totalCents: number

  // Condizioni
  notes?: string
  terms?: string
  validUntil?: string // data scadenza preventivo
  paymentTerms?: string

  // Tracking
  sentAt?: string
  viewedAt?: string
  acceptedAt?: string
  declinedAt?: string

  // Link pubblico
  publicToken?: string // per /q/[token]

  // Versioning
  version: number // versione corrente
  parentId?: string // ID del preventivo originale (se è una revisione)
  revisions?: string[] // IDs delle revisioni (versioni successive)
}

/* ─────────────────────────────────────────────────────────────────────────────
   PERSISTENCE (JSON, come leads.ts)
───────────────────────────────────────────────────────────────────────────── */

let memory: Quote[] | null = null
let writableFile: string | null | undefined

function candidates() {
  return [
    process.env.QUOTES_DATA_PATH,
    path.join(process.cwd(), 'data', 'quotes.json'),
    path.join(tmpdir(), 'arteparquet-quotes.json'),
  ].filter((p): p is string => Boolean(p))
}

async function loadFromDisk(): Promise<Quote[]> {
  for (const file of candidates()) {
    try {
      const raw = await readFile(file, 'utf8')
      const parsed = JSON.parse(raw) as Quote[]
      if (Array.isArray(parsed)) return parsed
    } catch {
      /* try next */
    }
  }
  return []
}

async function readAll(): Promise<Quote[]> {
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
      console.error('[quotes] cannot write to', file, err)
    }
  }
  writableFile = null
  return null
}

async function writeAll(quotes: Quote[]) {
  memory = quotes
  const file = await resolveWritable()
  if (!file) return
  try {
    await writeFile(file, JSON.stringify(quotes, null, 2), 'utf8')
  } catch (err) {
    console.error('[quotes] persist failed:', err)
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   NUMBER GENERATION
───────────────────────────────────────────────────────────────────────────── */

/**
 * Genera numero preventivo: AP-2026-001
 */
export async function generateQuoteNumber(): Promise<string> {
  const quotes = await readAll()
  const year = new Date().getFullYear()
  const thisYear = quotes.filter((q) => q.number.includes(`-${year}-`))
  const next = thisYear.length + 1
  return `AP-${year}-${String(next).padStart(3, '0')}`
}

/**
 * Genera token pubblico sicuro (32 char hex)
 */
export function generatePublicToken(): string {
  return createHash('sha256').update(randomUUID()).digest('hex').slice(0, 32)
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────────────────────────────────────── */

export async function createQuote(
  input: Omit<Quote, 'id' | 'number' | 'createdAt' | 'updatedAt' | 'status' | 'publicToken' | 'version'>,
): Promise<Quote> {
  const quote: Quote = {
    ...input,
    id: randomUUID(),
    number: await generateQuoteNumber(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    publicToken: generatePublicToken(),
    version: 1,
    revisions: [],
  }
  const quotes = await readAll()
  quotes.unshift(quote)
  await writeAll(quotes)
  return quote
}

export async function listQuotes(filter?: { status?: QuoteStatus }): Promise<Quote[]> {
  const all = await readAll()
  if (!filter?.status) return all
  return all.filter((q) => q.status === filter.status)
}

export async function getQuote(id: string): Promise<Quote | null> {
  const quotes = await readAll()
  return quotes.find((q) => q.id === id) ?? null
}

export async function getQuoteByToken(token: string): Promise<Quote | null> {
  const quotes = await readAll()
  return quotes.find((q) => q.publicToken === token) ?? null
}

export async function updateQuote(id: string, patch: Partial<Quote>): Promise<Quote | null> {
  const quotes = await readAll()
  const idx = quotes.findIndex((q) => q.id === id)
  if (idx < 0) return null
  quotes[idx] = {
    ...quotes[idx],
    ...patch,
    id: quotes[idx].id, // preserve ID
    updatedAt: new Date().toISOString(),
  }
  await writeAll(quotes)
  return quotes[idx]
}

export async function deleteQuote(id: string): Promise<string | null> {
  const quotes = await readAll()
  const filtered = quotes.filter((q) => q.id !== id)
  if (filtered.length === quotes.length) return null
  await writeAll(filtered)
  return id
}

/**
 * Tracking apertura cliente
 */
export async function trackQuoteView(token: string): Promise<void> {
  const quote = await getQuoteByToken(token)
  if (!quote) return
  if (quote.status === 'draft') {
    await updateQuote(quote.id, { status: 'viewed', viewedAt: new Date().toISOString() })
  } else if (quote.status === 'sent' && !quote.viewedAt) {
    await updateQuote(quote.id, { viewedAt: new Date().toISOString(), status: 'viewed' })
  }
}

/**
 * Accettazione cliente
 */
export async function acceptQuote(token: string): Promise<Quote | null> {
  const quote = await getQuoteByToken(token)
  if (!quote || quote.status === 'accepted') return quote
  return updateQuote(quote.id, {
    status: 'accepted',
    acceptedAt: new Date().toISOString(),
  })
}

/**
 * Rifiuto cliente
 */
export async function declineQuote(token: string): Promise<Quote | null> {
  const quote = await getQuoteByToken(token)
  if (!quote || quote.status === 'declined') return quote
  return updateQuote(quote.id, {
    status: 'declined',
    declinedAt: new Date().toISOString(),
  })
}

/**
 * Crea una nuova versione di un preventivo esistente.
 * Usato quando si modifica un preventivo già inviato/visualizzato.
 */
export async function createRevision(originalId: string): Promise<Quote | null> {
  const original = await getQuote(originalId)
  if (!original) return null

  // Crea nuova versione
  const revision: Quote = {
    ...original,
    id: randomUUID(),
    version: original.version + 1,
    parentId: original.parentId || original.id, // mantieni riferimento all'originale
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    publicToken: generatePublicToken(),
    sentAt: undefined,
    viewedAt: undefined,
    acceptedAt: undefined,
    declinedAt: undefined,
    revisions: [],
  }

  const quotes = await readAll()
  quotes.unshift(revision)

  // Aggiorna l'originale con il riferimento alla revisione
  const originalIdx = quotes.findIndex((q) => q.id === originalId)
  if (originalIdx >= 0) {
    quotes[originalIdx] = {
      ...quotes[originalIdx],
      revisions: [...(quotes[originalIdx].revisions || []), revision.id],
      updatedAt: new Date().toISOString(),
    }
  }

  await writeAll(quotes)
  return revision
}

/**
 * Ottieni tutte le versioni di un preventivo (originale + revisioni)
 */
export async function getQuoteVersions(quoteId: string): Promise<Quote[]> {
  const quotes = await readAll()
  const quote = quotes.find((q) => q.id === quoteId)
  if (!quote) return []

  const rootId = quote.parentId || quote.id
  const versions = quotes.filter((q) => q.id === rootId || q.parentId === rootId)
  return versions.sort((a, b) => a.version - b.version)
}
