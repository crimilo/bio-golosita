// QA browser: overflow, header CTA, whatsapp float, lightbox zoom, video play.
import { chromium } from 'playwright-core';

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const results = [];
const check = (name, ok, extra = '') => {
  results.push(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

for (const vp of [
  { name: 'mobile', w: 375, h: 667 },
  { name: 'desktop', w: 1280, h: 800 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 120)));
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message.slice(0, 120)));

  await page.goto('http://localhost:8091/', { waitUntil: 'networkidle' });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(`[${vp.name}] nessun overflow orizzontale`, overflow <= 0, overflow > 0 ? `${overflow}px` : '');

  const cta = await page.locator('.header-cta').first();
  check(`[${vp.name}] CTA header visibile`, await cta.isVisible());
  const navVisible = await page.locator('.nav a').first().isVisible().catch(() => false);
  if (vp.name === 'mobile') check('[mobile] nav nascosta (solo logo+CTA)', !navVisible);
  else check('[desktop] nav visibile', navVisible);

  const wa = await page.locator('.wa-float');
  check(`[${vp.name}] bottone WhatsApp fisso`, await wa.isVisible());
  const waPos = await wa.boundingBox();
  check(`[${vp.name}] WhatsApp in basso a destra`, waPos && waPos.x > vp.w - 100 && waPos.y > vp.h - 100);

  // lightbox: tap su immagine → open; tap → zoom; close
  const heroImg = await page.locator('.hero-media img').first();
  await heroImg.click();
  const lb = await page.locator('#lightbox');
  check(`[${vp.name}] lightbox si apre al tap`, await lb.getAttribute('open') !== null);
  await page.locator('#lightbox img').click();
  const zoomed = await page.locator('#lightbox img').evaluate((el) => el.classList.contains('zoomed'));
  check(`[${vp.name}] zoom al secondo tap`, zoomed);
  await page.locator('.lightbox-close').click();
  check(`[${vp.name}] lightbox si chiude`, (await lb.getAttribute('open')) === null);

  // video gallery: play al click
  await page.locator('[data-video] .video-play').first().click();
  const playing = await page.locator('[data-video]').first().getAttribute('data-playing');
  check(`[${vp.name}] video parte al click`, playing !== null);

  check(`[${vp.name}] nessun errore console`, errors.length === 0, errors.slice(0, 2).join(' | '));
  await ctx.close();
}

await browser.close();
console.log(results.join('\n'));
