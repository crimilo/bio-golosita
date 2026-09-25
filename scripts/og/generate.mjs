/**
 * Genera un'immagine OG (1200×630, JPG) per ogni pagina in `src/data/og.js`.
 *
 * Da HTML+CSS a screenshot: il layout sta qui (template `.og`), il copy in
 * `pages.mjs`, e le foto sono quelle già pubblicate in `public/img/` (AVIF,
 * full-bleed con `object-fit: cover`).
 *
 * Usa Chromium headless da riga di comando (come la ricetta documentata nel
 * README), quindi non serve nessuna dipendenza in più oltre a `sharp`, che
 * arriva già con Astro:
 *  - `--dump-dom` su una pagina che misura sé stessa → geometria e righe;
 *  - `--screenshot` a DPR 2 → il JPG finale, a DPR 1 con il testo nascosto →
 *    i pixel dello sfondo, per misurare il contrasto reale.
 *
 * Prima di scrivere il file il render viene **verificato**, non guardato a
 * occhio: overflow, testo fuori dai margini, gap tra i blocchi, righe del
 * titolo, budget di parole, foto davvero caricata e contrasto del testo
 * sullo sfondo. Se una pagina non passa, la generazione si ferma con errore.
 *
 * Uso: node scripts/og/generate.mjs [slug ...]
 */
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import manifest from '../../src/data/img-manifest.js';
import { ogPages } from '../../src/data/og.js';
import { copy } from './pages.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');
const OUT_DIR = resolve(ROOT, 'public/og');
const CHROMIUM = process.env.CHROMIUM_PATH || '/usr/bin/chromium';

const W = 1200;
const H = 630;
const PAD = 56; // padding di `.og-inner`: il testo non può avvicinarsi di più al bordo
const MIN_CONTRAST = 4.5; // WCAG AA per testo normale, come qa-contrast.mjs
const MAX_H1_WORDS = 8;
const MAX_SUB_WORDS = 16;
const MAX_CHIPS = 3;
/** Sotto questa deviazione di luminanza lo sfondo è piatto: la foto non è carica. */
const MIN_PHOTO_STDDEV = 3;

/** Colore del testo, per il calcolo del contrasto. `.foot` usa l'ambra del numero. */
const TEXT_COLOR = { '.eyebrow': '#f4cf85', '.foot': '#f4cf85' };

const fontUrl = (f) => pathToFileURL(join(ROOT, 'public/fonts', f)).href;
const LOGO = pathToFileURL(join(ROOT, 'public/logo.svg')).href;

