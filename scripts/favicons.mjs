// Genera favicons (PNG, ICO, apple-touch-icon) dal logo SVG.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = 'public/logo.svg';
const sizes = [16, 32, 48, 180, 192];

const pngs = {};
for (const s of sizes) {
  const buf = await sharp(svg).resize(s, s).png().toBuffer();
  pngs[s] = buf;
  writeFileSync(`public/favicon-${s}.png`, buf);
  console.log('OK favicon-' + s + '.png');
}

writeFileSync('public/apple-touch-icon.png', pngs[180]);
console.log('OK apple-touch-icon.png');

// favicon.ico: contenitore ICO con PNG 16 + 32
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // riservato
  header.writeUInt16LE(1, 2); // tipo icona
  header.writeUInt16LE(entries.length, 4);
  const dirs = [];
  const datas = [];
  let offset = 6 + 16 * entries.length;
  for (const [size, buf] of entries) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size === 256 ? 0 : size, 0);
    dir.writeUInt8(size === 256 ? 0 : size, 1);
    dir.writeUInt8(0, 2);
    dir.writeUInt8(0, 3);
    dir.writeUInt16LE(1, 4); // piani colore
    dir.writeUInt16LE(32, 6); // bit per pixel
    dir.writeUInt32LE(buf.length, 8);
    dir.writeUInt32LE(offset, 12);
    dirs.push(dir);
    datas.push(buf);
    offset += buf.length;
  }
  return Buffer.concat([header, ...dirs, ...datas]);
}

writeFileSync('public/favicon.ico', ico([[16, pngs[16]], [32, pngs[32]]]));
console.log('OK favicon.ico');
