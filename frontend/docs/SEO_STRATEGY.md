# SEO Strategy

## Arteparquet Search Engine Optimization Plan

### Overview

This document outlines a comprehensive SEO strategy to establish Arteparquet as the #1 parquet website in Italy, dominating organic search results for key flooring-related queries.

---

## SEO Goals

| Goal | Target | Timeline |
|------|--------|----------|
| Organic traffic | 10,000 monthly visits | 12 months |
| Keyword rankings (top 3) | 20+ primary keywords | 6 months |
| Domain authority | 30+ | 12 months |
| Quote requests from organic | 50+ monthly | 6 months |

---

## Keyword Strategy

### Primary Keywords (High Volume, High Intent)

| Keyword | Monthly Volume | Difficulty | Intent |
|---------|----------------|------------|--------|
| posa parquet | 2,400 | Medium | Commercial |
| restauro parquet | 1,600 | Medium | Commercial |
| levigatura parquet | 1,300 | Medium | Commercial |
| parquet massello | 1,800 | Medium | Commercial |
| parquet prefinito | 1,500 | Medium | Commercial |
| parquet prezzo | 2,200 | High | Commercial |
| posatore parquet | 880 | Low | Commercial |

### Local Keywords (Geo-Targeted)

| Keyword | Target Location |
|---------|-----------------|
| posa parquet Milano | Lombardia |
| parquet Bergamo | Local |
| restauro parquet Roma | Expansion |
| posatore parquet Torino | Nord Italia |
| parquet Firenze | Centro Italia |

### Long-Tail Keywords (High Conversion)

| Keyword | Intent |
|---------|--------|
| quanto costa posare il parquet | Pricing research |
| differenza parquet massello e prefinito | Education |
| come restaurare parquet antico | DIY/Service |
| parquet per bagno e cucina | Specific need |
| parquet villa di lusso | Luxury segment |
| parquet hotel ristorante | Commercial |
| posa parquet a spina di pesce | Pattern specific |

---

## On-Page SEO

### Title Tag Formula

```
[Primary Keyword] | [Secondary Info] | Arteparquet

Examples:
- Posa Parquet Professionale | Maestri Posatori dal 2004 | Arteparquet
- Restauro Parquet | Levigatura e Riparazione | Arteparquet
- Parquet Massello in Rovere | Qualità Premium | Arteparquet
```

### Meta Description Formula

```
[Hook] + [Value Proposition] + [Credential] + [CTA]

Example:
"Posa parquet professionale in tutta Italia. Ex team Teatro alla Scala di Milano. 
20+ anni di esperienza, preventivo gratuito. Richiedi una consulenza."
```

### URL Structure

```
arteparquet.pro/                           # Homepage
arteparquet.pro/servizi/                   # Services index
arteparquet.pro/servizi/posa-parquet/      # Service page
arteparquet.pro/portfolio/                 # Portfolio index
arteparquet.pro/portfolio/villa-como/      # Project page
arteparquet.pro/blog/                      # Blog index
arteparquet.pro/blog/scegliere-parquet/    # Blog post
arteparquet.pro/chi-siamo/                 # About
arteparquet.pro/contatti/                  # Contact
```

### Heading Structure (H1-H6)

```html
<!-- Homepage -->
<h1>Arteparquet – L'Arte del Legno</h1>
  <h2>I Nostri Servizi</h2>
    <h3>Posa Parquet</h3>
    <h3>Restauro</h3>
  <h2>Portfolio</h2>
  <h2>Perché Sceglierci</h2>
  <h2>Richiedi Preventivo</h2>

<!-- Service Page -->
<h1>Posa Parquet Professionale</h1>
  <h2>Come Lavoriamo</h2>
  <h2>Tipi di Parquet</h2>
    <h3>Parquet Massello</h3>
    <h3>Parquet Prefinito</h3>
  <h2>Galleria Lavori</h2>
  <h2>Richiedi Preventivo</h2>
```

---

## Technical SEO

### Core Web Vitals Targets

| Metric | Target | Tool |
|--------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed |
| FID (First Input Delay) | < 100ms | PageSpeed |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed |
| TTFB (Time to First Byte) | < 600ms | WebPageTest |

### Technical Requirements

```typescript
// next.config.ts
const nextConfig = {
  // Enable static generation where possible
  output: 'standalone',
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  
  // Compression
  compress: true,
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
```

### Sitemap Configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://arteparquet.pro/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://arteparquet.pro/servizi/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Auto-generated for all pages -->
</urlset>
```

### Robots.txt

```txt
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/

