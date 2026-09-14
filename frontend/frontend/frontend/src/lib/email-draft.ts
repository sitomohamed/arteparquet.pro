/**
 * Email draft generator per lead B2B
 * Template italiano formale-umano per studi di architettura e imprese
 */

import { BUSINESS } from './constants'

export type EmailDraftInput = {
  recipientName: string
  recipientCompany?: string
  city?: string
  why_them?: string
  recipientType?: 'architetto' | 'designer' | 'impresa' | 'studio'
}

/**
 * Genera una bozza email personalizzata per un lead B2B.
 * 8-12 righe, italiano formale ma umano.
 */
export function generateB2BEmailDraft(input: EmailDraftInput): string {
  const { recipientName, recipientCompany, city, why_them, recipientType = 'studio' } = input

  const greeting = recipientCompany ? `${recipientName} di ${recipientCompany}` : recipientName
  const location = city ? ` a ${city}` : ' in zona'

  // Motivo del contatto (se fornito)
  const reasonParagraph = why_them
    ? `\n\nHo notato ${why_them.toLowerCase().startsWith('ho notato') ? why_them.slice(10) : why_them}, e credo che potremmo essere un partner affidabile per i vostri progetti.`
    : ''

  const typeSpecific =
    recipientType === 'architetto' || recipientType === 'designer'
      ? 'collaborare con studi professionali'
      : 'supportare imprese'

  return `Gentile ${greeting},

Mi chiamo Mohamed Arabi e sono il titolare di Arteparquet, una ditta specializzata in posa e restauro parquet con sede a Bergamo.${reasonParagraph}

Lavoriamo regolarmente con ${typeSpecific}${location} per cantieri residenziali e commerciali. La nostra esperienza comprende:
• Pose complesse (spina di pesce, Versailles, intarsi su misura)
• Transizioni e raccordi tra materiali
• Restauro parquet storico e di pregio
• Gestione massetti e preparazioni

Operiamo dal 1996 e collaboriamo con diversi studi in Lombardia. Forniamo preventivi tecnici dettagliati, garanzia scritta sulla manodopera e documentazione completa.

Qui trovate il nostro portfolio dedicato ai professionisti:
https://arteparquet.pro/lp/architetti

Se avete progetti in cui potremmo collaborare, sono disponibile per una chiamata conoscitiva senza impegno.

Cordiali saluti,

Mohamed Arabi
Arteparquet
${BUSINESS.phone}
${BUSINESS.email}
${BUSINESS.address.full}`.trim()
}

/**
 * Valida che la bozza email sia nel range accettabile (8-15 righe effettive).
 */
export function isValidEmailDraftLength(draft: string): boolean {
  const lines = draft.split('\n').filter((line) => line.trim().length > 0)
  return lines.length >= 8 && lines.length <= 20
}

/**
 * Estrae un subject line appropriato per l'email B2B.
 */
export function generateEmailSubject(recipientCompany?: string): string {
  if (recipientCompany) {
    return `Collaborazione posa parquet — ${recipientCompany}`
  }
  return 'Collaborazione posa parquet — Arteparquet Bergamo'
}
