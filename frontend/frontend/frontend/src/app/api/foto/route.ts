import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { saveLead } from '@/lib/leads'
import { getApiSecurityHeaders, checkRateLimit, detectHoneypot } from '@/lib/security'
import { 
  sanitizeInputServer, 
  parseContactServer,
  validateCSRFTokenServer 
} from '@/lib/security-server'

const MAX_FILES = 10
const MAX_SIZE_MB = 10
const MAX_TOTAL_SIZE_MB = 50 // Total upload limit

// Accepted MIME types for photos
const ACCEPTED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
])

// SECURITY: Magic bytes for image validation
const IMAGE_SIGNATURES: Record<string, number[][]> = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header
  'image/heic': [[0x00, 0x00, 0x00]], // ftyp box (partial)
  'image/heif': [[0x00, 0x00, 0x00]], // ftyp box (partial)
}

// SECURITY: Validate file content matches claimed MIME type
function validateImageContent(buffer: Buffer, mimeType: string): boolean {
  const signatures = IMAGE_SIGNATURES[mimeType]
  if (!signatures) return false
  
  return signatures.some(sig => {
    if (buffer.length < sig.length) return false
    return sig.every((byte, i) => buffer[i] === byte)
  })
}

// SECURITY: Sanitize filename to prevent path traversal
function sanitizeFilename(filename: string, index: number): string {
  // Remove path components and dangerous characters
  const sanitized = filename
    .replace(/[/\\:*?"<>|]/g, '')
    .replace(/\.\./g, '')
    .replace(/^\./g, '')
    .slice(0, 100)
  
  // If filename is empty or suspicious, generate a safe one
  if (!sanitized || sanitized.length < 3) {
    return `foto-${index + 1}-${Date.now()}.jpg`
  }
  
  return sanitized
}

function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) return null
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const securityHeaders = getApiSecurityHeaders()

  try {
    // SECURITY: Rate limiting - stricter for file uploads
    const rateLimit = checkRateLimit(req, {
      maxRequests: 30,
      windowMs: 3600000, // 1 hour
      blockDurationMs: 15 * 60 * 1000, // 15 minutes
      namespace: 'foto-upload',
    })
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Troppe richieste. Riprova tra qualche ora o contattaci su WhatsApp.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const contentType = req.headers.get('content-type') ?? ''
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Formato non valido. Usa multipart/form-data.' },
        { status: 400, headers: securityHeaders }
      )
    }

    const formData = await req.formData()
    
    // SECURITY: CSRF token validation
    const csrfToken = (formData.get('csrfToken') as string) || ''
    if (csrfToken && !validateCSRFTokenServer(csrfToken)) {
      return NextResponse.json(
        { error: 'Token di sicurezza non valido. Ricarica la pagina.' },
        { status: 403, headers: securityHeaders }
      )
    }
    
    // SECURITY: Honeypot detection
    const honeypotData: Record<string, unknown> = {}
    for (const [key] of formData.entries()) {
      if (['website', 'url', 'honeypot', 'trap'].includes(key)) {
        honeypotData[key] = formData.get(key)
      }
    }
    if (detectHoneypot(req, honeypotData)) {
      // Silently reject bots
      return NextResponse.json({ ok: true }, { status: 200, headers: securityHeaders })
    }
    
    // SECURITY: Sanitize inputs
    const rawName = ((formData.get('name') as string) || (formData.get('nome') as string) || '').trim().slice(0, 100)
    const rawPhone = ((formData.get('phone') as string) || (formData.get('telefono') as string) || '').trim().slice(0, 30)
    const rawMessage = ((formData.get('message') as string) || (formData.get('messaggio') as string) || '').trim().slice(0, 2000)
    const city = sanitizeInputServer(((formData.get('citta') as string) || '').trim().slice(0, 80))
    const jobType = sanitizeInputServer(((formData.get('tipoLavoro') as string) || '').trim().slice(0, 80))
    const landingVariant = sanitizeInputServer(((formData.get('variant') as string) || '').trim().slice(0, 40))
    let utm: Record<string, string> = {}
    try {
      const rawCtx = formData.get('lpContext')
      if (typeof rawCtx === 'string' && rawCtx) {
        const parsed = JSON.parse(rawCtx) as Record<string, unknown>
        for (const [k, v] of Object.entries(parsed)) {
          if (typeof v === 'string') utm[k] = v.slice(0, 120)
        }
      }
    } catch { /* ignore bad lpContext */ }
    
    const name = sanitizeInputServer(rawName)
    let phone: string
    let email: string | undefined
    try {
      const contact = parseContactServer(rawPhone)
      phone = contact.phone
      email = contact.email
    } catch {
      return NextResponse.json(
        { error: 'Inserisci un telefono o un\'email validi.' },
        { status: 400, headers: securityHeaders }
      )
    }
    const message = sanitizeInputServer(rawMessage)
    
    const photoFiles = [
      ...(formData.getAll('photos') as File[]),
      ...[...formData.entries()]
        .filter(([key, value]) => key.startsWith('foto_') && value instanceof File)
        .map(([, value]) => value as File),
    ].filter((f) => f && f.size > 0)

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Nome e telefono sono obbligatori.' },
        { status: 400, headers: securityHeaders }
      )
    }

    if (photoFiles.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Troppi file. Massimo ${MAX_FILES} foto.` },
        { status: 400, headers: securityHeaders }
      )
    }
    
    // SECURITY: Check total upload size
    const totalSize = photoFiles.reduce((sum, f) => sum + f.size, 0)
    if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `Upload totale troppo grande. Massimo ${MAX_TOTAL_SIZE_MB} MB.` },
        { status: 400, headers: securityHeaders }
      )
    }

    // Validate each photo
    // Using a plain array; typed loosely to avoid @types/nodemailer version quirks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attachments: any[] = []
    for (let i = 0; i < photoFiles.length; i++) {
      const file = photoFiles[i]
      
      const mimeType = file.type === 'image/jpg' ? 'image/jpeg' : file.type
      // SECURITY: Validate MIME type
      if (!ACCEPTED_TYPES.has(mimeType)) {
        return NextResponse.json(
          { error: `Tipo file non supportato: ${file.type || 'sconosciuto'}` },
          { status: 400, headers: securityHeaders }
        )
      }
      
      // SECURITY: Validate file size
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        return NextResponse.json(
          { error: `File troppo grande. Max ${MAX_SIZE_MB} MB per foto.` },
          { status: 400, headers: securityHeaders }
        )
      }
      
      const buffer = Buffer.from(await file.arrayBuffer())
      
      // SECURITY: Validate actual file content matches MIME type
      if (!validateImageContent(buffer, mimeType)) {
        return NextResponse.json(
          { error: 'Contenuto file non valido. Assicurati che sia un\'immagine vera.' },
          { status: 400, headers: securityHeaders }
        )
      }
      
      // SECURITY: Sanitize filename
      const safeFilename = sanitizeFilename(file.name ?? '', i)
      
      attachments.push({
        filename: safeFilename,
        content: buffer,
        contentType: mimeType,
      })
    }

    let crmSaved = false
    try {
      await saveLead({
        source: 'foto',
        name,
        phone,
        email,
        city: city || undefined,
        jobType: jobType || undefined,
        message: message || undefined,
        photoCount: photoFiles.length,
        landingVariant: landingVariant || utm.variant || undefined,
        ctaVariant: utm.cta_ab || undefined,
        utm,
      })
      crmSaved = true
    } catch (err) {
      console.error('[foto API] CRM save failed:', err)
    }

    const transporter = createTransporter()
    if (!transporter) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[foto API] Email not configured. Data received:', { name, phone, photoCount: photoFiles.length })
      }
      return NextResponse.json({ ok: true, crmSaved }, { headers: securityHeaders })
    }

    const recipientEmail = process.env.OWNER_EMAIL ?? process.env.GMAIL_USER
    if (!recipientEmail) {
      console.error('[foto API] No recipient email configured')
      return NextResponse.json({ ok: true, crmSaved }, { headers: securityHeaders })
    }
    const submittedAt = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })

    try {
    await transporter.sendMail({
      from: `"Arteparquet Sito" <${recipientEmail}>`,
      to: recipientEmail,
      subject: ` Foto parquet da ${name} - ${photoFiles.length} immagini`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #2D2A27;">
          <div style="background: #2D2A27; color: #F9F8F6; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 20px;"> Nuova richiesta con foto</h1>
            <p style="margin: 4px 0 0; opacity: 0.6; font-size: 13px;">${submittedAt}</p>
          </div>
          <div style="background: #FFFFFF; padding: 24px; border: 1px solid #E5E5E5; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Nome</td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Telefono</td><td><a href="tel:${phone}">${phone}</a></td></tr>
              ${city ? `<tr><td style="padding: 8px 0; font-weight: bold;">Città</td><td>${city}</td></tr>` : ''}
              ${jobType ? `<tr><td style="padding: 8px 0; font-weight: bold;">Lavoro</td><td>${jobType}</td></tr>` : ''}
              ${landingVariant ? `<tr><td style="padding: 8px 0; font-weight: bold;">Landing</td><td>${landingVariant}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold;">Foto allegate</td><td>${photoFiles.length}</td></tr>
              ${message ? `<tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Messaggio</td><td>${message.replace(/\n/g, '<br>')}</td></tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding: 14px; background: #C89B7B15; border-left: 3px solid #C89B7B; border-radius: 4px; font-size: 13px;">
               Rispondere entro 24 ore. Considera di chiamare direttamente al numero fornito.
            </div>
          </div>
        </div>
      `,
      attachments,
    })
    } catch (err) {
      console.error('[foto API] Email send failed:', err)
    }

    return NextResponse.json({ ok: true, crmSaved }, { headers: securityHeaders })
  } catch (err) {
    console.error('[foto API] Error:', err)
    return NextResponse.json(
      { error: 'Errore del server. Riprova o scrivici su WhatsApp.' },
      { status: 500, headers: securityHeaders }
    )
  }
}
