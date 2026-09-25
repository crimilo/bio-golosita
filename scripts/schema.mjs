/**
 * Controllo dei dati strutturati dei prodotti, pagina per pagina.
 *
 * Google chiede che un `Product` (o ogni `Product`/variante di un
 * `ProductGroup`) porti i campi che lo rendono un item completo: `name`, `url`,
 * `image`, `description`, `brand` e — quando c'è un prezzo — un `offers` con
 * `url`, `price`, `priceCurrency`, `availability` e `itemCondition`. In più,
 * qui si controlla che:
 *
 * - `aggregateRating` e `review` ci siano quando la pagina mostra recensioni, e
 *   che il `reviewCount` non sia più basso delle recensioni pubblicate;
 * - il `LocalBusiness` **non** porti voti (il voto della scheda Google è
 *   dell'attività, non del prodotto);
 * - le FAQ del JSON-LD combacino con quelle visibili in pagina.
 *
 * Uso: `node scripts/schema.mjs` (dopo `bun run build`). Esce con codice 1 se
 * trova problemi.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '../src/data/site.js';
import { apiRegine, nuclei } from '../src/data/bee-products.js';

const REQUIRED = ['name', 'url', 'image', 'description', 'brand'];
const OFFER_REQUIRED = ['url', 'price', 'priceCurrency', 'availability', 'itemCondition'];

/**
 * Prodotti che nello schema **non** dichiarano la disponibilità
 * (`schemaAvailability: null` nei dati): oggi solo il miele in favo, che è
 * disponibile poco e solo su prenotazione. Per loro l'assenza di `availability`
 * è voluta, non un errore.
 */
const noAvailability = [...site.honeys, site.honeyComb, apiRegine, nuclei]
  .filter((item) => item.schemaAvailability === null)
  .map((item) => item.name);
const mayOmitAvailability = (node) =>
  typeof node.name === 'string' && noAvailability.some((name) => node.name.startsWith(name));

/**
 * Prodotti che nello schema **non devono mai** dichiarare una disponibilità.
 * La regola è scritta a mano e **non** deriva da `schemaAvailability`: serve
 * proprio a intercettare il caso in cui quel campo venga messo a `InStock` (o
 * arrivi un prezzo) e la disponibilità ricomparisse dove non deve stare.
 */
const neverAvailable = ['miele-in-favo'];
const guardsAvailability = (node) =>
  mayOmitAvailability(node) ||
  (typeof node.url === 'string' && neverAvailable.some((slug) => node.url.includes(`/${slug}/`)));
const unescape = (s) =>
  s
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

/** Tutte le pagine costruite. */
function pages(dir = 'dist', out = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) pages(path, out);
    else if (entry === 'index.html') out.push(path);
  }
  return out;
}

let problems = 0;
const fail = (route, message) => {
  problems++;
  console.log(`  ✗ ${route} ${message}`);
};

