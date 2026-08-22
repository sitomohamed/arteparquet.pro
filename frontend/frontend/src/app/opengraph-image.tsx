import { ImageResponse } from 'next/og'

export const alt = 'Arteparquet — Maestri del Parquet dal 1996'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F9F8F6',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid #8B6914',
            opacity: 0.3,
          }}
        />

        {/* Logo / brand */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: '#2C1810',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Arteparquet
        </div>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 2,
            background: '#8B6914',
            marginBottom: 24,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            color: '#5C3D2E',
            fontWeight: 400,
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}
        >
          Posa · Restauro · Levigatura Parquet
        </div>

        {/* Sub-tagline */}
        <div
          style={{
            fontSize: 22,
            color: '#8B6914',
            marginTop: 16,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Bergamo e Lombardia · Dal 1996
        </div>
      </div>
    ),
    { ...size }
  )
}
