/**
 * Banner di fine video per Instagram: 1080×1920 (9:16), cinque varianti.
 *
 * Da HTML+CSS a screenshot con Chromium headless, come `scripts/og/`: qui però
 * il formato è verticale e il contenuto è uno solo — la domanda, il dominio e
 * il logo — perché questo frame **chiude il video**, non accompagna un link.
 * Il testo è quello chiesto, senza nient'altro: «Vuoi provarla anche tu?» (o
 * «Vuoi assaggiarla anche tu?» nelle due estetiche), `bioegolosita.it` e sotto
 * il dominio il logo dell'azienda (marchio + nome, come nell'header).
 *
 * Stesso disegno per tutte, cambia il fondo:
 *  - `foto`   → foto a tutta pagina con il velo caldo delle hero del sito;
 *  - `favo`   → il favo a tutta pagina, velo leggero: la variante estetica;
 *  - `acacia` → il barattolo di acacia a tutta pagina, velo leggero;
 *  - `ambra`  → la banda ambra di `.cta-band` (gradiente 135°) più la trama
 *               di esagoni, come le schede OG;
 *  - `crema`  → il fondo chiaro del sito (`--bg`) con la trama di esagoni.
 *
 * Il testo sta **al centro** e dentro l'area sicura di Instagram: la UI di
 * Reels e Stories copre la parte alta e quella bassa del frame, quindi il
 * blocco non ci entra mai (vedi `SAFE`). Il logo sta sotto il dominio, come
 * nell'header e nel footer del sito: è la presentazione del marchio che il sito
 * usa già, e in basso lo coprirebbe la didascalia di Instagram.
 *
 * Prima di scrivere i JPG il render viene verificato, non guardato a occhio:
 * overflow, testo dentro l'area sicura (anche le righe, non solo i blocchi),
 * righe del titolo, font e immagini davvero caricati, ingrandimento della foto,
 * contrasto WCAG del testo sul fondo misurato sui pixel veri della variante
 * senza testo e quota di pixel del colore del testo nell'immagine finale (se il
 * testo non c'è, si vede).
 *
 * Uso: node scripts/instagram-endcard.mjs [foto] [favo] [acacia] [ambra] [crema]
 */
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const CHROMIUM = process.env.CHROMIUM_PATH || '/usr/bin/chromium';

const W = 1080;
const H = 1920;

/**
 * Area sicura. Ai lati è il margine del testo; sopra e sotto sono lo spazio che
 * la UI di Instagram occupa sul frame (in alto l'intestazione, in basso
 * didascalia, audio e barra): il messaggio resta in mezzo e non finisce mai
 * sotto i comandi.
 */
const SAFE = { top: 250, bottom: 410, side: 96 };

/** WCAG AA per il testo normale: vale per la domanda e per il dominio. */
const MIN_CONTRAST = 4.5;
/** WCAG AA per il testo grande: ≥ 24px, oppure ≥ 18,66px in grassetto. */
const LARGE_CONTRAST = 3;
/** La domanda e il dominio restano ad AA normale anche se sono grandi: si
 *  leggono di sfuggita sul telefono, non sono un titolo da leggere con calma. */
const STRICT = ['.h1', '.domain'];

/**
 * Il copy delle varianti: la domanda cambia, il resto è identico. La dimensione
 * del titolo sta qui perché dipende da quanto è lunga la riga: «Vuoi
 * assaggiarla anche tu?» è più lungo di «Vuoi provarla anche tu?» e a 126px
 * uscirebbe dai margini (il controllo sull'inchiostro lo bloccherebbe).
 */
const COPY = {
  provarla: { lines: ['Vuoi provarla', 'anche tu?'], size: 126 },
  assaggiarla: { lines: ['Vuoi assaggiarla', 'anche tu?'], size: 108 },
};

const DOMAIN = 'bioegolosita.it';
const BRAND = 'Bio & Golosità';
const BRAND_SUB = 'miele dal 2020';

