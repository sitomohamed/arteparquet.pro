# CRO Guide

## Arteparquet Conversion Rate Optimization

### Overview

This guide outlines strategies to maximize conversions (quote requests) on the Arteparquet website. Every design decision should serve the goal of turning visitors into qualified leads.

---

## Conversion Goals

### Primary Conversion

**Quote Request Form Submission**
- Target conversion rate: 5%+
- Value: High (€5,000-50,000+ project value)

### Secondary Conversions

| Action | Value | Target Rate |
|--------|-------|-------------|
| WhatsApp click | High | 3% |
| Phone call | High | 2% |
| Newsletter signup | Low | 1% |
| Portfolio download | Medium | 2% |

---

## Conversion Funnel

```
┌─────────────────────────────────────────────────────┐
│                    AWARENESS                        │
│            100% of visitors enter here              │
│                                                     │
│     SEO • Ads • Referrals • Social Media            │
│                        ↓                            │
├─────────────────────────────────────────────────────┤
│                    INTEREST                         │
│                  ~70% continue                      │
│                                                     │
│        Browse Services • View Portfolio             │
│                        ↓                            │
├─────────────────────────────────────────────────────┤
│                  CONSIDERATION                      │
│                  ~40% continue                      │
│                                                     │
│     Read About • Check Credentials • Reviews        │
│                        ↓                            │
├─────────────────────────────────────────────────────┤
│                     INTENT                          │
│                  ~15% continue                      │
│                                                     │
│     Visit Contact Page • Start Form • Hover CTA     │
│                        ↓                            │
├─────────────────────────────────────────────────────┤
│                   CONVERSION                        │
│                    5%+ convert                      │
│                                                     │
│              Submit Form • Call • WhatsApp          │
└─────────────────────────────────────────────────────┘
```

---

## Psychological Triggers

### 1. Authority

**La Scala Credential** — The most powerful trust signal

```tsx
<Badge>
  🏛️ Teatro alla Scala, Milano — 2004
  Posa • Restauro • Manutenzione
</Badge>
```

Display prominently:
- Hero section (homepage)
- Header (always visible)
- About page
- Contact page (before form)

### 2. Social Proof

**Testimonials**
```tsx
<TestimonialCard>
  "Lavoro impeccabile, superato ogni aspettativa"
  — Marco B., Architetto, Milano
  ★★★★★
</TestimonialCard>
```

**Numbers**
```tsx
<StatCard value="20+" label="Anni di Esperienza" />
<StatCard value="500+" label="Progetti Completati" />
<StatCard value="98%" label="Clienti Soddisfatti" />
```

### 3. Scarcity & Urgency

