// Optimize root photos -> AVIF + WebP at target widths into public/img/
// and write a manifest (JSON + JS) with final dims for HTML width/height attributes.
//
// Nomi file versionati con content-hash: ogni variante si chiama
//   public/img/<base>-<width>-<hash>.<ext>
// dove <hash> deriva dai byte della foto sorgente. Quando una foto cambia,
// cambia l'hash e quindi l'URL: niente cache stantia (CDN/browser) dopo il deploy.
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, renameSync, readdirSync } from 'node:fs';
import { basename, extname } from 'node:path';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 8);
const hashOfFile = (p) => hashOf(readFileSync(p));

// source -> una o più basi da generare (una sorgente può alimentare più card)
const WIDTHS = {
  'hero-bg.jpg': [{ base: 'hero_bg', widths: [1600, 1200, 800, 640, 480] }],
  'miele_acacia.jpg': [{ base: 'miele_di_acacia', widths: [400, 300] }],
  'miele_castagno.jpg': [{ base: 'miele_di_castagno', widths: [600, 400] }],
  'miele_millefiori_tiglio_e_alianto.jpg': [
    { base: 'miele_millefiori_primaverile', widths: [600, 400] },
    { base: 'miele_millefiori_estivo_ailanto', widths: [600, 400] },
  ],
  'miele_millefiori_tiglio_e_more.jpg': [{ base: 'miele_millefiori_estivo_more', widths: [600, 400] }],
  'raffaele_che_mostra_larnia_in_mano.jpg': [1000, 600, 400],
  'raffaele_con_suo_padre.jpg': [600, 400],
  'raffaele.png': [800, 480, 300],
};

// crop 4:3 dedicato alle card (e box 4:3 delle pagine prodotto)
const CROPS = {
  'miele_millefiori_tiglio_e_alianto.jpg': { base: 'miele_millefiori_card', widths: [800, 480, 300], posY: 0.7 },
};

// normalizza la config di una sorgente in [{base, widths}, ...]
const normalize = (f, cfg) => {
  if (Array.isArray(cfg) && typeof cfg[0] === 'number') return [{ base: basename(f, extname(f)), widths: cfg }];
  if (Array.isArray(cfg)) return cfg;
  return [cfg];
};

// Parti dal manifest esistente: le voci di sorgenti non più presenti in root
// vengono conservate (le varianti in public/img restano in uso dal sito).
const manifest = JSON.parse(
  existsSync('scripts/img-manifest.json')
    ? readFileSync('scripts/img-manifest.json', 'utf8')
    : '{}'
);

// rimuove le varianti della stessa base non più referenziate:
// nomi senza hash e varianti con hash diversi da quello corrente (keepHash)
function cleanupOld(base, widths, keepHash) {
  let files = [];
  try { files = readdirSync(OUT); } catch { return; }
  for (const w of widths) {
    for (const ext of ['webp', 'avif']) {
      const unhashed = `${OUT}/${base}-${w}.${ext}`;
      if (existsSync(unhashed)) rmSync(unhashed);
      for (const f of files) {
        if (!f.startsWith(`${base}-${w}-`) || !f.endsWith(`.${ext}`)) continue;
        if (keepHash && f.includes(`-${keepHash}.${ext}`)) continue;
        rmSync(`${OUT}/${f}`);
      }
    }
  }
}

async function writeVariants(src, base, widths, hash) {
  const meta = await sharp(src).metadata();
  const entry = { width: meta.width, height: meta.height, hash, variants: {} };
  for (const w of widths) {
    if (w > meta.width) continue;
    let resized = sharp(src).resize({ width: w, withoutEnlargement: true });
    const webp = `${OUT}/${base}-${w}-${hash}.webp`;
    const avif = `${OUT}/${base}-${w}-${hash}.avif`;
    if (!existsSync(webp)) await resized.clone().webp({ quality: 74 }).toFile(webp);
    if (!existsSync(avif)) await resized.clone().avif({ quality: 44 }).toFile(avif);
    const m = await sharp(webp).metadata();
    entry.variants[w] = { width: m.width, height: m.height };
    console.log('OK', base, w, `${(await sharp(avif).metadata()).size / 1024 | 0}KB avif`);
  }
  cleanupOld(base, widths, hash);
  return entry;
}

const srcs = Object.keys(WIDTHS).filter((f) => existsSync(f));
for (const f of srcs) {
  const hash = hashOfFile(f);
  for (const { base, widths } of normalize(f, WIDTHS[f])) {
    manifest[base] = await writeVariants(f, base, widths, hash);
  }
}

// crop 4:3 dedicato alle card (e box 4:3 delle pagine prodotto)
for (const [f, cfg] of Object.entries(CROPS)) {
  if (!existsSync(f)) continue;
  const hash = hashOfFile(f);
  const meta = await sharp(f).metadata();
  const base = cfg.base;
  const entry = { width: meta.width, height: meta.height, hash, variants: {} };
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
    const webp = `${OUT}/${base}-${w}-${hash}.webp`;
    const avif = `${OUT}/${base}-${w}-${hash}.avif`;
    if (!existsSync(webp)) await src.clone().webp({ quality: 74 }).toFile(webp);
    if (!existsSync(avif)) await src.clone().avif({ quality: 44 }).toFile(avif);
    const m = await sharp(webp).metadata();
    entry.variants[w] = { width: m.width, height: m.height };
    console.log('OK', base, w, `${(await sharp(avif).metadata()).size / 1024 | 0}KB avif`);
  }
  cleanupOld(base, cfg.widths, hash);
  manifest[base] = entry;
}

// Voci conservate dal manifest precedente senza sorgente in root (es. api,
// apiario, arnie): assegna un hash dai byte del file esistente e rinomina
// le varianti al nuovo schema versionato.
for (const [base, entry] of Object.entries(manifest)) {
  if (entry.hash) continue;
  const largest = Math.max(...Object.keys(entry.variants).map(Number));
  const oldWebp = `${OUT}/${base}-${largest}.webp`;
  if (!existsSync(oldWebp)) continue;
  const hash = hashOfFile(oldWebp);
  entry.hash = hash;
  for (const w of Object.keys(entry.variants)) {
    for (const ext of ['webp', 'avif']) {
      const old = `${OUT}/${base}-${w}.${ext}`;
      const neu = `${OUT}/${base}-${w}-${hash}.${ext}`;
      if (existsSync(old) && !existsSync(neu)) renameSync(old, neu);
    }
  }
  console.log('OK preserved', base, 'hash', hash);
}

writeFileSync('scripts/img-manifest.json', JSON.stringify(manifest, null, 2));
writeFileSync('src/data/img-manifest.js', 'export default ' + JSON.stringify(manifest, null, 2) + ';\n');
console.log('manifest written');
