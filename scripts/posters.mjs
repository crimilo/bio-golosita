import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, rmSync, readdirSync } from 'node:fs';
import path from 'node:path';

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 8);

// Sorgenti jpg nella root (fuori da public/: non vanno servite), come le
// altre foto. L'output è solo AVIF.
const posters = [
  // `api-che-producono-poster.jpg` e `due-api-regina-poster.jpg` sono stati
  // ritirati insieme ai loro video (fuori dalla galleria della home): per
  // riportarli, rimettere qui le due righe e il jpg del fotogramma in root.
  'smielatura-poster.jpg',
  'ape-regina-con-api-poster.jpg',
  // Miele in favo: fotogramma a 32 s del video (478×850, come il video).
  // Per cambiarlo: sostituisci il jpg e rilancia `npm run assets`, oppure
  // `ffmpeg -ss <secondi> -i <video> -frames:v 1 -q:v 2 miele-in-favo-poster.jpg`.
  'miele-in-favo-poster.jpg',
  // Video aggiunti dopo: fotogramma scelto automaticamente (il piu' "ricco" di
  // dettaglio, con preferenza per i fotogrammi in cui si vede Raffaele), dal
  // centro del video. Per rifarlo:
  // `ffmpeg -ss <secondi> -i public/video/<nome>.mp4 -frames:v 1 -q:v 2 <nome>-poster.jpg`
  // `smielatura-acacia-poster.jpg` è stato **ritirato**: la scheda dell'acacia
  // usa il video nuovo (`smielatura-acacia-2026.mp4`), e la sorgente in root
  // (`smielatura_miele_acacia_2026.mp4`) resta ricodificabile se serve tornare
  // indietro. Per riportarlo: rimettere qui la riga e il jpg del fotogramma.
  'smielatura-millefiori-tiglio-more-poster.jpg',
  'nascita-di-una-regina-poster.jpg',
  'marcatura-della-regina-poster.jpg',
  'api-che-producono-il-miele-poster.jpg',
  'api-che-si-creano-spazio-poster.jpg',
  'api-che-impollinano-poster.jpg',
  // Regina F1 sulle covate (/api-regine/): fotogramma a 5 s, scelto misurando
  // la nitidezza (varianza del laplaciano) di dieci fotogrammi distribuiti sul
  // video e prendendo il più definito. Per cambiarlo, sostituisci il jpg e
  // rilancia `npm run assets`, oppure
  // `ffmpeg -ss <secondi> -i public/video/regina-f1-su-covate.mp4 -frames:v 1 -q:v 2 regina-f1-su-covate-poster.jpg`
  'regina-f1-su-covate-poster.jpg',
  // Mieli pronti da spedire (/consegna-miele/): fotogramma a 27 s, scelto
  // misurando la nitidezza (varianza del laplaciano) di un fotogramma al
  // secondo su tutto il girato: i primi 24 s sono mossi, da lì in poi il
  // filmato è fermo e definito, e 27 s è il più nitido di quel tratto.
  // Per cambiarlo: `ffmpeg -ss <secondi> -i public/video/mieli-pronti-da-spedire.mp4 -frames:v 1 -q:v 2 mieli-pronti-da-spedire-poster.jpg`
  'mieli-pronti-da-spedire-poster.jpg',
  // Video del raccolto 2026 (sorgenti in root: `smielatura-2026-miele-di-acacia.mp4`,
  // `filtraggio-miele-di-acacia.mp4`, `smielatura-2026-millefiori-primaverile.mp4`,
  // `riempendo-un-barattolo-di-millefiori.mp4`). Fotogramma scelto misurando la
  // nitidezza (varianza del laplaciano) di un fotogramma ogni 0,5 s su tutto il
  // girato e prendendo il più definito fra quelli non scuri: 7,5 s per la
  // smielatura dell'acacia, 1,5 s per il filtraggio, 6 s per la smielatura del
  // millefiori, 4 s per i barattoli. Per rifarli:
  // `ffmpeg -ss <secondi> -i public/video/<nome>.mp4 -frames:v 1 -q:v 2 <nome>-poster.jpg`
  'smielatura-acacia-2026-poster.jpg',
  'filtraggio-miele-di-acacia-poster.jpg',
  'smielatura-millefiori-2026-poster.jpg',
  'riempendo-un-barattolo-di-millefiori-poster.jpg',
];
for (const f of posters) {
  if (!existsSync(f)) { console.log('SKIP (jpg mancante)', f); continue; }
  const hash = hashOf(readFileSync(f));
  const base = `public/video/${f.replace('.jpg', '')}`;
  const out = `${base}-${hash}.avif`;
  if (!existsSync(out)) await sharp(f).resize({ width: 480 }).avif({ quality: 45 }).toFile(out);
  // via le vecchie versioni (webp e senza hash)
  for (const ext of ['webp', 'avif']) {
    const old = `${base}.${ext}`;
    if (existsSync(old)) rmSync(old);
  }
  // via anche le versioni con hash di altri formati
  for (const old of readdirSync('public/video')) {
    if (old.startsWith(path.basename(f, '.jpg') + '-') && !old.endsWith('.avif')) {
      rmSync(`public/video/${old}`);
      console.log('RIMOSSO public/video/' + old + ' (non avif)');
    }
  }
  console.log('OK', f, 'hash', hash);
}

// Regola del progetto: in public/video i poster sono solo AVIF (i video .mp4
// restano). Vale anche per i poster la cui sorgente jpg non c'è più.
for (const f of readdirSync('public/video')) {
  if (!f.includes('-poster-') || f.endsWith('.avif')) continue;
  rmSync(`public/video/${f}`);
  console.log('RIMOSSO public/video/' + f + ' (non avif)');
}