**Soft Urgency (Don't be aggressive)**
```
"Sopralluoghi disponibili questa settimana"
"Calendario in via di completamento per [mese]"
```

### 4. Reciprocity

**Free Value**
- Free consultation
- Free on-site inspection
- Free detailed quote
- Helpful blog content

### 5. Risk Reversal

**Remove Objections**
```
✓ Sopralluogo gratuito senza impegno
✓ Preventivo dettagliato e trasparente
✓ Garanzia sulla posa
✓ Nessun costo nascosto
```

---

## CTA Optimization

### Primary CTA

**Text Options (Test):**
- "Richiedi Preventivo Gratuito" (explicit value)
- "Richiedi una Consulenza" (softer)
- "Parla con un Esperto" (personal)
- "Inizia il Tuo Progetto" (action-oriented)

**Design:**
- Background: Rovere (#C89B7B)
- Text: White
- Size: Large enough to tap on mobile
- Icon: Arrow right (suggests progress)

### Secondary CTAs

- "Scopri i Nostri Lavori"
- "Chiama Ora"
- "Scrivici su WhatsApp"

### CTA Placement

| Location | CTA Type |
|----------|----------|
| Header (sticky) | Primary button |
| Hero section | Primary + secondary |
| End of each section | Contextual |
| Service pages | Service-specific |
| Footer | Multiple options |
| Floating | WhatsApp button |

---

## Form Optimization

### Multi-Step Form

**Why Multi-Step?**
- 86% higher completion rate vs. single-page forms
- Creates micro-commitments
- Reduces perceived effort
- Enables conditional logic

**Step Design:**

```
Step 1/4 ───────────────────────────●───────
           
CHE TIPO DI PROGETTO HAI IN MENTE?

○ Nuova installazione
○ Restauro / Levigatura  
○ Riparazione
○ Solo consulenza

                              [Continua →]
```

### Form Fields Analysis

| Field | Essential? | Notes |
|-------|------------|-------|
| Name | Yes | First name is enough |
| Email | Yes | For follow-up |
| Phone | Yes | Primary contact method |
| Project Type | Yes | Qualifies lead |
| Client Type | Yes | Personalizes response |
| Area (sqm) | Optional | Helps with estimate |
| Message | Optional | Additional context |
| City | Yes | Service planning |
| Contact Preference | Yes | Respect preferences |

### Form UX Rules

1. **Label above field** (not placeholder only)
2. **One question per step** on mobile
3. **Progress indicator** visible
4. **Back button** available
5. **Inline validation** (not just on submit)
6. **Smart defaults** where possible
7. **Autofocus** on first field

### Thank You Page

After submission:

```tsx
<ThankYouPage>
  <CheckIcon />
  <h1>Grazie, [Nome]!</h1>
  <p>
    Abbiamo ricevuto la tua richiesta.
    Ti contatteremo entro 24 ore.
  </p>
  
  <p>Nel frattempo:</p>
  <Button href="/portfolio">Esplora i nostri lavori</Button>
  <WhatsAppButton>Scrivici subito</WhatsAppButton>
</ThankYouPage>
```

---

## Page-by-Page CRO

### Homepage

| Section | CRO Element |
|---------|-------------|
| Hero | Primary CTA, La Scala badge |
| Credibility | Trust numbers |
| Services | CTAs on each card |
| Portfolio | "View all" + subtle contact |
| Testimonials | Social proof |
| CTA Section | Strong close |
| Footer | Multiple contact options |

### Service Pages

| Element | Purpose |
|---------|---------|
| Benefit-focused headline | Hook |
| Process explanation | Reduce uncertainty |
| Gallery | Visual proof |
| Pricing indication | Qualify |
| FAQ | Overcome objections |
| Contextual CTA | Convert |

### Portfolio Pages

| Element | Purpose |
|---------|---------|
| Before/after | Dramatic proof |
| Project details | Establish expertise |
| Similar projects | More proof |
| "Want this?" CTA | Direct ask |

### Contact Page

| Element | Purpose |
|---------|---------|
| Trust reinforcement | Last-minute assurance |
| Clear form | Easy completion |
| Alternative contact | Multiple options |
| FAQ | Overcome hesitation |
| No obligation messaging | Remove risk |

---

## Trust Signals Placement

### Above the Fold

- La Scala credential
- Phone number visible
- Professional design (trust by proxy)

### Throughout Site

- Real project photos
- Client testimonials
- Industry credentials
- Years of experience
- "Free inspection" messaging

### Before Conversion

- Privacy policy link
- "No obligation" text
- Professional response expectation
- VAT number visible

---

## Mobile CRO

### Thumb-Friendly Design

- CTAs in thumb zone
- Large tap targets (min 44x44px)
- Sticky header with call button
- Floating WhatsApp button

### Mobile-Specific Elements

```tsx
// Click-to-call
<a href="tel:+393892407827" className="mobile-cta">
  📞 Chiama Ora
</a>

// WhatsApp direct
<a href="https://wa.me/393892407827" className="whatsapp-cta">
  💬 WhatsApp
</a>
```

---

## A/B Testing Plan

### Tests to Run

| Element | Variation A | Variation B |
|---------|-------------|-------------|
| CTA text | "Richiedi Preventivo" | "Parla con un Esperto" |
| CTA color | Rovere | Darker shade |
| Form steps | 4 steps | 3 steps |
| Hero headline | Feature-focused | Benefit-focused |
| Testimonial format | Cards | Carousel |

### Testing Tools

- Google Optimize (free)
- Vercel Edge Config
- Custom implementation with cookies

---

## Exit Intent

### Exit Popup (Desktop Only)

**Trigger:** Mouse moves toward browser close

**Content:**
```
Aspetta! 👋

Prima di andare, scarica la nostra 
guida gratuita:

"Come Scegliere il Parquet Perfetto"

[Email input]
[Scarica Gratis]

oppure

[Richiedi un Preventivo]
```

---

## Analytics & Tracking

### Events to Track

```javascript
// Form interactions
gtag('event', 'form_start', { form_name: 'contact' });
gtag('event', 'form_step', { step: 2, form_name: 'contact' });
gtag('event', 'form_submit', { form_name: 'contact' });
gtag('event', 'form_abandon', { step: 2, form_name: 'contact' });

// CTA clicks
gtag('event', 'cta_click', { location: 'hero', text: 'Richiedi Preventivo' });
gtag('event', 'cta_click', { location: 'whatsapp_float' });
gtag('event', 'cta_click', { location: 'phone_header' });

// Scroll depth
gtag('event', 'scroll', { percent: 50 });
gtag('event', 'scroll', { percent: 100 });
```

### Conversion Tracking

```javascript
// Primary conversion
gtag('event', 'conversion', {
  send_to: 'AW-XXXXXXX/XXXXXX',
  value: 1.0,
  currency: 'EUR'
});
```

---

## CRO Checklist

### Pre-Launch

- [ ] Primary CTA visible above fold
- [ ] Phone number in header
- [ ] WhatsApp button floating
- [ ] La Scala credential prominent
- [ ] Form is multi-step
- [ ] Form has progress indicator
- [ ] Thank you page optimized
- [ ] Trust signals visible
- [ ] Testimonials displayed
- [ ] Mobile CTAs work
- [ ] Analytics events set up

### Monthly Review

- [ ] Conversion rate by page
- [ ] Form abandonment analysis
- [ ] Heatmap review
- [ ] Session recordings review
- [ ] A/B test results
- [ ] Funnel optimization
