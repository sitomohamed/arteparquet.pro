'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Lead, LeadStatus } from '@/lib/leads'

const LABELS: Record<LeadStatus, string> = {
  new: 'Nuovo',
  contacted: 'Contattato',
  quote: 'Preventivo',
  won: 'Vinto',
  lost: 'Perso',
}

export default function CrmPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])

  const load = useCallback(async () => {
    const res = await fetch('/api/crm/leads')
    if (res.status === 401) {
      setAuthed(false)
      return
    }
    if (!res.ok) {
      setError('Impossibile caricare i lead.')
      return
    }
    const data = (await res.json()) as { leads: Lead[] }
    setLeads(data.leads)
    setAuthed(true)
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/crm/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      setError(data?.error ?? 'Accesso negato.')
      return
    }
    setPassword('')
    await load()
  }

  async function setStatus(id: string, status: LeadStatus) {
    const res = await fetch('/api/crm/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) await load()
  }

  if (!authed) {
    return (
      <main className="crm-app min-h-screen bg-travertino flex items-center justify-center px-4 font-sans">
        <form onSubmit={login} className="w-full max-w-sm bg-white rounded-2xl p-8 border border-neutral-200">
          <h1 className="font-serif text-2xl text-legno-bruciato mb-2">CRM lead</h1>
          <p className="text-sm text-neutral-500 mb-6">Pagina riservata. Non è in Google.</p>
          <label className="block text-sm font-semibold text-legno-bruciato mb-2" htmlFor="crm-pass">
            Password
          </label>
          <input
            id="crm-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-neutral-200 rounded-xl px-3 py-2 mb-4 text-legno-bruciato"
            autoComplete="current-password"
          />
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <button type="submit" className="w-full bg-rovere text-white rounded-xl py-2.5 font-semibold">
            Entra
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-rovere mb-3">
          Area riservata
        </p>
        <h1 className="font-serif text-3xl text-legno-bruciato mb-2">CRM lead</h1>
        <p className="text-sm text-neutral-500 mb-8">
          {leads.length} richieste salvate. Pipeline: nuovo → contattato → preventivo → vinto / perso.
        </p>
        {leads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-xl">
            <p className="text-neutral-700 mb-3">
              Ancora nessun lead. È normale: arrivano solo dopo un invio riuscito dal form.
            </p>
            <p className="text-sm text-neutral-500 mb-4">
              Prova da una landing, poi torna qui e aggiorna la pagina.
            </p>
            <a
              href="/lp/preventivo"
              className="inline-flex bg-rovere text-white rounded-xl px-4 py-2.5 text-sm font-semibold"
            >
              Apri form di prova
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <article key={lead.id} className="bg-white rounded-2xl border border-neutral-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="font-semibold text-legno-bruciato">{lead.name}</h2>
                    <p className="text-sm text-neutral-500">
                      {new Date(lead.createdAt).toLocaleString('it-IT')} · {lead.source}
                      {lead.landingVariant ? ` · ${lead.landingVariant}` : ''}
                      {lead.ctaVariant ? ` · CTA ${lead.ctaVariant}` : ''}
                    </p>
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) => void setStatus(lead.id, e.target.value as LeadStatus)}
                    className="border border-neutral-200 rounded-lg px-2 py-1 text-sm text-legno-bruciato bg-white"
                    aria-label={`Stato lead ${lead.name}`}
                  >
                    {(Object.keys(LABELS) as LeadStatus[]).map((s) => (
                      <option key={s} value={s}>{LABELS[s]}</option>
                    ))}
                  </select>
                </div>
                <p className="text-sm">
                  <a href={`tel:${lead.phone}`} className="text-rovere font-semibold">{lead.phone}</a>
                  {lead.email ? <> · {lead.email}</> : null}
                  {lead.city ? <> · {lead.city}</> : null}
                </p>
                {lead.jobType && <p className="text-sm text-neutral-600 mt-1">{lead.jobType}</p>}
                {lead.message && <p className="text-sm text-neutral-600 mt-2 whitespace-pre-wrap">{lead.message}</p>}
                <p className="text-xs text-neutral-400 mt-2">{lead.photoCount} foto</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
