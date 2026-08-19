# UX Guidelines

## Arteparquet User Experience Standards

### Overview

The Arteparquet website must deliver an experience that feels as premium and considered as the craftsmanship we offer. Every interaction should build trust and move visitors toward becoming clients.

---

## UX Principles

### 1. Clarity Over Cleverness

- Every element has a clear purpose
- Navigation is intuitive and predictable
- Content hierarchy guides the eye naturally
- No ambiguity in calls-to-action

### 2. Confidence Through Design

- Premium aesthetics inspire trust
- Professional presentation validates expertise
- Consistent experience across all pages
- Zero errors or broken elements

### 3. Effortless Progression

- Clear path from discovery to contact
- Minimal friction in forms
- Progressive disclosure of information
- Logical content flow

### 4. Emotional Connection

- Storytelling over feature lists
- Aspirational imagery
- Human touch in copy
- Celebration of craftsmanship

### 5. Respect for Time

- Fast page loads
- Scannable content
- Clear information hierarchy
- No unnecessary steps

---

## User Flows

### Primary Flow: Quote Request

```
Landing → Browse Services → View Portfolio → Read About → Request Quote
     ↓           ↓              ↓              ↓            ↓
   Trust      Interest      Validation     Connection   Conversion
```

### Flow Details

1. **Landing (0-3 seconds)**
   - Immediate impression of premium quality
   - Clear value proposition
   - Visible credibility markers (La Scala)

2. **Browse Services (3-30 seconds)**
   - Find relevant service quickly
   - Understand offerings at a glance
   - See quality of work

3. **View Portfolio (30-90 seconds)**
   - Browse relevant projects
   - See transformation potential
   - Build aspiration

4. **Read About (60-120 seconds)**
   - Learn the La Scala story
   - Connect with the craftsman
   - Validate expertise

5. **Request Quote (2-5 minutes)**
   - Simple, guided form
   - Clear expectations
   - Immediate confirmation

---

## Page-by-Page UX

### Homepage

**Goal**: Create instant trust and desire to explore

| Section | UX Purpose |
|---------|------------|
| Hero | Immediate emotional impact, clear positioning |
| Credibility | Trust signals (La Scala, years, nationwide) |
| Services | Quick overview of capabilities |
| Portfolio | Visual proof of quality |
| Testimonials | Social validation |
| About Preview | Human connection |
| CTA | Clear next step |

**Key Interactions**:
- Scroll animations reveal content progressively
- Hover effects invite exploration
- Multiple entry points to contact

### Services Page

**Goal**: Help visitors find their specific need

| Element | UX Purpose |
|---------|------------|
| Overview | Establish breadth of expertise |
| Categories | Quick navigation to specific service |
| Service Detail | Deep dive with benefits, process, gallery |
| Related Services | Cross-selling opportunities |
| CTA | Service-specific quote request |

**Key Interactions**:
- Filter/category navigation
- Expandable service details
- Image galleries

### Portfolio Page

**Goal**: Showcase quality and inspire

| Element | UX Purpose |
|---------|------------|
| Gallery Grid | Visual browsing |
| Filters | Find relevant projects |
| Project Detail | Tell the story |
| Before/After | Show transformation |
| Next Project | Continue exploration |

**Key Interactions**:
- Masonry or grid layout
- Lightbox for full images
- Swipe on mobile
- Before/after slider

### About Page

**Goal**: Build personal connection and trust

| Element | UX Purpose |
|---------|------------|
| Story | Emotional connection |
| La Scala Feature | Ultimate credibility |
| Values | Brand alignment |
| Team/Founder | Human element |
| Process | Set expectations |
| CTA | Move to action |

### Contact Page

**Goal**: Maximize qualified submissions

| Element | UX Purpose |
|---------|------------|
| Form | Primary conversion point |
| Contact Info | Alternative channels |
| FAQ | Address objections |
| Trust Elements | Final reassurance |
| Confirmation | Clear next steps |

---

## Form UX

### Multi-Step Form Design

**Why Multi-Step?**
- Reduces cognitive load
- Creates micro-commitments
- Increases completion rates
- Allows conditional logic

**Step 1: Project Type**
```
"Che tipo di progetto hai in mente?"

○ Nuova installazione
○ Restauro / Levigatura
○ Riparazione
○ Solo consulenza
```

**Step 2: Client Type**
```
"Parlaci di te"

○ Privato / Proprietario
○ Architetto / Designer
○ Impresa edile
○ Hotel / Ristorante / Commerciale
```

**Step 3: Project Details** (Conditional)
```
"Qualche dettaglio in più"

Metratura approssimativa: [____] mq
Tipo di ambiente: [Dropdown]
Note aggiuntive: [Textarea]
```

**Step 4: Contact Info**
```
"Come possiamo contattarti?"

Nome: [____]
Telefono: [____]
Email: [____]
Preferenza: ○ Chiamata ○ WhatsApp ○ Email
```

### Form Feedback

