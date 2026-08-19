'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const schema = z.object({
  projectType: z.string().min(1, 'Seleziona un tipo di progetto'),
  clientType: z.string().min(1, 'Seleziona il tipo di cliente'),
  area: z.string().optional(),
  city: z.string().min(2, 'Inserisci la tua città'),
  message: z.string().optional(),
  name: z.string().min(2, 'Inserisci il tuo nome'),
  phone: z.string().min(8, 'Inserisci un numero valido'),
  email: z.string().email('Inserisci un\'email valida'),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Devi accettare la privacy policy' }) }),
  csrfToken: z.string().min(1),
  timestamp: z.string(),
  // Honeypot fields (should remain empty)
  website: z.string().max(0).optional(),
  url: z.string().max(0).optional(),
})

type FormData = z.infer<typeof schema>

const PROJECT_TYPES = [
  { value: 'nuova-posa', label: 'Nuova installazione', icon: '🪵' },
  { value: 'restauro', label: 'Restauro / Levigatura', icon: '✨' },
  { value: 'riparazione', label: 'Riparazione', icon: '🔧' },
  { value: 'consulenza', label: 'Solo consulenza', icon: '💬' },
]

const CLIENT_TYPES = [
  { value: 'privato', label: 'Privato / Famiglia', icon: '🏠' },
  { value: 'architetto', label: 'Architetto / Designer', icon: '📐' },
  { value: 'impresa', label: 'Impresa / Costruttore', icon: '🏗️' },
  { value: 'hotel', label: 'Hotel / Ristorante', icon: '🏨' },
]

const STEPS = ['Progetto', 'Cliente', 'Dettagli', 'Contatti']

