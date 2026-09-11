# Responsive Guidelines

## Arteparquet Responsive Design Standards

### Overview

This document defines responsive design principles and breakpoint-specific behaviors for optimal experience across all devices.

---

## Breakpoint System

### Breakpoints

| Name | Min Width | Target Devices |
|------|-----------|----------------|
| `xs` | 0px | Small phones (portrait) |
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), small laptops |
| `xl` | 1280px | Laptops, desktops |
| `2xl` | 1536px | Large desktops |

### Tailwind Configuration

```typescript
// tailwind.config.ts
{
  theme: {
    screens: {
      'xs': '0px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
}
```

---

## Mobile-First Approach

### Philosophy

Design for mobile first, then enhance for larger screens.

```tsx
// Mobile-first example
<div className="
  p-4          // Mobile: 16px padding
  md:p-6       // Tablet: 24px padding
  lg:p-8       // Desktop: 32px padding
  xl:p-10      // Large: 40px padding
">
```

### Priority Order

1. Content works on mobile
2. Enhance typography for tablet
3. Utilize space on desktop
4. Maximize large screens

---

## Layout Behavior

### Container Widths

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| xs | 100% | 16px |
| sm | 640px | 24px |
| md | 768px | 32px |
| lg | 1024px | 48px |
| xl | 1280px | 64px |
| 2xl | 1440px | 80px |

### Grid Systems

**12-Column Grid (Desktop):**
```tsx
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    Card 1
  </div>
</div>
```

**Responsive Grid Examples:**

```tsx
// 1 col mobile → 2 col tablet → 3 col desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Full mobile → Half desktop
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// Full mobile → Two-thirds desktop
<div className="lg:w-2/3">
```

---

## Component Responsiveness

### Header

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Hamburger menu, logo + menu icon |
| Tablet | Hamburger menu, logo centered |
| Desktop | Full navigation, CTA visible |

```tsx
<header className="flex items-center justify-between">
  {/* Logo - always visible */}
  <Logo />
  
  {/* Desktop nav - hidden on mobile */}
  <nav className="hidden lg:flex items-center gap-8">
    {navItems.map(item => <NavLink key={item} {...item} />)}
  </nav>
  
  {/* Mobile menu button - hidden on desktop */}
  <button className="lg:hidden">
    <Menu />
  </button>
</header>
```

### Hero Section

| Breakpoint | Typography | Layout |
|------------|------------|--------|
| Mobile | 40px headline | Stacked |
| Tablet | 48px headline | Stacked |
| Desktop | 72px headline | Flexible |

```tsx
<section className="
  py-20 md:py-32 lg:py-40
  px-4 md:px-8 lg:px-12
">
  <h1 className="
    text-4xl md:text-5xl lg:text-6xl xl:text-7xl
    leading-tight
  ">
    L'eccellenza scolpita nel legno
  </h1>
</section>
```

### Cards Grid

| Breakpoint | Columns |
|------------|---------|
| Mobile | 1 |
| Tablet | 2 |
| Desktop | 3 |
| Large | 4 |

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {cards.map(card => <Card key={card.id} {...card} />)}
</div>
```

### Form Layout

| Breakpoint | Layout |
|------------|--------|
| Mobile | Single column |
| Tablet | Single column |
| Desktop | Two columns for short fields |

```tsx
<form className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Input label="Nome" />
    <Input label="Cognome" />
  </div>
  <Input label="Email" type="email" />
  <Textarea label="Messaggio" />
</form>
```

---

## Typography Scaling

### Responsive Type Scale

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 (Hero) | 40px | 48px | 72px |
| H2 (Section) | 30px | 36px | 48px |
| H3 (Card) | 24px | 28px | 32px |
| Body | 16px | 16px | 16px |
| Small | 14px | 14px | 14px |

### Implementation

```tsx
// Responsive heading
<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">

// Responsive subheading
<h2 className="text-2xl md:text-3xl lg:text-4xl">

// Body text (usually doesn't change)
<p className="text-base md:text-lg">
```

---

## Spacing Scaling

### Responsive Spacing

| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Section padding | 48px | 64px | 96px |
| Container padding | 16px | 24px | 48px |
| Card padding | 16px | 24px | 32px |
| Element gap | 16px | 24px | 32px |

### Implementation

```tsx
// Section
<section className="py-12 md:py-16 lg:py-24">

// Container
<div className="px-4 md:px-6 lg:px-12">

// Card
<div className="p-4 md:p-6 lg:p-8">

// Grid gap
<div className="gap-4 md:gap-6 lg:gap-8">
```

---

## Image Handling

### Responsive Images

```tsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1200px
  "
/>
```

### Aspect Ratios

```tsx
// Responsive aspect ratio
<div className="aspect-video md:aspect-[4/3] lg:aspect-[16/9]">
  <Image fill />
</div>
```

### Image Visibility

```tsx
// Different images for different screens
<Image 
  src="/hero-mobile.jpg" 
  className="block md:hidden"
/>
<Image 
  src="/hero-desktop.jpg" 
  className="hidden md:block"
/>
```

---

## Touch Targets

### Minimum Sizes

| Element | Minimum Size |
|---------|--------------|
| Buttons | 44x44px |
| Links | 44x44px tap area |
| Form inputs | 48px height |
| Icons (interactive) | 44x44px |

### Implementation

```tsx
// Mobile-friendly button
<button className="min-h-[44px] min-w-[44px] px-6 py-3">
  Click Me
</button>

// Mobile-friendly link
<a className="inline-block py-2">
  Link Text
</a>
```

---

## Visibility Classes

### Show/Hide Elements

```tsx
// Mobile only
<div className="block md:hidden">Mobile content</div>

// Tablet and up
<div className="hidden md:block">Tablet+ content</div>

// Desktop only
<div className="hidden lg:block">Desktop content</div>

// Hide on desktop
<div className="lg:hidden">Not on desktop</div>
```

### Common Patterns

```tsx
// Mobile menu icon (hidden on desktop)
<Menu className="lg:hidden" />

// Desktop navigation (hidden on mobile)
<nav className="hidden lg:flex">

// Full CTA on desktop, icon on mobile
<button className="hidden sm:inline-flex">Request Quote</button>
<button className="sm:hidden"><Phone /></button>
```

---

## Testing Requirements

### Devices to Test

| Category | Devices |
|----------|---------|
| iOS | iPhone SE, iPhone 14, iPad |
| Android | Pixel 5, Samsung Galaxy S21, Tab |
| Desktop | 1366x768, 1920x1080, 2560x1440 |

### Testing Checklist

- [ ] Content readable at all sizes
- [ ] Touch targets adequate on mobile
- [ ] No horizontal scrolling
- [ ] Images scale properly
- [ ] Forms usable on mobile
- [ ] Navigation accessible
- [ ] Text not too small (<16px)
- [ ] Spacing appropriate per device

---

## Common Patterns

### Two-Column to Stacked

```tsx
<div className="flex flex-col lg:flex-row gap-8">
  <div className="lg:w-1/2">Column 1</div>
  <div className="lg:w-1/2">Column 2</div>
</div>
```

### Sidebar to Full Width

```tsx
<div className="flex flex-col lg:flex-row">
  <main className="lg:w-2/3">Content</main>
  <aside className="lg:w-1/3">Sidebar</aside>
</div>
```

### Stack to Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Items */}
</div>
```
