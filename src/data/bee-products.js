/**
 * Dati di vendita dei prodotti dell'allevamento: polline, api regine, nuclei.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠️  DA COMPLETARE A MANO (Raffaele): sono le uniche informazioni che il sito
 *     non può inventare. Finché restano `null` le pagine restano pubblicabili
 *     e corrette, perché al loro posto compare una frase neutra che invita a
 *     chiedere. Appena le hai, sostituisci il `null` e la pagina si aggiorna
 *     da sola (testo + eventuale prezzo).
 *
 *   polline.raccoltoDa / lavorazione
 *   apiRegine.prenotazioneDa / documenti
 *   nuclei.telai / prenotazioneDa
 *
 *   Le disponibilità sono scritte: polline fresco aprile–maggio (essiccato anche
 *   dopo), api regine feconde da fine maggio, nuclei dai primi di aprile.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const availabilityFallback =
  "Disponibilità stagionale: chiamaci o scrivici su WhatsApp e ti diciamo subito cosa c'è pronto in questo periodo.";

/**
 * Foto delle card che rimandano ai quattro reparti (home e pagine interne).
 * Una sola fonte: così immagine e didascalia non divergono fra le pagine e
 * nessuna card resta senza foto.
 */
export const repartoImages = {
  miele: { img: 'hero_bg', alt: 'Barattoli di miele di Bio & Golosità' },
  polline: {
    img: 'polline_granuli',
    alt: "Polline d'api in granuli con un cucchiaio di legno",
  },
  apiRegine: { img: 'ape_regina_di_raffaele', alt: 'Ape regina nel nostro apiario' },
  nuclei: { img: 'arnia_piena_di_api', alt: 'Arnia piena di api sui telai' },
  consegna: {
    img: 'miele_versare',
    alt: 'Miele versato da un cucchiaio di legno dentro un barattolo',
  },
};

export const prezzoSuRichiesta = 'Prezzo su richiesta';

export const prezzoNota =
  'Il prezzo dipende dal formato e dal periodo: chiedilo al telefono o su WhatsApp e te lo diamo subito.';

