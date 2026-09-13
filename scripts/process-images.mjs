import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, renameSync, readdirSync } from 'node:fs';
import { basename, extname } from 'node:path';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 8);
const hashOfFile = (p) => hashOf(readFileSync(p));

const WIDTHS = {
  'hero-bg.jpg': [{ base: 'hero_bg', widths: [1600, 1200, 800, 640, 480] }],
  // Sfondo della hero della home: gli apiari visti da lontano. La sorgente è un
  // PNG (1672×941) — il nome dice .jpg ma il contenuto è PNG, quindi il file è
  // stato rinominato. Le larghezze sono le stesse di `hero_bg`, che sostituisce.
  'apiari-hd.png': [{ base: 'apiari_hd', widths: [1600, 1200, 800, 640, 480] }],
  'miele_acacia.jpg': [{ base: 'miele_di_acacia', widths: [400, 300] }],
  'miele_castagno.jpg': [{ base: 'miele_di_castagno', widths: [600, 400] }],
  'miele_millefiori_tiglio_e_alianto.jpg': [
    { base: 'miele_millefiori_primaverile', widths: [600, 400] },
    { base: 'miele_millefiori_estivo_ailanto', widths: [600, 400] },
  ],
  'miele_millefiori_tiglio_e_more.jpg': [{ base: 'miele_millefiori_estivo_more', widths: [600, 400] }],
  'raffaele-sorridente-con-le-sue-api.jpg': [{ base: 'raffaele_sorridente_con_le_sue_api', widths: [1000, 600, 400] }],
  'raffaele_con_suo_padre.jpg': [600, 400],
  'raffaele.png': [800, 480, 300],
  // Foto di sciami / nuclei / apiario (pagina /nuclei-api/): una sola larghezza
  // massima per base, così funzionano sia gli scatti orizzontali sia i verticali.
  'sciami1.jpg': { base: 'sciame_1', widths: [1200, 900, 600, 400] },
  'sciami2.jpg': { base: 'sciame_2', widths: [1200, 900, 600, 400] },
  'sciami3.jpg': { base: 'sciame_3', widths: [1200, 900, 600, 400] },
  'sciami4.jpg': { base: 'sciame_4', widths: [1200, 900, 600, 400] },
  'sciami5.jpg': { base: 'sciame_5', widths: [1200, 900, 600, 400] },
  'sciami6.jpg': { base: 'sciame_6', widths: [1200, 900, 600, 400] },
  'sciami7.jpg': { base: 'sciame_7', widths: [1200, 900, 600, 400] },
  // Foto reale dell'ape regina dell'apiario (pagina /api-regine/)
  'ape_regina_di_raffaele.jpg': { base: 'ape_regina_di_raffaele', widths: [1200, 900, 600, 400] },
  // Arnie piene di api (card dei nuclei, testo di /miele/, gallery di /api-regine/).
  // `arnia-piena-di-api2.jpg` non è più usata: sul blocco prodotto di
  // /nuclei-api/ c'è `sciame_4`. Per riaverla basta rimettere la sua riga.
  'arnia-piena-di-api.jpg': { base: 'arnia_piena_di_api', widths: [1200, 900, 600, 400] },
  // Miele in favo: foto del titolare (sorgente PNG 1264×1188, quasi quadrata).
  // Stesse larghezze delle altre foto di prodotto: sul blocco prodotto di
  // /miele/miele-in-favo/ la foto sta in una colonna da 520px, quindi 1200 basta
  // anche a DPR 2.
  'miele-in-favo.png': { base: 'miele_in_favo', widths: [1200, 900, 600, 400] },
  // Sequenza del miele in favo ricavata dal video (478×850, verticale): le foto
  // sono numerate nell'ordine d'uso, dal favo ancora attaccato all'assaggio.
  'miele-in-favo-1.avif': { base: 'miele_in_favo_1', widths: [400] },
  'miele-in-favo-2.avif': { base: 'miele_in_favo_2', widths: [400] },
  'miele-in-favo-3.avif': { base: 'miele_in_favo_3', widths: [400] },
  'miele-in-favo-4.avif': { base: 'miele_in_favo_4', widths: [400] },
  'miele-in-favo-5.avif': { base: 'miele_in_favo_5', widths: [400] },
  'miele-in-favo-6.avif': { base: 'miele_in_favo_6', widths: [400] },
};

