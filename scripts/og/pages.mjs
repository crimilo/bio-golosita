/**
 * Copy delle immagini OG, una voce per `slug` (vedi `src/data/og.js` per
 * l'abbinamento rotta → slug).
 *
 * Regole di copy (verificate da `check()` in generate.mjs, non a occhio):
 * - `title`: al massimo 2 righe, ~34 caratteri per riga a 48px. Titolo breve,
 *   concreto, senza punto finale.
 * - `sub`: una frase, al massimo 16 parole: dice il beneficio, non ripete il
 *   titolo.
 * - `chips`: massimo 3, ~20 caratteri l'uno. Il primo è il prezzo quando esiste
 *   (viene evidenziato in ambra); gli altri sono formato/disponibilità/zona.
 * - `badge`: il dato che convince in un colpo d'occhio (prezzo d'ingresso, prova
 *   sociale, disponibilità). Sta in alto a destra.
 * - `bg`: base dell'immagine di sfondo (dal manifest `src/data/img-manifest.js`),
 *   full-bleed a 1200×630. `pos` è l'`object-position` del ritaglio.
 *
 * I testi vengono dalle pagine reali (h1, intro, prezzi e disponibilità in
 * `src/data/site.js` e `src/data/bee-products.js`): se cambiano i prezzi in
 * pagina, vanno aggiornati anche qui.
 */
