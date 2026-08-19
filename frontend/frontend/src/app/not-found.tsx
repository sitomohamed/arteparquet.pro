import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina non trovata | Arteparquet',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <p className="text-sm uppercase tracking-widest text-neutral-400 mb-4 font-sans">
        404
      </p>
      <h1 className="font-serif text-4xl font-bold mb-4 text-legno-bruciato">
        Pagina non trovata
      </h1>
      <p className="text-neutral-500 mb-8 max-w-md font-sans leading-relaxed">
        La pagina che cerchi non esiste o è stata spostata.
        Torna alla home o contattaci direttamente.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-legno-bruciato text-white rounded-lg hover:bg-legno-bruciato/90 transition-colors font-sans font-semibold text-sm"
        >
          Torna alla Home
        </Link>
        <Link
          href="/contatti"
          className="px-6 py-3 border border-legno-bruciato text-legno-bruciato rounded-lg hover:bg-neutral-50 transition-colors font-sans font-semibold text-sm"
        >
          Contattaci
        </Link>
      </div>
    </div>
  )
}
