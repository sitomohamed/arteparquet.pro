'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, X, CheckCircle, Loader2, Camera, MessageCircle, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { trackFormComplete, trackCtaClick } from '@/lib/analytics'
import { trackMetaLead } from '@/components/analytics/meta-pixel'
import Link from 'next/link'

const MAX_FILES = 10
const MAX_SIZE_MB = 10
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']

interface FilePreview {
  id: string
  file: File
  preview: string
}

const PHONE_CLEAN = '+393892407827'
const WA_AFTER_UPLOAD = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(
  'Ciao! Ho appena inviato le foto del mio parquet via email. Potete confermare la ricezione?'
)}`

export function PhotoUploadForm() {
  const [files, setFiles] = useState<FilePreview[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [csrfToken, setCsrfToken] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // SECURITY: Load CSRF token on component mount
  useEffect(() => {
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => {
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken)
        }
      })
      .catch(err => console.error('Failed to load CSRF token:', err))
  }, [])

  const addFiles = useCallback((incoming: File[]) => {
    const valid = incoming.filter((f) => {
      if (!ACCEPTED_TYPES.includes(f.type)) return false
      if (f.size > MAX_SIZE_MB * 1024 * 1024) return false
      return true
    })
    const remaining = MAX_FILES - files.length
    const toAdd = valid.slice(0, remaining).map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      preview: URL.createObjectURL(f),
    }))
    setFiles((prev) => [...prev, ...toAdd])
  }, [files.length])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      addFiles(Array.from(e.dataTransfer.files))
    },
    [addFiles]
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files))
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id)
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter((f) => f.id !== id)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // SECURITY: Require CSRF token
    if (!csrfToken) {
      setError('Errore di sicurezza. Ricarica la pagina e riprova.')
      return
    }

    if (!name.trim() || !phone.trim()) {
      setError('Per favore inserisci nome e telefono.')
      return
    }
    if (files.length === 0) {
      setError('Aggiungi almeno una foto del parquet.')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('phone', phone.trim())
      formData.append('message', message.trim())
      // SECURITY: Include CSRF token
      formData.append('csrfToken', csrfToken)
      files.forEach((f) => formData.append('photos', f.file))

      const res = await fetch('/api/foto', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Errore invio. Riprova o scrivici su WhatsApp.')
      }

      // Track conversion
      trackFormComplete({ projectType: 'foto-valutazione', clientType: 'unknown' })
      trackMetaLead(1)

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di rete. Scrivici su WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-neutral-100 p-10 text-center shadow-[0_8px_40px_rgba(0,0,0,0.07)]"
      >
        <div className="w-16 h-16 rounded-full bg-wood-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-rovere" aria-hidden="true" />
        </div>
        <h3 className="font-serif font-semibold text-legno-bruciato text-[1.5rem] mb-3">
          Foto inviate!
        </h3>
        <p className="font-sans text-[15px] text-neutral-600 leading-relaxed mb-8 max-w-sm mx-auto">
          Abbiamo ricevuto le tue foto. Ti risponderemo via email o telefono in orario lavorativo.
          Puoi anche confermarci l&apos;invio su WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={WA_AFTER_UPLOAD}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('whatsapp', 'photo_form_success')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-sans text-[14px] font-semibold hover:bg-[#20b858] transition-colors"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Conferma su WhatsApp
          </a>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-200 text-legno-bruciato font-sans text-[14px] font-medium hover:border-rovere transition-colors"
          >
            Vedi i nostri lavori <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-neutral-100 p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.07)]"
    >
      <h3 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-2">
        Invia le foto via email
      </h3>
      <p className="font-sans text-[13px] text-neutral-500 mb-7">
        Caricate le foto, i tuoi recapiti e ti risponderemo in orario lavorativo.
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Zona di caricamento foto - clicca o trascina le immagini"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 mb-6',
          isDragging
            ? 'border-rovere bg-wood-50 scale-[1.01]'
            : 'border-neutral-200 hover:border-rovere hover:bg-wood-50/50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          multiple
          onChange={handleFileInput}
          className="sr-only"
          aria-hidden="true"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-wood-100 flex items-center justify-center">
            {isDragging ? (
              <Upload size={22} className="text-rovere" aria-hidden="true" />
            ) : (
              <Camera size={22} className="text-rovere" aria-hidden="true" />
            )}
          </div>
          <div>
            <p className="font-sans font-semibold text-[14px] text-legno-bruciato">
              {isDragging ? 'Rilascia le foto qui' : 'Clicca o trascina le foto'}
            </p>
            <p className="font-sans text-[12px] text-neutral-400 mt-1">
              JPG, PNG, WEBP - Max {MAX_SIZE_MB} MB per foto - Fino a {MAX_FILES} foto
            </p>
          </div>
        </div>
      </div>

      {/* Previews */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              {files.length} {files.length === 1 ? 'foto selezionata' : 'foto selezionate'}
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {files.map((f) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.preview}
                    alt="Anteprima foto parquet"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(f.id) }}
                    aria-label="Rimuovi foto"
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <X size={10} aria-hidden="true" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact fields */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-sans text-[13px] font-semibold text-legno-bruciato mb-1.5">
              Il tuo nome *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="es. Mario Rossi"
              required
              className="w-full h-12 px-4 rounded-lg border border-neutral-200 font-sans text-[15px] text-legno-bruciato bg-neutral-50 focus:bg-white outline-none focus:ring-2 focus:ring-rovere/15 focus:border-rovere transition-all placeholder:text-neutral-400"
            />
          </div>
          <div>
            <label className="block font-sans text-[13px] font-semibold text-legno-bruciato mb-1.5">
              Telefono *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="es. +39 333 123 4567"
              required
              className="w-full h-12 px-4 rounded-lg border border-neutral-200 font-sans text-[15px] text-legno-bruciato bg-neutral-50 focus:bg-white outline-none focus:ring-2 focus:ring-rovere/15 focus:border-rovere transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div>
          <label className="block font-sans text-[13px] font-semibold text-legno-bruciato mb-1.5">
            Descrivici il problema (opzionale)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="es. Parquet con graffi profondi, zona cucina circa 20 mq, finitura verniciata..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-neutral-200 font-sans text-[15px] text-legno-bruciato bg-neutral-50 focus:bg-white outline-none focus:ring-2 focus:ring-rovere/15 focus:border-rovere transition-all placeholder:text-neutral-400 resize-y min-h-[80px]"
          />
        </div>

        {/* Privacy */}
        <p className="font-sans text-[12px] text-neutral-400 leading-relaxed">
          Inviando il modulo accetti la{' '}
          <Link href="/privacy-policy" className="text-rovere underline hover:text-wood-600" target="_blank">
            Privacy Policy
          </Link>
          . I tuoi dati vengono usati solo per rispondere alla tua richiesta.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 p-4 rounded-lg bg-red-50 border border-red-200 font-sans text-[13px] text-red-700">
           {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 h-14 rounded-xl bg-rovere text-white font-sans text-[15px] font-semibold hover:bg-wood-500 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] transition-all duration-200 shadow-sm"
      >
        {isSubmitting ? (
          <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Invio in corso...</>
        ) : (
          <><Upload size={18} aria-hidden="true" /> Invia le Foto</>
        )}
      </button>

      <p className="font-sans text-[12px] text-neutral-400 text-center mt-4">
        Preferisci WhatsApp?{' '}
        <a
          href={WA_AFTER_UPLOAD}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rovere underline hover:text-wood-600"
        >
          Scrivici direttamente
        </a>
      </p>
    </form>
  )
}
