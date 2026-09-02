'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Upload, Phone, MessageCircle, CheckCircle, Home, Ruler, MapPin, Camera, User } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { trackCtaClick, trackFormComplete } from '@/lib/analytics'

type ServiceType = 'levigatura' | 'posa' | 'restauro' | 'riparazione' | 'spc' | ''
type FloorCondition = 'buono' | 'graffiato' | 'danneggiato' | 'antico' | ''

interface FormData {
  service: ServiceType
  sqm: string
  condition: FloorCondition
  city: string
  cap: string
  name: string
  phone: string
  email: string
  notes: string
  photos: File[]
}

const SERVICES = [
  { value: 'levigatura', label: 'Levigatura Parquet', icon: '✨', desc: 'Ripristino e nuova finitura' },
  { value: 'posa', label: 'Posa Parquet', icon: '🪵', desc: 'Nuovo pavimento in legno' },
  { value: 'restauro', label: 'Restauro Parquet', icon: '🔧', desc: 'Recupero parquet antico' },
  { value: 'riparazione', label: 'Riparazione', icon: '🛠️', desc: 'Danni, scricchiolii, rigonfiamenti' },
  { value: 'spc', label: 'Pavimenti SPC/PVC', icon: '💧', desc: 'Impermeabili, per bagni e cucine' },
]

const CONDITIONS = [
  { value: 'buono', label: 'Buono stato', desc: 'Solo rinfrescata' },
  { value: 'graffiato', label: 'Graffi e usura', desc: 'Segni visibili di utilizzo' },
  { value: 'danneggiato', label: 'Danneggiato', desc: 'Listelli rotti, macchie, danni' },
  { value: 'antico', label: 'Parquet antico', desc: 'Richiede restauro conservativo' },
]

