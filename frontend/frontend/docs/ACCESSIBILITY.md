# Accessibility

## Arteparquet Accessibility Standards

### Overview

Arteparquet is committed to providing an accessible website for all users, including those with disabilities. This document outlines our WCAG 2.1 AA compliance requirements.

---

## Accessibility Principles (POUR)

### Perceivable

Users must be able to perceive all content:
- Text alternatives for images
- Captions for videos
- Sufficient color contrast
- Resizable text
- No content relies solely on color

### Operable

Users must be able to operate the interface:
- Keyboard accessible
- Sufficient time to interact
- No seizure-inducing content
- Clear navigation
- Multiple ways to find content

### Understandable

Users must be able to understand content:
- Readable text
- Predictable operation
- Input assistance
- Error prevention

### Robust

Content must work across technologies:
- Valid HTML
- Compatible with assistive technologies
- Future-proof markup

---

## Color Contrast

### Requirements

| Text Type | Minimum Ratio | Our Implementation |
|-----------|---------------|-------------------|
| Normal text | 4.5:1 | ✅ 15.2:1 (Legno Bruciato on Travertino) |
| Large text (18px+) | 3:1 | ✅ Exceeds |
| UI components | 3:1 | ✅ All interactive elements |
| Graphics | 3:1 | ✅ Icons and visual elements |

### Color Combinations

| Foreground | Background | Ratio | Status |
|------------|------------|-------|--------|
| #1A1A1A | #F9F8F6 | 15.2:1 | ✅ Pass |
| #FFFFFF | #0A0A0A | 19.5:1 | ✅ Pass |
| #C89B7B | #F9F8F6 | 3.1:1 | ⚠️ Large text only |
| #C89B7B | #0A0A0A | 5.8:1 | ✅ Pass |
| #FFFFFF | #C89B7B | 2.7:1 | ⚠️ Large text only |

### Implementation

```tsx
// Never rely on color alone
// ❌ Bad
<span className="text-red-500">Error</span>

// ✅ Good
<span className="text-red-500">
  <AlertCircle className="inline mr-1" aria-hidden="true" />
  Error: This field is required
</span>
```

---

## Keyboard Navigation

### Requirements

- All interactive elements focusable
- Logical tab order
- Visible focus indicators
- No keyboard traps
- Skip links available

### Focus Styles

```css
/* Base focus style */
:focus-visible {
  outline: 2px solid var(--rovere);
  outline-offset: 2px;
}

/* Remove default for custom styling */
:focus:not(:focus-visible) {
  outline: none;
}

/* Button focus */
.button:focus-visible {
  outline: 2px solid var(--rovere);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(200, 155, 123, 0.2);
}
```

### Skip Link

```tsx
// components/layout/skip-link.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        fixed top-4 left-4 z-[100]
        bg-legno-bruciato text-white
        px-4 py-2 rounded
        focus:outline-none focus:ring-2 focus:ring-rovere
      "
    >
      Vai al contenuto principale
    </a>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous focusable element |
| Enter/Space | Activate buttons, links |
| Escape | Close modals, menus |
| Arrow keys | Navigate within components |

---

## Screen Reader Support

### Semantic HTML

```html
<!-- Use proper landmarks -->
<header role="banner">...</header>
<nav role="navigation" aria-label="Menu principale">...</nav>
<main role="main" id="main-content">...</main>
<footer role="contentinfo">...</footer>

<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
```

### ARIA Labels

```tsx
// Navigation
<nav aria-label="Menu principale">

// Buttons with icons only
<button aria-label="Chiudi menu">
  <X aria-hidden="true" />
</button>

// Form fields
<input 
  id="email"
  aria-label="Indirizzo email"
  aria-describedby="email-hint"
  aria-invalid={hasError}
  aria-errormessage={hasError ? "email-error" : undefined}
/>
<span id="email-hint">Esempio: nome@email.com</span>
{hasError && <span id="email-error" role="alert">Email non valida</span>}

// Live regions
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

### Alt Text Guidelines

| Image Type | Alt Text |
|------------|----------|
| Decorative | `alt=""` (empty) |
| Informative | Describe content and purpose |
| Functional (links) | Describe destination/action |
| Complex (charts) | Provide detailed description |

```tsx
// Decorative image
<Image src="/pattern.svg" alt="" aria-hidden="true" />

// Informative image
<Image 
  src="/portfolio/villa-como.jpg" 
  alt="Parquet in rovere massello installato in villa sul Lago di Como"
/>

// Portfolio project
<Image
  src="/project.jpg"
  alt="Prima e dopo restauro parquet: soggiorno con parquet danneggiato trasformato in pavimento lucido"
/>
```

---

## Forms

### Accessible Form Pattern

