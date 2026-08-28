// Scarica un'immagine da Wikimedia Commons e genera le varianti AVIF/WebP.
// Uso: node scripts/add-stock-image.mjs <url> <baseName> [widths...]
import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const [url, base, ...wArgs] = process.argv.slice(2);
const widths = wArgs.map(Number);
mkdirSync('public/img', { recursive: true });

// Supporta sia URL remoti che file locali
const src = url.startsWith('http')
  ? Buffer.from(await (await fetch(url)).arrayBuffer())
  : readFileSync(url);
const tmp = `/tmp/${base}-src${/jpe?g/i.test(url) ? '.jpg' : '.png'}`;
writeFileSync(tmp, src);

const meta = await sharp(tmp).metadata();
const entry = { width: meta.width, height: meta.height, variants: {} };
for (const w of widths) {
  if (w > meta.width) continue;
  const out = `public/img/${base}-${w}`;
  await sharp(tmp).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(`${out}.webp`);
  await sharp(tmp).resize({ width: w, withoutEnlargement: true }).avif({ quality: 44 }).toFile(`${out}.avif`);
  const m = await sharp(`${out}.webp`).metadata();
  entry.variants[w] = { width: m.width, height: m.height };
  console.log('OK', base, w, m.width + 'x' + m.height);
}

// aggiorna i manifest
const manifestPath = 'scripts/img-manifest.json';
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest[base] = entry;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
writeFileSync('src/data/img-manifest.js', 'export default ' + JSON.stringify(manifest, null, 2) + ';\n');
console.log('manifest aggiornato');
