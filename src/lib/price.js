/**
 * I prezzi sono scritti a mano nei dati (`priceFormats`, `prezzo`) e hanno due
 * forme possibili:
 *
 *   { size: '500 g', price: '€ 6,00' }              → formato di vendita (mieli)
 *   "€ 5,50 (200 g)"                                → prezzo unico con la confezione
 *   "€ 20,00 / regina"                              → prezzo unico "al pezzo"
 *
 * `splitPrice` separa totale e divisione così che il totale resti in evidenza e
 * la coda (tra parentesi o dopo la barra: la confezione, "al pezzo") sia resa
 * più piccola. `priceAmount`
 * legge il numero da una stringa e `entryFormat` / `otherFormats` / `priceLine`
 * / `priceFrom` formattano la lista dei formati. **Nessun prezzo viene calcolato
 * o inventato**: si formatta solo quello che l'azienda ha inserito nei dati.
 * Finché un prezzo è `null` le pagine mostrano "Prezzo su richiesta".
 */
export function splitPrice(value) {
  if (value == null) return { main: '', unit: null };
  const text = String(value).trim();
  // "€ 5,50 (200 g)" → "€ 5,50" + "(200 g)": la confezione sta tra parentesi.
  const paren = text.match(/^(.+?)\s*\((.+)\)$/);
  if (paren) return { main: paren[1].trim(), unit: `(${paren[2].trim()})` };
  // "€ 20,00 / regina", "€ 99,00 / nucleo" → la coda dopo la barra è il
  // riferimento del pezzo, stessa resa piccola della confezione tra parentesi.
  const per = text.match(/^(.+?)\s*\/\s*(.+)$/);
  if (per) return { main: per[1].trim(), unit: `/ ${per[2].trim()}` };
  return { main: text, unit: null };
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
