import { chromium } from 'playwright-core';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import sharp from 'sharp';

/**
 * Verifica il contrasto WCAG del testo che sta SOPRA le immagini di sfondo.
 * Nasconde il testo, fotografa l'hero, campiona i pixel sotto ogni blocco di
 * testo e calcola il rapporto di contrasto peggiore.
 *
 * Criterio: il 98° percentile di luminanza nella casella del testo (quasi
 * worst-case, ma robusto a pochi pixel anomali) deve garantire ≥ 4.5:1.
 * Il campione sono le righe di testo effettive (Range.getClientRects), non la
 * casella del blocco: così l'overlay viene misurato su quello che si legge
 * davvero, e non è costretto a scurire anche lo spazio vuoto accanto.
 */

const BASE = process.env.QA_BASE ?? 'http://localhost:8091';
const MIN_RATIO = 4.5;

function findPages(dir = 'dist', out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) findPages(full, out);
    else if (entry === 'index.html') {
      const rel = relative('dist', dir);
      out.push('/' + (rel ? rel.split(sep).join('/') + '/' : ''));
    } else if (entry === '404.html') out.push('/404.html');
  }
  return out;
}

const srgb = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const contrast = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
const parseColor = (css) => {
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(',').map((v) => Number.parseFloat(v));
  return { r, g, b, a };
};

const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox'],
});

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  // larghezza intermedia: il contenitore è a tutta larghezza e la colonna di
  // testo arriva più a destra che a 1280px (zona dello scrim più delicata)
  { name: 'desktop-s', width: 1000, height: 800 },
  { name: 'mobile', width: 375, height: 812 },
];

