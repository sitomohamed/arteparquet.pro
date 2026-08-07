import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// ── Validation ────────────────────────────────────────────────────────────
const schema = z.object({
  projectType: z.string().min(1),
  clientType: z.string().min(1),
  area: z.string().optional(),
  city: z.string().min(2),
  message: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  privacy: z.boolean(),
})

const PROJECT_LABELS: Record<string, string> = {
  'nuova-posa':  '🪵 Nuova installazione parquet',
  'restauro':    '✨ Restauro / Levigatura',
  'riparazione': '🔧 Riparazione',
  'consulenza':  '💬 Solo consulenza',
}

const CLIENT_LABELS: Record<string, string> = {
  'privato':    '🏠 Privato / Famiglia',
  'architetto': '📐 Architetto / Designer',
  'impresa':    '🏗️ Impresa / Costruttore',
  'hotel':      '🏨 Hotel / Ristorante',
}

// ── Mailer factory ────────────────────────────────────────────────────────
function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) return null

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

// ── POST handler ──────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const transporter = createTransporter()
    const ownerEmail = process.env.OWNER_EMAIL ?? process.env.GMAIL_USER

    // ── Dev fallback: no Gmail configured ────────────────────────────────
    if (!transporter || !ownerEmail) {
      console.log('\n📬 ─────────────────────────────────────────────────')
      console.log('   NUOVO PREVENTIVO (Gmail non ancora configurata)')
      console.log('────────────────────────────────────────────────────')
      console.log(`   Nome:     ${data.name}`)
      console.log(`   Telefono: ${data.phone}`)
      console.log(`   Email:    ${data.email}`)
      console.log(`   Progetto: ${PROJECT_LABELS[data.projectType] ?? data.projectType}`)
      console.log(`   Città:    ${data.city}`)
      if (data.area)    console.log(`   Area:     ${data.area} mq`)
      if (data.message) console.log(`   Note:     ${data.message}`)
      console.log('────────────────────────────────────────────────────\n')
      return NextResponse.json({ success: true, mode: 'dev' })
    }

    const whatsappNumber = data.phone.replace(/[\s+\-()]/g, '')

    // ── 1. Email al titolare ──────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Arteparquet Sito" <${process.env.GMAIL_USER}>`,
      to: ownerEmail,
      replyTo: data.email,
      subject: `🔔 Nuovo preventivo da ${data.name} — ${data.city}`,
      html: ownerEmailHtml(data, whatsappNumber),
    })

    // ── 2. Conferma al cliente ────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Arteparquet" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: `✓ Abbiamo ricevuto la tua richiesta, ${data.name}!`,
      html: clientEmailHtml(data),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dati non validi' }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Errore nell\'invio. Riprova o contattaci su WhatsApp.' },
      { status: 500 }
    )
  }
}

// ── Email templates ───────────────────────────────────────────────────────
function ownerEmailHtml(
  data: z.infer<typeof schema>,
  whatsappNumber: string
) {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nuovo preventivo</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F4;font-family:Arial,sans-serif;">
<div style="max-width:580px;margin:32px auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="background:#0A0A0A;padding:28px 32px;">
    <table cellpadding="0" cellspacing="0" width="100%"><tr>
      <td>
        <div style="display:inline-block;width:44px;height:44px;border-radius:50%;background:#C89B7B;text-align:center;line-height:44px;font-size:20px;font-weight:700;color:white;vertical-align:middle;">A</div>
        <span style="vertical-align:middle;margin-left:12px;color:white;font-size:18px;font-weight:700;">Arteparquet.pro</span>
      </td>
    </tr></table>
  </div>

  <!-- Alert -->
  <div style="background:#C89B7B;padding:14px 32px;">
    <span style="color:white;font-size:15px;font-weight:700;">🔔 Nuovo preventivo ricevuto!</span>
  </div>

  <!-- Body -->
  <div style="background:#ffffff;padding:32px;">

    <h2 style="margin:0 0 24px;color:#1A1A1A;font-size:18px;">
      Richiesta da <strong>${escHtml(data.name)}</strong>
    </h2>

    <!-- Dati cliente -->
    <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#C89B7B;letter-spacing:0.12em;text-transform:uppercase;">Dati Cliente</p>
    <table cellpadding="0" cellspacing="0" width="100%" style="border-top:2px solid #C89B7B;margin-bottom:24px;">
      ${tr('Nome',     escHtml(data.name))}
      ${tr('Telefono', `<a href="tel:${escHtml(data.phone)}" style="color:#C89B7B;font-weight:600;">${escHtml(data.phone)}</a>`)}
      ${tr('Email',    `<a href="mailto:${escHtml(data.email)}" style="color:#C89B7B;">${escHtml(data.email)}</a>`)}
      ${tr('Tipo',     escHtml(CLIENT_LABELS[data.clientType] ?? data.clientType))}
    </table>

    <!-- Dati progetto -->
    <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#C89B7B;letter-spacing:0.12em;text-transform:uppercase;">Progetto</p>
    <table cellpadding="0" cellspacing="0" width="100%" style="border-top:2px solid #C89B7B;margin-bottom:24px;">
      ${tr('Tipo',   escHtml(PROJECT_LABELS[data.projectType] ?? data.projectType))}
      ${tr('Città',  escHtml(data.city))}
      ${data.area    ? tr('Superficie', `${escHtml(data.area)} mq`) : ''}
      ${data.message ? tr('Note', escHtml(data.message)) : ''}
    </table>

    <!-- Bottoni azione -->
    <div style="background:#F9F8F6;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0 0 14px;color:#78716C;font-size:13px;">Rispondi subito a questa richiesta:</p>
      <a href="tel:${escHtml(data.phone)}"
         style="display:inline-block;background:#C89B7B;color:white;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">
        📞 Chiama ${escHtml(data.name)}
      </a>
      <a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Ciao ${data.name}! Sono Arabi di Arteparquet, ho ricevuto la tua richiesta di preventivo. Quando sei disponibile per un sopralluogo gratuito?`)}"
         style="display:inline-block;background:#25D366;color:white;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">
        💬 WhatsApp
      </a>
      <a href="mailto:${escHtml(data.email)}"
         style="display:inline-block;background:#44403C;color:white;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">
        ✉️ Rispondi via Email
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#F5F5F4;padding:16px 32px;text-align:center;border-top:1px solid #E7E5E4;">
    <p style="margin:0;font-size:11px;color:#A8A29E;">
      Arteparquet di Arabi Mohamed · P.IVA 03326410168 · arteparquet.pro
    </p>
  </div>
</div>
</body>
</html>`
}

