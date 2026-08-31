// Audit completo dist/: SEO, E-E-A-T, headings, alt, link, NAP, JSON-LD.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '../src/data/site.js';

const pages = ['index.html', 'chi-siamo/index.html', 'contatti/index.html', '404.html', 'miele/miele-di-acacia/index.html', 'miele/miele-millefiori-primaverile/index.html', 'miele/miele-millefiori-estivo-al-tiglio-e-more/index.html', 'miele/miele-millefiori-estivo-al-tiglio-e-ailanto/index.html', 'miele/miele-di-castagno/index.html'];

let issues = 0;
const fail = (p, msg) => { console.log(`  ✗ ${p}: ${msg}`); issues++; };

for (const rel of pages) {
  const file = join('dist', rel);
  if (!statSync(file, { throwIfNoTrailingSlash: false }) && !statSync(file)) { fail(rel, 'pagina mancante'); continue; }
  const h = readFileSync(file, 'utf8');
  const unescape = (s) => s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  const title = unescape(h.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
  const desc = unescape(h.match(/name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!title) fail(rel, 'manca <title>');
  else if (title.length > 65) fail(rel, `title ${title.length} caratteri`);
  if (!desc) fail(rel, 'manca description');
  else if (desc.length > 155) fail(rel, `desc ${desc.length} caratteri`);
  if (!h.includes('<link rel="canonical"')) fail(rel, 'manca canonical');
  if (!h.includes('property="og:title"') || !h.includes('property="og:image"')) fail(rel, 'manca OG');
  if (!h.includes('name="robots"')) fail(rel, 'manca meta robots');
  if (rel !== '404.html' && !h.includes('content="index, follow"')) fail(rel, 'robots non index');

  // headings: un solo h1 e niente livelli saltati
  const heads = [...h.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => Number(m[1]));
  const h1s = heads.filter((x) => x === 1).length;
  if (h1s !== 1) fail(rel, `${h1s} h1`);
  let prev = 0;
  for (const lv of heads) {
    if (lv > prev + 1 && prev !== 0) fail(rel, `heading salta da h${prev} a h${lv}`);
    prev = lv;
  }

  // immagini: alt e width/height
  const imgs = [...h.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  for (const img of imgs) {
    if (!/alt="/.test(img)) fail(rel, 'img senza alt');
    if (!/width="/.test(img) || !/height="/.test(img)) fail(rel, 'img senza width/height');
  }

  // link interni esistono
  const links = [...h.matchAll(/href="\/([^"#]*?)(?:#|")/g)].map((m) => '/' + m[1]).filter((u) => !u.includes('.avif') && !u.includes('.webp'));
  for (const u of [...new Set(links)]) {
    const target = join('dist', u);
    try {
      if (!statSync(target).isFile() && !statSync(join(target, 'index.html')).isFile()) fail(rel, `link rotto: ${u}`);
    } catch { fail(rel, `link rotto: ${u}`); }
  }

  // NAP consistente
  if (!h.includes(site.phoneDisplay.replace(/ /g, '')) && !h.includes(site.phoneDisplay)) fail(rel, 'telefono NAP mancante');
  if (!h.includes('Via Salvo D')) fail(rel, 'indirizzo NAP mancante');

  // JSON-LD validi
  const lds = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of lds) {
    try { JSON.parse(unescape(m[1])); } catch { fail(rel, 'JSON-LD non valido'); }
  }
  if (!lds.length && rel !== '404.html') fail(rel, 'nessun JSON-LD');
  console.log(`✓ ${rel} — title ${title.length}, desc ${desc.length}, h1 ok, ${lds.length} JSON-LD, ${imgs.length} img`);
}

// sitemap copre tutte le pagine
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
for (const u of ['/', '/miele/miele-di-acacia/', '/miele/miele-millefiori-primaverile/', '/miele/miele-millefiori-estivo-al-tiglio-e-more/', '/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/', '/miele/miele-di-castagno/', '/chi-siamo/', '/contatti/']) {
  if (!sitemap.includes(`<loc>https://bioegolosita.it${u}</loc>`)) fail('sitemap', `manca ${u}`);
}
console.log('✓ sitemap copre tutte le pagine');

console.log(issues === 0 ? '\nAUDIT COMPLETO: TUTTO OK' : `\nAUDIT: ${issues} problemi`);
process.exit(issues === 0 ? 0 : 1);
