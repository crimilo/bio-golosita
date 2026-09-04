import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const [input, output] = process.argv.slice(2);
const meta = await sharp(input).metadata();
const W = meta.width;
const H = meta.height;
const boxH = Math.round((W * 3) / 4);

if (H <= boxH) {
  await sharp(input).toFile(output);
  console.log(`gia' 4:3 (o piu' largo): ${W}x${H}`);
  process.exit(0);
}

const isHoney = (r, g, b) => r > g && g > b && r > 85 && r - b > 35;

let best = { top: 0, score: -1 };
const steps = Math.max(1, Math.floor((H - boxH) / 60));
for (let top = 0; top <= H - boxH; top += 60) {
  const { data, info } = await sharp(input)
    .extract({ left: 0, top, width: W, height: boxH })
    .resize({ width: 160 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let honey = 0;
  const total = info.width * info.height;
  for (let i = 0; i < data.length; i += 4) {
    if (isHoney(data[i], data[i + 1], data[i + 2])) honey++;
  }
  const score = honey / total;
  if (score > best.score) best = { top, score };
}

for (let top = Math.max(0, best.top - 60); top <= Math.min(H - boxH, best.top + 60); top += 15) {
  const { data, info } = await sharp(input)
    .extract({ left: 0, top, width: W, height: boxH })
    .resize({ width: 160 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let honey = 0;
  const total = info.width * info.height;
  for (let i = 0; i < data.length; i += 4) {
    if (isHoney(data[i], data[i + 1], data[i + 2])) honey++;
  }
  const score = honey / total;
  if (score > best.score) best = { top, score };
}

await sharp(input).extract({ left: 0, top: best.top, width: W, height: boxH }).toFile(output);
console.log(`crop migliore a top=${best.top} (score ${(best.score * 100).toFixed(1)}% miele) -> ${output} ${W}x${boxH}`);