function clientEmailHtml(data: z.infer<typeof schema>) {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Richiesta ricevuta</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F4;font-family:Arial,sans-serif;">
<div style="max-width:580px;margin:32px auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="background:#0A0A0A;padding:36px 32px;">
    <div style="width:52px;height:52px;border-radius:50%;background:#C89B7B;text-align:center;line-height:52px;font-size:24px;font-weight:700;color:white;margin-bottom:20px;">A</div>
    <h1 style="margin:0 0 8px;color:white;font-size:26px;font-weight:700;">
      Grazie, ${escHtml(data.name)}! ✓
    </h1>
    <p style="margin:0;color:rgba(255,255,255,0.6);font-size:15px;">
      Abbiamo ricevuto la tua richiesta di preventivo.
    </p>
  </div>

  <!-- Body -->
  <div style="background:#ffffff;padding:32px;">
    <p style="color:#57534E;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Ciao <strong>${escHtml(data.name)}</strong>,<br>
      abbiamo ricevuto la tua richiesta per
      <strong>${escHtml(PROJECT_LABELS[data.projectType] ?? data.projectType)}</strong>
      ${data.city ? ` a <strong>${escHtml(data.city)}</strong>` : ''}.
    </p>
    <p style="color:#57534E;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Ti contatteremo entro <strong>24 ore</strong> per concordare un sopralluogo gratuito
      e senza impegno.
    </p>

    <!-- Timeline -->
    <div style="background:#F9F8F6;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#44403C;letter-spacing:0.1em;text-transform:uppercase;">Cosa succede adesso</p>
      ${step('✓', 'Richiesta ricevuta', 'Già fatto!', true)}
      ${step('2', 'Ti contattiamo', 'Entro 24 ore · telefono o WhatsApp', false)}
      ${step('3', 'Sopralluogo gratuito', 'Senza impegno · su appuntamento', false)}
      ${step('4', 'Preventivo dettagliato', 'Entro 24h dal sopralluogo', false)}
    </div>

    <!-- WhatsApp CTA -->
    <div style="text-align:center;">
      <p style="color:#78716C;font-size:13px;margin:0 0 12px;">Hai urgenza? Scrivici direttamente:</p>
      <a href="https://wa.me/393892407827?text=${encodeURIComponent(`Ciao! Sono ${data.name}, ho appena inviato la richiesta di preventivo dal sito.`)}"
         style="display:inline-block;background:#25D366;color:white;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;">
        💬 Scrivici su WhatsApp
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#F5F5F4;padding:16px 32px;text-align:center;border-top:1px solid #E7E5E4;">
    <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#44403C;">
      Arteparquet — Maestri del Parquet dal 2004
    </p>
    <p style="margin:0;font-size:11px;color:#A8A29E;">
      +39 389 240 7827 · info@arteparquet.pro · arteparquet.pro
    </p>
    <p style="margin:8px 0 0;font-size:10px;color:#D6D3D1;">
      Hai ricevuto questa email perché hai inviato una richiesta su arteparquet.pro
    </p>
  </div>
</div>
</body>
</html>`
}

// ── Mini helpers ──────────────────────────────────────────────────────────
function escHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function tr(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #F5F5F4;color:#78716C;font-size:13px;width:130px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #F5F5F4;color:#1A1A1A;font-size:14px;font-weight:600;">${value}</td>
  </tr>`
}

function step(num: string, title: string, sub: string, done: boolean) {
  return `<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;">
    <div style="width:28px;height:28px;border-radius:50%;background:${done ? '#C89B7B' : '#E7E5E4'};text-align:center;line-height:28px;font-size:12px;font-weight:700;color:${done ? 'white' : '#A8A29E'};flex-shrink:0;">${num}</div>
    <div>
      <p style="margin:0;font-size:14px;font-weight:600;color:#1A1A1A;">${title}</p>
      <p style="margin:0;font-size:12px;color:${done ? '#C89B7B' : '#78716C'};">${sub}</p>
    </div>
  </div>`
}
