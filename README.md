# Bio & Golosità — Sito web

Sito dell'azienda apistica **Bio & Golosità di Antoci Raffaele** — miele di api
proprie a Cassano d'Adda (MI), provincia di Milano.

Stack: **Astro 7** (statico) · CSS custom · deploy su **Cloudflare Workers**
(static assets) — `wrangler deploy` con `wrangler.jsonc`, non Pages.

## Pagine

| URL | Contenuto |
| --- | --- |
| `/` | Home **compatta**, 9 sezioni: hero corta, **i nostri prodotti** (miele, polline, api regine, nuclei: una card con foto per ciascuno), 4 motivi, Raffaele, foto apiari, dove consegniamo, recensioni Google, FAQ brevi, contatti |
| `/miele/` | **Hub mieli**: i 4 mieli + il miele in favo nella stessa griglia, cosa significa artigianale/non pastorizzato, tabella prezzi e formati, FAQ |
| `/miele/miele-di-acacia/` | Landing SEO Miele di Acacia, **con il video della smielatura** |
| `/miele/miele-millefiori/` | **Hub millefiori**: cos'è il millefiori e le due produzioni |
| `/miele/miele-millefiori-estivo-al-tiglio-e-more/` | Landing SEO Miele Millefiori Estivo al Tiglio e More, **con il video della smielatura** |
| `/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/` | Landing SEO Miele Millefiori Estivo al Tiglio e Ailanto |
| `/miele/miele-di-castagno/` | Landing SEO Miele di Castagno |
| `/miele/miele-in-favo/` | **Miele in favo**: il miele lasciato nella sua cera, con video |
| `/polline-d-api/` | **Polline d'api**: prodotto, origine, conservazione, FAQ, **video dell'impollinazione** |
| `/api-regine/` | **Api regine**: regine feconde già in deposizione, linea Buckfast (F1 da madre F0), disponibilità, prenotazione, FAQ, **video della regina F1 sulle covate nel testo** e sezione finale **solo video** (nascita, marcatura, regina con le sue api attorno) |
| `/nuclei-api/` | **Nuclei d'api**: struttura dei singoli mieli (prodotto → scheda → tracciabilità → foto → FAQ → altri prodotti), nucleo vs sciame vs pacco d'api, disponibilità, trasporto, **video delle api che si creano lo spazio** |
| `/consegna-miele/` | **Consegna**: come funziona, zone servite, ritiro in sede, map |
| `/guide/` | **Hub guide**: 6 approfondimenti collegati alle pagine commerciali |
| `/guide/<slug>/` | Le 6 guide: non pastorizzato, cristallizzazione, differenze tra mieli, nucleo/sciame/pacco, introduzione regina, polline |
| `/chi-siamo/` | E-E-A-T: storia, metodo, apicoltore |
| `/contatti/` | Contatti e come ordinare |

## Comandi

```sh
bun install
bun run dev          # sviluppo su localhost:4321
bun run build        # build statica in dist/
bun run assets       # rigenera font, immagini, poster, favicon — servono i sorgenti in root, che NON sono nel repo (vedi "Immagini")
bun run og           # rigenera le immagini OG delle pagine (public/og/, vedi "Immagini OG")
bun run deploy       # build + `wrangler deploy` del Worker `bio-golosita` (static assets da ./dist)
```

Un `git push` su `main` fa partire da solo il build di Cloudflare Builds
(`bun run build` + `npx wrangler deploy`): non serve deployare a mano, e **una
build rotta non pubblica niente** — le API di Workers rifiutano l'intero
rilascio, quindi gli asset nuovi restano invisibili finché non passa.

## Struttura

```
public/            # asset statici serviti così come sono (img/, video/, fonts/, og.jpg, og/, _headers, _redirects…)
src/
  data/site.js     # ★ dati dell'azienda: telefono, prezzi, orari, mieli, miele in favo, zone di consegna, area servita
  data/bee-products.js  # ★ polline, api regine, nuclei: prezzi/disponibilità/linea (⚠️ voci da completare)
  data/guides.ts   # ★ le 6 guide informative (titoli, meta, contenuto a blocchi)
  data/og.js       # ★ rotta → immagine OG (public/og/<slug>.jpg): unica fonte per sito e generatore
  layouts/Base.astro
  components/      # Header, Footer, Picture (AVIF), Icons, Emoji, Lightbox, Gallery, PageHero, Faq,
                   # PhotoGallery, VideoFigure, ProseBlocks, ProseFigure, ProductPage, CtaBand, PhoneCta, LinkCards…
  pages/           # pagine + route dinamiche /miele/[slug] e /guide/[slug]
  lib/schema.js    # generatori JSON-LD (LocalBusiness, Product, CollectionPage, Article, FAQPage, BreadcrumbList…)
  lib/images.js    # URL/srcset versionati dal manifest delle immagini (una sola fonte)
  lib/types.ts     # tipi condivisi (Block, Crumb, FaqItem, GalleryPhoto)
  integrations/sitemap.mjs  # genera dist/sitemap.xml dalle pagine reali a fine build
  styles/global.css
scripts/           # tooling: font, immagini, poster, favicon, QA, Lighthouse, OG (scripts/og/)
```

## Hero con immagine di sfondo

Quasi tutte le pagine hanno la hero con la foto **dietro** al testo (full-bleed).
Tre eccezioni volute:

- le **quattro pagine dei singoli mieli**: hero **solo testo**, con la foto del
  barattolo (o del favo) nel blocco prodotto subito sotto (resa originale, la più
  leggibile);
