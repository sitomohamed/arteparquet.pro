# Edge SEO & Programmatic Strategy 2026

## Overview
To dominate the Italian market for parquet services, we will use a hybrid of high-quality manual content and programmatic SEO for localized dominance.

## 1. Programmatic Local SEO (The Italian Coverage)
We want to rank #1 for "Posa parquet [City]" for the top 100 cities in Italy.
Instead of manually writing 100 pages, the backend/frontend will dynamically generate high-quality, non-spammy local pages.

**URL Structure:**
`arteparquet.pro/posa-parquet/[regione]/[citta]`
Example: `arteparquet.pro/posa-parquet/lombardia/milano`

**Dynamic Page Content Matrix:**
- **H1:** "Posa e Restauro Parquet a [Città]"
- **Dynamic Intro:** Mentions the specific city and the distance from our HQ / our operational capability there.
- **Dynamic Portfolio:** Shows projects physically closest to [Città] first.
- **Dynamic Testimonials:** Pulls reviews from clients in [Regione].
- **Schema Markup:** Injects specific GeoCoordinates and LocalBusiness schema for that exact city.

## 2. Zero Cumulative Layout Shift (CLS) Architecture
Google in 2026 penalizes layout shifts heavily.
- Fonts must use `next/font` to guarantee zero FOIT (Flash of Invisible Text).
- Every image and video *must* have exact `width` and `height` attributes or use `aspect-ratio` containers in Tailwind (`aspect-video`, `aspect-square`).
- Skeleton loaders must exactly match the dimensions of the final loaded content (especially for the portfolio grid).

## 3. Semantic HTML5 & ARIA dominance
Search engines use AI to understand page context. Semantic HTML is crucial.
- Use `<article>` for projects, `<aside>` for related services, `<figure>` and `<figcaption>` for all portfolio images.
- All SVG icons must have `<title>` tags for accessibility and image search indexing.

## 4. Edge Caching & Search Engine Delivery
- Use Vercel Edge caching.
- Generate `sitemap.xml` dynamically so that new programmatic local pages and portfolio pieces are instantly pinged to Google Indexing API via a backend Background Task.
