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
  // Foto di prodotto dei mieli. Il nome della sorgente è **lo slug della
  // pagina** (`/miele/<slug>/`), quindi anche il nome della base pubblicata è
  // lo slug: URL dell'immagine e URL della pagina dicono la stessa cosa.
  // Larghezze come le altre foto di prodotto: il blocco prodotto delle schede
  // ha una colonna da 520px (→ 1200 basta a DPR 2) e le card della griglia
  // stanno a ~380-400px (→ 900 copre i display DPR 2).
  'miele-di-acacia.jpg': { base: 'miele-di-acacia', widths: [1200, 900, 600, 400] },
  'miele-di-castagno.jpg': { base: 'miele-di-castagno', widths: [1200, 900, 600, 400] },
  'miele-millefiori-estivo-al-tiglio-e-more.jpg': {
    base: 'miele-millefiori-estivo-al-tiglio-e-more',
    widths: [1200, 900, 600, 400],
  },
  'miele-millefiori-estivo-al-tiglio-e-ailanto.jpg': {
    base: 'miele-millefiori-estivo-al-tiglio-e-ailanto',
    widths: [1200, 900, 600, 400],
  },
  'raffaele-sorridente-con-le-sue-api.jpg': [{ base: 'raffaele_sorridente_con_le_sue_api', widths: [1000, 600, 400] }],
  'raffaele_con_suo_padre.jpg': [600, 400],
  // `raffaele.png` → base `raffaele` (il ritratto quadrato della galleria della
  // home) è stato **ritirato**: la foto non è più usata da nessuna pagina e le
  // sue varianti sono state tolte da `public/img/`. Per riaverla: rimettere
  // qui la riga `'raffaele.png': [800, 480, 300]`, rimettere il sorgente in
  // root e rilanciare `npm run assets`.
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
  // Raffaele con i mieli pronti da spedire (pagina /consegna-miele/ e galleria
  // della home). Sorgenti verticali (1094×1479 e 1152×1501) da telefono: la
  // larghezza massima pubblicabile è 1000, perché la sorgente non arriva a
  // 1200. Il numero finale distingue le due foto, come `sciame_1` … `sciame_7`.
  'raffaele-con-mieli-pronti-da-spedire-bio-e-golosita.png': {
    base: 'raffaele_con_mieli_pronti_da_spedire',
    widths: [1000, 900, 600, 400],
  },
  'raffaele-con-mieli-pronti-da-spedire-bio-e-golosita2.png': {
    base: 'raffaele_con_mieli_pronti_da_spedire_2',
    widths: [1000, 900, 600, 400],
  },
  // Arnie piene di api (card dei nuclei, testo di /miele/, gallery di /api-regine/).
  // `arnia-piena-di-api2.jpg` non è più usata: sul blocco prodotto di
  // /nuclei-api/ c'è `sciame_4`. Per riaverla basta rimettere la sua riga.
  'arnia-piena-di-api.jpg': { base: 'arnia_piena_di_api', widths: [1200, 900, 600, 400] },
  // Miele in favo: foto del titolare (sorgente 2560×1920, 4:3 come lo slot del
  // blocco prodotto e delle card). Stesse larghezze delle altre foto di
  // prodotto: la foto sta in una colonna da 520px, quindi 1200 basta anche a
  // DPR 2.
  'miele-in-favo.jpg': { base: 'miele-in-favo', widths: [1200, 900, 600, 400] },
  // Sequenza del miele in favo ricavata dal video (478×850, verticale): le foto
  // sono numerate nell'ordine d'uso, dal favo ancora attaccato all'assaggio.
  'miele-in-favo-1.avif': { base: 'miele_in_favo_1', widths: [400] },
  'miele-in-favo-2.avif': { base: 'miele_in_favo_2', widths: [400] },
  'miele-in-favo-3.avif': { base: 'miele_in_favo_3', widths: [400] },
  'miele-in-favo-4.avif': { base: 'miele_in_favo_4', widths: [400] },
  'miele-in-favo-5.avif': { base: 'miele_in_favo_5', widths: [400] },
  'miele-in-favo-6.avif': { base: 'miele_in_favo_6', widths: [400] },
};

/**
 * Ritagli: base pubblicata costruita **tagliando** la sorgente invece di
 * ridimensionarla (foto verticali o quadrate da mostrare in un riquadro 4:3).
 * Sorgente, larghezze e `posY` (dove prendere la fascia: 0 = alto, 1 = basso).
 *
 * Al momento è **vuoto**: le foto dei mieli sono già 4:3 e riempiono gli slot
 * senza taglio, quindi la base `miele_millefiori_card` (il ritaglio 4:3 della
 * foto del millefiori) non serve più.
 */
const CROPS = {};

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

// Le basi del manifest che non hanno più nessuna variante su disco restano
// appese quando una foto viene rinominata o eliminata (il manifest si aggiorna
// per base, non si ricostruisce). Un URL costruito da una voce morta sarebbe un
// 404 silenzioso: qui si toglie. Le basi storiche senza sorgente in root ma con
// i file pubblicati (`api`, `arnie`, `apiario`) hanno i file, quindi restano.
for (const base of Object.keys(manifest)) {
  const viva = Object.keys(manifest[base].variants).some((w) =>
    existsSync(`${OUT}/${base}-${w}-${manifest[base].hash}.avif`)
  );
  if (viva) continue;
  delete manifest[base];
  console.log('RIMOSSA dal manifest', base, '(nessun file su disco)');
}

writeFileSync('scripts/img-manifest.json', JSON.stringify(manifest, null, 2));
writeFileSync('src/data/img-manifest.js', 'export default ' + JSON.stringify(manifest, null, 2) + ';\n');
console.log('manifest written');
