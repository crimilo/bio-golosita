/**
 * Dati di vendita dei prodotti dell'allevamento: api regine, nuclei.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠️  DA COMPLETARE A MANO (Raffaele): sono le uniche informazioni che il sito
 *     non può inventare. Finché restano `null` le pagine restano pubblicabili
 *     e corrette, perché al loro posto compare una frase neutra che invita a
 *     chiedere. Appena le hai, sostituisci il `null` e la pagina si aggiorna
 *     da sola (testo + eventuale prezzo).
 *
 *   nuclei.telai
 *
 *   Le disponibilità sono scritte: api regine da fine maggio e nuclei dai primi
 *   di aprile — nel dato "Disponibilità" / "Preparazione" di `origine.items`,
 *   che è l'unico posto dove la pagina le legge.
 * ────────────────────────────────────────────────────────────────────────────
 */

/**
 * Foto delle card che rimandano ai quattro reparti (home e pagine interne).
 * Una sola fonte: così immagine e didascalia non divergono fra le pagine e
 * nessuna card resta senza foto.
 */
export const repartoImages = {
  miele: { img: 'hero_bg', alt: 'Barattoli di miele di Bio & Golosità' },
  apiRegine: { img: 'ape_regina_di_raffaele', alt: 'Ape regina nel nostro apiario' },
  nuclei: { img: 'arnia_piena_di_api', alt: 'Arnia piena di api sui telai' },
  // La stessa foto della hero di /consegna-miele/ e della galleria della home:
  // Raffaele con i barattoli pronti da spedire. La sorgente è verticale
  // (1094×1479); nella card 4:3 `object-fit: cover` ne ritaglia la fascia
  // centrale, alta il 55% (y 22-78%): si vedono Raffaele e i barattoli, mentre
  // restano fuori la vegetazione più in alto e il fondo scuro.
  consegna: {
    img: 'raffaele_con_mieli_pronti_da_spedire',
    alt: 'Raffaele Antoci con i barattoli di miele pronti da spedire',
  },
};

export const prezzoSuRichiesta = 'Prezzo su richiesta';

export const prezzoNota =
  'Il prezzo dipende dal formato e dal periodo: chiedilo al telefono o su WhatsApp e te lo diamo subito.';

