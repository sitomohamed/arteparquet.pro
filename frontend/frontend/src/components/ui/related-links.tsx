import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'

interface RelatedLink {
  title: string
  href: string
  description: string
}

interface RelatedLinksProps {
  title?: string
  links: RelatedLink[]
  columns?: 2 | 3 | 4
}

export function RelatedLinks({ title = 'Pagine Correlate', links, columns = 3 }: RelatedLinksProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="bg-white py-12 md:py-16 border-t border-neutral-100">
      <div className="container-wide">
        <FadeIn>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-legno-bruciato">
            {title}
          </h2>
        </FadeIn>

        <div className={`grid ${gridCols[columns]} gap-5`}>
          {links.map((link, i) => (
            <FadeIn key={link.href} delay={i * 0.05} direction="up">
              <Link
                href={link.href}
                className="group block bg-travertino rounded-2xl border border-neutral-100 hover:border-rovere hover:shadow-lg transition-all duration-300 p-6 h-full"
              >
                <h3 className="font-serif text-xl font-semibold text-legno-bruciato mb-2 group-hover:text-rovere transition-colors">
                  {link.title}
                </h3>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-4">
                  {link.description}
                </p>
                <div className="flex items-center gap-2 text-rovere font-semibold text-sm">
                  Scopri di più
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
