'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Lead } from '@/lib/leads'
import type { QuoteLine } from '@/lib/quotes'
import type { CatalogItem } from '@/lib/catalog'
import { formatMoney, lineSubtotal, applyDiscount, calcTotal } from '@/lib/money'
import CatalogSelector from './_components/catalog-selector'
import { CrmShell } from '@/components/crm/crm-shell'

export default function NuovoPreventivoPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [saving, setSaving] = useState(false)

  // Form state
  const [clientId, setClientId] = useState('')
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectAddress, setProjectAddress] = useState('')
  const [lines, setLines] = useState<QuoteLine[]>([])
  const [discountPercent, setDiscountPercent] = useState(0)
  const [taxPercent, setTaxPercent] = useState(22)
  const [notes, setNotes] = useState('')
  const [terms, setTerms] = useState(
    'Offerta valida 30 giorni. Pagamento 50% acconto, 50% a saldo lavori.',
  )
  const [validUntil, setValidUntil] = useState('')

  useEffect(() => {
    // Carica lead per selettore cliente
    void fetch('/api/crm/leads')
      .then((r) => r.json())
      .then((data: { leads: Lead[] }) => {
        setLeads(data.leads.filter((l) => l.leadType === 'b2c' || !l.leadType))
      })
  }, [])

  const selectedLead = leads.find((l) => l.id === clientId)

  // Calcolo totali
  const subtotalCents = lines.reduce((acc, line) => {
    return acc + lineSubtotal(line.quantity, line.unitPriceCents)
  }, 0)
  const afterDiscountCents = applyDiscount(subtotalCents, discountPercent)
  const totalCents = calcTotal(afterDiscountCents, taxPercent)
  const taxCents = totalCents - afterDiscountCents

  function addLine() {
    setLines([
      ...lines,
      {
        id: crypto.randomUUID(),
        description: '',
        quantity: 1,
        unit: 'm²',
        unitPriceCents: 0,
        order: lines.length,
      },
    ])
  }

  function addLineFromCatalog(item: CatalogItem) {
    setLines([
      ...lines,
      {
        id: crypto.randomUUID(),
        description: item.name,
        category: item.category,
        quantity: 1,
        unit: item.unit,
        unitPriceCents: item.defaultPriceCents,
        order: lines.length,
      },
    ])
  }

  function updateLine(id: string, patch: Partial<QuoteLine>) {
    setLines(lines.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }

  function removeLine(id: string) {
    setLines(lines.filter((l) => l.id !== id))
  }

  async function saveDraft() {
    if (!clientId || !selectedLead) {
      alert('Seleziona un cliente')
      return
    }

    setSaving(true)
    const res = await fetch('/api/crm/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        clientName: selectedLead.name,
        clientPhone: selectedLead.phone,
        clientEmail: selectedLead.email,
        clientCity: selectedLead.city,
        projectTitle,
        projectDescription,
        projectAddress,
        lines,
        subtotalCents,
        discountPercent,
        taxPercent,
        totalCents,
        notes,
        terms,
        validUntil,
      }),
    })
    setSaving(false)

    if (res.ok) {
      const data = (await res.json()) as { quote: { id: string } }
      router.push(`/crm/preventivi`)
    } else {
      alert('Errore salvando il preventivo')
    }
  }

  return (
    <CrmShell>
    <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              href="/crm/preventivi"
              className="text-xs font-semibold uppercase tracking-widest text-rovere mb-2 inline-block hover:underline"
            >
              ← Torna ai preventivi
            </Link>
            <h1 className="font-serif text-3xl text-legno-bruciato">Nuovo preventivo</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => void saveDraft()}
              disabled={saving || !clientId}
              className="bg-rovere text-white rounded-xl px-6 py-3 font-semibold disabled:opacity-50 hover:bg-opacity-90"
            >
              {saving ? 'Salvataggio...' : 'Salva bozza'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* EDITOR (left) */}
          <div className="space-y-6">
            {/* Cliente */}
            <section className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-semibold text-legno-bruciato mb-4">Cliente</h2>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-legno-bruciato"
              >
                <option value="">Seleziona cliente...</option>
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} · {lead.phone}
                    {lead.city ? ` · ${lead.city}` : ''}
                  </option>
                ))}
              </select>
              {selectedLead && (
                <div className="mt-3 text-sm text-neutral-600">
                  <p>
                    <strong>Tel:</strong> {selectedLead.phone}
                  </p>
                  {selectedLead.email && (
                    <p>
                      <strong>Email:</strong> {selectedLead.email}
                    </p>
                  )}
                  {selectedLead.city && (
                    <p>
                      <strong>Città:</strong> {selectedLead.city}
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Progetto */}
            <section className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-semibold text-legno-bruciato mb-4">Progetto</h2>
              <input
                type="text"
                placeholder="Titolo progetto (es. Parquet soggiorno + cucina)"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 mb-3"
              />
              <textarea
                placeholder="Descrizione (opzionale)"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 mb-3"
                rows={3}
              />
              <input
                type="text"
                placeholder="Indirizzo cantiere (opzionale)"
                value={projectAddress}
                onChange={(e) => setProjectAddress(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2"
              />
            </section>

            {/* Lavorazioni */}
            <section className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-legno-bruciato">Lavorazioni</h2>
                <div className="flex gap-3">
                  <button
                    onClick={addLine}
                    className="text-sm font-semibold text-rovere hover:underline"
                  >
                    + Aggiungi riga
                  </button>
                </div>
              </div>
              
              <CatalogSelector onSelect={addLineFromCatalog} />

              {lines.length === 0 ? (
                <p className="text-sm text-neutral-500 text-center py-4">
                  Nessuna lavorazione. Clicca "+ Aggiungi riga" per iniziare.
                </p>
              ) : (
                <div className="space-y-3">
                  {lines.map((line, idx) => (
                    <div
                      key={line.id}
                      className="border border-neutral-200 rounded-lg p-4 bg-neutral-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-neutral-400">
                          #{idx + 1}
                        </span>
                        <button
                          onClick={() => removeLine(line.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Rimuovi
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Descrizione lavorazione"
                        value={line.description}
                        onChange={(e) => updateLine(line.id, { description: e.target.value })}
                        className="w-full border border-neutral-200 rounded px-2 py-1.5 mb-2 text-sm"
                      />
                      <div className="grid grid-cols-4 gap-2">
                        <input
                          type="number"
                          placeholder="Qtà"
                          value={line.quantity || ''}
                          onChange={(e) =>
                            updateLine(line.id, { quantity: parseFloat(e.target.value) || 0 })
                          }
                          className="border border-neutral-200 rounded px-2 py-1.5 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="U.M."
                          value={line.unit}
                          onChange={(e) => updateLine(line.id, { unit: e.target.value })}
                          className="border border-neutral-200 rounded px-2 py-1.5 text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Prezzo €"
                          value={line.unitPriceCents ? line.unitPriceCents / 100 : ''}
                          onChange={(e) =>
                            updateLine(line.id, {
                              unitPriceCents: Math.round(parseFloat(e.target.value || '0') * 100),
                            })
                          }
                          step="0.01"
                          className="border border-neutral-200 rounded px-2 py-1.5 text-sm"
                        />
                        <div className="flex items-center justify-end text-sm font-semibold text-legno-bruciato">
                          {formatMoney(lineSubtotal(line.quantity, line.unitPriceCents))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Totali & Condizioni */}
            <section className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-semibold text-legno-bruciato mb-4">Totali</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotale</span>
                  <span className="font-semibold">{formatMoney(subtotalCents)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-600">Sconto</span>
                    <input
                      type="number"
                      value={discountPercent || ''}
                      onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                      className="w-16 border border-neutral-200 rounded px-2 py-0.5 text-xs"
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                    <span className="text-xs text-neutral-400">%</span>
                  </div>
                  <span className="font-semibold text-red-600">
                    -{formatMoney(subtotalCents - afterDiscountCents)}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Imponibile</span>
                  <span className="font-semibold">{formatMoney(afterDiscountCents)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-600">IVA</span>
                    <input
                      type="number"
                      value={taxPercent || ''}
                      onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                      className="w-16 border border-neutral-200 rounded px-2 py-0.5 text-xs"
                      placeholder="22"
                      min="0"
                      max="100"
                    />
                    <span className="text-xs text-neutral-400">%</span>
                  </div>
                  <span className="font-semibold">{formatMoney(taxCents)}</span>
                </div>
                <div className="border-t-2 border-neutral-300 pt-3" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-legno-bruciato text-lg">TOTALE</span>
                  <span className="font-bold text-legno-bruciato text-2xl">
                    {formatMoney(totalCents)}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-legno-bruciato mb-2 mt-6">Condizioni</h3>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm mb-3"
                rows={3}
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-neutral-600 mb-1 block">Valido fino al</label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Note */}
            <section className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-semibold text-legno-bruciato mb-4">Note (opzionali)</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Note interne o per il cliente..."
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                rows={4}
              />
            </section>
          </div>

          {/* PREVIEW (right) */}
          <div className="lg:sticky lg:top-10 lg:h-fit">
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6">
                Anteprima Preventivo
              </h3>

              {/* Logo area */}
              <div className="mb-8">
                <p className="font-serif text-3xl text-legno-bruciato">ARTEPARQUET</p>
                <p className="text-xs text-neutral-500 mt-1">Proposta di fornitura e posa</p>
              </div>

              {/* Cliente */}
              {selectedLead && (
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <p className="text-xs font-semibold uppercase text-neutral-400 mb-2">
                    Cliente
                  </p>
                  <p className="font-semibold text-legno-bruciato">{selectedLead.name}</p>
                  <p className="text-sm text-neutral-600">{selectedLead.phone}</p>
                  {selectedLead.email && (
                    <p className="text-sm text-neutral-600">{selectedLead.email}</p>
                  )}
                  {selectedLead.city && (
                    <p className="text-sm text-neutral-600">{selectedLead.city}</p>
                  )}
                </div>
              )}

              {/* Progetto */}
              {projectTitle && (
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <p className="text-xs font-semibold uppercase text-neutral-400 mb-2">
                    Progetto
                  </p>
                  <p className="font-semibold text-legno-bruciato">{projectTitle}</p>
                  {projectDescription && (
                    <p className="text-sm text-neutral-600 mt-1">{projectDescription}</p>
                  )}
                  {projectAddress && (
                    <p className="text-sm text-neutral-600 mt-1">{projectAddress}</p>
                  )}
                </div>
              )}

              {/* Lavorazioni */}
              {lines.length > 0 && (
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <p className="text-xs font-semibold uppercase text-neutral-400 mb-3">
                    Lavorazioni
                  </p>
                  <div className="space-y-3">
                    {lines.map((line, idx) => (
                      <div key={line.id} className="text-sm">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-legno-bruciato flex-1">
                            {idx + 1}. {line.description || '(descrizione mancante)'}
                          </p>
                          <p className="font-semibold text-legno-bruciato whitespace-nowrap">
                            {formatMoney(lineSubtotal(line.quantity, line.unitPriceCents))}
                          </p>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {line.quantity} {line.unit} × {formatMoney(line.unitPriceCents)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Totali */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotale</span>
                  <span>{formatMoney(subtotalCents)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Sconto ({discountPercent}%)</span>
                    <span className="text-red-600">
                      -{formatMoney(subtotalCents - afterDiscountCents)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">IVA ({taxPercent}%)</span>
                  <span>{formatMoney(taxCents)}</span>
                </div>
                <div className="border-t-2 border-neutral-300 pt-3 mt-3" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-legno-bruciato text-lg">TOTALE</span>
                  <span className="font-bold text-legno-bruciato text-2xl">
                    {formatMoney(totalCents)}
                  </span>
                </div>
              </div>

              {/* Condizioni */}
              {terms && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-xs font-semibold uppercase text-neutral-400 mb-2">
                    Condizioni
                  </p>
                  <p className="text-xs text-neutral-600 whitespace-pre-wrap">{terms}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
    </CrmShell>
  )
}
