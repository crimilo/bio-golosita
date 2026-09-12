/**
 * I prezzi sono scritti a mano nei dati (`priceFormats`, `prezzo`) e hanno due
 * forme possibili:
 *
 *   { size: '500 g', price: '€ 6,00' }              → formato di vendita (mieli)
 *   "300,00 € (10,00 € al pezzo)"                   → prezzo unico con divisione
 *
 * `splitPrice` separa totale e divisione così che il totale resti in evidenza e
 * la parte tra parentesi (sempre in coda) sia resa più piccola. `priceAmount`
 * legge il numero da una stringa e `entryFormat` / `otherFormats` / `priceLine`
 * / `priceFrom` formattano la lista dei formati. **Nessun prezzo viene calcolato
 * o inventato**: si formatta solo quello che l'azienda ha inserito nei dati.
 * Finché un prezzo è `null` le pagine mostrano "Prezzo su richiesta".
 */
export function splitPrice(value) {
  if (value == null) return { main: '', unit: null };
  const text = String(value).trim();
  const match = text.match(/^(.+?)\s*\((.+)\)$/);
  if (!match) return { main: text, unit: null };
  return { main: match[1].trim(), unit: `(${match[2].trim()})` };
}

/**
 * Numero da un prezzo scritto a mano: "€ 6,00" → 6, "€ 11,00" → 11,
 * "300,00 € (10,00 € al pezzo)" → 300. Torna `null` se nella stringa non c'è
 * nessun numero: meglio nessun prezzo che un prezzo inventato (i dati
 * strutturati omettono l'offerta invece di pubblicare un valore finto).
 */
export function priceAmount(value) {
  if (value == null) return null;
  const match = String(value).match(/(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?/);
  if (!match) return null;
  const amount = Number(`${match[1].replace(/\./g, '')}${match[2] ? `.${match[2]}` : ''}`);
  return Number.isFinite(amount) ? amount : null;
}

/**
 * Il formato col prezzo più basso: è il prezzo d'ingresso, quello che si vede
 * per primo nella pagina del prodotto e sulle card.
 */
export function entryFormat(formats) {
  const list = [...(formats ?? [])];
  list.sort((a, b) => (priceAmount(a.price) ?? 0) - (priceAmount(b.price) ?? 0));
  return list[0] ?? null;
}

/** Gli altri formati, da mostrare in piccolo sotto il prezzo d'ingresso. */
export function otherFormats(formats) {
  const entry = entryFormat(formats);
  return (formats ?? []).filter((f) => f !== entry);
}

/** "€ 6,00 (500 g) · € 11,00 (1 kg)": riga di prezzo per i testi (FAQ, tabella). */
export function priceLine(formats) {
  return (formats ?? []).map((f) => `${f.price} (${f.size})`).join(' · ');
}

/** "da € 5,00": prezzo d'ingresso più basso della lista, per il badge delle card. */
export function priceFrom(formats) {
  const entry = entryFormat(formats);
  return entry ? `da ${entry.price}` : null;
}
