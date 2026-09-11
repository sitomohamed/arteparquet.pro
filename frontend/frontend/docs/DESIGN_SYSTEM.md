# Design System

## Arteparquet Design System

### Overview

The Arteparquet Design System provides a comprehensive set of guidelines, components, and patterns to create a consistent, premium user experience across all digital touchpoints.

---

## Design Principles

### 1. Luxury Through Simplicity

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."

- Remove unnecessary elements
- Let content breathe
- Quality over quantity
- Every element must earn its place

### 2. Warmth in Digital

- Bring the tactile warmth of wood to digital
- Use warm colors and soft interactions
- Create emotional connections
- Humanize the experience

### 3. Precision Matters

- Pixel-perfect alignment
- Consistent spacing
- Meticulous typography
- No approximations

### 4. Motion with Purpose

- Animations enhance understanding
- Subtle, not distracting
- Performance-conscious
- Natural, organic movements

### 5. Accessibility is Excellence

- Inclusive design for all users
- Clear visual hierarchy
- Readable typography
- Keyboard navigable

---

## Spacing System

### Base Unit

The spacing system uses an 8px base unit for consistency.

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | No spacing |
| `space-1` | 4px | Tight spacing, icons |
| `space-2` | 8px | Small gaps, inline elements |
| `space-3` | 12px | Default component padding |
| `space-4` | 16px | Medium gaps |
| `space-5` | 24px | Section padding (small) |
| `space-6` | 32px | Large gaps |
| `space-7` | 48px | Section spacing |
| `space-8` | 64px | Large section spacing |
| `space-9` | 96px | Hero/major section spacing |
| `space-10` | 128px | Maximum spacing |

### Tailwind Implementation

```typescript
// tailwind.config.ts
spacing: {
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '24px',
  '6': '32px',
  '7': '48px',
  '8': '64px',
  '9': '96px',
  '10': '128px',
}
```

---

## Grid System

### Container

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| `xs` (<640px) | 100% | 16px |
| `sm` (640px) | 640px | 24px |
| `md` (768px) | 768px | 32px |
| `lg` (1024px) | 1024px | 48px |
| `xl` (1280px) | 1280px | 64px |
| `2xl` (1536px) | 1440px | 80px |

### Grid Columns

- 12-column grid for complex layouts
- 4-column grid for simple layouts
- Gutters: 24px (mobile), 32px (tablet), 48px (desktop)

---

## Shadows

### Elevation System

| Level | Shadow | Usage |
|-------|--------|-------|
| `shadow-none` | none | Flat elements |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards, buttons |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Dropdowns, modals |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Major overlays |

### Usage Guidelines

- Use shadows sparingly for premium feel
- Shadows indicate elevation/interaction
- Prefer subtle shadows over dramatic ones
- Dark mode: reduce shadow opacity by 50%

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0px | Sharp edges |
| `rounded-sm` | 4px | Small elements |
| `rounded` | 8px | Default (buttons, inputs) |
| `rounded-md` | 12px | Cards |
| `rounded-lg` | 16px | Large cards |
| `rounded-xl` | 24px | Hero elements |
| `rounded-full` | 9999px | Circles, pills |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-0` | 0 | Base layer |
| `z-10` | 10 | Raised content |
| `z-20` | 20 | Dropdowns |
| `z-30` | 30 | Sticky header |
| `z-40` | 40 | Fixed elements |
| `z-50` | 50 | Modals, overlays |
| `z-60` | 60 | Notifications |
| `z-70` | 70 | Tooltips |
| `z-max` | 9999 | Maximum (rarely used) |

---

## Breakpoints

| Name | Min Width | Target |
|------|-----------|--------|
| `xs` | 0px | Small phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large screens |

### Mobile-First Approach

Always start with mobile styles and enhance for larger screens:

```tsx
<div className="p-4 md:p-6 lg:p-8 xl:p-10">
  <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
    Headline
  </h1>
</div>
```

---

## Component Anatomy

### Button Anatomy

```
┌─────────────────────────────────────┐
│  [icon]  Label Text  [icon]         │
│                                     │
│  ← padding-x →     ← padding-x →    │
└─────────────────────────────────────┘
     ↑                            ↑
  padding-y                   padding-y
```

### Card Anatomy

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │          Image/Media            │ │
│ └─────────────────────────────────┘ │
│                                     │
│   Title                             │
│   Description text that may         │
│   span multiple lines               │
│                                     │
│   [Action Button]                   │
│                                     │
└─────────────────────────────────────┘
```

### Form Field Anatomy

```
┌─────────────────────────────────────┐
│   Label                             │
│   ┌─────────────────────────────┐   │
│   │ [icon] Placeholder text     │   │
│   └─────────────────────────────┘   │
│   Helper text or error message      │
└─────────────────────────────────────┘
```

---

## Design Tokens

### Token Naming Convention

```
{category}-{property}-{variant}-{state}
```

Examples:
- `color-background-primary`
- `color-text-secondary`
- `font-size-heading-lg`
- `spacing-section-sm`

### Token Categories

| Category | Description |
|----------|-------------|
| `color` | All color values |
| `font` | Typography settings |
| `spacing` | Margins, padding, gaps |
| `size` | Widths, heights |
| `radius` | Border radius values |
| `shadow` | Box shadow values |
| `border` | Border styles |
| `transition` | Animation timings |
| `z-index` | Stacking order |

---

## Implementation

### CSS Variables

```css
:root {
  /* Colors */
  --color-background: #F9F8F6;
  --color-foreground: #1A1A1A;
  --color-primary: #C89B7B;
  --color-secondary: #0A0A0A;
  
  /* Typography */
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
  
  /* Spacing */
  --spacing-unit: 8px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}
```

### Tailwind Config

See [CODING_STANDARDS.md](./CODING_STANDARDS.md) for complete Tailwind configuration.

---

## Design Checklist

Before finalizing any design:

- [ ] Follows color system guidelines
- [ ] Uses correct typography
- [ ] Spacing is consistent with system
- [ ] Components are from the library
- [ ] Responsive behavior defined
- [ ] Hover/focus states specified
- [ ] Animations are purposeful
- [ ] Accessibility requirements met
- [ ] Dark mode considered
- [ ] Performance impact evaluated
