'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import type { Lead, LeadStatus, CanReachSite } from '@/lib/leads'

type DiscoveryStats = {
  added_today: number
  remaining_slots: number
  uncertain_today: number
  remaining_uncertain: number
}

/** Riga diagnostica con indicatore visivo ✅/❌ */
function DiagRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm text-neutral-700">
      <span className={ok ? 'text-green-600' : 'text-red-500'}>{ok ? '✅' : '❌'}</span>
      <span>{label}</span>
    </div>
  )
}

const LABELS: Record<LeadStatus, string> = {
  // B2C
  new: 'Nuovo',
  contacted: 'Contattato',
  quote: 'Preventivo',
  won: 'Vinto',
  lost: 'Perso',
  // B2B
  approved: 'Approvato (pronto invio)',
  follow_up_sent: 'Follow-up inviato',
  closed_silence: 'Chiuso (silenzio)',
  rejected_already_covered: '❌ Già coperti',
  rejected_out_of_target: '❌ Fuori target',
}

export default function CrmPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [activeTab, setActiveTab] = useState<'b2c' | 'b2b' | 'discovery'>('b2c')
  const [discoveryStats, setDiscoveryStats] = useState<DiscoveryStats | null>(null)
  const [addingLead, setAddingLead] = useState(false)
  const [newLead, setNewLead] = useState({
    name: '',
    website: '',
    email: '',
    city: '',
    why_them: '',
    can_reach_site: 'UNCERTAIN' as CanReachSite,
  })
  const [mailInfo, setMailInfo] = useState<{
    configured: boolean
    to: string | null
    hasGmailUser: boolean
    hasAppPassword: boolean
    hasOwnerEmail: boolean
  } | null>(null)
  const [mailTest, setMailTest] = useState<{ ok: boolean; message: string } | null>(null)
  const [mailTesting, setMailTesting] = useState(false)

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
    
    const mailRes = await fetch('/api/crm/test-email')
    if (mailRes.ok) {
      setMailInfo(await mailRes.json() as {
        configured: boolean
        to: string | null
        hasGmailUser: boolean
        hasAppPassword: boolean
        hasOwnerEmail: boolean
      })
    }

    // Carica statistiche discovery se tab B2B/Discovery
    if (activeTab === 'discovery' || activeTab === 'b2b') {
      const statsRes = await fetch('/api/b2b/daily-discovery')
      if (statsRes.ok) {
        const stats = await statsRes.json() as DiscoveryStats
        setDiscoveryStats(stats)
      }
    }
  }, [activeTab])

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

  async function testEmail() {
    setMailTesting(true)
    setMailTest(null)
    const res = await fetch('/api/crm/test-email', { method: 'POST' })
    const data = (await res.json().catch(() => null)) as {
      sent?: boolean
      smtpVerified?: boolean
      error?: string
      to?: string
      hasGmailUser?: boolean
      hasAppPassword?: boolean
    } | null
    setMailTesting(false)
    if (data?.sent) {
      setMailTest({
        ok: true,
        message: `✅ Inviata a ${data.to ?? 'Gmail'}. Aprila in Inbox o in Posta inviata. Non arriva su info@arteparquet.pro: Cloudflare la nasconde come duplicato.`,
      })
    } else if (data?.smtpVerified === false && !data?.hasGmailUser) {
      setMailTest({ ok: false, message: '❌ GMAIL_USER non impostata. Vai su EasyPanel → Variabili d\'ambiente.' })
    } else if (data?.smtpVerified === false && !data?.hasAppPassword) {
      setMailTest({ ok: false, message: '❌ GMAIL_APP_PASSWORD non impostata. Genera una password per le app su myaccount.google.com.' })
    } else {
      setMailTest({ ok: false, message: data?.error ?? 'Invio fallito. Controlla le variabili d\'ambiente.' })
    }
  }

  async function setStatus(id: string, status: LeadStatus) {
    const res = await fetch('/api/crm/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) await load()
  }

  async function addB2BLead() {
    setAddingLead(true)
    setError(null)
    const res = await fetch('/api/b2b/daily-discovery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead),
    })
    setAddingLead(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: 'Errore sconosciuto' }))
      setError(data.error || 'Errore aggiungendo il lead.')
      return
    }
    // Reset form
    setNewLead({
      name: '',
      website: '',
      email: '',
      city: '',
      why_them: '',
      can_reach_site: 'UNCERTAIN',
    })
    await load()
  }

  async function sendB2BEmail(lead: Lead) {
    if (!lead.email || !lead.email_draft) {
      alert('Email o bozza mancante')
      return
    }
    if (!confirm(`Inviare email a ${lead.name}?`)) return

    const res = await fetch('/api/b2b/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: lead.id,
        email: lead.email,
        emailDraft: lead.email_draft,
        recipientCompany: lead.name,
      }),
    })
    if (res.ok) {
      alert('Email inviata!')
      await load()
    } else {
      const data = await res.json().catch(() => ({ error: 'Errore' }))
      alert(`Errore: ${data.error}`)
    }
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

  const filteredLeads = activeTab === 'discovery' 
    ? leads.filter((l) => l.leadType === 'b2b' && l.status === 'new')
    : leads.filter((lead) => lead.leadType === activeTab || (!lead.leadType && activeTab === 'b2c'))
  const b2cCount = leads.filter((l) => !l.leadType || l.leadType === 'b2c').length
  const b2bCount = leads.filter((l) => l.leadType === 'b2b').length
  const discoveryCount = leads.filter((l) => l.leadType === 'b2b' && l.status === 'new').length

  return (
    <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-rovere mb-3">
          Area riservata
        </p>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="font-serif text-3xl text-legno-bruciato mb-2">CRM lead</h1>
            <p className="text-sm text-neutral-500">
              {leads.length} richieste · {b2cCount} B2C · {b2bCount} B2B · {discoveryCount} da approvare
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/crm/preventivi"
              className="bg-rovere text-white rounded-xl px-6 py-3 font-semibold hover:bg-opacity-90 transition-opacity"
            >
              📄 Preventivi
            </Link>
            <Link
              href="/crm/lavori"
              className="bg-white text-legno-bruciato border-2 border-rovere rounded-xl px-6 py-3 font-semibold hover:bg-rovere hover:text-white transition-colors"
            >
              🔨 Lavori
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 mb-8 max-w-xl">
          <p className="text-sm font-semibold text-legno-bruciato mb-3">Configurazione Gmail</p>
          <div className="grid grid-cols-1 gap-1.5 mb-4 text-sm">
            <DiagRow label="GMAIL_USER" ok={mailInfo?.hasGmailUser ?? false} />
            <DiagRow label="GMAIL_APP_PASSWORD" ok={mailInfo?.hasAppPassword ?? false} />
            <DiagRow
              label={`Destinatario notifiche${mailInfo?.to ? `: ${mailInfo.to}` : ''}`}
              ok={Boolean(mailInfo?.to)}
            />
          </div>
          {mailInfo?.configured && (
            <p className="text-xs text-neutral-500 mb-3">
              Le notifiche vanno dirette a Gmail. Non usare <code>info@arteparquet.pro</code> come destinatario:
              Cloudflare Email Routing la rimanda allo stesso account e Gmail la nasconde.
            </p>
          )}
          {mailInfo && !mailInfo.configured && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
              ⚠️ Imposta <code>GMAIL_USER</code> e <code>GMAIL_APP_PASSWORD</code> nelle variabili d&apos;ambiente su EasyPanel per ricevere le notifiche email.
            </p>
          )}
          <button
            type="button"
            onClick={() => void testEmail()}
            disabled={mailTesting}
            className="bg-rovere text-white rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {mailTesting ? 'Verifica SMTP…' : 'Invia email di prova'}
          </button>
          {mailTest && (
            <p className={`text-sm mt-2 ${mailTest.ok ? 'text-green-700' : 'text-red-600'}`}>
              {mailTest.message}
            </p>
          )}
        </div>

        {/* Tabs B2C / B2B / Discovery */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('b2c')}
            className={`px-4 py-2 rounded-lg font-sans text-sm font-semibold transition-colors ${
              activeTab === 'b2c'
                ? 'bg-rovere text-white'
                : 'bg-white text-neutral-700 border border-neutral-200'
            }`}
          >
            B2C ({b2cCount})
          </button>
          <button
            onClick={() => setActiveTab('b2b')}
            className={`px-4 py-2 rounded-lg font-sans text-sm font-semibold transition-colors ${
              activeTab === 'b2b'
                ? 'bg-rovere text-white'
                : 'bg-white text-neutral-700 border border-neutral-200'
            }`}
          >
            B2B ({b2bCount})
          </button>
          <button
            onClick={() => setActiveTab('discovery')}
            className={`px-4 py-2 rounded-lg font-sans text-sm font-semibold transition-colors relative ${
              activeTab === 'discovery'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-neutral-700 border border-neutral-200'
            }`}
          >
            Discovery ({discoveryCount})
            {discoveryCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {discoveryCount}
              </span>
            )}
          </button>
        </div>

        {/* Discovery Stats */}
        {activeTab === 'discovery' && discoveryStats && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-blue-900 mb-2">📊 Statistiche Oggi</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-neutral-600">Lead aggiunti:</span>{' '}
                <span className="font-bold text-blue-700">{discoveryStats.added_today} / 5</span>
              </div>
              <div>
                <span className="text-neutral-600">Slot rimanenti:</span>{' '}
                <span className="font-bold text-green-700">{discoveryStats.remaining_slots}</span>
              </div>
              <div>
                <span className="text-neutral-600">UNCERTAIN oggi:</span>{' '}
                <span className="font-bold text-amber-700">{discoveryStats.uncertain_today} / 2</span>
              </div>
              <div>
                <span className="text-neutral-600">UNCERTAIN rimanenti:</span>{' '}
                <span className="font-bold">{discoveryStats.remaining_uncertain}</span>
              </div>
            </div>
          </div>
        )}

        {/* Form aggiunta lead B2B (solo tab Discovery) */}
        {activeTab === 'discovery' && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
            <h2 className="font-semibold text-legno-bruciato mb-4">➕ Aggiungi lead B2B</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                placeholder="Nome studio *"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                className="border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Website *"
                value={newLead.website}
                onChange={(e) => setNewLead({ ...newLead, website: e.target.value })}
                className="border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                className="border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Città"
                value={newLead.city}
                onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                className="border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <textarea
              placeholder="Perché loro? (motivo del contatto)"
              value={newLead.why_them}
              onChange={(e) => setNewLead({ ...newLead, why_them: e.target.value })}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm mb-3"
              rows={2}
            />
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-semibold text-neutral-700">Raggiungibile:</label>
              {(['YES', 'NO', 'UNCERTAIN'] as const).map((val) => (
                <label key={val} className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    checked={newLead.can_reach_site === val}
                    onChange={() => setNewLead({ ...newLead, can_reach_site: val })}
                  />
                  {val}
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
            <button
              onClick={() => void addB2BLead()}
              disabled={addingLead || !newLead.name || !newLead.website}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              {addingLead ? 'Aggiungendo...' : 'Aggiungi Lead'}
            </button>
          </div>
        )}

        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-xl">
            <p className="text-neutral-700 mb-3">
              {activeTab === 'b2c'
                ? 'Nessun lead B2C. I lead arrivano dai form sul sito.'
                : 'Nessun lead B2B. La funzione di discovery non è ancora attiva.'}
            </p>
            <p className="text-sm text-neutral-500 mb-4">
              {activeTab === 'b2c'
                ? 'Prova da una landing, poi torna qui e aggiorna la pagina.'
                : 'I lead B2B verranno aggiunti manualmente o tramite discovery automatica nella Fase 3.'}
            </p>
            {activeTab === 'b2c' && (
              <a
                href="/lp/preventivo"
                className="inline-flex bg-rovere text-white rounded-xl px-4 py-2.5 text-sm font-semibold"
              >
                Apri form di prova
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <article key={lead.id} className="bg-white rounded-2xl border border-neutral-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-semibold text-legno-bruciato">{lead.name}</h2>
                      {lead.leadType === 'b2b' && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                          B2B
                        </span>
                      )}
                    </div>
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
                  <a href={`tel:${lead.phone}`} className="text-rovere font-semibold">
                    {lead.phone}
                  </a>
                  {lead.email ? <> · {lead.email}</> : null}
                  {lead.city ? <> · {lead.city}</> : null}
                  {lead.website ? (
                    <>
                      {' · '}
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {lead.website}
                      </a>
                    </>
                  ) : null}
                </p>
                {lead.jobType && (
                  <p className="text-sm text-neutral-600 mt-1">{lead.jobType}</p>
                )}
                {lead.message && (
                  <p className="text-sm text-neutral-600 mt-2 whitespace-pre-wrap">
                    {lead.message}
                  </p>
                )}
                {lead.why_them && (
                  <div className="mt-2 text-sm bg-blue-50 border border-blue-200 rounded p-2">
                    <span className="font-semibold text-blue-900">Perché loro:</span>{' '}
                    <span className="text-blue-700">{lead.why_them}</span>
                  </div>
                )}
                {lead.email_draft && (
                  <details className="mt-3">
                    <summary className="text-sm font-semibold text-neutral-700 cursor-pointer">
                      📧 Bozza email
                    </summary>
                    <pre className="text-xs text-neutral-600 mt-2 whitespace-pre-wrap bg-neutral-50 p-3 rounded border border-neutral-200">
                      {lead.email_draft}
                    </pre>
                  </details>
                )}

                {/* Azioni B2B Discovery */}
                {activeTab === 'discovery' && lead.status === 'new' && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-2">
                    <button
                      onClick={() => void sendB2BEmail(lead)}
                      disabled={!lead.email || !lead.email_draft}
                      className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✅ Approva & Invia
                    </button>
                    <button
                      onClick={() => void setStatus(lead.id, 'rejected_out_of_target')}
                      className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-2 text-sm font-semibold"
                    >
                      ❌ Scarta (Fuori target)
                    </button>
                    <button
                      onClick={() => void setStatus(lead.id, 'rejected_already_covered')}
                      className="bg-amber-100 text-amber-700 border border-amber-300 rounded-lg px-4 py-2 text-sm font-semibold"
                    >
                      ❌ Scarta (Già coperti)
                    </button>
                  </div>
                )}

                <p className="text-xs text-neutral-400 mt-2">
                  {lead.leadType === 'b2c' ? `${lead.photoCount} foto` : ''}
                  {lead.emailSent === true ? ' · Email inviata' : null}
                  {lead.emailSent === false
                    ? ` · Email non inviata${lead.emailError ? `: ${lead.emailError}` : ''}`
                    : null}
                  {lead.can_reach_site ? ` · Raggiungibile: ${lead.can_reach_site}` : null}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
