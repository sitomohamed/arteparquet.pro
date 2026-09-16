import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import { getQuote, createRevision } from '@/lib/quotes'

/**
 * POST /api/crm/quotes/revise
 * Crea una nuova versione di un preventivo esistente
 */
export async function POST(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = (await req.json()) as { quoteId: string }
  if (!body.quoteId) {
    return NextResponse.json({ error: 'ID preventivo mancante' }, { status: 400 })
  }

  const original = await getQuote(body.quoteId)
  if (!original) {
    return NextResponse.json({ error: 'Preventivo non trovato' }, { status: 404 })
  }

  const revision = await createRevision(body.quoteId)
  if (!revision) {
    return NextResponse.json({ error: 'Errore creando la revisione' }, { status: 500 })
  }

  return NextResponse.json({ revision }, { status: 201 })
}
