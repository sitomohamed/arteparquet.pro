import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { CtaSection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: {
    absolute: 'Blog Parquet | Guide e Consigli di Mohamed Arabi | Arteparquet',
  },
  description:
    'Guide complete sul parquet firmate da Mohamed Arabi: come sceglierlo, levigarlo, restaurarlo. 30 anni di esperienza nella posa parquet in Lombardia. Aggiornato 2026.',
  keywords: ['guida parquet', 'consigli parquet', 'blog parquet', 'come scegliere parquet', 'levigatura parquet guida'],
  alternates: { canonical: 'https://arteparquet.pro/blog' },
  openGraph: {
    title: 'Blog Parquet | Guide e Consigli di Mohamed Arabi | Arteparquet',
    description: 'Guide complete sul parquet firmate da Mohamed Arabi: come sceglierlo, levigarlo, restaurarlo. 30 anni di esperienza nella posa parquet in Lombardia.',
    url: 'https://arteparquet.pro/blog',
    locale: 'it_IT',
    type: 'website',
  },
}

const ARTICLES = [
  {
    slug: 'come-scegliere-parquet',
    title: 'Come Scegliere il Parquet Perfetto per la Tua Casa',
    excerpt: 'Massello, prefinito o SPC? Rovere, noce o frassino? Una guida completa per orientarsi nel mondo del parquet e scegliere con consapevolezza.',
    category: 'Guida',
    readTime: '8 min',
    date: 'Luglio 2026',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80',
    featured: true,
  },
  {
    slug: 'restauro-parquet-quando-conviene',
    title: 'Restaurare o Sostituire il Parquet? La Guida Definitiva',
    excerpt: 'Il tuo parquet è rovinato? Non sempre la soluzione migliore è sostituirlo. Scopri quando conviene il restauro e quando è meglio ripartire da zero.',
    category: 'Restauro',
    readTime: '6 min',
    date: 'Giugno 2026',
    image: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=600&q=80',
    featured: false,
  },
  {
    slug: 'spc-vs-parquet',
    title: 'SPC vs Parquet Tradizionale: Confronto Onesto 2026',
    excerpt: 'SPC, PVC e laminato stanno conquistando sempre più spazio. Ma vale davvero la pena rispetto al parquet in legno? Confronto completo e senza filtri.',
    category: 'Confronto',
    readTime: '5 min',
    date: 'Maggio 2026',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
    featured: false,
  },
  {
    slug: 'posa-parquet-spina-di-pesce',
    title: 'Parquet a Spina di Pesce: Guida Completa alla Posa',
    excerpt: 'Il pattern più elegante del momento. Cos\'è la spina di pesce, come si differenzia dal chevron, e perché sta conquistando gli interni italiani di design.',
    category: 'Posa',
    readTime: '7 min',
    date: 'Aprile 2026',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80',
    featured: false,
  },
  {
    slug: 'levigatura-parquet-guida',
    title: 'Levigatura Parquet: La Guida Completa per Rinnovarlo',
    excerpt: 'Come funziona la levigatura del parquet, quando farla, quale finitura scegliere tra olio e vernice. Tutto quello che devi sapere prima di chiamare un esperto.',
    category: 'Restauro',
    readTime: '6 min',
    date: 'Marzo 2026',
    image: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=600&q=80',
    featured: false,
  },
  {
    slug: 'parquet-massello-guida',
    title: 'Parquet Massello: Tutto Quello che Devi Sapere',
    excerpt: 'Il pavimento in legno più pregiato e duraturo. Caratteristiche, essenze, manutenzione e posa spiegati da chi ne posa da 30 anni.',
    category: 'Materiali',
    readTime: '7 min',
    date: 'Febbraio 2026',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80',
    featured: false,
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
                <article className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-wood-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)] transition-all duration-400 hover:-translate-y-1.5 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video bg-wood-50">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${article.image})` }}
                      role="img"
                      aria-label={article.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-sans text-[10.5px] font-semibold uppercase tracking-wider text-rovere bg-wood-50 ring-1 ring-wood-100 px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="font-sans text-[11px] text-neutral-400">{article.readTime} di lettura</span>
                    </div>
                    <h2 className="font-serif font-semibold text-legno-bruciato text-[1.1rem] leading-snug mb-3 flex-1">
                      {article.title}
                    </h2>
                    <p className="font-sans text-[13px] text-neutral-500 leading-[1.7] mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-50">
                      <span className="font-sans text-[11.5px] text-neutral-400">{article.date}</span>
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
