# Bio & Golosità — Sito web

Sito dell'azienda apistica **Bio & Golosità di Antoci Raffaele** — miele di api
proprie a Cassano d'Adda (MI), provincia di Milano.

Stack: **Astro 7** (statico) · CSS custom · deploy su **Cloudflare Pages**.

## Pagine

| URL | Contenuto |
| --- | --- |
| `/` | Home hub: hero, 5 mieli, chi siamo, galleria foto/video, zone, recensioni, FAQ, contatti |
| `/miele/miele-di-acacia/` | Landing SEO Miele di Acacia |
| `/miele/miele-millefiori-primaverile/` | Landing SEO Miele Millefiori Primaverile |
| `/miele/miele-millefiori-estivo/` | Landing SEO Miele Millefiori Estivo |
| `/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/` | Landing SEO Miele Millefiori Estivo al Tiglio e Ailanto |
| `/miele/miele-di-castagno/` | Landing SEO Miele di Castagno |
| `/chi-siamo/` | E-E-A-T: storia, metodo, apicoltore |
| `/contatti/` | Contatti e come ordinare |

## Comandi

```sh
bun install
bun run dev          # sviluppo su localhost:4321
bun run build        # build statica in dist/
bun run assets       # rigenera font, immagini, poster, favicon
bun run deploy       # build + publish su Cloudflare Pages (progetto: bio-golosita)
```

## Struttura

```
public/            # asset statici serviti così come sono (img/, video/, fonts/, og.jpg, _headers…)
src/
  data/site.js     # ★ TUTTI i dati del sito: telefono, prezzi, orari, mieli, recensioni, area servita
  layouts/Base.astro
  components/      # Header, Footer, Picture (AVIF/WebP), Lightbox, Gallery, ecc.
  pages/           # pagine + route dinamica /miele/[slug]
  lib/schema.js    # generatori JSON-LD (LocalBusiness, Product, FAQPage, BreadcrumbList)
  styles/global.css
scripts/           # tooling: font, immagini, poster, favicon, QA, Lighthouse, OG
```

## TODO prima del lancio (dati segnaposto in `src/data/site.js`)

- [x] **Numero di telefono**: aggiornato a +39 351 537 6719 (CTA "Chiama ora", WhatsApp e schema)
- [x] **Prezzi mieli**: aggiornati — acacia 6,00 (500g) / 11,00 (kg), millefiori 5,00 / 9,00, castagno 6,50 / 12,00 (anche nello schema Product)
- [ ] **Orari**: verificare `Lun–Sab 9:00–19:00`
- [ ] **Recensioni**: sostituire quelle segnaposto con le recensioni reali della scheda
      Google Business Profile appena attiva; solo allora aggiungere lo schema
      `Review`/`AggregateRating` (per ora volutamente assente, come da requisito)
- [ ] **Partita IVA / REA**: aggiungerli nel footer quando disponibili
- [ ] **Dominio**: aggiungere `bioegolosita.it` come custom domain su Cloudflare Pages
- [ ] **Google Maps**: creare la scheda e aggiornare la nota "presto su Google Maps"

## SEO

- Titoli ≤ 65 char, description ≤ 155 char con keyword locali
- JSON-LD validi: `LocalBusiness` (NAP + geo + areaServed), `Product` + `Offer`,
  `FAQPage`, `BreadcrumbList`
- `sitemap.xml` + `robots.txt` (allow all)
- Immagini AVIF/WebP con `width`/`height`, lazy load (LCP escluso), font WOFF2
  subsettati (latin, senza `unicode-range`: bug WebKit su iOS Safari) con `font-display: swap`

## QA

```sh
node scripts/qa.mjs           # titoli/desc/schema su dist
node scripts/qa-browser.mjs   # overflow, lightbox, CTA, video (richiede server)
node scripts/serve-gzip.mjs 8091 dist   # server statico con brotli per Lighthouse
```

Lighthouse (mobile, throttling standard): **Performance 99 · Accessibility 100 ·
Best Practices 100 · SEO 100** (tutte le pagine; castagno 100/100/100/100).

L'immagine OG (`public/og.jpg`, 1200×630) è generata da HTML+CSS in
`scripts/og/og.html` e screenshot con Chromium headless; rigenerarla con:

```sh
chromium --headless=new --no-sandbox --hide-scrollbars --window-size=1200,630 \
  --screenshot=public/og.png file://$(pwd)/scripts/og/og.html
# poi convertire in JPG (es. con sharp)
```

## Crediti immagini

- `miele_acacia.jpg`, `miele_castagno.jpg` e `miele_millefiori.jpg` — foto
  originali del titolare (miele di acacia, castagno e millefiori estivo),
  ottimizzate in `public/img/miele_di_acacia-*`, `public/img/miele_di_castagno-*`
  e `public/img/miele_millefiori_estivo-*`.
- `foto_dei_3_mieli_acacia_millefiori_e_castagno.jpg` — foto di gruppo (hero
  home), ottimizzata in `public/img/3_baratooli_di_miele_di_acacia_millefiori-*`.
- Altre foto di barattoli e apiario: materiale originale del titolare.