- i **tre prodotti dell'alveare** (**`/polline-d-api/`**, **`/api-regine/`**,
  **`/nuclei-api/`**): stessa hero **solo testo** dei singoli mieli, con la foto
  del prodotto nel blocco sotto. La prop `heroBg` di `ProductPage.astro` è
  opzionale: senza sfondo cambiano anche il preload (nessuno) e il padding del
  blocco prodotto, che passa a `--space-3` come nei mieli. **`/nuclei-api/`** va
  oltre e non usa più `ProductPage.astro`: è scritta con lo stesso scheletro dei
  singoli mieli (blocco prodotto, "il prodotto", tracciabilità, FAQ, "gli altri
  prodotti"), con in più la gallery delle foto;
- **`/chi-siamo/`**: hero **senza sfondo**, con la foto di Raffaele *accanto* al
  testo (`.split` + `.split-media`, ritratto largo max 22rem). È il disegno
  originale della pagina, ripristinato: qui la foto di Raffaele è la prima cosa
  che si vede, e vale più di uno sfondo.

Il meccanismo sta in `PageHero.astro` (prop `bg`, **opzionale**) e nelle classi
`.hero--bg` / `.page-hero--bg` di `global.css`:

- **Le CTA della hero stanno dentro la hero** (`<PageHero>` accetta i bottoni nel
  suo slot, resi dopo il sottotitolo): allineati al titolo, 24px sotto l'intro,
  due per riga da desktop e a piena larghezza impilati da mobile. Prima erano in
  una `<section>` a parte subito sotto, quindi finivano su fondo chiaro 8px dopo
  la fine della foto e sembravano staccate dalla pagina. `qa-contrast.mjs` misura
  anche i `.btn` della hero — il bottone "ghost" sta sopra la foto, e per
  misurarlo il testo diventa trasparente mentre il suo fondo resta.

- `<Picture>` in un layer `position: absolute` con `object-fit: cover`;
- **scrim** a due gradienti sopra la foto: è quello che garantisce il contrasto,
  non il colore del testo. Le tinte sono **calde, color miele** e non nere. Da
  desktop il velo è pieno **solo sulla colonna del testo** (`calc(50% + 10rem)`,
  quanto può essere larga la colonna da 42rem) e poi crolla quasi a zero: la
  foto resta ben visibile sulla destra. Su mobile il testo occupa tutta la
  larghezza, quindi il velo è quasi uniforme (più leggero di prima, ma pieno);
- il testo delle hero resta quindi **dentro la colonna protetta**: `.hero-text`
  nella home, `h1`/`p` a `max-width: 42rem` nelle `page-hero`;
- **focal positioning** per pagina: `--hero-pos` (desktop) e `--hero-pos-m`
  (sotto i 900px), così il soggetto resta visibile quando il crop cambia.
  Esempio: `bg={{ base: 'arnia_piena_di_api', position: '50% 50%', positionMobile: '50% 42%' }}`.
  La hero della home usa `apiari_hd` (gli apiari visti dal prato) con `50% 50%`:
  la foto è orizzontale e da desktop il taglio è quasi solo verticale, quindi il
  centro va bene. Su mobile la fascia è più alta che larga e si vede solo ~27%
  della larghezza: lì conta la X, fissata al **18%**, la finestra che tiene
  dentro le arnie.
- la foto di sfondo è **decorativa** (`alt=""` + `aria-hidden`), non si apre nel
  lightbox (`zoomable={false}`) e non è mai l'unico contenuto informativo;
- la pagina passa a `Base` il prop `preloadImage` con la stessa base
  dell'immagine di sfondo: il `<link rel="preload">` usa `imagesrcset` con le
  stesse `sizes="100vw"` dell'`<img>`, quindi l'LCP non viene scaricato due volte.

**Il contrasto è verificato, non stimato.** Il testo delle hero usa colori
opachi per restare misurabile, e `scripts/qa-contrast.mjs` nasconde il testo,
fotografa la hero e campiona i pixel sotto **le righe di testo effettive**
(`Range.getClientRects`, non la casella del blocco: un `h1` è largo quanto il
contenitore anche se il testo ne occupa metà) e calcola il rapporto WCAG (98°
percentile di luminanza = quasi worst-case). Soglia richiesta: **≥ 4.5:1 su
desktop e mobile**. Se cambi uno scrim o una foto, rilancia lo script: è lui a
dire se il contrasto tiene. Per alleggerire ancora l'overlay su una pagina,
allarga la zona protetta *e* accorcia il testo: mai allargare solo il testo.

## Interazioni e tabelle

- **Link nel testo**: dentro `<main>` un `a` che sta in un paragrafo, in un
  elenco, in una cella di tabella, in una didascalia o in una citazione è
  **ambra e sottolineato** (`a` di base resta `color: inherit; text-decoration:
  none`, quindi senza questa regola un link sembrava testo normale).
  Sottolineatura 1px con `text-underline-offset`, e al passaggio del mouse colore
  più scuro e sottolineatura 2px. Restano fuori i link che hanno già uno stile
  proprio: bottoni, card, righe dei contatti e link dei video; header, footer e
  menu hanno le loro regole. Contrasto misurato: il caso più stretto è 4,51:1
  (ambra su `--bg-soft`, nel testo di `/nuclei-api/`), tutti gli altri ≥4,93:1 —
  sopra la soglia di 4,5:1 verificata da `qa-contrast.mjs`.
- **Header**: i 6 link di navigazione si nascondono sotto i 900px (menu
  hamburger). La CTA telefonica cambia **etichetta** con la larghezza: da desktop
  (≥900px) mostra il **numero** (`site.phoneLocal`, "351 537 6719") a destra del
  menu — si legge e si copia, e dice subito a chi si telefona; sotto i 900px torna
  "Chiama ora", che è l'azione giusta da mobile; sotto i **480px resta solo
  l'icona del telefono** (`.header-cta` 44×44), perché il testo andava a capo su
  due righe e sembrava rotto. Le due etichette convivono nel DOM
  (`.cta-phone-label--action` / `--number`) e il CSS ne mostra una sola:
  `display: none` esce anche dall'albero di accessibilità, quindi il nome del
  link resta corretto a ogni larghezza — e sotto i 480px lo tiene
  l'`aria-label` ("Chiama ora: 351 537 6719"). `qa-browser.mjs` verifica che a
  desktop la CTA ci sia, mostri il numero e non quella d'azione, e che sotto i
  900px sia il contrario (solo icona sotto i 480px, su una riga fino a 560px).
- **Menu desktop a destra, CTA in fondo**: sopra i 900px il menu e la CTA
  telefonica stanno a filo del bordo destro del contenuto, con lo stesso margine
  che ha il logo a sinistra (scelta esplicita). Fra menu e CTA ci sono **24px**
  (il `gap` dell'header, 1rem, più `margin-left: 0.5rem` su `.header-actions`):
  col solo `gap` la pillola del numero restava appiccicata al menu. È
  `margin-left: auto` **sul menu** a spingere entrambi al bordo: sulla CTA un
  margine automatico (o uno più generoso) la staccherebbe dal menu, e i due
  margini automatici si spartirebbero lo spazio portando il menu a metà pagina.
  Il `gap` fra le voci del menu è 1.2rem (non 1.6rem): è la misura che a 900px
  lascia ~27px fra logo e menu anche con la CTA del numero in linea.
  `qa-browser.mjs` controlla che la CTA sia a filo (±2px dal margine del logo),
  che ci siano almeno 20px fra menu e CTA, che a 900/1000/1100/1149px il menu
  resti su una riga **e che il logo non venga schiacciato**: a 900px l'header è
  al limite e, se qualcosa non ci sta, il flex comprime il logo (`min-width: 0`)
  invece di traboccare, facendo finire il testo del marchio sotto il menu.
- **Menu centrato otticamente, non solo come scatola**: il centro della scatola di
  un link cade sempre al centro dell'header, ma l'inchiostro delle lettere no —
  l'underline da 2px sta solo sotto e le metriche di Inter mettono il centro di
  maiuscole e rigo ~1px sopra il centro della riga. Il padding di `.nav a` è
  quindi asimmetrico di proposito (6px sopra, 2px sotto): senza, il menu sembrava
  2px alto rispetto al logo e alla pillola della CTA, che sono forme piene.
  Stesso discorso per `.logo-mark`, che da `inline` si portava dietro il
  discendente del "tronco" (il line-height del logo): stava 1px alto dentro la
  sua scatola e faceva crescere il logo di 2px — da `block` si centra davvero.
  `qa-browser.mjs` qui misura i **pixel**, non le scatole: prende le voci senza
  discendenti (`g/j/p/q/y`), trova le righe d'inchiostro e verifica che il centro
  stia entro 1px dal centro dell'header, con logo e CTA entro 0.5px.
- **Voce di menu della pagina attuale**: la sezione in cui ti trovi resta accesa
  con **lo stesso effetto dell'hover** (desktop: testo ambra + sottolineatura;
  mobile: fondo tenue), così si capisce subito dove sei. L'evidenziazione è per
  sezione, non per pagina esatta: su `/miele/miele-di-acacia/` è accesa "Mieli"
  (`isCurrent()` in `Header.astro`). La home **e le guide** non sono voci del
  menu — le guide restano raggiungibili dal footer e dalle card in pagina —
  quindi lì nessuna voce è accesa. Due controlli
  permanenti: `audit.mjs` verifica che la voce accesa sia **quella giusta** (e una
  sola) su ogni pagina, `qa-browser.mjs` confronta gli stili calcolati della voce
  attiva con quelli dell'hover e fallisce se differiscono — è così che è saltato
  fuori che da mobile la voce attiva teneva il separatore che l'hover toglie.
- **I link del menu non si rimpiccioliscono mai**: nessuna fascia "compattata",
  la dimensione (0.95rem) è la stessa da 900px a 1920px. Il desktop stretto tiene
  comunque: a 900px il menu è intero su una riga con ~27px fra logo e menu (il
  resto dello spazio se lo prende la CTA del numero). `qa-browser.mjs` misura il
  font a 900/1000/1100/1149px e fallisce se cambia o scende sotto i 15px.
- **CTA telefonica di hero e blocchi prodotto**: `<PhoneCta>` — stesso scambio di
  etichetta dell'header, con una differenza: da mobile mostra "Chiama ora" **e**
  l'icona (lì la label non si nasconde mai). Da desktop l'etichetta è il numero,
  così la pagina dice subito a chi telefonare. La CTA in fondo alle pagine
  (`CtaBand`) resta invece "Chiama ora" a ogni larghezza.
- **Etichetta prezzo delle card**: `<PriceBadge>` (`.price-badge`) sta in alto a
  sinistra **sopra la foto**, non nel corpo della card, ed è lo stesso componente
  per tutte le card con prezzo (home, `/miele/`, prodotti): così le rese non
  possono divergere. `qa-browser.mjs` controlla che ogni etichetta sia dentro il
  riquadro della foto, su una riga o a capo senza tagli, e che il numero atteso
  ci sia (4 in home, 9 su `/miele/`).
- **Card dei reparti**: `<ProductCards>` (griglia foto + prezzo + testo + link) è
  condivisa da home e `/miele/`; le card di rimando nelle pagine interne usano
  `<LinkCards>` con `img`/`alt`. **Nessuna card resta senza foto**: le immagini
  vengono da `repartoImages` in `bee-products.js` (mieli, polline, regine,
  nuclei, consegna) e da `guideCard()` in `guides.ts` per le guide, che riusa la
  foto della hero della guida. L'audit fallisce se una `.card` non contiene
  un'immagine.

- **Lightbox** (`Lightbox.astro`): frecce ← → a schermo, tasti freccia della
  tastiera e `Esc` per chiudere; la galleria sfogliabile è composta dalle foto
  della **stessa sezione** (`img.lightbox-target`), quindi ogni galleria scorre
  solo le proprie immagini. Con una sola foto le frecce restano nascoste
  (`[hidden]`).
- **Navigazione fra i prodotti**: non c'è più nessun tasto "Precedente /
  Successivo" in fondo alle pagine (il vecchio `ProductPager.astro` è stato
  rimosso, insieme al suo CSS e alla lista `beeProductItems`). Si va da un
  prodotto all'altro con le card "Continua" in fondo a ogni scheda, con i link
  del footer e con i rimandi dentro i testi: le card "Gli altri mieli" per i
  mieli, "Nuclei, guide e mieli" / "Regine e guide per iniziare" per i prodotti
  dell'apicoltura.
