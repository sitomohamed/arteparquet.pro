# Social Proof System

## Overview
Social proof is the #1 psychological driver for high-ticket service purchases. This document defines how to implement social proof elements throughout the website.

---

## Trust Badges

### Primary Badge: Teatro alla Scala
**Placement:** Hero section, About page, Contact page header
```tsx
// components/ui/scala-badge.tsx
<div className="flex items-center gap-3 rounded-full bg-nero-marquina/10 px-4 py-2">
  <span className="text-sm font-medium text-rovere">
    🏛️ Teatro alla Scala, Milano — 2004
  </span>
</div>
```

### Stats Counter Section
```tsx
// components/sections/stats-section.tsx
const stats = [
  { value: "20+", label: "Anni di esperienza" },
  { value: "500+", label: "Progetti completati" },
  { value: "98%", label: "Clienti soddisfatti" },
  { value: "100%", label: "Italia coperta" },
];
```

---

## Testimonials

### Collection Strategy
1. **Post-project email** - Ask for review 7 days after completion
2. **Google Review** - Primary platform (affects Local SEO)
3. **Video testimonials** - Most powerful (use for key clients)

### Testimonial Card Structure
```tsx
interface Testimonial {
  quote: string;          // 50-150 words
  author: string;         // First name + Last initial (Mario R.)
  role?: string;          // "Proprietario" | "Architetto" | "Hotel Manager"
  location: string;       // "Milano" | "Roma"
  projectType?: string;   // "Posa parquet massello"
  rating: number;         // 1-5 stars
  image?: string;         // Optional author photo
  date?: string;          // "Marzo 2024"
}
```

### Testimonial Carousel
- Auto-rotate every 6 seconds
- Pause on hover
- Dots navigation
- Swipe on mobile
- Show 1 (mobile), 2 (tablet), 3 (desktop)

---

## Live Activity Notifications

### Subtle Social Proof Toasts
Show occasional (not spammy) notifications of recent activity:

```tsx
// components/ui/activity-toast.tsx
// Examples:
"Un architetto di Milano ha richiesto una consulenza"
"Nuovo progetto completato a Roma"
"Preventivo inviato per villa a Firenze"
```

**Rules:**
- Show max 1 every 45 seconds
- Only on homepage
- Elegant, not aggressive
- Can be dismissed
- Don't show if user is filling form
- Stop after 3 notifications

### Design
- Position: Bottom-left
- Style: Subtle, matches brand
- Animation: Slide in from left, fade out
- Duration: 4 seconds visible

---

## Client Logos (If B2B)

For architect partnerships or commercial projects:
```tsx
// components/sections/clients-section.tsx
<section>
  <p className="text-center text-neutral-500 text-sm mb-8">
    Scelti da architetti e aziende in tutta Italia
  </p>
  <div className="flex flex-wrap justify-center gap-8 opacity-60">
    {clientLogos.map(logo => (
      <Image key={logo.name} src={logo.src} alt={logo.name} />
    ))}
  </div>
</section>
```

---

## Review Aggregation

### Display Google Rating
If 4.5+ stars with 20+ reviews:
```tsx
// components/ui/google-rating.tsx
<div className="flex items-center gap-2">
  <GoogleIcon className="h-5 w-5" />
  <div className="flex">
    {[1,2,3,4,5].map(i => <Star key={i} filled={i <= 4.8} />)}
  </div>
  <span className="font-medium">4.8</span>
  <span className="text-neutral-500">(47 recensioni)</span>
</div>
```

---

## Before/After Gallery

The most powerful social proof for restoration services:

```tsx
// components/media/before-after-slider.tsx
// Interactive slider showing dramatic transformations
// Include project details:
// - Location
// - Service performed
// - Time to complete
// - Client testimonial (if available)
```

---

## Portfolio as Social Proof

### Project Card Social Elements
```tsx
interface ProjectCard {
  images: string[];
  title: string;
  location: string;
  category: string;
  year: number;
  areaSqm?: number;
  // Social proof elements:
  clientType?: string;      // "Villa privata" | "Hotel 5 stelle"
  testimonialSnippet?: string;
  featured?: boolean;       // Shows "Progetto in evidenza" badge
}
```

---

## Credibility Timeline

On About page, show company milestones:
```tsx
const milestones = [
  { year: 2004, event: "Posa parquet Teatro alla Scala, Milano" },
  { year: 2010, event: "500° progetto completato" },
  { year: 2015, event: "Espansione servizi in tutta Italia" },
  { year: 2020, event: "Lancio servizi SPC e PVC premium" },
  { year: 2024, event: "20 anni di eccellenza" },
];
```