export const polline = {
  path: '/polline-d-api/',
  name: "Polline d'api",
  h1: "Polline d'api italiano di produzione propria",
  title: "Polline d'Api Italiano a Cassano d'Adda | Bio & Golosità",
  description:
    "Polline d'api raccolto nei nostri apiari tra Cassano d'Adda, Martesana e Gera d'Adda. Origine, conservazione e freschezza. Chiama il 351 537 6719.",
  // ↓↓↓ da completare
  prezzo: '€ 5,50 (200 g)',
  disponibilita: 'Polline fresco da aprile a maggio; quello essiccato anche dopo',
  formato: '200 g',
  raccolto: null, // es. 'da aprile a settembre'
  lavorazione: null, // es. 'essiccato a bassa temperatura' / 'fresco, surgelato'
  // ↑↑↑ da completare

  intro:
    "Il polline d'api è il polline che le api raccolgono fiore dopo fiore e riportano all'alveare: un prodotto dell'alveare diverso dal miele, che si gusta al naturale o si aggiunge a yogurt e colazioni. Il nostro arriva dagli apiari tra Cassano d'Adda, la Martesana e la Gera d'Adda, ed è confezionato a piccoli lotti per non perdere profumo e consistenza.",

  highlights: [
    'Api proprie e apiari seguiti da noi, tra Cassano d\'Adda e la Gera d\'Adda',
    'Raccolto e confezionato a piccoli lotti, mai in grande stile industriale',
    'Origine tracciabile: sai da quali fioriture arriva',
    'Conservazione spiegata: come tenerlo fresco a casa tua',
  ],

  specs: [
    {
      label: 'Origine',
      value:
        "Apiari di Bio & Golosità tra Cassano d'Adda, la Martesana, la Gera d'Adda, il Parco Adda Nord (area protetta) e la Val Brembana",
    },
    {
      label: 'Come si conserva',
      value:
        'In barattolo ben chiuso, al buio. Il polline fresco va tenuto in frigorifero e, per la scorta lunga, in freezer; quello essiccato a temperatura ambiente.',
    },
    { label: 'Formato', value: '200 g' }, // come `formato` qui sopra: barattolo da 200 g
    { label: 'Raccolto', value: null }, // da completare: es. 'aprile – settembre'
    {
      label: 'Disponibilità',
      value: 'fresco da aprile a maggio; essiccato anche dopo',
    },
    { label: 'Lavorazione', value: null }, // da completare
    { label: 'Prezzo', value: null }, // reso sotto dal prezzo qui sopra, non duplicare
  ],

  faq: [
    {
      q: "Da dove viene il vostro polline d'api?",
      a: "Dai nostri apiari: le api sono nostre e gli alveari sono tra Cassano d'Adda, la Martesana, la Gera d'Adda, il Parco Adda Nord e la Val Brembana. Lo raccogliamo e confezioniamo a piccoli lotti, come facciamo con il miele.",
    },
    {
      q: "Il polline d'api va tenuto in frigorifero?",
      a: 'Il polline fresco va in frigorifero e, per la scorta lunga, in freezer; quello essiccato si conserva in un barattolo chiuso, al riparo dalla luce, a temperatura ambiente. Quando lo ordini ti spieghiamo come conservare quello che ti consegniamo.',
    },
    {
      q: "Come si usa il polline d'api?",
      a: 'Al naturale, un cucchiaino alla volta, oppure su yogurt, macedonia, frullati o cereali. Il sapore è delicato, con note di fiori ed erba: è un ingrediente, non un dolcificante.',
    },
    {
      q: "Il polline d'api è un integratore o un medicinale?",
      a: "No: è un prodotto dell'alveare, un alimento. Non diamo indicazioni terapeutiche e non lo presentiamo come cura o rimedio.",
    },
  ],

  gallery: [
    {
      base: 'polline_granuli',
      alt: "Polline d'api in granuli servito con un cucchiaio di legno",
      cls: 'g-item--square',
      caption: 'Polline d\'api: granuli dal colore e dal profumo delle fioriture di stagione',
    },
    {
      base: 'ape_polline',
      alt: "Ape coperta di polline su un rametto, in macro",
      cls: 'g-item--square',
      caption: 'Sono le api a raccogliere il polline, fiore dopo fiore',
    },
    {
      base: 'prato_fiorito',
      alt: 'Prato fiorito di campagna con fiori spontanei colorati',
      cls: 'g-item--wide',
      caption: 'Dalle fioriture spontanee nasce il polline della stagione',
    },
  ],
};

