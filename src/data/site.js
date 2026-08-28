// ============================================================
//  SITO "Bio & Golosità" — SORGENTE UNICA di dati e contenuti
//  Modifica qui: telefono, prezzi, orari, recensioni, ecc.
// ============================================================

export const site = {
  name: 'Bio & Golosità',
  legalName: 'Azienda Agricola Bio & Golosità di Antoci Raffaele',
  owner: 'Antoci Raffaele',
  tagline: 'Miele genuino di api proprie a Cassano d\'Adda',
  domain: 'https://bioegolosita.it',

  // Numero di telefono reale
  phoneDisplay: '+39 351 537 6719',
  phoneHref: 'tel:+393515376719',
  whatsapp: 'https://wa.me/393515376719?text=Ciao%2C%20vorrei%20informazioni%20sul%20vostro%20miele',

  address: {
    street: 'Via Salvo D\'Acquisto 9',
    city: 'Cassano d\'Adda',
    zip: '20062',
    province: 'MI',
    region: 'Lombardia',
    country: 'Italia',
    geo: { lat: 45.5354, lng: 9.5254 },
  },

  // >>> TODO: verificare con il titolare <<<
  hours: 'Lun–Sab 9:00–19:00 · Dom su appuntamento',

  founded: 2021, // 5 anni di esperienza
  experienceYears: 5,
  priceRange: '€€',

  // Ordini all'ingrosso: secchi da 10 kg con prezzo personalizzato
  bulkNote:
    'Per ordini superiori a 10 kg preparo secchi da 10 kg a un prezzo leggermente scontato, personalizzato su misura: contattami per il preventivo.',

  // Zone servite — citate in modo naturale, senza keyword stuffing
  areaServed: [
    'Cassano d\'Adda',
    'Groppello d\'Adda',
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
  ],

  // >>> Recensioni: segnaposto finché non esiste la scheda Google.
  // Sostituirle con quelle reali appena il profilo Google Business Profile è attivo.
  // NESSUNA recensione finzionale va marcata con schema Review/AggregateRating. <<<
  reviews: [
    {
      name: 'Maria R.',
      town: 'Cassano d\'Adda',
      text: 'Miele millefiori buonissimo, si sente che è appena raccolto. Raffaele è gentilissimo e disponibile, ordino sempre da lui.',
    },
    {
      name: 'Luca B.',
      town: 'Treviglio',
      text: 'Il miele di acacia non cristallizza mai ed è davvero delicato. Qualità superiore rispetto a quello del supermercato.',
    },
    {
      name: 'Giulia M.',
      town: 'Gorgonzola',
      text: 'Preso il miele di castagno per un regalo: sapore intenso che ha conquistato tutti. Consegna rapida e prezzo onesto.',
    },
    {
      name: 'Andrea P.',
      town: 'Pozzuolo Martesana',
      text: 'Miele genuino, non filtrato, con il gusto di una volta. Si vede che le api sono curate con passione.',
    },
  ],

  honeys: [
    {
      slug: 'miele-di-acacia',
      name: 'Miele di Acacia',
      image: 'miele_di_acacia',
      color: '#f3e2a1',
      price: '€ 6,00 (500 g) · € 11,00/kg',
      priceFrom: 'da € 6,00',
      title: 'Miele di Acacia a Cassano d\'Adda (MI) | Bio & Golosità',
      description:
        'Miele di acacia di api proprie a Cassano d\'Adda (MI): chiaro, delicato, non cristallizza. Ideale per colazione e tisane. Ordina al 351 537 6719.',
      intro:
        'Il miele di acacia è tra i più amati in assoluto: chiaro, profumatissimo e dal sapore delicato, resta liquido a lungo grazie all\'elevato contenuto di fruttosio. Le nostre api lo producono nei boschi e nelle campagne della Martesana e della Gera d\'Adda, dove la robinia fiorisce tra fine maggio e giugno. Essendo ricco di fruttosio, ha un indice glicemico più basso rispetto allo zucchero da cucina: si scioglie in bocca e non copre mai gli altri sapori.',
      harvest: 'Raccolto tra maggio e giugno',
      characteristics: [
        'Colore: giallo paglierino, quasi trasparente',
        'Gusto: dolce e delicato, note floreali',
        'Non cristallizza praticamente mai',
        'Perfetto per tisane, latte e yogurt',
      ],
      uses:
        'Il miele di acacia è ideale per la colazione: non altera il sapore di tisane, latte e caffè e resta fluido anche in inverno. Ottimo anche per dolcificare yogurt e frutta fresca, oppure spalmato su pane e fette biscottate.',
      benefits: [
        'Delicato e dolce: non copre i sapori, perfetto per tisane, latte e caffè',
        'A base di fruttosio: resta liquido a lungo e viene digerito facilmente da molti',
        'Energia a rapido assorbimento, ideale prima di una passeggiata o dello sport',
        'Gusto delicato, apprezzato anche da chi di solito non ama il miele',
      ],
      specs: [
        { label: 'Colore', value: 'giallo paglierino, quasi trasparente' },
        { label: 'Profumo e sapore', value: 'delicato e floreale, dolce ma non stucchevole' },
        { label: 'Cristallizzazione', value: 'praticamente mai, grazie al fruttosio' },
        { label: 'Raccolto', value: 'fine maggio – giugno' },
        { label: 'Conservazione', value: 'barattolo chiuso, al riparo da luce e umidità, a temperatura ambiente (10–25 °C)' },
        { label: 'Abbinamenti', value: 'tisane, latte, yogurt, frutta fresca' },
      ],
      faq: [
        {
          q: 'Il miele di acacia cristallizza?',
          a: 'No, è uno dei pochi mieli che resta liquido molto a lungo grazie al basso contenuto di glucosio. Conservato in un luogo fresco e asciutto mantiene la sua consistenza fluida per molti mesi.',
        },
        {
          q: 'Quando viene raccolto il miele di acacia?',
          a: 'La fioritura della robinia nella zona di Cassano d\'Adda avviene tra la fine di maggio e giugno. Il miele viene smielato a freddo e non filtrato, per conservare intatte tutte le proprietà.',
        },
        {
          q: 'Come si conserva il miele di acacia?',
          a: 'In un barattolo ben chiuso, al riparo dalla luce e dall\'umidità, a temperatura ambiente. Non serve il frigorifero.',
        },
      ],
    },
    {
      slug: 'miele-millefiori-primaverile',
      name: 'Miele Millefiori Primaverile',
      image: 'barattoli_di_mile_millefiori',
      imgPos: 'center 70%',
      color: '#f6d98a',
      price: '€ 5,00 (500 g) · € 9,00/kg',
      priceFrom: 'da € 5,00',
      title: 'Miele Millefiori Primaverile a Cassano d\'Adda | Bio & Golosità',
      description:
        'Miele millefiori primaverile di api proprie a Cassano d\'Adda (MI): floreale, cremoso, dal profumo di frutteto in fiore. Ordinalo su WhatsApp o al telefono.',
      intro:
        'Il millefiori primaverile raccoglie i nettari dei primi fiori dell\'anno: pesco, ciliegio, susino e i fiori di campo che sbocciano lungo l\'Adda e nei frutteti della Martesana. È un miele floreale e avvolgente, dal profumo intenso di primavera. È il più "di stagione" che produco: cambia leggermente ogni anno, perché racconta il clima e le fioriture di quella primavera.',
      harvest: 'Raccolto tra aprile e maggio',
      characteristics: [
        'Colore: ambra chiaro, dorato',
        'Gusto: floreale, con note di frutteto',
        'Consistenza: cremoso, cristallizza finemente',
        'Aromatico al naso, perfetto per la colazione',
      ],
      uses:
        'Perfetto spalmato su pane caldo e fette biscottate, ma anche per dolcificare il latte dei bambini e preparare dolci semplici. Il suo profumo floreale esalta anche formaggi freschi e ricotta.',
      benefits: [
        'Raccoglie il polline delle prime fioriture: un concentrato di aromi di primavera',
        'Emolliente per la gola, da gustare da solo o nel latte caldo della sera',
        'Fonte di energia naturale, dolce ma mai stucchevole',
        'Versatile: va bene a colazione, in cucina e sui formaggi freschi',
      ],
      specs: [
        { label: 'Colore', value: 'ambra chiaro, dorato' },
        { label: 'Profumo e sapore', value: 'floreale, con note di frutteto' },
        { label: 'Cristallizzazione', value: 'fina e naturale, dopo qualche mese' },
        { label: 'Raccolto', value: 'aprile – maggio' },
        { label: 'Conservazione', value: 'barattolo chiuso, al riparo da luce e umidità, a temperatura ambiente (10–25 °C)' },
        { label: 'Abbinamenti', value: 'pane caldo, latte, ricotta e formaggi freschi' },
      ],
      faq: [
        {
          q: 'Che differenza c\'è tra millefiori primaverile ed estivo?',
          a: 'Il primaverile viene dai fiori dei frutteti e delle prime fioriture: è più chiaro, delicato e profumato. L\'estivo raccoglie i nettari delle fioriture più tarde ed è più intenso e corposo.',
        },
        {
          q: 'Il millefiori primaverile cristallizza?',
          a: 'Sì, è un processo naturale che avviene nel giro di alcuni mesi. Basta scaldare delicatamente il barattolo a bagnomaria per riportarlo fluido senza rovinarne le proprietà.',
        },
        {
          q: 'Da dove vengono le api?',
          a: 'I miei apiari si trovano tra Cassano d\'Adda, la Gera d\'Adda e le campagne della Martesana, zone ricche di fioriture e poco inquinate, ideali per un miele genuino.',
        },
      ],
    },
    {
      slug: 'miele-millefiori-estivo',
      name: 'Miele Millefiori Estivo',
      image: 'miele_millefiori_estivo',
      color: '#e8b45a',
      price: '€ 5,00 (500 g) · € 9,00/kg',
      priceFrom: 'da € 5,00',
      title: 'Miele Millefiori Estivo a Cassano d\'Adda | Bio & Golosità',
      description:
        'Miele millefiori estivo di api proprie a Cassano d\'Adda (MI): più intenso e corposo, con note di tiglio e fiori di campo. Ordinalo oggi: consegna in zona.',
      intro:
        'Il millefiori estivo è il miele delle grandi fioriture: tiglio, phacelia, trifoglio e i fiori spontanei delle golene dell\'Adda. Più scuro e più ricco di minerali del primaverile — le fioriture estive sono più concentrate — ha un carattere deciso che piace a chi cerca un miele "con corpo".',
      harvest: 'Raccolto tra giugno e luglio',
      characteristics: [
        'Colore: ambra dorato, più carico in autunno',
        'Gusto: corposo, con note di tiglio e caramello',
        'Consistenza: denso, cristallizzazione lenta e grossolana',
        'Ideale in cucina, anche per piatti salati',
      ],
      uses:
        'Ottimo per la colazione ma anche in cucina: glassa carni e verdure, dolcifica le tisane della sera e si sposa benissimo con formaggi stagionati. È il miele preferito da chi ama i sapori decisi.',
      benefits: [
        'Più ricco di minerali rispetto ai mieli primaverili, grazie alle fioriture estive',
        'Le note di tiglio sono tradizionalmente associate a un momento di relax',
        'Corposo e aromatico: bastano piccole quantità per dare carattere a un piatto',
        'Perfetto con formaggi stagionati e con i dolci della tradizione',
      ],
      specs: [
        { label: 'Colore', value: 'ambra dorato, più carico' },
        { label: 'Profumo e sapore', value: 'corposo, con note di tiglio e caramello' },
        { label: 'Cristallizzazione', value: 'lenta e grossolana' },
        { label: 'Raccolto', value: 'giugno – luglio' },
        { label: 'Conservazione', value: 'barattolo chiuso, al riparo da luce e umidità, a temperatura ambiente (10–25 °C)' },
        { label: 'Abbinamenti', value: 'colazione, glassature di carne, formaggi stagionati' },
      ],
      faq: [
        {
          q: 'Perché il millefiori estivo è più scuro?',
          a: 'Perché raccoglie nettari di fioriture estive (tiglio, phacelia, fiori di campo) che producono mieli più colorati e ricchi di minerali rispetto alle fioriture primaverili.',
        },
        {
          q: 'Il miele millefiori estivo è adatto ai bambini?',
          a: 'Sì, come tutti i nostri mieli non subisce trattamenti termici né filtrazioni aggressive. Ricorda solo che il miele non va dato ai bambini sotto i 12 mesi.',
        },
        {
          q: 'Fate consegne anche a Treviglio e Gorgonzola?',
          a: 'Sì, consegniamo in tutta la zona tra Milano, Bergamo e Cremona: Cassano d\'Adda, Treviglio, Gorgonzola, Melzo, Rivolta d\'Adda e dintorni. Scrivici su WhatsApp per gli orari.',
        },
      ],
    },
    {
      slug: 'miele-di-castagno',
      name: 'Miele di Castagno',
      image: 'miele_di_castagno',
      color: '#8a4b1f',
      price: '€ 6,50 (500 g) · € 12,00/kg',
      priceFrom: 'da € 6,50',
      title: 'Miele di Castagno a Cassano d\'Adda (MI) | Bio & Golosità',
      description:
        'Miele di castagno di api proprie a Cassano d\'Adda (MI): scuro, intenso, leggermente amaro. Perfetto con formaggi stagionati. Ordina al telefono.',
      intro:
        'Il miele di castagno è il più caratteristico dei nostri mieli: scuro, intenso e leggermente amarognolo, con un profumo forte e persistente. È tra i mieli più ricchi di sali minerali — in particolare ferro e potassio — ed è il compagno ideale dei formaggi stagionati e dei piatti robusti della nostra tradizione.',
      harvest: 'Raccolto tra giugno e luglio',
      characteristics: [
        'Colore: ambra scuro, quasi bruno',
        'Gusto: intenso, legnoso, con retrogusto amarognolo',
        'Ricco di sali minerali e ferro',
        'Cristallizza molto lentamente',
      ],
      uses:
        'Il miele di castagno esalta formaggi stagionati e erborinati, accompagna arrosti e carni rosse, polenta e insalate con noci. In pasticceria è perfetto per panpepato, biscotti speziati e dolci autunnali.',
      benefits: [
        'Tra i mieli più ricchi di sali minerali, in particolare ferro e potassio',
        'Tradizionalmente usato per la gola e le vie respiratorie',
        'Sapore intenso e persistente: una piccola quantità dà carattere a molti piatti',
        'Lento a cristallizzare, si conserva bene anche a lungo',
      ],
      specs: [
        { label: 'Colore', value: 'ambra scuro, quasi bruno' },
        { label: 'Profumo e sapore', value: 'intenso, legnoso, con retrogusto amarognolo' },
        { label: 'Cristallizzazione', value: 'molto lenta' },
        { label: 'Raccolto', value: 'giugno – luglio' },
        { label: 'Conservazione', value: 'barattolo chiuso, al riparo da luce e umidità, a temperatura ambiente (10–25 °C)' },
        { label: 'Abbinamenti', value: 'formaggi stagionati, carni rosse, polenta, dolci speziati' },
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
          q: 'Dove trovo i castagni nella zona di Cassano d\'Adda?',
          a: 'Le mie api bottinano i castagni presenti nei boschi e nei filari della Gera d\'Adda e delle colline tra Bergamo e Cremona, a poca distanza dai miei apiari.',
        },
      ],
    },
  ],
};

export const nav = [
  { href: '/#mieli', label: 'I nostri mieli' },
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/#galleria', label: 'Galleria' },
  { href: '/contatti', label: 'Contatti' },
];
