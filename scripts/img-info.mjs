// Quick metadata dump for all jpg/mp4 in repo root.
import sharp from 'sharp';
import { readdirSync } from 'node:fs';

const files = readdirSync('.').filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));
for (const f of files) {
  try {
    const m = await sharp(f).metadata();
    console.log(f, `${m.width}x${m.height}`, m.format, `${Math.round(m.size / 1024)}KB`);
  } catch (e) {
    console.log(f, 'ERR', e.message);
  }
}
