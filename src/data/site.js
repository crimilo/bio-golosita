const facebookUrl = 'https://www.facebook.com/profile.php?id=100087140305651';
const tiktokUrl = 'https://www.tiktok.com/@bio.golosita';

const googleMapsUrl =
  'https://www.google.com/maps/place/Apicoltura+e+Vendita+Miele+Bio+%26+Golosit%C3%A0+Cassano+d%E2%80%99Adda/@45.5355768,9.5244833,17z/data=!3m1!4b1!4m6!3m5!1s0x47814b2f5343dc1d:0x479af6135571444d!8m2!3d45.5355768!4d9.5244833!16s%2Fg%2F11nvts1zyj';
const googleMapsEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1958.53!2d9.5244833!3d45.5355768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47814b2f5343dc1d:0x479af6135571444d!2sApicoltura+e+Vendita+Miele+Bio+%26+Golosit%C3%A0+Cassano+d%E2%80%99Adda!5e0!3m2!1sit!2sit!4v1725012345678';

// Risposta unica per la FAQ sulle consegne: era ripetuta identica nelle pagine
// miele, così resta una sola fonte da aggiornare. La scheda dell'acacia ha la
// sua versione breve scritta a mano (vedi `honeys[0].faq`).
export const deliveryFaq = {
  q: 'Fate consegne nella mia zona?',
  a: "Sì: consegniamo a domicilio nella zona tra Milano, Bergamo, Cremona e Lodi, e in molti casi la consegna è gratuita (dipende dall'ordine e dalla zona). In alternativa c'è il ritiro in sede a Cassano d'Adda su appuntamento.",
};

