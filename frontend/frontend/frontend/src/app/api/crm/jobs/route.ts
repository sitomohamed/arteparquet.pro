import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import {
  listJobs,
  getJob,
  updateJob,
  deleteJob,
  type Job,
  type JobStatus,
} from '@/lib/jobs'

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/crm/jobs — Lista lavori
───────────────────────────────────────────────────────────────────────────── */

export async function GET(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const url = new URL(req.url)
  const status = url.searchParams.get('status') as JobStatus | null
  const jobs = await listJobs(status ? { status } : undefined)

  return NextResponse.json({ jobs })
}

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /api/crm/jobs — Aggiorna lavoro
───────────────────────────────────────────────────────────────────────────── */

export async function PATCH(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = (await req.json()) as { id: string } & Partial<Job>
  if (!body.id) {
    return NextResponse.json({ error: 'ID mancante' }, { status: 400 })
  }

  const job = await updateJob(body.id, body)
  if (!job) {
    return NextResponse.json({ error: 'Lavoro non trovato' }, { status: 404 })
  }

  return NextResponse.json({ job })
}

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/crm/jobs — Elimina lavoro
───────────────────────────────────────────────────────────────────────────── */

export async function DELETE(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID mancante' }, { status: 400 })
  }

  const deleted = await deleteJob(id)
  if (!deleted) {
    return NextResponse.json({ error: 'Lavoro non trovato' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