- **Tabella prezzi** (`/miele/#mieli`): sotto i **640px** non scorre più in
  orizzontale, si impila in schede usando i `data-label` delle celle come
  etichette. Era l'unica area del sito con scroll orizzontale: il QA browser
  verifica che nessun bottone abbia testo fuori dal riquadro e che la pagina non
  sbordi a 360, 375 e 1280px.
- **Sezione "come lavoriamo" a piena larghezza** (`/miele/`): è l'unica `.prose`
  del sito senza il limite di 46rem (classe `prose--wide` in `global.css`), così
  occupa tutto il container come le altre sezioni della pagina. Dentro, le righe
  testo+foto dei blocchi `row` si prendono metà e metà dello spazio e la **foto
  cambia lato**: prima riga a destra, seconda a sinistra (`.prose--wide
  .prose-row:nth-of-type(even)`, che inverte l'`order` del testo). Sotto i 900px
  le righe si impilano e l'alternanza non ha effetto. Misurato a 1280px: sezione
  1056px, colonne 508px (≈60 caratteri per riga), nessun overflow; le altre
  pagine restano a 736px.

## TODO prima del lancio (dati segnaposto)

`src/data/bee-products.js` (polline, api regine, nuclei) — finché restano `null`
le pagine mostrano una frase neutra ("Prezzo su richiesta", "chiedici la
disponibilità") e **non** inventano nulla. Fatto: polline (barattolo da 200 g a
€ 5,50 → `prezzo` + `formato`, e la disponibilità: fresco aprile–maggio,
essiccato anche dopo), api regine (disponibili da fine maggio in poi), nuclei
(dai primi di aprile in poi). Restano da completare `polline.raccolto/lavorazione`,
`apiRegine.prenotazioneDa/documenti`, `nuclei.telai/prenotazioneDa`.
Le disponibilità sono scritte in `disponibilita` **e** nella riga
`Disponibilità` di `specs`; per i nuclei la stessa data compare anche nel testo e
nella FAQ "Quando sono disponibili i nuclei?".

In `src/data/site.js`: `reviews` (le recensioni Google autentiche, vedi sotto),
`hours` / `hoursNote`, e l'`annata` di ogni miele (`annata: null`).

**Formato dei prezzi.** I prezzi si scrivono a mano nei dati, in due forme:

- **formati di vendita** (i mieli): `priceFormats: [{ size: '500 g', price: '€ 6,00' }]`
  in `src/data/site.js`. Da qui si ricavano il prezzo d'ingresso più basso, la
  riga mostrata nella pagina del prodotto, il badge delle card (`da …`), le
  colonne della tabella su `/miele/`, le risposte delle FAQ e le varianti dei
  dati strutturati (`src/lib/price.js`: `entryFormat`, `otherFormats`, `priceLine`,
  `priceFrom`);
- **prezzo unico** (polline, api regine, nuclei): `prezzo: "300,00 € (10,00 € al
  pezzo)"`. Il contenuto tra parentesi viene reso più piccolo da
  `src/components/Price.astro` / `splitPrice`, così la divisione resta leggibile
  senza rubare spazio al totale.

**Miele in favo (`site.honeyComb`).** Non è una varietà: è il miele lasciato nel
favo, con la sua cera. Per questo sta fuori da `site.honeys` (le varietà, con i
formati 500 g / 1 kg) e ha una scheda propria `/miele/miele-in-favo/` generata
dallo stesso template dei mieli (`miele/[slug].astro`, che legge
`honeyProducts = [...honeys, honeyComb]`). **In `/miele/` però compare con gli
altri mieli**: la griglia della pagina usa `honeyProducts`, quindi il favo è la
sesta card, e una nota sotto la tabella prezzi dice che non ha i formati da
500 g / 1 kg. Non avendo un prezzo pubblicato (`priceFormats: []`), la sua card
mostra la pastiglia **"Prezzo su richiesta"** come le card dei prodotti
dell'alveare: è `HoneyCard.astro` a ripiegare su `prezzoSuRichiesta`, così la
pastiglia non sparisce mai. Il testo che la card mostra sotto il nome
(`characteristics[1]`) resta la disponibilità, non la lavorazione.
Campi propri della scheda: `subject: 'favo'` (in pagina «Da dove arriva questo
favo»), `workNote`/`storageNote` per le righe di tracciabilità, `category` per i
dati strutturati, `guide` per la guida consigliata, `video` (mp4 + poster AVIF,
reso in `.prose-video`) e `gallery` + `galleryTitle`/`galleryIntro` per la
galleria facoltativa (nel template dei mieli non ce l'ha nessun altro). La
`gallery` è **in ordine d'uso** — è anche l'ordine della galleria sfogliabile nel
lightbox, che raggruppa le foto della stessa sezione: le sei foto del favo si
sfogliano di conseguenza. Il campo `photo` non è impostato: il blocco
tracciabilità usa la foto dell'apiario, come i mieli, così la foto del blocco
prodotto non compare due volte nella stessa pagina. Le immagini della galleria
finiscono anche nell'array `image` del JSON-LD del prodotto, dopo la principale.
La **disponibilità è poca e solo su prenotazione**, e si dice in tre punti:
`note` (la riga informativa del blocco prodotto, dove i mieli usano
`site.bulkNote`), una voce in `characteristics` (le chips, che è anche il testo
della card) e la riga `Disponibilità` in `specs`; l'intro della hero e quella
della griglia su `/miele/` lo nominano.
`priceFormats: []` = prezzo non pubblicato: la pagina mostra "Prezzo su
richiesta" e non emette né `Product` né `offers`. Compare in home (testo
della card mieli), nell'hub `/miele/` (card della griglia + nota prezzi), nel
footer, nella `ItemList` e nel catalogo `hasOfferCatalog` di `LocalBusiness`,
dove la voce resta **senza `price`** (nome, immagine e URL: nessun prezzo
inventato).

Nella pagina del miele il prezzo è in evidenza (`.product-price`): il formato
d'ingresso in grande con il formato in piccolo, gli altri formati in una riga più
piccola sotto (`1 kg: € 11,00`). **Nessun prezzo è calcolato dal sito**: si
formatta solo quello che c'è nei dati, e `priceAmount()` torna `null` (offerta
omessa dai dati strutturati) se nella stringa non trova cifre. Finché un prezzo è
`null` le pagine mostrano "Prezzo su richiesta" (e l'audit fallisce se quella
scritta non renderizza, vedi QA).