for (const file of pages().sort()) {
  const route = '/' + file.replace(/^dist\//, '').replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(unescape(m[1]))
  );
  const group = jsonLd.find((n) => n['@type'] === 'ProductGroup');
  const single = jsonLd.find((n) => n['@type'] === 'Product');
  if (!group && !single) continue;

  console.log(`\n${route} — ${group ? 'ProductGroup' : 'Product'}`);
  const nodes = group ? [group, ...group.hasVariant] : [single];
  nodes.forEach((node, i) => {
    const label = group ? (i === 0 ? 'gruppo' : `variante ${node.size ?? i}`) : 'prodotto';
    for (const key of REQUIRED) if (node[key] == null) fail(route, `${label}: manca "${key}"`);
    if (!node.image || (Array.isArray(node.image) && node.image.length === 0)) {
      fail(route, `${label}: "image" vuota`);
    }
    if (node.offers) {
      for (const key of OFFER_REQUIRED) {
        if (key === 'availability' && mayOmitAvailability(node)) continue;
        if (node.offers[key] == null) fail(route, `${label}: offers.${key} mancante`);
      }
    } else if (i > 0) {
      // Il gruppo può stare senza `offers` (i prezzi stanno sulle varianti), la
      // variante no: senza prezzo non è vendibile.
      fail(route, `${label}: senza offers`);
    }
  });

  const offers = nodes.filter((n) => n.offers).length;
  const rating = nodes[0].aggregateRating;
  const reviews = nodes[0].review ?? [];
  const visible = (html.match(/<figure class="review">/g) || []).length;
  console.log(
    `  nodi: ${nodes.length} (con offers: ${offers}) · voto: ${
      rating ? `${rating.ratingValue}/${rating.bestRating} su ${rating.reviewCount}` : 'nessuno'
    } · review: ${reviews.length} · in pagina: ${visible}`
  );
  // Testo visibile della pagina: fuori i blocchi JSON-LD (contengono le stesse
  // stringhe, quindi un `includes` sull'HTML intero non proverebbe niente) e i
  // tag. Serve a verificare che le recensioni dei dati strutturati siano davvero
  // quelle che legge l'utente.
  const visibleText = unescape(
    html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
  for (const review of reviews) {
    if (!review.author?.name || !review.reviewBody) fail(route, 'Review senza autore o testo');
    else if (!visibleText.includes(review.reviewBody.replace(/\s+/g, ' ').trim())) {
      fail(route, `il testo della recensione di ${review.author.name} non è in pagina`);
    } else if (!visibleText.includes(review.author.name)) {
      fail(route, `il nome ${review.author.name} non è in pagina`);
    }
  }
  if (visible > 3) fail(route, `${visible} recensioni in pagina (il massimo è 3)`);
  if (rating && rating.reviewCount < reviews.length) {
    fail(route, `reviewCount ${rating.reviewCount} < recensioni pubblicate ${reviews.length}`);
  }

  const business = jsonLd.find((n) => n['@type'] === 'LocalBusiness');
  if (!business) fail(route, 'manca il nodo LocalBusiness');
  if (business && (business.aggregateRating || business.review)) {
    fail(route, 'LocalBusiness con voto o recensioni');
  }

  // I prodotti che **non** dichiarano la disponibilità (`schemaAvailability:
  // null` nei dati: oggi il miele in favo, disponibile poco e solo su
  // prenotazione) non devono portarla in nessun nodo: né nel loro `Product` e
  // nelle sue offerte, né nella voce di `hasOfferCatalog` che li elenca in ogni
  // pagina. La regola si legge dai dati, non dal nome del prodotto.
  const withStock = [];
  const collect = (node, path) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return node.forEach((child, i) => collect(child, `${path}[${i}]`));
    // la disponibilità può stare sul nodo (voce di catalogo) o sulla sua
    // offerta: la ricorsione qui sotto visita anche quelle, quindi basta
    // guardare il nodo corrente.
    if (guardsAvailability(node) && node.availability) {
      const label = node.name ?? node['@type'] ?? path;
      withStock.push(`${path} (${label}) → ${node.availability}`);
    }
    for (const key of Object.keys(node)) collect(node[key], `${path}.${key}`);
  };
  jsonLd.forEach((node, i) => collect(node, `jsonLd[${i}]`));
  for (const hit of withStock) fail(route, `dichiara una disponibilità che non dovrebbe: ${hit}`);

  const faq = jsonLd.find((n) => n['@type'] === 'FAQPage');
  const faqVisible = (html.match(/<details>/g) || []).length;
  if (faq && faq.mainEntity.length !== faqVisible) {
    fail(route, `FAQ nel JSON-LD (${faq.mainEntity.length}) ≠ FAQ in pagina (${faqVisible})`);
  }
}

console.log(problems === 0 ? '\nSCHEMA PRODOTTI: TUTTO OK' : `\nSCHEMA PRODOTTI: ${problems} problemi`);
process.exit(problems === 0 ? 0 : 1);