/** Trama di esagoni: lo stesso motivo delle schede OG (`scripts/og/og.html`). */
const hexPattern = (stroke, opacity) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='98' viewBox='0 0 84 98'%3E%3Cpath d='M42 25L62.8 37V61L42 73L21.2 61V37Z' fill='none' stroke='${stroke}' stroke-width='1.3' stroke-opacity='${opacity}'/%3E%3C/svg%3E`;

/**
 * Il velo caldo delle varianti fotografiche, non nero (come `.hero-bg-scrim`):
 * il centro — dove sta il testo — è più coperto, in alto e in basso la foto
 * respira. È il velo a garantire il contrasto, non il colore del testo, e
 * l'alpha è quello che serve davvero: il contrasto viene misurato, non stimato.
 * `mid` è l'alpha sul centro (dove sta il messaggio), `edge` quello sui bordi:
 * le varianti estetiche lo tengono più basso, perché lì la foto deve vedersi.
 */
const warmScrim = (mid, edge) =>
  `linear-gradient(180deg, rgba(44,25,7,${edge}) 0%, rgba(46,26,7,${(mid * 0.78).toFixed(2)}) 16%, rgba(48,27,8,${mid}) 30%, rgba(48,27,8,${mid}) 72%, rgba(46,26,7,${(mid * 0.78).toFixed(2)}) 86%, rgba(44,25,7,${edge}) 100%)`;

/**
 * Le varianti: `frameBg` è il fondo del frame (colore o gradiente), `text` i
 * quattro colori di testo, `pattern` la trama di esagoni, `photo` la foto
 * full-bleed con il suo velo (`scrim`) e `copy` la domanda. Il disegno è lo
 * stesso per tutte: cambiano il fondo, la foto e il testo.
 */
const LOOKS = [
  {
    slug: 'foto',
    label: 'foto a tutta pagina, velo caldo',
    frameBg: '#3a2108',
    photo: { file: 'miele-in-favo.jpg', position: '50% 50%' },
    scrim: warmScrim(0.64, 0.22),
    text: { h1: '#fffdf8', domain: '#fff0cf', brandName: '#fffdf8', brandSub: '#ffe9bf' },
  },
  {
    slug: 'favo',
    label: 'favo a tutta pagina (estetico)',
    copy: 'assaggiarla',
    frameBg: '#3a2108',
    photo: { file: 'miele-in-favo.jpg', position: '50% 50%' },
    scrim: warmScrim(0.48, 0.16),
    text: { h1: '#fffdf8', domain: '#fff0cf', brandName: '#fffdf8', brandSub: '#ffe9bf' },
  },
  {
    slug: 'acacia',
    label: 'barattolo di acacia a tutta pagina (estetico)',
    copy: 'assaggiarla',
    frameBg: '#3a2108',
    photo: {
      /**
       * I barattoli in root sono 1600×1200: in un 9:16 la fetta centrale va
       * ingrandita di 1,60× e il generatore lo stampa come avviso. Per una foto
       * più grande serve un altro scatto, non un'altra strada: le varianti
       * pubblicate in `public/img/` si fermano a 1200px e starebbero a 2,4×.
       */
      file: 'miele-di-acacia-latest.jpg',
      position: '50% 50%',
    },
    scrim: warmScrim(0.48, 0.16),
    text: { h1: '#fffdf8', domain: '#fff0cf', brandName: '#fffdf8', brandSub: '#ffe9bf' },
  },
  {
    slug: 'acacia-scheda',
    label: 'barattolo di acacia della scheda (estetico)',
    copy: 'assaggiarla',
    frameBg: '#3a2108',
    photo: {
      /**
       * La foto di acacia che il sito pubblica (scheda, card, immagine OG). Nello
       * stesso ritaglio 9:16 è molto più miele della `-latest` che sta nella
       * variante `acacia`: il 53% dei pixel è ambrato contro il 38%, e il verde
       * di sfondo scende dal 34% al 5%. Misurato con lo spoglio dei pixel, non a
       * occhio: è la differenza che fa leggere il fondo come «miele di acacia».
       * 1600×1200, quindi 1,60× come tutte le foto in root tranne il favo.
       */
      file: 'miele-di-acacia.jpg',
      position: '50% 50%',
    },
    scrim: warmScrim(0.48, 0.16),
    text: { h1: '#fffdf8', domain: '#fff0cf', brandName: '#fffdf8', brandSub: '#ffe9bf' },
  },
  {
    slug: 'ambra',
    label: 'banda ambra (.cta-band)',
    frameBg: 'linear-gradient(135deg, #9a6200 0%, #7f5100 58%, #6d4500 100%)',
    pattern: { stroke: '%23fffbf2', opacity: 0.1 },
    text: { h1: '#fffbf2', domain: '#fffbf2', brandName: '#fffbf2', brandSub: '#ffe9bf' },
  },
  {
    slug: 'crema',
    label: 'fondo chiaro del sito',
    frameBg: '#fffbf2',
    pattern: { stroke: '%23c77f00', opacity: 0.09 },
    text: { h1: '#33240f', domain: '#9a6200', brandName: '#33240f', brandSub: '#9a6200' },
  },
];

const nf = new Intl.NumberFormat('it-IT');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fontUrl = (f) => pathToFileURL(join(ROOT, 'public/fonts', f)).href;
const LOGO = pathToFileURL(join(ROOT, 'public/logo.svg')).href;

/** Il logo: marchio + nome, la stessa accoppiata dell'header del sito. */
const BRAND_HTML = `<div class="brand">
        <img class="mark" src="${LOGO}" alt="">
        <div class="brand-text">
          <span class="brand-name">${esc(BRAND)}</span>
          <span class="brand-sub">${esc(BRAND_SUB)}</span>
        </div>
      </div>`;

/**
 * Misura sé stessa mentre Chromium la carica e scrive il risultato in
 * `<script id="endcard-metrics">`, che `--dump-dom` restituisce. Le coordinate
 * sono relative a `.frame` (1080×1920 fissi), quindi non dipendono dal viewport.
 */
const METRICS_SCRIPT = `<script id="endcard-metrics" type="application/json">PENDING</script>
<script>
(async () => {
  const out = { items: {} };
  try {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
    const frame = document.querySelector('.frame').getBoundingClientRect();
    const q = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      // L'"inchiostro": il rettangolo dei contenuti, non del blocco. Serve
      // perché un blocco può restare dentro l'area sicura mentre una riga
      // senza spazi esce e viene tagliata da overflow:hidden.
      let ink = null;
      try {
        const range = document.createRange();
        range.selectNodeContents(el);
        const ir = range.getBoundingClientRect();
        if (ir.width || ir.height) ink = { x: ir.x - frame.x, y: ir.y - frame.y, right: ir.right - frame.x, bottom: ir.bottom - frame.y };
      } catch (e) { /* nodo vuoto: nessun inchiostro */ }
      return {
        x: r.x - frame.x, y: r.y - frame.y, w: r.width, h: r.height,
        right: r.right - frame.x, bottom: r.bottom - frame.y,
        lineHeight: parseFloat(cs.lineHeight) || 0,
        fontSize: parseFloat(cs.fontSize) || 0,
        fontWeight: Number(cs.fontWeight) || 400,
        color: cs.color, ink,
      };
    };
    for (const sel of ['.card', '.h1', '.domain', '.brand', '.mark', '.brand-name', '.brand-sub']) {
      out.items[sel] = q(sel);
    }
    const h1 = out.items['.h1'];
    out.h1Lines = h1 && h1.lineHeight ? Math.round(h1.h / h1.lineHeight) : 0;
    out.doc = { w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight };
    // I font del sito devono essere quelli caricati: un fallback cambierebbe
    // metri e aspetto senza far fallire nient'altro.
    out.fonts = ['700 100px Fraunces', '700 100px Inter', '500 100px Caveat'].filter((f) => document.fonts.check(f));
    out.imgs = [...document.images].map((i) => ({ src: (i.currentSrc || i.src).split('/').pop(), w: i.naturalWidth, h: i.naturalHeight }));
  } catch (e) {
    out.error = String(e && e.stack ? e.stack : e);
  }
  document.getElementById('endcard-metrics').textContent = JSON.stringify(out);
})();
</script>`;

function html(look, { hideText = false } = {}) {
  const photo = look.photo
    ? `.media img { object-position:${look.photo.position}; }
  .scrim { position:absolute; inset:0; background:${look.scrim}; }`
    : '';
  const pattern = look.pattern
    ? `.pattern { position:absolute; inset:0; background-image:url("${hexPattern(look.pattern.stroke, look.pattern.opacity)}"); background-size:168px 196px; }`
    : '';
  const t = look.text;
  const copy = COPY[look.copy ?? 'provarla'];

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
  body { font-family:'Inter', system-ui, sans-serif; background:#fffbf2; color:#33240f; }

  .frame {
    position:relative; width:${W}px; height:${H}px; overflow:hidden;
    display:flex; align-items:center; justify-content:center;
    padding:0 ${SAFE.side}px;
    background:${look.frameBg};
  }
  .media { position:absolute; inset:0; }
  .media img { display:block; width:100%; height:100%; object-fit:cover; }
  ${photo}
  ${pattern}

  /* Tutto il contenuto è un blocco solo, centrato: sta in mezzo al frame e
     quindi lontano dalla UI di Instagram in alto e in basso. */
  .card { position:relative; width:100%; display:grid; justify-items:center; text-align:center; }
  ${hideText ? '.card { visibility:hidden; }' : ''}

  .h1 {
    font-family:'Fraunces', serif; font-weight:700;
    font-size:${copy.size}px; line-height:1.02; letter-spacing:-0.02em;
    color:${t.h1};
  }
  /* Il dominio è la parte "da fare" del messaggio: sans, molto grande,
     tracking stretto, così resta una cosa sola da leggere e da ricordare. */
  .domain {
    font-family:'Inter', sans-serif; font-weight:700;
    font-size:74px; line-height:1.1; letter-spacing:-0.015em;
    color:${t.domain};
    margin-top:26px;
  }
  /* Il logo sotto il dominio: marchio + nome, come nell'header del sito
     (nome a destra del marchio, sottotitolo a mano). */
  .brand { display:flex; align-items:center; gap:28px; margin-top:64px; text-align:left; }
  .brand .mark { display:block; width:122px; height:122px; flex:none; }
  .brand-name { display:block; font-family:'Fraunces', serif; font-weight:700; font-size:52px; line-height:1; color:${t.brandName}; }
  .brand-sub { display:block; font-family:'Caveat', cursive; font-weight:500; font-size:38px; line-height:1; color:${t.brandSub}; margin-top:6px; }
</style>
</head>
<body>
  <div class="frame">
    ${look.photo ? `<div class="media"><img src="${pathToFileURL(join(ROOT, look.photo.file)).href}" alt=""></div><div class="scrim"></div>` : ''}
    ${look.pattern ? '<div class="pattern"></div>' : ''}
    <div class="card">
      <div class="h1">${copy.lines.map(esc).join('<br>')}</div>
      <div class="domain">${esc(DOMAIN)}</div>
      ${BRAND_HTML}
    </div>
  </div>
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

/** Luminanza di un colore CSS, esadecimale o `rgb()/rgba()`. */
function colorLum(css, bgLum) {
  const hex = /^#([0-9a-f]{6})$/i.exec((css ?? '').trim());
  if (hex) return { lum: lumRgb((Number.parseInt(hex[1], 16) >> 16) & 255, (Number.parseInt(hex[1], 16) >> 8) & 255, Number.parseInt(hex[1], 16) & 255), alpha: 1 };
  return textLum(css, bgLum);
}

/** Rapporto di contrasto WCAG tra due luminanze. */
const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/**
 * Pixel di una fascia: luminanza media e ai due estremi (10° e 90° percentile).
 * Il testo chiaro va misurato contro la parte **più chiara** del fondo, quello
 * scuro contro la più scura: è lì che il contrasto è peggiore.
 */
async function regionStats(buf, rect) {
  const left = Math.max(0, Math.round(rect.x));
  const top = Math.max(0, Math.round(rect.y));
  const width = Math.min(W - left, Math.round((rect.right ?? rect.x + rect.w)) - left);
  const height = Math.min(H - top, Math.round((rect.bottom ?? rect.y + rect.h)) - top);
  if (width < 2 || height < 2) return null;
  const { data, info } = await sharp(buf).extract({ left, top, width, height }).raw().toBuffer({ resolveWithObject: true });
  const lums = [];
  for (let i = 0; i < data.length; i += info.channels) lums.push(lumRgb(data[i], data[i + 1], data[i + 2]));
  lums.sort((a, b) => a - b);
  const pick = (q) => lums[Math.min(lums.length - 1, Math.max(0, Math.floor(lums.length * q)))];
  const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
  const variance = lums.reduce((a, b) => a + (b - mean) ** 2, 0) / lums.length;
  // I pixel, non solo le statistiche: al chiamante che disegna il testo servono
  // tutti (vedi `inkFraction`).
  return { p10: pick(0.1), p90: pick(0.9), mean, stddev: Math.sqrt(variance) * 255, lums, pixels: lums.length };
}

/**
 * Quanta parte della fascia è coperta dal colore del testo: è la verifica che il
 * testo sia **davvero** nell'immagine finale e non solo nella pagina misurata (o
 * che i font siano caduti su un fallback invisibile). Per un titolo grande sono
 * il 10-20%, per una riga a mano 3-5%: sotto il 2% non c'è testo.
 */
function inkFraction(stats, textLum, bgLum) {
  const mid = (textLum + bgLum) / 2;
  const ink = stats.lums.filter((l) => (textLum > bgLum ? l > mid : l < mid)).length;
  return ink / stats.pixels;
}

/** Campiona l'intera immagine (per capire se la foto è davvero carica). */
async function imageStats(buf) {
  const { data, info } = await sharp(buf).resize(W / 4, H / 4, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const lums = [];
  for (let i = 0; i < data.length; i += info.channels) lums.push(lumRgb(data[i], data[i + 1], data[i + 2]));
  const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
  const variance = lums.reduce((a, b) => a + (b - mean) ** 2, 0) / lums.length;
  return { stddev: Math.sqrt(variance) * 255, mean: mean * 255 };
}

/** Sotto questa deviazione di luminanza il fondo è piatto: la foto non è carica. */
const MIN_PHOTO_STDDEV = 3;
/** Sotto questa quota di pixel del colore del testo, il testo non è nell'immagine. */
const MIN_INK = 0.02;
/**
 * Sopra questo ingrandimento della foto il fondo inizia a vedersi morbido. È un
 * avviso, non un errore: le foto in root da 1600×1200 stanno a 1,60× in un 9:16,
 * che è la norma qui, mentre sopra i 2× la morbidezza si vede anche sul telefono.
 */
const PHOTO_SCALE_WARN = 1.25;
const PHOTO_SCALE_MAX = 2;

/** Soglia di contrasto dell'elemento: WCAG AA grande, stretto per domanda e dominio. */
const minContrast = (sel, r) =>
  STRICT.includes(sel) ? MIN_CONTRAST : r.fontSize >= 24 || (r.fontSize >= 18.66 && r.fontWeight >= 700) ? LARGE_CONTRAST : MIN_CONTRAST;

// ── controlli ─────────────────────────────────────────────────────────────────

/** Controlli di geometria e copy. Ritorna l'elenco dei problemi. */
function check(look, m) {
  const bad = [];
  const { items } = m;
  if (m.doc.w > W || m.doc.h > H) bad.push(`documento in overflow: ${m.doc.w}×${m.doc.h}`);
  for (const [sel, r] of Object.entries(items)) {
    if (!r) { bad.push(`${sel} non trovato`); continue; }
    for (const [name, box] of [['blocco', r], ['testo', r.ink]]) {
      if (!box) continue;
      const oob = [];
      if (box.x < SAFE.side - 2) oob.push(`x=${box.x.toFixed(0)}`);
      if (box.right > W - SAFE.side + 2) oob.push(`right=${box.right.toFixed(0)}`);
      if (box.y < SAFE.top - 2) oob.push(`y=${box.y.toFixed(0)}`);
      if (box.bottom > H - SAFE.bottom + 2) oob.push(`bottom=${box.bottom.toFixed(0)}`);
      if (oob.length) bad.push(`${name} di ${sel} fuori dall'area sicura (${oob.join(' ')}): finirebbe sotto la UI di Instagram o tagliato`);
    }
  }
  // Il blocco intero è centrato nel frame, in orizzontale e in verticale: se i
  // due margini non sono uguali il disegno è sbilenco, e con un blocco solo in
  // mezzo al frame si vede subito.
  if (items['.card']) {
    const c = items['.card'];
    const dx = Math.abs(c.x - (W - c.right));
    const dy = Math.abs(c.y - (H - c.bottom));
    if (dx > 2 || dy > 2) {
      bad.push(
        `blocco non centrato: margini ${c.x.toFixed(0)} / ${(W - c.right).toFixed(0)} ai lati, ` +
          `${c.y.toFixed(0)} / ${(H - c.bottom).toFixed(0)} sopra e sotto`
      );
    }
  }
  const gap = (a, b) => (items[a] && items[b] ? items[b].y - items[a].bottom : null);
  for (const [a, b, min] of [['.h1', '.domain', 16], ['.domain', '.brand', 32]]) {
    const g = gap(a, b);
    if (g !== null && g < min) bad.push(`gap ${a}→${b} troppo stretto: ${g.toFixed(1)}px (min ${min})`);
  }
  if (m.h1Lines !== COPY[look.copy ?? 'provarla'].lines.length) {
    const lines = COPY[look.copy ?? 'provarla'].lines;
    bad.push(`titolo su ${m.h1Lines} righe a schermo (previste ${lines.length}: «${lines.join(' / ')}»)`);
  }
  for (const f of ['700 100px Fraunces', '700 100px Inter', '500 100px Caveat']) {
    if (!m.fonts.includes(f)) bad.push(`font non caricato: ${f}`);
  }
  for (const img of m.imgs ?? []) {
    if (!img.w || !img.h) bad.push(`immagine non caricata: ${img.src}`);
  }
  // La foto di fondo è la prima immagine del documento (la seconda è il logo).
  if (look.photo && !((m.imgs[0]?.w ?? 0) >= W)) bad.push(`la foto di fondo è ${m.imgs[0]?.w ?? 0}px: sotto i ${W}px verrebbe ingrandita`);  return bad;
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

