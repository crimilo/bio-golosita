import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, rmSync, readdirSync } from 'node:fs';
import path from 'node:path';

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 8);

// Sorgenti jpg nella root (fuori da public/: non vanno servite), come le
// altre foto. L'output è solo AVIF.
const posters = [
  'api-che-producono-poster.jpg',
  'smielatura-poster.jpg',
  'due-api-regina-poster.jpg',
  'ape-regina-con-api-poster.jpg',
  // Miele in favo: fotogramma a 32 s del video (478×850, come il video).
  // Per cambiarlo: sostituisci il jpg e rilancia `npm run assets`, oppure
  // `ffmpeg -ss <secondi> -i <video> -frames:v 1 -q:v 2 miele-in-favo-poster.jpg`.
  'miele-in-favo-poster.jpg',
  // Video aggiunti dopo: fotogramma scelto automaticamente (il piu' "ricco" di
  // dettaglio, con preferenza per i fotogrammi in cui si vede Raffaele), dal
  // centro del video. Per rifarlo:
  // `ffmpeg -ss <secondi> -i public/video/<nome>.mp4 -frames:v 1 -q:v 2 <nome>-poster.jpg`
  'smielatura-acacia-poster.jpg',
  'smielatura-millefiori-tiglio-more-poster.jpg',
  'nascita-di-una-regina-poster.jpg',
  'marcatura-della-regina-poster.jpg',
  'api-che-producono-il-miele-poster.jpg',
  'api-che-si-creano-spazio-poster.jpg',
  'api-che-impollinano-poster.jpg',
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
