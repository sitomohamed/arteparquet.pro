import nodemailer from 'nodemailer'
import { BUSINESS } from '@/lib/constants'

export type MailAttachment = {
  filename: string
  content: Buffer
  contentType?: string
}

export type SendMailResult = {
  sent: boolean
  error?: string
  to?: string
}

function gmailUser() {
  return process.env.GMAIL_USER?.trim() || ''
}

function gmailPass() {
  return (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '')
}

export function gmailConfigured() {
  return Boolean(gmailUser() && gmailPass())
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function emailDomain(value: string) {
  const at = value.lastIndexOf('@')
  return at >= 0 ? value.slice(at + 1).toLowerCase() : ''
}

function siteMailDomain() {
  return emailDomain(BUSINESS.email)
}

/**
 * Cloudflare Email Routing inoltra info@arteparquet.pro verso Gmail.
 * Gmail nasconde il messaggio se parte dallo stesso account e torna indietro
 * come duplicato. Non mandiamo mai verso il dominio del sito se SMTP è Gmail.
 */
function wouldLoopThroughCloudflare(recipient: string, sender: string) {
  const site = siteMailDomain()
  if (!site) return false
  const senderIsGmail = emailDomain(sender) === 'gmail.com'
  const recipientIsSiteAlias = emailDomain(recipient) === site
  return senderIsGmail && recipientIsSiteAlias
}

/** Destinatario principale: GMAIL_USER. OWNER_EMAIL solo se non crea un loop Cloudflare. */
export function ownerRecipients(): string[] {
  const sender = gmailUser()
  const seen = new Set<string>()
  const unique: string[] = []

  function push(email: string) {
    const key = email.toLowerCase()
    if (!looksLikeEmail(email) || seen.has(key)) return
    if (sender && wouldLoopThroughCloudflare(email, sender)) return
    seen.add(key)
    unique.push(email)
  }

  push(sender)
  for (const part of (process.env.OWNER_EMAIL ?? '').split(/[,;]/)) {
    push(part.trim())
  }
  return unique
}

export function ownerInbox() {
  const list = ownerRecipients()
  return list.length ? list.join(', ') : null
}

export function createGmailTransporter() {
  const user = gmailUser()
  const pass = gmailPass()
  if (!user || !pass) return null
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

export function sanitizeMailError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  const pass = gmailPass()
  const cleaned = pass ? raw.split(pass).join('[nascosta]') : raw
  if (/Invalid login|Username and Password not accepted|EAUTH/i.test(cleaned)) {
    return 'Gmail ha rifiutato l’accesso. Controlla GMAIL_USER e la password per le app su EasyPanel.'
  }
  if (/ECONNECTION|ETIMEDOUT|ESOCKET/i.test(cleaned)) {
    return 'Il server non riesce a raggiungere Gmail. Riprova tra un minuto.'
  }
  return cleaned.slice(0, 180)
}

/**
 * Testa la connessione SMTP senza inviare email.
 * Distingue "credenziali errate" da "timeout di rete".
 */
export async function verifySmtpConnection(): Promise<{ ok: boolean; error?: string }> {
  const transporter = createGmailTransporter()
  if (!transporter) {
    return { ok: false, error: 'Transporter non creato: GMAIL_USER o GMAIL_APP_PASSWORD mancanti.' }
  }
  try {
    await transporter.verify()
    return { ok: true }
  } catch (err) {
    return { ok: false, error: sanitizeMailError(err) }
  }
}

export async function sendMail(opts: {
  to: string
  subject: string
  html: string
  replyTo?: string
  attachments?: MailAttachment[]
}): Promise<SendMailResult> {
  const transporter = createGmailTransporter()
  const fromUser = gmailUser()
  const to = opts.to.trim()
  if (!transporter || !fromUser || !to) {
    return { sent: false, error: 'Gmail non è configurata sul server (GMAIL_USER / GMAIL_APP_PASSWORD).' }
  }
  try {
    await transporter.sendMail({
      from: `"Arteparquet Sito" <${fromUser}>`,
      to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      attachments: opts.attachments,
    })
    return { sent: true, to }
  } catch (err) {
    console.error('[mailer] send failed:', sanitizeMailError(err))
    return { sent: false, error: sanitizeMailError(err), to }
  }
}

export async function sendOwnerMail(opts: {
  subject: string
  html: string
  replyTo?: string
  attachments?: MailAttachment[]
}): Promise<SendMailResult> {
  const to = ownerInbox()
  if (!to) {
    return { sent: false, error: 'Gmail non è configurata sul server (GMAIL_USER / GMAIL_APP_PASSWORD).' }
  }
  return sendMail({ ...opts, to })
}
