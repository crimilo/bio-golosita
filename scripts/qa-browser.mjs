import { chromium } from 'playwright-core';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import sharp from 'sharp';

const BASE = process.env.QA_BASE ?? 'http://localhost:8091';
const VIEWPORTS = [
  { name: 'mobile-360', w: 360, h: 740 }, // Android piccoli: è qui che le etichette lunghe traboccavano
  { name: 'mobile', w: 375, h: 667 },
  { name: 'desktop', w: 1280, h: 800 },
];

/** Tutte le pagine HTML di dist/, come URL. */
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

const pages = findPages().sort();
const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const results = [];
const check = (name, ok, extra = '') => {
  results.push(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

/**
 * Centro verticale dell'inchiostro (i pixel scuri) in una fascia di x, a partire
 * da `clipY` (dove sta l'header, in coordinate documento) per `headerH` px.
 * Il centro di una scatola non dice dove cade il testo — per quello servono i
 * pixel: è così che si vede se il menu è centrato *otticamente*.
 *
 * `clip` di Playwright è in coordinate **documento**: l'header è `fixed`, quindi
 * il ritaglio va preso dove sta lo scroll, non a y=0.
 */
async function inkCenter(page, x0, x1, clipY, headerH) {
  const h = Math.round(headerH);
  const shot = await page.screenshot({
    clip: { x: x0, y: clipY, width: x1 - x0, height: h },
    type: 'png',
  });
  const { data, info } = await sharp(shot).greyscale().raw().toBuffer({ resolveWithObject: true });
  let top = -1;
  let bottom = -1;
  for (let y = 0; y < info.height; y++) {
    let dark = 0;
    for (let x = 0; x < info.width; x++) if (data[y * info.width + x] < 140) dark++;
    if (dark > 0) {
      if (top < 0) top = y;
      bottom = y;
    }
  }
  // Nessun inchiostro: meglio un errore esplicito di un NaN, che nella riga del
  // risultato sembrerebbe uno scarto come gli altri.
  if (top < 0) throw new Error(`nessun inchiostro nel ritaglio x=${x0}..${x1}, y=${clipY}`);
  return (top + bottom) / 2 / (info.height / h);
}

// --- 1. Interazioni sulla home (una volta per viewport) ---------------------
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 120)));
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message.slice(0, 120)));

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

  const cta = page.locator('.header-cta').first();
  // Mobile: la CTA telefonica c'è e sta su una riga sola, con l'etichetta
  // "Chiama ora" (è l'azione che conta lì); sotto i 480px solo l'icona (a
  // 360px "Chiama ora" andava a capo e sembrava rotta).
  // Desktop (>=900px): la CTA c'è, a destra del menu, e l'etichetta è il NUMERO.
  if (vp.w < 900) {
    check(`[${vp.name}] CTA header visibile`, await cta.isVisible());
    // Il conteggio delle righe è sulla label: l'altezza del bottone è fissa,
    // quindi non direbbe nulla. 0 righe = label nascosta (solo icona).
    const ctaInfo = await cta.evaluate((el) => {
      const label = el.querySelector('.header-cta-label');
      return {
        righe: label.getClientRects().length,
        label: getComputedStyle(label).display !== 'none',
        nome: el.getAttribute('aria-label') || (el.textContent || '').trim(),
        icona: getComputedStyle(el.querySelector('svg')).display !== 'none',
      };
    });
    check(
      `[${vp.name}] CTA header su una riga (label su ${ctaInfo.righe} riga/righe)`,
      ctaInfo.righe === (vp.w < 480 ? 0 : 1)
    );
    // soglia 480px (come in CSS), non il nome del viewport
    check(
      `[${vp.name}] CTA header ${vp.w < 480 ? 'solo icona' : 'icona + testo'}`,
      vp.w < 480 ? !ctaInfo.label : ctaInfo.label
    );
    check(
      `[${vp.name}] CTA header ha un nome accessibile ("${ctaInfo.nome}")`,
      Boolean(ctaInfo.nome) && ctaInfo.icona
    );
  } else {
    // Desktop: la CTA c'è e l'etichetta è il numero (a un computer il tap non
    // serve: il numero si legge e si copia). Sta a destra del menu, a filo del
    // bordo destro del contenuto — lo stesso margine che ha il logo a sinistra.
    check(`[${vp.name}] CTA header visibile su desktop`, await cta.isVisible());
    const headerGeo = await page.evaluate(() => {
      const q = (s) => document.querySelector(s);
      const nav = q('.nav');
      const inner = q('.header-inner');
      const logo = q('.logo');
      const ctaEl = q('.header-cta');
      if (!nav || !inner || !logo || !ctaEl) return null;
      const i = inner.getBoundingClientRect();
      const cs = getComputedStyle(inner);
      const innerRight = i.right - parseFloat(cs.paddingRight);
      const innerLeft = i.left + parseFloat(cs.paddingLeft);
      const n = nav.getBoundingClientRect();
      const c = ctaEl.getBoundingClientRect();
      const l = logo.getBoundingClientRect();
      const numero = ctaEl.querySelector('.cta-phone-label--number');
      return {
        rightInset: Math.round(innerRight - c.right),
        logoInset: Math.round(l.left - innerLeft),
        gapNavCta: Math.round(c.left - n.right),
        numeroVisibile: numero && getComputedStyle(numero).display !== 'none',
        numero: (numero?.textContent || '').trim(),
        azioneNascosta: getComputedStyle(ctaEl.querySelector('.header-cta-label')).display === 'none',
      };
    });
    check(
      `[${vp.name}] CTA header mostra il numero ("${headerGeo?.numero}")`,
      Boolean(headerGeo?.numeroVisibile && headerGeo.numero && headerGeo.azioneNascosta)
    );
    check(
      `[${vp.name}] CTA a filo del bordo destro (${headerGeo?.rightInset}px, come il logo a ${headerGeo?.logoInset}px)`,
      headerGeo && Math.abs(headerGeo.rightInset - headerGeo.logoInset) <= 2
    );
    check(
      `[${vp.name}] CTA a destra del menu, staccata (${headerGeo?.gapNavCta}px)`,
      headerGeo && headerGeo.gapNavCta >= 20
    );
  }

  // Fascia 480-560px: non è coperta dagli sweep, la label è visibile e la CTA
  // non deve andare a capo né far traboccare l'header.
  if (vp.name === 'mobile-360') {
    for (const w of [480, 520, 560]) {
      await page.setViewportSize({ width: w, height: 800 });
      const mid = await cta.evaluate((el) => {
        const label = el.querySelector('.header-cta-label');
        return {
          righe: label.getClientRects().length,
          larghezza: Math.round(el.getBoundingClientRect().width),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });
      check(
        `[${w}px] CTA header su una riga (label su ${mid.righe} riga/righe, ${mid.larghezza}px)`,
        mid.righe === 1 && mid.overflow <= 0
      );
    }
    await page.setViewportSize({ width: vp.w, height: vp.h });
  }

  const navVisible = await page.locator('.nav a').first().isVisible().catch(() => false);
  // soglia 900px, non il nome del viewport: così aggiungere viewport non rompe il check
  if (vp.w < 900) check(`[${vp.name}] nav nascosta (solo logo+CTA)`, !navVisible);
  else check(`[${vp.name}] nav visibile`, navVisible);

  // Il desktop stretto non deve rimpicciolire i link del menu: la regola è che
  // la dimensione resta la stessa a ogni larghezza (niente fascia "compattata").
  if (vp.name === 'desktop') {
    const misure = [];
    for (const w of [900, 1000, 1100, 1149]) {
      await page.setViewportSize({ width: w, height: 800 });
      misure.push(
        await page.evaluate((larghezza) => {
          const nav = document.querySelector('.nav');
          const links = [...nav.querySelectorAll('a')];
          const navBox = nav.getBoundingClientRect();
          const logo = document.querySelector('.logo');
          const logoBox = logo.getBoundingClientRect();
          const inner = document.querySelector('.header-inner');
          const i = inner.getBoundingClientRect();
          const cs = getComputedStyle(inner);
          const ctaBox = document.querySelector('.header-cta').getBoundingClientRect();
          return {
            larghezza,
            font: getComputedStyle(links[0]).fontSize,
            unaRiga: links.every((a) => a.getBoundingClientRect().top === links[0].getBoundingClientRect().top),
            gap: Math.round(navBox.left - logoBox.right),
            gapNavCta: Math.round(ctaBox.left - navBox.right),
            // a 900px l'header è al limite: se qualcosa non ci sta, il flex
            // schiaccia il logo (che ha min-width:0) invece di traboccare, e il
            // testo del marchio finisce sotto il menu. Il logo "stirato" si
            // vede da scrollWidth > clientWidth.
            logoSchiacciato: logo.scrollWidth > logo.clientWidth + 1,
            ctaDentro: ctaBox.right <= i.right - parseFloat(cs.paddingRight) + 1,
            dentro: navBox.right <= i.right - parseFloat(cs.paddingRight) + 1,
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          };
        }, w)
      );
    }
    await page.setViewportSize({ width: vp.w, height: vp.h });
    const font = [...new Set(misure.map((m) => m.font))];
    check(
      `[desktop] link del menu mai più piccoli (font ${font.join(' / ')} a ${misure.map((m) => m.larghezza).join('/')}px)`,
      font.length === 1 && parseFloat(font[0]) >= 15
    );
    check(
      `[desktop] menu intero anche a 900px (${misure[0].gap}px dal logo, una riga: ${misure[0].unaRiga})`,
      misure.every((m) => m.unaRiga && m.gap >= 8 && m.dentro && m.ctaDentro && m.overflow <= 0)
    );
    check(
      `[desktop] header non si schiaccia, CTA staccata dal menu a ogni larghezza ` +
        `(${misure.map((m) => `${m.larghezza}px: ${m.gapNavCta}px`).join(', ')})`,
      misure.every((m) => !m.logoSchiacciato && m.gapNavCta >= 20)
    );

    // Il menu dev'essere centrato *otticamente*, non solo come scatola: il
    // centro della scatola di un link cade sempre al centro dell'header, mentre
    // l'inchiostro delle lettere può stare più in alto (padding asimmetrico
    // dell'underline, metriche del font). Qui si misura l'inchiostro vero, dai
    // pixel: si prendono le voci senza discendenti (g/j/p/q/y), dove il centro
    // dell'inchiostro È il centro che vede l'occhio, e si confronta con il
    // centro dell'header. Logo e CTA sono forme piene, quindi basta la scatola.
    const headerCtr = await page.evaluate(() => {
      // L'header è `fixed`: riportiamo lo scroll a 0 (istantaneo, senza animazione)
      // così il ritaglio dei pixel coincide con quello che si vede, e calcoliamo
      // comunque la sua y nel documento — che per un header fisso è lo scroll.
      window.scrollTo({ top: 0, behavior: 'instant' });
      const box = (s) => {
        const b = document.querySelector(s).getBoundingClientRect();
        return { x: b.x, right: b.right, cy: b.y + b.height / 2 };
      };
      const hdr = document.querySelector('.header').getBoundingClientRect();
      return {
        h: document.querySelector('.header-inner').getBoundingClientRect().height,
        clipY: hdr.top + window.scrollY,
        mark: box('.logo-mark').cy,
        cta: box('.header-cta').cy,
        // Le maiuscole che scendono sotto la riga (Q e J in Inter) e i
        // discendenti minuscoli (g, j, p, q, y) allungano l'inchiostro verso il
        // basso: per il centro che vede l'occhio si prendono le voci senza.
        links: [...document.querySelectorAll('.nav a')]
          .filter((a) => !/[gjpqyQJ]/.test(a.textContent))
          .slice(0, 3)
          .map((a) => { const b = a.getBoundingClientRect(); return { t: a.textContent.trim(), x: b.x, right: b.right }; }),
      };
    });
    const meta = headerCtr.h / 2;
    check(
      `[desktop] logo e CTA a filo del centro dell'header (logo ${(headerCtr.mark - meta).toFixed(1)}px, CTA ${(headerCtr.cta - meta).toFixed(1)}px)`,
      Math.abs(headerCtr.mark - meta) <= 0.5 && Math.abs(headerCtr.cta - meta) <= 0.5
    );
    // Senza voci misurate il giro sotto non farebbe nessun controllo e passerebbe
    // "verde" a vuoto: se le etichette del menu cambiano, meglio un errore netto.
    check(
      `[desktop] voci del menu misurate per il centraggio ottico (${headerCtr.links.map((l) => l.t).join(', ') || 'nessuna'})`,
      headerCtr.links.length > 0
    );
    for (const l of headerCtr.links) {
      const ink = await inkCenter(page, l.x - 1, l.right + 1, headerCtr.clipY, headerCtr.h);
      check(
        `[desktop] voce "${l.t}" centrata in verticale (inchiostro a ${ink.toFixed(1)}px dal centro ${meta})`,
        Math.abs(ink - meta) <= 1
      );
    }
  }

  const wa = page.locator('.wa-float');
  check(`[${vp.name}] bottone WhatsApp fisso`, await wa.isVisible());
  const waPos = await wa.boundingBox();
  check(`[${vp.name}] WhatsApp in basso a destra`, waPos && waPos.x > vp.w - 100 && waPos.y > vp.h - 100);

  // hero con immagine di sfondo: presente, caricata con priorità e senza lightbox
  const heroBg = page.locator('.hero-bg-media img').first();
  check(`[${vp.name}] hero con immagine di sfondo`, (await heroBg.count()) > 0);
  check(
    `[${vp.name}] hero image eager + fetchpriority high`,
    (await heroBg.getAttribute('loading')) === 'eager' &&
      (await heroBg.getAttribute('fetchpriority')) === 'high'
  );
  check(
    `[${vp.name}] hero image precaricata (stesso URL del preload)`,
    await page.evaluate(() => {
      const link = document.querySelector('link[rel="preload"][as="image"]');
      const img = document.querySelector('.hero-bg-media img');
      if (!link || !img) return false;
      return (link.getAttribute('imagesrcset') || '').includes(new URL(img.currentSrc).pathname);
    })
  );
  check(
    `[${vp.name}] lo sfondo NON è cliccabile (niente lightbox)`,
    !(await heroBg.getAttribute('class'))?.includes('lightbox-target')
  );

  // le card prodotto della home devono PORTARE alla pagina, non aprire la lightbox
  const cardImg = page.locator('#prodotti .card-media img').first();
  check(`[${vp.name}] card prodotti cliccabile (immagine)`, (await cardImg.count()) > 0);
  check(
    `[${vp.name}] immagine della card NON apre la lightbox`,
    !(await cardImg.getAttribute('class'))?.includes('lightbox-target')
  );

  // lightbox su una foto della galleria (non è dentro un link)
  const zoomable = page.locator('.gallery-grid .g-item img').first();
  await zoomable.click();
  const lb = page.locator('#lightbox');
  check(`[${vp.name}] lightbox si apre al tap`, (await lb.getAttribute('open')) !== null);
  const srcOf = () => page.locator('#lightbox img').getAttribute('src');
  const firstSrc = await srcOf();
  check(
    `[${vp.name}] lightbox: frecce per sfogliare la galleria`,
    (await page.locator('.lightbox-nav:visible').count()) === 2
  );
  await page.locator('.lightbox-next').click();
  const nextSrc = await srcOf();
  check(`[${vp.name}] freccia avanti cambia foto`, nextSrc !== firstSrc);
  await page.locator('.lightbox-prev').click();
  check(`[${vp.name}] freccia indietro torna alla foto precedente`, (await srcOf()) === firstSrc);
  await page.keyboard.press('ArrowRight');
  check(`[${vp.name}] tastiera ← → nella lightbox`, (await srcOf()) === nextSrc);
  await page.locator('#lightbox img').click();
  const zoomed = await page
    .locator('#lightbox img')
    .evaluate((el) => el.classList.contains('zoomed'));
  check(`[${vp.name}] zoom al secondo tap`, zoomed);
  await page.locator('.lightbox-close').click();
  check(`[${vp.name}] lightbox si chiude`, (await lb.getAttribute('open')) === null);

  await page.locator('[data-video] .video-play').first().click();
  const playing = await page.locator('[data-video]').first().getAttribute('data-playing');
  check(`[${vp.name}] video parte al click`, playing !== null);

  // Video nella pagina api regine: quello della galleria (`ape-regina-con-api`)
  // e quello nuovo della regina F1 sulle covate, che sta nel testo sotto la
  // sezione «La nostra linea: regine Buckfast, figlie di una madre F0» ed è
  // quindi il PRIMO `[data-video]` della pagina. Si cercano per `src`, non per
  // posizione, così l'ordine nella pagina può cambiare.
  await page.goto(`${BASE}/api-regine/`, { waitUntil: 'load' });
  const videoConSrc = (file) =>
    page.locator('[data-video]').filter({ has: page.locator(`source[src*="${file}"]`) });
  const regineVideo = videoConSrc('ape-regina-con-api.mp4');
  const f1Video = videoConSrc('regina-f1-su-covate.mp4');
  check(`[${vp.name}] /api-regine/ ha il video della regina`, (await regineVideo.count()) > 0);
  check(`[${vp.name}] /api-regine/ ha il video della regina F1`, (await f1Video.count()) > 0);

  // il poster viene applicato quando il video si avvicina al viewport
  const posterDi = async (locator, file) => {
    await locator.scrollIntoViewIfNeeded();
    await page
      .waitForFunction(
        (needle) =>
          !!Array.from(document.querySelectorAll('[data-video] video'))
            .find((v) => v.querySelector('source')?.getAttribute('src')?.includes(needle))
            ?.getAttribute('poster'),
        file,
        { timeout: 5000 }
      )
      .catch(() => {});
    return locator.locator('video').getAttribute('poster');
  };
  check(
    `[${vp.name}] il video della regina ha il poster`,
    (await posterDi(regineVideo, 'ape-regina-con-api.mp4'))?.includes(
      'ape-regina-con-api-poster'
    )
  );
  check(
    `[${vp.name}] il video della F1 ha il poster`,
    (await posterDi(f1Video, 'regina-f1-su-covate.mp4'))?.includes(
      'regina-f1-su-covate-poster'
    )
  );
  await regineVideo.locator('.video-play').click();
  check(
    `[${vp.name}] il video della regina parte`,
    (await regineVideo.getAttribute('data-playing')) !== null
  );
  await f1Video.locator('.video-play').click();
  check(
    `[${vp.name}] il video della F1 parte`,
    (await f1Video.getAttribute('data-playing')) !== null
  );

  // Etichetta prezzo: in alto a sinistra DENTRO la foto, identica fra le card
  // della home, quelle di /miele/ e quelle dei prodotti. Ogni etichetta presente
  // deve stare nel riquadro della foto e non essere tagliata. Su /miele/ le card
  // del miele sono 5 (quattro varietà + il miele in favo, "Prezzo su richiesta").
  for (const [url, attese] of [['/', 4], ['/miele/', 8]]) {
    await page.goto(`${BASE}${url}`, { waitUntil: 'domcontentloaded' });
    const badge = await page.evaluate(() => {
      const out = [];
      for (const b of document.querySelectorAll('.price-badge')) {
        const media = b.closest('.card-media, .honey-card-media');
        if (!media) {
          out.push({ ok: false, motivo: `"${b.textContent.trim()}" fuori da una card` });
          continue;
        }
        const mb = media.getBoundingClientRect();
        const bb = b.getBoundingClientRect();
        out.push({
          ok:
            bb.left >= mb.left - 0.5 &&
            bb.top >= mb.top - 0.5 &&
            bb.right <= mb.right + 0.5 &&
            bb.bottom <= mb.bottom + 0.5 &&
            b.scrollWidth <= Math.ceil(b.clientWidth) + 1 &&
            b.scrollHeight <= Math.ceil(b.clientHeight) + 1,
          motivo: `"${b.textContent.trim()}" ${Math.round(bb.width)}×${Math.round(bb.height)} su ${b.getClientRects().length} riga/righe`,
        });
      }
      return out;
    });
    check(
      `[${vp.name}] ${url} etichette prezzo dentro la foto (${badge.length}/${attese})`,
      badge.length === attese && badge.every((b) => b.ok),
      badge.filter((b) => !b.ok).map((b) => b.motivo).join(' | ')
    );
  }

  check(`[${vp.name}] nessun errore console`, errors.length === 0, errors.slice(0, 2).join(' | '));
  await ctx.close();
}

