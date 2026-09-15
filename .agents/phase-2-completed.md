# FASE 2 — Data Model CRM B2B

**Completata:** 14 settembre 2026, 20:31

---

## 📐 ARCHITETTURA

### File modificati/creati

1. **`src/lib/leads.ts`** — Core CRM esteso
   - ✅ Nuovo type `Lead` con campi B2B opzionali
   - ✅ 10 stati totali (5 B2C + 5 B2B)
   - ✅ `leadType: 'b2c' | 'b2b'`
   - ✅ Funzioni anti-duplicati (`findByDomain`, `findByEmail`, `isDuplicateLead`)
   - ✅ Backward compatible (lead B2C esistenti continuano a funzionare)

2. **`src/lib/lead-utils.ts`** — Utilities B2B (nuovo)
   - Domain extraction (`extractDomain`)
   - Email/domain validation
   - Duplicate detection completo
   - Formatting helpers (slug, city, truncate)
   - Business logic (cimitero, follow-up timing)

3. **`src/app/api/crm/leads/route.ts`** — API estesa
   - ✅ GET supporta filtri: `?leadType=b2b&status=approved`
   - ✅ PATCH gestisce tutti i 10 stati

4. **`src/app/crm/page.tsx`** — UI CRM aggiornata
   - ✅ Tab B2C / B2B
   - ✅ Badge B2B sui lead
   - ✅ Mostra campi B2B: `website`, `why_them`, `email_draft`, `can_reach_site`
   - ✅ Labels per tutti i 10 stati

---

## 🔄 STATI LEAD

### B2C (5 stati esistenti)
- `new` — Nuovo
- `contacted` — Contattato
- `quote` — Preventivo
- `won` — Vinto ✅
- `lost` — Perso ❌

### B2B (5 stati nuovi)
- `approved` — Pronto per invio email (Mohamed approva)
- `follow_up_sent` — Sollecito inviato (max 1 dopo 10gg)
- `closed_silence` — Regola del silenzio (non risponde)
- `rejected_already_covered` — ❌ **Cimitero dei NO:** già coperti
- `rejected_out_of_target` — ❌ **Cimitero dei NO:** fuori target

---

## 📊 CAMPI LEAD B2B

```typescript
type Lead = {
  // ── Comuni ──
  id: string
  createdAt: string
  status: LeadStatus
  leadType: 'b2c' | 'b2b'
  source: string
  name: string
  phone: string
  email?: string
  city?: string
  jobType?: string
  message?: string

  // ── B2C ──
  photoCount: number
  landingVariant?: string
  ctaVariant?: string
  utm?: Record<string, string>

  // ── Email ──
  emailSent?: boolean
  emailError?: string

  // ── B2B (opzionali) ──
  website?: string
  why_them?: string                    // Perché li abbiamo scelti
  why_arteparquet?: string             // Perché dovrebbero sceglierci
  can_reach_site?: 'YES' | 'NO' | 'UNCERTAIN'
  email_draft?: string                 // Bozza email generata
  discovered_at?: string               // ISO date discovery
  last_interaction_at?: string         // ISO date ultimo contatto
}
```

---

## 🛡️ ANTI-DUPLICATI

### Funzioni disponibili

```typescript
// Estrae dominio da email o URL
extractDomain('info@studioarch.it') // → 'studioarch.it'
extractDomain('https://www.studioarch.it') // → 'studioarch.it'

// Cerca lead esistente per dominio
await findLeadByDomain('studioarch.it') // → Lead | null

// Cerca lead per email esatta
await findLeadByEmail('info@studioarch.it') // → Lead | null

// Verifica se esiste già
await isDuplicateLead('studioarch.it') // → boolean

// Check completo con dettagli
await checkB2BDuplicate({
  website: 'studioarch.it',
  email: 'info@studioarch.it'
})
// → { isDuplicate: false } | { isDuplicate: true, reason: 'domain', ... }
```

### Uso consigliato (Fase 3)

Prima di creare un lead B2B:

```typescript
const domain = extractDomain(website || email)
const check = await checkB2BDuplicate({ website, email })

if (check.isDuplicate) {
  console.warn(`Duplicato: ${check.reason} (lead esistente: ${check.existingLeadName})`)
  return // Non creare
}

await saveLead({
  leadType: 'b2b',
  name: 'Studio Arch Milano',
  website,
  email,
  // ...
})
```

---

## 📈 STATISTICHE B2B

```typescript
import { getB2BStats } from '@/lib/leads'

const stats = await getB2BStats()
// {
//   total: 42,
//   approved: 5,
//   follow_up_sent: 3,
//   closed_silence: 8,
//   cemetery: 12  // rejected_already_covered + rejected_out_of_target
// }
```

---

## ✅ BACKWARD COMPATIBILITY

- ✅ Lead B2C esistenti continuano a funzionare
- ✅ `leadType` è richiesto ma ha default `'b2c'` in `saveLead()`
- ✅ Tutti i campi B2B sono opzionali (`?`)
- ✅ API foto/contatto funzionano senza modifiche
- ✅ Nessuna migrazione dati richiesta

---

## 🚀 PROSSIMI PASSI

**FASE 3:** Discovery engine (ricerca automatica 5 lead/giorno)
**FASE 4:** Dashboard 15 minuti (approvazione e invio email)

---

## 🧪 TEST MANUALE

```bash
# CRM
http://localhost:3000/crm
# → Tabs B2C / B2B
# → Filtri per stato
# → Badge B2B sui lead

# API
GET /api/crm/leads?leadType=b2b&status=approved
GET /api/crm/leads?leadType=b2c
```

---

**Documentazione aggiornata:** 14/09/2026  
**Autore:** AI Senior Engineer (180 IQ 😎)
