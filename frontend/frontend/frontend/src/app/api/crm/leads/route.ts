import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import { LEAD_STATUSES, listLeads, updateLeadStatus, type LeadStatus } from '@/lib/leads'
import { getApiSecurityHeaders } from '@/lib/security'

export async function GET() {
  const headers = getApiSecurityHeaders()
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401, headers })
  }
  const leads = await listLeads()
  return NextResponse.json({ leads }, { headers })
}

export async function PATCH(req: NextRequest) {
  const headers = getApiSecurityHeaders()
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401, headers })
  }
  const body = (await req.json().catch(() => null)) as { id?: string; status?: string } | null
  const status = body?.status as LeadStatus | undefined
  if (!body?.id || !status || !LEAD_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Dati non validi.' }, { status: 400, headers })
  }
  const lead = await updateLeadStatus(body.id, status)
  if (!lead) {
    return NextResponse.json({ error: 'Lead non trovato.' }, { status: 404, headers })
  }
  return NextResponse.json({ lead }, { headers })
}
