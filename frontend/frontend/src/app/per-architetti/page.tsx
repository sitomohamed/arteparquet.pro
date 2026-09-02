import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, Ruler, Users, Award, Clock, ShieldCheck } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Per Architetti & Studio Design',
  description:
    'Servizi dedicati per architetti e interior designer: campionari personalizzati, consulenza tecnica, garanzie estese. Partner di fiducia per progetti di fascia alta.',
  alternates: { canonical: 'https://arteparquet.pro/per-architetti' },
  openGraph: {
    title: 'Per Architetti & Studio Design | Arteparquet',
    description: 'Partner tecnico per progetti di fascia alta. Campionari personalizzati e consulenza dedicata.',
    url: 'https://arteparquet.pro/per-architetti',
    locale: 'it_IT',
    type: 'website',
  },
}

const BENEFITS = [
  {
    icon: FileText,
    title: 'Campionari Personalizzati',
    description:
      'Invio gratuito di campioni fisici di essenze, finiture e formati per la presentazione ai clienti. Materiale marketing co-branded disponibile.',
  },
  {
    icon: Ruler,
    title: 'Consulenza Tecnica Dedicata',
    description:
      'Supporto diretto con Mohamed Arabi per valutazioni strutturali, compatibilità con riscaldamento a pavimento e soluzioni su misura per ogni progetto.',
  },
  {
    icon: Users,
    title: 'Coordinamento Cantiere',
    description:
      'Pianificazione flessibile e coordinamento con altre maestranze. Rispettiamo le tempistiche del progetto e comunichiamo costantemente.',
  },
  {
    icon: Award,
    title: 'Garanzia Estesa Pro',
    description:
      'Garanzia scritta fino a 10 anni su posa e restauro. Documentazione fotografica completa del cantiere per il portfolio dello studio.',
  },
  {
    icon: Clock,
    title: 'Preventivi Prioritari',
    description:
      'Risposta entro 24 ore con preventivi dettagliati, computo metrico e tempi di esecuzione certi. Acconto ridotto per studi partner.',
  },
  {
    icon: ShieldCheck,
    title: 'Certificato di Autenticità',
    description:
      'Ogni pavimento è accompagnato dal "Passaporto del Parquet": certificato cartaceo con essenza, provenienza legno, data posa e garanzia.',
  },
]

const PROJECTS = [
  {
    studio: 'Studio Architettura Bergamo',
    project: 'Villa privata — Rovere spina ungherese',
    location: 'Città Alta, Bergamo',
    image: '/portfolio/google-spina-pesce-lucida-01.jpg',
  },
  {
    studio: 'Design d\'Interni Milano',
    project: 'Loft industriale — Wengè e acciaio',
    location: 'Porta Romana, Milano',
    image: '/portfolio/google-parquet-bordo-intarsio-01.jpg',
  },
  {
    studio: 'Architetto Indipendente',
    project: 'Restauro storico — Parquet originale 1920',
    location: 'Centro storico, Brescia',
    image: '/portfolio/google-levigatura-mosaico-01.jpg',
  },
]

export default function ArchitectsPage() {
  return (
    <>
      <section className="bg-nero-marquina pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rovere/10 border border-rovere/30 rounded-lg backdrop-blur-sm mb-5">
              <span className="font-serif text-[11px] font-medium text-rovere tracking-wide">
                Partner Tecnico per Professionisti
              </span>
            </div>
            <h1
              className="font-serif font-semibold text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              Per Architetti &<br />
              Studio Design
            </h1>
            <p
              className="font-sans text-white/75 max-w-2xl leading-relaxed mb-8"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Collaboriamo con studi di architettura e interior design per realizzare progetti di 
              parquet di fascia alta. Dalla consulenza tecnica alla posa certificata, siamo il 
              partner affidabile per i tuoi clienti più esigenti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-rovere text-white font-sans text-[15px] font-semibold hover:bg-wood-500 hover:shadow-[0_12px_32px_rgba(200,155,123,0.35)] active:scale-[0.97] transition-all duration-300"
              >
                Richiedi Campionario
                <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+393892407827"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-[1.5px] border-white/30 text-white font-sans text-[15px] font-medium hover:border-white/60 hover:bg-white/10 active:scale-[0.97] transition-all duration-300"
              >
                Chiamata Diretta — Mohamed
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-travertino py-20 md:py-28">
        <div className="container-wide">
          <FadeIn direction="up" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-legno-bruciato mb-4">
              Servizi Dedicati per Professionisti
            </h2>
            <p className="font-sans text-neutral-600 max-w-2xl mx-auto">
              Tutto ciò che serve per integrare il parquet nei tuoi progetti con la massima professionalità
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BENEFITS.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={i * 0.1} direction="up">
                <div className="group bg-white rounded-2xl p-8 border border-neutral-100 hover:border-wood-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-400 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wood-50 flex items-center justify-center mb-5 group-hover:bg-wood-100 transition-colors">
                    <benefit.icon size={22} className="text-rovere" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-legno-bruciato mb-3">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 border-t border-neutral-100">
        <div className="container-wide">
          <FadeIn direction="up" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-legno-bruciato mb-4">
              Progetti in Collaborazione
            </h2>
            <p className="font-sans text-neutral-600 max-w-2xl mx-auto">
              Case study selezionati realizzati insieme a studi di architettura e design
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <FadeIn key={project.project} delay={i * 0.15} direction="up">
                <article className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 hover:border-wood-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)] transition-all duration-400">
                  <div className="relative overflow-hidden aspect-[4/3] bg-wood-50">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-rovere mb-2">
                      {project.studio}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-legno-bruciato mb-2">
                      {project.project}
                    </h3>
                    <p className="font-sans text-[13px] text-neutral-500">
                      {project.location}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6} className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-rovere hover:text-wood-600 transition-colors group"
            >
              Vedi Portfolio Completo
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-nero-marquina py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn direction="up">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-6">
                Diventa Partner Arteparquet
              </h2>
              <p className="font-sans text-white/75 text-lg leading-relaxed mb-8">
                Collaboriamo con oltre 40 studi di architettura in Lombardia. Unisciti al network 
                di professionisti che scelgono Arteparquet per i loro progetti di fascia alta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-rovere text-white font-sans text-[15px] font-semibold hover:bg-wood-500 hover:shadow-[0_12px_32px_rgba(200,155,123,0.35)] active:scale-[0.97] transition-all duration-300"
                >
                  Richiedi Informazioni Partner
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="mailto:info@arteparquet.pro"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-[1.5px] border-white/30 text-white font-sans text-[15px] font-medium hover:border-white/60 hover:bg-white/10 active:scale-[0.97] transition-all duration-300"
                >
                  Email: info@arteparquet.pro
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
