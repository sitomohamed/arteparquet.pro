# Analytics & Tracking Strategy

## Overview
Proper analytics setup is essential to measure CRO effectiveness and optimize the conversion funnel.

---

## Google Analytics 4 Configuration

### Events to Track

#### Engagement Events
```javascript
// Page scroll depth
gtag('event', 'scroll', {
  percent_scrolled: 50 // or 75, 90, 100
});

// Time on page
gtag('event', 'engagement', {
  engagement_time_msec: 30000 // 30 seconds
});

// Video engagement (if hero video exists)
gtag('event', 'video_progress', {
  video_title: 'Hero Video',
  percent: 50
});
```

#### CTA Interactions
```javascript
// Primary CTA clicks
gtag('event', 'cta_click', {
  cta_location: 'hero', // header, footer, sticky, etc.
  cta_text: 'Richiedi Preventivo'
});

// WhatsApp button
gtag('event', 'whatsapp_click', {
  page: window.location.pathname
});

// Phone click
gtag('event', 'phone_click', {
  page: window.location.pathname
});
```

#### Form Funnel Events
```javascript
// Form started
gtag('event', 'form_start', {
  form_name: 'contact_form'
});

// Form step completed
gtag('event', 'form_step', {
  form_name: 'contact_form',
  step_number: 2,
  step_name: 'client_type'
});

// Form abandoned
gtag('event', 'form_abandon', {
  form_name: 'contact_form',
  last_step: 2
});

// Form submitted (CONVERSION)
gtag('event', 'generate_lead', {
  currency: 'EUR',
  value: 100, // estimated lead value
  form_name: 'contact_form'
});
```

#### Portfolio Engagement
```javascript
// Project viewed
gtag('event', 'view_item', {
  item_id: 'project_villa_como',
  item_name: 'Villa sul Lago di Como',
  item_category: 'portfolio'
});

// Gallery interaction
gtag('event', 'gallery_interaction', {
  project_id: 'villa_como',
  images_viewed: 5
});
```

---

## Conversion Goals Setup

### Primary Conversions
| Goal | Event | Value |
|------|-------|-------|
| Contact Form Submitted | `generate_lead` | €100 |
| WhatsApp Click | `whatsapp_click` | €30 |
| Phone Click | `phone_click` | €30 |

### Micro Conversions
| Goal | Event | Value |
|------|-------|-------|
| Portfolio Project Viewed | `view_item` | €5 |
| Form Started | `form_start` | €10 |
| 90% Page Scroll | `scroll` | €2 |

---

## Heatmaps & Session Recording

### Recommended Tool: Microsoft Clarity (Free)
- Heatmaps
- Session recordings
- Scroll maps
- Click maps
- Rage click detection

### Implementation
```html
<!-- Add to <head> after cookie consent -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    // ... Clarity script
  })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```

---

## UTM Tracking Strategy

### Campaign Parameters
```
?utm_source=google&utm_medium=cpc&utm_campaign=parquet_milano
?utm_source=instagram&utm_medium=social&utm_campaign=portfolio_showcase
?utm_source=referral&utm_medium=architect&utm_campaign=partner_marco_rossi
```

### Store UTM in Session
```typescript
// lib/analytics.ts
export function captureUTM() {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
  };
  if (utm.source) {
    sessionStorage.setItem('utm_data', JSON.stringify(utm));
  }
}

// Include UTM data in form submission
export function getUTMData() {
  return JSON.parse(sessionStorage.getItem('utm_data') || '{}');
}
```

---

## Dashboard KPIs

| KPI | Target | Measurement |
|-----|--------|-------------|
| Form Conversion Rate | 5%+ | Submissions / Visitors |
| Bounce Rate | <40% | GA4 |
| Avg. Time on Site | >2 min | GA4 |
| Pages per Session | >3 | GA4 |
| Mobile Conversion | 4%+ | GA4 by device |
| WhatsApp Click Rate | 3%+ | Events / Visitors |
