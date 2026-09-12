import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/**
 * Misura la densità delle pagine costruite (dist/): parole nel <main>,
 * numero di sezioni, h2/h3, FAQ, paragrafi e immagini.
 *
 * Non è un test pass/fail: serve a tenere d'occhio la regola di questo sito —
 * la home resta compatta (il contenuto SEO vive nelle pagine di destinazione) e
 * le pagine commerciali non diventano enciclopediche. Le guide sono l'unico
 * posto dove il testo lungo è voluto.
 *
 * Uso: node scripts/density.mjs [--soglia 1200]
 */

const SOGLIA = (() => {
  const i = process.argv.indexOf('--soglia');
  return i > -1 ? Number(process.argv[i + 1]) : 1200;
})();

const findPages = (dir = 'dist', out = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) findPages(full, out);
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
};

const strip = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

const rows = [];
for (const file of findPages()) {
  const h = readFileSync(file, 'utf8');
  const main = h.match(/<main[\s\S]*?<\/main>/)?.[0];
  if (!main) continue;
  const rel = relative('dist', file).split(sep).join('/');
  const page = rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '')}`;
  rows.push({
    page,
    guide: page.startsWith('/guide/'),
    words: strip(main).split(' ').filter(Boolean).length,
    sections: (main.match(/<section/g) || []).length,
    h2: (main.match(/<h2/g) || []).length,
    h3: (main.match(/<h3/g) || []).length,
    faq: (main.match(/<details/g) || []).length,
    p: (main.match(/<p[\s>]/g) || []).length,
    img: (main.match(/<img/g) || []).length,
  });
}

rows.sort((a, b) => b.words - a.words);
console.log(
  'pagina'.padEnd(56) + 'parole   sez  h2  h3  faq   p  img'
);
let dense = 0;
for (const r of rows) {
  const mark = !r.guide && r.words > SOGLIA ? ' ⚠' : '';
  if (mark) dense++;
  console.log(
    r.page.padEnd(56) +
      String(r.words).padStart(6) +
      String(r.sections).padStart(6) +
      String(r.h2).padStart(4) +
      String(r.h3).padStart(4) +
      String(r.faq).padStart(5) +
      String(r.p).padStart(4) +
      String(r.img).padStart(5) +
      mark
  );
}
console.log(
  `\n${rows.length} pagine · soglia ${SOGLIA} parole (guide escluse): ` +
    (dense === 0 ? 'nessuna pagina troppo densa' : `${dense} pagine da alleggerire`)
);
