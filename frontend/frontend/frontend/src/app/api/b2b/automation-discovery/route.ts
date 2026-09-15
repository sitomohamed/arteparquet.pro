import { NextRequest, NextResponse } from 'next/server'
import { getApiSecurityHeaders } from '@/lib/security'
import { saveLead, listLeads } from '@/lib/leads'
import { checkB2BDuplicate, extractDomain, isValidDomain, isValidEmail } from '@/lib/lead-utils'
import { generateB2BEmailDraft } from '@/lib/email-draft'
import type { CanReachSite } from '@/lib/leads'

/**
 * POST /api/b2b/automation-discovery
 * 
 * Endpoint per Cursor Automation: aggiunge lead B2B trovati da Exa.
 * Auth: AUTOMATION_SECRET (env) invece di CRM password.
 * Stesso flusso di daily-discovery ma senza UI.
 */
export async function POST(req: NextRequest) {
  const headers = getApiSecurityHeaders()
  
  // ── Auth con token automation ──
  const authHeader = req.headers.get('authorization')
  const expectedToken = process.env.AUTOMATION_SECRET?.trim()
  
  if (!expectedToken) {
    return NextResponse.json(
      { error: 'Server non configurato per automazioni (AUTOMATION_SECRET mancante).' },
      { status: 500, headers }
    )
  }
  
  const providedToken = authHeader?.replace(/^Bearer\s+/i, '').trim()
  if (providedToken !== expectedToken) {
    return NextResponse.json(
      { error: 'Token automation non valido.' },
      { status: 401, headers }
    )
  }

  const body = (await req.json().catch(() => null)) as {
    leads?: Array<{
      name: string
      website: string
      email?: string
      city?: string
      why_them?: string
      can_reach_site?: CanReachSite
      recipientType?: 'architetto' | 'designer' | 'impresa' | 'studio'
    }>
  } | null

  if (!body?.leads || !Array.isArray(body.leads)) {
    return NextResponse.json(
      { error: 'Array "leads" obbligatorio.' },
      { status: 400, headers }
    )
  }

  // ── Limiti giornalieri ──
  const today = new Date().toISOString().split('T')[0]
  const allB2B = await listLeads({ leadType: 'b2b' })
  const todayLeads = allB2B.filter((lead) => lead.createdAt.startsWith(today))
  
  const slotsRemaining = Math.max(0, 5 - todayLeads.length)
  if (slotsRemaining === 0) {
    return NextResponse.json(
      {
        ok: true,
        added: 0,
        skipped: body.leads.length,
        reason: 'Limite giornaliero raggiunto (5 lead/giorno).',
        todayTotal: todayLeads.length,
      },
      { headers }
    )
  }

  const uncertainToday = todayLeads.filter((l) => l.can_reach_site === 'UNCERTAIN').length
  const uncertainRemaining = Math.max(0, 2 - uncertainToday)

  const results: Array<{ name: string; status: 'added' | 'skipped'; reason?: string }> = []
  let addedCount = 0

  for (const candidate of body.leads.slice(0, slotsRemaining)) {
    if (!candidate.name || !candidate.website) {
      results.push({ name: candidate.name || 'N/A', status: 'skipped', reason: 'Nome o website mancante' })
      continue
    }

    // ── Validazioni ──
    const domain = extractDomain(candidate.website)
    if (!domain || !isValidDomain(domain)) {
      results.push({ name: candidate.name, status: 'skipped', reason: 'Dominio non valido' })
      continue
    }

    if (candidate.email && !isValidEmail(candidate.email)) {
      results.push({ name: candidate.name, status: 'skipped', reason: 'Email non valida' })
      continue
    }

    // ── Check duplicati ──
    const duplicateCheck = await checkB2BDuplicate({
      website: candidate.website,
      email: candidate.email,
    })

    if (duplicateCheck.isDuplicate) {
      results.push({
        name: candidate.name,
        status: 'skipped',
        reason: `Duplicato (${duplicateCheck.reason === 'domain' ? 'dominio' : 'email'}): ${duplicateCheck.existingLeadName}`,
      })
      continue
    }

    // ── Limite UNCERTAIN ──
    if (candidate.can_reach_site === 'UNCERTAIN' && uncertainRemaining === 0) {
      results.push({
        name: candidate.name,
        status: 'skipped',
        reason: 'Limite UNCERTAIN raggiunto (max 2/giorno)',
      })
      continue
    }

    // ── Genera bozza email ──
    const emailDraft = generateB2BEmailDraft({
      recipientName: candidate.name,
      recipientCompany: candidate.name,
      city: candidate.city,
      why_them: candidate.why_them,
      recipientType: candidate.recipientType || 'studio',
    })

    // ── Salva lead ──
    await saveLead({
      leadType: 'b2b',
      source: 'automation-exa',
      name: candidate.name,
      website: candidate.website,
      email: candidate.email,
      city: candidate.city || '',
      jobType: 'Studio professionale',
      phone: '',
      photoCount: 0,
      why_them: candidate.why_them,
      can_reach_site: candidate.can_reach_site || 'YES',
      email_draft: emailDraft,
      discovered_at: new Date().toISOString(),
      status: 'new',
    })

    results.push({ name: candidate.name, status: 'added' })
    addedCount++
  }

  return NextResponse.json(
    {
      ok: true,
      added: addedCount,
      skipped: results.filter((r) => r.status === 'skipped').length,
      todayTotal: todayLeads.length + addedCount,
      slotsRemaining: slotsRemaining - addedCount,
      results,
    },
    { headers }
  )
}