Sitemap: https://arteparquet.pro/sitemap.xml
```

---

## Schema Markup (JSON-LD)

### LocalBusiness Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Arteparquet",
  "description": "Specialisti in parquet, SPC, PVC e laminati. Posa, restauro e manutenzione in tutta Italia.",
  "url": "https://arteparquet.pro",
  "telephone": "+393892407827",
  "email": "info@arteparquet.pro",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bergamo",
    "addressRegion": "Lombardia",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.6983",
    "longitude": "9.6773"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Italy"
  },
  "priceRange": "€€€",
  "openingHours": "Mo-Fr 08:00-18:00",
  "foundingDate": "2004",
  "founder": {
    "@type": "Person",
    "name": "Arabi Mohamed"
  },
  "sameAs": [
    "https://instagram.com/arteparquet",
    "https://facebook.com/arteparquet"
  ]
}
```

### Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Posa Parquet",
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "name": "Arteparquet"
  },
  "areaServed": "Italy",
  "description": "Installazione professionale di parquet massello e prefinito"
}
```

### FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto costa posare il parquet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il costo della posa parquet varia da €40 a €150 al mq..."
      }
    }
  ]
}
```

---

## Content Strategy for SEO

### Blog Topics (Keyword Targeted)

| Topic | Target Keyword | Search Intent |
|-------|----------------|---------------|
| Come scegliere il parquet giusto | scegliere parquet | Informational |
| Parquet massello vs prefinito | massello vs prefinito | Comparison |
| Quanto costa posare il parquet 2024 | costo posa parquet | Commercial |
| Come mantenere il parquet | manutenzione parquet | Informational |
| Parquet in bagno: si può fare? | parquet bagno | Question |
| Parquet a spina di pesce: guida | parquet spina pesce | Informational |
| Restauro parquet antico | restauro parquet antico | Commercial |

### Content Calendar

| Month | Content Focus |
|-------|---------------|
| 1 | Foundation pages (services, about) |
| 2 | Main service pages optimization |
| 3-4 | Blog launch (2 posts/month) |
| 5-6 | Portfolio expansion with SEO |
| 7-8 | Local landing pages |
| 9-10 | Link building campaign |
| 11-12 | Content refresh and expansion |

---

## Link Building Strategy

### Target Backlinks

| Source Type | Priority | Approach |
|-------------|----------|----------|
| Architecture/Design blogs | High | Guest posts, features |
| Home improvement sites | High | Resource linking |
| Local business directories | Medium | Submissions |
| Industry associations | Medium | Membership |
| Interior design magazines | High | PR outreach |
| Local news outlets | Medium | Story pitching |

### Internal Linking

```
Homepage
├── Services (linked from homepage)
│   ├── Posa Parquet (linked from services, related posts)
│   ├── Restauro (linked from services, portfolio)
│   └── SPC/PVC (linked from services, comparisons)
├── Portfolio (linked from services, homepage)
│   └── Projects (linked from relevant services)
├── Blog (linked from services, footer)
│   └── Posts (linked to services, each other)
└── Contact (linked from every page, CTAs)
```

---

## Tracking & Analytics

### KPIs to Monitor

| KPI | Tool | Frequency |
|-----|------|-----------|
| Organic traffic | Google Analytics | Weekly |
| Keyword rankings | Semrush/Ahrefs | Weekly |
| Page load speed | PageSpeed Insights | Monthly |
| Core Web Vitals | Search Console | Monthly |
| Backlink profile | Ahrefs | Monthly |
| Conversion rate | Google Analytics | Weekly |
| Index coverage | Search Console | Weekly |

### Google Search Console Setup

1. Verify domain ownership
2. Submit sitemap
3. Monitor index coverage
4. Track Core Web Vitals
5. Review search queries
6. Fix crawl errors

### Google Analytics 4 Events

```javascript
// Track key conversions
gtag('event', 'generate_lead', {
  'event_category': 'Contact',
  'event_label': 'Quote Form Submission'
});

gtag('event', 'click', {
  'event_category': 'Contact',
  'event_label': 'WhatsApp Button'
});
```

---

## SEO Checklist

### Pre-Launch

- [ ] All pages have unique title tags
- [ ] All pages have meta descriptions
- [ ] Images have alt text
- [ ] URLs are clean and descriptive
- [ ] Internal linking structure in place
- [ ] Schema markup implemented
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Canonical tags set
- [ ] Mobile-friendly verified
- [ ] Page speed optimized
- [ ] SSL certificate active

### Post-Launch

- [ ] Submit sitemap to Search Console
- [ ] Verify all pages indexed
- [ ] Set up rank tracking
- [ ] Configure Google Analytics
- [ ] Monitor Core Web Vitals
- [ ] Begin content publishing
- [ ] Start link building outreach