export default function PreventivoPag() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    service: '',
    sqm: '',
    condition: '',
    city: '',
    cap: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    photos: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 5

  const updateForm = (field: keyof FormData, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.service !== ''
      case 2: return formData.sqm !== '' && parseInt(formData.sqm) > 0
      case 3: return formData.condition !== ''
      case 4: return formData.city !== '' && formData.cap !== ''
      case 5: return formData.name !== '' && formData.phone !== ''
      default: return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    trackCtaClick('quote_wizard_submit', 'preventivo_page')
    trackFormComplete({
      projectType: formData.service || 'consulenza',
      clientType: 'privato',
      city: formData.city,
      user: {
        email: formData.email || undefined,
        phone: formData.phone,
        firstName: formData.name,
      },
    })

    // Build WhatsApp message
    const serviceLabel = SERVICES.find((s) => s.value === formData.service)?.label || formData.service
    const conditionLabel = CONDITIONS.find((c) => c.value === formData.condition)?.label || formData.condition

    const message = `Ciao Arteparquet! Richiedo un preventivo:

📋 Servizio: ${serviceLabel}
📐 Metratura: ${formData.sqm} mq
🏠 Stato pavimento: ${conditionLabel}
📍 Zona: ${formData.city} (${formData.cap})
👤 Nome: ${formData.name}
📞 Telefono: ${formData.phone}
${formData.email ? `📧 Email: ${formData.email}` : ''}
${formData.notes ? `📝 Note: ${formData.notes}` : ''}

Attendo vostro riscontro, grazie!`

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Redirect to WhatsApp
    const waUrl = `https://wa.me/393892407827?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank')

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-travertino pt-32 pb-20">
        <div className="container-wide max-w-2xl">
          <FadeIn>
            <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Richiesta Inviata!
              </h1>
              <p className="text-lg text-legno-bruciato/70 mb-8">
                Grazie per averci contattato. Ti risponderemo su WhatsApp entro pochi minuti 
                durante l'orario lavorativo (Lun-Ven 8-18, Sab 9-13).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+393892407827"
                  className="inline-flex items-center justify-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <Phone size={18} />
                  Chiama Ora
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 border border-legno-bruciato/20 hover:border-rovere text-legno-bruciato hover:text-rovere font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Torna alla Home
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-travertino pt-32 pb-20">
      <div className="container-wide max-w-3xl">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              Richiedi Preventivo Gratuito
            </h1>
            <p className="text-lg text-legno-bruciato/70 max-w-xl mx-auto">
              Compila il form in 2 minuti e ricevi una stima personalizzata. 
              Sopralluogo gratuito a Bergamo e Lombardia.
            </p>
          </div>
        </FadeIn>

        {/* Progress Bar */}
        <FadeIn delay={0.1}>
          <div className="mb-10">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-colors ${
                    s === step
                      ? 'bg-rovere text-white'
                      : s < step
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-legno-bruciato/40 border border-legno-bruciato/20'
                  }`}
                >
                  {s < step ? <CheckCircle size={18} /> : s}
                </div>
              ))}
            </div>
            <div className="h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-rovere transition-all duration-300"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>
        </FadeIn>

        {/* Form Card */}
        <FadeIn delay={0.15}>
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg">
            {/* Step 1: Servizio */}
            {step === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-rovere/10 rounded-xl flex items-center justify-center">
                    <Home className="text-rovere" size={24} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Di cosa hai bisogno?</h2>
                    <p className="text-legno-bruciato/60">Seleziona il servizio che ti interessa</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  {SERVICES.map((service) => (
                    <button
                      key={service.value}
                      onClick={() => updateForm('service', service.value as ServiceType)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                        formData.service === service.value
                          ? 'border-rovere bg-rovere/5'
                          : 'border-legno-bruciato/10 hover:border-rovere/50'
                      }`}
                    >
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <div className="font-semibold">{service.label}</div>
                        <div className="text-sm text-legno-bruciato/60">{service.desc}</div>
                      </div>
                      {formData.service === service.value && (
                        <CheckCircle className="ml-auto text-rovere" size={24} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Metratura */}
            {step === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-rovere/10 rounded-xl flex items-center justify-center">
                    <Ruler className="text-rovere" size={24} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Quanti metri quadri?</h2>
                    <p className="text-legno-bruciato/60">Anche una stima approssimativa va bene</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sqm" className="block text-sm font-medium mb-2">
                      Superficie in mq
                    </label>
                    <input
                      type="number"
                      id="sqm"
                      value={formData.sqm}
                      onChange={(e) => updateForm('sqm', e.target.value)}
                      placeholder="Es. 80"
                      min="1"
                      className="w-full px-4 py-3 rounded-xl border border-legno-bruciato/20 focus:border-rovere focus:ring-2 focus:ring-rovere/20 outline-none transition-all text-lg"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['20', '40', '60', '80', '100', '150'].map((val) => (
                      <button
                        key={val}
                        onClick={() => updateForm('sqm', val)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          formData.sqm === val
                            ? 'border-rovere bg-rovere text-white'
                            : 'border-legno-bruciato/20 hover:border-rovere'
                        }`}
                      >
                        {val} mq
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Stato */}
            {step === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-rovere/10 rounded-xl flex items-center justify-center">
                    <Camera className="text-rovere" size={24} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Stato del pavimento</h2>
                    <p className="text-legno-bruciato/60">Come si presenta attualmente?</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  {CONDITIONS.map((condition) => (
                    <button
                      key={condition.value}
                      onClick={() => updateForm('condition', condition.value as FloorCondition)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                        formData.condition === condition.value
                          ? 'border-rovere bg-rovere/5'
                          : 'border-legno-bruciato/10 hover:border-rovere/50'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{condition.label}</div>
                        <div className="text-sm text-legno-bruciato/60">{condition.desc}</div>
                      </div>
                      {formData.condition === condition.value && (
                        <CheckCircle className="text-rovere" size={24} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Località */}
            {step === 4 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-rovere/10 rounded-xl flex items-center justify-center">
                    <MapPin className="text-rovere" size={24} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Dove si trova?</h2>
                    <p className="text-legno-bruciato/60">Operiamo a Bergamo, Milano e tutta la Lombardia</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      Città / Comune
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateForm('city', e.target.value)}
                      placeholder="Es. Bergamo"
                      className="w-full px-4 py-3 rounded-xl border border-legno-bruciato/20 focus:border-rovere focus:ring-2 focus:ring-rovere/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="cap" className="block text-sm font-medium mb-2">
                      CAP
                    </label>
                    <input
                      type="text"
                      id="cap"
                      value={formData.cap}
                      onChange={(e) => updateForm('cap', e.target.value)}
                      placeholder="Es. 24122"
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-xl border border-legno-bruciato/20 focus:border-rovere focus:ring-2 focus:ring-rovere/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Contatto */}
            {step === 5 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-rovere/10 rounded-xl flex items-center justify-center">
                    <User className="text-rovere" size={24} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Come ti contattiamo?</h2>
                    <p className="text-legno-bruciato/60">Ti risponderemo in pochi minuti</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Mario Rossi"
                      className="w-full px-4 py-3 rounded-xl border border-legno-bruciato/20 focus:border-rovere focus:ring-2 focus:ring-rovere/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="+39 333 123 4567"
                      className="w-full px-4 py-3 rounded-xl border border-legno-bruciato/20 focus:border-rovere focus:ring-2 focus:ring-rovere/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email (opzionale)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="mario@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-legno-bruciato/20 focus:border-rovere focus:ring-2 focus:ring-rovere/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-2">
                      Note aggiuntive (opzionale)
                    </label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => updateForm('notes', e.target.value)}
                      placeholder="Descrivi il problema o le tue esigenze..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-legno-bruciato/20 focus:border-rovere focus:ring-2 focus:ring-rovere/20 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-legno-bruciato/10">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 text-legno-bruciato/70 hover:text-legno-bruciato font-medium transition-colors"
                >
                  <ArrowLeft size={18} />
                  Indietro
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="inline-flex items-center gap-2 bg-rovere hover:bg-rovere/90 disabled:bg-legno-bruciato/20 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Continua
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] disabled:bg-legno-bruciato/20 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  {isSubmitting ? (
                    'Invio in corso...'
                  ) : (
                    <>
                      <MessageCircle size={18} />
                      Invia su WhatsApp
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Trust Signals */}
        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <p className="text-sm text-legno-bruciato/50 mb-4">
              Risposta garantita in 5 minuti durante l'orario lavorativo
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-legno-bruciato/60">
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-500" />
                Preventivo gratuito
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-500" />
                Sopralluogo senza impegno
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-500" />
                30 anni di esperienza
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
