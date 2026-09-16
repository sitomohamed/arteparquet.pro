import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import {
  listCatalogItems,
  getCatalogItem,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  searchCatalog,
  type CatalogItem,
  type CatalogCategory,
} from '@/lib/catalog'

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/crm/catalog — Lista o ricerca catalogo
───────────────────────────────────────────────────────────────────────────── */

export async function GET(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const url = new URL(req.url)
  const search = url.searchParams.get('search')
  const category = url.searchParams.get('category') as CatalogCategory | null
  const active = url.searchParams.get('active')

  if (search) {
    const items = await searchCatalog(search)
    return NextResponse.json({ items })
  }

  const items = await listCatalogItems({
    category: category ?? undefined,
    active: active === 'true' ? true : active === 'false' ? false : undefined,
  })

  return NextResponse.json({ items })
}

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/crm/catalog — Crea voce catalogo
───────────────────────────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = (await req.json()) as Partial<CatalogItem>

  if (!body.name || !body.category || !body.unit) {
    return NextResponse.json(
      { error: 'Nome, categoria e unità obbligatori' },
      { status: 400 },
    )
  }

  const item = await createCatalogItem({
    name: body.name,
    description: body.description,
    category: body.category,
    unit: body.unit,
    defaultPriceCents: body.defaultPriceCents ?? 0,
    isActive: body.isActive ?? true,
  })

  return NextResponse.json({ item }, { status: 201 })
}

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /api/crm/catalog — Aggiorna voce catalogo
───────────────────────────────────────────────────────────────────────────── */

export async function PATCH(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = (await req.json()) as { id: string } & Partial<CatalogItem>
  if (!body.id) {
    return NextResponse.json({ error: 'ID mancante' }, { status: 400 })
  }

  const item = await updateCatalogItem(body.id, body)
  if (!item) {
    return NextResponse.json({ error: 'Voce non trovata' }, { status: 404 })
  }

  return NextResponse.json({ item })
}

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/crm/catalog — Elimina voce catalogo
───────────────────────────────────────────────────────────────────────────── */

export async function DELETE(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID mancante' }, { status: 400 })
  }

  const deleted = await deleteCatalogItem(id)
  if (!deleted) {
    return NextResponse.json({ error: 'Voce non trovata' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
