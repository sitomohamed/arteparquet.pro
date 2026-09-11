import Link from 'next/link'

export function LpFooter() {
  return (
    <footer className="bg-nero-marquina border-t border-white/[0.06] py-6">
      <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="font-sans text-[12px] text-white/30">
          © {new Date().getFullYear()} Arteparquet Di Arabi Mohamed - P.IVA 03326410168
        </p>
        <nav aria-label="Link legali" className="flex items-center gap-4">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] text-white/35 hover:text-white/70 transition-colors underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          <span className="text-white/20" aria-hidden="true"> | </span>
          <Link
            href="/cookie-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] text-white/35 hover:text-white/70 transition-colors underline-offset-2 hover:underline"
          >
            Cookie Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
