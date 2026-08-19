# Script per Notificare Tutte le Pagine a IndexNow

## Setup Iniziale

### 1. Genera la tua chiave IndexNow
```bash
# Genera una stringa casuale di 32 caratteri
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 2. Crea il file di verifica
Salva la chiave generata in `frontend/frontend/public/{tua-chiave}.txt`

Esempio: se la chiave è `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
Crea il file: `public/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.txt`
Contenuto del file: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### 3. Aggiungi la chiave alle variabili d'ambiente
Nel file `.env.local`:
```
INDEXNOW_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 4. Notifica tutte le pagine

Dopo il deploy, esegui questa richiesta:

```bash
curl https://arteparquet.pro/api/indexnow?all=true
```

Oppure apri nel browser:
```
https://arteparquet.pro/api/indexnow?all=true
```

## Notifica Pagine Specifiche

Per notificare pagine specifiche dopo un aggiornamento:

```bash
curl -X POST https://arteparquet.pro/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://arteparquet.pro/contatti", "https://arteparquet.pro/servizi"]}'
```

## Verifica IndexNow

Dopo aver notificato:
1. Controlla che il file di verifica sia accessibile:
   `https://arteparquet.pro/{tua-chiave}.txt`
   
2. I motori di ricerca inizieranno a crawlare entro 1-3 giorni

## Motori di Ricerca Supportati

IndexNow notifica automaticamente:
- ✅ Microsoft Bing
- ✅ Yandex
- ✅ Seznam.cz
- ✅ Naver
- ℹ️ Google (supporto parziale - meglio usare Search Console)

## Note
- Non c'è bisogno di notificare la stessa URL più volte al giorno
- IndexNow è gratuito e illimitato
- La notifica non garantisce l'indicizzazione, ma accelera il crawling
