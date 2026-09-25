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
| `/miele/miele-di-acacia/` | **Scheda del miele**: hero corta, blocco prodotto (prezzo, **voto sotto il prezzo**, 4 caratteristiche, CTA), «Da dove arriva» (foto apiario + 4 dati + video della smielatura), 3 recensioni del prodotto, FAQ, altri mieli, CTA compatta |
| `/miele/miele-millefiori/` | **Hub millefiori**: cos'è il millefiori e le due produzioni |
| `/miele/miele-millefiori-estivo-al-tiglio-e-more/` | **Scheda del miele** (stessa struttura dell'acacia), con **i video della smielatura e dei barattoli riempiti** |
| `/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/` | **Scheda del miele** (stessa struttura), con il video della smielatura del millefiori |
| `/miele/miele-di-castagno/` | **Scheda del miele** (stessa struttura) |
| `/miele/miele-in-favo/` | **Scheda del miele** (stessa struttura, in più la galleria dal favo all'assaggio): il miele lasciato nella sua cera |
| `/polline-d-api/` | **Scheda prodotto** (stessa struttura delle altre): hero corta, blocco prodotto (**€ 5,50 / 200 g**, voto, 4 caratteristiche, CTA), «Da dove arriva il nostro polline» (4 dati + foto), galleria con **video dell'impollinazione**, **1 recensione**, FAQ, altri prodotti, CTA compatta |
| `/api-regine/` | **Scheda prodotto** (stessa struttura delle schede miele): hero corta, blocco prodotto (**€ 20,00 / regina**, voto, 4 caratteristiche, CTA), «Come alleviamo le nostre regine» (F0 → F1, celle al 10°–11° giorno, apiari di fecondazione fatti da noi, 4 dati), **i tre video delle regine**, 3 recensioni del prodotto, FAQ, altri prodotti, CTA compatta |
| `/nuclei-api/` | **Scheda prodotto** (stessa struttura): hero corta, blocco prodotto (**€ 99,00 a nucleo**, voto, 4 caratteristiche, CTA), «Da dove arriva questo nucleo» (4 dati + foto), galleria foto **a 3 colonne** + **video delle api che si creano lo spazio**, 2 recensioni del prodotto, FAQ, altri prodotti, CTA compatta |
| `/consegna-miele/` | **Consegna**: come funziona (con la **foto degli ordini preparati** e il **video della preparazione nel blocco dei tre passi**), zone servite, ritiro in sede, map — hero con la foto di Raffaele |
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
  data/bee-products.js  # ★ polline, api regine, nuclei: prezzi, disponibilità, origine e recensioni (⚠️ voci da completare)
  data/guides.ts   # ★ le 6 guide informative (titoli, meta, contenuto a blocchi)
  data/og.js       # ★ rotta → immagine OG (public/og/<slug>.jpg): unica fonte per sito e generatore
  layouts/Base.astro
  components/      # Header, Footer, Picture (AVIF), Icons, Emoji, Lightbox, Gallery, PageHero, Faq,
                   # PhotoGallery, VideoFigure, ProseBlocks, ProseFigure, CtaBand, PhoneCta, LinkCards, Stars…
  pages/           # pagine + route dinamiche /miele/[slug] e /guide/[slug]
                   # (tutte le schede del miele escono da /miele/[slug]; i tre
                   #  prodotti dell'allevamento hanno un file ciascuno)
  lib/schema.js    # generatori JSON-LD (LocalBusiness, Product, CollectionPage, Article, FAQPage, BreadcrumbList…)
  lib/whatsapp.js  # link WhatsApp con il messaggio della pagina (il numero è sempre quello di `site.whatsapp`)
  lib/images.js    # URL/srcset versionati dal manifest delle immagini (una sola fonte)
  lib/types.ts     # tipi condivisi (Block, Crumb, FaqItem, GalleryPhoto)
  integrations/sitemap.mjs  # genera dist/sitemap.xml dalle pagine reali a fine build
  styles/global.css
scripts/           # tooling: font, immagini, poster, favicon, QA, Lighthouse, OG (scripts/og/)
```

## Hero con immagine di sfondo

Quasi tutte le pagine hanno la hero con la foto **dietro** al testo (full-bleed).
Tre eccezioni volute:

- le **cinque schede del miele** (le quattro varietà e il favo): hero **solo
  testo**, con la foto del barattolo (o del favo) nel blocco prodotto subito sotto
  (resa originale, la più leggibile);
- i **tre prodotti dell'alveare** (**`/polline-d-api/`**, **`/api-regine/`**,
  **`/nuclei-api/`**): stessa hero **solo testo** dei singoli mieli, con la foto
  del prodotto nel blocco sotto. **Tutti e tre** (`/polline-d-api/`,
  `/api-regine/`, `/nuclei-api/`) hanno oggi la stessa scheda dei mieli — blocco
  prodotto, sezione origine, recensioni, FAQ, altri prodotti, CTA compatta —
  quindi nessuno passa più da `ProductPage.astro`, che è stato ritirato (vedi
  "Scheda del miele"). La riga della disponibilità sotto il prezzo non esiste
  più: disponibilità e periodo stanno nei dati dell'origine e nelle FAQ, come nei
  mieli;
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
- **Elenchi del testo** (`.prose ul`): la voce **non** è `display: flex` — i
  marcatori non vengono disegnati sui flex item, ed è per questo che le liste
  delle guide sono rimaste a lungo senza bullet. Le voci sono `list-item` con
  `list-style: disc` e il segno in ambra (`::marker`); è il
  `padding-inline-start` sul `<ul>` a tenere il segno — che sta *fuori* dal
  riquadro della voce — dentro la griglia, invece di lasciarlo fuori dal testo.
  Restano fuori i chip delle caratteristiche (`.chips`, `flex` e senza segno:
  non stanno mai dentro un `.prose`, quindi il selettore non li tocca).
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
  ci sia (4 in home, 8 su `/miele/`).
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
- **Galleria della home** («dall'apiario alla tua tavola», `Gallery.astro`): è la
  griglia delle altre gallerie (`gallery-grid` + `gallery-grid--three`) a piena
  larghezza: **1056px con 3 colonne da 336px** (gap 24px). Prima su desktop la
  griglia si fermava a 860px centrati, con 2 colonne da 418px
  (`.gallery-grid--narrow`, ora rimossa): la sezione restava rientrata rispetto
  alle altre e i media erano comunque grandi. A piena larghezza con 2 colonne le
  colonne erano da 516px e i verticali da 688px — più alti del viewport — quindi
  sono **3, non 2**: è la misura che tiene i media piccoli (336×448 i verticali,
  336×210 i video orizzontali) senza rientrare dal bordo. Oggi la griglia ha
  **4 foto e 2 video** (6 media, dopo che i due video «api» sono usciti dalla
  galleria): è alta **932px** e la sezione **1255px** (con 8 media erano 1404px e
  1727px). **Le tile tengono l'aspetto della sorgente** — quadrata la foto di
  copertina, verticali `g-item--tall`, orizzontali `video-item--wide` — quindi in
  una riga resta del vuoto sotto le tile più basse (fino a ~250px sotto il video
  della smielatura, che è l'unico orizzontale). È una scelta: pareggiare le tile
  vorrebbe dire tagliare le foto, e il video 16:9 diventerebbe verticale;
  l'alternativa senza tagli è incolonnare i media come un muro
  (`columns: 3` + `break-inside: avoid`), che però cambia l'ordine visivo (le
  colonne si leggono dall'alto in basso, non da sinistra a destra).
  **L'ordine dei media è quello
  della frase dell'intro** — «le api al lavoro, la smielatura e i barattoli
  pronti da portare a casa» — quindi in `Gallery.astro` c'è **un solo array
  `media`** (`{ photo }` / `{ video }`, come i blocchi di `ProseBlocks`) e non due
  liste foto/video: con due liste le foto finirebbero tutte prima dei video, e i
  barattoli non potrebbero stare in fondo. La lightbox compone la galleria in
  ordine di DOM, quindi sfoglia la stessa sequenza. Sotto i 700px
  `gallery-grid--three` torna a 2 colonne, e il QA browser continua a passare su
  mobile e desktop.
  La larghezza della colonna è anche quella dichiarata in `sizes`
  (`(min-width: 1120px) 336px, (min-width: 900px) 30vw, 50vw`), quindi il browser
  sceglie la variante giusta dell'immagine: la foto nuova, in una colonna da
  336px, a DPR 1 prende la **400**, non la 600.
- **Navigazione fra i prodotti**: non c'è più nessun tasto "Precedente /
  Successivo" in fondo alle pagine (il vecchio `ProductPager.astro` è stato
  rimosso, insieme al suo CSS e alla lista `beeProductItems`). Si va da un
  prodotto all'altro con le card "Continua" in fondo a ogni scheda, con i link
  del footer e con i rimandi dentro i testi: le card "Gli altri mieli" per i
  mieli, "Nuclei, guide e mieli" / "Regine e guide per iniziare" per i prodotti
  dell'apicoltura.
- **Tabelle di dati** (`.table-wrap` + `.data-table`): sotto i **640px** non
  scorrono in orizzontale, si impilano in schede usando i `data-label` delle
  celle come etichette e il `th[scope='row']` come titolo della scheda (le due
  regole da tabella — `width: 1%` e `nowrap` sull'etichetta di riga — vanno
  rimesse a posto dentro il media query, o con `display: block` il titolo della
  scheda si riduce a pochi pixel). Oggi le usa una sola pagina: il comparatore
  della guida su acacia, millefiori e castagno, reso dal blocco `table` di
  `ProseBlocks` (`{ table: { head, rows } }` in `lib/types.ts`). Il QA browser
  verifica che nessun bottone abbia testo fuori dal riquadro e che la pagina non
  sbordi a 360, 375 e 1280px.
- **Sezione "come lavoriamo" a piena larghezza** (`/miele/`): è l'unica `.prose`
  del sito senza il limite di 46rem (classe `prose--wide` in `global.css`), così
  occupa tutto il container come le altre sezioni della pagina. Dentro, le righe
  testo+foto dei blocchi `row` si prendono metà e metà dello spazio e la **foto
  cambia lato**: prima riga a destra, seconda a sinistra (`.prose--wide
  .prose-row:nth-of-type(even)`, che inverte l'`order` del testo). Oggi la
  sezione ha **una riga sola** — l'elenco che spiega i tre aggettivi, con la
  foto dell'apiario: la riga d'apertura con la foto `arnia_piena_di_api` è stata
  tolta, perché quel testo sta già in "chi siamo" e nella home — quindi la foto
  sta a destra, e la regola dell'alternanza resta lì per una eventuale seconda
  riga. Sotto i 900px
  le righe si impilano e l'alternanza non ha effetto. L'occhiello di questa
  sezione è il **primo blocco della riga** (blocco `{ eyebrow }` di `ProseBlocks`,
  aggiunto qui), non un elemento a sé del `.prose`: la riga centra il testo sulla
  foto (`.prose-row`), e un occhiello fuori dalla riga resterebbe in cima alla
  sezione a ~200px dal suo titolo. Dentro la riga tiene il ritmo stretto del resto
  del sito: 6px dal titolo (`.prose .eyebrow`, contro i 24px del gap della
  griglia), come `.section-head`. La foto verticale qui è limitata a 23rem (i
  `30rem` di `.prose-figure--portrait` facevano una colonna alta 760px accanto a
  un testo di 370). Misurato a 1280px: sezione 1056px, colonne 508px (≈60
  caratteri per riga), foto 368×708, testo centrato sulla foto (scarto fra i
  centri 0px), occhiello→titolo 6px, nessun overflow; le altre pagine restano a
  736px.
- **Comparatore a tutta larghezza** (guida su acacia, millefiori e castagno): la
  guida che contiene un blocco `table` prende `prose--wide-table`, che al posto
  del limite di 46rem mette **due tracce** — il testo nella prima, la tabella su
  entrambe (`grid-column: 1 / -1`) — invece di un margine negativo (che avrebbe
  dovuto indovinare la larghezza del container e poteva sbordare di 15px con la
  barra di scorrimento). Misurato: a 1280px paragrafo 736px come tutte le guide e
  tabella 1054px; a 820px tabella 754px, colonne 156/164/217/217; a 641px tabella
  588px in un container da 590px, senza scroll interno né overflow di pagina.

## TODO prima del lancio (dati segnaposto)

`src/data/bee-products.js` (polline, api regine, nuclei) — finché restano `null`
le pagine mostrano una frase neutra ("Prezzo su richiesta", "chiedici la
disponibilità") e **non** inventano nulla. Fatto: polline (barattolo da 200 g a
€ 5,50 → `prezzo` + `formato`, e la disponibilità: fresco aprile–maggio,
essiccato anche dopo), api regine (**€ 20,00 / regina**), nuclei (**€ 99,00 a
nucleo**). Restano da completare `polline.raccolto/lavorazione` e `nuclei.telai`:
quest'ultimo è già collegato — se lo compili diventa il dato "Composizione"
della sezione origine (`nuclei.origine.items[1]`), altrimenti resta la
descrizione generica. La disponibilità di api regine e nuclei sta nel dato
`Disponibilità` / `Preparazione` di `origine.items` e nelle FAQ; per il polline
sta nel dato "Disponibilità" di `origine.items`.

In `src/data/site.js`: `reviews` (le recensioni Google autentiche, vedi sotto),
`hours` / `hoursNote`, e l'`annata` di ogni miele (`annata: null`).

**Formato dei prezzi.** I prezzi si scrivono a mano nei dati, in due forme:

- **formati di vendita** (i mieli): `priceFormats: [{ size: '500 g', price: '€ 6,00' }]`
  in `src/data/site.js`. Da qui si ricavano il prezzo d'ingresso più basso, la
  riga mostrata nella pagina del prodotto, il badge delle card (`da …`), le
  colonne della tabella su `/miele/`, le risposte delle FAQ e le varianti dei
  dati strutturati (`src/lib/price.js`: `entryFormat`, `otherFormats`, `priceLine`,
  `priceFrom`);
- **prezzo unico** (polline, api regine, nuclei): `prezzo: "€ 5,50 (200 g)"`
  oppure `prezzo: "€ 20,00 / regina"`. La coda — la confezione tra parentesi o il
  riferimento del pezzo dopo la barra (`/ regina`, `/ nucleo`) — viene resa più
  piccola e in un colore più tenue da `src/components/Price.astro` /
  `splitPrice`, così resta leggibile senza rubare spazio al totale. Vale sia nel
  blocco prodotto delle schede sia nell'etichetta prezzo delle card.

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
Campi propri della scheda: `workNote` (il dato "Lavorazione": qui non c'è
smielatura), `note` (la riga del blocco prodotto, dove i mieli usano
`site.bulkNote`), `category` per i dati strutturati, `videos` (mp4 + poster AVIF
+ didascalia) e `gallery` + `galleryTitle`/`galleryIntro` per la galleria
facoltativa (nel template dei mieli non ce l'ha nessun altro). La `gallery` è
**in ordine d'uso** — è anche l'ordine della galleria sfogliabile nel lightbox,
che raggruppa le foto della stessa sezione: le sei foto del favo si sfogliano di
conseguenza. Il campo `photo` non è impostato: la sezione "Da dove arriva" usa la
foto dell'apiario, come i mieli, così la foto del blocco prodotto non compare due
volte nella stessa pagina. Le immagini della galleria finiscono anche nell'array
`image` del JSON-LD del prodotto, dopo la principale.
La **disponibilità è poca e solo su prenotazione**, e si dice in tre punti:
`note` (la riga informativa del blocco prodotto), una voce in `characteristics`
(le chips, che è anche il testo della card) e la FAQ "Da quale miele è fatto il
favo?"; l'intro della hero e quella della griglia su `/miele/` lo nominano.
`priceFormats: []` = prezzo non pubblicato: la pagina mostra "Prezzo su
richiesta" con la sua nota e **non emette `offers`**. Il nodo `Product` c'è
comunque, perché lo tengono valido le recensioni del prodotto (`review` +
`aggregateRating`): Google accetta un `Product` che abbia almeno uno tra
`offers`, `review` e `aggregateRating`. Compare in home (testo della card mieli),
nell'hub `/miele/` (card della griglia + nota prezzi), nel footer, nella
`ItemList` e nel catalogo `hasOfferCatalog` di `LocalBusiness`, dove la voce
resta **senza `price`** (nome, immagine e URL: nessun prezzo inventato).
Il favo è anche l'unico prodotto con **`schemaAvailability: null`**: non dichiara
mai una disponibilità, in nessun nodo e in nessuna pagina. Nella forma normale un
`Offer` prende `availability: https://schema.org/InStock` (i mieli, il polline, le
regine, i nuclei); il favo no, perché è disponibile poco e solo su prenotazione, e
dichiararlo "in stock" sarebbe falso. Vale anche se un giorno avesse un prezzo
pubblicato: `offer()` legge il campo invece di mettere `InStock` a priori.
`scripts/schema.mjs` verifica entrambe le cose (che l'omissione sia voluta, e che
nessun nodo che nomini il favo porti un `availability`).

Nella pagina del miele il prezzo è in evidenza (`.product-price`): il formato
d'ingresso in grande con il formato in piccolo, gli altri formati in una riga più
piccola sotto (`1 kg: € 11,00`). **Nessun prezzo è calcolato dal sito**: si
formatta solo quello che c'è nei dati, e `priceAmount()` torna `null` (offerta
omessa dai dati strutturati) se nella stringa non trova cifre. Finché un prezzo è
`null` le pagine mostrano "Prezzo su richiesta" (e l'audit fallisce se quella
scritta non renderizza, vedi QA).

