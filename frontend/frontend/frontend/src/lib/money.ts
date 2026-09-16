/* ─────────────────────────────────────────────────────────────────────────────
   MONEY — Calcoli finanziari sicuri in centesimi
   
   Tutti gli importi in centesimi (int). Mai float per soldi.
   Arrotondamenti matematici standard: 0.5 → 1
───────────────────────────────────────────────────────────────────────────── */

/**
 * Converti euro in centesimi (es. 48.50 → 4850)
 */
export function eurToCents(eur: number): number {
  return Math.round(eur * 100)
}

/**
 * Converti centesimi in euro (es. 4850 → 48.50)
 */
export function centsToEur(cents: number): number {
  return cents / 100
}

/**
 * Formatta centesimi come stringa euro italiana (es. 4850 → "48,50 €")
 */
export function formatMoney(cents: number): string {
  const eur = centsToEur(cents)
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(eur)
}

/**
 * Calcola subtotal riga: quantità × prezzo unitario
 */
export function lineSubtotal(qty: number, unitPriceCents: number): number {
  return Math.round(qty * unitPriceCents)
}

/**
 * Applica sconto percentuale (es. 10% → 0.10)
 */
export function applyDiscount(cents: number, discountPercent: number): number {
  if (discountPercent <= 0) return cents
  const factor = 1 - discountPercent / 100
  return Math.round(cents * factor)
}

/**
 * Calcola IVA (es. 22% → 0.22)
 */
export function calcTax(cents: number, taxPercent: number): number {
  if (taxPercent <= 0) return 0
  return Math.round(cents * (taxPercent / 100))
}

/**
 * Calcola totale con IVA
 */
export function calcTotal(subtotalCents: number, taxPercent: number): number {
  const tax = calcTax(subtotalCents, taxPercent)
  return subtotalCents + tax
}