/** Quanto la foto viene ingrandita (e che fetta dell'inquadratura resta) nel 9:16. */
async function photoScale(file) {
  const m = await sharp(join(ROOT, file)).metadata();
  const scale = Math.max(W / m.width, H / m.height);
  return { file, w: m.width, h: m.height, scale, keep: (W / scale) / m.width };
}

async function main() {
  const filter = process.argv.slice(2);
  const clean = (s) => s.replace(/^--/, '');
  const looks = filter.length ? LOOKS.filter((l) => filter.map(clean).includes(l.slug)) : LOOKS;
  if (!looks.length) {
    console.error(`✗ nessuna variante fra ${filter.join(', ')} — le varianti sono: ${LOOKS.map((l) => l.slug).join(', ')}`);
    process.exitCode = 1;
    return;
  }

  const tmp = mkdtempSync(join(tmpdir(), 'endcard-'));
  const profile = join(tmp, 'profile');
  const common = ['--headless=new', '--no-sandbox', '--hide-scrollbars', `--user-data-dir=${profile}`, '--virtual-time-budget=4000', `--window-size=${W},${H}`];

  const errors = [];
  const rows = [];

  try {
    for (const look of looks) {
      const plain = join(tmp, `${look.slug}.html`);
      const hidden = join(tmp, `${look.slug}-nobg.html`);
      writeFileSync(plain, html(look));
      writeFileSync(hidden, html(look, { hideText: true }));
      const plainUrl = pathToFileURL(plain).href;

      const dom = chrome([...common, '--dump-dom', plainUrl], { capture: true });
      const raw = /id="endcard-metrics"[^>]*>([\s\S]*?)<\/script>/.exec(dom)?.[1];
      if (!raw || raw === 'PENDING') throw new Error('la pagina non ha restituito le misure');
      const m = JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
      if (m.error) throw new Error(m.error);

      const bad = check(look, m);

      // Quanto la foto viene ingrandita (e che fetta dell'inquadratura resta): è
      // il conto che dice se il fondo regge, e sta prima dello screenshot perché
      // un ingrandimento assurdo va fermato, non scritto.
      let photo = null;
      const warnings = [];
      if (look.photo) {
        photo = await photoScale(look.photo.file);
        if (photo.scale > PHOTO_SCALE_MAX) {
          bad.push(`la foto di fondo andrebbe ingrandita di ${photo.scale.toFixed(2)}× (max ${PHOTO_SCALE_MAX}×): serve uno scatto più grande`);
        } else if (photo.scale > PHOTO_SCALE_WARN) {
          warnings.push(`foto ${photo.w}×${photo.h} ingrandita di ${photo.scale.toFixed(2)}× (sopra ${PHOTO_SCALE_WARN}× inizia a vedersi morbida)`);
        }
      }

      // Fondo senza testo, DPR 1: i pixel veri sotto ogni riga, per il contrasto.
      const bgPng = join(tmp, `${look.slug}-bg.png`);
      chrome([...common, `--screenshot=${bgPng}`, pathToFileURL(hidden).href]);
      const buf = await sharp(bgPng).png().toBuffer();

      if (look.photo) {
        const stats = await imageStats(buf);
        if (stats.stddev < MIN_PHOTO_STDDEV) bad.push(`fondo piatto (dev.std ${stats.stddev.toFixed(1)}): la foto non è carica`);
      }

      let worst = { ratio: 99, sel: '', min: MIN_CONTRAST };
      const elements = [];
      for (const sel of ['.h1', '.domain', '.brand-name', '.brand-sub']) {
        const r = m.items[sel];
        if (!r) continue;
        const rect = r.ink ?? r;
        const st = await regionStats(buf, { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom });
        if (!st) continue;
        // Testo chiaro → il fondo peggiore è il più chiaro; testo scuro → il più scuro.
        const { lum } = colorLum(r.color, st.mean);
        const bgLum = lum > st.mean ? st.p90 : st.p10;
        const ratio = contrast(lum, bgLum);
        const min = minContrast(sel, r);
        if (ratio < min) bad.push(`contrasto ${sel} ${ratio.toFixed(2)}:1 (minimo ${min}:1 per ${r.fontSize}px${r.fontWeight >= 700 ? ' grassetto' : ''})`);
        if (ratio < worst.ratio) worst = { ratio, sel, min };
        elements.push({ sel, rect: { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom }, textLum: lum, bgLum });
      }

      if (bad.length) {
        errors.push(`${look.slug}: ${bad.join('; ')}`);
        continue;
      }

      const shotPng = join(tmp, `${look.slug}-shot.png`);
      chrome([...common, '--force-device-scale-factor=2', `--screenshot=${shotPng}`, plainUrl]);
      // Il JPG viene ridimensionato ora ma scritto solo alla fine, se passano
      // tutte le varianti: così il set di banner non resta mai mezzo aggiornato.
      const jpg = await sharp(shotPng).resize(W, H, { fit: 'fill' }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
      const meta = await sharp(jpg).metadata();
      if (meta.format !== 'jpeg') errors.push(`${look.slug}: l'immagine non è un JPEG (${meta.format})`);
      if (meta.width !== W || meta.height !== H) errors.push(`${look.slug}: JPG ${meta.width}×${meta.height}, atteso ${W}×${H}`);
      // Senza metadati, come le altre immagini pubblicate: sharp non li copia
      // se non glielo si chiede, e qui lo si verifica invece di darlo per buono.
      if (meta.exif || meta.icc || meta.iptc || meta.xmp) errors.push(`${look.slug}: il JPG porta dei metadati`);

      // Il testo deve esserci **nell'immagine finale**, non solo nella pagina
      // misurata: il colore del testo sui pixel del JPG appena ridimensionato.
      let minInk = { frac: 1, sel: '' };
      for (const el of elements) {
        const st = await regionStats(jpg, el.rect);
        if (!st) continue;
        const frac = inkFraction(st, el.textLum, el.bgLum);
        if (frac < MIN_INK) bad.push(`nel ${el.sel} il testo non si vede (${(frac * 100).toFixed(1)}% dei pixel, minimo ${(MIN_INK * 100).toFixed(0)}%)`);
        if (frac < minInk.frac) minInk = { frac, sel: el.sel };
      }
      if (bad.length) {
        errors.push(`${look.slug}: ${bad.join('; ')}`);
        continue;
      }

      rows.push({
        look, buf: jpg, jpg: `banner-instagram-fine-video-${look.slug}.jpg`, out: join(ROOT, `banner-instagram-fine-video-${look.slug}.jpg`),
        kb: jpg.length / 1024, worst, lines: m.h1Lines, photo, minInk, warnings,
        // Quanto è larga la riga più lunga del titolo: serve a scegliere la
        // dimensione del titolo quando cambia il copy (lo `size` di `COPY`).
        h1Width: Math.round((m.items['.h1'].ink ?? m.items['.h1']).right - (m.items['.h1'].ink ?? m.items['.h1']).x),
      });
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  console.log('\nBanner Instagram (1080×1920, 9:16)\n');
  if (errors.length) {
    console.error(`✗ ${errors.length} varianti non passano i controlli — nessun file scritto:\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exitCode = 1;
    return;
  }
  for (const r of rows) writeFileSync(r.out, r.buf);
  // Rilettura da disco: è quello che si scrive a finire su Instagram, quindi la
  // verifica si fa sul file, non sul buffer che si sperava di aver scritto.
  for (const r of rows) {
    const m = await sharp(r.out).metadata();
    if (m.format !== 'jpeg' || m.width !== W || m.height !== H || m.exif || m.icc || m.iptc || m.xmp) {
      errors.push(`${r.jpg}: il file scritto non è a posto (${m.format} ${m.width}×${m.height})`);
    }
  }
  if (errors.length) {
    console.error(`✗ ${errors.length} banner scritti ma non a posto:\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exitCode = 1;
    return;
  }
  for (const r of rows) {
    const photo = r.photo ? `foto ${r.photo.file} ${r.photo.w}×${r.photo.h} → scala ${r.photo.scale.toFixed(2)}× (tiene il ${Math.round(r.photo.keep * 100)}% dell'inquadratura)` : '';
    console.log(`  ✓ ${r.jpg.padEnd(44)} ${String(nf.format(Math.round(r.kb))).padStart(4)} KB`);
    console.log(
      `      «${COPY[r.look.copy ?? 'provarla'].lines.join(' / ')}» ${r.lines} righe, ${r.h1Width}px su ${W - 2 * SAFE.side}` +
        `  ·  contrasto ${r.worst.ratio.toFixed(2)}:1 (${r.worst.sel}, minimo ${r.worst.min}:1)` +
        `  ·  testo ${(r.minInk.frac * 100).toFixed(0)}% dei pixel`
    );
    if (photo) console.log(`      ${photo}`);
  }
  for (const r of rows) {
    for (const w of r.warnings) console.log(`  ! ${r.jpg}: ${w}`);
  }
  console.log(`\n✓ ${rows.length}/${looks.length} banner OK — ${rows.map((r) => r.look.label).join(' · ')}`);
  console.log('  testo dentro l\'area sicura (UI di Instagram: ' + SAFE.top + 'px in alto, ' + SAFE.bottom + 'px in basso), font e foto caricati, contrasto misurato sui pixel\n');
}

await main();
