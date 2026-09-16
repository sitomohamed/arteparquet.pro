'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import type { Job, JobStatus } from '@/lib/jobs'
import { formatMoney } from '@/lib/money'
import { CrmShell } from '@/components/crm/crm-shell'

const STATUS_LABELS: Record<JobStatus, string> = {
  scheduled: '📅 Programmato',
  in_progress: '🔨 In corso',
  paused: '⏸️ Sospeso',
  completed: '✅ Completato',
  invoiced: '💰 Fatturato',
  cancelled: '❌ Annullato',
}

const STATUS_COLORS: Record<JobStatus, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  paused: 'bg-neutral-100 text-neutral-600',
  completed: 'bg-green-100 text-green-700',
  invoiced: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-700',
}

export default function LavoroDettaglioPage() {
  const params = useParams()
  const id = params?.id as string
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/crm/jobs')
    if (res.ok) {
      const data = (await res.json()) as { jobs: Job[] }
      const found = data.jobs.find((j) => j.id === id)
      setJob(found ?? null)
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  async function updateStatus(status: JobStatus) {
    if (!job) return
    setSaving(true)
    const res = await fetch('/api/crm/jobs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: job.id, status }),
    })
    setSaving(false)
    if (res.ok) {
      void load()
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

  if (!job) {
    return (
      <CrmShell>
      <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600 mb-4">Lavoro non trovato.</p>
          <Link href="/crm/lavori" className="text-rovere hover:underline">
            ← Torna ai lavori
          </Link>
        </div>
      </main>
      </CrmShell>
    )
  }

  return (
    <CrmShell>
    <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link
          href="/crm/lavori"
          className="text-xs font-semibold uppercase tracking-widest text-rovere mb-4 inline-block hover:underline"
        >
          ← Torna ai lavori
        </Link>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-serif text-3xl text-legno-bruciato">{job.number}</h1>
              <span className={`text-xs font-semibold px-3 py-1 rounded ${STATUS_COLORS[job.status]}`}>
                {STATUS_LABELS[job.status]}
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              Creato {new Date(job.createdAt).toLocaleDateString('it-IT')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-legno-bruciato">{formatMoney(job.totalCents)}</p>
          </div>
        </div>

        {/* Cambio stato */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="font-semibold text-legno-bruciato mb-4">Cambia stato</h2>
          <div className="flex flex-wrap gap-2">
            {(['scheduled', 'in_progress', 'paused', 'completed', 'invoiced'] as JobStatus[]).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => void updateStatus(status)}
                  disabled={saving || job.status === status}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    job.status === status
                      ? 'bg-rovere text-white'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-rovere'
                  } disabled:opacity-50`}
                >
                  {STATUS_LABELS[status]}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Cliente */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="font-semibold text-legno-bruciato mb-4">Cliente</h2>
          <p className="font-semibold text-legno-bruciato text-lg">{job.clientName}</p>
          <p className="text-sm text-neutral-600">{job.clientPhone}</p>
          {job.clientEmail && <p className="text-sm text-neutral-600">{job.clientEmail}</p>}
          {job.clientCity && <p className="text-sm text-neutral-600">{job.clientCity}</p>}
        </div>

        {/* Progetto */}
        {job.projectTitle && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
            <h2 className="font-semibold text-legno-bruciato mb-4">Progetto</h2>
            <p className="font-semibold text-legno-bruciato">{job.projectTitle}</p>
            {job.projectDescription && (
              <p className="text-sm text-neutral-600 mt-2 whitespace-pre-wrap">
                {job.projectDescription}
              </p>
            )}
            {job.projectAddress && (
              <p className="text-sm text-neutral-600 mt-2">📍 {job.projectAddress}</p>
            )}
          </div>
        )}

        {/* Planning */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="font-semibold text-legno-bruciato mb-4">Planning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Data inizio</p>
              <p className="text-sm text-legno-bruciato">
                {job.startDate
                  ? new Date(job.startDate).toLocaleDateString('it-IT')
                  : 'Non programmato'}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">Data fine</p>
              <p className="text-sm text-legno-bruciato">
                {job.endDate ? new Date(job.endDate).toLocaleDateString('it-IT') : 'Non definita'}
              </p>
            </div>
            {job.estimatedDays && (
              <div>
                <p className="text-xs text-neutral-500 mb-1">Giorni stimati</p>
                <p className="text-sm text-legno-bruciato">{job.estimatedDays} giorni</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagamenti */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="font-semibold text-legno-bruciato mb-4">Pagamenti</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Acconto</p>
              {job.depositPaidAt ? (
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    ✓ Ricevuto {formatMoney(job.depositAmountCents ?? 0)}
                  </p>
                  <p className="text-xs text-neutral-500">
                    il {new Date(job.depositPaidAt).toLocaleDateString('it-IT')}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-amber-600">In attesa</p>
              )}
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">Saldo</p>
              {job.finalPaymentAt ? (
                <div>
                  <p className="text-sm font-semibold text-green-700">✓ Ricevuto</p>
                  <p className="text-xs text-neutral-500">
                    il {new Date(job.finalPaymentAt).toLocaleDateString('it-IT')}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-amber-600">In attesa</p>
              )}
            </div>
            <div className="border-t border-neutral-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-legno-bruciato">Totale lavoro</span>
                <span className="font-bold text-legno-bruciato text-xl">
                  {formatMoney(job.totalCents)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Link preventivo */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📄 Preventivo originale</h3>
          <Link
            href={`/crm/preventivi/${job.quoteId}`}
            className="text-blue-700 hover:underline font-semibold"
          >
            {job.quoteNumber}
          </Link>
        </div>
      </div>
    </main>
    </CrmShell>
  )
}
