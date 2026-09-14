import { NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import { getApiSecurityHeaders } from '@/lib/security'
import {
  gmailConfigured,
  ownerInbox,
  sendOwnerMail,
  verifySmtpConnection,
} from '@/lib/mailer'

/** Risposta diagnostica completa (senza rivelare valori segreti). */
export type EmailDiagnostic = {
  configured: boolean
  to: string | null
  hasGmailUser: boolean
  hasAppPassword: boolean
  hasOwnerEmail: boolean
}

/**
 * GET /api/crm/test-email
 * Ritorna lo stato di configurazione Gmail senza tentare alcun invio.
 */
export async function GET() {
  const headers = getApiSecurityHeaders()
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401, headers })
  }

  const diagnostic: EmailDiagnostic = {
    configured: gmailConfigured(),
    to: ownerInbox(),
    hasGmailUser: Boolean(process.env.GMAIL_USER?.trim()),
    hasAppPassword: Boolean(process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')),
    hasOwnerEmail: Boolean(process.env.OWNER_EMAIL?.trim()),
  }

  return NextResponse.json(diagnostic, { headers })
}

/**
 * POST /api/crm/test-email
 * 1. Verifica la connessione SMTP (transporter.verify)
 * 2. Se il verify passa, invia una email di prova reale
 * Distingue chiaramente "credenziali sbagliate" da "timeout di rete".
 */
export async function POST() {
  const headers = getApiSecurityHeaders()
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401, headers })
  }

  if (!gmailConfigured()) {
    return NextResponse.json(
      {
        sent: false,
        smtpVerified: false,
        hasGmailUser: Boolean(process.env.GMAIL_USER?.trim()),
        hasAppPassword: Boolean(process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')),
        error:
          'Gmail non configurata. Imposta GMAIL_USER e GMAIL_APP_PASSWORD nelle variabili d\'ambiente su EasyPanel.',
      },
      { headers },
    )
  }

  // Step 1 — verifica connessione SMTP prima di tentare l'invio
  const verify = await verifySmtpConnection()
  if (!verify.ok) {
    return NextResponse.json(
      {
        sent: false,
        smtpVerified: false,
        error: verify.error,
      },
      { headers },
    )
  }

  // Step 2 — invio email di prova reale
  const mail = await sendOwnerMail({
    subject: '✅ Prova email — CRM Arteparquet funziona',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; color: #2D2A27;">
        <div style="background: #2D2A27; color: #F9F8F6; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 18px;">✅ Connessione Gmail verificata</h1>
        </div>
        <div style="background: #fff; padding: 20px 24px; border: 1px solid #E5E5E5; border-top: none; border-radius: 0 0 12px 12px;">
          <p>Se stai leggendo questa email, la configurazione Gmail su EasyPanel è corretta.</p>
          <p>I nuovi lead dal sito arriveranno qui, direttamente in Gmail — non passano da info@arteparquet.pro (Cloudflare li nasconderebbe come duplicati).</p>
          <p style="font-size: 12px; color: #999; margin-top: 24px;">
            Inviata dal CRM Arteparquet · ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
          </p>
        </div>
      </div>
    `,
  })

  return NextResponse.json(
    {
      smtpVerified: true,
      configured: gmailConfigured(),
      ...mail,
    },
    { headers },
  )
}
