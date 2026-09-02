import type { Metadata } from 'next'
import { FadeIn } from '@/components/animations/fade-in'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull\'uso dei cookie sul sito Arteparquet.',
  alternates: { canonical: 'https://arteparquet.pro/cookie-policy' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Cookie Policy | Arteparquet',
    description: 'Informativa sull\'uso dei cookie sul sito Arteparquet.',
    url: 'https://arteparquet.pro/cookie-policy',
    locale: 'it_IT',
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-nero-marquina pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <FadeIn direction="up">
            <h1 className="font-serif font-semibold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Cookie Policy
            </h1>
            <p className="font-sans text-white/50 text-[13px] mt-2">Ultimo aggiornamento: Agosto 2026</p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-travertino">
        <div className="container-wide py-16 md:py-24">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-6 font-sans text-[15px] text-neutral-700 leading-relaxed">

              {[
                {
                  title: 'Cosa sono i Cookie',
                  content: 'I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo quando li visiti. Servono a far funzionare il sito correttamente, ricordare le tue preferenze e, con il tuo consenso, raccogliere informazioni statistiche.',
                },
                {
                  title: 'Cookie Tecnici (sempre attivi)',
                  content: 'Questi cookie sono indispensabili per il funzionamento del sito. Non richiedono consenso. Includono: gestione della sessione, preferenze del cookie banner, sicurezza.',
                },
                {
                  title: 'Cookie Analytics (con consenso)',
                  content: 'Utilizziamo Google Analytics per capire come i visitatori usano il sito. Questi cookie sono anonimi e attivati solo con il tuo consenso. Dati conservati per 14 mesi.',
                },
                {
                  title: 'Cookie Marketing (con consenso)',
                  content: 'Usati per mostrare pubblicità pertinente su altri siti (Google Ads, Meta Pixel ID 1083893604335183). Con lo stesso consenso inviamo a Meta anche eventi di conversione dal server (Conversions API). Titolare dei cookie Meta: Meta Platforms Ireland Ltd.',
                },
                {
                  title: 'Come gestire i Cookie',
                  content: 'Puoi modificare le tue preferenze in qualsiasi momento cliccando su "Gestisci preferenze cookie" nel footer, oppure tramite le impostazioni del tuo browser. La revoca del consenso non pregiudica la liceità del trattamento precedente.',
                },
              ].map((section) => (
                <div key={section.title} className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
                  <h2 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-3">{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
