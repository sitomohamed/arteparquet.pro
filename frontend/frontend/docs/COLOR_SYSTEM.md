# Color System

## Arteparquet Color Palette

### Philosophy

The color palette is inspired by natural wood tones, Italian craftsmanship, and premium interior design. Colors should evoke warmth, elegance, and trust.

---

## Primary Colors

### Travertino (Background)

The primary background color. A warm, chalky off-white that feels softer than pure white, giving an editorial, gallery-like feel.

| Property | Value |
|----------|-------|
| **Name** | Travertino |
| **Hex** | `#F9F8F6` |
| **RGB** | `249, 248, 246` |
| **HSL** | `40°, 23%, 97%` |
| **Usage** | Primary background, cards, sections |

### Legno Bruciato (Foreground)

The primary text color. A deep, rich charcoal that's softer than pure black, providing excellent readability with warmth.

| Property | Value |
|----------|-------|
| **Name** | Legno Bruciato |
| **Hex** | `#1A1A1A` |
| **RGB** | `26, 26, 26` |
| **HSL** | `0°, 0%, 10%` |
| **Usage** | Primary text, headings, icons |

### Rovere (Accent)

The accent color. A warm oak/camel tone for highlights, active states, and calls to action.

| Property | Value |
|----------|-------|
| **Name** | Rovere |
| **Hex** | `#C89B7B` |
| **RGB** | `200, 155, 123` |
| **HSL** | `25°, 43%, 63%` |
| **Usage** | Buttons, links, accents, highlights |

### Nero Marquina (Contrast)

A rich, deep black for immersive sections, hero backgrounds, and dramatic contrast.

| Property | Value |
|----------|-------|
| **Name** | Nero Marquina |
| **Hex** | `#0A0A0A` |
| **RGB** | `10, 10, 10` |
| **HSL** | `0°, 0%, 4%` |
| **Usage** | Dark sections, hero, footer, overlays |

---

## Extended Palette

### Neutral Scale

| Name | Hex | Usage |
|------|-----|-------|
| `neutral-50` | `#FAFAF9` | Lightest background |
| `neutral-100` | `#F5F5F4` | Subtle backgrounds |
| `neutral-200` | `#E7E5E4` | Borders, dividers |
| `neutral-300` | `#D6D3D1` | Disabled states |
| `neutral-400` | `#A8A29E` | Placeholder text |
| `neutral-500` | `#78716C` | Secondary text |
| `neutral-600` | `#57534E` | Body text |
| `neutral-700` | `#44403C` | Strong text |
| `neutral-800` | `#292524` | Headings |
| `neutral-900` | `#1C1917` | Maximum contrast |

### Wood Tones

| Name | Hex | Usage |
|------|-----|-------|
| `wood-100` | `#F5EDE6` | Lightest wood |
| `wood-200` | `#E8D5C4` | Light wood |
| `wood-300` | `#D4B896` | Medium light |
| `wood-400` | `#C89B7B` | Rovere (primary accent) |
| `wood-500` | `#B8845F` | Medium wood |
| `wood-600` | `#9A6B47` | Dark wood |
| `wood-700` | `#7A5236` | Very dark wood |
| `wood-800` | `#5C3D28` | Espresso |
| `wood-900` | `#3D281A` | Nearly black wood |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| `success` | `#22C55E` | Success states, confirmations |
| `warning` | `#F59E0B` | Warnings, alerts |
| `error` | `#EF4444` | Errors, destructive actions |
| `info` | `#3B82F6` | Informational states |

---

## Color Usage Guidelines

### Background Colors

| Context | Color | Token |
|---------|-------|-------|
| Primary background | Travertino | `bg-travertino` |
| Secondary background | White | `bg-white` |
| Accent background | Rovere/10% | `bg-rovere/10` |
| Dark background | Nero Marquina | `bg-nero-marquina` |
| Card background | White | `bg-white` |

