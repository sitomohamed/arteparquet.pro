import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized } from '@/lib/crm-auth'
import { getQuote, updateQuote } from '@/lib/quotes'
import { sendMail } from '@/lib/mailer'
import { BUSINESS } from '@/lib/constants'
import { formatMoney } from '@/lib/money'

export async function POST(req: NextRequest) {
  if (!(await crmAuthorized())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = (await req.json()) as { quoteId: string }
  if (!body.quoteId) {
    return NextResponse.json({ error: 'ID preventivo mancante' }, { status: 400 })
  }

  const quote = await getQuote(body.quoteId)
  if (!quote) {
    return NextResponse.json({ error: 'Preventivo non trovato' }, { status: 404 })
  }

  if (!quote.clientEmail) {
    return NextResponse.json({ error: 'Email cliente mancante' }, { status: 400 })
  }

  // Genera link pubblico
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://arteparquet.pro'
  const publicLink = `${origin}/q/${quote.publicToken}`

  // Template email
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f0;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #8B7355 0%, #6B5744 100%); padding: 40px 32px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 300; letter-spacing: 2px;">ARTEPARQUET</h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Proposta di fornitura e posa</p>
    </div>

    <!-- Corpo -->
    <div style="padding: 40px 32px;">
      <p style="margin: 0 0 16px; color: #333; font-size: 16px;">Gentile <strong>${quote.clientName}</strong>,</p>
      
      <p style="margin: 0 0 24px; color: #555; font-size: 15px; line-height: 1.6;">
        Le inviamo il preventivo <strong>${quote.number}</strong> per il progetto ${quote.projectTitle ? `<strong>${quote.projectTitle}</strong>` : 'richiesto'}.
      </p>

      <!-- Quote summary -->
      <div style="background: #f9f9f7; border-left: 4px solid #8B7355; padding: 20px; margin: 24px 0; border-radius: 8px;">
        ${quote.lines.length > 0 ? `
          <p style="margin: 0 0 12px; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Lavorazioni</p>
          ${quote.lines.slice(0, 3).map((line) => `
            <p style="margin: 0 0 8px; color: #333; font-size: 14px;">• ${line.description}</p>
          `).join('')}
          ${quote.lines.length > 3 ? `<p style="margin: 8px 0 0; color: #666; font-size: 13px;">... e altre ${quote.lines.length - 3} voci</p>` : ''}
        ` : ''}
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #666; font-size: 14px;">Totale preventivo</span>
            <span style="color: #8B7355; font-size: 28px; font-weight: bold;">${formatMoney(quote.totalCents)}</span>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="${publicLink}" style="display: inline-block; background: #8B7355; color: white; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(139,115,85,0.3);">
          Visualizza il preventivo
        </a>
      </div>

      ${quote.validUntil ? `
        <p style="margin: 24px 0 0; color: #888; font-size: 13px; text-align: center;">
          ⏰ Offerta valida fino al ${new Date(quote.validUntil).toLocaleDateString('it-IT')}
        </p>
      ` : ''}

      <p style="margin: 32px 0 0; color: #555; font-size: 14px; line-height: 1.6;">
        Può accettare o rifiutare il preventivo direttamente dalla pagina. Per qualsiasi chiarimento, non esiti a contattarci.
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #f5f5f0; padding: 32px; border-top: 1px solid #e0e0d8;">
      <p style="margin: 0 0 12px; color: #333; font-size: 14px; font-weight: 600;">${BUSINESS.fullName}</p>
      <p style="margin: 0 0 8px; color: #666; font-size: 13px;">📞 ${BUSINESS.phone}</p>
      <p style="margin: 0 0 8px; color: #666; font-size: 13px;">✉️ ${BUSINESS.email}</p>
      <p style="margin: 0 0 8px; color: #666; font-size: 13px;">📍 ${BUSINESS.address.full}</p>
      <p style="margin: 16px 0 0; color: #888; font-size: 12px;">
        P.IVA ${BUSINESS.piva} · Dal ${BUSINESS.founded}
      </p>
    </div>
  </div>

  <!-- Footer legale -->
  <div style="max-width: 600px; margin: 0 auto; padding: 20px 32px; text-align: center;">
    <p style="margin: 0; color: #999; font-size: 11px; line-height: 1.5;">
      Hai ricevuto questa email perché hai richiesto un preventivo ad Arteparquet.
    </p>
  </div>
</body>
</html>
  `.trim()

  // Invia email
  const result = await sendMail({
    to: quote.clientEmail,
    subject: `Preventivo ${quote.number} - Arteparquet`,
    html,
    replyTo: BUSINESS.email,
  })

  if (!result.sent) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  // Aggiorna stato preventivo
  await updateQuote(quote.id, {
    status: 'sent',
    sentAt: new Date().toISOString(),
  })

  return NextResponse.json({ success: true })
}
