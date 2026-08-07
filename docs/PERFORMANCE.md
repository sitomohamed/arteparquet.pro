# Performance

## Arteparquet Performance Optimization Guide

### Overview

Performance is crucial for user experience and SEO. This guide outlines strategies to achieve excellent Core Web Vitals and fast load times.

---

## Performance Targets

### Core Web Vitals

| Metric | Target | Threshold |
|--------|--------|-----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Good |
| **FID** (First Input Delay) | < 100ms | Good |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Good |
| **INP** (Interaction to Next Paint) | < 200ms | Good |
| **TTFB** (Time to First Byte) | < 600ms | Good |

### Additional Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 95 |
| First Contentful Paint | < 1.5s |
| Speed Index | < 3s |
| Total Blocking Time | < 200ms |
| Page Weight | < 2MB |
| HTTP Requests | < 50 |

---

## Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image';

// Always use next/image
<Image
  src="/portfolio/villa.jpg"
  alt="Villa project"
  width={800}
  height={600}
  
  // Responsive sizing
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  
  // Priority for above-fold images
  priority={isHero}
  
  // Lazy loading (default)
  loading="lazy"
  
  // Blur placeholder
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  
  // Quality (default 75)
  quality={80}
/>
```

### Image Formats

| Format | Use Case | Browser Support |
|--------|----------|-----------------|
| AVIF | Best compression | Modern browsers |
| WebP | Good compression | Wide support |
| JPEG | Fallback | Universal |
| PNG | Transparency | Universal |
| SVG | Icons, logos | Universal |

### Configuration

```typescript
// next.config.ts
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
};
```

### Image Dimensions

Specify dimensions to prevent CLS:

```tsx
// ✅ Good - dimensions specified
<Image src="/photo.jpg" width={800} height={600} alt="" />

// ✅ Good - using fill with container
<div className="relative aspect-video">
  <Image src="/photo.jpg" fill className="object-cover" alt="" />
</div>

// ❌ Bad - no dimensions
<img src="/photo.jpg" alt="" />
```

---

## Font Optimization

### Next.js Font

```typescript
// src/styles/fonts.ts
import { Playfair_Display, Inter } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap', // Prevents FOIT
  preload: true,
  fallback: ['Georgia', 'serif'],
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});
```

### Font Loading Strategy

```tsx
// app/layout.tsx
<html className={`${playfair.variable} ${inter.variable}`}>
```

### Font Subsetting

Google Fonts automatically subsets, but for custom fonts:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-subset.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}
```

---

## Code Splitting

### Dynamic Imports

```tsx
import dynamic from 'next/dynamic';

// Heavy components
const BeforeAfterSlider = dynamic(
  () => import('@/components/media/before-after-slider'),
  { 
    loading: () => <Skeleton className="h-[400px]" />,
    ssr: false // Client-only for heavy interactive components
  }
);

// Below-fold sections
const TestimonialsSection = dynamic(
  () => import('@/components/sections/testimonials-section'),
  { loading: () => <Skeleton className="h-[300px]" /> }
);
```

### Route-Based Splitting

Next.js automatically splits by route. Ensure pages are separate files.

### Component-Level Splitting

```tsx
// Only load when needed
const HeavyChart = dynamic(
  () => import('recharts').then(mod => mod.AreaChart),
  { ssr: false }
);
```

---

## Caching Strategy

### Static Assets

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

### API Responses

```typescript
// API route caching
export async function GET() {
  const data = await fetchData();
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

### Static Generation

```typescript
// Generate at build time
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Revalidate periodically
export const revalidate = 3600; // 1 hour
```

---

## Bundle Analysis

### Analyze Bundle

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

### Optimize Imports

```typescript
// ❌ Bad - imports entire library
import { motion } from 'framer-motion';

// ✅ Good - tree-shakeable import
import { motion } from 'framer-motion';
// Framer Motion is already tree-shakeable

// ❌ Bad - imports all icons
import * as Icons from 'lucide-react';

// ✅ Good - import only what you need
import { ArrowRight, Phone, Mail } from 'lucide-react';
```

---

## Rendering Strategies

### Server Components (Default)

```tsx
// Server Component - no 'use client'
async function PortfolioPage() {
  const projects = await fetchProjects(); // Server-side fetch
  return <ProjectGrid projects={projects} />;
}
```

### Client Components

```tsx
'use client';

// Only for interactivity
function ContactForm() {
  const [step, setStep] = useState(1);
  // ...
}
```

### Streaming

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <HeroSection /> {/* Immediate */}
      
      <Suspense fallback={<Skeleton />}>
        <PortfolioSection /> {/* Streamed */}
      </Suspense>
      
      <Suspense fallback={<Skeleton />}>
        <TestimonialsSection /> {/* Streamed */}
      </Suspense>
    </>
  );
}
```

---

## JavaScript Optimization

### Defer Non-Critical Scripts

```tsx
// Analytics - defer loading
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXX"
  strategy="afterInteractive"
/>

// Third-party widgets - load when idle
<Script
  src="https://widget.example.com/script.js"
  strategy="lazyOnload"
/>
```

### Minimize Main Thread Work

```typescript
// Heavy computation in Web Worker
const worker = new Worker('/workers/heavy-computation.js');
worker.postMessage(data);
worker.onmessage = (e) => setResult(e.data);
```

---

## CSS Optimization

### Critical CSS

Next.js handles this automatically with CSS-in-JS and Tailwind.

### Minimize CSS

```javascript
// tailwind.config.ts
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  // Purges unused CSS automatically
};
```

### Avoid Layout Thrashing

```tsx
// ❌ Bad - causes layout recalculation
const height = element.offsetHeight;
element.style.height = height + 10 + 'px';
const newHeight = element.offsetHeight;

// ✅ Good - batch reads and writes
const height = element.offsetHeight;
requestAnimationFrame(() => {
  element.style.height = height + 10 + 'px';
});
```

---

## Network Optimization

### Preconnect to Origins

```tsx
// app/layout.tsx
<head>
  <link rel="preconnect" href="https://api.arteparquet.pro" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://www.google-analytics.com" />
</head>
```

### Prefetch Links

```tsx
import Link from 'next/link';

// Automatically prefetches on hover
<Link href="/servizi" prefetch={true}>
  Servizi
</Link>
```

### Compression

```typescript
// next.config.ts
module.exports = {
  compress: true, // Gzip compression
};

// Vercel handles Brotli automatically
```

---

## Monitoring

### Real User Monitoring (RUM)

```typescript
// Report Web Vitals
export function reportWebVitals(metric) {
  // Send to analytics
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.value),
    non_interaction: true,
  });
}
```

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://arteparquet.pro
      https://arteparquet.pro/servizi
    uploadArtifacts: true
    temporaryPublicStorage: true
```

---

## Performance Checklist

### Pre-Launch

- [ ] All images optimized (WebP/AVIF)
- [ ] Images have dimensions specified
- [ ] Fonts use font-display: swap
- [ ] Above-fold content prioritized
- [ ] Heavy components lazy loaded
- [ ] Bundle analyzed and optimized
- [ ] Compression enabled
- [ ] Caching headers set
- [ ] No render-blocking resources
- [ ] Core Web Vitals passing

### Ongoing

- [ ] Weekly Lighthouse audits
- [ ] Monitor RUM data
- [ ] Review bundle size on PRs
- [ ] Check image optimization
- [ ] Verify caching working
