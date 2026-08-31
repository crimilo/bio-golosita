// Convert video poster jpgs to webp/avif at display size,
// with content-hashed filenames (cache-busting).
// Se il .jpg sorgente non c'è più, salta (i file già generati restano validi).
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, rmSync } from 'node:fs';

const hashOf = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 8);

const posters = [
  'public/video/api-che-producono-poster.jpg',
  'public/video/smielatura-poster.jpg',
  'public/video/due-api-regina-poster.jpg',
];
for (const f of posters) {
  if (!existsSync(f)) { console.log('SKIP (jpg mancante)', f); continue; }
  const hash = hashOf(readFileSync(f));
  const base = f.replace('.jpg', '');
  for (const [ext, opts] of [['webp', { quality: 62 }], ['avif', { quality: 45 }]]) {
    const out = `${base}-${hash}.${ext}`;
    if (!existsSync(out)) await sharp(f).resize({ width: 480 }).toFormat(ext, opts).toFile(out);
    const old = `${base}.${ext}`;
    if (existsSync(old)) rmSync(old);
  }
  console.log('OK', f, 'hash', hash);
}