- [x] **Numero di telefono**: aggiornato a +39 351 537 6719 (CTA "Chiama ora", WhatsApp e schema)
- [x] **Prezzi mieli**: aggiornati — acacia 6,00 (500g) / 11,00 (kg), millefiori 5,00 / 9,00, castagno 6,50 / 12,00 (dati strutturati come `ProductGroup` con una variante per formato)
- [x] **Prezzo polline**: barattolo da 200 g a € 5,50 (pagina, specifiche e `Product` con `Offer`)
- [ ] **Orari**: pubblicati `Tutti i giorni 08:00–21:00` + nota "chiama prima di
      passare"; la scheda Google Business Profile deve riportare gli stessi orari
      (o correggi `hours` in `src/data/site.js`)
- [x] **Recensioni**: le 4 recensioni segnaposto sono state rimosse e sostituite
      con **recensioni reali della scheda Google** (testo fedele, stelle reali,
      etichetta "Recensione Google"): in `src/data/site.js` → `reviews` ce ne
      sono **3**, e la pagina mostra esattamente quelle (nessun contatore
      gonfiato). La recensione "Ottimi prodotti bio naturali." è esclusa di
      proposito perché il miele è convenzionale e non certificato biologico.
      Lo schema `Review`/`AggregateRating` resta **volutamente assente**: per
      aggiungerlo servono media e numero di recensioni reali e aggiornati della
      scheda Google (non vanno stimati). La hero della home riporta «★ 4,9 su
      Google»: è il dato della scheda, non lo calcola il sito.
      Le nuove recensioni si aggiungono in `src/data/site.js` → `reviews`.