export const apiRegine = {
  path: '/api-regine/',
  name: 'Api regine',
  h1: 'Api regine in vendita in Lombardia',
  title: 'Vendita Api Regine in Lombardia | Bio & Golosità',
  description:
    'Api regine da apicoltore in Lombardia: regine feconde già in deposizione, figlie F1 di una madre Buckfast F0. Prenotazione e ritiro a Cassano d\'Adda.',
  /**
   * La linea che alleviamo: una sola, Buckfast. La regina madre è una F0
   * selezionata fecondata con inseminazione strumentale; le regine che
   * vendiamo sono le sue figlie, quindi F1. Da qui prendono il nome sia la
   * sezione «La nostra linea» della pagina sia la scheda tecnica.
   */
  linea: {
    razza: 'Buckfast',
    madre: 'F0 selezionata, fecondata con inseminazione strumentale',
    vendute: 'F1, le figlie della madre F0',
  },
  // ↓↓↓ da completare
  prezzo: null,
  disponibilita: 'Api regine feconde disponibili da fine maggio in poi',
  prenotazioneDa: null,
  documenti: null, // es. 'Certificato sanitario di origine dell'allevamento'
  // ↑↑↑ da completare

  intro:
    "Alleviamo le nostre api a Cassano d'Adda, al confine tra le province di Milano, Bergamo, Cremona e Lodi: dalla nostra linea Buckfast nascono le api regine che mettiamo a disposizione degli apicoltori della Lombardia. Vendiamo solo regine feconde, già in deposizione: per rinnovare un alveare, sostituire una regina vecchia o avviare nuovi nuclei. Qui trovi cosa forniamo, come funziona la prenotazione e come ritirare.",

  // Tipologie di regina. In pagina non c'è più la sezione "tipologie": da quando
  // vendiamo solo regine feconde una sola card ripeteva quello che il testo e la
  // scheda tecnica dicono già. Resta qui come contenuto pronto all'uso.
  tipi: [
    {
      name: 'Regine feconde',
      text: 'Regine già in deposizione, nate e fecondate nel nostro apiario: si introducono in un alveare orfano o in un nucleo e la famiglia riparte senza attese, senza aspettare i tempi della fecondazione.',
    },
  ],

  // Punti di forza mostrati come card con icona nella sezione "Perché comprare
  // da noi" di /api-regine/: stesse `.feature` della home. `icon` è uno dei nomi
  // di src/components/Icons.astro.
  cards: [
    {
      icon: 'home',
      title: 'Allevate da noi, in Lombardia',
      text: "Le regine nascono dalla nostra linea Buckfast, negli apiari tra Cassano d'Adda, la Martesana e la Gera d'Adda: sono api abituate al clima e alle fioriture di questa zona.",
    },
    {
      icon: 'clock',
      title: 'Disponibilità reale, stagione dopo stagione',
      text: 'Le regine si prenotano nei mesi utili all\'allevamento e sono disponibili in genere a partire da fine maggio: la disponibilità cambia di settimana in settimana, per questo conviene prenotare. Chiamaci e ti diciamo subito cosa c\'è.',
    },
    {
      icon: 'package',
      title: 'Ritiro e consegna in Lombardia',
      text: "Puoi ritirare in sede a Cassano d'Adda su appuntamento, oppure concordare la consegna nella zona tra Milano, Bergamo, Cremona e Lodi. Per spedizioni o quantità importanti, chiedici un preventivo.",
    },
    {
      icon: 'shield',
      title: 'Informazioni sanitarie e documenti',
      text: "Ogni partita di regine ha la sua storia sanitaria: chiedici quali documenti la accompagnano. Ti diamo tutte le informazioni che servono prima dell'acquisto.",
    },
  ],

  specs: [
    { label: 'Razza', value: 'Buckfast: regine F1 da una madre F0 selezionata con inseminazione strumentale' },
    { label: 'Tipologie', value: 'Regine feconde, già fecondate e in deposizione' },
    {
      label: 'Provenienza',
      value:
        "Allevamento di Bio & Golosità — Cassano d'Adda (MI), apiari tra Martesana e Gera d'Adda",
    },
    { label: 'Disponibilità', value: 'da fine maggio in poi' },
    { label: 'Prenotazione', value: null }, // da completare
    { label: 'Prezzo', value: null }, // da completare
    {
      label: 'Ritiro e consegna',
      value:
        "Ritiro in sede a Cassano d'Adda (Via Salvo D'Acquisto 9) su appuntamento, oppure consegna concordata in Lombardia",
    },
    { label: 'Documenti', value: null }, // da completare
  ],

  faq: [
    {
      q: 'Come prenoto le api regine?',
      a: "Chiamaci o scrivici su WhatsApp indicando quante regine ti servono, in che periodo e se preferisci ritiro o consegna. Ti confermiamo subito la disponibilità della stagione e fissiamo insieme i dettagli.",
    },
    {
      q: 'Le regine che vendete sono già feconde?',
      a: "Sì: forniamo solo regine feconde, già fecondate nel nostro apiario e in deposizione. Si introducono in un alveare orfano o in un nucleo e la famiglia riparte subito, senza attese: è la scelta giusta anche quando si cambia regina per la prima volta.",
    },
    {
      q: 'Da dove vengono le vostre api regine?',
      a: "Nascono negli apiari dell'azienda, a Cassano d'Adda e nella zona tra la Martesana e la Gera d'Adda: sono regine allevate in Lombardia, della nostra linea Buckfast, abituate al clima e alle fioriture di qui.",
    },
    {
      q: 'Come si introducono le nuove regine?',
      a: "Con calma, rispettando i tempi della famiglia e usando le gabbiette di introduzione. Dopo l'inserimento lascia l'alveare chiuso per almeno 5 giorni: aprirlo prima è il modo più semplice per far uccidere la regina, soprattutto se è la prima volta che ne introduci una. Quando ti consegniamo le regine ti spieghiamo il metodo che usiamo noi.",
    },
  ],

  // Gallery: nessuna foto ripetuta. La regina è già nel blocco prodotto e le api
  // nel testo (`api`), quindi qui restano le arnie, l'apiario e il lavoro in
  // apiario (il vecchio telaio in mano è stato tolto dal sito).
  gallery: [
    {
      base: 'arnia_piena_di_api',
      alt: 'Arnia piena di api sui telai',
      cls: 'g-item--square',
      caption: 'Una famiglia numerosa sui telai: è il lavoro di una regina in salute',
    },
    {
      base: 'sciame_5',
      alt: "Api di Bio & Golosità in apiario, a Cassano d'Adda",
      cls: 'g-item--tall',
      caption: "Le nostre api in apiario, a Cassano d'Adda",
    },
    {
      base: 'apiario',
      alt: 'Le nostre arnie in apiario',
      cls: 'g-item--tall',
      caption: "Gli apiari da cui nascono le nostre regine, in Lombardia",
    },
  ],
};