**Scheda del miele (`miele/[slug].astro`).** Le cinque schede del miele — le
quattro varietà (`site.honeys`) e il miele in favo (`site.honeyComb`) — escono
tutte da questo template, nell'ordine:

1. **hero** — H1 e sottotitolo corto (`heroIntro`, due righe);
2. **blocco prodotto** — foto, prezzo (o "Prezzo su richiesta" + nota), voto,
   caratteristiche, CTA, e due righe piccole: il ritiro/consegna e
   `note ?? site.bulkNote`. Deve rispondere a "cosa compro, quanto costa, com'è,
   come lo ordino" e niente altro;
3. **"Da dove arriva"** — l'occhiello «dai nostri apiari», la frase `originNote`,
   la foto dell'apiario (`photo`, altrimenti `apiaryPhoto`, altrimenti
   `apiari_hd`) e i quattro dati:
   Origine / Raccolta / Lavorazione / Produzione. Raccolta è `harvest` (con
   l'`annata` accodata quando c'è), Lavorazione è `workNote` (per il favo dice
   che non c'è smielatura). Sotto, i `videos` con la loro didascalia;
4. **galleria** — solo per il favo (`gallery`);
5. **recensioni del prodotto** — al massimo tre, in fondo alla pagina;
6. **FAQ** — le domande della scheda (`faq`);
7. **altri mieli** — tre card dal catalogo;
8. **chiusura** — `CtaBand` (telefono + WhatsApp).

Quello che **non** c'è più: la scheda tecnica (`specs`), la sezione descrittiva
con `intro`/`uses` e i `benefits`. Erano lo stesso contenuto detto tre volte;
colore, gusto, usi e conservazione stanno nelle `characteristics` del blocco
prodotto e nelle FAQ, una volta sola. I campi `specs`, `uses`, `benefits`,
`intro`, `kind`, `subject`, `guide` e `storageNote` sono stati tolti dai dati —
`intro`, `uses`, `benefits` e `specs` da tutte le schede del miele, gli altri dal
solo favo, che era l'unico ad averli (nessuno li legge più): il template non li
rende.

**La stessa scheda, per gli altri prodotti.** `/api-regine/`, `/nuclei-api/` e
`/polline-d-api/` hanno oggi questa struttura — stesso `.product-grid`, stessa
sezione origine con le quattro `.feature`, stessa griglia recensioni, stessa
chiusura — con i testi che vengono dai loro dati in `src/data/bee-products.js`.
Sono tre file distinti (`api-regine/index.astro`, `nuclei-api/index.astro`,
`polline-d-api/index.astro`) che ripetono lo stesso markup: `ProductPage.astro`,
il componente generico che usavano prima, è stato ritirato quando anche il
polline è passato a questa forma. Campi, tutti facoltativi salvo `heroIntro`,
`chips`, `origine`, `faq`:

- `heroIntro` — il sottotitolo corto della hero;
- `chips` — le quattro caratteristiche del blocco prodotto;
- `note` — la riga piccola sotto il ritiro/consegna (nei mieli è
  `site.bulkNote`): per le regine è la scelta su gabbietta e ordini, per i nuclei
  la promessa su trasporto e inserimento;
- `origine` — occhiello, titolo, `notes` (i paragrafi) e quattro `items`
  (`icon` / `label` / `value`), più la `photo` della sezione;
- `rating` / `productReviews` — voto e recensioni del prodotto, come nei mieli;
- `faq`, `gallery`, `videos` — come prima. La galleria dei nuclei va a **3
  colonne** (`columns={3}` su `PhotoGallery`), come quella della home: a 2
  colonne i fotogrammi `g-item--tall` sono larghi 516px e alti 688px da desktop,
  più del viewport; a 3 sono 336×448, la stessa misura della galleria della home,
  e sotto i 700px la griglia torna comunque a 2. Così le gallerie con media
  verticali (favo, regine, nuclei) usano `gallery-grid--three`; quella del polline
  (`polline_granuli` nel blocco prodotto, `prato_fiorito` nell'origine, quindi in
  pagina restano solo la macro dell'ape e il video) resta a 2 colonne;
- `whatsappText` — il messaggio precompilato dei link WhatsApp: `lib/whatsapp.js`
  costruisce l'URL dal numero di `site.whatsapp` e dal testo della scheda, così
  chi scrive dal polline non apre la chat con una domanda sul miele. Il link
  arriva al bottone del blocco prodotto, alla CTA finale, al bottone flottante e
  al footer (`whatsappHref` passa da `Base.astro`);
- le **foto del polline sono stock** (`scripts/add-stock-image.mjs`): la
  didascalia dell'origine dice "(foto illustrativa)" e la provenienza si dichiara
  lì, dove la pagina ne parla davvero; l'intro della galleria resta descrittiva.

Restano fuori da questa forma la scheda tecnica (`specs`), la sezione punti di
forza (`cards`) e la tracciabilità dei nuclei: erano gli stessi fatti ripetuti in
tre punti. Sono state tolte dai dati, e i fatti sono distribuiti tra i quattro
dati dell'origine, le chips e le FAQ. **Il markup delle schede resta però scritto
in quattro file** (`miele/[slug].astro`, `api-regine/index.astro`,
`nuclei-api/index.astro`, `polline-d-api/index.astro`): la forma è la stessa, il
codice no. Se un giorno servirà
cambiarla, il passo è estrarre un componente condiviso (`ProductSheet.astro`).

Campi che una scheda può avere in `src/data/site.js`:

- `title`, `description` — SEO (title ≤ 65 caratteri, description ≤ 155: l'audit
  li controlla);
- `heroIntro` — il sottotitolo della hero, due righe. Il template comune non lo
  calcola più da sé: ogni scheda ha il suo, corto;
- `originNote` — la frase di "Da dove arriva": nome della raccolta + gli apiari
  di quel miele. È lì che stanno le zone precise (Martesana, Gera d'Adda, Parco
  Adda Nord, Val Brembana), perché i quattro dati sono volutamente secchi;
- `harvest`, `annata` — il periodo di raccolta (forma da pagina, es. "A giugno")
  e l'annata in vendita, da completare a mano: se c'è compare sotto il dato
  "Raccolta";
- `characteristics` — le voci del blocco prodotto (e la microdescrizione della
  card su `/miele/`, via `characteristics[1]`);
- `workNote` — la riga "Lavorazione" (facoltativa: senza, il default è
  "Smielatura a freddo, decantazione, nessuna pastorizzazione");
- `videos` — mp4 + poster AVIF + `caption`, che è la didascalia resa sotto il
  video in un `<figcaption>`;
- `faq` — le domande della scheda (la pagina ne mostra quante ce ne sono);
- `rating: { value, count }` e `productReviews` — voto e recensioni **del
  prodotto**, non della scheda Google dell'azienda. Sono la sola fonte di questi
  numeri: la riga sotto il prezzo e l'`aggregateRating` con i nodi `Review` del
  JSON-LD si leggono da qui, quindi il markup non può divergere da ciò che si
  vede. **In pagina ne compaiono al massimo tre** (`slice(0, 3)`), e le stesse
  tre finiscono nel JSON-LD; il `count` invece è il totale vero delle recensioni
  del prodotto e può essere più alto — le altre concorrono al voto senza un testo
  in pagina. Aggiornare voto e testi è una riga sola;
- `photo` — foto *di prodotto* della sezione "Da dove arriva", al posto di
  quella dell'apiario (cambiano anche `alt` e didascalia: diventano quelle del
  miele). Nessuna scheda la usa oggi;
- `apiaryPhoto` — **quale** foto dell'apiario mostrare in "Da dove arriva"
  (base del manifest: `apiari_hd` o `apiari_5`); `alt` e didascalia restano
  quelle dell'apiario. Senza il campo vale `apiari_hd`, ed è la scelta di tutte
  le varietà: l'unica scheda con un apiario diverso è il favo (`apiari_5`);
- `gallery` — galleria facoltativa (solo il favo).

La hero di queste pagine **non** usa `variant="product"`: il sottotitolo resta
visibile anche da mobile (è corto, e senza di esso la hero non direbbe che il
miele è italiano e di produzione propria). Il voto non è nella hero ma nel blocco
prodotto, sotto il prezzo (con il link che porta alle recensioni), perché è lì
che si decide se comprare. Lo `Stars.astro` (stelle piene/vuote con etichetta
accessibile) rende il voto dove compare: sotto il prezzo e in ognuna delle
recensioni.

- [x] **Numero di telefono**: aggiornato a +39 351 537 6719 (CTA "Chiama ora", WhatsApp e schema)
- [x] **Prezzi mieli**: aggiornati — acacia 6,00 (500g) / 11,00 (kg), millefiori 5,00 / 9,00, castagno 6,50 / 12,00 (dati strutturati come `ProductGroup` con una variante per formato)
- [x] **Prezzo polline**: barattolo da 200 g a € 5,50 (blocco prodotto, dato "Confezione" dell'origine e `Product` con `Offer`)
- [ ] **Orari**: pubblicati `Tutti i giorni 08:00–21:00` + nota "chiama prima di
      passare"; la scheda Google Business Profile deve riportare gli stessi orari
      (o correggi `hours` in `src/data/site.js`)
- [x] **Recensioni**: le 4 recensioni segnaposto sono state rimosse e sostituite
      con **recensioni reali della scheda Google** (testo fedele, stelle reali,
      etichetta "Recensione Google"): in `src/data/site.js` → `reviews` ce ne
      sono **3**, e la pagina mostra esattamente quelle (nessun contatore
      gonfiato). La recensione "Ottimi prodotti bio naturali." è esclusa di
      proposito perché il miele è convenzionale e non certificato biologico.
      La hero della home riporta «★ 5,0 su Google»: è il dato della scheda, non lo
      calcola il sito. Le nuove recensioni si aggiungono in `src/data/site.js` →
      `reviews`.
      **Queste recensioni non alimentano nessun dato strutturato**: `reviews` è
      la scheda Google *dell'attività*, e un `aggregateRating` costruito da lì
      sul `Product` (o sul `LocalBusiness` della home) sarebbe un voto attribuito
      alla cosa sbagliata.
      L'`aggregateRating` e i nodi `Review` esistono **solo sulle schede dei
      prodotti** (le cinque del miele, `/api-regine/`, `/nuclei-api/` e
      `/polline-d-api/`) e vengono
      dalle recensioni *del prodotto* (`rating` / `productReviews` di ogni
      scheda, vedi "Scheda del miele"): i testi e le stelle pubblicati sono gli
      stessi che rende la pagina.
- [ ] **Recensioni dei prodotti (da sostituire)**: quelle del miele di acacia
      sono reali e arrivano dal titolare. **Tutte le altre sono segnaposto
      scritti su richiesta** (nomi e testi inventati, tutti da 5 stelle):
      `rating.count` 4 per il tiglio e more, 3 per ailanto e castagno, 2 per il
      favo, 3 per api regine, 2 per nuclei, **1 per il polline**. In pagina i
      testi mostrati sono gli stessi: al massimo tre, tranne il favo (due) e il
      polline (una). Vanno sostituite con
      recensioni vere prima del lancio. Sono pubblicate anche nei dati
      strutturati (`Review` + `aggregateRating`), quindi finché restano finte la
      pagina dichiara a Google recensioni che non esistono: oltre a essere
      scorretto, è una violazione delle linee guida sulle recensioni (fino a
      un'azione manuale sui dati strutturati). Sostituirle significa cambiare
      `productReviews` e `rating` nelle voci di `src/data/site.js` (i mieli) e di
      `src/data/bee-products.js` (api regine, nuclei), e nient'altro: la pagina
      rende quello che c'è nei dati. In entrambi i file ogni blocco è marcato
      `SEGNAPOSTO`.
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
(`site.areaServedFeatured`) con la CTA "Vedi dove consegniamo";
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
- Campi di prodotto, così che ogni scheda sia completa per la Ricerca Google:
`name`, `url`, `image`, `description`, `brand` su **ogni** nodo (gruppo, varianti
e prodotto singolo), `offers` con `url` + `price` + `priceCurrency` +
`availability` + `itemCondition` su ogni nodo vendibile. `aggregateRating` e
`review` stanno sul `ProductGroup` (sono il voto di tutto il prodotto, non di un
formato: è la forma che chiede Google per le varianti) e sul `Product` singolo.
Il miele in favo non ha un prezzo pubblicato, quindi il suo `Product` esce
**senza `offers`** — resta valido perché ha `review` + `aggregateRating` — e il
`LocalBusiness` non porta mai voti (il voto della scheda Google è dell'attività,
non del prodotto). Il controllo è **`node scripts/schema.mjs`** (dopo la build):
verifica i campi qui sopra su ogni nodo, che i `reviewCount` non siano più bassi
delle recensioni pubblicate, che i testi delle `Review` combacino con quelli in
pagina e che le FAQ del JSON-LD combacino con le `<details>` della pagina.
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
  posizioni attuali sono quattro (home ×2, `/miele/` e `/chi-siamo/`): le schede
  del miele non ne hanno nessuna (la riga dell'occhiello lì è già occupata da
  testo utile). I testi delle recensioni Google non si toccano: lì le emoji sono
  citazioni autentiche.

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
nuovo in root, insieme alle due foto di Raffaele con i mieli pronti da spedire
(`raffaele-con-mieli-pronti-da-spedire-bio-e-golosita*.png`) e alla foto degli
apiari `apiari-bio-e-golosita-5.png`: sono le foto dell'ultimo aggiornamento del
catalogo e le uniche che `process-images.mjs` rigenera oggi: il resto delle basi
resta com'è finché non si ripescano gli altri sorgenti.

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
  regole qui sotto. Resta anche in "Da dove arriva" delle quattro varietà (la
  quinta scheda, il favo, usa la foto vera `apiari_5`): dove compare lì, `alt` e
  didascalia la presentano come gli apiari — con una foto reale a disposizione, è
  quella da mettere.
- `apiari-bio-e-golosita-5.png` (root, 1600×1200, 4:3) — foto degli apiari,
  ottimizzata in `public/img/apiari_5-*` (varianti 1600, 1200, 800, 640, 480,
  come `apiari_hd`). È la foto della sezione "Da dove arriva" del **miele in
  favo**; le altre quattro schede restano su `apiari_hd`.
  Preparazione: `exiftool -all=` più
  `magick <file>.png -strip -alpha off` (era RGBA con l'alfa **tutta opaca**:
  il canale non si vede e nessun'altra immagine pubblicata ce l'ha, quindi si
  toglie e restano solo IHDR/IDAT/IEND). Verifica `magick compare -metric AE` fra
  originale e file lavorato = `0`: nessun pixel è cambiato.
- `sciami1.jpg … sciami7.jpg` (root) — foto di sciami/nuclei del titolare, ottimizzate in
  `public/img/sciame_1-*` … `sciame_7-*` (pagina `/nuclei-api/`): `sciame_4` è la
  **foto principale** della pagina (blocco prodotto) e l'immagine del `Product`
  nei dati strutturati; `sciame_5` è la foto della sezione «Da dove arriva questo
  nucleo» e le altre (le `sciame_1/2/3/6/7`) restano nella gallery 3 colonne.
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
- `raffaele-con-mieli-pronti-da-spedire-bio-e-golosita.png` e
  `…-bio-e-golosita2.png` (root, 1094×1479 e 1152×1501) — Raffaele con i mieli
  preparati per gli ordini dei clienti, ottimizzate in
  `public/img/raffaele_con_mieli_pronti_da_spedire-*` e
  `public/img/raffaele_con_mieli_pronti_da_spedire_2-*` (varianti **1000, 900, 600, 400**:
  le sorgenti non arrivano a 1200, quindi 1000 è la larghezza massima — per la
  hero a piena pagina è la variante più grande che esista, quindi su schermi
  retina il browser la ingrandisce). La **prima è la hero di `/consegna-miele/`**
  (`50% 45%`; il soggetto sta nella fascia centrale dell'immagine, y ~33-90%) e
  l'ultima foto della **galleria della home**; la **seconda** è la foto del
  blocco «Tre passi per ricevere il miele» della stessa pagina, verticale e
  quindi con il limite `.split-media--portrait` (24rem, come le
  `.prose-figure--portrait`).
- `raffaele.png` → base **`raffaele`** (il ritratto quadrato della galleria della
  home): **ritirata**. Non era più usata da nessuna pagina, quindi le sue
  varianti sono state tolte da `public/img/` e la voce è sparita dal manifest da
  sola (la riga `'raffaele.png': [800, 480, 300]` in `scripts/process-images.mjs`
  è commentata): per riaverla, rimettere la riga, il sorgente in root e
  rilanciare `npm run assets`.
- `miele-in-favo-1.avif … miele-in-favo-6.avif` (root, 478×850, già AVIF) — sei
  fotogrammi ricavati dal video del favo, **numerati nell'ordine d'uso**: dal favo
  ancora attaccato al telaio (la 1) all'assaggio di Raffaele (la 6). Sono
  ottimizzati in `public/img/miele_in_favo_1-*` … `miele_in_favo_6-*` (variante
  400) e finiscono, in quell'ordine, nella galleria `Dal favo all'assaggio` della
  pagina: la classe è `g-item--portrait` (aspetto 9/16, come i fotogrammi) su una
  griglia a 3 colonne, così le foto non vengono ritagliate da `object-fit: cover`.
- `video_che_mostra_ape_regina_con_tante_api_attorno.mp4` (root) → pubblicato come
  `public/video/ape-regina-con-api.mp4` e **non più in pagina**: il video stava
  nel testo sotto la sezione «La nostra linea: regine Buckfast, figlie di una
  madre F0», che ora non esiste più — `/api-regine/` racconta la linea in
  `origine.notes` e mostra solo i **tre** filmati della galleria «Le regine in
  video» (`regina-f1-su-covate`, `nascita-di-una-regina`,
  `marcatura-della-regina`). Il file e il poster restano in `public/video/`, come
  `filtraggio-miele-di-acacia.mp4`: per rimetterlo basta una voce `video` in un
  blocco `ProseBlocks` (video originale del titolare, non ricodificato: 9,8 MB,
  848×478, ~21 s, orizzontale, quindi `video-item--wide` in
  `.prose-video--wide`). Il poster
  `public/video/ape-regina-con-api-poster.jpg` è un fotogramma estratto con
  `ffmpeg -ss 2 -i <video> -frames:v 1 -q:v 3 <poster>.jpg` e ottimizzato da
  `scripts/posters.mjs`. Se serve alleggerirlo:
  `ffmpeg -i <video> -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -c:a aac -b:a 64k -ac 1 -movflags +faststart out.mp4`
  (≈5,7 MB, SSIM 0,93 — il girato è molto movimentato, quindi comprime poco).
- I **video degli apiari** girati dal titolare (sorgenti in root, nome che dice
  cosa mostrano): pubblicati in `public/video/` con un nome parlante e ricodificati
  in H.264/AAC (compatibile su tutti i browser) con il comando qui sopra, più il
  poster da un fotogramma. In totale i video pubblicati in `public/video/` sono
  **59,7 MB** (i sorgenti in root ne pesano 139,7):
  - `smielatura_miele_acacia_2026.mp4` → `smielatura-acacia.mp4` (720×1280,
    19 s, 2,9 MB) — **ritirato**: la scheda dell'acacia è passata al video del
    raccolto 2026 qui sotto, e il file e il suo poster non sono più in
    `public/video/`. La sorgente in root resta, quindi si può ricodificare con il
    comando qui sopra se serve tornare indietro;
  - `video-che-mostra-la-smielatura-millefiori-more-e-tiglio-2026.mp4` →
    `smielatura-millefiori-tiglio-more.mp4` (576×1024, 24 s, 3,0 MB) — scheda del
    millefiori estivo al tiglio e more;
  - `raffaele-che-mostra-la-nascita-di-una-regina.mp4` →
    `nascita-di-una-regina.mp4` (576×1024, 38 s, 2,8 MB) e
    `raffaele-che-spiega-e-mostra-perche-e-come-marce-una-regina-(con-il-pennarello).mp4`
    → `marcatura-della-regina.mp4` (576×1024, 43 s, 6,7 MB) — `/api-regine/`;
  - `video-emozionante-che-mostra-le-api-che-producono-il-miele.mp4` →
    `api-che-producono-il-miele.mp4` (720×1280, 25 s, 9,3 MB) — galleria della home;
  - `smielatura.mp4` → `smielatura.mp4` (1280×720, ~5,5 s, 0,2 MB) — galleria della
    home, l'unico video **orizzontale** della griglia (`video-item--wide`: le altre
    tile sono quadrate o verticali). La sorgente non è in root e il fotogramma
    `smielatura-poster.jpg` non c'è più, quindi `npm run assets` lo salta
    (`scripts/posters.mjs` fa `SKIP`): video e poster
    `public/video/smielatura-poster-2c769c8a.avif` restano così come sono;
  - `raffaele-che-mostra-lo-spirito-di-adattamento-delle-api-che-si-sono-create-spazio-da-sole.mp4`
    → `api-che-si-creano-spazio.mp4` (576×1024, 57 s, 8,2 MB) — `/nuclei-api/`;
  - `video-emozionante-girato-da-raffele-che-mostra-le-sue-api-che-impollinano-un-fiore.mp4`
    → `api-che-impollinano.mp4` (480×856, 9 s, 0,5 MB) — `/polline-d-api/`;
  - `regina-f1-su-covate.mp4` → `regina-f1-su-covate.mp4` (478×850, 19 s,
    5,1 MB, audio mono 64k come gli altri) — `/api-regine/`, **primo filmato
    della galleria** «Le regine in video» (gli altri due sono la nascita e la
    marcatura): è verticale, quindi `video-item--tall` come loro. Il
    poster è il fotogramma a 5 s, scelto misurando la nitidezza di dieci
    fotogrammi distribuiti sul girato (vedi la voce in `scripts/posters.mjs`).
  - `raffaele-che-prepara-le-spedizioni.mp4` → `mieli-pronti-da-spedire.mp4`
    (848×478, 62 s, 3,5 MB, audio mono 64k come gli altri) — `/consegna-miele/`,
    nel blocco «Tre passi per ricevere il miele», dentro il testo come su
    /api-regine/: è orizzontale, quindi `video-item--wide` in
    `.prose-video--wide` (736×460). Il poster è il fotogramma a 27 s, il più
    nitido di tutto il girato (varianza del laplaciano su un fotogramma al
    secondo: i primi 24 s sono mossi, da lì in poi il filmato è fermo), vedi
    `scripts/posters.mjs`.
  - **Raccolto 2026, quattro clip verticali** (478×850, ricodificate con il
    comando qui sopra — SSIM 0,93-0,98 — con il poster scelto misurando la
    nitidezza di un fotogramma ogni 0,5 s: vedi `scripts/posters.mjs`). Stanno
    nelle schede dei mieli:
    - `smielatura-2026-miele-di-acacia.mp4` → `smielatura-acacia-2026.mp4`
      (19 s, 1,5 MB) — scheda del miele di acacia. `filtraggio-miele-di-acacia.mp4` →
      `filtraggio-miele-di-acacia.mp4` (14 s, 0,8 MB) è pubblicato ma **non è in
      pagina**: era il secondo video della stessa scheda e la voce `videos` di
      `site.js` è stata tolta, quindi oggi nessuna pagina lo usa (file e poster
      restano in `public/video/` per rimetterlo quando serve);
    - `smielatura-2026-millefiori-primaverile.mp4` →
      `smielatura-millefiori-2026.mp4` (8 s, 0,3 MB) — scheda del millefiori
      al tiglio e ailanto, che prima non aveva video. Il girato è del raccolto
      primaverile, ma la didascalia **non nomina la stagione**: entrambe le
      schede millefiori dicono che il miele si raccoglie a giugno, quindi il
      video racconta come si smiela il millefiori, non l'annata di quel
      barattolo;
    - `riempendo-un-barattolo-di-millefiori.mp4` →
      `riempendo-un-barattolo-di-millefiori.mp4` (9 s, 0,5 MB) — scheda del
      millefiori al tiglio e more, dopo il suo video della smielatura.
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
  didascalie che descrivono quello che la foto mostra davvero. `miele_colazione`
  (il miele servito a tavola) non è più usata da nessuna pagina — in
  `/consegna-miele/` al suo posto ci sono le foto di Raffaele — ma le sue
  varianti restano in `public/img/`: la sorgente stock non è in repo, quindi una
  volta cancellate non si potrebbero rigenerare.
- **Apiari e persone: solo foto originali.** Nessuna foto stock deve mostrare un
  apiario o una persona in tuta da apicoltore. La foto dell'apiario nelle schede
  del miele è `apiari_5` — del titolare, sorgente in root — sul favo, e
  `apiari_hd` sulle altre quattro; restano ammesse le varianti storiche `apiario`
  e `arnie` in `public/img/`, senza sorgente in root
  (`arnie` non ha nemmeno più una voce in
  `process-images.mjs`), quindi non rigenerabili; per il
  lavoro in apiario si usano le foto del titolare
  (`raffaele_sorridente_con_le_sue_api`,
  `arnia_piena_di_api`, `ape_regina_di_raffaele`, `sciame_1` … `sciame_7`). Per
  questo le stock `apiario_arnie`, `apicoltore_telaio`, `favo_covata`,
  `arnia_nucleo` e `sciame_ramo` sono state **eliminate**: non reintrodurle.
  **Unica eccezione: `apiari_hd`**, che è un'immagine generata: resta come sfondo
  decorativo della hero della home e in una scheda del miele si alterna alle due
  foto vere — dove l'`alt` la presenta come gli apiari, la foto del titolare è
  quella da mettere.
- Altre foto di barattoli e apiario: materiale originale del titolare.
- **Due file di root non pubblicati dal sito**: `miele-di-acacia-latest.jpg`
  (1600×1200, il barattolo di acacia in uno scatto nuovo, senza EXIF come la
  sorgente pubblicata) e i banner per i post Facebook
  `banner-facebook-mieli-acacia-e-millefiori.jpg` e
  `…-minimale.jpg` (1080×1350, 4:5). Servono al **banner social**, non alle
  pagine: `miele-di-acacia-latest.jpg` non sostituisce `miele-di-acacia.jpg`,
  che resta la foto della scheda, delle card e dell'immagine OG. I banner si
  generano fuori dal repo (HTML+CSS → screenshot Chromium, come `scripts/og/`,
  con il barattolo rimisurato sulla foto usata), quindi qui c'è solo il JPG
  finito, da riprendere a mano se serve rifarlo. Nel badge del banner grande la
  valutazione è quella della home (`src/pages/index.astro`: `5,0 su Google · 30+
  recensioni`) **anche nel disegno**: le stelle sono il path di `Icons.astro` in
  ambra e il testo in inchiostro tenue, come `.trust` della home. Serve perché il
  glifo ★ non è nei font del sito: cadrebbe su un font di sistema, monocromatico
  e dello stesso inchiostro del testo (il badge sembrava "di una riga sola"). Se
  cambia il numero là, va cambiato anche qui — ed è esattamente così che era
  rimasto indietro a "20+".
