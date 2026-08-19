# Component Library

## Arteparquet UI Components

### Overview

This document defines all reusable UI components for the Arteparquet website. Components are built using shadcn/ui as a foundation, customized to match our design system.

---

## Base Components (shadcn/ui)

### Installation

```bash
npx shadcn-ui@latest init
```

### Components to Install

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add label
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add tooltip
```

---

## Custom Components

### Layout Components

#### Container

```tsx
// components/ui/container.tsx
interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

// Sizes: sm=640px, md=768px, lg=1024px, xl=1280px, full=1440px
```

#### Section

```tsx
// components/ui/section.tsx
interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'light' | 'dark' | 'accent';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
```

#### Grid

```tsx
// components/ui/grid.tsx
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

---

### Navigation Components

#### Header

```tsx
// components/layout/header.tsx
interface HeaderProps {
  transparent?: boolean;
}

// Features:
// - Logo with icon and wordmark
// - Navigation links
// - CTA button
// - Mobile hamburger menu
// - Scroll-aware background change
```

#### MobileNav

```tsx
// components/layout/mobile-nav.tsx
// Features:
// - Full-screen overlay
// - Slide-in animation
// - Navigation links
// - Contact info
// - Close button
```

#### Footer

```tsx
// components/layout/footer.tsx
// Sections:
// - Logo and description
// - Quick links
// - Services
// - Contact info
// - Social links
// - Copyright and legal
```

#### Breadcrumb

```tsx
// components/ui/breadcrumb.tsx
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}
```

---

### Content Components

#### SectionHeader

```tsx
// components/ui/section-header.tsx
interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}
```

#### ServiceCard

```tsx
// components/cards/service-card.tsx
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  image?: string;
}
```

#### PortfolioCard

```tsx
// components/cards/portfolio-card.tsx
interface PortfolioCardProps {
  title: string;
  category: string;
  image: string;
  href: string;
  location?: string;
}
```

#### TestimonialCard

```tsx
// components/cards/testimonial-card.tsx
interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  image?: string;
  rating?: number;
}
```

#### StatCard

```tsx
// components/cards/stat-card.tsx
interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}
```

---

### Media Components

#### OptimizedImage

```tsx
// components/ui/optimized-image.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}
// Wrapper around next/image with blur placeholder
```

#### ImageGallery

```tsx
// components/media/image-gallery.tsx
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: 2 | 3 | 4;
}
```

#### BeforeAfterSlider

```tsx
// components/media/before-after-slider.tsx
interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}
// Interactive slider to compare before/after images
```

#### VideoPlayer

```tsx
// components/media/video-player.tsx
interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}
```

---

### Form Components

#### ContactForm

```tsx
// components/forms/contact-form.tsx
// Multi-step form with:
// Step 1: Project type
// Step 2: Client type
// Step 3: Project details
// Step 4: Contact info
// Uses React Hook Form + Zod
```

#### QuoteForm

```tsx
// components/forms/quote-form.tsx
// Simplified quote request form
// Single page version
```

#### NewsletterForm

```tsx
// components/forms/newsletter-form.tsx
interface NewsletterFormProps {
  variant?: 'inline' | 'stacked';
}
```

#### FormStep

```tsx
// components/forms/form-step.tsx
interface FormStepProps {
  step: number;
  totalSteps: number;
  title: string;
  children: React.ReactNode;
}
```

#### FormProgress

```tsx
// components/forms/form-progress.tsx
interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}
```

---

### Interactive Components

#### WhatsAppButton

```tsx
// components/ui/whatsapp-button.tsx
interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  floating?: boolean;
}
// Floating button or inline button to open WhatsApp
```

#### PhoneButton

```tsx
// components/ui/phone-button.tsx
interface PhoneButtonProps {
  phoneNumber: string;
  variant?: 'button' | 'link' | 'icon';
}
```

#### BackToTop

```tsx
// components/ui/back-to-top.tsx
// Floating button that appears after scrolling
// Smooth scroll to top on click
```

#### CookieConsent

```tsx
// components/ui/cookie-consent.tsx
// GDPR-compliant cookie banner
// Accept/Reject options
// Saves preference to localStorage
```

---

### Section Components

#### HeroSection

```tsx
// components/sections/hero-section.tsx
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
}
```

#### ServicesSection

```tsx
// components/sections/services-section.tsx
interface ServicesSectionProps {
  title: string;
  description?: string;
  services: ServiceCardProps[];
}
```

#### PortfolioSection

```tsx
// components/sections/portfolio-section.tsx
interface PortfolioSectionProps {
  title: string;
  description?: string;
  projects: PortfolioCardProps[];
  showFilters?: boolean;
  limit?: number;
}
```

#### TestimonialsSection

```tsx
// components/sections/testimonials-section.tsx
interface TestimonialsSectionProps {
  title: string;
  testimonials: TestimonialCardProps[];
  variant?: 'carousel' | 'grid';
}
```

#### CtaSection

```tsx
// components/sections/cta-section.tsx
interface CtaSectionProps {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  variant?: 'light' | 'dark';
}
```

#### FaqSection

```tsx
// components/sections/faq-section.tsx
interface FaqSectionProps {
  title: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
// Uses shadcn Accordion component
```

#### CredentialsBadge

```tsx
// components/sections/credentials-badge.tsx
// Displays La Scala credential prominently
// Can be used in hero, about, or standalone
```

---

### Animation Components

#### FadeIn

```tsx
// components/animations/fade-in.tsx
interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}
// Uses Framer Motion
```

#### StaggerChildren

```tsx
// components/animations/stagger-children.tsx
interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
}
// Animates children in sequence
```

#### CountUp

```tsx
// components/animations/count-up.tsx
interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}
// Animated number counter
```

#### ParallaxImage

```tsx
// components/animations/parallax-image.tsx
interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
}
// Subtle parallax effect on scroll
```

---

## Component File Structure

```
src/components/
├── ui/                      # Base UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── container.tsx
│   ├── section.tsx
│   └── ...
├── layout/                  # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── mobile-nav.tsx
│   └── breadcrumb.tsx
├── cards/                   # Card variations
│   ├── service-card.tsx
│   ├── portfolio-card.tsx
│   ├── testimonial-card.tsx
│   └── stat-card.tsx
├── forms/                   # Form components
│   ├── contact-form.tsx
│   ├── quote-form.tsx
│   ├── newsletter-form.tsx
│   └── form-step.tsx
├── sections/                # Page sections
│   ├── hero-section.tsx
│   ├── services-section.tsx
│   ├── portfolio-section.tsx
│   ├── testimonials-section.tsx
│   ├── cta-section.tsx
│   └── faq-section.tsx
├── media/                   # Media components
│   ├── optimized-image.tsx
│   ├── image-gallery.tsx
│   ├── before-after-slider.tsx
│   └── video-player.tsx
└── animations/              # Animation wrappers
    ├── fade-in.tsx
    ├── stagger-children.tsx
    ├── count-up.tsx
    └── parallax-image.tsx
```

---

## Component Usage Guidelines

### Props Conventions

- Use `className` for additional styling
- Use `variant` for style variations
- Use `size` for size variations
- Use `as` for polymorphic components

### Composition Pattern

```tsx
// Prefer composition over configuration
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Accessibility Requirements

Every component must:
- Support keyboard navigation
- Include ARIA labels where needed
- Maintain focus management
- Support screen readers
- Meet contrast requirements