const CROPS = {
  'miele_millefiori_tiglio_e_alianto.jpg': { base: 'miele_millefiori_card', widths: [800, 480, 300], posY: 0.7 },
};

const normalize = (f, cfg) => {
  if (Array.isArray(cfg) && typeof cfg[0] === 'number') return [{ base: basename(f, extname(f)), widths: cfg }];
  if (Array.isArray(cfg)) return cfg;
  return [cfg];
};

const manifest = JSON.parse(
  existsSync('scripts/img-manifest.json')
    ? readFileSync('scripts/img-manifest.json', 'utf8')
    : '{}'
);

/**
 * Tiene una sola versione per immagine: AVIF. Cancella quindi ogni file della
 * base che non sia .avif (le vecchie varianti webp) e le varianti stale.
 */
function pruneNonAvif(base) {
  let files = [];
  try { files = readdirSync(OUT); } catch { return; }
  for (const f of files) {
    if (!f.startsWith(`${base}-`)) continue;
    if (f.endsWith('.avif')) continue;
    rmSync(`${OUT}/${f}`);
    console.log('RIMOSSO', f, '(non avif)');
  }
}

function cleanupOld(base, widths, keepHash) {
  let files = [];
  try { files = readdirSync(OUT); } catch { return; }
  for (const w of widths) {
    for (const ext of ['avif']) {
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
    const avif = `${OUT}/${base}-${w}-${hash}.avif`;
    if (!existsSync(avif)) {
      await sharp(src).resize({ width: w, withoutEnlargement: true }).avif({ quality: 44 }).toFile(avif);
    }
    const m = await sharp(avif).metadata();
    entry.variants[w] = { width: m.width, height: m.height };
    console.log('OK', base, w, `${(await sharp(avif).metadata()).size / 1024 | 0}KB avif`);
  }
  cleanupOld(base, widths, hash);
  pruneNonAvif(base);
  return entry;
}

const srcs = Object.keys(WIDTHS).filter((f) => existsSync(f));
for (const f of srcs) {
  const hash = hashOfFile(f);
  for (const { base, widths } of normalize(f, WIDTHS[f])) {
    manifest[base] = await writeVariants(f, base, widths, hash);
  }
}

for (const [f, cfg] of Object.entries(CROPS)) {
  if (!existsSync(f)) continue;
  const hash = hashOfFile(f);
  const meta = await sharp(f).metadata();
  const base = cfg.base;
  const entry = { width: meta.width, height: meta.height, hash, variants: {} };
  for (const w of cfg.widths) {
    if (w > meta.width) continue;

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
    const avif = `${OUT}/${base}-${w}-${hash}.avif`;
    if (!existsSync(avif)) {
      await sharp(f)
        .extract({ left, top, width: cropW, height: cropH })
        .resize({ width: w, withoutEnlargement: true })
        .avif({ quality: 44 })
        .toFile(avif);
    }
    const m = await sharp(avif).metadata();
    entry.variants[w] = { width: m.width, height: m.height };
    console.log('OK', base, w, `${(await sharp(avif).metadata()).size / 1024 | 0}KB avif`);
  }
  cleanupOld(base, cfg.widths, hash);
  pruneNonAvif(base);
  manifest[base] = entry;
}

// Regola del progetto: in public/img vive solo AVIF. Questa passata finale
// elimina qualsiasi file di altro formato rimasto, anche di basi che non sono
// state riprocessate in questa esecuzione (sorgente assente).
let rimossi = 0;
for (const f of readdirSync(OUT)) {
  if (f.endsWith('.avif')) continue;
  rmSync(`${OUT}/${f}`);
  rimossi++;
}
if (rimossi) console.log('RIMOSSI', rimossi, 'file non avif da', OUT);

writeFileSync('scripts/img-manifest.json', JSON.stringify(manifest, null, 2));
writeFileSync('src/data/img-manifest.js', 'export default ' + JSON.stringify(manifest, null, 2) + ';\n');
console.log('manifest written');