| State | Feedback |
|-------|----------|
| Valid Input | Green checkmark |
| Invalid Input | Red border + error message |
| Required Field | Asterisk (*) |
| Progress | Step indicator (1/4, 2/4...) |
| Submission | Loading state → Success message |

---

## Navigation UX

### Desktop Navigation

- Fixed header (becomes solid on scroll)
- Clear, concise menu items
- Hover states indicate interactivity
- CTA button always visible

### Mobile Navigation

- Hamburger menu (right side)
- Full-screen overlay
- Large touch targets (min 44px)
- Clear close mechanism
- Current page indicator

### Breadcrumbs

Show on all pages except homepage:
```
Home > Servizi > Posa Parquet
```

### Footer Navigation

- Quick links to main pages
- Service categories
- Contact information
- Social links
- Legal links (Privacy, Cookie)

---

## Interaction Patterns

### Scroll Behavior

| Element | Behavior |
|---------|----------|
| Page | Smooth scrolling |
| Header | Hide on scroll down, show on scroll up |
| Back to Top | Appears after 1 viewport scroll |
| Animations | Trigger on scroll into view |

### Hover States

| Element | Hover Effect |
|---------|--------------|
| Links | Color change to Rovere |
| Buttons | Background darken/lighten |
| Cards | Subtle lift + shadow |
| Images | Zoom or overlay |
| Nav Items | Underline animation |

### Click Feedback

- Immediate visual response
- Button press state
- Loading indicators for async actions
- Success/error feedback

### Focus States

- Visible focus rings (accessibility)
- Color: Rovere
- Style: 2px solid + outline offset
- All interactive elements focusable

---

## Content UX

### Scannability

- Clear headlines
- Short paragraphs (3-4 lines max)
- Bullet points for lists
- Bold key information
- Visual breaks between sections

### Information Hierarchy

```
Primary: What do we do?
Secondary: Why choose us?
Tertiary: How do we work?
Support: FAQs, details, legal
```

### Microcopy

| Element | Good Example |
|---------|--------------|
| Button | "Richiedi Preventivo Gratuito" |
| Form Label | "Il tuo nome" |
| Placeholder | "es. Mario Rossi" |
| Helper | "Ti ricontatteremo entro 24 ore" |
| Error | "Per favore, inserisci un'email valida" |
| Success | "Grazie! La tua richiesta è stata inviata." |

---

## Error Handling

### Form Errors

- Inline validation (on blur)
- Clear error messages in Italian
- Highlight problematic fields
- Don't clear form on error
- Scroll to first error

### Page Errors (404, 500)

- Friendly, on-brand design
- Clear explanation
- Helpful next steps
- Link to homepage
- Search option if available

### Empty States

- Friendly illustration/icon
- Helpful message
- Suggested action
- Never just blank space

---

## Loading UX

### Page Load

- Skeleton screens for content
- Progressive image loading (blur → sharp)
- Above-fold content prioritized
- No jarring layout shifts (CLS)

### Action Loading

- Button loading state (spinner)
- Optimistic updates where safe
- Progress indication for long operations
- Clear completion feedback

---

## Mobile UX

### Touch Targets

- Minimum size: 44x44px
- Adequate spacing between targets
- Thumb-friendly placement for key actions
- Full-width buttons on mobile

### Mobile-Specific Patterns

| Pattern | Implementation |
|---------|----------------|
| Phone | Tap-to-call link |
| WhatsApp | Tap to open app |
| Address | Tap to open maps |
| Email | Tap to compose |
| Gallery | Swipe navigation |
| Forms | Native keyboard types |

### Gestures

- Swipe for galleries/carousels
- Pull-to-refresh (if applicable)
- Pinch-to-zoom on images
- Swipe to dismiss modals

---

## Accessibility UX

### Keyboard Navigation

- All functions accessible via keyboard
- Logical tab order
- Skip links for main content
- Focus trapping in modals

### Screen Reader Support

- Proper heading hierarchy
- Alt text for all images
- ARIA labels where needed
- Announce dynamic changes

### Visual Accessibility

- Sufficient color contrast
- Don't rely on color alone
- Resizable text support
- Reduced motion option

---

## Performance UX

### Perceived Performance

- Instant feedback on interaction
- Skeleton loaders
- Progressive image loading
- Optimistic UI updates

### Actual Performance

- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Cumulative Layout Shift < 0.1
- Core Web Vitals: all green

---

## Trust UX

### Elements That Build Trust

| Element | Placement |
|---------|-----------|
| La Scala credential | Header, hero, about |
| Years of experience | Hero, footer |
| Phone number | Header, footer, contact |
| Real project photos | Portfolio, services |
| Client testimonials | Home, dedicated page |
| VAT number | Footer |
| Privacy policy | Footer |

### Trust Signals Flow

```
Landing: Immediate credibility (La Scala badge)
    ↓
Browsing: Reinforcement (portfolio quality)
    ↓
Considering: Validation (testimonials)
    ↓
Deciding: Assurance (free inspection, no obligation)
    ↓
Converting: Confirmation (clear next steps)
```