### Text Colors

| Context | Color | Token |
|---------|-------|-------|
| Primary text | Legno Bruciato | `text-legno-bruciato` |
| Secondary text | Neutral 600 | `text-neutral-600` |
| Muted text | Neutral 400 | `text-neutral-400` |
| Accent text | Rovere | `text-rovere` |
| On dark background | White | `text-white` |
| On dark (secondary) | White/70% | `text-white/70` |

### Interactive States

| State | Treatment |
|-------|-----------|
| Default | Base color |
| Hover | Darken 10% or lighten 10% |
| Active | Darken 15% |
| Focus | Add focus ring (Rovere) |
| Disabled | 50% opacity |

---

## Color Combinations

### Light Theme (Primary)

```
Background: Travertino (#F9F8F6)
Foreground: Legno Bruciato (#1A1A1A)
Accent: Rovere (#C89B7B)
```

### Dark Sections

```
Background: Nero Marquina (#0A0A0A)
Foreground: White (#FFFFFF)
Secondary: White/70%
Accent: Rovere (#C89B7B)
```

### Card on Light

```
Card Background: White (#FFFFFF)
Card Border: Neutral 200 (#E7E5E4)
Card Shadow: Subtle
```

---

## Contrast Requirements

### WCAG 2.1 AA Compliance

| Combination | Ratio | Status |
|-------------|-------|--------|
| Legno Bruciato on Travertino | 15.2:1 | ✅ Pass |
| Rovere on Travertino | 3.1:1 | ⚠️ Large text only |
| White on Nero Marquina | 19.5:1 | ✅ Pass |
| Rovere on Nero Marquina | 5.8:1 | ✅ Pass |
| Neutral 600 on Travertino | 5.4:1 | ✅ Pass |

### Guidelines

- Body text must meet 4.5:1 contrast ratio
- Large text (18px+) can use 3:1 minimum
- Interactive elements need clear visual feedback
- Don't rely on color alone to convey information

---

## Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Primary palette
        travertino: "#F9F8F6",
        "legno-bruciato": "#1A1A1A",
        rovere: "#C89B7B",
        "nero-marquina": "#0A0A0A",
        
        // Semantic mapping
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        
        // Wood scale
        wood: {
          100: "#F5EDE6",
          200: "#E8D5C4",
          300: "#D4B896",
          400: "#C89B7B",
          500: "#B8845F",
          600: "#9A6B47",
          700: "#7A5236",
          800: "#5C3D28",
          900: "#3D281A",
        },
      },
    },
  },
};

export default config;
```

---

## CSS Variables

```css
:root {
  --color-background: #F9F8F6;
  --color-foreground: #1A1A1A;
  --color-primary: #C89B7B;
  --color-secondary: #0A0A0A;
  
  --color-travertino: #F9F8F6;
  --color-legno-bruciato: #1A1A1A;
  --color-rovere: #C89B7B;
  --color-nero-marquina: #0A0A0A;
}

/* Dark mode override (if implemented) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0A0A0A;
    --color-foreground: #F9F8F6;
  }
}
```

---

## Color Accessibility Tools

When implementing, verify contrast with:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Stark](https://www.getstark.co/)
- Chrome DevTools Accessibility panel

---

## Color Psychology

| Color | Psychological Effect | Brand Application |
|-------|---------------------|-------------------|
| **Travertino** | Calm, clean, spacious | Creates breathing room, premium feel |
| **Legno Bruciato** | Sophisticated, grounded | Establishes authority, readability |
| **Rovere** | Warm, natural, trustworthy | Highlights actions, creates warmth |
| **Nero Marquina** | Luxurious, dramatic, powerful | Creates impact, showcase moments |

The palette works together to create an experience that feels:
- Warm and inviting (not cold/corporate)
- Premium and sophisticated (not cheap/busy)
- Natural and authentic (not artificial)
- Italian and elegant (not generic)
