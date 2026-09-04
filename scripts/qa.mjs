import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const pages = [
  'dist/index.html',
  'dist/miele/miele-di-acacia/index.html',
  'dist/miele/miele-millefiori-primaverile/index.html',
  'dist/miele/miele-millefiori-estivo-al-tiglio-e-more/index.html',
  'dist/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/index.html',
  'dist/miele/miele-di-castagno/index.html',
  'dist/chi-siamo/index.html',
  'dist/contatti/index.html',
];

let bad = 0;
for (const p of pages) {
  const h = readFileSync(p, 'utf8');
  const unescape = (s) =>
    s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  const title = unescape(h.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
  const desc = unescape(h.match(/name="description" content="([^"]*)"/)?.[1] ?? '');
  console.log(`\n${p}`);
  console.log(`  title (${title.length}): ${title}`);
  console.log(`  desc  (${desc.length}): ${desc.slice(0, 90)}...`);
  if (title.length > 65) { console.log('  ✗ TITLE TROPPO LUNGO'); bad++; }
  if (desc.length > 155) { console.log('  ✗ DESC TROPPO LUNGA'); bad++; }
  const lds = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of lds) {
    try {
      const obj = JSON.parse(m[1].replace(/&quot;/g, '"'));
      const t = Array.isArray(obj) ? obj[0]?.['@type'] : obj['@type'];
      console.log(`  ld+json OK: ${t}`);
    } catch (e) {
      console.log(`  ✗ JSON-LD NON VALIDO: ${e.message}`);
      bad++;
    }
  }
  if (!h.includes('<script type="application/ld+json">')) { console.log('  ✗ nessun JSON-LD'); bad++; }
}

const robots = readFileSync('dist/robots.txt', 'utf8');
console.log('\nrobots.txt:', robots.includes('Allow: /') ? 'OK' : '✗');
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const urls = (sitemap.match(/<loc>/g) || []).length;
console.log(`sitemap: ${urls} URL`);

try { statSync('dist/og.jpg'); console.log('og.jpg: OK'); } catch { console.log('og.jpg: MANCANTE'); bad++; }

console.log(bad === 0 ? '\nQA: TUTTO OK' : `\nQA: ${bad} PROBLEMI`);
