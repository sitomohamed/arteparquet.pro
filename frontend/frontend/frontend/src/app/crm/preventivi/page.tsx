'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import type { Quote } from '@/lib/quotes'
import { formatMoney } from '@/lib/money'
import { CrmShell } from '@/components/crm/crm-shell'

const STATUS_LABELS: Record<Quote['status'], string> = {
  draft: 'Bozza',
  sent: 'Inviato',
  viewed: 'Visualizzato',
  accepted: '✅ Accettato',
  declined: '❌ Rifiutato',
  expired: 'Scaduto',
}

const STATUS_COLORS: Record<Quote['status'], string> = {
  draft: 'bg-neutral-100 text-neutral-700',
  sent: 'bg-blue-100 text-blue-700',
  viewed: 'bg-amber-100 text-amber-700',
  accepted: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-700',
  expired: 'bg-neutral-200 text-neutral-500',
}

export default function PreventiviPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Quote['status'] | 'all'>('all')

  const load = useCallback(async () => {
    setLoading(true)
    const url = filter === 'all' ? '/api/crm/quotes' : `/api/crm/quotes?status=${filter}`
    const res = await fetch(url)
    if (res.ok) {
      const data = (await res.json()) as { quotes: Quote[] }
      setQuotes(data.quotes)
    }
    setLoading(false)
  }, [filter])

  useEffect(() => {
    void load()
  }, [load])

  const filteredQuotes = filter === 'all' ? quotes : quotes.filter((q) => q.status === filter)

  // Stats
  const drafts = quotes.filter((q) => q.status === 'draft').length
  const sent = quotes.filter((q) => q.status === 'sent').length
  const viewed = quotes.filter((q) => q.status === 'viewed').length
  const accepted = quotes.filter((q) => q.status === 'accepted').length

  return (
    <CrmShell>
    <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-rovere mb-2">
              Area riservata
            </p>
            <h1 className="font-serif text-3xl text-legno-bruciato">Preventivi</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {quotes.length} preventivi · {drafts} bozze · {accepted} accettati
            </p>
          </div>
          <Link
            href="/crm/preventivi/nuovo"
            className="bg-rovere text-white rounded-xl px-6 py-3 font-semibold hover:bg-opacity-90 transition-opacity"
          >
            + Nuovo preventivo
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">Bozze</p>
            <p className="text-2xl font-bold text-legno-bruciato mt-1">{drafts}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">Inviati</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{sent}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">Visualizzati</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{viewed}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">Accettati</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{accepted}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'draft', 'sent', 'viewed', 'accepted', 'declined'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === s
                  ? 'bg-rovere text-white'
                  : 'bg-white text-neutral-700 border border-neutral-200'
              }`}
            >
              {s === 'all' ? 'Tutti' : STATUS_LABELS[s as Quote['status']]}
            </button>
          ))}
        </div>

        {/* Lista preventivi */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
            <p className="text-neutral-500">Caricamento...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
            <p className="text-neutral-700 mb-3">Nessun preventivo trovato.</p>
            <Link
              href="/crm/preventivi/nuovo"
              className="inline-flex bg-rovere text-white rounded-xl px-6 py-3 font-semibold hover:bg-opacity-90"
            >
              Crea il primo preventivo
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <Link
                key={quote.id}
                href={`/crm/preventivi/${quote.id}`}
                className="block bg-white rounded-2xl border border-neutral-200 p-5 hover:border-rovere transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-semibold text-legno-bruciato text-lg">
                        {quote.number}
                      </h2>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          STATUS_COLORS[quote.status]
                        }`}
                      >
                        {STATUS_LABELS[quote.status]}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">
                      {new Date(quote.createdAt).toLocaleDateString('it-IT')}
                      {quote.sentAt &&
                        ` · Inviato ${new Date(quote.sentAt).toLocaleDateString('it-IT')}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-legno-bruciato">
                      {formatMoney(quote.totalCents)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-3">
                  <p className="font-semibold text-legno-bruciato">{quote.clientName}</p>
                  <p className="text-sm text-neutral-600">
                    {quote.clientPhone}
                    {quote.clientEmail && ` · ${quote.clientEmail}`}
                    {quote.clientCity && ` · ${quote.clientCity}`}
                  </p>
                  {quote.projectTitle && (
                    <p className="text-sm text-neutral-600 mt-1">{quote.projectTitle}</p>
                  )}
                  {quote.lines.length > 0 && (
                    <p className="text-xs text-neutral-400 mt-2">
                      {quote.lines.length} {quote.lines.length === 1 ? 'voce' : 'voci'}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back to CRM */}
        <div className="mt-8">
          <Link
            href="/crm"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-rovere"
          >
            ← Torna al CRM
          </Link>
        </div>
      </div>
    </main>
    </CrmShell>
  )
}
