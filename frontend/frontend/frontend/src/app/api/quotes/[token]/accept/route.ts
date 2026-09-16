import { NextRequest, NextResponse } from 'next/server'
import { acceptQuote } from '@/lib/quotes'

type Params = {
  token: string
}

export async function POST(req: NextRequest, context: { params: Promise<Params> }) {
  const { token } = await context.params
  const quote = await acceptQuote(token)

  if (!quote) {
    return NextResponse.json({ error: 'Preventivo non trovato' }, { status: 404 })
  }

  return NextResponse.json({ quote })
}
