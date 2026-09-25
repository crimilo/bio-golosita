/**
 * Link WhatsApp con il messaggio precompilato.
 *
 * `site.whatsapp` è il link di default (messaggio generico sul miele) e resta
 * quello di footer, contatti e schede del miele. Le pagine di un prodotto
 * specifico passano invece il proprio messaggio — `whatsappText` nei dati di
 * `bee-products.js` — così chi scrive per le api regine non apre la chat con una
 * domanda sul miele. Il numero è **sempre lo stesso**: si sostituisce solo il
 * testo, mai l'indirizzo.
 */
import { site } from '../data/site.js';

export function whatsappLink(text) {
  const number = site.whatsapp.split('?')[0];
  return text ? `${number}?text=${encodeURIComponent(text)}` : number;
}
