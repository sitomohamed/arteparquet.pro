import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import { getQuote } from '@/lib/quotes'
import { createJobFromQuote, getJobByQuoteId } from '@/lib/jobs'

/**
 * POST /api/crm/quotes/convert
 * Converte preventivo accettato in lavoro
 */
export async function POST(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = (await req.json()) as { quoteId: string }
  if (!body.quoteId) {
    return NextResponse.json({ error: 'ID preventivo mancante' }, { status: 400 })
  }

  const quote = await getQuote(body.quoteId)
  if (!quote) {
    return NextResponse.json({ error: 'Preventivo non trovato' }, { status: 404 })
  }

  if (quote.status !== 'accepted') {
    return NextResponse.json(
      { error: 'Il preventivo deve essere accettato prima di convertirlo in lavoro' },
      { status: 400 },
    )
  }

  // Controlla se esiste già un lavoro per questo preventivo
  const existing = await getJobByQuoteId(body.quoteId)
  if (existing) {
    return NextResponse.json(
      { error: 'Esiste già un lavoro per questo preventivo', job: existing },
      { status: 409 },
    )
  }

  const job = await createJobFromQuote(quote)

  return NextResponse.json({ job }, { status: 201 })
}