/** File AVIF della base, alla variante più grande utile (1600px se c'è). */
function bgFile(base) {
  const e = manifest[base];
  if (!e) throw new Error(`Immagine non nel manifest: ${base}`);
  const ws = Object.keys(e.variants).map(Number).sort((a, b) => a - b);
  const pick = ws.filter((w) => w <= 1600).pop() ?? ws[ws.length - 1];
  return pathToFileURL(join(ROOT, 'public/img', `${base}-${pick}-${e.hash}.avif`)).href;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Misura sé stessa mentre Chromium la carica e scrive il risultato in
 * `<script id="og-metrics">`, che `--dump-dom` restituisce. Le coordinate sono
 * relative a `.og` (1200×630 fissi), quindi non dipendono dal viewport.
 */
const METRICS_SCRIPT = `<script id="og-metrics" type="application/json">PENDING</script>
<script>
(async () => {
  const out = {};
  try {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
    const og = document.querySelector('.og').getBoundingClientRect();
    const q = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      // L'"inchiostro" del testo: il rettangolo dei contenuti, non del blocco.
      // Serve perché un blocco può restare dentro i margini mentre una riga
      // senza spazi esce e viene tagliata da overflow:hidden.
      let ink = null;
      try {
        const range = document.createRange();
        range.selectNodeContents(el);
        const ir = range.getBoundingClientRect();
        if (ir.width || ir.height) ink = { x: ir.x - og.x, y: ir.y - og.y, right: ir.right - og.x, bottom: ir.bottom - og.y };
      } catch (e) { /* nodo vuoto: nessun inchiostro */ }
      return {
        x: r.x - og.x, y: r.y - og.y, w: r.width, h: r.height,
        right: r.right - og.x, bottom: r.bottom - og.y,
        lineHeight: parseFloat(cs.lineHeight) || 0, color: cs.color, ink,
      };
    };
    const items = {};
    for (const sel of ['.top', '.brand', '.brand-name', '.badge', '.bottom', '.eyebrow', '.h1', '.sub', '.chips', '.foot']) {
      items[sel] = q(sel);
    }
    const h1 = items['.h1'];
    out.items = items;
    out.h1Lines = h1 && h1.lineHeight ? Math.round(h1.h / h1.lineHeight) : 0;
    out.doc = { w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight };
    out.imgs = [...document.images].map((i) => ({ src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight }));
  } catch (e) {
    out.error = String(e && e.stack ? e.stack : e);
  }
  document.getElementById('og-metrics').textContent = JSON.stringify(out);
})();
</script>`;

/** Markup degli elementi di testo (fuori dallo `<style>`, per non duplicarlo). */
function bodyHtml(page) {
  const chips = page.chips
    .map((c, i) => `<li class="chip${i === 0 ? ' chip--lead' : ''}">${esc(c)}</li>`)
    .join('');
  const lines = page.title.map(esc).join('<br>');
  return `<div class="og">
    <div class="og-bg"><img src="${bgFile(page.bg)}" alt=""></div>
    <div class="og-scrim"></div>
    <div class="og-inner">
      <div class="top">
        <div class="brand">
          <img src="${LOGO}" alt="">
          <div>
            <div class="brand-name">Bio &amp; Golosit&agrave;</div>
            <div class="brand-sub">miele di api proprie &middot; Parco Adda Nord e Alta Val Brembana</div>
          </div>
        </div>
        <div class="badge">${esc(page.badge)}</div>
      </div>
      <div class="bottom">
        <div class="copy">
          <span class="eyebrow">${esc(page.eyebrow)}</span>
          <div class="h1">${lines}</div>
          <p class="sub">${esc(page.sub)}</p>
          <ul class="chips">${chips}</ul>
        </div>
        <div class="foot">
          <span class="tel">+39 351 537 6719</span>
          <span class="sep">&middot;</span>
          <span>bioegolosita.it</span>
        </div>
      </div>
    </div>
  </div>`;
}

function html(page, { hideText = false } = {}) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<style>
  @font-face { font-family:'Fraunces'; font-style:normal; font-weight:700; font-display:block; src:url('${fontUrl('fraunces-700-latin.woff2')}') format('woff2'); }
  @font-face { font-family:'Inter'; font-style:normal; font-weight:400; font-display:block; src:url('${fontUrl('inter-400-latin.woff2')}') format('woff2'); }
  @font-face { font-family:'Inter'; font-style:normal; font-weight:700; font-display:block; src:url('${fontUrl('inter-700-latin.woff2')}') format('woff2'); }
  @font-face { font-family:'Caveat'; font-style:normal; font-weight:500; font-display:block; src:url('${fontUrl('caveat-500-latin.woff2')}') format('woff2'); }

  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:${W}px; height:${H}px; overflow:hidden; }
  body { font-family:'Inter', system-ui, sans-serif; background:#3a2108; color:#fff; }
  .og { position:relative; width:${W}px; height:${H}px; overflow:hidden; }

  .og-bg { position:absolute; inset:0; }
  .og-bg img { display:block; width:100%; height:100%; object-fit:cover; object-position:${page.pos ?? '50% 50%'}; }

  /* Velo caldo color miele (non nero): verticale per la leggibilità in alto e
     in basso, laterale perché il testo sta a sinistra. È il velo a garantire il
     contrasto, non il colore del testo; l'alpha resta basso sul lato destro,
     così la foto si vede. Il contrasto effettivo viene misurato pagina per
     pagina, non stimato. */
  .og-scrim {
    position:absolute; inset:0;
    background:
      linear-gradient(180deg, rgba(44,25,7,0.71) 0%, rgba(58,33,10,0.43) 46%, rgba(84,48,14,0.64) 84%, rgba(78,44,13,0.88) 100%),
      linear-gradient(94deg, rgba(36,20,6,0.71) 0%, rgba(46,26,8,0.50) 58%, rgba(60,34,10,0.20) 100%);
  }

  .og-inner { position:absolute; inset:0; padding:${PAD}px; display:flex; flex-direction:column; justify-content:space-between; }
  ${hideText ? '.og-inner { visibility:hidden; }' : ''}

  .top { display:flex; align-items:flex-start; justify-content:space-between; gap:24px; }
  .brand { display:flex; align-items:center; gap:14px; }
  .brand img { width:56px; height:56px; display:block; }
  .brand-name { font-family:'Fraunces', serif; font-weight:700; font-size:29px; line-height:1.05; color:#fff; }
  .brand-sub { font-family:'Caveat', cursive; font-weight:500; font-size:20px; line-height:1; color:#f4cf85; margin-top:3px; }
  .badge { background:rgba(255,251,242,0.95); color:#33240f; border-radius:999px; padding:11px 20px; font-size:15.5px; font-weight:700; white-space:nowrap; box-shadow:0 6px 20px rgba(30,16,4,0.28); }

  .copy { max-width:900px; }
  .eyebrow { display:block; font-family:'Caveat', cursive; font-weight:500; font-size:27px; line-height:1.1; color:#f4cf85; }
  .h1 { font-family:'Fraunces', serif; font-weight:700; font-size:48px; line-height:1.06; letter-spacing:-0.01em; color:#fff; margin-top:6px; }
  .sub { font-size:19px; font-weight:700; line-height:1.45; color:rgba(255,255,255,0.94); margin-top:13px; max-width:820px; }

  /* Chip e badge sono pillole chiare opache con testo scuro: il loro contrasto
     non dipende dallo sfondo, è fisso. Il primo chip (prezzo/disponibilità) è
     ambra per staccare. */
  .chips { list-style:none; display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
  .chip { background:rgba(255,251,242,0.94); color:#33240f; border-radius:999px; padding:10px 18px; font-size:15.5px; font-weight:700; white-space:nowrap; box-shadow:0 4px 14px rgba(30,16,4,0.22); }
  .chip--lead { background:#f0c96b; }

  .foot { display:flex; align-items:center; gap:10px; font-size:16px; font-weight:700; color:rgba(255,255,255,0.9); margin-top:24px; }
  .foot .sep { opacity:0.6; }
  .foot .tel { color:#f4cf85; }
</style>
</head>
<body>
  ${bodyHtml(page)}
  ${METRICS_SCRIPT}
</body>
</html>`;
}

// ── colore e contrasto ────────────────────────────────────────────────────────

const lin = (c) => { const x = c / 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
const lumRgb = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

/** Luminanza relativa di un colore CSS `rgb()/rgba()`, appiattito sullo sfondo. */
function textLum(css, bgLum) {
  const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/.exec(css ?? '');
  if (!m) return { lum: 1, alpha: 1 };
  const alpha = m[4] === undefined ? 1 : Number(m[4]);
  const lum = lumRgb(Number(m[1]), Number(m[2]), Number(m[3]));
  return { lum: alpha * lum + (1 - alpha) * bgLum, alpha };
}

/** Luminanza di un colore esadecimale. */
const hexLum = (hex) => lumRgb((hex >> 16) & 255, (hex >> 8) & 255, hex & 255);

/** Luminanza di un colore CSS, esadecimale o `rgb()/rgba()` (appiattito sullo sfondo). */
function colorLum(css, bgLum) {
  const hex = /^#([0-9a-f]{6})$/i.exec((css ?? '').trim());
  if (hex) return { lum: hexLum(Number.parseInt(hex[1], 16)), alpha: 1 };
  return textLum(css, bgLum);
}

/** Pixel della fascia: luminanza al 90° percentile e deviazione standard. */
async function regionStats(buf, rect) {
  const left = Math.max(0, Math.round(rect.x));
  const top = Math.max(0, Math.round(rect.y));
  const width = Math.min(W - left, Math.round(rect.right) - left);
  const height = Math.min(H - top, Math.round(rect.bottom) - top);
  if (width < 2 || height < 2) return null;
  const { data, info } = await sharp(buf).extract({ left, top, width, height }).raw().toBuffer({ resolveWithObject: true });
  const lums = [];
  for (let i = 0; i < data.length; i += info.channels) lums.push(lumRgb(data[i], data[i + 1], data[i + 2]));
  lums.sort((a, b) => a - b);
  const p90 = lums[Math.min(lums.length - 1, Math.floor(lums.length * 0.9))];
  const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
  const variance = lums.reduce((a, b) => a + (b - mean) ** 2, 0) / lums.length;
  return { p90, stddev: Math.sqrt(variance) * 255 };
}

/** Campiona la luminanza su tutta l'immagine (per capire se la foto è carica). */
async function imageStats(buf) {
  const { data, info } = await sharp(buf).resize(300, 158, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const lums = [];
  for (let i = 0; i < data.length; i += info.channels) lums.push(lumRgb(data[i], data[i + 1], data[i + 2]));
  const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
  const variance = lums.reduce((a, b) => a + (b - mean) ** 2, 0) / lums.length;
  return { stddev: Math.sqrt(variance) * 255, mean: mean * 255 };
}

// ── controlli ─────────────────────────────────────────────────────────────────

/** Controlli di geometria + copy. Ritorna l'elenco dei problemi. */
function check(page, m) {
  const bad = [];
  const { items } = m;
  if (m.doc.w > W || m.doc.h > H) bad.push(`documento in overflow: ${m.doc.w}×${m.doc.h}`);
  for (const [sel, r] of Object.entries(items)) {
    if (!r) { bad.push(`${sel} non trovato`); continue; }
    if (r.x < PAD - 2 || r.right > W - PAD + 2) bad.push(`${sel} fuori dai margini laterali: x=${r.x.toFixed(0)} right=${r.right.toFixed(0)}`);
    if (r.y < PAD - 2 || r.bottom > H - PAD + 2) bad.push(`${sel} fuori dai margini verticali: y=${r.y.toFixed(0)} bottom=${r.bottom.toFixed(0)}`);
    if (r.ink) {
      const oob = [];
      if (r.ink.x < PAD - 2) oob.push(`x=${r.ink.x.toFixed(0)}`);
      if (r.ink.right > W - PAD + 2) oob.push(`right=${r.ink.right.toFixed(0)}`);
      if (r.ink.y < PAD - 2) oob.push(`y=${r.ink.y.toFixed(0)}`);
      if (r.ink.bottom > H - PAD + 2) oob.push(`bottom=${r.ink.bottom.toFixed(0)}`);
      if (oob.length) bad.push(`testo di ${sel} oltre i margini (${oob.join(' ')}): verrebbe tagliato`);
    }
  }
  const gap = (a, b) => (items[a] && items[b] ? items[b].y - items[a].bottom : null);
  for (const [a, b, min] of [['.eyebrow', '.h1', 4], ['.h1', '.sub', 8], ['.sub', '.chips', 10], ['.chips', '.foot', 12]]) {
    const g = gap(a, b);
    if (g !== null && g < min) bad.push(`gap ${a}→${b} troppo stretto: ${g.toFixed(1)}px (min ${min})`);
  }
  if (items['.brand'] && items['.badge'] && items['.brand'].right + 20 > items['.badge'].x) {
    bad.push(`logo e badge si toccano: brand.right=${items['.brand'].right.toFixed(0)} badge.x=${items['.badge'].x.toFixed(0)}`);
  }
  if (items['.top'] && items['.bottom'] && items['.top'].bottom > items['.bottom'].y) {
    bad.push('blocco alto e blocco testo si sovrappongono');
  }
  if (m.h1Lines > 2) bad.push(`titolo su ${m.h1Lines} righe (max 2)`);
  if (m.h1Lines !== page.title.length) bad.push(`titolo: ${m.h1Lines} righe a schermo vs ${page.title.length} previste (una riga va a capo da sola)`);
  const h1w = page.title.reduce((n, l) => n + words(l), 0);
  if (h1w > MAX_H1_WORDS) bad.push(`titolo di ${h1w} parole (max ${MAX_H1_WORDS})`);
  if (words(page.sub) > MAX_SUB_WORDS) bad.push(`sottotitolo di ${words(page.sub)} parole (max ${MAX_SUB_WORDS})`);
  if (page.chips.length > MAX_CHIPS) bad.push(`${page.chips.length} chip (max ${MAX_CHIPS})`);
  if ((page.eyebrow ?? '').length > 44) bad.push(`occhiello lungo ${page.eyebrow.length} caratteri`);
  if ((page.badge ?? '').length > 24) bad.push(`badge lungo ${page.badge.length} caratteri`);
  for (const img of m.imgs ?? []) {
    if (!img.w || !img.h) bad.push(`immagine non caricata: ${img.src.split('/').pop()}`);
  }
  return bad;
}

// ── esecuzione ────────────────────────────────────────────────────────────────

/** Un invio a Chromium headless. Ritorna stdout (o ''). */
function chrome(args, { capture = false } = {}) {
  const r = spawnSync(CHROMIUM, args, { encoding: 'utf8', stdio: capture ? ['ignore', 'pipe', 'pipe'] : ['ignore', 'ignore', 'pipe'] });
  if (r.status !== 0) {
    const detail = (r.stderr || '').split('\n').filter((l) => l && !/nss_util|Failed to create headless/i.test(l)).slice(-2).join(' ');
    throw new Error(`chromium exit ${r.status} ${detail}`);
  }
  return r.stdout ?? '';
}

const nf = new Intl.NumberFormat('it-IT');

async function main() {
  const filter = process.argv.slice(2);
  const missing = ogPages.filter((p) => !copy[p.slug]).map((p) => p.slug);
  if (missing.length) {
    console.error(`✗ manca il copy in scripts/og/pages.mjs per: ${missing.join(', ')}`);
    process.exitCode = 1;
    return;
  }
  const all = ogPages.map((p) => ({ ...p, ...copy[p.slug] }));
  const pages = filter.length ? all.filter((p) => filter.includes(p.slug)) : all;

  mkdirSync(OUT_DIR, { recursive: true });
  const tmp = mkdtempSync(join(tmpdir(), 'og-'));
  const profile = join(tmp, 'profile');
  const common = ['--headless=new', '--no-sandbox', '--hide-scrollbars', `--user-data-dir=${profile}`, '--virtual-time-budget=4000', '--window-size=' + W + ',' + H];

  const errors = [];
  const rows = [];

  try {
    for (const page of pages) {
      const plain = join(tmp, `${page.slug}.html`);
      const hidden = join(tmp, `${page.slug}-nobg.html`);
      writeFileSync(plain, html(page));
      writeFileSync(hidden, html(page, { hideText: true }));
      const plainUrl = pathToFileURL(plain).href;
      const hiddenUrl = pathToFileURL(hidden).href;

      const dom = chrome([...common, '--dump-dom', plainUrl], { capture: true });
      const raw = /id="og-metrics"[^>]*>([\s\S]*?)<\/script>/.exec(dom)?.[1];
      if (!raw || raw === 'PENDING') throw new Error('la pagina non ha restituito le misure');
      const m = JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
      if (m.error) throw new Error(m.error);

      const bad = check(page, m);

      // Sfondo senza testo, DPR 1: contrasto sui pixel reali sotto le righe.
      const bgPng = join(tmp, `${page.slug}-bg.png`);
      chrome([...common, `--screenshot=${bgPng}`, hiddenUrl]);
      const buf = await sharp(bgPng).png().toBuffer();

      const photo = await imageStats(buf);
      if (photo.stddev < MIN_PHOTO_STDDEV) bad.push(`sfondo piatto (dev.std ${photo.stddev.toFixed(1)}): la foto non è carica`);

      let minRatio = 99;
      let minSel = '';
      for (const sel of ['.brand-name', '.eyebrow', '.h1', '.sub', '.foot']) {
        const r = m.items[sel];
        if (!r) continue;
        const st = await regionStats(buf, r);
        if (!st) continue;
        const { lum } = colorLum(TEXT_COLOR[sel] ?? r.color, st.p90);
        const ratio = (lum + 0.05) / (st.p90 + 0.05);
        if (ratio < minRatio) { minRatio = ratio; minSel = sel; }
        if (ratio < MIN_CONTRAST) bad.push(`contrasto ${sel} ${ratio.toFixed(2)}:1 (min ${MIN_CONTRAST})`);
      }

      if (bad.length) {
        errors.push(`${page.slug}: ${bad.join('; ')}`);
        continue;
      }

      const shotPng = join(tmp, `${page.slug}-shot.png`);
      chrome([...common, '--force-device-scale-factor=2', `--screenshot=${shotPng}`, plainUrl]);
      // Il JPG viene ridimensionato ora ma scritto solo alla fine, se passano
      // tutte le pagine: così un set di immagini non resta mai mezzo aggiornato.
      const jpg = await sharp(shotPng).resize(W, H, { fit: 'fill' }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
      rows.push({
        slug: page.slug, path: page.path, file: `public/og/${page.slug}.jpg`,
        out: join(OUT_DIR, `${page.slug}.jpg`), buf: jpg,
        kb: jpg.length / 1024, contrast: minRatio, contrastSel: minSel,
        lines: m.h1Lines, chips: page.chips.length, photo: photo.stddev,
      });
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  console.log('\nOG generate\n');
  if (errors.length) {
    console.error(`✗ ${errors.length} pagine non passano i controlli — nessun file scritto:\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exitCode = 1;
    return;
  }
  for (const r of rows) writeFileSync(r.out, r.buf);
  for (const r of rows) {
    console.log(
      `  ✓ ${r.file.padEnd(46)} ${String(nf.format(Math.round(r.kb))).padStart(4)} KB  ` +
        `contrasto ${r.contrast.toFixed(2)}:1 (${r.contrastSel})  titolo ${r.lines} righe  ${r.chips} chip  → ${r.path}`
    );
  }
  console.log(
    `\n✓ ${rows.length}/${pages.length} immagini OK — nessun overflow, margini e gap a posto, ` +
      `foto caricata, contrasto ≥ ${MIN_CONTRAST}:1\n`
  );
}

await main();
