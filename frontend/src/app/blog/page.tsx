import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Blog | Guide e Consigli sul Parquet',
  description:
    'Articoli, guide e consigli di esperti sul parquet, il restauro, la scelta dei materiali e la cura del pavimento in legno.',
}

const ARTICLES = [
  {
    slug: 'come-scegliere-parquet',
    title: 'Come Scegliere il Parquet Perfetto per la Tua Casa',
    excerpt: 'Massello, prefinito o multistrato? Rovere, noce o frassino? Una guida completa per orientarsi nel mondo del parquet e scegliere con consapevolezza.',
    category: 'Guida',
    readTime: '8 min',
    date: 'Luglio 2026',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80',
  },
  {
    slug: 'restauro-parquet-quando-conviene',
    title: 'Restaurare o Sostituire il Parquet? La Guida Definitiva',
    excerpt: 'Il tuo parquet è rovinato? Non sempre la soluzione migliore è sostituirlo. Scopri quando conviene il restauro e quando è meglio ripartire da zero.',
    category: 'Restauro',
    readTime: '6 min',
    date: 'Giugno 2026',
    image: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=600&q=80',
  },
  {
    slug: 'spc-vs-parquet',
    title: 'SPC vs Parquet Tradizionale: Quale Scegliere?',
    excerpt: 'SPC, PVC e laminato stanno conquistando sempre più spazio nelle case italiane. Ma vale davvero la pena sceglierli rispetto al parquet? Confronto onesto.',
    category: 'Confronto',
    readTime: '5 min',
    date: 'Maggio 2026',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
  },
]

export default function BlogPage() {
  return (
    <>
      <section className="bg-nero-marquina pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-wide">
          <FadeIn direction="up">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rovere mb-4">Blog</span>
            <h1
              className="font-serif font-semibold text-white mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              Guide & Consigli.
            </h1>
            <p className="font-sans text-white/65 max-w-lg leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              Conoscenza gratuita da 30 anni di esperienza nel parquet.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-travertino">
        <div className="container-wide py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ARTICLES.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.1} direction="up">
                <article className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-wood-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${article.image})` }}
                      role="img"
                      aria-label={article.title}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-rovere bg-wood-50 px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="font-sans text-[11px] text-neutral-400">{article.readTime} di lettura</span>
                    </div>
                    <h2 className="font-serif font-semibold text-legno-bruciato text-[1.1rem] leading-snug mb-3 flex-1">
                      {article.title}
                    </h2>
                    <p className="font-sans text-[13px] text-neutral-500 leading-relaxed mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-sans text-[12px] text-neutral-400">{article.date}</span>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-rovere hover:text-wood-600 transition-colors group/link"
                      >
                        Leggi <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
