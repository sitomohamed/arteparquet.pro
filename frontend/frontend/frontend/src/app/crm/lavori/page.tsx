'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import type { Job } from '@/lib/jobs'
import { formatMoney } from '@/lib/money'

const STATUS_LABELS: Record<Job['status'], string> = {
  scheduled: '📅 Programmato',
  in_progress: '🔨 In corso',
  paused: '⏸️ Sospeso',
  completed: '✅ Completato',
  invoiced: '💰 Fatturato',
  cancelled: '❌ Annullato',
}

const STATUS_COLORS: Record<Job['status'], string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  paused: 'bg-neutral-100 text-neutral-600',
  completed: 'bg-green-100 text-green-700',
  invoiced: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-700',
}

export default function LavoriPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Job['status'] | 'all'>('all')

  const load = useCallback(async () => {
    setLoading(true)
    const url = filter === 'all' ? '/api/crm/jobs' : `/api/crm/jobs?status=${filter}`
    const res = await fetch(url)
    if (res.ok) {
      const data = (await res.json()) as { jobs: Job[] }
      setJobs(data.jobs)
    }
    setLoading(false)
  }, [filter])

  useEffect(() => {
    void load()
  }, [load])

  const filteredJobs = filter === 'all' ? jobs : jobs.filter((j) => j.status === filter)

  // Stats
  const scheduled = jobs.filter((j) => j.status === 'scheduled').length
  const in_progress = jobs.filter((j) => j.status === 'in_progress').length
  const completed = jobs.filter((j) => j.status === 'completed').length
  const invoiced = jobs.filter((j) => j.status === 'invoiced').length

  return (
    <main className="crm-app min-h-screen bg-travertino px-4 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-rovere mb-2">
              Area riservata
            </p>
            <h1 className="font-serif text-3xl text-legno-bruciato">Lavori</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {jobs.length} lavori · {in_progress} in corso · {completed} completati
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">Programmati</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{scheduled}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">In corso</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{in_progress}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">Completati</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{completed}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">Fatturati</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{invoiced}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'scheduled', 'in_progress', 'completed', 'invoiced'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === s
                  ? 'bg-rovere text-white'
                  : 'bg-white text-neutral-700 border border-neutral-200'
              }`}
            >
              {s === 'all' ? 'Tutti' : STATUS_LABELS[s as Job['status']]}
            </button>
          ))}
        </div>

        {/* Lista lavori */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
            <p className="text-neutral-500">Caricamento...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
            <p className="text-neutral-700 mb-3">Nessun lavoro trovato.</p>
            <p className="text-sm text-neutral-500">
              I lavori vengono creati da preventivi accettati.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/crm/lavori/${job.id}`}
                className="block bg-white rounded-2xl border border-neutral-200 p-5 hover:border-rovere transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-semibold text-legno-bruciato text-lg">{job.number}</h2>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          STATUS_COLORS[job.status]
                        }`}
                      >
                        {STATUS_LABELS[job.status]}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">
                      Creato {new Date(job.createdAt).toLocaleDateString('it-IT')}
                      {job.startDate &&
                        ` · Inizio ${new Date(job.startDate).toLocaleDateString('it-IT')}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-legno-bruciato">
                      {formatMoney(job.totalCents)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-3">
                  <p className="font-semibold text-legno-bruciato">{job.clientName}</p>
                  <p className="text-sm text-neutral-600">
                    {job.clientPhone}
                    {job.clientCity && ` · ${job.clientCity}`}
                  </p>
                  {job.projectTitle && (
                    <p className="text-sm text-neutral-600 mt-1">{job.projectTitle}</p>
                  )}
                  <p className="text-xs text-neutral-400 mt-2">
                    Da preventivo {job.quoteNumber}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back links */}
        <div className="mt-8 flex gap-6">
          <Link
            href="/crm"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-rovere"
          >
            ← CRM
          </Link>
          <Link
            href="/crm/preventivi"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-rovere"
          >
            📄 Preventivi
          </Link>
        </div>
      </div>
    </main>
  )
}
