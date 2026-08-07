import { FadeIn } from '@/components/animations/fade-in'

const STEPS = [
  {
    number: '01',
    title: 'Consulenza',
    description:
      'Sopralluogo gratuito e senza impegno. Ascoltiamo le tue esigenze, misuriamo lo spazio e valutiamo le possibilità.',
    detail: 'Entro 48 ore dalla richiesta',
  },
  {
    number: '02',
    title: 'Proposta',
    description:
      'Preventivo dettagliato e trasparente. Nessun costo nascosto, nessuna sorpresa. Solo chiarezza e professionalità.',
    detail: 'Entro 24 ore dal sopralluogo',
  },
  {
    number: '03',
    title: 'Realizzazione',
    description:
      'Posa a regola d\'arte con materiali premium. Il cantiere viene gestito con massima cura e rispetto per la tua casa.',
    detail: 'Tempi rispettati al 100%',
  },
  {
    number: '04',
    title: 'Consegna',
    description:
      'Il tuo nuovo pavimento, pronto da vivere. Consegna con pulizia finale inclusa e garanzia sulla posa.',
    detail: 'Garanzia scritta inclusa',
  },
]

export function ProcessSection() {
  return (
    <section className="bg-white" aria-labelledby="process-heading">
      <div className="container-wide py-24 md:py-32">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16 md:mb-20">
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">
            Come Lavoriamo
          </span>
          <h2
            id="process-heading"
            className="font-serif font-semibold text-legno-bruciato mb-4 text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Un percorso semplice e trasparente.
          </h2>
          <p className="font-sans text-[16px] text-neutral-500 max-w-md mx-auto">
            Dall'idea al pavimento finito, ogni fase è gestita con la massima attenzione.
          </p>
        </FadeIn>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {STEPS.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.1} direction="up">
                <div className="flex flex-col items-center lg:items-center text-center group">
                  {/* Number circle */}
                  <div className="relative mb-6">
                    <div className="w-[104px] h-[104px] rounded-full border-2 border-neutral-200 group-hover:border-rovere bg-white flex items-center justify-center transition-colors duration-300 shadow-sm group-hover:shadow-md">
                      <span className="font-serif font-semibold text-neutral-300 group-hover:text-rovere transition-colors duration-300"
                        style={{ fontSize: '2rem' }}
                      >
                        {step.number}
                      </span>
                    </div>
                    {/* Dot indicator */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rovere opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  </div>

                  <h3 className="font-serif font-semibold text-legno-bruciato text-[1.2rem] mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] text-neutral-600 leading-relaxed mb-4 max-w-[200px]">
                    {step.description}
                  </p>
                  <span className="inline-flex items-center font-sans text-[12px] font-semibold text-rovere bg-wood-50 px-3 py-1 rounded-full">
                    {step.detail}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