// --- 2. Sweep di tutte le pagine: overflow, h1, errori ----------------------
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  let errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 120)));
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message.slice(0, 120)));

  for (const path of pages) {
    errors = [];
    const res = await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    const h1 = await page.locator('h1:visible').count();
    // le img del lightbox hanno src="" di proposito: contano solo quelle con un src vero
    const brokenImgs = await page.evaluate(
      () =>
        [...document.images].filter(
          (i) => i.getAttribute('src') && i.complete && i.naturalWidth === 0
        ).length
    );
    // etichette che escono dal loro bottone (white-space: nowrap + testo lungo):
    // il testo trabocca visivamente pur senza allargare la pagina
    // frase attaccata dopo il punto ("…appuntamento.Scegli"): in JSX la riga
    // nuova dopo </strong> viene tagliata e il testo si incolla. A occhio sfugge.
    const attaccati = await page.evaluate(() => {
      const sel = 'p, li, h2, h3, h4, figcaption, dd, dt, .eyebrow, .review';
      const out = [];
      for (const el of document.querySelectorAll(sel)) {
        const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
        const m = t.match(/\.[A-ZA\u00c0-\u00d6][a-z\u00e0-\u00ff]/);
        if (m) out.push(t.slice(Math.max(0, m.index - 25), m.index + 25));
      }
      return out;
    });
    const clipped = await page.evaluate(() =>
      [...document.querySelectorAll('.btn')]
        .filter((el) => el.scrollWidth > Math.ceil(el.clientWidth) + 1)
        .map((el) => (el.textContent || '').trim().slice(0, 40))
    );
    const ok =
      (res?.status() ?? 500) < 400 &&
      overflow <= 0 &&
      h1 === 1 &&
      errors.length === 0 &&
      brokenImgs === 0 &&
      clipped.length === 0 &&
      attaccati.length === 0;
    check(
      `[${vp.name}] ${path}`,
      ok,
      [
        (res?.status() ?? 500) >= 400 ? `HTTP ${res.status()}` : '',
        overflow > 0 ? `overflow ${overflow}px` : '',
        h1 !== 1 ? `${h1} h1 visibili` : '',
        brokenImgs ? `${brokenImgs} img rotte` : '',
        clipped.length ? `testo fuori dal bottone: ${clipped.slice(0, 2).join(' / ')}` : '',
        attaccati.length ? `frase attaccata dopo il punto: "…${attaccati[0]}…"` : '',
        errors.length ? errors.slice(0, 1).join('') : '',
      ]
        .filter(Boolean)
        .join(' | ')
    );
    // La voce del menu della pagina attuale deve avere lo stesso aspetto del
    // passaggio del mouse: è il modo in cui l'utente capisce dove si trova.
    // Il confronto è fra stili calcolati (colore, sottolineatura, fondo),
    // quindi vale per entrambe le versioni del menu (desktop e mobile).
    const navNow = page.locator('#site-nav');
    // Da mobile il menu è chiuso: lo apro per poter confrontare la voce attiva.
    let apertoPerIlTest = false;
    if ((await navNow.count()) && !(await navNow.isVisible())) {
      const toggle = page.locator('.nav-toggle');
      if ((await toggle.count()) && (await toggle.isVisible())) {
        await toggle.click();
        apertoPerIlTest = true;
      }
    }
    if ((await navNow.count()) && (await navNow.isVisible())) {
      const attese = navNow.locator("a[aria-current='page']");
      const n = await attese.count();
      if (n === 1) {
        const stile = (el) => {
          const cs = getComputedStyle(el);
          return `${cs.color}|${cs.borderBottomColor}|${cs.backgroundColor}`;
        };
        const attiva = await attese.first().evaluate(stile);
        const altra = navNow.locator("a:not([aria-current='page'])").first();
        await altra.hover();
        const hover = await altra.evaluate(stile);
        check(
          `[${vp.name}] ${path} voce attiva = effetto hover`,
          attiva === hover,
          attiva === hover ? '' : `attiva ${attiva} ≠ hover ${hover}`
        );
        await page.mouse.move(0, 0);
      }
    }
    if (apertoPerIlTest) await page.locator('.nav-toggle').click();

    // Ogni immagine dentro un link interno deve PORTARE alla pagina: mai aprire
    // la lightbox (card prodotto, schede dei mieli, guide). Gira dopo i controlli
    // della pagina, così la navigazione non sporca gli errori di console.
    const imgLink = await page.evaluate(() => {
      const a = [...document.querySelectorAll('a[href]')].find((x) => {
        const href = x.getAttribute('href') || '';
        return (
          x.querySelector('img') &&
          href.startsWith('/') && // interno, niente tel:/mailto:/http
          !href.includes('#') &&
          !x.hasAttribute('download') &&
          x.getAttribute('target') !== '_blank'
        );
      });
      if (!a) return null;
      a.setAttribute('data-qa-imglink', '1');
      return { href: a.getAttribute('href') };
    });
    if (imgLink) {
      const went = await Promise.all([
        page.waitForURL((u) => u.pathname === imgLink.href, { timeout: 3000 }).then(() => true).catch(() => false),
        page.locator('a[data-qa-imglink] img').first().click(),
      ]).then(([ok]) => ok);
      const lightboxOpen = (await page.locator('#lightbox').getAttribute('open')) !== null;
      check(
        `[${vp.name}] ${path} foto cliccata → ${imgLink.href}`,
        went && !lightboxOpen,
        `atterrato su ${new URL(page.url()).pathname}${lightboxOpen ? ' (lightbox aperta invece di navigare)' : ''}`
      );
    }
  }
  await ctx.close();
}

await browser.close();
console.log(results.join('\n'));
const bad = results.filter((r) => r.startsWith('✗'));
console.log(bad.length ? `\nQA BROWSER: ${bad.length} problemi` : '\nQA BROWSER: TUTTO OK');
process.exit(bad.length ? 1 : 0);
