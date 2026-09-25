import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { site, nav } from '../src/data/site.js';

/** Tutte le pagine HTML prodotte dalla build (index.html + 404.html). */
function findPages(dir = 'dist') {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...findPages(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Da dist/xyz/index.html a /xyz/ ; da dist/404.html a /404/ */
const urlOf = (file) => {
  const parts = relative('dist', file).split(sep);
  if (parts[parts.length - 1] === '404.html') return '/404/';
  return '/' + parts.slice(0, -1).join('/') + (parts.length > 1 ? '/' : '');
};

let issues = 0;
const fail = (p, msg) => {
  console.log(`  ✗ ${p}: ${msg}`);
  issues++;
};
const warn = (p, msg) => console.log(`  ! ${p}: ${msg}`);

const unescape = (s) =>
  s
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

// Coerenza dei dati: le località in evidenza in home devono essere tra quelle servite
const featuredOrfane = site.areaServedFeatured.filter((t) => !site.areaServed.includes(t));
if (featuredOrfane.length) {
  console.log(`  ✗ site.areaServedFeatured contiene località non servite: ${featuredOrfane.join(', ')}`);
  issues++;
}

const files = findPages();
console.log(`Pagine trovate in dist/: ${files.length}\n`);

/** id presenti in ogni pagina: serve a verificare le ancore anche tra pagine. */
const idsByPage = new Map(
  files.map((file) => [
    urlOf(file),
    new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
  ])
);

for (const file of files) {
  const rel = relative('dist', file);
  const h = readFileSync(file, 'utf8');
  const is404 = rel === '404.html';
  const url = urlOf(file);

  const title = unescape(h.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
  const desc = unescape(h.match(/name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!title) fail(rel, 'manca <title>');
  else if (title.length > 65) fail(rel, `title ${title.length} caratteri`);
  if (!desc) fail(rel, 'manca description');
  else if (desc.length > 155) fail(rel, `desc ${desc.length} caratteri`);

  // canonical: https, dominio canonico, senza www, coerente con il path
  const canonical = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) fail(rel, 'manca canonical');
  else {
    if (!canonical.startsWith(`${site.domain}/`)) fail(rel, `canonical su host non canonico: ${canonical}`);
    if (!is404 && canonical !== `${site.domain}${url}`) fail(rel, `canonical ${canonical} != ${site.domain}${url}`);
  }

  if (!h.includes('property="og:title"') || !h.includes('property="og:image"')) fail(rel, 'manca OG');
  if (!h.includes('name="robots"')) fail(rel, 'manca meta robots');
  if (!is404 && !h.includes('content="index, follow"')) fail(rel, 'robots non index');
  if (is404 && !h.includes('noindex')) warn(rel, '404 senza noindex');

  const heads = [...h.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => Number(m[1]));
  const h1s = heads.filter((x) => x === 1).length;
  if (h1s !== 1) fail(rel, `${h1s} h1`);
  let prev = 0;
  for (const lv of heads) {
    if (lv > prev + 1 && prev !== 0) fail(rel, `heading salta da h${prev} a h${lv}`);
    prev = lv;
  }

  const imgs = [...h.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  for (const img of imgs) {
    // Astro rende alt="" come attributo nudo (`alt`): entrambe le forme sono ok
    if (!/\salt(?=[\s=>])/.test(img)) fail(rel, 'img senza alt');
    if (!/width="/.test(img) || !/height="/.test(img)) fail(rel, 'img senza width/height');
  }

  // link interni: nessun file mancante, nessun host non canonico
  const hrefs = [...h.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const links = hrefs
    .filter((u) => u.startsWith('/') && !u.startsWith('//'))
    .map((u) => u.split('#')[0])
    .filter((u) => u && !/\.(avif|webp|jpe?g|png|svg|ico|xml|txt|css|js|mp4)$/.test(u));
  for (const u of [...new Set(links)]) {
    const target = join('dist', u);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) fail(rel, `link rotto: ${u}`);
  }
  for (const u of [...new Set(hrefs)]) {
    // solo i link al nostro dominio devono essere https e senza www
    if (/^http:\/\/bioegolosita\.it/i.test(u) || /^https:\/\/www\.bioegolosita\.it/i.test(u)) {
      fail(rel, `link al dominio non canonico: ${u}`);
    }
  }

  // struttura di chiusura: un solo blocco CTA/contatti per pagina, mappe non duplicate
  const main = h.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  const chunks = main.split(/(?=<section)/).slice(1);
  const kindOf = (c) =>
    /class="cta-band"/.test(c) ? 'cta' : /class="contact-card/.test(c) ? 'contatti' : 'sez';
  const seq = chunks.map(kindOf);
  const count = (k) => seq.filter((x) => x === k).length;
  const maps = (main.match(/<iframe/g) || []).length;
  if (maps > 1) fail(rel, `${maps} mappe nella stessa pagina`);
  if (count('cta') > 1) fail(rel, `${count('cta')} cta-band nella stessa pagina`);
  if (count('contatti') > 1) fail(rel, `${count('contatti')} blocchi contatti nella stessa pagina`);
  if (seq.some((k, i) => k === 'cta' && seq[i + 1] === 'contatti')) {
    fail(rel, 'cta-band attaccata al blocco contatti (due CTA di fila)');
  }
  const hasClosing = count('cta') + count('contatti') > 0;
  if (!hasClosing && !is404) fail(rel, 'nessun blocco di chiusura (CTA o contatti)');

  // campi di conversione mai vuoti: se un fallback non renderizza (prop sbagliata,
  // dato null) la pagina resta senza prezzo/disponibilità e sembra rotta
  const noTags = (s) => s.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ').trim();
  for (const cls of ['product-price', 'price-note', 'bulk-note']) {
    const re = new RegExp(`<([a-z]+)[^>]*class="[^"]*(?<![\\w-])${cls}(?![\\w-])[^"]*"[^>]*>([\\s\\S]*?)<\\/\\1>`, 'g');
    for (const m of h.matchAll(re)) {
      if (!noTags(m[2])) fail(rel, `.${cls} vuoto (fallback prezzo/disponibilità non renderizzato)`);
    }
  }
  // scheda tecnica: nessuna riga con il valore vuoto ("Razza:" e poi niente)
  for (const m of h.matchAll(/<li>\s*<strong>([^<]{1,40}):<\/strong>\s*<span>([\s\S]*?)<\/span>/g)) {
    if (!noTags(m[2])) fail(rel, `valore vuoto nella scheda tecnica: ${m[1]}`);
  }

  // /consegna-miele/ è la pagina che deve elencare TUTTE le località servite:
  // in home ne bastano poche, ma qui non può mancarne nessuna. Il controllo è
  // sulla sezione "Dove consegniamo" (non su tutta la pagina, altrimenti
  // basterebbe una menzione di sfuggita) e ignora lo schema JSON-LD.
  if (url === '/consegna-miele/') {
    const zoneSection = h.match(
      /<section[^>]*aria-labelledby="zone"[\s\S]*?<\/section>/
    )?.[0];
    if (!zoneSection) fail(rel, 'sezione "Dove consegniamo" non trovata');
    else {
      // unescape: negli HTML gli apostrofi sono &#39;, es. "Groppello d&#39;Adda"
      const visible = unescape(zoneSection.replace(/<script[\s\S]*?<\/script>/g, ''));
      const missing = site.areaServed.filter((t) => !visible.includes(t));
      if (missing.length) fail(rel, `comuni serviti non elencati nella sezione zone: ${missing.join(', ')}`);
    }
  }

  // Consegne: il sito non deve dire CHI consegna. A volte la consegna la fa un
  // corriere, a volte Raffaele: quindi niente affermazioni tipo "non è un
  // corriere" / "senza corriere", e niente frasi che implicano che consegni
  // sempre lui ("passiamo noi", "lo consegniamo noi", "da dove mi trovo").
  const chiConsegna = [/corrier/i, /passiamo noi/i, /consegniamo noi/i, /portiamo direttamente/i, /da dove mi trovo/i, /giro di consegne/i];
  for (const re of chiConsegna) {
    const m = h.match(re);
    if (m) fail(rel, `affermazione su chi consegna: "${m[0]}"`);
  }

  // Sede legale e apiari sono due cose diverse: la sede è a Cassano d'Adda
  // (indirizzo, ritiro, contatti, localizzazione commerciale), gli apiari sono
  // nel Parco Adda Nord e in Alta Val Brembana — e da lì viene il miele.
  // Quindi il sito non deve mai dire che le api, gli apiari o la produzione
  // sono «a Cassano d'Adda»; le frasi su consegne, clientela e area servita
  // restano invece come sono. Vedi README, "Sede legale e apiari".
  const apiariACassano = [
    /apiari?[^<]{0,40}Cassano d'Adda/i,
    // Case-sensitive di proposito: un titolo SEO come «Api regine a Cassano
    // d'Adda (MI)» è legittimo (il prodotto si vende/prenota a Cassano), «le
    // nostre api a Cassano d'Adda» no.
    /\bapi\s+(?:a|tra|di|nel|in|nei)\s+Cassano d'Adda/,
  ];
  // `unescape` come per le zone servite: nell'HTML gli apostrofi sono `&#39;`
  // («Cassano d&#39;Adda»), e le frasi sull'origine arrivano da campi dei dati
  // (`heroIntro`, `originNote`, `description`): senza questo passaggio un
  // «apiari a Cassano d'Adda» scritto lì non verrebbe mai visto.
  const testoOrigine = unescape(h);
  for (const re of apiariACassano) {
    const m = testoOrigine.match(re);
    if (m) fail(rel, `apiari/produzione attribuiti a Cassano d'Adda: "${m[0]}"`);
  }

  // Il menu deve far capire dove sei. Una sola voce accesa, e quella giusta
  // per la sezione: su /miele/miele-di-acacia/ è accesa "Mieli" (non la home).
  // Il controllo è sul blocco <nav>, non sulla pagina intera, così non prende
  // il breadcrumb (che usa lo stesso aria-current). Su home, 404 e guide, che
  // non sono voci del menu, non deve essere accesa nessuna voce.
  const navBlock = h.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0] ?? '';
  if (navBlock) {
    const accese = [...navBlock.matchAll(/<a[^>]*href="([^"]+)"[^>]*aria-current="page"/g)].map((m) => m[1]);
    const attesa = nav.find((i) =>
      i.href === '/' ? url === '/' : url === i.href || url.startsWith(i.href)
    )?.href;
    if (accese.length > 1) fail(rel, `più voci accese nel menu: ${accese.join(', ')}`);
    if (attesa && accese[0] !== attesa)
      fail(rel, `voce accesa sbagliata: ${accese[0] ?? 'nessuna'} (attesa ${attesa})`);
    if (!attesa && accese.length)
      fail(rel, `voce accesa su una pagina che non è nel menu: ${accese[0]}`);
  } else if (!/404/.test(rel)) {
    fail(rel, 'blocco <nav> non trovato');
  }

  // Il bottone "Tutte le recensioni su Google" porta fuori dal sito: serve
  // target="_blank" e la freccia diagonale DOPO il testo (prima del testo non
  // segnala niente: sembra una decorazione).
  const recensioni = h.match(/<a\b(?:(?!<\/a>)[\s\S])*?Tutte le recensioni[\s\S]*?<\/a>/);
  if (recensioni) {
    if (!/target="_blank"/.test(recensioni[0])) {
      fail(rel, 'recensioni Google: link esterno senza target="_blank"');
    }
    const iTesto = recensioni[0].indexOf('Tutte le recensioni');
    const iSvg = recensioni[0].indexOf('<svg');
    if (iSvg === -1) fail(rel, 'recensioni Google: manca la freccia diagonale nel bottone');
    else if (iSvg < iTesto) fail(rel, 'recensioni Google: la freccia sta PRIMA del testo, va dopo');
  }

  // Ogni card di rimando (".card") deve avere un'immagine: le card di servizio
  // senza foto sembravano tutte uguali e non si distinguevano a colpo d'occhio.
  // `card` da solo o con altre classi (card--media, …), non "card-media"
  const cardsSenzaFoto = [...h.matchAll(/<a class="card(?![\w-])[^"]*"[\s\S]*?<\/a>/g)].filter(
    (m) => !m[0].includes('<img')
  ).length;
  if (cardsSenzaFoto) fail(rel, `${cardsSenzaFoto} card senza immagine`);

  // ancore: l'id deve esistere nella pagina di destinazione (anche se è un'altra pagina)
  const ownIds = idsByPage.get(url) ?? new Set();
  if (ownIds.size === 0) fail(rel, 'nessun id nella pagina');
  for (const u of [...new Set(hrefs)]) {
    if (u.startsWith('http') || u.startsWith('//')) continue;
    const m = u.match(/^([^#]*)#(.+)$/);
    if (!m) continue;
    const target = m[1] === '' ? url : m[1].endsWith('/') ? m[1] : `${m[1]}/`;
    if (!idsByPage.has(target)) continue; // link esterno o asset: lo copre il check dei link
    if (!idsByPage.get(target).has(m[2])) fail(rel, `ancora senza destinazione: ${u}`);
  }

  if (!h.includes(site.phoneDisplay)) fail(rel, 'telefono NAP mancante');
  if (!h.includes('Via Salvo D')) fail(rel, 'indirizzo NAP mancante');

  const lds = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of lds) {
    try {
      JSON.parse(unescape(m[1]));
    } catch {
      fail(rel, 'JSON-LD non valido');
    }
  }
  if (!lds.length && !is404) fail(rel, 'nessun JSON-LD');

  // BreadcrumbList una volta sola, su tutte le pagine interne (home e 404 esclusi)
  const bcCount = (h.match(/"BreadcrumbList"/g) || []).length;
  const isHome = url === '/';
  if (!is404 && !isHome && bcCount !== 1) fail(rel, `BreadcrumbList: ${bcCount} (atteso 1)`);
  if (isHome && bcCount !== 0) fail(rel, `BreadcrumbList sulla home: ${bcCount} (atteso 0)`);

  // Hero con immagine di sfondo: il preload deve puntare alla stessa immagine.
  // Il riconoscimento è sul contenitore dello sfondo (.hero-bg-media), non sulla
  // presenza di una <picture> nella hero: /chi-siamo/ ha la foto di Raffaele
  // dentro la hero, ma è un ritratto accanto al testo, non uno sfondo.
  const hero = h.match(/<section class="((?:hero|page-hero)[^"]*)"[^>]*>([\s\S]*?)<\/section>/); if (hero) {
    const heroTokens = hero[1].split(/\s+/);
    const heroBase = hero[2].match(
      /hero-bg-media[\s\S]{0,800}?<source[^>]*srcset="\/img\/([a-z0-9_]+)-/
    )?.[1];
    const preloadBase = h.match(
      /<link rel="preload" as="image"[^>]*imagesrcset="\/img\/([a-z0-9_]+)-/
    )?.[1];
    if (heroBase) {
      if (!heroTokens.includes('on-image')) fail(rel, 'hero con sfondo senza classe on-image');
      const hasPreload = /<link rel="preload" as="image"[^>]*>/.test(h);
      if (!hasPreload) fail(rel, "hero con sfondo ma senza preload dell'immagine");
      else if (preloadBase !== heroBase) {
        fail(rel, `preload (${preloadBase}) diverso dallo sfondo della hero (${heroBase})`);
      }
    }
  }

  // riferimento a entità inesistente nella pagina
  for (const m of lds) {
    const raw = unescape(m[1]);
    if (raw.includes('"@id"') && raw.includes('"#azienda"') && !raw.includes('"@type":"LocalBusiness"')) {
      fail(rel, 'JSON-LD con @id #azienda senza nodo LocalBusiness');
    }
  }

  console.log(`✓ ${rel} — title ${title.length}, desc ${desc.length}, h1 ok, ${lds.length} JSON-LD, ${imgs.length} img`);
}

// Sitemap: deve coprire tutte le pagine reali e solo quelle
const sitemapPath = 'dist/sitemap.xml';
if (!existsSync(sitemapPath)) fail('sitemap', 'sitemap.xml non generato');
else {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const file of files) {
    const url = urlOf(file);
    if (url === '/404/') continue;
    if (!locs.includes(`${site.domain}${url}`)) fail('sitemap', `manca ${url}`);
  }
  for (const loc of locs) {
    if (!loc.startsWith('https://bioegolosita.it/')) fail('sitemap', `URL non canonico: ${loc}`);
    const path = loc.replace(site.domain, '');
    if (!existsSync(join('dist', path.replace(/^\//, ''), 'index.html')) && path !== '/') {
      fail('sitemap', `URL che non esiste in dist: ${loc}`);
    }
  }
  console.log(`\n✓ sitemap: ${locs.length} URL, tutte le pagine coperte`);
}

const robots = readFileSync('dist/robots.txt', 'utf8');
console.log(`✓ robots.txt: ${robots.includes('Allow: /') ? 'OK' : 'da controllare'}`);
try {
  statSync('dist/og.jpg');
} catch {
  fail('og.jpg', 'mancante');
}
if (!existsSync('dist/_redirects')) warn('_redirects', 'assente');
else console.log('✓ _redirects presente');

console.log(issues === 0 ? '\nAUDIT COMPLETO: TUTTO OK' : `\nAUDIT: ${issues} problemi`);
process.exit(issues === 0 ? 0 : 1);
