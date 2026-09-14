import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import { getApiSecurityHeaders } from '@/lib/security'
import { saveLead, listLeads } from '@/lib/leads'
import { checkB2BDuplicate, extractDomain, isValidDomain, isValidEmail } from '@/lib/lead-utils'
import { generateB2BEmailDraft } from '@/lib/email-draft'
import type { CanReachSite } from '@/lib/leads'

/**
 * POST /api/b2b/daily-discovery
 * 
 * Aggiunge un lead B2B al CRM con validazioni:
 * - Max 5 lead/giorno
 * - Max 2 UNCERTAIN/giorno
 * - Anti-duplicati
 * - Genera bozza email automatica
 */
export async function POST(req: NextRequest) {
  const headers = getApiSecurityHeaders()
  
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401, headers })
  }

  const body = (await req.json().catch(() => null)) as {
    name?: string
    website?: string
    email?: string
    city?: string
    jobType?: string
    why_them?: string
    can_reach_site?: CanReachSite
    recipientType?: 'architetto' | 'designer' | 'impresa' | 'studio'
  } | null

  if (!body?.name || !body?.website) {
    return NextResponse.json(
      { error: 'Nome e website sono obbligatori.' },
      { status: 400, headers },
    )
  }

  // ── Validazioni input ──
  const domain = extractDomain(body.website)
  if (!domain || !isValidDomain(domain)) {
    return NextResponse.json(
      { error: 'Website non valido. Inserisci un dominio valido (es. studioarch.it).' },
      { status: 400, headers },
    )
  }

  if (body.email && !isValidEmail(body.email)) {
    return NextResponse.json(
      { error: 'Email non valida.' },
      { status: 400, headers },
    )
  }

  // ── Check duplicati ──
  const duplicateCheck = await checkB2BDuplicate({
    website: body.website,
    email: body.email,
  })

  if (duplicateCheck.isDuplicate) {
    return NextResponse.json(
      {
        error: `Lead già presente nel CRM (${duplicateCheck.reason === 'domain' ? 'dominio' : 'email'}). Nome esistente: ${duplicateCheck.existingLeadName}`,
        duplicate: true,
        existingLeadId: duplicateCheck.existingLeadId,
      },
      { status: 409, headers },
    )
  }

  // ── Limiti giornalieri ──
  const today = new Date().toISOString().split('T')[0]
  const allB2B = await listLeads({ leadType: 'b2b' })
  const todayLeads = allB2B.filter((lead) => lead.createdAt.startsWith(today))

  if (todayLeads.length >= 5) {
    return NextResponse.json(
      { error: 'Limite giornaliero raggiunto: massimo 5 lead B2B al giorno.' },
      { status: 429, headers },
    )
  }

  const uncertainToday = todayLeads.filter((lead) => lead.can_reach_site === 'UNCERTAIN').length
  if (body.can_reach_site === 'UNCERTAIN' && uncertainToday >= 2) {
    return NextResponse.json(
      { error: 'Limite UNCERTAIN raggiunto: massimo 2 incerti al giorno.' },
      { status: 429, headers },
    )
  }

  // ── Genera bozza email ──
  const emailDraft = generateB2BEmailDraft({
    recipientName: body.name,
    recipientCompany: body.name, // Assumiamo che name sia il nome dello studio
    city: body.city,
    why_them: body.why_them,
    recipientType: body.recipientType || 'studio',
  })

  // ── Salva lead ──
  const lead = await saveLead({
    leadType: 'b2b',
    source: 'daily-discovery',
    name: body.name,
    website: body.website,
    email: body.email,
    city: body.city,
    jobType: body.jobType || 'Studio professionale',
    phone: '', // Verrà cercato successivamente
    photoCount: 0,
    why_them: body.why_them,
    can_reach_site: body.can_reach_site || 'UNCERTAIN',
    email_draft: emailDraft,
    discovered_at: new Date().toISOString(),
    status: 'new',
  })

  return NextResponse.json(
    {
      ok: true,
      lead: {
        id: lead.id,
        name: lead.name,
        website: lead.website,
        city: lead.city,
      },
      message: `Lead "${lead.name}" aggiunto. ${5 - todayLeads.length - 1} slot rimanenti oggi.`,
    },
    { headers },
  )
}

/**
 * GET /api/b2b/daily-discovery
 * 
 * Ritorna statistiche discovery giornaliere.
 */
export async function GET() {
  const headers = getApiSecurityHeaders()
  
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401, headers })
  }

  const today = new Date().toISOString().split('T')[0]
  const allB2B = await listLeads({ leadType: 'b2b' })
  const todayLeads = allB2B.filter((lead) => lead.createdAt.startsWith(today))
  const uncertainToday = todayLeads.filter((lead) => lead.can_reach_site === 'UNCERTAIN').length

  return NextResponse.json(
    {
      today: today,
      added_today: todayLeads.length,
      remaining_slots: 5 - todayLeads.length,
      uncertain_today: uncertainToday,
      remaining_uncertain: 2 - uncertainToday,
      max_per_day: 5,
      max_uncertain_per_day: 2,
    },
    { headers },
  )
}
