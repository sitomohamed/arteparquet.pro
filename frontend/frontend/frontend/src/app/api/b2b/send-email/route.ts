import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import { getApiSecurityHeaders } from '@/lib/security'
import { updateLead, type Lead } from '@/lib/leads'
import { sendMail } from '@/lib/mailer'
import { generateEmailSubject } from '@/lib/email-draft'

/**
 * POST /api/b2b/send-email
 * 
 * Invia email B2B e aggiorna lo stato del lead.
 * Richiede: leadId, email (destinatario), emailDraft (corpo email).
 */
export async function POST(req: NextRequest) {
  const headers = getApiSecurityHeaders()
  
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401, headers })
  }

  const body = (await req.json().catch(() => null)) as {
    leadId?: string
    email?: string
    emailDraft?: string
    recipientCompany?: string
  } | null

  if (!body?.leadId || !body?.email || !body?.emailDraft) {
    return NextResponse.json(
      { error: 'leadId, email e emailDraft sono obbligatori.' },
      { status: 400, headers },
    )
  }

  // ── Invia email ──
  const subject = generateEmailSubject(body.recipientCompany)
  const emailResult = await sendMail({
    to: body.email,
    subject,
    html: body.emailDraft.replace(/\n/g, '<br>'), // Converti newlines in HTML
  })

  if (!emailResult.sent) {
    return NextResponse.json(
      { 
        error: `Invio email fallito: ${emailResult.error}`,
        emailSent: false,
      },
      { status: 500, headers },
    )
  }

  // ── Aggiorna lead ──
  const updatedLead = await updateLead(body.leadId, {
    status: 'contacted',
    emailSent: true,
    last_interaction_at: new Date().toISOString(),
  })

  if (!updatedLead) {
    return NextResponse.json(
      { error: 'Lead non trovato.' },
      { status: 404, headers },
    )
  }

  return NextResponse.json(
    {
      ok: true,
      emailSent: true,
      to: emailResult.to,
      leadId: updatedLead.id,
      newStatus: updatedLead.status,
    },
    { headers },
  )
}
