'use client'

/**
 * LpPhotoForm - Landing Page Lead Form
 *
 * Shared between /lp/preventivo (B2C) and /lp/architetti (B2B).
 * Uploads photos to /api/foto and fires analytics events.
 *
 * B2C fields: nome, telefono, città, tipo lavoro, messaggio, foto (max 3)
 * B2B fields: nome, azienda, ruolo, città cantiere, tipo intervento, tempistiche, contatto, foto (opzionale)
 */

import { useState, useRef, useCallback, useId, useEffect } from 'react'
import { Upload, X, CheckCircle, Loader2, Camera, MessageCircle, Phone, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import { trackMetaLead } from '@/components/analytics/meta-pixel'
import { getLpContext } from '@/components/analytics/lp-tracker'

/* ------------------------------------------------------------------ */
/*  Types                                                                */
/* ------------------------------------------------------------------ */

export interface LpPhotoFormProps {
  variant: 'b2c' | 'b2b'
}

interface UploadedFile {
  file: File
  preview: string
}

/* ------------------------------------------------------------------ */
/*  Constants                                                            */
/* ------------------------------------------------------------------ */

const MAX_PHOTOS   = 3
const MAX_SIZE_MB  = 10
const MAX_SIZE_B   = MAX_SIZE_MB * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic']

const B2C_JOB_TYPES = [
  'Levigatura parquet esistente',
  'Posa parquet nuovo',
  'Restauro parquet',
  'Riparazione / scricchiolii',
  'Installazione SPC / PVC',
  'Non so ancora - voglio un consiglio',
]

const B2B_ROLES = [
  'Architetto',
  'Interior Designer',
  'Impresario / Appaltatore',
  'Geometra',
  'Altro professionista',
]

const B2B_INTERVENTIONS = [
  'Posa parquet nuovo',
  'Schema complesso (spina di pesce, Versailles...)',
  'Intarsio su misura',
  'Levigatura e verniciatura',
  'Restauro parquet storico',
  'SPC / pavimenti moderni',
]

const B2B_TIMINGS = [
  'Entro 1 mese',
  'Entro 3 mesi',
  'Entro 6 mesi',
  'Oltre 6 mesi / In fase di progetto',
]

/* ------------------------------------------------------------------ */
/*  Component                                                            */
/* ------------------------------------------------------------------ */

export function LpPhotoForm({ variant }: LpPhotoFormProps) {
  const formId = useId()
  const isB2B  = variant === 'b2b'

  /* State */
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formStarted, setFormStarted] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')

  /* SECURITY: Load CSRF token on mount */
  useEffect(() => {
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => {
        if (data.csrfToken) setCsrfToken(data.csrfToken)
      })
      .catch(() => { /* Token will be checked on submit */ })
  }, [])

  /* B2C fields */
  const [nome, setNome]           = useState('')
  const [telefono, setTelefono]   = useState('')
  const [citta, setCitta]         = useState('')
  const [tipoLavoro, setTipoLavoro] = useState('')
  const [messaggio, setMessaggio] = useState('')

  /* B2B extra fields */
  const [azienda, setAzienda]         = useState('')
  const [ruolo, setRuolo]             = useState('')
  const [cittaCantiere, setCittaCantiere] = useState('')
  const [tipoIntervento, setTipoIntervento] = useState('')
  const [tempistiche, setTempistiche] = useState('')
  const [contattoB2B, setContattoB2B] = useState('')

  /* Privacy */
  const [privacyOk, setPrivacyOk] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  /* ── Form start tracking ── */
  const handleFormStart = useCallback(() => {
    if (!formStarted) {
      setFormStarted(true)
      trackEvent('form_start', { landing_variant: variant })
    }
  }, [formStarted, variant])

  /* ── File handling ── */
  const addFiles = useCallback((incoming: File[]) => {
    setError(null)
    const valid: UploadedFile[] = []
    for (const f of incoming) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        setError('Formato non supportato. Usa JPG, PNG, WEBP o HEIC.')
        continue
      }
      if (f.size > MAX_SIZE_B) {
        setError(`"${f.name}" supera i ${MAX_SIZE_MB} MB. Riduci la dimensione e riprova.`)
        continue
      }
      valid.push({ file: f, preview: URL.createObjectURL(f) })
    }
    setFiles((prev) => [...prev, ...valid].slice(0, MAX_PHOTOS))
    if (valid.length > 0) {
      trackEvent('photo_upload', { count: valid.length, landing_variant: variant })
    }
  }, [variant])

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const next = [...prev]
      URL.revokeObjectURL(next[idx].preview)
      next.splice(idx, 1)
      return next
    })
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(Array.from(e.dataTransfer.files))
    handleFormStart()
  }, [addFiles, handleFormStart])

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // SECURITY: Require CSRF token
    if (!csrfToken) {
      setError('Errore di sicurezza. Ricarica la pagina e riprova.')
      return
    }
    
    if (!privacyOk) {
      setError('Devi accettare la Privacy Policy per inviare il modulo.')
      return
    }
    setSubmitting(true)
    setError(null)

    try {
      const fd = new FormData()
      // SECURITY: Include CSRF token
      fd.append('csrfToken', csrfToken)
      fd.append('variant', variant)
      fd.append('name', nome) // Use 'name' to match API expectation
      fd.append('message', isB2B ? `Azienda: ${azienda}\nRuolo: ${ruolo}\nCittà cantiere: ${cittaCantiere}\nTipo intervento: ${tipoIntervento}\nTempistiche: ${tempistiche}\nContatto: ${contattoB2B}` : messaggio)
      fd.append('phone', isB2B ? contattoB2B : telefono) // Use 'phone' to match API
      fd.append('citta', isB2B ? cittaCantiere : citta)
      fd.append('tipoLavoro', isB2B ? tipoIntervento : tipoLavoro)
      const lpCtx = getLpContext()
      fd.append('lpContext', JSON.stringify(lpCtx))
      files.forEach((f) => fd.append('photos', f.file)) // Use 'photos' to match API

      const res = await fetch('/api/foto', { method: 'POST', body: fd })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      /* Analytics */
      trackEvent('form_submit', {
        landing_variant: variant,
        has_photos: files.length > 0,
        photo_count: files.length,
      })
      trackMetaLead(1)
      setSubmitted(true)
    } catch {
      setError('Errore nell\'invio. Riprova o contattaci su WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Thank-you screen ── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="text-green-400" size={40} />
        </div>
        <h3 className="font-serif text-[24px] text-travertino font-bold">
          Messaggio inviato!
        </h3>
        <p className="font-sans text-[15px] text-travertino/70 max-w-md leading-relaxed">
          Abbiamo ricevuto la tua richiesta. Ti risponderemo in orario lavorativo
          (lun-ven 8:00-18:00, sab 9:00-13:00).
        </p>
        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/393892407827?text=${encodeURIComponent(isB2B
              ? 'Ciao! Ho appena inviato il modulo dal sito. Sono un professionista e vi contatto per una collaborazione.'
              : 'Ciao! Ho appena inviato il modulo dal sito. Vi contatto per una valutazione del mio parquet.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans text-[14px] font-semibold px-5 py-3 rounded-lg transition-colors"
            onClick={() => trackEvent('whatsapp_click', { context: 'form_thankyou', landing_variant: variant })}
          >
            <MessageCircle size={16} />
            Scrivi anche su WhatsApp
          </a>
          <a
            href="tel:+393892407827"
            className="inline-flex items-center gap-2 border border-white/20 text-travertino font-sans text-[14px] font-semibold px-5 py-3 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => trackEvent('phone_click', { context: 'form_thankyou', landing_variant: variant })}
          >
            <Phone size={16} />
            +39 389 240 7827
          </a>
        </div>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto flex flex-col gap-5"
      aria-label={isB2B ? 'Modulo richiesta campionatura o preventivo tecnico' : 'Modulo invia le foto del tuo parquet'}
    >
      {/* B2C fields */}
      {!isB2B && (
        <>
          <Field label="Il tuo nome *" htmlFor={`${formId}-nome`}>
            <input
              id={`${formId}-nome`}
              type="text"
              value={nome}
              onChange={(e) => { setNome(e.target.value); handleFormStart() }}
              required
              placeholder="Mario Rossi"
              className={inputCls}
            />
          </Field>
          <Field label="Telefono o email *" htmlFor={`${formId}-tel`}>
            <input
              id={`${formId}-tel`}
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              placeholder="+39 333 000 1234"
              className={inputCls}
            />
          </Field>
          <Field label="In quale città si trova il parquet?" htmlFor={`${formId}-citta`}>
            <input
              id={`${formId}-citta`}
              type="text"
              value={citta}
              onChange={(e) => setCitta(e.target.value)}
              placeholder="Es. Bergamo, Seriate, Milano..."
              className={inputCls}
            />
          </Field>
          <Field label="Tipo di intervento" htmlFor={`${formId}-tipo`}>
            <select
              id={`${formId}-tipo`}
              value={tipoLavoro}
              onChange={(e) => setTipoLavoro(e.target.value)}
              className={selectCls}
            >
              <option value="" className="bg-white text-legno-bruciato"> -  Seleziona  - </option>
              {B2C_JOB_TYPES.map((t) => (
                <option key={t} value={t} className="bg-white text-legno-bruciato">{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Descrivi brevemente la situazione" htmlFor={`${formId}-msg`}>
            <textarea
              id={`${formId}-msg`}
              value={messaggio}
              onChange={(e) => setMessaggio(e.target.value)}
              rows={3}
              placeholder="Es. Parquet in rovere anni '80, graffiato e opaco. Circa 40 mq."
              className={cn(inputCls, 'resize-y min-h-[80px]')}
            />
          </Field>
        </>
      )}

      {/* B2B fields */}
      {isB2B && (
        <>
          <Field label="Il tuo nome *" htmlFor={`${formId}-nome`}>
            <input
              id={`${formId}-nome`}
              type="text"
              value={nome}
              onChange={(e) => { setNome(e.target.value); handleFormStart() }}
              required
              placeholder="Mario Rossi"
              className={inputCls}
            />
          </Field>
          <Field label="Studio / Azienda" htmlFor={`${formId}-azienda`}>
            <input
              id={`${formId}-azienda`}
              type="text"
              value={azienda}
              onChange={(e) => setAzienda(e.target.value)}
              placeholder="Studio Architettura Rossi"
              className={inputCls}
            />
          </Field>
          <Field label="Ruolo" htmlFor={`${formId}-ruolo`}>
            <select
              id={`${formId}-ruolo`}
              value={ruolo}
              onChange={(e) => setRuolo(e.target.value)}
              className={selectCls}
            >
              <option value="" className="bg-white text-legno-bruciato"> -  Seleziona  - </option>
              {B2B_ROLES.map((r) => (
                <option key={r} value={r} className="bg-white text-legno-bruciato">{r}</option>
              ))}
            </select>
          </Field>
          <Field label="Città del cantiere *" htmlFor={`${formId}-cantiere`}>
            <input
              id={`${formId}-cantiere`}
              type="text"
              value={cittaCantiere}
              onChange={(e) => setCittaCantiere(e.target.value)}
              required
              placeholder="Es. Bergamo, Milano, Brescia..."
              className={inputCls}
            />
          </Field>
          <Field label="Tipo di intervento" htmlFor={`${formId}-intervento`}>
            <select
              id={`${formId}-intervento`}
              value={tipoIntervento}
              onChange={(e) => setTipoIntervento(e.target.value)}
              className={selectCls}
            >
              <option value="" className="bg-white text-legno-bruciato"> -  Seleziona  - </option>
              {B2B_INTERVENTIONS.map((t) => (
                <option key={t} value={t} className="bg-white text-legno-bruciato">{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Tempistiche previste" htmlFor={`${formId}-timing`}>
            <select
              id={`${formId}-timing`}
              value={tempistiche}
              onChange={(e) => setTempistiche(e.target.value)}
              className={selectCls}
            >
              <option value="" className="bg-white text-legno-bruciato"> -  Seleziona  - </option>
              {B2B_TIMINGS.map((t) => (
                <option key={t} value={t} className="bg-white text-legno-bruciato">{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Telefono o email per essere contattato *" htmlFor={`${formId}-contatto`}>
            <input
              id={`${formId}-contatto`}
              type="text"
              value={contattoB2B}
              onChange={(e) => setContattoB2B(e.target.value)}
              required
              placeholder="+39 333 000 1234 oppure nome@studio.it"
              className={inputCls}
            />
          </Field>
        </>
      )}

      {/* Photo upload - required for B2C, optional for B2B */}
      <div className="flex flex-col gap-2">
        <label className={labelCls}>
          {isB2B
            ? 'Foto del cantiere / materiali (opzionale)'
            : `Carica le foto del parquet ${files.length === 0 ? '(consigliato)' : `(${files.length}/${MAX_PHOTOS})`}`
          }
        </label>

        {/* Drop zone */}
        {files.length < MAX_PHOTOS && (
          <button
            type="button"
            aria-label="Carica foto"
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'relative w-full border-2 border-dashed rounded-xl py-8 px-4 flex flex-col items-center gap-3 transition-colors cursor-pointer',
              dragOver
                ? 'border-rovere bg-rovere/10'
                : 'border-white/20 hover:border-white/40 hover:bg-white/5'
            )}
          >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Camera size={22} className="text-white/60" />
            </div>
            <div className="text-center">
              <p className="font-sans text-[14px] text-travertino/80 font-semibold">
                Trascina qui le foto o tocca per selezionare
              </p>
              <p className="font-sans text-[12px] text-travertino/40 mt-1">
                JPG, PNG, WEBP, HEIC | Max {MAX_SIZE_MB} MB | Max {MAX_PHOTOS} foto
              </p>
            </div>
            <Upload size={16} className="text-white/40" />
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          multiple
          className="hidden"
          onChange={(e) => { addFiles(Array.from(e.target.files ?? [])); handleFormStart() }}
          aria-hidden="true"
        />

        {/* File previews */}
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-1">
            {files.map((f, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.preview}
                  alt={`Anteprima foto ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors"
                  aria-label={`Rimuovi foto ${i + 1}`}
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Alternative for B2C: WhatsApp photo suggestion */}
        {!isB2B && (
          <p className="font-sans text-[12px] text-travertino/40 leading-relaxed">
            In alternativa puoi inviare le foto direttamente su{' '}
            <a
              href={`https://wa.me/393892407827?text=${encodeURIComponent('Ciao! Vorrei inviarvi le foto del mio parquet per una valutazione gratuita.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] underline"
              onClick={() => trackEvent('whatsapp_click', { context: 'form_inline', landing_variant: variant })}
            >
              WhatsApp
            </a>
            .
          </p>
        )}
      </div>

      {/* Privacy */}
      <div className="flex items-start gap-3">
        <input
          id={`${formId}-privacy`}
          type="checkbox"
          checked={privacyOk}
          onChange={(e) => setPrivacyOk(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 accent-rovere cursor-pointer flex-shrink-0"
        />
        <label htmlFor={`${formId}-privacy`} className="font-sans text-[12px] text-travertino/50 leading-relaxed cursor-pointer">
          Ho letto e accetto la{' '}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-travertino/70 hover:text-travertino transition-colors"
          >
            Privacy Policy
          </a>{' '}
          e autorizzo il trattamento dei miei dati per rispondere alla mia richiesta. *
        </label>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-400 font-sans text-[13px] rounded-lg px-4 py-3"
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || !privacyOk}
        className={cn(
          'w-full flex items-center justify-center gap-2 font-sans text-[15px] font-bold py-4 rounded-xl transition-all duration-200 active:scale-[0.98]',
          submitting || !privacyOk
            ? 'bg-white/10 text-white/30 cursor-not-allowed'
            : 'bg-rovere hover:bg-wood-500 text-white shadow-lg hover:shadow-rovere/30'
        )}
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Invio in corso...
          </>
        ) : isB2B ? (
          <>Invia richiesta</>
        ) : (
          <>
            <Camera size={18} />
            Invia le foto - Valutazione gratuita
          </>
        )}
      </button>

      <p className="font-sans text-[11px] text-travertino/30 text-center leading-relaxed">
        Risposta in orario lavorativo | lun-ven 8:00-18:00 | sab 9:00-13:00
      </p>
    </form>
  )
}

/* ── Shared UI helpers ── */

const inputCls = [
  'w-full bg-white/10 border border-white/15 rounded-lg',
  'font-sans text-[14px] text-travertino placeholder:text-white/30',
  'px-4 py-3 outline-none',
  'focus:border-rovere focus:ring-1 focus:ring-rovere/40',
  'transition-colors duration-150',
  'appearance-none',
].join(' ')

/** Closed field stays readable; native list is white so options must be dark. */
const selectCls = [
  'w-full bg-white border border-white/20 rounded-lg',
  'font-sans text-[14px] text-legno-bruciato',
  'px-4 py-3 outline-none',
  'focus:border-rovere focus:ring-1 focus:ring-rovere/40',
  'transition-colors duration-150',
  '[&>option]:bg-white [&>option]:text-legno-bruciato',
].join(' ')

const labelCls = 'font-sans text-[13px] font-semibold text-travertino/70 leading-tight'

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
    </div>
  )
}
