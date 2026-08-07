# Typography

## Arteparquet Typography System

### Philosophy

Typography is the voice of the brand. For Arteparquet, typography must communicate elegance, craftsmanship, and Italian sophistication while maintaining perfect readability.

---

## Font Families

### Primary: Playfair Display (Serif)

**Usage**: Headlines, hero text, quotes, emphasis

Playfair Display is an elegant transitional serif with high contrast and distinctive italic styles. It evokes the refinement of classic Italian typography while remaining contemporary.

| Property | Value |
|----------|-------|
| **Family** | Playfair Display |
| **Source** | Google Fonts |
| **Weights** | 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) |
| **Styles** | Normal, Italic |
| **Variable** | `--font-serif` |

```tsx
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})
```

### Secondary: Inter (Sans-Serif)

**Usage**: Body text, UI elements, navigation, forms

Inter is a highly legible sans-serif designed for screens. It provides excellent readability at all sizes and maintains the modern, professional feel of the brand.

| Property | Value |
|----------|-------|
| **Family** | Inter |
| **Source** | Google Fonts |
| **Weights** | 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) |
| **Styles** | Normal |
| **Variable** | `--font-sans` |

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
```

---

## Type Scale

### Desktop Scale

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| `display-2xl` | 72px | 1.0 | 600 | Hero headlines |
| `display-xl` | 60px | 1.05 | 600 | Major section titles |
| `display-lg` | 48px | 1.1 | 600 | Section headers |
| `display-md` | 36px | 1.15 | 600 | Sub-section headers |
| `display-sm` | 30px | 1.2 | 600 | Card titles |
| `heading-xl` | 24px | 1.3 | 600 | Large headings |
| `heading-lg` | 20px | 1.4 | 600 | Medium headings |
| `heading-md` | 18px | 1.4 | 600 | Small headings |
| `body-xl` | 20px | 1.6 | 400 | Large body text |
| `body-lg` | 18px | 1.6 | 400 | Intro paragraphs |
| `body-md` | 16px | 1.6 | 400 | Default body |
| `body-sm` | 14px | 1.5 | 400 | Secondary text |
| `caption` | 12px | 1.4 | 400 | Captions, labels |
| `overline` | 12px | 1.4 | 500 | Overlines, tags |

### Mobile Scale

| Name | Desktop | Mobile | Ratio |
|------|---------|--------|-------|
| `display-2xl` | 72px | 40px | 0.56 |
| `display-xl` | 60px | 36px | 0.60 |
| `display-lg` | 48px | 30px | 0.63 |
| `display-md` | 36px | 24px | 0.67 |
| `display-sm` | 30px | 20px | 0.67 |
| `heading-xl` | 24px | 20px | 0.83 |
| `heading-lg` | 20px | 18px | 0.90 |
| `body-xl` | 20px | 18px | 0.90 |
| `body-lg` | 18px | 16px | 0.89 |
| `body-md` | 16px | 16px | 1.00 |

---

## Tailwind Configuration

```typescript
// tailwind.config.ts
{
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-2xl': ['4.5rem', { lineHeight: '1', fontWeight: '600' }],
        'display-xl': ['3.75rem', { lineHeight: '1.05', fontWeight: '600' }],
        'display-lg': ['3rem', { lineHeight: '1.1', fontWeight: '600' }],
        'display-md': ['2.25rem', { lineHeight: '1.15', fontWeight: '600' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }],
        
        // Heading sizes
        'heading-xl': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        
        // Body sizes
        'body-xl': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        
        // Utility sizes
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
        'overline': ['0.75rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.1em' }],
      },
    },
  },
}
```

---

## Typography Components

### Headings

```tsx
// H1 - Hero/Display
<h1 className="font-serif text-display-2xl md:text-display-xl text-legno-bruciato">
  L'eccellenza scolpita nel legno
</h1>

// H2 - Section Title
<h2 className="font-serif text-display-md md:text-display-lg text-legno-bruciato">
  I Nostri Servizi
</h2>