export const copy = {
  home: {
    bg: 'apiari_hd',
    pos: '50% 46%',
    eyebrow: 'api proprie · dal 2020',
    title: ['Miele artigianale 100% italiano', "direttamente dall'apicoltore"],
    sub: "Non pastorizzato e smielato a freddo, dagli apiari di Cassano d'Adda (MI).",
    chips: ['Acacia da € 6,00', 'Millefiori da € 5,00', 'Castagno da € 6,50'],
    badge: '★ 5,0 su Google',
  },
  miele: {
    bg: 'hero_bg',
    pos: '52% 78%',
    eyebrow: 'api proprie · non pastorizzato',
    title: ['Miele italiano artigianale', 'acacia, millefiori e castagno'],
    sub: 'Quattro varietà di produzione propria, smielate a freddo nei nostri apiari.',
    chips: ['500 g da € 5,00', '1 kg da € 9,00', 'Miele in favo in stagione'],
    badge: '100% Made in Italy',
  },
  'miele-millefiori': {
    bg: 'prato_fiorito',
    pos: '50% 55%',
    eyebrow: 'due produzioni in stagione',
    title: ['Miele millefiori italiano'],
    sub: 'Il miele delle fioriture che si incontrano: cambia ogni anno e racconta il territorio.',
    chips: ['Tiglio e more', 'Tiglio e ailanto', 'Raccolti a giugno'],
    badge: 'da € 5,00 / 500 g',
  },
  'miele-di-acacia': {
    bg: 'fiori_robinia',
    pos: '50% 45%',
    eyebrow: 'miele di acacia',
    title: ['Miele di Acacia'],
    sub: 'Chiaro, delicato e profumato: resta liquido a lungo, perfetto per tisane e colazione.',
    chips: ['500 g € 6,00', '1 kg € 11,00', 'Raccolto fine aprile–maggio'],
    badge: 'da € 6,00 / 500 g',
  },
  'miele-millefiori-estivo-al-tiglio-e-more': {
    bg: 'fiori_tiglio',
    pos: '50% 45%',
    eyebrow: 'millefiori · estivo',
    title: ['Miele Millefiori Estivo', 'al Tiglio e More'],
    sub: 'Raccolto a giugno: le note balsamiche del tiglio e il frutto scuro delle more.',
    chips: ['500 g € 5,00', '1 kg € 9,00', 'Raccolto a giugno'],
    badge: 'da € 5,00 / 500 g',
  },
  'miele-millefiori-estivo-al-tiglio-e-ailanto': {
    bg: 'ape_polline',
    pos: '50% 50%',
    eyebrow: 'millefiori · estivo',
    title: ['Miele Millefiori Estivo', 'al Tiglio e Ailanto'],
    sub: 'Raccolto a giugno: tiglio e ailanto, un estivo chiaro e profumato.',
    chips: ['500 g € 5,00', '1 kg € 9,00', 'Raccolto a giugno'],
    badge: 'da € 5,00 / 500 g',
  },
  'miele-di-castagno': {
    bg: 'fiori_castagno',
    pos: '50% 45%',
    eyebrow: 'miele di castagno',
    title: ['Miele di Castagno'],
    sub: 'Scuro, intenso e amaro al punto giusto: si riconosce al primo assaggio.',
    chips: ['500 g € 6,50', '1 kg € 12,00', 'Raccolto giugno–luglio'],
    badge: 'da € 6,50 / 500 g',
  },
  'miele-in-favo': {
    bg: 'honey_favo',
    pos: '50% 50%',
    eyebrow: 'in stagione · su prenotazione',
    title: ['Miele in favo'],
    sub: 'Il miele lasciato nella sua cera: tagliato dal telaio e invasettato intero, senza scaldarlo.',
    chips: ['Favo intero', 'Nessuna smielatura', 'Non pastorizzato'],
    badge: 'Pochi favi a stagione',
  },
  'polline-d-api': {
    bg: 'polline_granuli',
    pos: '50% 50%',
    eyebrow: "prodotto dell'alveare · api proprie",
    title: ["Polline d'api italiano"],
    sub: 'Raccolto dalle nostre api: fresco in primavera, essiccato anche dopo.',
    chips: ['200 g € 5,50', 'Fresco aprile–maggio', 'Essiccato tutto l’anno'],
    badge: '€ 5,50 / 200 g',
  },
  'api-regine': {
    bg: 'ape_regina_di_raffaele',
    pos: '50% 45%',
    eyebrow: 'linea Buckfast · F1',
    title: ['Api regine in vendita', 'in Lombardia'],
    sub: 'Figlie di una madre F0 selezionata, già in deposizione: per rinnovare o avviare un alveare.',
    chips: ['Allevate da noi', 'Tutte feconde', 'Prenotazione in stagione'],
    badge: 'Da fine maggio',
  },
  'nuclei-api': {
    bg: 'sciame_4',
    pos: '50% 45%',
    eyebrow: 'regina feconda inclusa',
    title: ["Nuclei d'api in vendita", 'in Lombardia'],
    sub: 'Famiglie già avviate su telai con covata in tutti gli stadi: per iniziare senza attese.',
    chips: ['Regina F1 feconda', 'Telai con covata', 'Dai primi di aprile'],
    badge: 'Su prenotazione',
  },
  'consegna-miele': {
    bg: 'miele_versare',
    pos: '50% 45%',
    eyebrow: "consegna e ritiro · Cassano d'Adda",
    title: ['Consegna del miele', 'a domicilio'],
    sub: "In Martesana, Gera d'Adda e fino a Milano Est: spesso gratuita, oppure ritiro in azienda.",
    chips: ["Cassano d'Adda", 'Milano Est', 'Bergamasca e Cremasca'],
    badge: 'Spesso gratuita',
  },
  'chi-siamo': {
    bg: 'raffaele_sorridente_con_le_sue_api',
    pos: '50% 32%',
    eyebrow: "apicoltore a Cassano d'Adda",
    title: ['Apicoltura di Raffaele Antoci'],
    sub: 'Dai quindici alveari di mio padre al miele di Bio & Golosità: api proprie, dal 2020.',
    chips: ['Api proprie e apiari', 'Miele non pastorizzato', 'Apicoltore dal 2020'],
    badge: '★ 5,0 su Google',
  },
  contatti: {
    bg: 'apiario',
    pos: '50% 42%',
    eyebrow: "Cassano d'Adda (MI)",
    title: ['Contattaci'],
    sub: 'Una chiamata o un messaggio WhatsApp: ti diciamo cosa è disponibile e quando consegniamo.',
    chips: ['+39 351 537 6719', 'WhatsApp', "Via Salvo D'Acquisto 9"],
    badge: 'Tutti i giorni 8–21',
  },
};
