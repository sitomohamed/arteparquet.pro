# GDPR & Cookie Compliance (Italy/EU)

## Overview
For any website operating in Italy, GDPR compliance is **MANDATORY**. Non-compliance can result in fines up to €20 million or 4% of global revenue.

---

## Cookie Banner Requirements

### Legal Requirements
1. **No pre-ticked boxes** - User must actively consent
2. **Equal prominence** for Accept/Reject buttons (same size, same color weight)
3. **Granular choices** - User must be able to select which categories to enable
4. **Easy withdrawal** - User must be able to change preferences anytime
5. **Prior consent** - NO cookies (except essential) before user consents

### Cookie Categories
| Category | Description | Consent Required |
|----------|-------------|------------------|
| Essential | Session, security, load balancing | No |
| Analytics | Google Analytics, Hotjar | Yes |
| Marketing | Facebook Pixel, Google Ads | Yes |
| Preferences | Language, theme | Yes |

### Implementation
```tsx
// components/ui/cookie-consent.tsx
interface CookieConsentProps {
  privacyPolicyUrl: string;
  cookiePolicyUrl: string;
}

// Features:
// - Blocks all non-essential scripts until consent
// - Stores consent in localStorage with timestamp
// - Provides "Gestisci preferenze" button in footer
// - Re-asks consent after 12 months
```

### Cookie Banner Copy (Italian)
```
Titolo: "Rispettiamo la tua privacy"

Testo: "Utilizziamo cookie per migliorare la tua esperienza sul nostro sito. 
Puoi scegliere quali cookie accettare. Per maggiori informazioni, 
consulta la nostra Privacy Policy e Cookie Policy."

Pulsanti:
- [Accetta tutti] (primary style)
- [Rifiuta tutti] (secondary style - SAME SIZE)
- [Personalizza] (link style)
```

---

## Privacy Policy Page
**URL:** `/privacy-policy`

Must include:
- Data controller information (Arteparquet, VAT, address)
- Types of data collected
- Purpose of data processing
- Legal basis for processing
- Data retention periods
- User rights (access, rectification, erasure, portability)
- Contact information for DPO (if applicable)
- Right to lodge complaint with Garante Privacy

---

## Contact Form Compliance
```tsx
// Required checkbox before submit
<Checkbox id="privacy" required />
<Label htmlFor="privacy">
  Ho letto e accetto la{" "}
  <Link href="/privacy-policy">Privacy Policy</Link>
  {" "}e acconsento al trattamento dei miei dati personali.
</Label>
```

---

## Data Retention Policy
| Data Type | Retention Period | Justification |
|-----------|------------------|---------------|
| Contact form submissions | 24 months | Contract negotiation |
| Analytics data | 14 months | GA4 default |
| Newsletter subscribers | Until unsubscribe | Consent-based |
| Customer project data | 10 years | Legal/tax requirements |