// H3 - Subsection
<h3 className="font-serif text-heading-xl md:text-display-sm text-legno-bruciato">
  Posa Parquet
</h3>

// H4 - Card Title
<h4 className="font-sans text-heading-lg font-semibold text-legno-bruciato">
  Parquet Massello
</h4>
```

### Body Text

```tsx
// Lead paragraph
<p className="font-sans text-body-xl text-neutral-600 leading-relaxed">
  Dal 2004, trasformiamo spazi in opere d'arte senza tempo.
</p>

// Regular paragraph
<p className="font-sans text-body-md text-neutral-600">
  Ogni listello di legno racconta una storia. Il nostro compito è 
  orchestrare queste storie in una sinfonia perfetta.
</p>

// Small text
<p className="font-sans text-body-sm text-neutral-500">
  © 2024 Arteparquet. Tutti i diritti riservati.
</p>
```

### Special Styles

```tsx
// Overline (above headings)
<span className="font-sans text-overline uppercase tracking-widest text-rovere">
  Teatro alla Scala, Milano
</span>

// Quote/Testimonial
<blockquote className="font-serif text-display-sm italic text-legno-bruciato">
  "Un lavoro impeccabile, superato ogni aspettativa."
</blockquote>

// Caption
<figcaption className="font-sans text-caption text-neutral-500">
  Villa privata, Lago di Como — Parquet massello in rovere
</figcaption>
```

---

## Text Styling Rules

### Letter Spacing

| Style | Letter Spacing | Usage |
|-------|----------------|-------|
| Default | 0 | Body text |
| Tight | -0.025em | Large headlines |
| Wide | 0.025em | Subheadings |
| Extra Wide | 0.1em | Overlines, labels |
| Widest | 0.2em | All-caps small text |

### Text Transform

| Transform | Usage |
|-----------|-------|
| `uppercase` | Overlines, buttons, nav items |
| `capitalize` | Titles (use sparingly) |
| `lowercase` | Never (breaks readability) |
| `normal-case` | Default for body |

### Font Weight Pairing

| Context | Serif Weight | Sans Weight |
|---------|--------------|-------------|
| Headlines | SemiBold (600) | N/A |
| Subheadlines | Medium (500) | SemiBold (600) |
| Body | Regular (400) | Regular (400) |
| Emphasis | N/A | Medium (500) |
| Buttons | N/A | SemiBold (600) |

---

## Responsive Typography

### Fluid Type Scale

Use Tailwind's responsive prefixes:

```tsx
<h1 className="
  text-4xl         // Mobile: 36px
  md:text-5xl      // Tablet: 48px
  lg:text-6xl      // Desktop: 60px
  xl:text-7xl      // Large: 72px
  font-serif
">
  L'eccellenza scolpita nel legno
</h1>
```

### Breakpoint Guidelines

| Breakpoint | Headlines | Body |
|------------|-----------|------|
| Mobile (<768px) | 60% of desktop | 100% of desktop |
| Tablet (768-1024px) | 75% of desktop | 100% of desktop |
| Desktop (>1024px) | 100% | 100% |

---

## Accessibility

### Minimum Sizes

- Body text: Never below 16px
- Secondary text: Never below 14px
- Captions: Never below 12px

### Line Length

- Optimal: 60-75 characters per line
- Maximum: 80 characters
- Minimum: 45 characters

### Line Height

- Body text: 1.5-1.7
- Headlines: 1.0-1.2
- Never below 1.3 for body text

### Contrast

- All text must meet WCAG 2.1 AA standards
- Use color contrast checker tools
- See [COLOR_SYSTEM.md](./COLOR_SYSTEM.md) for approved combinations

---

## Typography Don'ts

| ❌ Don't | ✅ Do |
|----------|-------|
| Mix more than 2 font families | Use Playfair + Inter only |
| Use light weights on small text | Maintain readable weights |
| Center long paragraphs | Left-align body text |
| Use justified text | Use left alignment |
| Stretch or compress fonts | Use proper weights |
| Use more than 3 sizes per page | Maintain hierarchy |
| Forget responsive scaling | Test all breakpoints |
