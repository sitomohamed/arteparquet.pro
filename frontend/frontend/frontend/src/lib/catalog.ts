import { mkdir, readFile, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { randomUUID } from 'crypto'

/* ─────────────────────────────────────────────────────────────────────────────
   CATALOG — Lavorazioni e materiali riutilizzabili
───────────────────────────────────────────────────────────────────────────── */

export const CATALOG_CATEGORIES = [
  'parquet',
  'levigatura',
  'posa',
  'restauro',
  'battiscopa',
  'spc',
  'pvc',
  'collanti',
  'finiture',
  'trattamenti',
  'trasporto',
  'altro',
] as const

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number]

export type CatalogItem = {
  id: string
  name: string
  description?: string
  category: CatalogCategory
  unit: string // m², pz, ml, etc.
  defaultPriceCents: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

/* ─────────────────────────────────────────────────────────────────────────────
   PERSISTENCE
───────────────────────────────────────────────────────────────────────────── */

let memory: CatalogItem[] | null = null
let writableFile: string | null | undefined

function candidates() {
  return [
    process.env.CATALOG_DATA_PATH,
    path.join(process.cwd(), 'data', 'catalog.json'),
    path.join(tmpdir(), 'arteparquet-catalog.json'),
  ].filter((p): p is string => Boolean(p))
}

async function loadFromDisk(): Promise<CatalogItem[]> {
  for (const file of candidates()) {
    try {
      const raw = await readFile(file, 'utf8')
      const parsed = JSON.parse(raw) as CatalogItem[]
      if (Array.isArray(parsed)) return parsed
    } catch {
      /* try next */
    }
  }
  return getDefaultCatalog()
}

async function readAll(): Promise<CatalogItem[]> {
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
      console.error('[catalog] cannot write to', file, err)
    }
  }
  writableFile = null
  return null
}

async function writeAll(items: CatalogItem[]) {
  memory = items
  const file = await resolveWritable()
  if (!file) return
  try {
    await writeFile(file, JSON.stringify(items, null, 2), 'utf8')
  } catch (err) {
    console.error('[catalog] persist failed:', err)
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   DEFAULT CATALOG
───────────────────────────────────────────────────────────────────────────── */

function getDefaultCatalog(): CatalogItem[] {
  return [
    {
      id: '1',
      name: 'Parquet rovere spazzolato',
      description: 'Parquet prefinito in rovere spazzolato, 14mm',
      category: 'parquet',
      unit: 'm²',
      defaultPriceCents: 4800, // 48€/m²
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Parquet rovere naturale',
      description: 'Parquet prefinito in rovere naturale, 14mm',
      category: 'parquet',
      unit: 'm²',
      defaultPriceCents: 4500,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Posa parquet incollata',
      description: 'Posa tradizionale con colla poliuretanica',
      category: 'posa',
      unit: 'm²',
      defaultPriceCents: 2500, // 25€/m²
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Levigatura e verniciatura',
      description: 'Levigatura + finitura con vernice poliuretanica',
      category: 'levigatura',
      unit: 'm²',
      defaultPriceCents: 3000, // 30€/m²
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Battiscopa in legno',
      description: 'Battiscopa in legno coordinato al parquet, h 7cm',
      category: 'battiscopa',
      unit: 'ml',
      defaultPriceCents: 1200, // 12€/ml
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Restauro parquet storico',
      description: 'Restauro conservativo di parquet d\'epoca',
      category: 'restauro',
      unit: 'm²',
      defaultPriceCents: 5000, // 50€/m²
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '7',
      name: 'Pavimento SPC',
      description: 'Pavimento SPC Stone Plastic Composite, effetto legno',
      category: 'spc',
      unit: 'm²',
      defaultPriceCents: 2800,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '8',
      name: 'Trasporto e scarico',
      description: 'Trasporto materiali e scarico in cantiere',
      category: 'trasporto',
      unit: 'pz',
      defaultPriceCents: 15000, // 150€ fisso
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────────────────────────────────────── */

export async function listCatalogItems(filter?: {
  category?: CatalogCategory
  active?: boolean
}): Promise<CatalogItem[]> {
  const all = await readAll()
  return all.filter((item) => {
    if (filter?.category && item.category !== filter.category) return false
    if (filter?.active !== undefined && item.isActive !== filter.active) return false
    return true
  })
}

export async function getCatalogItem(id: string): Promise<CatalogItem | null> {
  const items = await readAll()
  return items.find((item) => item.id === id) ?? null
}

export async function createCatalogItem(
  input: Omit<CatalogItem, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<CatalogItem> {
  const item: CatalogItem = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const items = await readAll()
  items.unshift(item)
  await writeAll(items)
  return item
}

export async function updateCatalogItem(
  id: string,
  patch: Partial<CatalogItem>,
): Promise<CatalogItem | null> {
  const items = await readAll()
  const idx = items.findIndex((item) => item.id === id)
  if (idx < 0) return null
  items[idx] = {
    ...items[idx],
    ...patch,
    id: items[idx].id,
    updatedAt: new Date().toISOString(),
  }
  await writeAll(items)
  return items[idx]
}

export async function deleteCatalogItem(id: string): Promise<string | null> {
  const items = await readAll()
  const filtered = items.filter((item) => item.id !== id)
  if (filtered.length === items.length) return null
  await writeAll(filtered)
  return id
}

/**
 * Cerca nel catalogo per nome/descrizione
 */
export async function searchCatalog(query: string): Promise<CatalogItem[]> {
  const all = await readAll()
  const q = query.toLowerCase()
  return all.filter(
    (item) =>
      item.isActive &&
      (item.name.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category.includes(q)),
  )
}
