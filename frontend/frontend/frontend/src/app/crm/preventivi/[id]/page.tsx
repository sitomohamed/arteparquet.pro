'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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

export default function PreventivDettaglioPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/crm/quotes')
    if (res.ok) {
      const data = (await res.json()) as { quotes: Quote[] }
      const found = data.quotes.find((q) => q.id === id)
      setQuote(found ?? null)
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  async function sendToClient() {
    if (!quote || !quote.clientEmail) {
      alert('Email cliente mancante')
      return
    }

    if (!confirm(`Inviare preventivo a ${quote.clientEmail}?`)) return

    setSending(true)
    const res = await fetch('/api/crm/quotes/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quoteId: quote.id }),
    })
    setSending(false)

    if (res.ok) {
      alert('Preventivo inviato!')
      void load()
    } else {
      const data = await res.json().catch(() => ({ error: 'Errore sconosciuto' }))
      alert(`Errore: ${data.error}`)
    }
  }

  async function copyLink() {
    if (!quote?.publicToken) return
    const link = `${window.location.origin}/q/${quote.publicToken}`
    await navigator.clipboard.writeText(link)
    alert('Link copiato negli appunti!')
  }

  async function createNewVersion() {
    if (!quote) return
    if (!confirm('Creare una nuova versione di questo preventivo? La versione attuale sarà archiviata.')) return

    const res = await fetch('/api/crm/quotes/revise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quoteId: quote.id }),
    })

    if (res.ok) {
      const data = (await res.json()) as { revision: Quote }
      router.push(`/crm/preventivi/${data.revision.id}`)
    } else {
      alert('Errore creando la revisione')
    }
  }

  async function convertToJob() {
    if (!quote) return
    if (!confirm(`Convertire il preventivo ${quote.number} in lavoro?`)) return

    const res = await fetch('/api/crm/quotes/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quoteId: quote.id }),
    })

    if (res.ok) {
      const data = (await res.json()) as { job: { id: string; number: string } }
      alert(`Lavoro ${data.job.number} creato con successo!`)
      router.push('/crm/lavori')
    } else {
      const data = await res.json().catch(() => ({ error: 'Errore sconosciuto' }))
      alert(`Errore: ${data.error}`)
    }
  }

  if (loading) {
    return (
      <CrmShell>
      <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
        <div className="max-w-4xl mx-auto">
          <p className="text-neutral-500">Caricamento...</p>
        </div>
      </main>
      </CrmShell>
    )
  }

  if (!quote) {
    return (
      <CrmShell>
      <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600 mb-4">Preventivo non trovato.</p>
          <Link href="/crm/preventivi" className="text-rovere hover:underline">
            ← Torna ai preventivi
          </Link>
        </div>
      </main>
      </CrmShell>
    )
  }

  const publicLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/q/${quote.publicToken}`

  return (
    <CrmShell>
    <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link
          href="/crm/preventivi"
          className="text-xs font-semibold uppercase tracking-widest text-rovere mb-4 inline-block hover:underline"
        >
          ← Torna ai preventivi
        </Link>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-serif text-3xl text-legno-bruciato">{quote.number}</h1>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded ${STATUS_COLORS[quote.status]}`}
              >
                {STATUS_LABELS[quote.status]}
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              Creato {new Date(quote.createdAt).toLocaleDateString('it-IT')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-legno-bruciato">
              {formatMoney(quote.totalCents)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="font-semibold text-legno-bruciato mb-4">Azioni</h2>
          <div className="space-y-4">
            {/* Link pubblico */}
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Link pubblico
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={publicLink}
                  readOnly
                  className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-neutral-50"
                />
                <button
                  onClick={() => void copyLink()}
                  className="bg-rovere text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-opacity-90"
                >
                  Copia
                </button>
              </div>
            </div>

            {/* Invio email */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => void sendToClient()}
                disabled={sending || !quote.clientEmail}
                className="bg-green-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {sending ? 'Invio...' : '📧 Invia via email'}
              </button>
              {!quote.clientEmail && (
                <p className="text-sm text-red-600 flex items-center">
                  Email cliente mancante
                </p>
              )}
            </div>

            {/* Versioning - Crea nuova versione se già inviato */}
            {(quote.status === 'sent' || quote.status === 'viewed') && (
              <div className="pt-3 border-t border-neutral-200">
                <button
                  onClick={() => void createNewVersion()}
                  className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700"
                >
                  📝 Crea nuova versione
                </button>
                <p className="text-xs text-neutral-500 mt-2">
                  Crea una revisione per modificare il preventivo senza perdere la versione precedente
                </p>
              </div>
            )}

            {/* Converti in lavoro se accettato */}
            {quote.status === 'accepted' && (
              <div className="pt-3 border-t border-neutral-200">
                <button
                  onClick={() => void convertToJob()}
                  className="bg-rovere text-white rounded-lg px-6 py-3 font-semibold hover:bg-opacity-90"
                >
                  🔨 Converti in lavoro
                </button>
                <p className="text-xs text-neutral-500 mt-2">
                  Crea un lavoro da questo preventivo accettato
                </p>
              </div>
            )}

            {/* Versione info */}
            {quote.version > 1 && (
              <div className="pt-3 border-t border-neutral-200">
                <p className="text-sm text-neutral-600">
                  📌 Versione {quote.version}
                  {quote.parentId && ' (revisione)'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Dettagli preventivo */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="font-semibold text-legno-bruciato mb-4">Cliente</h2>
          <p className="font-semibold text-legno-bruciato text-lg">{quote.clientName}</p>
          <p className="text-sm text-neutral-600">{quote.clientPhone}</p>
          {quote.clientEmail && <p className="text-sm text-neutral-600">{quote.clientEmail}</p>}
          {quote.clientCity && <p className="text-sm text-neutral-600">{quote.clientCity}</p>}
        </div>

        {quote.projectTitle && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
            <h2 className="font-semibold text-legno-bruciato mb-4">Progetto</h2>
            <p className="font-semibold text-legno-bruciato">{quote.projectTitle}</p>
            {quote.projectDescription && (
              <p className="text-sm text-neutral-600 mt-2 whitespace-pre-wrap">
                {quote.projectDescription}
              </p>
            )}
            {quote.projectAddress && (
              <p className="text-sm text-neutral-600 mt-2">📍 {quote.projectAddress}</p>
            )}
          </div>
        )}

        {/* Lavorazioni */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="font-semibold text-legno-bruciato mb-4">Lavorazioni</h2>
          {quote.lines.length === 0 ? (
            <p className="text-sm text-neutral-500">Nessuna lavorazione</p>
          ) : (
            <div className="space-y-3">
              {quote.lines.map((line, idx) => (
                <div key={line.id} className="border-b border-neutral-100 pb-3 last:border-0">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-legno-bruciato flex-1">
                      {idx + 1}. {line.description}
                    </p>
                    <p className="font-semibold text-legno-bruciato whitespace-nowrap">
                      {formatMoney(Math.round(line.quantity * line.unitPriceCents))}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    {line.quantity} {line.unit} × {formatMoney(line.unitPriceCents)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totali */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="font-semibold text-legno-bruciato mb-4">Totali</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Subtotale</span>
              <span>{formatMoney(quote.subtotalCents)}</span>
            </div>
            {quote.discountPercent > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Sconto ({quote.discountPercent}%)</span>
                <span className="text-red-600">
                  -{formatMoney(Math.round(quote.subtotalCents * (quote.discountPercent / 100)))}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">IVA ({quote.taxPercent}%)</span>
              <span>
                {formatMoney(quote.totalCents - Math.round(quote.subtotalCents * (1 - quote.discountPercent / 100)))}
              </span>
            </div>
            <div className="border-t-2 border-neutral-300 pt-3 mt-3" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-legno-bruciato text-lg">TOTALE</span>
              <span className="font-bold text-legno-bruciato text-2xl">
                {formatMoney(quote.totalCents)}
              </span>
            </div>
          </div>
        </div>

        {/* Tracking */}
        {(quote.sentAt || quote.viewedAt || quote.acceptedAt || quote.declinedAt) && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
            <h3 className="font-semibold text-blue-900 mb-3">📊 Tracking</h3>
            <div className="space-y-1 text-sm">
              {quote.sentAt && (
                <p className="text-blue-700">
                  ✓ Inviato: {new Date(quote.sentAt).toLocaleString('it-IT')}
                </p>
              )}
              {quote.viewedAt && (
                <p className="text-blue-700">
                  ✓ Visualizzato: {new Date(quote.viewedAt).toLocaleString('it-IT')}
                </p>
              )}
              {quote.acceptedAt && (
                <p className="text-green-700">
                  ✅ Accettato: {new Date(quote.acceptedAt).toLocaleString('it-IT')}
                </p>
              )}
              {quote.declinedAt && (
                <p className="text-red-700">
                  ❌ Rifiutato: {new Date(quote.declinedAt).toLocaleString('it-IT')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
    </CrmShell>
  )
}