export function ContactForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')
  const [formStartTime] = useState(Date.now())

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { 
      projectType: '', 
      clientType: '', 
      privacy: undefined,
      csrfToken: '',
      timestamp: formStartTime.toString(),
      website: '',
      url: '',
    },
  })
  
  // Load CSRF token on component mount
  useEffect(() => {
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => {
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken)
          setValue('csrfToken', data.csrfToken)
        }
      })
      .catch(err => console.error('Failed to load CSRF token:', err))
  }, [])

  const projectType = watch('projectType')
  const clientType = watch('clientType')
  const name = watch('name')

  const [submitError, setSubmitError] = useState<string | null>(null)

  async function onSubmit(data: FormData) {
    setSubmitError(null)
    
    // Security checks before submission
    if (!csrfToken) {
      setSubmitError('Errore di sicurezza. Ricarica la pagina.')
      return
    }
    
    // Ensure honeypot fields are empty (bot check)
    if (data.website || data.url) {
      setSubmitError('Rilevata attività sospetta.')
      return
    }
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          csrfToken,
          timestamp: formStartTime.toString(),
        }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Errore invio')
      }
      setSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Errore di rete. Riprova o scrivici su WhatsApp.'
      )
    }
  }

  async function nextStep() {
    const fields: (keyof FormData)[][] = [
      ['projectType'],
      ['clientType'],
      ['city'],
      ['name', 'phone', 'email', 'privacy'],
    ]
    const valid = await trigger(fields[step])
    if (valid) setStep((s) => s + 1)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 rounded-full bg-wood-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-rovere" />
        </div>
        <h3 className="font-serif font-semibold text-legno-bruciato text-[1.5rem] mb-3">
          Grazie{name ? `, ${name}` : ''}!
        </h3>
        <p className="font-sans text-[15px] text-neutral-600 leading-relaxed mb-8 max-w-sm mx-auto">
          Abbiamo ricevuto la tua richiesta. Ti contatteremo entro 24 ore per discutere del tuo progetto.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 transition-colors"
          >
            Esplora i nostri lavori
          </Link>
          <a
            href={`https://wa.me/393892407827?text=${encodeURIComponent('Ciao! Ho appena inviato il modulo di contatto.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-200 text-legno-bruciato font-sans text-[14px] font-medium hover:border-rovere transition-colors"
          >
            Scrivici su WhatsApp
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot fields - hidden from users, bots may fill them */}
      <input
        {...register('website')}
        type="text"
        style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}
        tabIndex={-1}
        autoComplete="off"
      />
      <input
        {...register('url')}
        type="email"
        style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}
        tabIndex={-1}
        autoComplete="off"
      />
      <input {...register('csrfToken')} type="hidden" />
      <input {...register('timestamp')} type="hidden" />
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={cn(
                'flex items-center justify-center font-sans text-[11.5px] font-semibold transition-all duration-300',
                i < step
                  ? 'w-7 h-7 rounded-full bg-rovere text-white shadow-sm shadow-rovere/30'
                  : i === step
                    ? 'w-7 h-7 rounded-full bg-legno-bruciato text-white ring-2 ring-legno-bruciato/20 ring-offset-1'
                    : 'w-7 h-7 rounded-full bg-neutral-100 text-neutral-400'
              )}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={cn(
                'font-sans text-[12px] hidden sm:block transition-colors duration-200',
                i === step ? 'text-legno-bruciato font-semibold' : i < step ? 'text-rovere' : 'text-neutral-400'
              )}>{label}</span>
              {i < STEPS.length - 1 && (
                <div className={cn('h-px w-6 sm:w-12 mx-1 transition-colors duration-500', i < step ? 'bg-rovere' : 'bg-neutral-200')} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0 — Project type */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h3 className="font-sans text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Che tipo di progetto hai in mente?
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setValue('projectType', type.value)}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all duration-200 hover:-translate-y-0.5',
                    projectType === type.value
                      ? 'border-rovere bg-wood-50 shadow-sm shadow-rovere/10'
                      : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                  )}
                >
                  <span className="text-xl mb-2 block">{type.icon}</span>
                  <span className="font-sans text-[13px] font-semibold text-legno-bruciato">{type.label}</span>
                </button>
              ))}
            </div>
            {errors.projectType && (
              <p className="font-sans text-[12px] text-error mb-4">{errors.projectType.message}</p>
            )}
          </motion.div>
        )}

        {/* Step 1 — Client type */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h3 className="font-sans text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Chi sei?
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {CLIENT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setValue('clientType', type.value)}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all duration-200 hover:-translate-y-0.5',
                    clientType === type.value
                      ? 'border-rovere bg-wood-50 shadow-sm shadow-rovere/10'
                      : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                  )}
                >
                  <span className="text-xl mb-2 block">{type.icon}</span>
                  <span className="font-sans text-[13px] font-semibold text-legno-bruciato">{type.label}</span>
                </button>
              ))}
            </div>
            {errors.clientType && (
              <p className="font-sans text-[12px] text-error mb-4">{errors.clientType.message}</p>
            )}
          </motion.div>
        )}

        {/* Step 2 — Project details */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h3 className="font-sans text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Qualche dettaglio in più
            </h3>
            <div className="space-y-4 mb-6">
              <FormField
                label="Città / Comune *"
                error={errors.city?.message}
              >
                <input
                  {...register('city')}
                  placeholder="es. Milano"
                  className={inputClass(!!errors.city)}
                  autoFocus
                />
              </FormField>
              <FormField
                label="Superficie approssimativa (mq)"
                hint="Approssimativo va bene"
              >
                <input
                  {...register('area')}
                  placeholder="es. 80 mq"
                  className={inputClass(false)}
                />
              </FormField>
              <FormField label="Note aggiuntive">
                <textarea
                  {...register('message')}
                  placeholder="Descrivi il tuo progetto, i materiali preferiti, scadenze..."
                  rows={3}
                  className={cn(inputClass(false), 'resize-y min-h-[80px]')}
                />
              </FormField>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Contact info */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h3 className="font-sans text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Come possiamo contattarti?
            </h3>
            <div className="space-y-4 mb-6">
              <FormField label="Il tuo nome *" error={errors.name?.message}>
                <input
                  {...register('name')}
                  placeholder="es. Mario Rossi"
                  className={inputClass(!!errors.name)}
                  autoFocus
                />
              </FormField>
              <FormField label="Telefono *" error={errors.phone?.message}>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="es. +39 333 123 4567"
                  className={inputClass(!!errors.phone)}
                />
              </FormField>
              <FormField label="Email *" error={errors.email?.message}>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="es. mario@email.com"
                  className={inputClass(!!errors.email)}
                />
              </FormField>
              {/* Privacy */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('privacy')}
                    className="mt-0.5 w-4 h-4 accent-rovere flex-shrink-0"
                  />
                  <span className="font-sans text-[12px] text-neutral-500 leading-relaxed">
                    Ho letto e accetto la{' '}
                    <Link href="/privacy-policy" className="text-rovere underline hover:text-wood-600" target="_blank">
                      Privacy Policy
                    </Link>{' '}
                    e acconsento al trattamento dei miei dati personali per ricevere un preventivo.
                  </span>
                </label>
                {errors.privacy && (
                  <p className="font-sans text-[12px] text-error mt-1">{errors.privacy.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      {submitError && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-[13px] text-red-700 font-sans">
          ⚠️ {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-100">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-200 text-neutral-600 font-sans text-[14px] font-medium hover:border-neutral-300 hover:bg-neutral-50 transition-all"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Indietro
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 active:scale-[0.98] transition-all"
          >
            Continua <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-rovere text-white font-sans text-[14px] font-semibold hover:bg-wood-500 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Invio in corso...</>
            ) : (
              <>Invia Richiesta <ArrowRight size={16} aria-hidden="true" /></>
            )}
          </button>
        )}
      </div>
    </form>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full h-12 px-4 rounded-lg border font-sans text-[15px] text-legno-bruciato',
    'bg-neutral-50 focus:bg-white',
    'placeholder:text-neutral-380 outline-none transition-all duration-200',
    'focus:ring-2 focus:ring-rovere/15 focus:border-rovere focus:shadow-[0_0_0_3px_rgba(200,155,123,0.08)]',
    hasError ? 'border-error bg-red-50/30' : 'border-neutral-200 hover:border-neutral-300'
  )
}

interface FormFieldProps {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, hint, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="block font-sans text-[13px] font-semibold text-legno-bruciato mb-1.5">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="font-sans text-[11px] text-neutral-400 mt-1">{hint}</p>
      )}
      {error && (
        <p className="font-sans text-[12px] text-error mt-1">{error}</p>
      )}
    </div>
  )
}
