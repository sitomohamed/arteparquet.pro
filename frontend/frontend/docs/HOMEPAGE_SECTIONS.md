# Homepage Sections Specification

## Overview
The homepage is the most critical page. Every section must serve a specific purpose in the conversion funnel.

---

## Section Order & Purpose

| # | Section | Purpose | Conversion Goal |
|---|---------|---------|-----------------|
| 1 | Hero | First impression, emotional hook | CTA click |
| 2 | Trust Bar | Instant credibility | Reduce bounce |
| 3 | Services Overview | Show capabilities | Page navigation |
| 4 | Portfolio Preview | Visual proof | Build desire |
| 5 | La Scala Story | Ultimate authority | Build trust |
| 6 | Testimonials | Social proof | Overcome doubt |
| 7 | Process | Set expectations | Reduce anxiety |
| 8 | CTA Section | Final push | Form submission |
| 9 | FAQ Preview | Handle objections | Remove friction |

---

## 1. Hero Section

### Layout
- **Background:** Full-bleed dark image or video of beautiful parquet
- **Overlay:** Gradient from nero-marquina (bottom) to transparent (top)
- **Height:** 100vh (full viewport)

### Content
```
[Overline - small, uppercase, tracking-wide]
Teatro alla Scala, Milano — 2004

[Headline - display-2xl, serif, white]
L'eccellenza scolpita nel legno.

[Subheadline - body-xl, sans, white/70%]
Maestri posatori dal 2004. Posa, restauro e parquet premium
in tutta Italia.

[CTAs]
[Richiedi Preventivo Gratuito] (primary button)
[Scopri i Nostri Lavori] (ghost button with arrow)
```

### Scroll Indicator
Subtle animated chevron at bottom indicating more content below.

---

## 2. Trust Bar

### Layout
- **Background:** White or travertino
- **Height:** Auto (padding: py-8)
- **Grid:** 4 columns on desktop, 2x2 on tablet, stacked on mobile

### Content
```tsx
const trustItems = [
  { icon: Award, value: "20+", label: "Anni di esperienza" },
  { icon: Building2, value: "Teatro alla Scala", label: "Milano, 2004" },
  { icon: MapPin, value: "Tutta Italia", label: "Operiamo ovunque" },
  { icon: Star, value: "4.9/5", label: "Google Reviews" },
];
```

---

## 3. Services Overview

### Layout
- **Background:** Travertino
- **Heading:** Center-aligned section header

### Content
```
[Overline]
I Nostri Servizi

[Headline]
L'arte della posa, in ogni sua forma.

[Description]
Dal parquet massello tradizionale alle moderne soluzioni SPC e PVC,
offriamo soluzioni premium per ogni esigenza.
```

### Cards (Grid 3 columns)
1. **Posa Parquet** - Icon: Hammer
2. **Restauro & Levigatura** - Icon: Sparkles
3. **SPC, PVC & Laminati** - Icon: Layers

Each card links to respective service page.

---

## 4. Portfolio Preview

### Layout
- **Background:** White
- **Grid:** 2 large + 4 small images (masonry-style)

### Content
```
[Overline]
Portfolio

[Headline]
Ogni progetto è un'opera.

[Link]
Vedi tutti i progetti →
```

Show 4-6 featured projects with hover effects revealing title and category.

---

## 5. La Scala Story (Credentials)

### Layout
- **Background:** Nero-marquina (dark section)
- **Two columns:** Text left, image right (or full-width dramatic)

### Content
```
[Overline - rovere color]
La Nostra Storia

[Headline - white]
Dal palcoscenico della Scala.

[Body - white/70%]
Nel 2004, Arabi Mohamed venne selezionato per il team
incaricato della posa, del restauro e della manutenzione
del parquet nel Teatro alla Scala di Milano.

Quella stessa dedizione all'eccellenza oggi è al servizio
del tuo progetto.

[CTA]
[Scopri di più] → (links to /chi-siamo)
```

---

## 6. Testimonials

### Layout
- **Background:** Travertino
- **Format:** Carousel (swipeable)

### Content
```
[Overline]
Dicono di Noi

[Headline]
La soddisfazione dei nostri clienti.
```

Show 3-5 testimonials with:
- Quote (serif, italic)
- Author name
- Location
- Star rating
- Optional: small author photo

---

## 7. Process Section

### Layout
- **Background:** White
- **Format:** Horizontal steps (vertical on mobile)

### Content
```
[Overline]
Come Lavoriamo

[Headline]
Un percorso semplice e trasparente.

[Steps]
1. Consulenza → Sopralluogo gratuito e ascolto delle tue esigenze
2. Proposta → Preventivo dettagliato e trasparente
3. Realizzazione → Posa a regola d'arte con materiali premium
4. Consegna → Il tuo nuovo pavimento, pronto da vivere
```

---

## 8. CTA Section

### Layout
- **Background:** Rovere (accent color) or nero-marquina
- **Full-width:** Centered content

### Content
```
[Headline - white]
Pronto a trasformare il tuo spazio?

[Subheadline - white/80%]
Sopralluogo e preventivo gratuiti, senza impegno.

[CTA Button]
[Richiedi Preventivo Gratuito] (white button on dark bg)

[Alternative]
oppure chiamaci: +39 389 240 7827
```

---

## 9. FAQ Preview

### Layout
- **Background:** Travertino
- **Format:** Accordion (3-5 most common questions)

### Content
```
[Headline]
Domande Frequenti

[Questions]
- Quanto costa posare il parquet?
- Quanto tempo richiede la posa?
- Che garanzia offrite?
- Operate in tutta Italia?

[Link]
Vedi tutte le FAQ →
```

---

## Technical Notes

### Animations
- Each section reveals on scroll (FadeIn from bottom)
- Stagger children elements within sections
- Stats counter animates when in view
- Testimonial carousel auto-plays

### Performance
- Hero image/video: priority loading
- Portfolio images: lazy load
- Intersection Observer for scroll animations
