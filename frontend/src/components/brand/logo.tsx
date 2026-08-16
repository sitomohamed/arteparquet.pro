import { cn } from '@/lib/utils'

/** Geometric “A” in the oak circle — thick crossbar so it never reads as a triangle. */
export function LogoMark({
  size = 40,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" fill="#C89B7B" />
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M20 9 30.6 31.2h-4.5l-2.15-5.1H15.05l-2.15 5.1H8.4L20 9Zm0 6.2-2.2 5.15h4.4L20 15.2Z"
      />
    </svg>
  )
}

type LogoVariant = 'onLight' | 'onDark'

export function Logo({
  variant = 'onLight',
  size = 40,
  showWordmark = true,
  showTagline = false,
  className,
  wordmarkClassName,
}: {
  variant?: LogoVariant
  size?: number
  showWordmark?: boolean
  showTagline?: boolean
  className?: string
  wordmarkClassName?: string
}) {
  const nameColor = variant === 'onDark' ? 'text-white' : 'text-legno-bruciato'
  const taglineColor = variant === 'onDark' ? 'text-white/50' : 'text-neutral-500'

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className={cn('flex flex-col min-w-0', wordmarkClassName)}>
          <span className={cn('font-serif font-semibold leading-tight tracking-tight transition-colors duration-300', nameColor)}
            style={{ fontSize: size >= 40 ? 20 : 17 }}
          >
            Arteparquet
            <span className="text-rovere font-sans font-semibold tracking-wide" style={{ fontSize: '0.62em' }}>
              .pro
            </span>
          </span>
          {showTagline && (
            <span className={cn('font-sans tracking-wide leading-tight', taglineColor)}
              style={{ fontSize: 11 }}
            >
              Maestri del Parquet dal 1996
            </span>
          )}
        </span>
      )}
    </span>
  )
}
