// Convert video poster jpgs to webp/avif at display size.
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const posters = [
  'public/video/api-che-producono-poster.jpg',
  'public/video/smielatura-poster.jpg',
  'public/video/due-api-regina-poster.jpg',
];
for (const f of posters) {
  for (const [ext, opts] of [['webp', { quality: 62 }], ['avif', { quality: 45 }]]) {
    const out = f.replace('.jpg', `.${ext}`);
    if (!existsSync(out)) await sharp(f).resize({ width: 480 }).toFormat(ext, opts).toFile(out);
  }
  console.log('OK', f);
}
