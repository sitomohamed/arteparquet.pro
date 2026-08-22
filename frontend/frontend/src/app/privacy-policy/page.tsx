import type { Metadata } from 'next'
import { FadeIn } from '@/components/animations/fade-in'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sulla privacy e il trattamento dei dati personali di Arteparquet.',
  alternates: { canonical: 'https://arteparquet.pro/privacy-policy' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Privacy Policy | Arteparquet',
    description: 'Informativa sulla privacy e il trattamento dei dati personali di Arteparquet.',
    url: 'https://arteparquet.pro/privacy-policy',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-nero-marquina pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <FadeIn direction="up">
            <h1 className="font-serif font-semibold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Privacy Policy
            </h1>
            <p className="font-sans text-white/50 text-[13px] mt-2">Ultimo aggiornamento: Agosto 2026</p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-travertino">
        <div className="container-wide py-16 md:py-24">
          <FadeIn direction="up">
            <div className="max-w-3xl prose prose-neutral">
              <div className="space-y-8 font-sans text-[15px] text-neutral-700 leading-relaxed">

                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
                  <h2 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-3">1. Titolare del Trattamento</h2>
                  <p>
                    <strong>Arteparquet di Arabi Mohamed</strong><br />
                    Partita IVA: 03326410168<br />
                    Sede: Bergamo, Italia<br />
                    Email: <a href="mailto:info@arteparquet.pro" className="text-rovere hover:text-wood-600">info@arteparquet.pro</a><br />
                    Telefono: <a href="tel:+393892407827" className="text-rovere hover:text-wood-600">+39 389 240 7827</a>
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
                  <h2 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-3">2. Dati Raccolti</h2>
                  <p>Raccogliamo i seguenti dati personali:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-3">
                    <li>Dati anagrafici: nome, cognome</li>
                    <li>Dati di contatto: email, numero di telefono</li>
                    <li>Dati relativi al progetto: città, superficie, tipo di intervento</li>
                    <li>Dati tecnici: indirizzo IP, browser, pagine visitate (con consenso)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
                  <h2 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-3">3. Finalità del Trattamento</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Gestione delle richieste di preventivo e consulenza</li>
                    <li>Comunicazioni relative al tuo progetto</li>
                    <li>Miglioramento del sito web (con consenso)</li>
                    <li>Adempimenti di legge e fiscali</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
                  <h2 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-3">4. Base Giuridica</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Consenso esplicito (Art. 6(1)(a) GDPR)</li>
                    <li>Esecuzione di un contratto (Art. 6(1)(b) GDPR)</li>
                    <li>Interesse legittimo (Art. 6(1)(f) GDPR)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
                  <h2 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-3">5. Conservazione dei Dati</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Richieste di preventivo: 24 mesi</li>
                    <li>Dati clienti (contratti): 10 anni (obbligo fiscale)</li>
                    <li>Dati analytics: 14 mesi</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
                  <h2 className="font-serif font-semibold text-legno-bruciato text-[1.25rem] mb-3">6. I Tuoi Diritti (GDPR)</h2>
                  <p>Hai il diritto di:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-3">
                    <li>Accedere ai tuoi dati personali</li>
                    <li>Rettificare dati inesatti</li>
                    <li>Richiedere la cancellazione ("diritto all'oblio")</li>
                    <li>Opporsi al trattamento</li>
                    <li>Richiedere la portabilità dei dati</li>
                    <li>Presentare reclamo al Garante Privacy (<a href="https://www.garanteprivacy.it" className="text-rovere" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>)</li>
                  </ul>
                  <p className="mt-3">Per esercitare i tuoi diritti, scrivi a: <a href="mailto:info@arteparquet.pro" className="text-rovere">info@arteparquet.pro</a></p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