const pages = findPages().sort();
let failures = 0;
const rows = [];
const margins = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const path of pages) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts?.ready);

  const hero = page.locator('.hero--bg, .page-hero--bg').first();
  if ((await hero.count()) === 0) continue;

  // 1. caselle e colori del testo presente nella hero
  const items = await hero.evaluate((root) => {
    // i .btn della hero contano: il bottone "ghost" sta sopra la foto e il
    // suo testo deve restare leggibile
    const sel = 'h1, p, .eyebrow, .breadcrumbs a, .breadcrumbs span, .trust li, .btn';
    const out = [];
    for (const el of root.querySelectorAll(sel)) {
      const text = (el.textContent || '').trim();
      if (!text) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      // Caselle delle *righe di testo* (Range), non del blocco: un h1 o un
      // breadcrumb è un blocco largo quanto il contenitore anche se il testo
      // occupa solo la prima metà. Misurare il blocco chiederebbe di scurire
      // aree vuote, cioè un overlay più forte del necessario.
      const range = document.createRange();
      range.selectNodeContents(el);
      const PAD = 2;
      const rects = [...range.getClientRects()]
        .filter((x) => x.width >= 4 && x.height >= 4)
        .map((x) => ({
          x: x.x - PAD,
          y: x.y - PAD,
          width: x.width + PAD * 2,
          height: x.height + PAD * 2,
        }));
      if (rects.length === 0) rects.push({ x: r.x, y: r.y, width: r.width, height: r.height });
      const cs = getComputedStyle(el);
      out.push({
        tag: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
        text: text.slice(0, 34),
        color: cs.color,
        fontSize: Number.parseFloat(cs.fontSize),
        fontWeight: cs.fontWeight,
        box: { x: r.x, y: r.y, width: r.width, height: r.height },
        rects,
      });
    }
    return out;
  });

  // 2. nascondo il testo (mantiene il layout) e fotografo la hero.
  //    Nascondo anche le sovrapposizioni fisse (bottone WhatsApp): non fanno
  //    parte dello sfondo dell'hero e falserebbero la misura.
  const heroBox = await hero.boundingBox();
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('.wa-float')) el.style.visibility = 'hidden';
  });
  await hero.evaluate((root) => {
    for (const el of root.querySelectorAll('h1, p, .eyebrow, .breadcrumbs, .trust')) {
      el.style.visibility = 'hidden';
    }
    for (const el of root.querySelectorAll('.btn')) {
      el.style.color = 'transparent';
    }
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  const shot = await page.screenshot({
    clip: {
      x: Math.max(0, heroBox.x),
      y: Math.max(0, heroBox.y),
      width: Math.min(heroBox.width, vp.width),
      height: Math.min(heroBox.height, vp.height),
    },
  });
  await hero.evaluate((root) => {
    for (const el of root.querySelectorAll('h1, p, .eyebrow, .breadcrumbs, .trust')) {
      el.style.visibility = '';
    }
    for (const el of root.querySelectorAll('.btn')) {
      el.style.color = '';
    }
  });
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('.wa-float')) el.style.visibility = '';
  });

  const raw = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
  const { width: imgW, height: imgH, channels } = raw.info;

  for (const it of items) {
    const fg = parseColor(it.color);
    if (!fg) continue;
    if (fg.a < 1) {
      // Un testo semitrasparente sopra una foto non è verificabile con questa
      // misura: piuttosto che dire "a posto" a scatola chiusa, è un problema.
      failures++;
      rows.push(
        `  ✗ ${path} ${it.tag}: colore non opaco (${it.color}) → contrasto non calcolabile, rendilo opaco`
      );
      continue;
    }
    const fgL = luminance(fg.r, fg.g, fg.b);

    // campiono nell'immagine della hero solo le righe di testo di questo elemento
    const lums = [];
    for (const rc of it.rects ?? [it.box]) {
      const left = Math.max(0, Math.round(rc.x - heroBox.x));
      const top = Math.max(0, Math.round(rc.y - heroBox.y));
      const width = Math.min(Math.round(rc.width), imgW - left);
      const height = Math.min(Math.round(rc.height), imgH - top);
      if (width < 2 || height < 2) continue;
      for (let y = top; y < top + height; y++) {
        for (let x = left; x < left + width; x++) {
          const i = (y * imgW + x) * channels;
          lums.push(luminance(raw.data[i], raw.data[i + 1], raw.data[i + 2]));
        }
      }
    }
    if (lums.length === 0) continue;
    lums.sort((a, b) => a - b);
    const p98 = lums[Math.min(lums.length - 1, Math.floor(lums.length * 0.98))];
    const max = lums[lums.length - 1];
    const ratio = contrast(fgL, p98);
    const ok = ratio >= MIN_RATIO;

    if (!ok) {
      failures++;
      rows.push(
        `  ✗ [${vp.name}] ${path} ${it.tag} "${it.text}" ${ratio.toFixed(2)}:1 (richiesto ${MIN_RATIO}) — caso peggiore ${contrast(fgL, max).toFixed(2)}:1, font ${it.fontSize}px`
      );
    } else {
      margins.push({ ratio: contrast(fgL, max), path, vp: vp.name, tag: it.tag });
      if (process.env.QA_VERBOSE) rows.push(`  ✓ [${vp.name}] ${path} ${it.tag} ${ratio.toFixed(2)}:1`);
    }
  }
  }

  await ctx.close();
}

await browser.close();
console.log(rows.join('\n'));

margins.sort((a, b) => a.ratio - b.ratio);
console.log('\nMargini più stretti (contrasto sul pixel peggiore della casella):');
for (const m of margins.slice(0, 6)) {
  console.log(`  ${m.ratio.toFixed(2)}:1  [${m.vp}] ${m.path} ${m.tag}`);
}

console.log(
  failures === 0
    ? `\nCONTRASTO: TUTTO OK (minimo richiesto ${MIN_RATIO}:1, su ${VIEWPORTS.map((v) => v.width + 'px').join(' / ')})`
    : `\nCONTRASTO: ${failures} problemi (testi sotto ${MIN_RATIO}:1 o non verificabili)`
);
process.exit(failures === 0 ? 0 : 1);
