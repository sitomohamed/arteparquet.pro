# Services Pages Specification

## Overview
Each service page must educate, inspire, and convert. These pages are critical for SEO (targeting commercial intent keywords) and for convincing visitors who arrive with specific needs.

---

## Services Structure

### Main Services
| Service | URL Slug | Primary Keyword |
|---------|----------|-----------------|
| Posa Parquet | `/servizi/posa-parquet` | posa parquet |
| Parquet Massello | `/servizi/parquet-massello` | parquet massello |
| Parquet Prefinito | `/servizi/parquet-prefinito` | parquet prefinito |
| Restauro Parquet | `/servizi/restauro-parquet` | restauro parquet |
| Levigatura Parquet | `/servizi/levigatura-parquet` | levigatura parquet |
| SPC Flooring | `/servizi/pavimenti-spc` | pavimenti spc |
| PVC Flooring | `/servizi/pavimenti-pvc` | pavimenti pvc |
| Laminato | `/servizi/pavimenti-laminato` | pavimenti laminato |
| Scale in Legno | `/servizi/scale-legno` | scale in legno |
| Battiscopa | `/servizi/battiscopa` | battiscopa legno |

---

## Service Page Template

### Section 1: Hero
```
[Breadcrumb]
Home > Servizi > Posa Parquet

[Overline]
I Nostri Servizi

[H1 - SEO optimized]
Posa Parquet Professionale

[Lead paragraph]
Installazione a regola d'arte di parquet massello, prefinito
e multistrato. Precisione millimetrica e materiali premium
per un risultato che dura generazioni.

[CTA]
[Richiedi Preventivo]

[Hero Image]
Beautiful installation in progress or completed floor
```

### Section 2: Benefits (Why Choose This Service)
```
[H2]
Perché Scegliere la Nostra Posa

[3-4 benefit cards with icons]
- Precisione Millimetrica: Ogni listello posizionato con cura artigianale
- Materiali Premium: Solo legni certificati e colle professionali
- Esperienza Ventennale: La stessa cura del Teatro alla Scala
- Garanzia Totale: Lavoro garantito, trasparenza assoluta
```

### Section 3: Types/Options
```
[H2]
Tipologie di Posa

[Cards or tabs]
- Posa Incollata: Ideale per parquet massello e prefinito
- Posa Flottante: Rapida installazione su supporti idonei
- Posa a Spina di Pesce: Eleganza classica per ambienti prestigiosi
- Posa a Correre: Stile moderno e lineare
- Posa Ungherese: Motivo geometrico sofisticato
```

### Section 4: Process
```
[H2]
Come Lavoriamo

[Timeline/Steps]
1. Sopralluogo Gratuito
   Valutiamo il sottofondo, le condizioni ambientali e ascoltiamo le tue preferenze.

2. Proposta Personalizzata
   Preventivo dettagliato con materiali consigliati e tempistiche precise.

3. Preparazione
   Acclimatamento del legno e preparazione del sottofondo.

4. Posa
   Installazione a regola d'arte con attenzione ai dettagli.

5. Finitura
   Eventuale levigatura e trattamento protettivo.

6. Consegna
   Istruzioni per la cura e assistenza post-installazione.
```

### Section 5: Gallery
```
[H2]
I Nostri Lavori di Posa

[Filterable gallery or carousel]
- Show 6-8 projects related to this service
- Each with location, year, and brief description
- Click to view full project
```

### Section 6: Pricing Indication
```
[H2]
Quanto Costa la Posa del Parquet?

[Pricing table - indicative ranges]
| Tipo di Posa | Prezzo Indicativo (€/mq) |
|--------------|--------------------------|
| Laminato | da €15 |
| Parquet prefinito | da €40 |
| Parquet massello | da €80 |
| Spina di pesce | da €100 |

[Disclaimer]
I prezzi sono indicativi e variano in base a superficie, complessità
e materiali scelti. Richiedi un preventivo personalizzato gratuito.

[CTA]
[Calcola il Tuo Preventivo]
```

### Section 7: FAQ (Service-Specific)
```
[H2]
Domande Frequenti sulla Posa Parquet

[Accordion - 4-6 questions]
- Quanto tempo richiede la posa del parquet?
- Devo liberare la stanza dai mobili?
- Il parquet può essere posato su riscaldamento a pavimento?
- Che garanzia offrite sulla posa?
- Posso calpestare subito il pavimento dopo la posa?
```

### Section 8: Related Services
```
[H2]
Servizi Correlati

[3 service cards]
- Levigatura e Verniciatura
- Battiscopa e Finiture
- Manutenzione Parquet
```

### Section 9: CTA Section
```
[Dark or accent background]

[Headline]
Pronto per il tuo nuovo pavimento?

[Subheadline]
Sopralluogo gratuito in tutta Italia.

[CTA]
[Richiedi Preventivo Gratuito]
```

---

## SEO Requirements Per Page

### Meta Tags
```tsx
export const metadata: Metadata = {
  title: 'Posa Parquet Professionale | Arteparquet',
  description: 'Posa parquet a regola d\'arte in tutta Italia. Parquet massello, prefinito, spina di pesce. Ex team Teatro alla Scala. Preventivo gratuito.',
  keywords: ['posa parquet', 'installazione parquet', 'posatore parquet'],
};
```

### Schema Markup
```json
{
  "@type": "Service",
  "name": "Posa Parquet",
  "provider": { "@type": "LocalBusiness", "name": "Arteparquet" },
  "areaServed": "IT",
  "description": "Posa professionale di parquet..."
}
```

---

## Service-Specific Content Notes

### Posa Parquet
Focus: New installations, precision, patterns

### Restauro Parquet
Focus: Before/after transformations, saving heritage floors

### Levigatura
Focus: Rejuvenation without replacement, cost-effectiveness

### SPC/PVC
Focus: Durability, water resistance, modern aesthetics, lower cost

### Scale in Legno
Focus: Craftsmanship, safety, aesthetic continuity with floors
