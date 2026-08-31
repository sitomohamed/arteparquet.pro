import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { BreadcrumbSchema, ServiceFaqSchema } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Parquet Bergamo e Provincia | Posa, Levigatura, Restauro',
  description:
    'Arteparquet opera a Bergamo e in tutta la provincia: Seriate, Dalmine, Treviglio, Albino, Zanica e altri 15 comuni. Sopralluogo gratuito. Sede in Via Vittorio Alfieri 7.',
  alternates: { canonical: 'https://arteparquet.pro/bergamo-e-provincia' },
}

const FAQ_ITEMS = [
  {
    q: 'In quali comuni della provincia di Bergamo operate?',
    a: 'Oltre a Bergamo città copriamo Seriate, Dalmine, Treviglio, Albino, Zanica, Stezzano, Curno, Azzano San Paolo, Gorle, Scanzorosciate, Lallio, Grassobbio, Orio al Serio, Romano di Lombardia e Clusone. Sopralluogo gratuito in tutta la provincia.',
  },
  {
    q: 'Quanto tempo serve per un sopralluogo in provincia?',
    a: 'Nella prima cintura (Seriate, Stezzano, Zanica, Curno, Lallio) spesso arriviamo in giornata. Nella Bassa (Treviglio, Romano) e in Val Seriana (Albino, Clusone) entro 24-48 ore.',
  },
  {
    q: 'Il preventivo costa di più fuori Bergamo?',
    a: 'No. Sopralluogo e preventivo restano gratuiti in tutta la provincia. Il prezzo del lavoro dipende da metratura, materiale e stato del pavimento, non dal comune.',
  },
]

const COMMUNES = [
  { slug: 'bergamo', name: 'Bergamo', note: 'Sede operativa' },
  { slug: 'seriate', name: 'Seriate', note: '5 km dalla sede' },
  { slug: 'dalmine', name: 'Dalmine', note: 'Bassa Bergamasca' },
  { slug: 'treviglio', name: 'Treviglio', note: 'Secondo comune BG' },
  { slug: 'albino', name: 'Albino', note: 'Val Seriana' },
  { slug: 'zanica', name: 'Zanica', note: 'Prima cintura' },
  { slug: 'stezzano', name: 'Stezzano', note: 'Zona aeroporto' },
  { slug: 'curno', name: 'Curno', note: 'Nord Bergamo' },
  { slug: 'azzano', name: 'Azzano San Paolo', note: 'Villette e condomini' },
  { slug: 'gorle', name: 'Gorle', note: 'Est Bergamo' },
  { slug: 'scanzorosciate', name: 'Scanzorosciate', note: 'Collina e valle' },
  { slug: 'lallio', name: 'Lallio', note: 'Sopralluogo rapido' },
  { slug: 'grassobbio', name: 'Grassobbio', note: 'Nuove costruzioni' },
  { slug: 'orio', name: 'Orio al Serio', note: 'Zona aeroporto' },
  { slug: 'romano', name: 'Romano di Lombardia', note: 'Bassa Bergamasca' },
  { slug: 'clusone', name: 'Clusone', note: 'Alta Val Seriana' },
]

export default function BergamoProvinciaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://arteparquet.pro' },
          { name: 'Bergamo e Provincia', url: 'https://arteparquet.pro/bergamo-e-provincia' },
        ]}
      />
      <ServiceFaqSchema items={FAQ_ITEMS} />

      <section className="bg-nero-marquina text-travertino pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn>
            <p className="text-rovere font-medium mb-4 text-sm uppercase tracking-wider">
              Hub Locale — Bergamo e Provincia
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              Parquet a Bergamo<br />
              <span className="text-rovere">e in tutta la provincia</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mb-8 leading-relaxed">
              Sede in Via Vittorio Alfieri 7, Bergamo. Posa, levigatura senza polvere, restauro e
              riparazione parquet in città, prima cintura, Bassa Bergamasca e Val Seriana.
              Sopralluogo gratuito, preventivo in 24 ore.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 bg-rovere hover:bg-rovere/90 text-white font-semibold px-8 py-4 rounded-xl text-lg"
              >
                <Phone size={20} />
                389 240 7827
              </a>
              <Link
                href="/preventivo"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-rovere hover:text-rovere text-white font-semibold px-8 py-4 rounded-xl text-lg"
              >
                Richiedi preventivo
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-travertino">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4">
              Comuni coperti
            </h2>
            <p className="text-center text-legno-bruciato/70 max-w-2xl mx-auto mb-12">
              Ogni comune ha una pagina dedicata con tempi di intervento, zone servite e FAQ locali.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMMUNES.map((c, i) => (
              <FadeIn key={c.slug} delay={i * 0.02}>
                <Link
                  href={`/zone/parquet-${c.slug}`}
                  className="group block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold group-hover:text-rovere transition-colors">
                        {c.name}
                      </h3>
                      <p className="text-sm text-legno-bruciato/60 mt-1">{c.note}</p>
                    </div>
                    <MapPin size={16} className="text-rovere mt-1 shrink-0" />
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-rovere">
                    Apri pagina <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-center mb-10">Domande locali</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq) => (
              <details key={faq.q} className="group bg-travertino rounded-xl">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold">
                  {faq.q}
                  <span className="text-rovere text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-legno-bruciato/80">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nero-marquina text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Sopralluogo gratuito in provincia
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Mandaci le foto su WhatsApp o richiedi un preventivo. Risposta in orario lavorativo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/393892407827?text=Ciao!%20Sono%20della%20provincia%20di%20Bergamo%20e%20vorrei%20un%20preventivo."
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
            <Link
              href="/preventivo"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white hover:text-nero-marquina font-semibold px-8 py-4 rounded-xl"
            >
              Wizard preventivo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
