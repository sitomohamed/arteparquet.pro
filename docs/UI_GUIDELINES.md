# UI Guidelines

## Arteparquet User Interface Standards

### Overview

These guidelines ensure a consistent, premium user interface across the Arteparquet website. Every element should reflect the brand's commitment to excellence and craftsmanship.

---

## Header

### Specifications

| Property | Value |
|----------|-------|
| **Height** | 80px (desktop), 64px (mobile) |
| **Position** | Fixed, top |
| **Initial State** | Transparent background |
| **Scrolled State** | Solid background with subtle shadow |
| **Z-Index** | 30 |

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  [A] Arteparquet.pro                              Nav   Nav   Nav│
│      Specialisti in Parquet...                          [CTA]   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Logo Section (Left)

1. **Icon**: Circular badge with "A"
   - Size: 40px diameter
   - Background: Rovere (`#C89B7B`)
   - Letter: White, serif font
   
2. **Wordmark**: "Arteparquet.pro"
   - Font: Serif (Playfair Display)
   - Weight: SemiBold
   - Size: 20px
   
3. **Tagline**: "Specialisti in Parquet • SPC • PVC • Laminati"
   - Font: Sans (Inter)
   - Weight: Regular
   - Size: 12px
   - Color: Neutral 500

### Navigation (Right)

- Items: L'Atelier | Servizi | Portfolio | Contatti
- Font: Sans, 14px, Medium weight
- Spacing: 32px between items
- Hover: Rovere color
- Active: Rovere color + underline

### CTA Button

- Text: "Preventivo Gratuito"
- Style: Primary button
- Always visible on desktop
- Hidden on mobile (in hamburger menu)

### Mobile Header

- Hamburger menu icon (right side)
- Full-screen overlay navigation
- Smooth slide-in animation
- Close button (X) top right

---

## Buttons

### Primary Button

| Property | Value |
|----------|-------|
| **Background** | Rovere (`#C89B7B`) |
| **Text** | White |
| **Font** | Sans, 14px, SemiBold |
| **Padding** | 16px 32px |
| **Border Radius** | 8px |
| **Hover** | Darken 10% |
| **Active** | Darken 15% |
| **Transition** | 200ms ease |

```tsx
<Button variant="primary">
  Richiedi Preventivo
</Button>
```

### Secondary Button

| Property | Value |
|----------|-------|
| **Background** | Transparent |
| **Border** | 1px solid Legno Bruciato |
| **Text** | Legno Bruciato |
| **Hover** | Background: Legno Bruciato, Text: White |

```tsx
<Button variant="secondary">
  Scopri di Più
</Button>
```

### Ghost Button

| Property | Value |
|----------|-------|
| **Background** | Transparent |
| **Border** | None |
| **Text** | Rovere |
| **Hover** | Underline |

```tsx
<Button variant="ghost">
  Vedi Portfolio →
</Button>
```

### Button with Icon

```tsx
<Button variant="primary" icon={<ArrowRight />} iconPosition="right">
  Inizia Ora
</Button>
```

### Button Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 36px | 12px 20px | 13px |
| `md` | 44px | 16px 32px | 14px |
| `lg` | 52px | 20px 40px | 16px |

---

## Cards

### Standard Card

