# Frontend Architecture

## Arteparquet Frontend Technical Specification

### Overview

The Arteparquet frontend is built with Next.js 15 using the App Router, TypeScript, and Tailwind CSS. The architecture prioritizes performance, SEO, and maintainability.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework with SSR/SSG |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| shadcn/ui | Latest | Component library |
| Framer Motion | 11.x | Animations |
| Lucide React | Latest | Icons |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Schema validation |
| Zustand | 5.x | State management |
| TanStack Query | 5.x | Server state management |
| Recharts | 2.x | Charts (admin) |
| TanStack Table | 8.x | Tables (admin) |

---

## Project Structure

```
frontend/
├── public/
│   ├── images/
│   │   ├── portfolio/
│   │   ├── services/
│   │   ├── team/
│   │   └── brand/
│   ├── videos/
│   ├── fonts/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Marketing pages group
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── servizi/
│   │   │   │   ├── page.tsx          # Services overview
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Service detail
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx          # Portfolio grid
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Project detail
│   │   │   ├── chi-siamo/
│   │   │   │   └── page.tsx          # About page
│   │   │   ├── contatti/
│   │   │   │   └── page.tsx          # Contact page
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx          # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Blog post
│   │   │   ├── faq/
│   │   │   │   └── page.tsx          # FAQ page
│   │   │   └── layout.tsx            # Marketing layout
│   │   │
│   │   ├── (legal)/                  # Legal pages group
│   │   │   ├── privacy-policy/
│   │   │   │   └── page.tsx
│   │   │   ├── cookie-policy/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── admin/                    # Admin dashboard
│   │   │   ├── page.tsx              # Dashboard
│   │   │   ├── leads/
│   │   │   ├── portfolio/
│   │   │   ├── blog/
│   │   │   ├── settings/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                      # API routes (if needed)
│   │   │   └── revalidate/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   ├── not-found.tsx             # 404 page
│   │   ├── error.tsx                 # Error boundary
│   │   ├── loading.tsx               # Loading state
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # Base UI components
│   │   ├── layout/                   # Layout components
│   │   ├── cards/                    # Card components
│   │   ├── forms/                    # Form components
│   │   ├── sections/                 # Page sections
│   │   ├── media/                    # Media components
│   │   └── animations/               # Animation wrappers
│   │
│   ├── lib/                          # Utilities and helpers
│   │   ├── utils.ts                  # General utilities
│   │   ├── api.ts                    # API client
│   │   ├── constants.ts              # Constants
│   │   └── validations.ts            # Zod schemas
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-scroll.ts
│   │   ├── use-media-query.ts
│   │   ├── use-intersection.ts
│   │   └── use-form-persistence.ts
│   │
│   ├── stores/                       # Zustand stores
│   │   ├── ui-store.ts
│   │   └── form-store.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── index.ts
│   │   ├── api.ts
│   │   └── components.ts
│   │
│   └── styles/                       # Additional styles
│       └── fonts.ts
│
├── .env.local                        # Local environment
├── .env.example                      # Environment template
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json
└── Dockerfile
```

---

## Configuration Files

### next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.arteparquet.pro',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
  
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        travertino: '#F9F8F6',
        'legno-bruciato': '#1A1A1A',
        rovere: '#C89B7B',
        'nero-marquina': '#0A0A0A',
        wood: {
          100: '#F5EDE6',
          200: '#E8D5C4',
          300: '#D4B896',
          400: '#C89B7B',
          500: '#B8845F',
          600: '#9A6B47',
          700: '#7A5236',
          800: '#5C3D28',
          900: '#3D281A',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

export default config
```

---

## Data Fetching

### API Client

```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}
```

### Server Components

```typescript
// Fetch data in Server Components
async function PortfolioPage() {
  const projects = await fetchAPI<Project[]>('/projects')
  
  return <PortfolioGrid projects={projects} />
}
```

### Client Components with TanStack Query

```typescript
// For client-side data fetching
'use client'

import { useQuery } from '@tanstack/react-query'

function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchAPI<Project[]>('/projects'),
  })
}
```

---

## State Management

### Zustand Store Example

```typescript
// src/stores/ui-store.ts
import { create } from 'zustand'

interface UIState {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  formStep: number
  setFormStep: (step: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  formStep: 1,
  setFormStep: (step) => set({ formStep: step }),
}))
```

---

## SEO Implementation

### Metadata API

```typescript
// src/app/(marketing)/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arteparquet | L\'Arte del Legno',
  description: 'Maestri posatori dal 2004. Posa, restauro e parquet premium in tutta Italia. Ex team Teatro alla Scala di Milano.',
  keywords: ['parquet', 'posa parquet', 'restauro parquet', 'Milano', 'Italia'],
  openGraph: {
    title: 'Arteparquet | L\'Arte del Legno',
    description: 'Maestri posatori dal 2004...',
    url: 'https://arteparquet.pro',
    siteName: 'Arteparquet',
    images: [
      {
        url: 'https://arteparquet.pro/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arteparquet | L\'Arte del Legno',
    description: 'Maestri posatori dal 2004...',
    images: ['https://arteparquet.pro/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://arteparquet.pro',
  },
}
```

### JSON-LD Schema

```typescript
// src/components/seo/json-ld.tsx
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Arteparquet',
    description: 'Specialisti in parquet, SPC, PVC e laminati',
    url: 'https://arteparquet.pro',
    telephone: '+393892407827',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bergamo',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '45.6983',
      longitude: '9.6773',
    },
    areaServed: 'IT',
    priceRange: '€€€',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## Performance Optimizations

### Image Optimization

```typescript
import Image from 'next/image'

// Always use next/image for optimization
<Image
  src="/images/portfolio/project-1.jpg"
  alt="Villa sul Lago di Como"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority={false} // true for above-fold images
/>
```

### Code Splitting

```typescript
import dynamic from 'next/dynamic'

// Dynamic import for heavy components
const BeforeAfterSlider = dynamic(
  () => import('@/components/media/before-after-slider'),
  { 
    loading: () => <Skeleton className="h-[400px]" />,
    ssr: false 
  }
)
```

### Font Optimization

```typescript
// src/styles/fonts.ts
import { Playfair_Display, Inter } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
```

---

## Environment Variables

```env
# .env.local

# API
NEXT_PUBLIC_API_URL=https://api.arteparquet.pro
NEXT_PUBLIC_SITE_URL=https://arteparquet.pro

# Contact
NEXT_PUBLIC_PHONE=+393892407827
NEXT_PUBLIC_WHATSAPP=393892407827
NEXT_PUBLIC_EMAIL=info@arteparquet.pro

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Revalidation
REVALIDATION_SECRET=your-secret-token
```

---

## Build & Deploy

### Docker

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```
