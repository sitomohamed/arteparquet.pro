import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import {
  createQuote,
  listQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
  type Quote,
  type QuoteStatus,
} from '@/lib/quotes'

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/crm/quotes — Lista preventivi
───────────────────────────────────────────────────────────────────────────── */

export async function GET(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const url = new URL(req.url)
  const status = url.searchParams.get('status') as QuoteStatus | null
  const quotes = await listQuotes(status ? { status } : undefined)

  return NextResponse.json({ quotes })
}

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/crm/quotes — Crea nuovo preventivo
───────────────────────────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = (await req.json()) as Partial<Quote>

  // Validazione base
  if (!body.clientId || !body.clientName || !body.clientPhone) {
    return NextResponse.json({ error: 'Cliente obbligatorio' }, { status: 400 })
  }

  const quote = await createQuote({
    clientId: body.clientId,
    clientName: body.clientName,
    clientPhone: body.clientPhone,
    clientEmail: body.clientEmail,
    clientCity: body.clientCity,
    projectTitle: body.projectTitle,
    projectDescription: body.projectDescription,
    projectAddress: body.projectAddress,
    lines: body.lines ?? [],
    subtotalCents: body.subtotalCents ?? 0,
    discountPercent: body.discountPercent ?? 0,
    taxPercent: body.taxPercent ?? 22,
    totalCents: body.totalCents ?? 0,
    notes: body.notes,
    terms: body.terms,
    validUntil: body.validUntil,
    paymentTerms: body.paymentTerms,
  })

  return NextResponse.json({ quote }, { status: 201 })
}

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /api/crm/quotes — Aggiorna preventivo
───────────────────────────────────────────────────────────────────────────── */

export async function PATCH(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = (await req.json()) as { id: string } & Partial<Quote>
  if (!body.id) {
    return NextResponse.json({ error: 'ID mancante' }, { status: 400 })
  }

  const quote = await updateQuote(body.id, body)
  if (!quote) {
    return NextResponse.json({ error: 'Preventivo non trovato' }, { status: 404 })
  }

  return NextResponse.json({ quote })
}

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/crm/quotes — Elimina preventivo
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

  const deleted = await deleteQuote(id)
  if (!deleted) {
    return NextResponse.json({ error: 'Preventivo non trovato' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
