// Optimize root photos -> AVIF + WebP at target widths into public/img/
// and write a manifest (JSON) with final dims for HTML width/height attributes.
import sharp from 'sharp';
import { mkdirSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

// source -> widths to generate
const WIDTHS = {
  '3_baratooli_di_miele_di_acacia_millefiori.jpg': [1600, 1200, 800, 480],
  'api.jpg': [800, 480],
  'api_che_producono.jpg': [1200, 800, 480],
  'apiario.jpg': [720, 480],
  'arnie.jpg': [600, 400],
  'barattoli_di_mile_millefiori.jpg': [800, 480],
  'barattolo_di_miele.jpg': [600, 400],
  'raffaele_che_mostra_larnia_in_mano.jpg': [1000, 600, 400],
};

const manifest = {};
const srcs = Object.keys(WIDTHS).filter((f) => existsSync(f));
for (const f of srcs) {
  const meta = await sharp(f).metadata();
  const base = basename(f, extname(f));
  const entry = { width: meta.width, height: meta.height, variants: {} };
  for (const w of WIDTHS[f]) {
    if (w > meta.width) continue;
    const resized = sharp(f).resize({ width: w, withoutEnlargement: true });
    const webp = `public/img/${base}-${w}.webp`;
    const avif = `public/img/${base}-${w}.avif`;
    if (!existsSync(webp)) await resized.clone().webp({ quality: 74 }).toFile(webp);
    if (!existsSync(avif)) await resized.clone().avif({ quality: 44 }).toFile(avif);
    const m = await sharp(webp).metadata();
    entry.variants[w] = { width: m.width, height: m.height };
    console.log('OK', base, w, `${(await sharp(avif).metadata()).size / 1024 | 0}KB avif`);
  }
  manifest[base] = entry;
}
writeFileSync('scripts/img-manifest.json', JSON.stringify(manifest, null, 2));
console.log('manifest written');