export const apiRegine = {
  path: '/api-regine/',
  name: 'Api regine',
  h1: 'Api regine in vendita in Lombardia',
  title: 'Vendita Api Regine in Lombardia | Bio & Golosità',
  description:
    'Api regine da apicoltore in Lombardia: regine feconde già in deposizione, figlie F1 di una madre Buckfast F0. Prenotazione e ritiro a Cassano d\'Adda.',
  prezzo: '€ 20,00 / regina',

  /**
   * Messaggio precompilato del link WhatsApp (e del bottone in fondo alla
   * pagina): chi scrive dalle regine non deve aprire la chat con una domanda sul
   * miele. Il numero resta quello di `site.whatsapp`.
   */
  whatsappText: 'Ciao, vorrei informazioni sulla disponibilità delle api regine',

  /** Sottotitolo della hero: due righe, come nelle schede miele. */
  heroIntro:
    "Regine feconde della nostra linea Buckfast, allevate negli apiari del Parco Adda Nord e dell'Alta Val Brembana. Produzione limitata, circa 200–300 all'anno.",

  /**
   * Caratteristiche del blocco prodotto (le stesse chips dei mieli): cosa si
   * compra e come funziona l'ordine, in quattro righe.
   */
  chips: [
    'Regine feconde, già in deposizione',
    'F1 da madri F0 selezionate',
    'Produzione limitata: 200–300 all\'anno',
    'Abituate al clima e alle fioriture di qui',
  ],

  /**
   * Riga piccola del blocco prodotto, sotto il ritiro/consegna (nei mieli è
   * `site.bulkNote`): qui è la scelta aziendale su come le regine escono —
   * gabbietta solo dopo l'ordine, ritiro 48 ore dopo, spedizione il giorno
   * dopo la conferma.
   */
  note: "Le regine le mettiamo in gabbietta solo dopo l'ordine: il ritiro in sede è 48 ore dopo, le spedizioni partono il giorno dopo la conferma.",

  /**
   * Sezione "Come alleviamo le nostre regine": stessa resa dei quattro dati di
   * "Da dove arriva" nei mieli (occhiello + titolo + paragrafi + quattro card
   * con icona + foto). `notes` sono i paragrafi, nell'ordine.
   */
  origine: {
    eyebrow: 'dal nostro allevamento',
    title: 'Come alleviamo le nostre regine',
    notes: [
      "Lavoriamo una sola linea, la <strong>Buckfast</strong>. Le nostre madri sono <strong>F0 selezionate, inseminate artificialmente e con pedigree</strong>, provenienti da un allevamento che porta avanti la selezione da oltre 120 anni. Da loro nascono le <strong>F1</strong> che vendiamo.",
      "Preleviamo le <strong>celle al 10°–11° giorno dal traslarvo</strong> e le inseriamo nei nostri apiari di fecondazione, dove utilizziamo <strong>apidee costruite da noi</strong> e più grandi dei classici modelli 10×10.",
      "Prima della vendita aspettiamo che ogni regina abbia completato almeno un ciclo di covata, meglio due, e verificato che la deposizione sia regolare. Sugli altri caratteri preferiamo essere prudenti: poche settimane non bastano per valutarli con certezza.",
    ],
    items: [
      { icon: 'pin', label: 'Origine', value: 'Lombardia, Italia' },
      { icon: 'sparkle', label: 'Selezione', value: 'F1 da madri F0 inseminate artificialmente' },
      { icon: 'home', label: 'Allevamento', value: 'Celle prelevate al 10°–11° giorno dal traslarvo' },
      { icon: 'clock', label: 'Disponibilità', value: 'Da fine maggio in poi' },
    ],
    photo: {
      base: 'api',
      alt: "Le api di Bio & Golosità in apiario, nel Parco Adda Nord e in Alta Val Brembana",
      caption: "Le nostre api",
    },
  },

  /**
   * SEGNAPOSTO — da sostituire con recensioni reali (vedi README, "Recensioni
   * dei prodotti"): nomi e testi qui sotto sono inventati e finiscono anche nei
   * dati strutturati (`Review` + `aggregateRating`).
   */
  rating: { value: 5, count: 3 },
  productReviews: [
    {
      name: 'Enrico Bassi',
      stars: 5,
      text: 'Regine arrivate in ottime condizioni. Le ho inserite in due famiglie orfane e dopo circa una settimana erano già entrambe in deposizione. Per ora tutto molto bene.',
    },
    {
      name: 'Lorenzo Ghidini',
      stars: 5,
      text: 'Si vede che sono allevate bene: regine belle, robuste e con una deposizione molto regolare. Era il mio secondo ordine e anche questa volta mi sono trovato molto bene.',
    },
    {
      name: 'Chiara Vismara',
      stars: 5,
      text: 'Sono una neofita e Raffaele mi ha spiegato tutto al telefono prima di ordinare. Le regine sono arrivate nei tempi promessi. Esperienza molto positiva.',
    },
  ],

  // Tipologie di regina. In pagina non c'è più la sezione "tipologie": da quando
  // vendiamo solo regine feconde una sola card ripeteva quello che il testo e la
  // scheda tecnica dicono già. Resta qui come contenuto pronto all'uso.
  tipi: [
    {
      name: 'Regine feconde',
      text: 'Regine già in deposizione, nate e fecondate nel nostro apiario: si introducono in un alveare orfano o in un nucleo e la famiglia riparte senza attese, senza aspettare i tempi della fecondazione.',
    },
  ],

  faq: [
    {
      q: 'Come prenoto le api regine?',
      a: "Chiamaci o scrivici su WhatsApp indicando quante regine ti servono, in che periodo e se preferisci ritiro o consegna. Ti confermiamo subito la disponibilità della stagione e fissiamo insieme i dettagli.",
    },
    {
      q: 'Le regine che vendete sono già feconde?',
      a: "Sì: forniamo solo regine feconde, già fecondate nei nostri apiari e in deposizione. Si introducono in un alveare orfano o in un nucleo e la famiglia riparte subito, senza attese.",
    },
    {
      q: 'Come si introducono le nuove regine?',
      a: "Con calma, rispettando i tempi della famiglia e usando le gabbiette di introduzione. Dopo l'inserimento lascia l'alveare chiuso per almeno 5 giorni: aprirlo prima è il modo più semplice per far uccidere la regina, soprattutto se è la prima volta che ne introduci una. Quando ti consegniamo le regine ti spieghiamo il metodo che usiamo noi.",
    },
    {
      q: 'Quando è il momento giusto per cambiare regina?',
      a: "Di norma tra la primavera e l'inizio dell'estate, quando le famiglie si sviluppano e c'è nettare in campo: è il periodo in cui l'accettazione riesce meglio. Se hai un dubbio sul tuo caso, scrivici prima di ordinare: preferiamo dirti se è il momento sbagliato.",
    },
    {
      q: 'Quali documenti accompagnano le regine?',
      a: "Ogni partita di regine ha la sua storia sanitaria: chiedici quali documenti la accompagnano. Ti diamo tutte le informazioni che servono prima dell'acquisto.",
    },
  ],

  // Foto della galleria delle regine: **non si vedono in pagina** (la scheda
  // mostra solo i tre video: regina F1 sulle covate, nascita e marcatura) e non
  // finiscono nei dati strutturati. Restano qui pronte all'uso, basta
  // renderizzarle con `PhotoGallery`.
  gallery: [
    {
      base: 'arnia_piena_di_api',
      alt: 'Arnia piena di api sui telai',
      cls: 'g-item--square',
      caption: 'Una famiglia numerosa sui telai: è il lavoro di una regina in salute',
    },
    {
      base: 'sciame_5',
      alt: "Api di Bio & Golosità in apiario, nel Parco Adda Nord e in Alta Val Brembana",
      cls: 'g-item--tall',
      caption: "Le nostre api",
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
    "Nuclei d'api da apicoltore in Lombardia: cosa comprende un nucleo, sciame, nucleo e pacco d'api, disponibilità e prenotazione, ritiro a Cassano d'Adda.",
  telai: null, // da completare: es. '5 telai (3 di covata + 2 di scorte)'
  razza: 'Buckfast (F1 da madre F0)', // la regina del nucleo è una figlia della nostra madre F0
  prezzo: '€ 99,00 / nucleo',

  /** Messaggio precompilato del link WhatsApp: vedi `apiRegine.whatsappText`. */
  whatsappText: "Ciao, vorrei informazioni sulla disponibilità dei nuclei d'api",

  /** Sottotitolo della hero: due righe, come nelle schede miele. */
  heroIntro:
    "Nuclei d'api della nostra produzione: famiglie già avviate su telai, con una regina feconda già in deposizione. Li prepariamo nei nostri apiari nel Parco Adda Nord e in Alta Val Brembana.",

  /**
   * Caratteristiche del blocco prodotto (le stesse chips dei mieli): cosa
   * comprende il nucleo, dove cresce e cosa ci occupiamo noi.
   */
  chips: [
    'Regina feconda, già in deposizione',
    'Telai con covata in tutti gli stadi',
    'Abituati al clima e alle fioriture di qui',
    'Famiglia avviata: non si parte da zero',
  ],

  /**
   * Riga piccola del blocco prodotto, sotto il ritiro/consegna (nei mieli è
   * `site.bulkNote`): qui è la promessa di servizio — trasporto e inserimento
   * sono il passaggio in cui un principiante si perde.
   */
  note: "Ti spieghiamo come trasportare il nucleo e come inserirlo nell'arnia: è il passaggio più delicato di tutta l'operazione. Il nucleo viaggia nel nostro porta sciami, che chiediamo di restituire: se non torna indietro, il costo del nucleo diventa € 110.",

  /**
   * Sezione "Da dove arriva questo nucleo": stessa resa dei quattro dati dei
   * mieli (occhiello + titolo + paragrafo + quattro card con icona + foto).
   */
  origine: {
    eyebrow: 'dai nostri apiari',
    title: 'Da dove arriva questo nucleo',
    notes: [
      "Ogni nucleo nasce da telai di una famiglia nostra: <strong>telai con covata in tutti gli stadi, telai con scorte</strong> e api di tutte le età, così la famiglia non resta senza riserve e ha subito le api che allevano la nuova covata. È una famiglia abituata al clima e alle fioriture di qui, quindi resta una famiglia della zona.",
    ],
    items: [
      { icon: 'star', label: 'Regina', value: null }, // risolto in fondo al file con `razza`
      { icon: 'package', label: 'Composizione', value: null }, // risolto con `telai`
      {
        icon: 'pin',
        label: 'Provenienza',
        value: 'Apiari nel Parco Adda Nord e in Alta Val Brembana',
      },
      { icon: 'clock', label: 'Preparazione', value: 'Dai primi di aprile in poi, secondo la stagione' },
    ],
    photo: {
      base: 'sciame_5',
      alt: "Api di Bio & Golosità in apiario, nel Parco Adda Nord e in Alta Val Brembana",
      caption: "Le nostre api",
    },
  },

  /**
   * SEGNAPOSTO — da sostituire con recensioni reali (vedi README, "Recensioni
   * dei prodotti"): nomi e testi qui sotto sono inventati e finiscono anche nei
   * dati strutturati (`Review` + `aggregateRating`).
   */
  rating: { value: 5, count: 2 },
  productReviews: [
    {
      name: 'Alberto Sormani',
      stars: 5,
      text: 'Nucleo arrivato bello popolato, con la regina già in deposizione. Dopo pochi giorni le api stavano già lavorando bene anche sui telai nuovi.',
    },
    {
      name: 'Marta Cereda',
      stars: 5,
      text: 'Covata presente in diversi stadi e tutto come descritto. Molto utili anche le spiegazioni di Raffaele su trasporto e inserimento del nucleo nell\'arnia.',
    },
  ],

  // Non più mostrato in pagina: la stessa distinzione è nella FAQ di
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
    {
      q: 'Il porta sciami è compreso nel prezzo?',
      a: 'Sì: il nucleo viaggia nel nostro porta sciami, che ti chiediamo di restituire. Il prezzo di € 99,00 vale a contenitore restituito: se il porta sciami non torna indietro, il costo del nucleo diventa € 110.',
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
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, nel Parco Adda Nord e in Alta Val Brembana",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_2',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, nel Parco Adda Nord e in Alta Val Brembana",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_3',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, nel Parco Adda Nord e in Alta Val Brembana",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_4',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, nel Parco Adda Nord e in Alta Val Brembana",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_5',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, nel Parco Adda Nord e in Alta Val Brembana",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_6',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, nel Parco Adda Nord e in Alta Val Brembana",
      cls: 'g-item--tall',
    },
    {
      base: 'sciame_7',
      alt: "Nucleo d'api di Bio & Golosità: foto dall'apiario, nel Parco Adda Nord e in Alta Val Brembana",
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

/**
 * I due dati della sezione origine che vengono da campi a sé: se `telai` è
 * compilato vince quello (è più preciso), altrimenti resta la descrizione
 * generica. Si risolvono per etichetta, non per posizione.
 */
const origineValue = (label, value) => {
  nuclei.origine.items.find((i) => i.label === label).value = value;
};
origineValue('Regina', `Feconda, ${nuclei.razza}`);
origineValue(
  'Composizione',
  nuclei.telai ?? 'Telai con covata in tutti gli stadi, telai con scorte e api di tutte le età'
);
