// Optimize root photos -> AVIF + WebP at target widths into public/img/
// and write a manifest (JSON) with final dims for HTML width/height attributes.
import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { basename, extname } from 'node:path';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

// source -> widths to generate
const WIDTHS = {
  'foto_dei_3_mieli_acacia_millefiori_e_castagno.jpg': { base: '3_baratooli_di_miele_di_acacia_millefiori', widths: [1600, 1200, 800, 640, 480] },
  'miele_acacia.jpg': { base: 'miele_di_acacia', widths: [400, 300] },
  'miele_castagno.jpg': { base: 'miele_di_castagno', widths: [600, 400] },
  'miele_millefiori.jpg': { base: 'miele_millefiori_estivo', widths: [600, 400] },
  'miele_millefiori.jpg': { base: 'miele_millefiori_estivo_ailanto', widths: [600, 400], tone: { saturation: 1.08, brightness: 1.02 } },
  'raffaele_che_mostra_larnia_in_mano.jpg': [1000, 600, 400],
  'raffaele_con_suo_padre.jpg': [600, 400],
  'raffaele.png': [800, 480, 300],
};

// crop portrait/landscape sources -> `${base}_card` variants (4:3, posY gravity)
const CROPS = {
  'barattoli_di_mile_millefiori.jpg': { widths: [800, 480, 300], posY: 0.7 },
};

// Parti dal manifest esistente: le voci di sorgenti non più presenti in root
// vengono conservate (le varianti in public/img restano in uso dal sito).
const manifest = JSON.parse(
  existsSync('scripts/img-manifest.json')
    ? readFileSync('scripts/img-manifest.json', 'utf8')
    : '{}'
);

// crop 4:3 con gravità verticale (posY in frazione, default 0.5)
async function writeVariants(src, base, widths, tone) {
  const meta = await sharp(src).metadata();
  const entry = { width: meta.width, height: meta.height, variants: {} };
  for (const w of widths) {
    if (w > meta.width) continue;
    let resized = sharp(src);
    if (tone) resized = resized.modulate(tone);
    resized = resized.resize({ width: w, withoutEnlargement: true });
    const webp = `public/img/${base}-${w}.webp`;
    const avif = `public/img/${base}-${w}.avif`;
    if (!existsSync(webp)) await resized.clone().webp({ quality: 74 }).toFile(webp);
    if (!existsSync(avif)) await resized.clone().avif({ quality: 44 }).toFile(avif);
    const m = await sharp(webp).metadata();
    entry.variants[w] = { width: m.width, height: m.height };
    console.log('OK', base, w, `${(await sharp(avif).metadata()).size / 1024 | 0}KB avif`);
  }
  return entry;
}

const srcs = Object.keys(WIDTHS).filter((f) => existsSync(f));
for (const f of srcs) {
  const cfg = WIDTHS[f];
  const base = Array.isArray(cfg) ? basename(f, extname(f)) : cfg.base;
  const widths = Array.isArray(cfg) ? cfg : cfg.widths;
  manifest[base] = await writeVariants(f, base, widths, Array.isArray(cfg) ? undefined : cfg.tone);
}

// crop 4:3 dedicato alle card (e box 4:3 delle pagine prodotto)
for (const [f, cfg] of Object.entries(CROPS)) {
  if (!existsSync(f)) continue;
  const meta = await sharp(f).metadata();
  const base = `${basename(f, extname(f))}_card`;
  const entry = { width: meta.width, height: meta.height, variants: {} };
  for (const w of cfg.widths) {
    if (w > meta.width) continue;
    // ritaglio 4:3 con gravità verticale posY
    let cropW, cropH, left, top;
    if (meta.width / meta.height > 4 / 3) {
      cropH = meta.height;
      cropW = Math.round((meta.height * 4) / 3);
      left = Math.round((meta.width - cropW) / 2);
      top = 0;
    } else {
      cropW = meta.width;
      cropH = Math.round((meta.width * 3) / 4);
      left = 0;
      top = Math.round((meta.height - cropH) * (cfg.posY ?? 0.5));
    }
    const src = sharp(f)
      .extract({ left, top, width: cropW, height: cropH })
      .resize({ width: w, withoutEnlargement: true });
    const webp = `public/img/${base}-${w}.webp`;
    const avif = `public/img/${base}-${w}.avif`;
    if (!existsSync(webp)) await src.clone().webp({ quality: 74 }).toFile(webp);
    if (!existsSync(avif)) await src.clone().avif({ quality: 44 }).toFile(avif);
    const m = await sharp(webp).metadata();
    entry.variants[w] = { width: m.width, height: m.height };
    console.log('OK', base, w, `${(await sharp(avif).metadata()).size / 1024 | 0}KB avif`);
  }
  manifest[base] = entry;
}

writeFileSync('scripts/img-manifest.json', JSON.stringify(manifest, null, 2));
console.log('manifest written');