```
┌─────────────────────────────────────┐
│                                     │
│         [Image 16:9 ratio]          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Category Tag                       │
│  Card Title                         │
│  Description text that spans        │
│  multiple lines if needed.          │
│                                     │
│  [Action Button]                    │
│                                     │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| **Background** | White |
| **Border** | None |
| **Border Radius** | 12px |
| **Shadow** | `shadow-md` on hover |
| **Padding** | 24px |
| **Image Ratio** | 16:9 or 4:3 |

### Service Card

- Icon or image at top
- Service title
- Brief description
- Hover: lift + shadow
- Click: navigates to service page

### Portfolio Card

- Full-bleed image
- Overlay on hover with title + category
- Click: opens project detail

### Testimonial Card

- Quote text (serif, italic)
- Author name
- Author role/company
- Optional author photo

---

## Forms

### Input Field

| Property | Value |
|----------|-------|
| **Height** | 48px |
| **Border** | 1px solid Neutral 300 |
| **Border Radius** | 8px |
| **Padding** | 12px 16px |
| **Font** | Sans, 16px |
| **Placeholder** | Neutral 400 |
| **Focus** | Border: Rovere, Ring: Rovere/20% |
| **Error** | Border: Error red |

### Label

- Font: Sans, 14px, Medium
- Color: Legno Bruciato
- Margin bottom: 8px

### Helper Text

- Font: Sans, 12px, Regular
- Color: Neutral 500
- Margin top: 4px

### Error Message

- Font: Sans, 12px, Medium
- Color: Error red
- Icon: Alert circle (left)

### Textarea

- Same styling as input
- Min height: 120px
- Resize: vertical only

### Select/Dropdown

- Same styling as input
- Custom dropdown arrow (Lucide ChevronDown)
- Dropdown menu: white background, shadow-lg

### Checkbox & Radio

- Custom styled (not browser default)
- Size: 20px
- Border: 2px solid Neutral 400
- Checked: Rovere background, white checkmark

---

## Sections

### Section Spacing

| Section Type | Padding (Desktop) | Padding (Mobile) |
|--------------|-------------------|------------------|
| Hero | 120px top, 80px bottom | 80px top, 48px bottom |
| Standard | 96px vertical | 64px vertical |
| Compact | 64px vertical | 48px vertical |
| CTA | 80px vertical | 48px vertical |

### Section Backgrounds

- **Light**: Travertino (`#F9F8F6`)
- **White**: Pure white (`#FFFFFF`)
- **Dark**: Nero Marquina (`#0A0A0A`)
- **Accent**: Rovere at 5-10% opacity

### Section Headers

```tsx
<section>
  <span className="overline">I Nostri Servizi</span>
  <h2 className="section-title">L'Arte della Posa</h2>
  <p className="section-description">
    Description text here
  </p>
</section>
```

---

## Icons

### Icon Library

Use **Lucide React** exclusively for consistent styling.

### Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| `xs` | 16px | Inline with text |
| `sm` | 20px | Buttons, inputs |
| `md` | 24px | Default |
| `lg` | 32px | Feature icons |
| `xl` | 48px | Service cards |
| `2xl` | 64px | Hero features |

### Icon Colors

- Default: `currentColor` (inherits text color)
- Primary: Rovere
- Muted: Neutral 400
- On dark: White

---

## Images

### Aspect Ratios

| Ratio | Usage |
|-------|-------|
| 16:9 | Hero, banners |
| 4:3 | Cards, galleries |
| 1:1 | Thumbnails, avatars |
| 3:4 | Portrait shots |

### Image Treatment

- All images use `next/image` for optimization
- Lazy loading by default
- Placeholder: blur (generate from image)
- Border radius: match container (8-12px typical)

### Image Overlays

For text on images, use gradient overlays:
- From bottom: `linear-gradient(to top, rgba(0,0,0,0.7), transparent)`
- Full: `rgba(0,0,0,0.4)` for dramatic effect

---

## Loading States

### Skeleton Loaders

- Background: Neutral 200
- Animation: Subtle pulse
- Match exact dimensions of content

### Spinners

- Color: Rovere
- Size: 24px default
- Animation: Smooth rotation

### Progress Bars

- Background: Neutral 200
- Fill: Rovere
- Height: 4px
- Border radius: full

---

## Modals & Overlays

### Modal

| Property | Value |
|----------|-------|
| **Overlay** | Black at 50% opacity |
| **Background** | White |
| **Border Radius** | 16px |
| **Padding** | 32px |
| **Max Width** | 560px (default), 720px (large) |
| **Shadow** | shadow-xl |
| **Animation** | Scale up + fade in |

### Close Button

- Position: Top right
- Icon: X (Lucide)
- Size: 24px
- Hover: Neutral 400

---

## Notifications

### Toast Notifications

| Type | Icon | Border Color |
|------|------|--------------|
| Success | CheckCircle | Success green |
| Error | XCircle | Error red |
| Warning | AlertTriangle | Warning yellow |
| Info | Info | Info blue |

### Position

- Desktop: Top right
- Mobile: Top center
- Auto dismiss: 5 seconds

---

## Dividers

### Horizontal Rule

- Color: Neutral 200
- Height: 1px
- Full width or contained

### Decorative Divider

- Centered dot or small icon
- Neutral 300
- Use sparingly

---

## Dark Mode Sections

For sections with dark backgrounds:

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | Travertino | Nero Marquina |
| Primary Text | Legno Bruciato | White |
| Secondary Text | Neutral 600 | White/70% |
| Accent | Rovere | Rovere |
| Borders | Neutral 200 | White/20% |
| Cards | White | White/5% |