export const site = {
  name: 'Bio & Golosità',
  legalName: 'Azienda Agricola Bio & Golosità di Antoci Raffaele',
  owner: 'Antoci Raffaele',

  vatId: '12606370968',
  rea: '2744949',
  tagline: 'Miele genuino di api proprie, dagli apiari tra Parco Adda Nord e Alta Val Brembana',
  domain: 'https://bioegolosita.it',

  phoneDisplay: '+39 351 537 6719',
  /**
   * Numero senza prefisso internazionale: è quello che compare nelle CTA
   * (header e hero) da desktop, dove il "+39" è solo rumore e il numero si
   * legge — e si copia — meglio. Da mobile resta "Chiama ora", che è l'azione.
   */
  phoneLocal: '351 537 6719',
  phoneHref: 'tel:+393515376719',
  whatsapp: 'https://wa.me/393515376719?text=Ciao%2C%20vorrei%20informazioni%20sul%20vostro%20miele',

  address: {
    street: 'Via Salvo D\'Acquisto 9',
    city: 'Cassano d\'Adda',
    zip: '20062',
    province: 'MI',
    region: 'Lombardia',
    country: 'Italia',

    geo: { lat: 45.5355768, lng: 9.5244833 },
  },

  /**
   * Sede legale e apiari sono due cose diverse, e il sito non le confonde:
   *
   * - la **sede legale** è a Cassano d'Adda: indirizzo, punto di ritiro,
   *   contatti, localizzazione commerciale. Tutte le menzioni della città in
   *   questo senso restano (ritiro in sede, zone servite, titoli SEO locali);
   * - gli **apiari** sono nel **Parco Adda Nord** e in **Alta Val Brembana**:
   *   è da lì che vengono il miele e gli altri prodotti dell'alveare. I testi generali
   *   sull'azienda lo dicono così, senza presentare l'Alta Val Brembana come
   *   un'eccezione: «I nostri apiari si trovano nel Parco Adda Nord e in Alta
   *   Val Brembana».
   *
   * Le schede del miele dicono invece la zona del proprio apiario, una per
   * miele (`apiaryZone`): il **castagno viene esclusivamente dagli apiari
   * dell'Alta Val Brembana**, gli altri mieli dagli apiari del Parco Adda
   * Nord.
   *
   * Dove questa distinzione si vede: nei testi di `/chi-siamo/` e nella
   * descrizione del `LocalBusiness` di `src/lib/schema.js` (è la frase che
   * legge Google). L'indirizzo di Cassano d'Adda resta invece dove serve (qui
   * sotto, nel footer e nel blocco contatti), senza etichettarlo «sede
   * legale» accanto a ogni indirizzo.
   */

  hours: 'Tutti i giorni 08:00–21:00',
  hoursNote:
    'Ti consigliamo comunque di chiamare o scrivere prima di passare: durante la giornata potremmo trovarci in apiario.',

  founded: 2020,
  /** Apicoltore dal 2020: una data fissa non invecchia, “6+ anni” sì. */
  apicoltoreDal: 2020,
  priceRange: '€€',
  // Data di validità dei prezzi nello schema Product: aggiornala ogni anno
  // (o mettila a null per non dichiararla affatto).
  priceValidUntil: '2027-12-31',

  socials: [
    { name: 'Facebook', url: facebookUrl, handle: 'Bio & Golosità' },
    { name: 'TikTok', url: tiktokUrl, handle: '@bio.golosita' },
  ],

  sameAs: [facebookUrl, tiktokUrl, googleMapsUrl],

  googleMapsUrl,
  googleMapsEmbedUrl,

  /**
   * Riga piccola del blocco prodotto, uguale per tutti i mieli (il favo ha la
   * sua, `note`). Il dettaglio commerciale — secchi da 10 kg su preventivo, per
   * negozi e ristoranti — sta dove si parla di ordini grossi: la FAQ di
   * `/consegna-miele/` e quella di `/miele/miele-millefiori/`.
   */
  bulkNote:
    'Disponibili anche formati da 5, 10 e 24 kg su richiesta.',

  areaServed: [
    'Cassano d\'Adda',
    'Groppello d\'Adda',
    'Trezzo sull\'Adda',
    'Vaprio d\'Adda',
    'Treviglio',
    'Gorgonzola',
    'Melzo',
    'Pozzuolo Martesana',
    'Inzago',
    'Rivolta d\'Adda',
    'Vailate',
    'Caravaggio',
    'Fara Gera d\'Adda',
    'Cernusco sul Naviglio',
    'Parco Adda Nord',
  ],

  /**
   * Le località più vicine/importanti, usate come chip nella home: in pagina ne
   * bastano poche, l'elenco completo vive in /consegna-miele/ (deliveryZones).
   */
  areaServedFeatured: [
    "Cassano d'Adda",
    "Fara Gera d'Adda",
    "Vaprio d'Adda",
    "Trezzo sull'Adda",
    'Gorgonzola',
    'Treviglio',
  ],

  // Le stesse località di areaServed, raggruppate per la pagina /consegna-miele/
  deliveryZones: [
    {
      name: "Cassano d'Adda e dintorni",
      towns: [
        "Cassano d'Adda",
        "Groppello d'Adda",
        "Fara Gera d'Adda",
        'Inzago',
        'Pozzuolo Martesana',
        // Zona protetta lungo l'Adda, a partire da Trezzo/Cassano: sta qui e
        // non in "Martesana e Milano Est", dove stava il parco milanese che
        // questa voce sostituisce.
        'Parco Adda Nord',
      ],
    },
    {
      name: 'Martesana e Milano Est',
      towns: [
        'Gorgonzola',
        'Melzo',
        "Vaprio d'Adda",
        "Trezzo sull'Adda",
        'Cernusco sul Naviglio',
      ],
    },
    {
      name: "Gera d'Adda, Bergamasca e Cremonese",
      towns: ['Treviglio', 'Caravaggio', "Rivolta d'Adda", 'Vailate'],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // ✅ Recensioni autentiche della scheda Google Business Profile.
  //    Testi fedeli all'originale (nomi con l'iniziale maiuscola), stelle reali.
  //    Le recensioni arrivano dalla scheda Google: quando il testo è troncato
  //    ("… More") viene chiuso all'ultima frase completa, senza aggiungere né
  //    cambiare parole.
  //    La recensione "Ottimi prodotti bio naturali." è volutamente esclusa:
  //    il miele è convenzionale e non certificato biologico, e non vogliamo
  //    rilanciare quell'ambiguità sul sito.
  //    Formato: { name, stars (1-5), text, date?, town?, url? }
  //    Se `reviews` è vuoto la home mostra un riquadro che rimanda a Google.
  // ─────────────────────────────────────────────────────────────────────────
  reviews: [
    {
      name: 'Valerio Pellizzari',
      stars: 5,
      date: '2026-09-08',
      text: 'Miele di qualità eccellente il meglio sul mercato! Persone gentili e con prezzo decisamente competitivo',
    },
    {
      name: 'Francesca Catania',
      stars: 5,
      date: '2026-09-09',
      text: 'Prodotti genuini e deliziosi, e assistenza clienti impeccabile!!!',
    },
    {
      name: 'Annamaria Sorte',
      stars: 5,
      date: '2026-09-05',
      text: 'Un miele semplicemente straordinario! 🍯❤️ Qualità, genuinità e un sapore davvero unico.',
    },
  ],

  /**
   * I cinque mieli. `priceFormats` sono i formati di vendita con il loro
   * prezzo, scritti a mano come tutto il resto dei prezzi del sito: il primo è
   * il prezzo d'ingresso (quello che si vede per primo e sulle card), gli altri
   * restano visibili sotto. Da qui si ricavano la riga di prezzo, la tabella
   * /miele/, le FAQ e i dati strutturati (una variante Google per formato).
   *
   * **Millefiori: sono tre.** Due estivi (al tiglio e more, al tiglio e
   * ailanto, entrambi raccolti a giugno) e uno primaverile (al tarassaco e
   * biancospino, raccolto tra metà marzo e metà aprile): è il motivo per cui il
   * nome dei due estivi **non** dice più "estivo" — il miele di un'annata
   * resta in vendita finché ce n'è, e nel nome la stagione sembrava una
   * scadenza. La stagione di raccolta resta scritta in `harvest`, nel dato
   * "Raccolta" e nelle FAQ.
   *
   * **L'ordine di questo array è l'ordine delle card**: la griglia di `/miele/`,
   * l'`ItemList` della pagina e il catalogo `hasOfferCatalog` seguono questa
   * sequenza (oggi acacia, i tre millefiori, castagno, poi il favo), e non è
   * l'ordine delle stagioni. La prima varietà resta l'acacia perché è la card
   * che la griglia carica subito (`eager`).
   *
   * Campi che usa la scheda (`miele/[slug].astro`, la stessa per le cinque
   * varietà e per il miele in favo): `title`/`description` (SEO), `heroIntro`,
   * `originNote`, `apiaryZone` (la zona degli apiari di quella varietà: base
   * del dato "Origine" e dell'`alt` della foto in "Da dove arriva"; assente =
   * Parco Adda Nord), `harvest` + `annata`, `workNote`, `characteristics`,
   * `videos` (con la loro `caption`), `faq`, `rating` + `productReviews` e, se
   * serve,
   * `note` (la nota del blocco prodotto, al posto di `site.bulkNote`),
   * `productPhotos` (le altre foto del blocco prodotto: il primo scatto del
   * barattolo per l'acacia, gli scatti in più per il millefiori primaverile, i
   * fotogrammi del video per il favo), `gallery` +
   * `galleryTitle`/`galleryIntro` (una galleria in fondo alla pagina, che oggi
   * non usa più nessuna scheda: il favo è passato a `productPhotos`, vedi
   * README, "Scheda del miele"),
   * `photo` (una foto di prodotto al posto di quella dell'apiario) o
   * `apiaryPhoto` (un'altra foto dell'apiario, base del manifest: `apiari_hd`,
   * `apiari_5` — vedi README). Di norma la sezione usa `apiari_hd`: il favo è
   * l'unica scheda con un apiario diverso (`apiari_5`). Non ci sono più
   * `intro`, `uses`, `specs` e `benefits`: la scheda non li rende e le stesse
   * cose stanno in `characteristics` e nelle FAQ (vedi README, "Scheda del
   * miele").
   */
  honeys: [
    {
      slug: 'miele-di-acacia',
      name: 'Miele di Acacia',
      /**
       * La foto del miele — scheda, card e dati strutturati — è
       * `miele-di-acacia-card`: il secondo scatto del barattolo, quello con
       * l'inquadratura da card (sorgente `miele-di-acacia-card.jpg` in root:
       * vedi README, "Crediti immagini"). La base `miele-di-acacia` resta
       * pubblicata ma non è più la foto del miele: la usa la figura nel testo
       * della guida "acacia, millefiori e castagno" (`guides.ts`), e i banner
       * social dei mieli si generano ancora dal sorgente `miele-di-acacia.jpg`
       * (`instagram-endcard.mjs`, `facebook-banner.mjs`). È anche la **seconda
       * foto del blocco prodotto** (`productPhotos`, qui sotto): il primo scatto
       * del barattolo resta cliccabile accanto a quello nuovo.
       */
      image: 'miele-di-acacia-card',
      productPhotos: [
        {
          base: 'miele-di-acacia',
          alt: "Il primo scatto del barattolo di miele di acacia di Bio & Golosità",
        },
      ],
      color: '#f3e2a1',
      priceFormats: [
        { size: '500 g', price: '€ 6,00' },
        { size: '1 kg', price: '€ 11,00' },
      ],
      title: 'Miele di Acacia a Cassano d\'Adda (MI) | Bio & Golosità',
      description:
        'Miele di acacia 100% italiano di api proprie, dagli apiari del Parco Adda Nord. Delicato, floreale e naturalmente liquido. 500 g €6; consegna in zona.',
      /**
       * Sottotitolo della hero: due righe, nessun elenco di keyword. Le schede
       * miele sono pensate per essere lette in pochi secondi (vedi README), quindi
       * non hanno un `intro` da mostrare: quello che c'era da dire su gusto, usi e
       * origine sta nelle `characteristics` del blocco prodotto e in "Da dove
       * arriva", una volta sola.
       */
      heroIntro:
        "Miele 100% italiano, delicato e naturalmente liquido. Prodotto dalle nostre api negli apiari del Parco Adda Nord.",
      // Acacia di pianura: la robinia qui fiorisce tra la fine di aprile e i
      // primi giorni di maggio (al massimo la prima settimana), e a metà maggio
      // il miele è già smielato. Qui la dicitura è già in forma da pagina: la
      // mostrano la frase di "Da dove arriva" e il dato "Raccolta".
      harvest: 'Fine aprile – inizio maggio',
      /**
       * Annata del raccolto in vendita (es. 'Raccolto 2026'): da completare a
       * mano. Finché è `null` la pagina non ne parla; quando c'è, compare sotto il
       * dato "Raccolta".
       */
      annata: null,
      /** Frase di "Da dove arriva" (la foto dell'apiario sta accanto). */
      originNote:
        "La raccolta dell'acacia avviene tra fine aprile e inizio maggio negli apiari che seguiamo nel Parco Adda Nord.",
      /** Riga "Lavorazione" dei quattro dati di origine. */
      workNote: 'Smielato a freddo, non pastorizzato',
      // Le caratteristiche del blocco prodotto. La **seconda** è la
      // microdescrizione che la card mostra in /miele/ (`characteristics[1]`).
      characteristics: [
        'Giallo paglierino, quasi trasparente',
        'Gusto dolce e delicato, con note floreali',
        'Resta liquido molto a lungo',
        'Ideale per tisane, latte, yogurt e colazione',
      ],
      /**
       * Il video della scheda: la smielatura del raccolto 2026, che ha preso il
       * posto di `smielatura-acacia.mp4` (ritirato insieme al suo poster). È
       * verticale (478×850), quindi sta nella colonna stretta di `.origin-video`
       * e non viene ritagliato. `caption` è la didascalia che la pagina rende
       * sotto il video, in un `<figcaption>` (la scheda dell'acacia non usa
       * `VideoFigure` da solo, senza didascalia).
       *
       * Il filtraggio che segue la smielatura è pubblicato
       * (`/video/filtraggio-miele-di-acacia.mp4`) ma **non è in pagina**: per
       * rimetterlo basta rimettere la sua voce qui sotto, dopo questa — i video
       * si impilano in "Da dove arriva", nell'ordine dei dati, ognuno con la
       * sua didascalia.
       */
      videos: [
        {
          src: '/video/smielatura-acacia-2026.mp4',
          poster: '/video/smielatura-acacia-2026-poster-99f4bc5c.avif',
          label: 'La smielatura del miele di acacia (raccolto 2026)',
          cls: 'video-item--tall',
          caption:
            'La smielatura del raccolto 2026, direttamente nel nostro laboratorio.',
        },
      ],
      faq: [
        {
          q: 'Il miele di acacia cristallizza?',
          a: 'Cristallizza molto più lentamente rispetto a molti altri mieli e può restare liquido per lungo tempo.',
        },
        {
          q: 'Come si conserva?',
          a: 'Tienilo ben chiuso, lontano dalla luce e da fonti di calore.',
        },
        {
          q: 'Fate consegne a domicilio?',
          a: 'Sì, consegniamo nelle zone servite tra Milano, Bergamo, Cremona e Lodi. Puoi anche ritirarlo a Cassano d\'Adda su appuntamento.',
        },
      ],
      /**
       * Voto e recensioni **reali** del prodotto miele di acacia (arrivano dal
       * titolare) — non della scheda Google dell'azienda, che è un'altra cosa
       * (quelle stanno in `site.reviews` e non alimentano il `Product`). `rating` è il dato che finisce nell'`aggregateRating`
       * dei dati strutturati e nella riga di riepilogo in pagina: aggiornalo a
       * mano quando arrivano nuove recensioni sul prodotto. In pagina si
       * mostrano solo le tre recensioni con il testo (`productReviews`); le
       * altre che compongono il totale non servono per intero.
       *
       * Il testo e le stelle di qui sono gli stessi che rende la pagina: il
       * JSON-LD li rilegge da questa lista, quindi non possono divergere.
       */
      rating: { value: 5, count: 10 },
      productReviews: [
        {
          name: "Luigi d'Amato",
          stars: 5,
          text: 'Miele di acacia buonissimo! Lo usiamo sul pane e nello yogurt. Si sente subito la differenza rispetto a quello del supermercato.',
        },
        {
          name: 'Anna Sinigaglia',
          stars: 5,
          text: 'Acacia buonissima, molto trasparente e consistenza perfetta. Consegna precisa e Raffaele disponibilissimo.',
        },
        {
          name: 'Paolo Torri',
          stars: 5,
          text: 'È già il terzo ordine. Il miele di acacia è il preferito mio e di mia moglie. Lo usiamo tutte le mattine per la colazione. Consigliato!',
        },
      ],
    },
    {
      slug: 'miele-millefiori-al-tiglio-e-more',
      name: 'Miele Millefiori al Tiglio e More',
      image: 'miele-millefiori-al-tiglio-e-more',
      color: '#e8b45a',
      priceFormats: [
        { size: '500 g', price: '€ 5,00' },
        { size: '1 kg', price: '€ 9,00' },
      ],
      title: 'Miele Millefiori al Tiglio e More | Bio & Golosità',
      description:
        'Miele millefiori al tiglio e more, 100% italiano e di api proprie. Raccolto a giugno: corposo, con note di tiglio e more. 500 g €5; consegna in zona.',
      heroIntro:
        "Miele 100% italiano, scuro e corposo, con note di tiglio e more selvatiche. Prodotto dalle nostre api negli apiari del Parco Adda Nord.",
      harvest: 'Raccolto a giugno',
      annata: null,
      originNote:
        "La raccolta avviene a giugno negli apiari che seguiamo nel Parco Adda Nord.",
      characteristics: [
        'Colore: ambra dorato, più carico in autunno',
        'Gusto: corposo, con note di tiglio e more selvatiche',
        'Consistenza: denso, cristallizzazione lenta e grossolana',
        'Ideale in cucina, anche per piatti salati',
      ],
      /** Smielatura del raccolto 2026 e i barattoli riempiti subito dopo. */
      videos: [
        {
          src: '/video/smielatura-millefiori-tiglio-more.mp4',
          poster: '/video/smielatura-millefiori-tiglio-more-poster-918a2227.avif',
          label: 'La smielatura del millefiori tiglio e more (raccolto 2026)',
          cls: 'video-item--tall',
          caption:
            'La smielatura del raccolto 2026, direttamente nel nostro laboratorio.',
        },
        {
          src: '/video/riempendo-un-barattolo-di-millefiori.mp4',
          poster: '/video/riempendo-un-barattolo-di-millefiori-poster-26aa0927.avif',
          label: 'I barattoli di millefiori riempiti dopo la smielatura (raccolto 2026)',
          cls: 'video-item--tall',
          caption: 'I barattoli riempiti subito dopo la smielatura, ancora nello stesso pomeriggio.',
        },
      ],
      faq: [
        {
          q: 'Perché il millefiori al tiglio e more è più scuro?',
          a: 'Perché raccoglie nettari di fioriture estive (tiglio, phacelia, fiori di campo) che producono mieli più colorati e ricchi di minerali rispetto alle fioriture primaverili.',
        },
        {
          q: 'Che differenza c\'è con il millefiori al tiglio e ailanto?',
          a: 'Hanno lo stesso periodo di raccolta, giugno, ma composizione diversa: il tiglio e more è più scuro, denso e ricco di minerali, con le note di tiglio e di more selvatiche; il tiglio e ailanto è più chiaro e più dolce, con il retrogusto di pesca dei fiori di ailanto. Chi cerca un miele più delicato sceglie il tiglio e ailanto, chi lo vuole deciso sceglie il tiglio e more.',
        },
        {
          q: 'Il miele al tiglio e more è adatto ai bambini?',
          a: 'Sì, come tutti i nostri mieli non subisce trattamenti termici né filtrazioni aggressive. Ricorda solo che il miele non va dato ai bambini sotto i 12 mesi.',
        },
        { ...deliveryFaq },
      ],
      /**
       * SEGNAPOSTO — da sostituire con recensioni reali del prodotto (vedi README,
       * "Recensioni delle schede miele"): nomi e testi qui sotto sono inventati e
       * finiscono anche nei dati strutturati (`Review` + `aggregateRating`).
       * `rating.count` è il totale dichiarato: al massimo tre recensioni con il
       * testo vanno in pagina.
       */
      rating: { value: 5, count: 8 },
      productReviews: [
        {
          name: 'Rita Pozzi',
          stars: 5,
          text: 'Molto buono, si sente soprattutto il tiglio e ha un gusto particolare che non avevo mai trovato in altri millefiori. Sicuramente da riprendere.',
        },
        {
          name: 'Giovanna Meroni',
          stars: 5,
          text: 'Il tiglio e more è il nostro preferito: corposo ma non stucchevole. Con i formaggi stagionati è un\'altra cosa.',
        },
        {
          name: 'Stefano Cabrini',
          stars: 5,
          text: 'Consegna precisa e barattoli arrivati perfetti. Il sapore è deciso, si sente che è miele vero.',
        },
      ],
    },
    {
      slug: 'miele-millefiori-al-tarassaco-e-biancospino',
      name: 'Miele Millefiori al Tarassaco e Biancospino',
      image: 'miele-millefiori-al-tarassaco-e-biancospino',
      color: '#f2dda6',
      priceFormats: [
        { size: '500 g', price: '€ 5,00' },
        { size: '1 kg', price: '€ 9,00' },
      ],
      title: 'Miele Millefiori al Tarassaco e Biancospino | Bio & Golosità',
      description:
        'Miele millefiori primaverile al tarassaco e biancospino, 100% italiano e di api proprie. Raccolto tra metà marzo e metà aprile. 500 g €5; consegna in zona.',
      /**
       * Il **primaverile** dei tre millefiori (gli altri due sono estivi, al
       * tiglio) ed è il primo miele della nostra stagione. Nel nome ci stanno
       * solo tarassaco e biancospino — le due fioriture che si sentono di più —
       * perché con pruno selvatico e ciliegio il titolo non finiva più: in
       * barattolo, però, il nettare di quelle fioriture c'è, e la scheda lo
       * dice nella prima `characteristics` e in una FAQ apposta.
       */
      heroIntro:
        'Miele 100% italiano delle prime fioriture. Cristallizza presto e si spalma benissimo. Prodotto dalle nostre api negli apiari del Parco Adda Nord.',
      harvest: 'Raccolto tra metà marzo e metà aprile',
      annata: null,
      originNote:
        "La raccolta avviene tra metà marzo e metà aprile, sulle prime fioriture dell'anno, negli apiari che seguiamo nel Parco Adda Nord.",
      /**
       * Le quattro voci del blocco prodotto, come negli altri mieli: colore,
       * gusto, composizione e consistenza. Non ci sono né le date del raccolto né
       * il non pastorizzato: sono già nel dato "Raccolta", nella riga
       * "Lavorazione" e nella FAQ, e gli altri mieli nei chip non le
       * ripetono. La composizione completa invece non sta nel nome, quindi la
       * terza voce è l'unico posto in cui si legge in blocco.
       */
      characteristics: [
        'Colore: ambrato',
        // `characteristics[1]` è la microdescrizione della card in /miele/: qui
        // è il gusto, come per gli altri mieli. La cristallizzazione veloce — il
        // tratto che distingue questo millefiori dagli altri — resta nella
        // quarta voce, nella nota del blocco e nella FAQ.
        'Gusto: fruttato, con note floreali',
        'Delle fioriture del periodo: tarassaco, biancospino, pruno selvatico e ciliegio',
        'Cristallizza presto, per il glucosio del tarassaco',
      ],
      /**
       * Il video del raccolto: Raffaele che spiega questo miele mentre i
       * barattoli si riempiono. È verticale (576×1024), quindi sta nella colonna
       * stretta di `.origin-video`. Il sorgente è in root (gitignorato, come
       * tutti i video); in `public/video/` sta la ricodifica da 2,2 MB con il
       * suo poster (vedi README, "Video").
       */
      videos: [
        {
          src: '/video/millefiori-tarassaco-biancospino.mp4',
          poster: '/video/millefiori-tarassaco-biancospino-poster-ee49c420.avif',
          label: 'Raffaele che spiega il millefiori al tarassaco e biancospino mentre i barattoli si riempiono',
          cls: 'video-item--tall',
          caption:
            'Il miele che va nei barattoli, raccontato da Raffaele.',
        },
      ],
      /**
       * Le **altre** foto del blocco prodotto, dopo `image`: il blocchetto le
       * mostra come mini galleria a scorrimento, una per schermata (il lightbox
       * sfoglia le stesse foto a schermo intero, perché le prende dalla
       * sezione). Le basi sono quelle dei file in root
       * (`miele-millefiori-al-tarassaco-e-biancospino-2.jpg` → base `...-2`).
       * Le due foto non sono 4:3, e il blocchetto è 4:3: `object-fit: cover` le
       * ritaglia al centro. Se il taglio non va bene per una di loro, si sposta
       * con `position` (es. `position: '50% 30%'`), come `imgPos` sulla foto
       * principale.
       */
      productPhotos: [
        {
          base: 'miele-millefiori-al-tarassaco-e-biancospino-2',
          alt: 'Il barattolo di millefiori al tarassaco e biancospino di Bio & Golosità, in uno scatto verticale',
        },
        {
          base: 'miele-millefiori-al-tarassaco-e-biancospino-3',
          alt: 'Il barattolo di millefiori al tarassaco e biancospino, in uno scatto orizzontale',
        },
      ],
      faq: [
        {
          q: 'Perché questo millefiori cristallizza così presto?',
          a: 'Perché contiene molto tarassaco, e il tarassaco è ricco di glucosio: tra gli zuccheri del miele è il glucosio a cristallizzare per primo, quindi questo barattolo diventa granuloso in poche settimane, molto prima degli altri nostri millefiori. Conta anche la lavorazione: noi smieliamo a freddo e non pastorizziamo, e la pastorizzazione — oltre a sciupare profumo e aromi — serve proprio a ritardare la cristallizzazione. Non è un difetto: è il miele che si comporta da miele.',
        },
        {
          q: 'Nel nome ci sono solo tarassaco e biancospino: è tutto qui?',
          a: 'No. In questo millefiori primaverile finisce anche il nettare di pruno selvatico e di ciliegio, che fioriscono negli stessi giorni: nel nome teniamo solo le due fioriture che si sentono di più, perché con tutte e quattro diventerebbe lungo da leggere. La composizione completa è nella prima voce del blocco prodotto.',
        },
        {
          q: 'Quando viene raccolto, e in che ordine arrivano i vostri mieli?',
          a: "Tra metà marzo e metà aprile, sulle prime fioriture dell'anno: è il primo miele della nostra stagione. Poi arriva l'acacia (fine aprile – inizio maggio), a giugno i due millefiori al tiglio e infine il castagno.",
        },
        {
          q: 'Se è diventato duro, cosa faccio?',
          a: 'Niente di speciale: il miele cristallizzato si spalma benissimo e in cucina si comporta come quello liquido. Se però lo preferisci liquido, metti il barattolo a bagnomaria in acqua tiepida per qualche minuto, senza fretta e senza farlo bollire.',
        },
        { ...deliveryFaq },
      ],
      rating: { value: 5, count: 2 },
      productReviews: [
        {
          name: 'Chiara Borsani',
          stars: 5,
          text: 'Avevo letto che cristallizza in fretta e infatti dopo un paio di settimane era già granuloso. È davvero buono e si spalma molto meglio di quello liquido. Lo consiglio.',
        },
        {
          name: 'Andrea Molteni',
          stars: 5,
          text: 'Preso per provare qualcosa di diverso dal solito acacia. Mi è piaciuto, penso che lo riprenderò. Pacco arrivato puntuale, tutto a posto.',
        },
      ],
    },
    {
      slug: 'miele-millefiori-al-tiglio-e-ailanto',
      name: 'Miele Millefiori al Tiglio e Ailanto',
      image: 'miele-millefiori-al-tiglio-e-ailanto',
      color: '#d9a83f',
      priceFormats: [
        { size: '500 g', price: '€ 5,00' },
        { size: '1 kg', price: '€ 9,00' },
      ],
      title: 'Miele Millefiori al Tiglio e Ailanto | Bio & Golosità',
      description:
        'Miele millefiori al tiglio e ailanto, 100% italiano e di api proprie. Raccolto a giugno: dolce, con retrogusto di pesca. 500 g €5; consegna in zona.',
      heroIntro:
        "Miele 100% italiano, dolce e floreale, con il retrogusto di pesca dell'ailanto. Prodotto dalle nostre api negli apiari del Parco Adda Nord.",
      harvest: 'Raccolto a giugno',
      annata: null,
      originNote:
        "La raccolta avviene a giugno negli apiari che seguiamo nel Parco Adda Nord.",
      characteristics: [
        'Colore: ambra dorato, più chiaro e luminoso',
        'Gusto: dolce, con note di tiglio e retrogusto di pesca',
        'Profumo: intenso e floreale, tipico dell\'ailanto',
        'Consistenza: denso, cristallizzazione lenta',
      ],
      /**
       * La scheda non aveva video: qui c'è la smielatura del nostro millefiori.
       * Il girato è del raccolto primaverile (sorgente in root:
       * `smielatura-2026-millefiori-primaverile.mp4`), ma la didascalia non
       * nomina la stagione: questa scheda, come quella del tiglio e more, dice
       * che il miele è raccolto a giugno, e il video racconta **come** lavoriamo
       * il millefiori, non l'annata di questo barattolo.
       */
      videos: [
        {
          src: '/video/smielatura-millefiori-2026.mp4',
          poster: '/video/smielatura-millefiori-2026-poster-d8961bf6.avif',
          label: 'La smielatura del nostro millefiori (raccolto 2026)',
          cls: 'video-item--tall',
          caption:
            'La smielatura del nostro millefiori: il miele esce dallo smielatore a freddo, senza pastorizzazione.',
        },
      ],
      faq: [
        {
          q: 'Cos\'è l\'ailanto e perché si chiama pianta del paradiso?',
          a: 'L\'ailanto (Ailanthus altissima) è un albero conosciuto anche come "pianta del paradiso" o "albero del paradiso". I suoi fiori producono un nettare abbondante e profumato, che al miele regala un caratteristico retrogusto di pesca.',
        },
        {
          q: 'Che differenza c\'è con il millefiori al tiglio e more?',
          a: 'È lo stesso millefiori di giugno, ma con una percentuale più alta di tiglio e ailanto rispetto al tiglio e more: più dolce e aromatico, con il retrogusto di pesca che lo rende facilmente riconoscibile.',
        },
        {
          q: 'Quando viene raccolto?',
          a: 'Come il millefiori al tiglio e more, viene raccolto a giugno, quando tiglio e ailanto sono in piena fioritura. È smielato a freddo e non pastorizzato, come tutti i nostri mieli.',
        },
        { ...deliveryFaq },
      ],
      /**
       * SEGNAPOSTO — da sostituire con recensioni reali del prodotto (vedi README,
       * "Recensioni delle schede miele"): nomi e testi qui sotto sono inventati e
       * finiscono anche nei dati strutturati (`Review` + `aggregateRating`).
       * `rating.count` è il totale dichiarato: al massimo tre recensioni con il
       * testo vanno in pagina.
       */
      rating: { value: 5, count: 7 },
      productReviews: [
        {
          name: 'Claudia Ferri',
          stars: 5,
          text: 'Il retrogusto di pesca si sente davvero! È la prima volta che assaggio un miele così... Consigliatissimo!',
        },
        {
          name: 'Marco Zanetti',
          stars: 5,
          text: 'Lo usiamo nelle tisane della sera e sul pane a colazione. Il miele di Raffaele è sempre una garanzia.',
        },
        {
          name: 'Elena Riva',
          stars: 5,
          text: 'Regalato a mia madre e le è piaciuto tantissimo. Ha un gusto particolare, diverso dai soliti mieli. Ottima qualità.',
        },
      ],
    },
    {
      slug: 'miele-di-castagno',
      name: 'Miele di Castagno',
      image: 'miele-di-castagno',
      color: '#8a4b1f',
      priceFormats: [
        { size: '500 g', price: '€ 6,50' },
        { size: '1 kg', price: '€ 12,00' },
      ],
      title: 'Miele di Castagno a Cassano d\'Adda (MI) | Bio & Golosità',
      description:
        'Miele di castagno 100% italiano di api proprie, dagli apiari dell\'Alta Val Brembana. Scuro, intenso, leggermente amarognolo. 500 g €6,50; consegna in zona.',
      heroIntro:
        "Miele 100% italiano, scuro e intenso, con retrogusto amarognolo. Prodotto dalle nostre api negli apiari dell'Alta Val Brembana.",
      harvest: 'Raccolto tra giugno e luglio',
      annata: null,
      originNote:
        "La raccolta avviene tra giugno e luglio negli apiari che seguiamo in Alta Val Brembana.",
      /**
       * Zona degli apiari di questa varietà: «il castagno viene esclusivamente
       * dagli apiari dell'Alta Val Brembana» (vedi README, "Sede legale e
       * apiari"). Alimenta il dato "Origine" della scheda e l'`alt` della foto
       * in "Da dove arriva"; gli altri mieli non hanno il campo e valgono
       * 'Parco Adda Nord'.
       */
      apiaryZone: 'Alta Val Brembana',
      characteristics: [
        'Colore: ambra scuro, quasi bruno',
        'Gusto: intenso, legnoso, con retrogusto amarognolo',
        'Profumo intenso e persistente',
        'Cristallizza molto lentamente',
      ],
      faq: [
        {
          q: 'Il miele di castagno è amaro?',
          a: 'Ha un caratteristico retrogusto leggermente amarognolo, segno della sua autenticità. Chi lo ama, lo considera il più buono: provalo con un formaggio stagionato per capirne la forza.',
        },
        {
          q: 'Il miele di castagno è adatto in cucina?',
          a: 'Assolutamente sì: è un miele da chef. Ottimo con formaggi stagionati, carni rosse, polenta e nella preparazione di dolci speziati. Resiste bene anche alla cottura.',
        },
        {
          q: 'Da dove arriva il nostro miele di castagno?',
          a: 'Le mie api bottinano i castagni dei boschi intorno ai nostri apiari dell\'Alta Val Brembana: è la fioritura del bosco che dà a questo miele il suo colore scuro e il retrogusto amarognolo.',
        },
        { ...deliveryFaq },
      ],
      /**
       * SEGNAPOSTO — da sostituire con recensioni reali del prodotto (vedi README,
       * "Recensioni delle schede miele"): nomi e testi qui sotto sono inventati e
       * finiscono anche nei dati strutturati (`Review` + `aggregateRating`).
       * `rating.count` è il totale dichiarato: al massimo tre recensioni con il
       * testo vanno in pagina.
       */
      rating: { value: 5, count: 3 },
      productReviews: [
        {
          name: 'Gianni Brambilla',
          stars: 5,
          text: 'Intenso e leggermente amaro, come piace a me. Con un formaggio stagionato è un\'altra cosa.',
        },
        {
          name: 'Sara Vacchi',
          stars: 5,
          text: 'In autunno lo uso tantissimo, soprattutto sulla polenta. Sta benissimo anche nei dolci speziati. Davvero ottimo.',
        },
        {
          name: 'Pietro Colombo',
          stars: 5,
          text: 'Miele forte e autentico, si sente subito che non è quello del supermercato. Consegna puntuale.',
        },
      ],
    },
  ],

  /**
   * Miele in favo: non è una varietà, è il miele lasciato nel favo con la sua
   * cera. Sta fuori da `honeys` perché griglia e tabella prezzi di /miele/
   * ragionano sui formati 500 g / 1 kg di ogni varietà. Ha però la sua scheda
   * completa: per schede, footer, catalogo e link incrociati si usa
   * `honeyProducts` (in fondo al file).
   *
   * `priceFormats: []` = prezzo non pubblicato: la pagina mostra "Prezzo su
   * richiesta" e i dati strutturati non pubblicano l'offerta. Da completare a
   * mano, es. `priceFormats: [{ size: 'favo intero', price: '€ 18,00' }]`.
   */
  honeyComb: {
    slug: 'miele-in-favo',
    name: 'Miele in favo',
    image: 'miele-in-favo',
    color: '#f0c96b',
    priceFormats: [],
    /**
     * Nello schema il favo **non** si dichiara disponibile: la disponibilità è
     * poca e solo su prenotazione, quindi `null` = nessun `availability`
     * sull'offerta (vedi `scripts/schema.mjs`, che lo verifica). Vale anche se un
     * giorno avesse un prezzo pubblicato: `offer()` legge questo campo invece di
     * mettere `InStock` a priori.
     */
    schemaAvailability: null,
    title: 'Miele in Favo a Cassano d\'Adda (MI) | Bio & Golosità',
    description:
      "Miele in favo delle nostre api, dagli apiari del Parco Adda Nord. Con la sua cera e senza trattamento termico, solo su prenotazione.",
    heroIntro:
      'Favo opercolato, tagliato direttamente dal telaio e invasettato con la sua cera, senza smielatura né trattamenti termici. Proviene dai nostri apiari nel Parco Adda Nord.',
    /** Frase di "Da dove arriva" (la foto dell'apiario sta accanto). */
    originNote:
      "Il favo si prepara in stagione, quando le api hanno opercolato le cellette, negli apiari che seguiamo nel Parco Adda Nord.",
    harvest: 'Raccolto in stagione, quando il favo è opercolato',
    apiaryPhoto: 'apiari_5',
    /** Annata del raccolto in vendita: da completare a mano. */
    annata: null,
    category: 'Miele in favo',
    characteristics: [
      'Il miele resta nel favo, con la sua cera',
      // `characteristics[1]` è il testo che la card usa nella griglia di /miele/:
      // qui deve restare in evidenza la disponibilità, non la lavorazione.
      'Disponibilità limitata: pochi favi, solo su prenotazione',
      'Nessuna smielatura: il favo si taglia intero',
      'Non pastorizzato, mai scaldato',
      'Da gustare con pane, formaggi e frutta',
    ],
    /** Nota del blocco prodotto, al posto di `site.bulkNote`. */
    note: 'Disponibilità limitata: prepariamo pochi favi a stagione, solo su prenotazione.',
    /** Riga "Lavorazione" dei quattro dati di origine: qui non c'è smielatura. */
    workNote:
      'Nessuna smielatura: il favo si taglia dal telaio e si invasetta intero, senza trattamento termico',
    videos: [
      {
        src: '/video/miele-in-favo.mp4',
        poster: '/video/miele-in-favo-poster-4d2db9b1.avif',
        label: 'Raffaele mostra il miele in favo e lo assaggia',
        cls: 'video-item--tall',
        caption:
          'Raffaele stacca un pezzo di favo dal telaio e lo assaggia: buonissimo, con il miele ancora nella sua cera.',
      },
    ],
    /**
     * I fotogrammi ricavati dal video, **in ordine d'uso**: dalla prima, il favo
     * ancora attaccato al telaio, fino all'assaggio di Raffaele. Le basi sono
     * numerate come i file in root (`miele-in-favo-1.avif` → `miele_in_favo_1`),
     * quindi l'ordine dell'array è l'ordine in pagina e quello del lightbox: per
     * questo i numeri degli `alt` saltano il 2 (il fotogramma `miele_in_favo_2`
     * è pubblicato in `public/img/` ma non è più in pagina — per rimetterlo basta
     * rimettere la voce qui sotto, al suo posto). Sono le altre foto del **blocco
     * prodotto** (`productPhotos`), dopo la foto del favo: prima erano una
     * galleria in fondo alla pagina.
     *
     * I fotogrammi sono verticali (9:16): nel riquadro 4:3 del blocco prodotto si
     * mostrano **interi**, con la fascia del colore del riquadro ai lati, perché
     * `cover` ne taglierebbe più di metà (vedi `productPhotos` in `[slug].astro`).
     * `position` non serve qui: non c'è taglio da spostare.
     */
    productPhotos: [
      {
        base: 'miele_in_favo_1',
        alt: "Il favo ancora attaccato al telaio, con il miele dove le api l'hanno fatto",
      },
      { base: 'miele_in_favo_3', alt: "Miele in favo: dal telaio all'assaggio, fotogramma 3" },
      { base: 'miele_in_favo_4', alt: "Miele in favo: dal telaio all'assaggio, fotogramma 4" },
      { base: 'miele_in_favo_5', alt: "Miele in favo: dal telaio all'assaggio, fotogramma 5" },
      { base: 'miele_in_favo_6', alt: "Miele in favo: dal telaio all'assaggio, fotogramma 6" },
    ],
    faq: [
      {
        q: 'Si mangia anche la cera?',
        a: "Sì: la cera d'api è commestibile e si può mangiare insieme al miele, oppure masticarla e scartarla, come si faceva tradizionalmente. Non viene digerita, ma è parte del prodotto: il favo si mangia così com'è.",
      },
      {
        q: 'Come si conserva il miele in favo?',
        a: "In un vasetto ben chiuso, al buio e sotto i 14 °C: una cantina o un locale fresco. Tienilo lontano dalle fonti di calore, perché la cera si ammorbidisce con il caldo.",
      },
      {
        q: 'Il miele in favo cristallizza?',
        a: 'Può succedere: la cristallizzazione è un processo naturale e la cera la rallenta, ma non la impedisce. Nel favo non si scalda per riportarlo liquido, perché il calore scioglierebbe la cera: si mangia com\'è, e su pane caldo si ammorbidisce da solo.',
      },
      {
        q: 'Da quale miele è fatto il favo?',
        a: "Dipende dalla stagione: il favo si prepara quando le api hanno opercolato le cellette nella fioritura del momento, quindi può essere millefiori o di una fioritura singola. Quando lo ordini ti diciamo da quale raccolto arriva.",
      },
      { ...deliveryFaq },
    ],
    /**
     * SEGNAPOSTO — da sostituire con recensioni reali del prodotto (vedi README,
     * "Recensioni delle schede miele"): nomi e testi qui sotto sono inventati e
     * finiscono anche nei dati strutturati. Due recensioni, tutte e due in pagina.
     */
    rating: { value: 5, count: 2 },
    productReviews: [
      {
        name: 'Marta Bellini',
        stars: 5,
        text: 'Il favo è una goduria. Lo taglio e lo mangio sul pane caldo, proprio come una volta. Mi piace anche sentire la cera sotto i denti.',
      },
      {
        name: 'Davide Sironi',
        stars: 5,
        text: 'Prodotto raro e genuino, arrivato imballato con cura. Da provare almeno una volta, a me è piaciuto davvero tanto.',
      },
    ],
  },
};

/**
 * Tutte le schede del miele: le cinque varietà più il miele in favo. Da usare
 * per le pagine (`/miele/<slug>/`), il footer, il catalogo dei dati strutturati
 * e i link incrociati; per griglia e tabella prezzi restano le sole varietà
 * (`site.honeys`).
 */
export const honeyProducts = [...site.honeys, site.honeyComb];

export const nav = [
  { href: '/miele/', label: 'Mieli' },
  { href: '/api-regine/', label: 'Api regine' },
  { href: '/nuclei-api/', label: 'Nuclei' },
  { href: '/chi-siamo/', label: 'Chi siamo' },
  { href: '/contatti/', label: 'Contatti' },
];