```tsx
<form onSubmit={handleSubmit} noValidate>
  <div className="form-group">
    <label htmlFor="name">
      Nome <span aria-hidden="true">*</span>
      <span className="sr-only">(obbligatorio)</span>
    </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      aria-required="true"
      aria-invalid={errors.name ? "true" : "false"}
      aria-describedby={errors.name ? "name-error" : undefined}
    />
    {errors.name && (
      <span id="name-error" role="alert" className="error">
        {errors.name.message}
      </span>
    )}
  </div>
  
  <button type="submit">
    Invia richiesta
  </button>
</form>
```

### Error Handling

```tsx
// Announce errors to screen readers
{formErrors.length > 0 && (
  <div role="alert" aria-live="assertive">
    <h2>Ci sono {formErrors.length} errori nel modulo:</h2>
    <ul>
      {formErrors.map((error) => (
        <li key={error.field}>
          <a href={`#${error.field}`}>{error.message}</a>
        </li>
      ))}
    </ul>
  </div>
)}
```

---

## Images & Media

### Responsive Images

```tsx
<Image
  src="/portfolio/project.jpg"
  alt="Descrizione significativa"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isAboveFold}
/>
```

### Video Accessibility

```tsx
<video
  controls
  aria-label="Video presentazione Arteparquet"
>
  <source src="/video.mp4" type="video/mp4" />
  <track 
    kind="captions" 
    src="/captions-it.vtt" 
    srclang="it" 
    label="Italiano"
    default
  />
  <p>
    Il tuo browser non supporta il video. 
    <a href="/video.mp4">Scarica il video</a>
  </p>
</video>
```

---

## Motion & Animation

### Reduced Motion

```tsx
// Hook to detect preference
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={{ 
        y: shouldReduceMotion ? 0 : [0, -10, 0] 
      }}
      transition={{ 
        duration: shouldReduceMotion ? 0 : 0.5 
      }}
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
    scroll-behavior: auto !important;
  }
}
```

---

## Text & Typography

### Minimum Requirements

- Base font size: 16px minimum
- Line height: 1.5 minimum for body text
- Paragraph spacing: at least 1.5× font size
- Letter spacing: not condensed
- Text resizable up to 200% without loss

### Implementation

```css
html {
  font-size: 100%; /* 16px base */
}

body {
  line-height: 1.6;
  letter-spacing: 0.01em;
}

p {
  margin-bottom: 1.5em;
}

/* Text remains visible during font load */
@font-face {
  font-display: swap;
}
```

---

## Testing

### Automated Testing

| Tool | Purpose |
|------|---------|
| axe DevTools | Browser extension for WCAG testing |
| Lighthouse | Performance and accessibility audit |
| WAVE | Web accessibility evaluation |
| Pa11y | Command-line accessibility testing |

### Manual Testing Checklist

- [ ] Navigate entire site with keyboard only
- [ ] Test with screen reader (NVDA, VoiceOver)
- [ ] Zoom to 200% and verify usability
- [ ] Test with high contrast mode
- [ ] Verify color contrast ratios
- [ ] Check focus visibility
- [ ] Test form error handling
- [ ] Verify skip links work
- [ ] Check heading hierarchy
- [ ] Test with reduced motion enabled

### Screen Reader Testing

| Platform | Screen Reader |
|----------|---------------|
| Windows | NVDA (free), JAWS |
| macOS | VoiceOver (built-in) |
| iOS | VoiceOver (built-in) |
| Android | TalkBack (built-in) |

---

## Accessibility Statement

Include on the website:

```markdown
# Accessibilità

Arteparquet si impegna a garantire l'accessibilità del proprio sito web 
a tutti gli utenti, comprese le persone con disabilità.

## Standard di Conformità
Questo sito è progettato per essere conforme alle linee guida 
WCAG 2.1 livello AA.

## Funzionalità di Accessibilità
- Navigazione completa da tastiera
- Testo alternativo per tutte le immagini
- Contrasto colori adeguato
- Moduli accessibili con messaggi di errore chiari
- Supporto per screen reader
- Rispetto delle preferenze di movimento ridotto

## Contatti
Se riscontri problemi di accessibilità, contattaci:
- Email: info@arteparquet.pro
- Telefono: +39 389 240 7827

Ci impegniamo a risolvere qualsiasi problema di accessibilità 
entro 5 giorni lavorativi.
```

---

## Implementation Checklist

### Development

- [ ] Semantic HTML throughout
- [ ] All images have appropriate alt text
- [ ] Color contrast meets requirements
- [ ] Focus states visible
- [ ] Skip link implemented
- [ ] Forms have proper labels
- [ ] Error messages are accessible
- [ ] ARIA used appropriately
- [ ] Reduced motion respected
- [ ] Heading hierarchy correct

### Testing

- [ ] Automated tests passing
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Zoom tested (200%)
- [ ] High contrast tested
- [ ] Mobile accessibility tested

### Documentation

- [ ] Accessibility statement published
- [ ] Contact method for issues
- [ ] Known issues documented
