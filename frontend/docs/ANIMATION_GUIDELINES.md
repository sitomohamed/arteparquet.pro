# Animation Guidelines

## Arteparquet Motion Design Standards

### Overview

Animations on Arteparquet should feel organic, refined, and purposeful—like the natural movement of light across a wooden floor. Motion enhances the premium experience without distracting from content.

---

## Animation Principles

### 1. Subtle is Premium

- Animations should be barely noticed consciously
- They should feel natural and expected
- Avoid flashy or attention-grabbing effects
- The content is the star, not the animation

### 2. Purpose-Driven

Every animation must serve a purpose:
- Guide attention
- Provide feedback
- Create continuity
- Enhance understanding
- Delight (sparingly)

### 3. Performance First

- 60fps minimum on all devices
- Use GPU-accelerated properties only
- Respect `prefers-reduced-motion`
- Mobile animations should be simpler

### 4. Consistency

- Same easing across similar elements
- Consistent duration ranges
- Predictable behavior

---

## Timing & Easing

### Duration Scale

| Type | Duration | Use Case |
|------|----------|----------|
| Micro | 100-150ms | Button states, hovers |
| Short | 200-300ms | Small transitions, reveals |
| Medium | 400-500ms | Section transitions, modals |
| Long | 600-800ms | Page transitions, hero animations |
| Extended | 1000ms+ | Showcase animations (rare) |

### Easing Functions

```css
/* Primary easing - smooth, natural */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* For enters/appears */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* For exits/disappears */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);

/* For continuous motion */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* For bouncy/playful (use sparingly) */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Framer Motion Config

```typescript
// Animation variants
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

---

## Animation Patterns

### Page Load Sequence

```
1. Header fades in (0ms)
2. Hero content slides up (200ms delay)
3. Hero image fades in (400ms delay)
4. Below-fold content reveals on scroll
```

### Scroll Reveals

```typescript
// Reveal on scroll (Framer Motion)
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  {content}
</motion.div>
```

### Hover Effects

**Cards:**
```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
```

**Buttons:**
```css
.button {
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.button:hover {
  background-color: var(--color-hover);
}

.button:active {
  transform: scale(0.98);
}
```

**Images:**
```css
.image-container {
  overflow: hidden;
}

.image {
  transition: transform 0.5s ease;
}

.image-container:hover .image {
  transform: scale(1.05);
}
```

### Menu Transitions

**Desktop Dropdown:**
```css
.dropdown {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

**Mobile Menu:**
```typescript
// Slide in from right
<motion.nav
  initial={{ x: '100%' }}
  animate={{ x: 0 }}
  exit={{ x: '100%' }}
  transition={{ type: 'tween', duration: 0.3 }}
>
```

### Modal/Dialog

```typescript
// Overlay
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
/>

// Modal content
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 20 }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
/>
```

---

## Specific Animations

### Header Scroll Behavior

```typescript
const { scrollY } = useScroll();
const headerBg = useTransform(
  scrollY,
  [0, 100],
  ['rgba(249,248,246,0)', 'rgba(249,248,246,1)']
);
const headerShadow = useTransform(
  scrollY,
  [0, 100],
  ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.05)']
);
```

### Hero Text Reveal

```typescript
const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
```

### Before/After Slider

```css
.slider-handle {
  transition: transform 0.1s ease;
}

.slider-handle:active {
  transform: scale(1.1);
}

.comparison-image {
  transition: clip-path 0.05s linear;
}
```

### Counter Animation

```typescript
import { useInView, useMotionValue, useSpring } from 'framer-motion';

function CountUp({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100
  });
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value]);
  
  return <span ref={ref}>{Math.round(springValue.get())}</span>;
}
```

### Gallery Lightbox

```typescript
// Image open
<motion.img
  layoutId={`image-${id}`}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
/>

// Smooth shared element transition
```

---

## Loading States

### Skeleton Loaders

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-200) 0%,
    var(--neutral-100) 50%,
    var(--neutral-200) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Spinner

```css
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--neutral-200);
  border-top-color: var(--rovere);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Progress Bar

```css
.progress-bar {
  transition: width 0.3s ease;
}
```

---

## Reduced Motion

Always respect user preferences:

```typescript
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
    />
  );
}
```

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Guidelines

### GPU-Accelerated Properties

Only animate these for smooth 60fps:
- `transform` (translate, scale, rotate)
- `opacity`

Avoid animating:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `background-color` (use opacity instead)

### Will-Change

```css
/* Use sparingly for heavy animations */
.animated-element {
  will-change: transform, opacity;
}

/* Remove after animation completes */
```

### Lazy Animation Loading

```typescript
// Only load heavy animations when needed
const HeavyAnimation = dynamic(
  () => import('@/components/animations/heavy'),
  { ssr: false }
);
```

---

## Animation Library

### Reusable Animation Components

```
components/animations/
├── fade-in.tsx        # Fade in with direction
├── stagger-children.tsx # Stagger child animations
├── count-up.tsx       # Number counter
├── parallax-image.tsx # Parallax effect
├── reveal-text.tsx    # Text reveal
└── smooth-scroll.tsx  # Smooth scroll wrapper
```

### Usage Example

```tsx
import { FadeIn, StaggerChildren } from '@/components/animations';

<StaggerChildren>
  <FadeIn direction="up">
    <h2>Title</h2>
  </FadeIn>
  <FadeIn direction="up" delay={0.1}>
    <p>Description</p>
  </FadeIn>
  <FadeIn direction="up" delay={0.2}>
    <Button>CTA</Button>
  </FadeIn>
</StaggerChildren>
```

---

## Animation Don'ts

| ❌ Don't | ✅ Do |
|----------|-------|
| Animate width/height | Use transform: scale |
| Use bounce on everything | Reserve for emphasis |
| Create long animations | Keep under 800ms |
| Animate on page load excessively | Animate above-fold only |
| Ignore reduced motion | Always provide fallback |
| Use animation for decoration | Use for function |
| Create jarring transitions | Smooth, natural motion |
