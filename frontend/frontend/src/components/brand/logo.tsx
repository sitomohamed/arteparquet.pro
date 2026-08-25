import { cn } from '@/lib/utils'

/** Brand mark — same square used as the favicon. */
export function LogoMark({
  size = 40,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    // Favicon asset from app/icon.png, served at /icon.png
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon.png"
      alt=""
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-hidden="true"
    />
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