export const nuclei = {
  path: '/nuclei-api/',
  name: "Nuclei d'api",
  h1: "Nuclei d'api in vendita in Lombardia",
  title: "Nuclei d'Api in Vendita in Lombardia | Bio & Golosità",
  description:
    "Nuclei d'api da apicoltore in Lombardia: cosa comprende un nucleo, sciame, nucleo e pacco d'api, disponibilità e prenotazione. Cassano d'Adda (MI).",
  // ↓↓↓ da completare
  telai: null, // es. '5 telai (3 di covata + 2 di scorte)'
  razza: 'Buckfast (F1 da madre F0)', // la regina del nucleo è una figlia della nostra madre F0
  prezzo: null,
  disponibilita: 'Nuclei disponibili dai primi di aprile in poi',
  prenotazioneDa: null,
  // ↑↑↑ da completare

  intro:
    "Vendiamo nuclei d'api della nostra produzione, allevati negli apiari tra Cassano d'Adda, la Martesana e la Gera d'Adda. Se stai cercando online sciami d'api in vendita, nella maggior parte dei casi il prodotto che serve per avviare una nuova famiglia è un nucleo: qui ti spieghiamo la differenza e come funziona la prenotazione.",

  // Non più mostrato in pagina: la stessa distinzione è nei blocchi di testo di
  // /nuclei-api/ e nella guida /guide/nucleo-sciame-pacco-dapi-differenze/.
  // Resta qui come contenuto pronto all'uso, se in futuro serve una sezione a schede.
  difference: [
    {
      name: 'Nucleo',
      text: 'Una piccola famiglia già avviata: telai con covata, api e una regina feconda, pronta a crescere. È la soluzione più semplice per chi vuole partire con un alveare popolato e una regina in deposizione.',
    },
    {
      name: 'Sciame',
      text: 'Il gruppo di api che, in piena stagione, esce dall\'alveare per formare una nuova colonia e si raccoglie in un grappolo su un ramo. Uno sciame non ha covata già pronta: è una famiglia in formazione. È il termine che si usa anche online per cercare api da acquistare, ma tecnicamente non è la stessa cosa di un nucleo.',
    },
    {
      name: 'Pacco d\'api',
      text: 'Solo api, senza telai: si trasferiscono in un\'arnia e si avviano da zero, con una regina nuova. Richiede più esperienza di un nucleo.',
    },
  ],

  // Titoli e testi dei punti di forza. In pagina i **titoli** sono le chips del
  // blocco prodotto (come le `characteristics` dei mieli); i testi restano qui
  // pronti all'uso, perché lo stesso contenuto è già spiegato nelle sezioni
  // "Cosa comprende un nostro nucleo", "Disponibilità" e "Trasporto".
  cards: [
    {
      title: 'Regina feconda inclusa',
      text: 'I nostri nuclei partono con una regina feconda F1 della nostra linea Buckfast: la famiglia è già in grado di crescere da sola.',
    },
    {
      title: 'Telai con covata novel',
      text: 'Consegniamo telai con covata in tutti gli stadi e api di tutte le età, in modo che la famiglia abbia subito le api che allevano la nuova covata.',
    },
    {
      title: 'Disponibilità stagionale',
      text: 'I nuclei si preparano nei mesi utili all\'avvio degli alveari: in genere sono pronti dai primi di aprile in poi, secondo l\'andamento della stagione. Chiedici cosa è disponibile adesso.',
    },
    {
      title: 'Ti diciamo come trasportarli',
      text: "Ti spieghiamo come trasportare il nucleo in sicurezza e come inserirlo nell'arnia: è il passaggio più delicato di tutta l'operazione.",
    },
  ],

  specs: [
    { label: 'Composizione', value: null }, // da completare: es. '5 telai: 3 di covata + 2 di scorte'
    { label: 'Regina', value: 'Feconda, F1 della nostra linea Buckfast' },
    {
      label: 'Razza',
      value: 'Buckfast: la regina è una F1 da una madre F0 selezionata con inseminazione strumentale',
    },
    {
      label: 'Provenienza',
      value:
        "Allevamento di Bio & Golosità — Cassano d'Adda (MI), apiari tra Martesana e Gera d'Adda",
    },
    { label: 'Disponibilità', value: 'dai primi di aprile in poi' },
    { label: 'Prenotazione', value: null }, // da completare
    { label: 'Prezzo', value: null }, // da completare
    {
      label: 'Ritiro',
      value:
        "In sede a Cassano d'Adda (Via Salvo D'Acquisto 9) su appuntamento; per la consegna parliamone: dipende dalla zona e dal periodo",
    },
  ],

  faq: [
    {
      q: 'Sono nuclei o sciami? Che differenza c\'è?',
      a: "Quello che vendiamo sono nuclei: famiglie avviate su telai, con covata in tutti gli stadi e una regina feconda. Lo sciame è il grappolo di api che si forma quando una famiglia si divide in natura, e non ha covata pronta: è il termine più usato nelle ricerche, ma il prodotto giusto per partire è il nucleo.",
    },
    {
      q: 'Quando sono disponibili i nuclei?',
      a: 'Si preparano nei mesi in cui le famiglie si sviluppano: in genere sono pronti dai primi di aprile in poi, poi dipende dall\'andamento della stagione. Chiamaci e ti diciamo a che punto siamo e quando possiamo consegnare.',
    },
    {
      q: 'Come si prenota un nucleo?',
      a: 'Chiama o scrivi su WhatsApp: ci dici quanti nuclei ti servono, in che periodo e dove, e ti confermiamo disponibilità e prezzo. Su richiesta ti avvisiamo quando è pronto.',
    },
    {
      q: 'Come trasporto un nucleo?',
      a: 'Viaggia chiuso, con la porticina bloccata, e va aperto solo nella posizione definitiva: tragitto breve, all\'ombra, senza sballottamenti. Quando lo ritiri ti spieghiamo come fare.',
    },
  ],

  gallery: [
    {
      base: 'arnie',
      alt: 'Le nostre arnie in apiario',
      cls: 'g-item--tall',
      caption: 'Le arnie in cui prepariamo i nuclei, in primavera',
    },
    {
      base: 'sciame_1',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, Cassano d'Adda",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_2',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, Cassano d'Adda",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_3',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, Cassano d'Adda",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_4',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, Cassano d'Adda",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_5',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, Cassano d'Adda",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_6',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, Cassano d'Adda",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_7',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, Cassano d'Adda",
      cls: 'g-item--tall',
    },
    {
      base: 'api_che_producono',
      alt: 'Api sui telai di un favo',
      cls: 'g-item--square',
      caption: 'Api sui telai: da una famiglia così parte un nucleo',
    },
  ],
};
