# WhatsApp Business Integration

## Overview
In Italy, WhatsApp has 85%+ penetration. It is the **preferred** communication channel for most Italians. Integrating WhatsApp properly can increase conversions by 40%+.

---

## WhatsApp Click-to-Chat Strategy

### Floating Button (Always Visible)
```tsx
// components/ui/whatsapp-button.tsx
interface WhatsAppButtonProps {
  phoneNumber: string; // Without + (e.g., "393892407827")
  message?: string;
  floating?: boolean;
  showOnMobile?: boolean;
}

// Default pre-filled message
const defaultMessage = encodeURIComponent(
  "Ciao! Vorrei informazioni sui vostri servizi di parquet."
);

// WhatsApp URL
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
```

### Floating Button Design
- **Position:** Bottom-right corner
- **Size:** 60x60px (touch-friendly)
- **Color:** WhatsApp green (#25D366)
- **Icon:** WhatsApp logo (white)
- **Animation:** Subtle pulse every 5 seconds
- **Mobile:** Slightly smaller (52x52px)
- **Z-index:** 50 (below modals, above content)

### Contextual Messages
Pre-fill different messages based on page context:

| Page | Pre-filled Message |
|------|-------------------|
| Homepage | "Ciao! Vorrei informazioni sui vostri servizi." |
| Posa Parquet | "Ciao! Mi interessa la posa di un nuovo parquet." |
| Restauro | "Ciao! Ho bisogno di restaurare il mio parquet." |
| Portfolio | "Ciao! Ho visto i vostri lavori e vorrei un preventivo." |
| Contatti | "Ciao! Vorrei fissare un sopralluogo gratuito." |
| Pricing Page | "Ciao! Vorrei capire meglio i costi per il mio progetto." |

---

## WhatsApp CTA Placement

### Strategic Positions
1. **Floating button** - Always visible (bottom-right)
2. **Header** - Icon next to phone number (desktop)
3. **Mobile header** - Prominent icon
4. **After form steps** - "Preferisci WhatsApp? Scrivici direttamente"
5. **Contact page** - Large button alongside form
6. **Footer** - Contact section

### CTA Copy Variations
```
- "Scrivici su WhatsApp"
- "Chatta con noi"
- "Risposta immediata su WhatsApp"
- "Preferisci WhatsApp?"
- "💬 WhatsApp"
```

---

## Implementation Code

### Floating Button Component
```tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppFloating() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP;
  const message = encodeURIComponent(
    "Ciao! Vorrei informazioni sui vostri servizi di parquet."
  );
  
  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#128C7E] transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
    </motion.a>
  );
}
```

### Track WhatsApp Clicks
```tsx
const handleWhatsAppClick = () => {
  // Google Analytics
  gtag('event', 'whatsapp_click', {
    page: window.location.pathname,
    source: 'floating_button'
  });
};
```

---

## Response Time Expectations
Display near WhatsApp buttons:
```
"Rispondiamo entro 5 minuti durante l'orario lavorativo"
"Lun-Ven 8:00-18:00 | Sab 9:00-13:00"
```

---

## WhatsApp Business Profile
Ensure the WhatsApp Business profile is complete:
- **Business name:** Arteparquet
- **Category:** Home Services
- **Description:** Specialisti in parquet dal 2004. Posa, restauro, SPC, PVC, laminati.
- **Address:** Bergamo, Italia
- **Hours:** Lun-Ven 8:00-18:00
- **Website:** https://arteparquet.pro
- **Catalog:** Optional - can show material samples
