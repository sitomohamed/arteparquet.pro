# Guida Risoluzione Problemi Indicizzazione Google

## Situazione Attuale
- **Pagina scansionata ma non indicizzata**: 1 pagina (parquet-lodi)
- **Rilevata ma non indicizzata**: 16 pagine (contatti, servizi, zone)

## Cause Principali

### 1. Pagine Molto Recenti
Le pagine sono state aggiunte/aggiornate il 15 agosto 2026. Google impiega tempo per indicizzare nuove pagine (da 3 giorni a 4 settimane).

### 2. Contenuto Simile tra Pagine
Le pagine delle zone hanno struttura simile, che Google potrebbe vedere come contenuto duplicato.

### 3. Mancanza di Backlink
Pagine nuove senza link esterni impiegano più tempo per essere indicizzate.

## Soluzioni Immediate

### Passo 1: Verifica Sitemap in Google Search Console

1. Vai su [Google Search Console](https://search.google.com/search-console)
2. Seleziona la proprietà `arteparquet.pro`
3. Menu laterale → **Sitemap**
4. Verifica che la sitemap sia presente: `https://arteparquet.pro/sitemap.xml`
5. Se non presente, clicca "Aggiungi sitemap" e inserisci: `sitemap.xml`

### Passo 2: Richiesta Indicizzazione Manuale

Per ogni pagina non indicizzata:

1. Vai su Google Search Console
2. Usa la barra di ricerca in alto: inserisci l'URL completo (es. `https://arteparquet.pro/contatti`)
3. Clicca "Richiedi indicizzazione"
4. Attendi la conferma

**URLs da indicizzare manualmente:**

```
https://arteparquet.pro/contatti
https://arteparquet.pro/servizi
https://arteparquet.pro/servizi/levigatura
https://arteparquet.pro/servizi/parquet-massello
https://arteparquet.pro/servizi/parquet-prefinito
https://arteparquet.pro/servizi/pvc
https://arteparquet.pro/servizi/vinilico
https://arteparquet.pro/zone/parquet-bergamo
https://arteparquet.pro/zone/parquet-brescia
https://arteparquet.pro/zone/parquet-monza
https://arteparquet.pro/zone/parquet-lodi
```

### Passo 3: Implementare IndexNow API

IndexNow notifica immediatamente Google, Bing e Yandex quando aggiorni contenuti.

1. **Genera una chiave IndexNow:**
   - Genera una stringa casuale (32-128 caratteri)
   - Esempio: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

2. **Crea il file di verifica:**
   - Crea un file nella cartella `public/` con nome: `{tua-chiave}.txt`
   - Contenuto: la tua chiave (solo quella)
   - Esempio: `public/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.txt`

3. **Aggiungi la chiave alle variabili d'ambiente:**
   ```bash
   INDEXNOW_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```

4. **Usa la funzione quando aggiorni contenuti:**
   ```typescript
   import { notifyIndexNow } from '@/lib/indexnow'
   
   // Dopo aver pubblicato/aggiornato una pagina
   await notifyIndexNow([
     'https://arteparquet.pro/contatti',
     'https://arteparquet.pro/servizi'
   ])
   ```

### Passo 4: Migliorare Internal Linking

**Implementato:** Le pagine ora includono:
- Breadcrumb navigation
- Link correlati tra zone
- Footer con link a tutte le pagine principali

### Passo 5: Verifica Robots.txt

Verifica che `https://arteparquet.pro/robots.txt` sia accessibile e contenga:

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://arteparquet.pro/sitemap.xml
```

## Miglioramenti Tecnici Implementati

### ✅ Header HTTP Ottimizzati
- Aggiunto `Last-Modified` header
- Aggiunto `Cache-Control` per migliore caching
- Mantiene header di sicurezza esistenti

### ✅ Sitemap Dinamica
- Tutte le pagine incluse con priorità corretta
- Date di modifica accurate
- Frequenza di aggiornamento specificata

### ✅ Metadata Completi
- Ogni pagina ha metadata unici
- Canonical URL specificato
- Open Graph configurato
- Structured data (JSON-LD) presente

## Tempistiche Attese

| Azione | Tempo di Attesa |
|--------|----------------|
| Richiesta indicizzazione manuale | 1-7 giorni |
| IndexNow notification | 1-3 giorni |
| Indicizzazione naturale (nuovo sito) | 7-30 giorni |
| Miglioramento ranking | 30-90 giorni |

## Monitoraggio

### Google Search Console
1. **Copertura**: Monitora errori di indicizzazione
2. **Rendimento**: Verifica impression e click
3. **Sitemap**: Controlla pagine scoperte vs indicizzate

### Checklist Settimanale
- [ ] Controlla nuove pagine indicizzate
- [ ] Verifica errori in Search Console
- [ ] Monitora posizionamento parole chiave
- [ ] Aggiorna contenuti vecchi di più di 30 giorni

## Problemi Comuni e Soluzioni

### "Scoperto — al momento non indicizzato"
**Causa:** Google ha trovato la pagina ma non l'ha ancora scansionata.
**Soluzione:** 
- Richiedi indicizzazione manuale
- Aggiungi link interni alla pagina
- Aspetta 7-14 giorni

### "Sottoposto a scansione — al momento non indicizzato"
**Causa:** Google ha scansionato ma non indicizzato (contenuto duplicato o di bassa qualità).
**Soluzione:**
- Aggiungi più contenuto unico
- Migliora qualità del testo
- Aggiungi immagini e media
- Verifica che la pagina non sia troppo simile ad altre

### "URL inviato ma non indicizzato"
**Causa:** Google ha ricevuto la richiesta ma ha deciso di non indicizzare.
**Soluzione:**
- Verifica qualità del contenuto
- Assicurati che l'URL non sia bloccato
- Controlla che non ci siano errori JavaScript
- Aggiungi più contenuto di valore

## Link Utili

- [Google Search Console](https://search.google.com/search-console)
- [IndexNow](https://www.indexnow.org/)
- [Google Indexing Status](https://developers.google.com/search/docs/crawling-indexing/indexing-status)
- [Sitemap Protocol](https://www.sitemaps.org/)

## Supporto

Se dopo 14 giorni le pagine non sono ancora indicizzate:
1. Controlla errori in Search Console
2. Verifica che il sito sia accessibile pubblicamente
3. Assicurati che non ci siano errori 404 o 500
4. Controlla la velocità di caricamento delle pagine
5. Verifica che il contenuto sia unico e di qualità

---

**Ultimo aggiornamento**: 16 agosto 2026
