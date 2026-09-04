import { mkdirSync, writeFileSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public/fonts');
const CSS_DEST = join(ROOT, 'src/assets/fonts.css');

const FONTS = [
  { family: 'fraunces', display: 'Fraunces', weights: ['600', '700'] },
  { family: 'inter', display: 'Inter', weights: ['400', '500', '700'] },
  { family: 'caveat', display: 'Caveat', weights: ['500', '700'] },
];

mkdirSync(OUT, { recursive: true });

const css = [];
for (const f of FONTS) {
  for (const w of f.weights) {
    const name = `${f.family}-${w}-latin`;
    const url = `https://cdn.jsdelivr.net/npm/@fontsource/${f.family}@5/files/${name}-normal.woff2`;
    const dest = join(OUT, `${name}.woff2`);
    if (!existsSync(dest)) {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`MISS ${url} -> ${res.status}`);
        process.exit(1);
      }
      const buf = Buffer.from(await res.arrayBuffer());
      writeFileSync(dest, buf);
      console.log(`OK ${dest} (${(buf.length / 1024).toFixed(0)}KB)`);
    } else {
      console.log(`skip ${dest}`);
    }
    css.push(`@font-face {
  font-family: '${f.display}';
  font-style: normal;
  font-weight: ${w};
  font-display: swap;
  src: url('/fonts/${name}.woff2') format('woff2');
}`);
  }
}
writeFileSync(CSS_DEST, css.join('\n') + '\n');
console.log(`${CSS_DEST} written`);

const validNames = new Set(
  FONTS.flatMap((f) => f.weights.map((w) => `${f.family}-${w}-latin.woff2`)),
);
for (const f of readdirSync(OUT)) {
  if ((f.endsWith('.woff2') || f === 'fonts.css') && !validNames.has(f)) {
    unlinkSync(join(OUT, f));
    console.log(`removed stale ${f}`);
  }
}