- [x] **Partita IVA / REA**: pubblicati nel footer — `P.IVA 12606370968`,
      `REA MI-2744949` — e `vatID` nel JSON-LD `LocalBusiness`.
- [x] **Dominio**: `bioegolosita.it` è il custom domain del Worker `bio-golosita`.
      Il redirect **www → dominio canonico** è una Redirect Rule di Cloudflare che
      gira *davanti* al Worker (conserva percorso e query string) e **non** una
      riga di `_redirects`: lì valgono solo percorsi relativi, vedi “QA”.
- [x] **Google Maps**: scheda attiva — embed della mappa e CTA ("Apri su
      Google Maps", "Vedi su Google Maps") e `hasMap`/`sameAs`
      del JSON-LD puntano alla scheda Google Business Profile

## SEO

- Titoli ≤ 65 char, description ≤ 155 char con keyword locali
- **Niente claim "bio"**: il miele è convenzionale e non certificato biologico.
  Sul sito la parola "bio" non è mai usata come claim (è solo il nome
  dell'azienda) e la FAQ "Il vostro miele è biologico?" è stata **rimossa**: i
  testi parlano di miele artigianale, 100% italiano e non pastorizzato. Il
  vincolo resta anche nella scelta delle recensioni da mostrare (vedi sopra) e
  in `docs/seo-azioni-manuali.md`.
- **La home resta compatta**: ~900 parole e 9 sezioni, niente catalogo né
enciclopedia. Il contenuto SEO vive nelle pagine di destinazione
(`/miele/`, `/miele/miele-millefiori/`, `/polline-d-api/`, `/api-regine/`,
`/nuclei-api/`, `/consegna-miele/`, `/guide/`), raggiungibili da menu — le
guide, che non sono nel menu, dal footer e dalle card in pagina.
Le regole interne: pagine commerciali ≤ ~1200 parole, FAQ 4-5 voci brevi,
nessuna sezione duplicata in pagina (se il tema è già coperto da un blocco o da
una guida, si linka invece di ripeterlo). Misura con `node scripts/density.mjs`.
- **Un solo blocco di conversione per pagina**: si chiude con il blocco contatti
(telefono, WhatsApp, social, orari, indirizzo, mappa) oppure, in
`/consegna-miele/`, con la CTA finale — mai due CTA di fila e mai due mappe
nella stessa pagina. Nelle guide la banda "push" verso la pagina commerciale
sta **prima** di "altre guide", così non tocca il blocco contatti. Le pagine che
avevano una banda CTA con testo specifico non l'hanno perso: il testo è passato
nel blocco contatti via prop (`eyebrow` / `title` / `intro`, es. `/miele/` e
`/chi-siamo/`). L'audit verifica questa struttura, vedi QA.
- **Le hero non si somigliano**: la home usa gli apiari visti dal prato
  (`apiari_hd`), `/miele/` i tre barattoli (`hero_bg`), ogni pagina miele il suo
  barattolo. Home e hub hanno intenti diversi (locale/brand vs categoria), quindi
  anche titolo, eyebrow e foto restano distinti per non cannibalizzarsi.
- **Chi consegna non si dice**: il miele a volte lo consegna Raffaele, a volte
  un corriere. Il sito quindi non afferma mai chi consegna: niente "non è un
  corriere" / "senza corriere", niente "passiamo noi" / "lo consegniamo noi" /
  "da dove mi trovo". Si parla solo di consegna a domicilio in zona, tempi,
  costo e ritiro in sede. L'audit fallisce se una di quelle frasi ricompare.
- **Località**: in home restano solo le 6 più importanti
(`site.areaServedFeatured`) con la CTA "Scopri tutte le zone servite";
l'elenco completo (15 località, `site.areaServed` → `deliveryZones`) vive in
`/consegna-miele/`, e l'audit fallisce se una di quelle località sparisce dalla
sezione "Dove consegniamo" o se `areaServedFeatured` contiene una località non
servita.
- Architettura a hub: la home presidia il locale (`miele Cassano d'Adda`), `/miele/`
il generico-nazionale (`miele italiano`, `non pastorizzato`, `artigianale`),
`/polline-d-api/`, `/api-regine/`, `/nuclei-api/` i prodotti dell'allevamento
- Cluster di contenuti: 6 guide che linkano le pagine commerciali (e viceversa);
le guide sono l'unico posto con testo lungo (900-1000 parole)
- JSON-LD validi: `LocalBusiness` (NAP + geo + areaServed + founder/Person),
`ProductGroup` + `hasVariant` per i mieli (una `Product`/`Offer` per formato, con
`sku` derivato da slug + formato, `size`, `productGroupID`, `variesBy: size`),
`Product` con `Offer` (e `size` quando c'è) per i prodotti a formato unico —
l'offerta è **omessa** se il prezzo non è pubblicato e il numero si legge solo da
un prezzo reale (`priceAmount`, niente valori di ripiego) — `CollectionPage` +
`ItemList`, `Article`, `Service` (consegne), `AboutPage`, `FAQPage`,
`BreadcrumbList` (generato da `Base.astro` dal prop `crumbs`)
- `sitemap.xml` generato a fine build dalle pagine reali (`src/integrations/sitemap.mjs`),
`robots.txt`, `_redirects`
- Il redirect **www → dominio canonico non sta in `_redirects`**: i Worker con
static assets accettano solo percorsi relativi e il deploy rifiuta le regole a
livello di dominio (code 100324), quindi la riga va lasciata fuori. Il redirect
è una Redirect Rule di Cloudflare che gira *davanti* al Worker e conserva
percorso e query string
- Immagini AVIF/WebP con `width`/`height`, lazy load (LCP escluso), font WOFF2
  subsettati (latin, senza `unicode-range`: bug WebKit su iOS Safari) con `font-display: swap`

## QA

```sh
node scripts/qa.mjs           # alias di audit.mjs
node scripts/audit.mjs        # TUTTE le pagine di dist/: title/desc, canonical, meta robots,
                              # heading, alt e width/height delle img, link interni rotti,
                              # link a http/www, NAP, JSON-LD, copertura del sitemap,
                              # struttura di chiusura (1 sola CTA/contatti per pagina, mappe
                              # non duplicate, nessuna CTA attaccata al blocco contatti)
                              # e campi di conversione mai vuoti (.product-price, .bulk-note,
                              # .price-note: se un fallback non renderizza, l'audit lo dice)
node scripts/qa-browser.mjs   # sweep di tutte le pagine (mobile 375 + desktop 1280):
                              # overflow, h1, img rotte, errori console + interazioni home
                              # (hero con sfondo, preload, lightbox, video)
node scripts/qa-contrast.mjs  # contrasto WCAG del testo delle hero sopra le foto
                              # (desktop + mobile, soglia 4.5:1)
node scripts/density.mjs      # parole/sezioni/FAQ per pagina: segnala con ⚠ le pagine
                              # commerciali sopra ~1200 parole (guide escluse)
node scripts/serve-gzip.mjs 8091 dist   # server statico con brotli per Lighthouse
```

Lighthouse (mobile, throttling standard): **Performance 99 · Accessibility 100 ·
Best Practices 100 · SEO 100** (tutte le pagine; castagno 100/100/100/100).

### Immagini OG

Ogni pagina commerciale ha la sua anteprima social 1200×630 in
`public/og/<slug>.jpg`: foto a tutta pagina con velo caldo e sopra occhiello,
titolo, sottotitolo, chip con prezzo/disponibilità, badge e recapiti. Sono
generate da HTML+CSS con Chromium headless:

```sh
bun run og              # tutte le pagine (o: node scripts/og/generate.mjs home miele)
```

- `src/data/og.js` è **l'unica fonte** dell'abbinamento rotta → file: le pagine
  lo usano via `ogImageFor(path)` e il generatore legge la stessa lista, quindi
  sito e immagini non possono divergere. Le pagine che non compaiono nella mappa
  (guide, 404) restano sul fallback generico `/og.jpg`.
- Il copy sta in `scripts/og/pages.mjs`, il layout in `scripts/og/generate.mjs`.
  Le foto di sfondo sono quelle già pubblicate (`public/img/`, AVIF, `cover`).
- Prima di scrivere ogni JPG il render viene **misurato**, non guardato a occhio:
  overflow, testo fuori dai margini di 56px, gap tra i blocchi, righe del titolo,
  budget di parole (titolo ≤ 8, sottotitolo ≤ 16, chip ≤ 3), foto davvero carica
  e contrasto reale del testo sui pixel dello sfondo (≥ 4.5:1, come
  `qa-contrast.mjs`). Se una pagina non passa, la generazione si ferma con errore.

Il fallback generico `public/og.jpg` (1200×630, impaginazione a due colonne per le
guide e la 404) è un file a parte, disegnato in `scripts/og/og.html`;
rigenerarlo con:

```sh
chromium --headless=new --no-sandbox --hide-scrollbars \
  --user-data-dir="$(mktemp -d)" --virtual-time-budget=4000 \
  --window-size=1200,630 --screenshot=/tmp/og.png file://$(pwd)/scripts/og/og.html
# poi convertire in JPG (es. con sharp)
```

## Icone ed emoji

- **Icone di interfaccia** (`Icons.astro`): set a tratto disegnato in casa (24×24,
  tratto 2, `currentColor`), per frecce, check, telefono, WhatsApp, social.
  `arrow-up-right` è la freccia **diagonale**: segnala un link che porta fuori dal
  sito e va messa **dopo** il testo del bottone, non prima (prima sembra una
  decorazione). Il caso di riferimento è "Tutte le recensioni su Google"
  (`Testimonials.astro`): `target="_blank"` + `rel="noopener"` + la freccia in
  coda + un `sr-only` "(si apre in una nuova scheda)". `audit.mjs` controlla tutte
  e tre le cose su quel bottone.
- **Emoji** (`Emoji.astro`): SVG **Twemoji** inline, **solo due**: 🍯 `honey-pot`
  e 🐝 `honeybee`. Il set è quello del pack
  https://allsvgicons.com/pack/twemoji/ e gli asset arrivano da
  https://github.com/jdecked/twemoji (stesse icone; licenza **CC BY 4.0, che
  richiede l'attribuzione**: questa nota è l'attribuzione). Sono inline
  (nessuna richiesta extra), il `<title>` viene rimosso e l'SVG è `aria-hidden`:
  il `textContent` del titolo resta identico, quindi nessun effetto su SEO o
  screen reader. Dimensione `0.95em` da `.emoji` in `global.css`, così scala con
  il testo accanto.
- **Regola d'uso (esplicita): poche e a tema.** Solo emoji di miele e api —
  niente carrelli, camion, stelle o altri simboli — e solo **dopo
  l'occhiello** di sezioni che parlano davvero di miele o di api, con
  parsimonia: un titolo di sezione a tema, non una emoji per sezione. Le
  posizioni attuali sono cinque (home ×2, `/miele/`, le pagine miele e
  `/chi-siamo/`). I testi delle recensioni Google non si toccano: lì le emoji
  sono citazioni autentiche.

## Crediti immagini

Le foto in `public/img/` e i poster in `public/video/` hanno **nomi file
versionati con content-hash** (`<base>-<width>-<hash>.avif`, poster:
`<nome>-<hash>.avif`): quando una foto cambia cambia l'hash, quindi l'URL è
nuovo e non c'è mai cache stantia (CDN/browser) dopo il deploy.

**Un solo formato: AVIF.** Le foto delle pagine sono generate ed esistono
*unicamente* in AVIF, e i due script qui sotto tengono la regola: qualunque file
non-avif rimasto in `public/img/` o tra i poster viene eliminato alla prima
esecuzione. Conseguenze da sapere:

- `Picture.astro` emette una sola `<source type="image/avif">` e l'`<img>` punta
  all'AVIF: **non c'è più il fallback WebP**. I browser senza AVIF (Safari ≤ 15,
  Android vecchi: ~1-3% del traffico) non mostrano la foto. Se in futuro serve
  il fallback, basta rimettere la seconda `<source>` e rigenerare le varianti.
- **Restano fuori dalla regola** (non sono foto di pagina, e i lettori che le
  consumano non leggono AVIF): le anteprime social — `public/og.jpg` (fallback
  generico) e le immagini per pagina `public/og/*.jpg` — perché WhatsApp,
  Facebook e LinkedIn non renderizzano AVIF, quindi togliere i JPG romperebbe
  ogni anteprima dei link — e le favicon (`favicon-*.png`, `apple-touch-icon.png`,
  `favicon.ico`, `logo.svg`).

**I sorgenti delle immagini non sono nel repo.** Il commit *Project cleanup*
(`8a80489`) ha tolto da git **e dal disco** i 36 file sorgente — le foto
originali del titolare, `apiari-hd.png`, `hero-bg.jpg`, le sorgenti jpg dei
poster, `miele-in-favo-*.avif` — per non caricare il repo di decine di MB;
`.gitignore` non li nomina, quindi non rientrano da soli in un `git add -A`.
Gli script di pipeline (`process-images.mjs`, `posters.mjs`, `favicons.mjs`) li
cercano ancora in root, quindi **`bun run assets` non gira** finché non si
ripescano dalla storia (`git checkout a38161c -- <file>`) o dalle copie del
titolare. La build non ne ha bisogno: usa gli AVIF già in `public/img/` e
`src/data/img-manifest.js`.

**Un'eccezione: le foto di prodotto dei mieli.** Le cinque sorgenti
`miele-*.jpg` (acacia, castagno, i due millefiori estivi, miele in favo) sono di
nuovo in root — sono le foto dell'ultimo aggiornamento del catalogo e le uniche
che `process-images.mjs` rigenera oggi: il resto delle basi resta com'è finché
non si ripescano gli altri sorgenti.

Qui sotto resta la mappa **sorgente → varianti pubblicate**; dove è scritto
*root* si intende il nome del file di partenza, non un file presente nel repo.

- **Le foto di prodotto dei mieli** (root) — originali del titolare, una per
  scheda, **già in 4:3** come il riquadro del blocco prodotto (`.product-media`)
  e delle card (`.honey-card-media`), quindi riempiono lo slot senza ritaglio.
  Il nome del file sorgente è **lo slug della pagina**, e lo è anche la base
  pubblicata: URL dell'immagine e URL della pagina dicono la stessa cosa.
  - `miele-di-acacia.jpg` → `public/img/miele-di-acacia-*`;
  - `miele-di-castagno.jpg` → `public/img/miele-di-castagno-*`;
  - `miele-millefiori-estivo-al-tiglio-e-more.jpg` →
    `public/img/miele-millefiori-estivo-al-tiglio-e-more-*`;
  - `miele-millefiori-estivo-al-tiglio-e-ailanto.jpg` →
    `public/img/miele-millefiori-estivo-al-tiglio-e-ailanto-*`.

  Tutte con le varianti 1200, 900, 600, 400: il blocco prodotto delle schede ha
  una colonna da 520px (quindi 1200 basta anche a DPR 2) e le card della griglia
  stanno a ~380-400px. La scheda **`miele-millefiori-primaverile` è stata tolta
  dal catalogo** (il miele non si produce più): l'URL ora fa 301 sull'hub dei
  millefiori (vedi `public/_redirects`), e con lei sono spariti la base
  `miele_millefiori_primaverile` e la base `miele_millefiori_card` — era il
  ritaglio 4:3 della foto del millefiori, che con sorgenti già 4:3 non serve più
  (per questo `CROPS` in `process-images.mjs` è vuoto).
- `miele-in-favo.png` (root, 1264×1188) — **sostituita** dalla foto nuova
  `miele-in-favo.jpg` (2560×1920, 4:3): ottimizzata in
  `public/img/miele-in-favo-*` (varianti 1200, 900, 600, 400) è la **foto del
  blocco prodotto** di `/miele/miele-in-favo/` e l'immagine della sua card nella
  griglia di `/miele/`.
- `apiari-hd.png` (root, 1672×941) — **immagine generata**, non una foto: è
  un PNG con estensione `.jpg` (per questo rinominata), senza EXIF di macchina,
  come dichiarava il manifest C2PA che portava (`c2pa.created` di `gpt-image` /
  OpenAI Media Service API, tipo `trainedAlgorithmicMedia`). È la **hero della
  home**: ottimizzata in `public/img/apiari_hd-*`. Usata consapevolmente come
  sfondo decorativo, non come foto dell'apiario: per le foto reali valgono le
  regole qui sotto.
- `sciami1.jpg … sciami7.jpg` (root) — foto di sciami/nuclei del titolare, ottimizzate in
  `public/img/sciame_1-*` … `sciame_7-*` (pagina `/nuclei-api/`): `sciame_4` è la
  **foto principale** della pagina (blocco prodotto) e l'immagine del `Product`
  nei dati strutturati, le altre restano nella gallery.
- `ape_regina_di_raffaele.jpg` (root) — foto reale dell'ape regina dell'apiario,
  ottimizzata in `public/img/ape_regina_di_raffaele-*`: foto del blocco prodotto
  di `/api-regine/` e hero della guida sull'introduzione della regina.
- `api` (**senza sorgente nella root**: le varianti `public/img/api-480-*` e
  `api-800-*` sono storiche e non vengono rigenerate da `npm run assets`) — macro
  delle api, usata come **foto secondaria** nel testo di `/api-regine/`, così la
  stessa foto della regina non compare due volte nella pagina.
- `arnia-piena-di-api.jpg` (root) — foto di un'arnia piena di api, ottimizzata in
  `public/img/arnia_piena_di_api-*`: è la foto della card dei nuclei (home e
  `/miele/`) e una foto nel testo di `/miele/`. `arnia-piena-di-api2.jpg` non è più usata (sul blocco prodotto
  di `/nuclei-api/` c'è `sciame_4`): le sue varianti non si generano più, basta
  rimettere la riga in `scripts/process-images.mjs` per riaverla.
- `miele-in-favo-1.avif … miele-in-favo-6.avif` (root, 478×850, già AVIF) — sei
  fotogrammi ricavati dal video del favo, **numerati nell'ordine d'uso**: dal favo
  ancora attaccato al telaio (la 1) all'assaggio di Raffaele (la 6). Sono
  ottimizzati in `public/img/miele_in_favo_1-*` … `miele_in_favo_6-*` (variante
  400) e finiscono, in quell'ordine, nella galleria `Dal favo all'assaggio` della
  pagina: la classe è `g-item--portrait` (aspetto 9/16, come i fotogrammi) su una
  griglia a 3 colonne, così le foto non vengono ritagliate da `object-fit: cover`.
- `video_che_mostra_ape_regina_con_tante_api_attorno.mp4` (root) → pubblicato come
  `public/video/ape-regina-con-api.mp4` sulla pagina `/api-regine/` (video
  originale del titolare, non ricodificato: 9,8 MB, 848×478, ~21 s). Il poster
  `public/video/ape-regina-con-api-poster.jpg` è un fotogramma estratto con
  `ffmpeg -ss 2 -i <video> -frames:v 1 -q:v 3 <poster>.jpg` e ottimizzato da
  `scripts/posters.mjs`. Se serve alleggerirlo:
  `ffmpeg -i <video> -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -c:a aac -b:a 64k -ac 1 -movflags +faststart out.mp4`
  (≈5,7 MB, SSIM 0,93 — il girato è molto movimentato, quindi comprime poco).
- I **video degli apiari** girati dal titolare (sorgenti in root, nome che dice
  cosa mostrano): pubblicati in `public/video/` con un nome parlante e ricodificati
  in H.264/AAC (compatibile su tutti i browser) con il comando qui sopra, più il
  poster da un fotogramma. In totale 99,1 MB → 38,1 MB:
  - `smielatura_miele_acacia_2026.mp4` → `smielatura-acacia.mp4` (720×1280,
    19 s, 2,9 MB) — scheda del miele di acacia;
  - `video-che-mostra-la-smielatura-millefiori-more-e-tiglio-2026.mp4` →
    `smielatura-millefiori-tiglio-more.mp4` (576×1024, 24 s, 3,0 MB) — scheda del
    millefiori estivo al tiglio e more;
  - `raffaele-che-mostra-la-nascita-di-una-regina.mp4` →
    `nascita-di-una-regina.mp4` (576×1024, 38 s, 2,8 MB) e
    `raffaele-che-spiega-e-mostra-perche-e-come-marce-una-regina-(con-il-pennarello).mp4`
    → `marcatura-della-regina.mp4` (576×1024, 43 s, 6,7 MB) — `/api-regine/`;
  - `video-emozionante-che-mostra-le-api-che-producono-il-miele.mp4` →
    `api-che-producono-il-miele.mp4` (720×1280, 25 s, 9,3 MB) — galleria della home;
  - `raffaele-che-mostra-lo-spirito-di-adattamento-delle-api-che-si-sono-create-spazio-da-sole.mp4`
    → `api-che-si-creano-spazio.mp4` (576×1024, 57 s, 8,2 MB) — `/nuclei-api/`;
  - `video-emozionante-girato-da-raffele-che-mostra-le-sue-api-che-impollinano-un-fiore.mp4`
    → `api-che-impollinano.mp4` (480×856, 9 s, 0,5 MB) — `/polline-d-api/`;
  - `regina-f1-su-covate.mp4` → `regina-f1-su-covate.mp4` (478×850, 19 s,
    5,1 MB, audio mono 64k come gli altri) — `/api-regine/`, **non nella
    galleria** ma nel testo, subito sotto la sezione «La nostra linea: regine
    Buckfast, figlie di una madre F0»: è un blocco `video` di `ProseBlocks`
    (mp4 + poster AVIF reso in `.prose-video`, come il video dei mieli). Il
    poster è il fotogramma a 5 s, scelto misurando la nitidezza di dieci
    fotogrammi distribuiti sul girato (vedi la voce in `scripts/posters.mjs`).
  I video sono `preload="none"` con poster: quei MB si scaricano solo se il
  visitatore li fa partire, non all'apertura della pagina.
- **I metadati si tolgono prima di pubblicare**, foto e video. Le foto, senza
  ricodifica e senza toccare i pixel: `exiftool -all= -overwrite_original <file>`
  (per un PNG con un manifest C2PA serve anche `-JUMBF:all=`, che `-all=` da solo
  non rimuove). Su un PNG `-all=` però non tocca i chunk di colore (`cHRM`,
  esportati da ExifTool come `WhitePointX/Y`, `RedX/Y`, `GreenX/Y`, `BlueX/Y`:
  «Not a deletable group: cHRM»): lì serve una passata
  `magick <file>.png -strip <file>.png`, che è lossless (verificabile con
  `magick compare -metric AE` sul prima/dopo = `0`) e lascia solo
  IHDR/IDAT/IEND. I video, o con una passata senza ricodifica
  (`ffmpeg -i in -map 0 -map_metadata -1 -map_chapters -1 -c copy -fflags +bitexact out.mp4`)
  o direttamente con la ricodifica qui sopra, aggiungendo `-map_metadata -1` e
  `-fflags +bitexact` (che non scrive nemmeno il nome dell'encoder). Gli AVIF di
  `public/img/` nascono già senza metadati: sharp non li copia se non glielo si
  chiede. Attenzione: `/img/*` e `/video/*` sono `immutable` in `public/_headers`,
  quindi un file ripubblicato con lo stesso nome resta in cache dai client fino a
  un anno — per correggere un video pubblicato serve cambiargli nome.
- Le **foto stock** (immagini illustrative generiche: fiori, api, favi, polline,
  barattoli) arrivano da **Pexels** e sono pubblicate con
  `scripts/add-stock-image.mjs`: `prato_fiorito`, `fiori_robinia`, `honey_favo`,
  `honey_favo_aperto`, `ape_polline`,
  `polline_granuli`, `miele_cristallizzato`, `miele_colazione`, `miele_versare`.
  Vanno usate solo come immagini di contesto/illustrative, con
  didascalie che descrivono quello che la foto mostra davvero.
- **Apiari e persone: solo foto originali.** Nessuna foto stock deve mostrare un
  apiario o una persona in tuta da apicoltore. Per l'apiario le uniche foto
  ammesse sono `apiario` e `arnie` — varianti storiche in `public/img/`, senza
  sorgente in root (`arnie` non ha nemmeno più una voce in
  `process-images.mjs`), quindi non rigenerabili; per il
  lavoro in apiario si usano le foto del titolare
  (`raffaele_sorridente_con_le_sue_api`,
  `arnia_piena_di_api`, `ape_regina_di_raffaele`, `sciame_1` … `sciame_7`). Per
  questo le stock `apiario_arnie`, `apicoltore_telaio`, `favo_covata`,
  `arnia_nucleo` e `sciame_ramo` sono state **eliminate**: non reintrodurle.
  **Unica eccezione: la hero della home (`apiari_hd`)**, che è un'immagine
  generata usata come sfondo decorativo del prato — non racconta l'apiario, e
  infatti non è una foto del titolare (vedi la voce nei crediti).
- Altre foto di barattoli e apiario: materiale originale del titolare.
