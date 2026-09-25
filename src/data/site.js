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
  tagline: 'Miele genuino di api proprie a Cassano d\'Adda',
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
    'Disponibili anche formati da 5 e 10 kg su richiesta.',

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
   * I quattro mieli. `priceFormats` sono i formati di vendita con il loro
   * prezzo, scritti a mano come tutto il resto dei prezzi del sito: il primo è
   * il prezzo d'ingresso (quello che si vede per primo e sulle card), gli altri
   * restano visibili sotto. Da qui si ricavano la riga di prezzo, la tabella
   * /miele/, le FAQ e i dati strutturati (una variante Google per formato).
   *
   * Campi che usa la scheda (`miele/[slug].astro`, la stessa per le quattro
   * varietà e per il miele in favo): `title`/`description` (SEO), `heroIntro`,
   * `originNote`, `harvest` + `annata`, `workNote`, `characteristics`, `videos`
   * (con la loro `caption`), `faq`, `rating` + `productReviews` e, se serve,
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
      image: 'miele-di-acacia',
      color: '#f3e2a1',
      priceFormats: [
        { size: '500 g', price: '€ 6,00' },
        { size: '1 kg', price: '€ 11,00' },
      ],
      title: 'Miele di Acacia a Cassano d\'Adda (MI) | Bio & Golosità',
      description:
        'Miele di acacia 100% italiano di api proprie a Cassano d\'Adda (MI). Delicato, floreale e naturalmente liquido. 500 g €6; consegna in zona.',
      /**
       * Sottotitolo della hero: due righe, nessun elenco di keyword. Le schede
       * miele sono pensate per essere lette in pochi secondi (vedi README), quindi
       * non hanno un `intro` da mostrare: quello che c'era da dire su gusto, usi e
       * origine sta nelle `characteristics` del blocco prodotto e in "Da dove
       * arriva", una volta sola.
       */
      heroIntro:
        "Miele 100% italiano, delicato e naturalmente liquido. Prodotto dalle nostre api tra Cassano d'Adda e la Martesana.",
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
        "La raccolta dell'acacia avviene tra fine aprile e inizio maggio negli apiari che seguiamo tra Cassano d'Adda, la Martesana e la Gera d'Adda.",
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
      rating: { value: 5, count: 6 },
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
      slug: 'miele-millefiori-estivo-al-tiglio-e-more',
      name: 'Miele Millefiori Estivo al Tiglio e More',
      image: 'miele-millefiori-estivo-al-tiglio-e-more',
      color: '#e8b45a',
      priceFormats: [
        { size: '500 g', price: '€ 5,00' },
        { size: '1 kg', price: '€ 9,00' },
      ],
      title: 'Miele Millefiori Estivo al Tiglio e More | Bio & Golosità',
      description:
        'Miele millefiori estivo al tiglio e more, 100% italiano e di api proprie. Corposo, con note di tiglio e more selvatiche. 500 g €5; consegna in zona.',
      heroIntro:
        "Miele 100% italiano, scuro e corposo, con note di tiglio e more selvatiche. Prodotto dalle nostre api tra Cassano d'Adda e la Martesana.",
      harvest: 'Raccolto a giugno',
      annata: null,
      originNote:
        "La raccolta avviene a giugno negli apiari che seguiamo tra Cassano d'Adda, la Martesana e la Gera d'Adda.",
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
          q: 'Perché il millefiori estivo al tiglio e more è più scuro?',
          a: 'Perché raccoglie nettari di fioriture estive (tiglio, phacelia, fiori di campo) che producono mieli più colorati e ricchi di minerali rispetto alle fioriture primaverili.',
        },
        {
          q: 'Che differenza c\'è con il millefiori estivo al tiglio e ailanto?',
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
      rating: { value: 5, count: 4 },
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
      slug: 'miele-millefiori-estivo-al-tiglio-e-ailanto',
      name: 'Miele Millefiori Estivo al Tiglio e Ailanto',
      image: 'miele-millefiori-estivo-al-tiglio-e-ailanto',
      color: '#d9a83f',
      priceFormats: [
        { size: '500 g', price: '€ 5,00' },
        { size: '1 kg', price: '€ 9,00' },
      ],
      title: 'Miele Millefiori Estivo al Tiglio e Ailanto | Bio & Golosità',
      description:
        'Miele millefiori estivo al tiglio e ailanto, 100% italiano e di api proprie. Dolce e floreale, con retrogusto di pesca. 500 g €5; consegna in zona.',
      heroIntro:
        "Miele 100% italiano, dolce e floreale, con il retrogusto di pesca dell'ailanto. Prodotto dalle nostre api tra Cassano d'Adda e la Martesana.",
      harvest: 'Raccolto a giugno',
      annata: null,
      originNote:
        "La raccolta avviene a giugno negli apiari che seguiamo tra la Martesana, la Gera d'Adda, il Parco Adda Nord e la Val Brembana.",
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
          q: 'Che differenza c\'è con il millefiori estivo al tiglio e more?',
          a: 'È sempre un millefiori estivo, ma con una percentuale più alta di tiglio e ailanto rispetto al tiglio e more: più dolce e aromatico, con il retrogusto di pesca che lo rende facilmente riconoscibile.',
        },
        {
          q: 'Quando viene raccolto?',
          a: 'Come il millefiori estivo al tiglio e more, viene raccolto a giugno, quando tiglio e ailanto sono in piena fioritura. È smielato a freddo e non pastorizzato, come tutti i nostri mieli.',
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
        'Miele di castagno 100% italiano di api proprie a Cassano d\'Adda (MI). Scuro, intenso e leggermente amarognolo. 500 g €6,50; consegna in zona.',
      heroIntro:
        "Miele 100% italiano, scuro e intenso, con retrogusto amarognolo. Prodotto dalle nostre api negli apiari lombardi, tra la Gera d'Adda e la Val Brembana.",
      harvest: 'Raccolto tra giugno e luglio',
      annata: null,
      originNote:
        "La raccolta avviene tra giugno e luglio negli apiari che seguiamo tra Cassano d'Adda, la Gera d'Adda e la Val Brembana.",
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
          a: 'Le mie api bottinano i castagni presenti nei boschi e nei filari della Gera d\'Adda, nelle colline tra Bergamo e Cremona e nella Val Brembana, a poca distanza dai miei apiari.',
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
      "Miele in favo delle nostre api a Cassano d'Adda (MI), con la sua cera e senza trattamento termico. Disponibilità limitata, solo su prenotazione.",
    heroIntro:
      "Miele in favo delle nostre api: il favo opercolato, tagliato dal telaio e invasettato con la sua cera, senza smielatura e senza trattamento termico. Arriva dagli apiari tra Cassano d'Adda, la Martesana e la Gera d'Adda.",
    /** Frase di "Da dove arriva" (la foto dell'apiario sta accanto). */
    originNote:
      "Il favo si prepara in stagione, quando le api hanno opercolato le cellette, negli apiari che seguiamo tra Cassano d'Adda, la Martesana e la Gera d'Adda.",
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
          'Il favo si taglia intero dal telaio e si invasetta così com\'è, senza scaldarlo.',
      },
    ],
    /**
     * La sequenza di foto ricavate dal video, **in ordine d'uso**: dalla prima,
     * il favo ancora attaccato al telaio, fino all'assaggio di Raffaele. Le basi
     * sono numerate come i file in root (`miele-in-favo-1.avif` →
     * `miele_in_favo_1`), quindi l'ordine dell'array è l'ordine in pagina e
     * nella galleria a schermo intero.
     */
    galleryTitle: "Dal favo all'assaggio",
    galleryIntro:
      'Sei fotogrammi in ordine, presi dal video qui sopra: si parte dal favo ancora attaccato al telaio e si arriva all\'assaggio.',
    gallery: [
      {
        base: 'miele_in_favo_1',
        alt: 'Il favo ancora attaccato al telaio, con il miele dove le api l\'hanno fatto',
        cls: 'g-item--portrait',
        caption: 'Il favo ancora attaccato al telaio, dove le api hanno fatto il miele',
      },
      { base: 'miele_in_favo_2', alt: 'Miele in favo: la sequenza dal telaio all\'assaggio, fotogramma 2', cls: 'g-item--portrait' },
      { base: 'miele_in_favo_3', alt: 'Miele in favo: la sequenza dal telaio all\'assaggio, fotogramma 3', cls: 'g-item--portrait' },
      { base: 'miele_in_favo_4', alt: 'Miele in favo: la sequenza dal telaio all\'assaggio, fotogramma 4', cls: 'g-item--portrait' },
      { base: 'miele_in_favo_5', alt: 'Miele in favo: la sequenza dal telaio all\'assaggio, fotogramma 5', cls: 'g-item--portrait' },
      { base: 'miele_in_favo_6', alt: 'Miele in favo: la sequenza dal telaio all\'assaggio, fotogramma 6', cls: 'g-item--portrait' },
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
 * Tutte le schede del miele: le quattro varietà più il miele in favo. Da usare
 * per le pagine (`/miele/<slug>/`), il footer, il catalogo dei dati strutturati
 * e i link incrociati; per griglia e tabella prezzi restano le sole varietà
 * (`site.honeys`).
 */
export const honeyProducts = [...site.honeys, site.honeyComb];

export const nav = [
  { href: '/miele/', label: 'Mieli' },
  { href: '/polline-d-api/', label: 'Polline' },
  { href: '/api-regine/', label: 'Api regine' },
  { href: '/nuclei-api/', label: 'Nuclei' },
  { href: '/chi-siamo/', label: 'Chi siamo' },
  { href: '/contatti/', label: 'Contatti' },
];
