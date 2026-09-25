/**
 * Guide informative (cluster tematico): ogni guida spinge una pagina
 * commerciale del sito e ne è linkata. Contenuti senza claim sanitari:
 * si parla di origine, lavorazione, gusto, conservazione e uso.
 */
import type { Block } from '../lib/types';

export const PUBLISH_DATE = '2026-09-11';

export interface Guide {
  slug: string;
  title: string;
  description: string;
  h1: string;
  excerpt: string;
  readingTime: string;
  hero: { base: string; alt: string };
  /** pagina commerciale spinta dalla guida */
  push: { href: string; label: string; note: string };
  datePublished: string;
  dateModified?: string;
  blocks: Block[];
}

const base: Omit<Guide, 'datePublished'>[] = [
  {
    slug: 'miele-non-pastorizzato-cosa-significa',
    title: "Miele Non Pastorizzato: Cosa Significa Davvero | Bio & Golosità",
    description:
      'Che cos\'è la pastorizzazione del miele, cosa cambia per gusto e aroma, come riconoscere un miele non pastorizzato e come conservarlo a casa.',
    h1: 'Miele non pastorizzato: cosa significa davvero',
    excerpt:
      'Molte etichette lo scrivono, poche lo spiegano. Ecco cosa succede al miele quando viene scaldato e perché noi scegliamo di non farlo.',
    readingTime: '5 min',
    hero: {
      base: 'miele_versare',
      alt: 'Miele versato da un cucchiaio di legno dentro un barattolo',
    },
    push: {
      href: '/miele/',
      label: 'Scopri i nostri mieli non pastorizzati',
      note: 'Tutti i mieli Bio & Golosità sono smielati a freddo e non pastorizzati: li trovi nella pagina dei mieli, con prezzi e formati.',
    },
    blocks: [
      {
        p: 'Cercando "miele non pastorizzato" si trovano decine di siti che usano questa espressione come una promessa. In pochi spiegano cosa voglia dire esattamente. Eppure è una delle informazioni più utili per capire che cosa hai nel barattolo: riguarda la lavorazione, il profumo e la capacità del miele di cristallizzare. Vale la pena capirla bene, anche per non farsi ingannare.',
      },
      { h2: 'Che cos\'è la pastorizzazione del miele' },
      {
        p: 'La pastorizzazione è un trattamento termico: il miele viene scaldato a temperature elevate — normalmente tra i 70 e gli 80 °C, a volte di più — per alcuni minuti o più a lungo. Serve a due cose pratiche per chi vende su larga scala: <strong>ritardare la cristallizzazione</strong>, così il prodotto resta limpido e fluido sugli scaffali, e <strong>ridurre i lieviti</strong> che, in mieli con troppa umidità, possono far fermentare il prodotto. È una scelta industriale, non un errore: risolve problemi di logistica e di distribuzione.',
      },
      {
        p: 'Il prezzo di quel trattamento è però quello che si perde per strada. Il miele è un prodotto complesso: contiene enzimi (come l\'invertasi e la diastasi), tracce di polline, sostanze aromatiche volatili. Sono proprio le componenti più delicate a risentire del calore. Il risultato è un miele più stabile e più uniforme, ma con un profilo aromatico più piatto e la tendenza a rimanere liquido anche quando, in natura, non lo sarebbe.',
      },
      { h2: 'Cosa vuol dire "non pastorizzato"' },
      {
        p: 'Un miele non pastorizzato non subisce quel trattamento: viene estratto dai telai, lasciato decantare, eventualmente filtrato in modo leggero e invasettato. Le temperature che incontra restano basse, vicine a quelle dell\'alveare (intorno ai 35 °C): il miele esce dall\'arnia caldo quanto basta per scorrere, non di più. È la lavorazione tradizionale, quella che si fa nei piccoli laboratori artigianali.',
      },
      {
        img: {
          base: 'honey_favo',
          alt: 'Favo con celle esagonali piene di miele, in macro',
          caption: 'Il miele nasce nelle celle del favo: da lì viene estratto a freddo',
        },
      },
      { h2: 'Non pastorizzato non significa grezzo o improvvisato' },
      {
        p: 'C\'è un equivoco da chiarire: non pastorizzato non vuol dire "miele sporco" o "fatto in casa senza controlli". Un miele non pastorizzato è un miele <strong>lavorato con più attenzione, non con meno igiene</strong>. La smielatura avviene in un locale dedicato, con attrezzature pulite; il miele decanta e viene invasettato senza essere scaldato. È esattamente il motivo per cui un produttore che non pastorizza tende a lavorare a piccoli lotti e a vendere in zona: un miele non pastorizzato racconta la sua stagione, e non punta a restare identico a se stesso per anni su uno scaffale.',
      },
      { h2: 'Come riconoscere un miele non pastorizzato' },
      {
        ul: [
          '<strong>La cristallizzazione arriva, prima o poi.</strong> Un miele che non cristallizza mai, dopo mesi e mesi, è sospetto — a meno che non sia un miele naturalmente ricchissimo di fruttosio, come l\'acacia.',
          '<strong>Il profumo è netto e riconoscibile.</strong> I mieli scaldati tendono ad avere un aroma più uniforme e dolce, meno legato alla fioritura.',
          '<strong>L\'etichetta dice da dove viene e chi lo produce.</strong> Il nome del produttore, la località e la fioritura sono le informazioni che rendono verificabile la filiera.',
          '<strong>L\'assaggio cambia con l\'annata.</strong> Un miele artigianale non è identico ogni anno: se il gusto è sempre perfettamente uguale, probabilmente è stato standardizzato.',
        ],
      },
      {
        note: 'Attenzione: la cristallizzazione è un indizio, non una prova. È un processo naturale che riguarda anche mieli pastorizzati se hanno abbastanza glucosio. L\'unico modo per sapere come è stato lavorato un miele è chiederlo a chi lo produce.',
      },
      { h2: 'Come si conserva un miele non pastorizzato' },
      {
        p: 'Il miele va tenuto in un barattolo ben chiuso, al buio e sotto i 14 °C: una cantina o un locale fresco. Il frigorifero non serve. Il cucchiaio va usato asciutto, perché l\'acqua è l\'unica cosa che può davvero rovinare il miele. Se cristallizza, non è un difetto: si riporta liquido con delicatezza, scaldando il barattolo a bagnomaria a bassa temperatura.',
      },
      {
        p: 'Se vuoi approfondire questo aspetto, abbiamo scritto una guida dedicata a <a href="/guide/perche-il-miele-cristallizza/">perché il miele cristallizza e come riportarlo liquido</a>.',
      },
      { h2: 'Perché noi non pastorizziamo' },
      {
        p: 'Perché il nostro miele è di api nostre, raccolto nei nostri apiari nel Parco Adda Nord e in Alta Val Brembana, e venduto direttamente: non deve attraversare mesi di magazzino e non deve restare identico per anni. Lo smieliamo a freddo e lo invasettiamo a piccoli lotti, così ogni barattolo conserva il profumo della sua fioritura. Se vuoi sapere cosa vuol dire concretamente, nella pagina <a href="/chi-siamo/">chi siamo</a> raccontiamo come lavoriamo.',
      },
      {
        cta: { href: '/miele/', label: 'Vedi i nostri mieli non pastorizzati' },
      },
    ],
  },

  {
    slug: 'perche-il-miele-cristallizza',
    title: 'Miele Cristallizzato: Perché Succede e Cosa Fare | Bio & Golosità',
    description:
      'La cristallizzazione del miele è naturale. Perché succede, quali mieli cristallizzano prima e come riportare il miele liquido senza rovinarlo.',
    h1: 'Perché il miele cristallizza (e come riportarlo liquido)',
    excerpt:
      'Il miele che diventa solido o granuloso non è andato a male: è la prova che è miele vero. Come comportarsi, e cosa non fare mai.',
    readingTime: '4 min',
    hero: {
      base: 'miele_cristallizzato',
      alt: 'Barattolo di miele con un mestolo di legno, visto dall\'alto',
    },
    push: {
      href: '/miele/',
      label: 'Scopri i mieli di Bio & Golosità',
      note: 'Alcuni dei nostri mieli cristallizzano in pochi mesi, altri restano liquidi a lungo: dipende dalla fioritura. Nella pagina dei mieli trovi le caratteristiche di ognuno.',
    },
    blocks: [
      {
        p: 'Apri il barattolo e il miele non scorre più: è diventato denso, granuloso, quasi solido. È il momento in cui molte persone pensano di aver comprato un miele scadente. Succede esattamente il contrario: la cristallizzazione è un processo naturale del miele puro, ed è una delle prove più semplici che hai in mano un miele vero.',
      },
      { h2: 'Che cos\'è la cristallizzazione' },
      {
        p: 'Il miele è una soluzione sovrasatura di zuccheri: contiene più zuccheri di quanti l\'acqua riesca a tenerne disciolti stabilmente. Con il tempo — e con le condizioni giuste — il <strong>glucosio</strong> inizia a separarsi dall\'acqua e a formare cristalli. Il fruttosio, che è più solubile, resta liquido. Per questo la velocità con cui un miele cristallizza dipende dal rapporto tra glucosio e fruttosio della sua fioritura, e non dalla sua qualità.',
      },
      {
        ul: [
          '<strong>Cristallizza prima</strong> il miele con molto glucosio: millefiori, colza, tarassaco, girasole, tiglio in certe annate. Diventa granuloso in poche settimane o mesi.',
          '<strong>Cristallizza lentamente o quasi mai</strong> il miele con molto fruttosio: acacia, castagno, tiglio in alcune annate. Può restare liquido per molti mesi o più di un anno.',
          '<strong>La cristallizzazione "fine"</strong> (cremosa, senza granelli percepibili) e quella <strong>grossolana</strong> sono due aspetti dello stesso fenomeno, legati a come i cristalli si aggregano.',
        ],
      },
      {
        img: {
          base: 'honey_favo_aperto',
          alt: 'Macro di un favo con la struttura esagonale delle celle',
          caption: 'Gli zuccheri del miele sono gli stessi del nettare: cambia solo il modo in cui si separano',
        },
      },
      { h2: 'Dove conservarlo: cosa cambia con la temperatura' },
      {
        p: 'La temperatura conta, e il miele sta meglio al fresco: la cristallizzazione è più rapida tra i 5 e i 14 °C, mentre sopra i 25 °C rallenta. Conservarlo al buio e sotto i 14 °C — in cantina o in un locale non riscaldato — è quello che gli fa bene, perché luce e calore prolungato sono ciò che gli fa perdere profumo e aromi. Se in cantina il barattolo cristallizza un po\' prima, non è un problema: qui sotto c\'è come riportarlo liquido.',
      },
      { h2: 'Come riportare liquido il miele cristallizzato' },
      {
        p: 'Basta scaldarlo con delicatezza. Il metodo sicuro è il <strong>bagnomaria a bassa temperatura</strong>: metti il barattolo aperto in una pentola con acqua tiepida (intorno ai 40 °C, cioè calda ma non bruciante al dito) e mescola ogni tanto. In mezz\'ora o poco più il miele torna fluido. Se serve, rinnova l\'acqua tiepida: non serve alzare la temperatura.',
      },
      {
        ul: [
          'Non usare il microonde: scalda in modo irregolare e può surriscaldare il miele in pochi punti.',
          'Non metterlo a bollire né a contatto diretto con la fiamma: oltre a rovinare aromi ed enzimi, il barattolo può rompersi.',
          'Non lasciarlo per ore sul termosifone o al sole: il calore prolungato è peggio di quello breve.',
          'Non agitarlo con forza per "sciogliere" i cristalli: mescola piano, senza incorporare aria.',
        ],
      },
      {
        note: 'Scaldare il miele per riportarlo liquido è una scelta del consumatore, non una pastorizzazione: avviene in casa, a temperature basse e per pochi minuti, per risolvere un problema di consistenza.',
      },
      { h2: 'Il miele cristallizzato è ottimo, non è un problema' },
      {
        p: 'Molte persone, dopo averlo assaggiato, preferiscono il miele cristallizzato: è più facile da spalmare sul pane, non cola via dalla fetta biscottata e non "annega" lo yogurt. Nelle preparazioni da forno si comporta come il miele liquido, con il vantaggio di non sbrodolare. Insomma: se il tuo barattolo cristallizza, non hai un miele da recuperare, hai un miele da usare diversamente.',
      },
      {
        p: 'Se vuoi capire perché noi non scaldiamo il miele in produzione, leggi <a href="/guide/miele-non-pastorizzato-cosa-significa/">miele non pastorizzato: cosa significa davvero</a>.',
      },
      { h2: 'Quali dei nostri mieli cristallizzano' },
      {
        p: 'Il <a href="/miele/miele-millefiori-estivo-al-tiglio-e-more/">millefiori estivo al tiglio e more</a> ha una cristallizzazione lenta e grossolana; il <a href="/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/">millefiori estivo al tiglio e ailanto</a> l\'ha lenta ma più fine; il <a href="/miele/miele-di-acacia/">miele di acacia</a> e il <a href="/miele/miele-di-castagno/">miele di castagno</a> restano liquidi molto a lungo. Nella scheda di ogni miele trovi la voce dedicata. Il <a href="/miele/miele-in-favo/">miele in favo</a>, invece, non si scalda per riportarlo liquido: il calore scioglierebbe la cera, quindi si mangia com\'è (su pane caldo si ammorbidisce da solo).',
      },
      { cta: { href: '/miele/', label: 'Confronta i nostri mieli' } },
    ],
  },

  {
    slug: 'miele-acacia-millefiori-castagno-differenze',
    title: 'Acacia, millefiori o castagno: quale scegliere? | Bio & Golosità',
    description:
      'Acacia, millefiori o castagno? Confronta gusto, colore, cristallizzazione e usi per scegliere il miele più adatto a te.',
    h1: 'Miele di acacia, millefiori o castagno: le differenze',
    excerpt:
      'Acacia se cerchi un miele delicato, millefiori se lo vuoi più versatile, castagno se preferisci un gusto intenso: le differenze per scegliere in pochi secondi.',
    readingTime: '4 min',
    hero: {
      base: 'hero_bg',
      alt: "Tre barattoli di miele di acacia, millefiori e castagno di Bio & Golosità a Cassano d'Adda",
    },
    push: {
      href: '/miele/',
      label: 'Vedi tutti i mieli con prezzi e formati',
      note: 'Acacia, i due millefiori estivi, castagno: nella pagina dei mieli trovi le schede complete con raccolto, prezzi e formati.',
    },
    /**
     * Guida-comparatore: il corpo resta corto apposta e ogni sezione chiude con
     * il rimando alla scheda del prodotto. Il centro della pagina è la tabella
     * (`table`) — a piena larghezza da desktop, a schede sotto i 640px — con una
     * foto del barattolo per ogni miele e quella di Raffaele in apiario.
     */
    blocks: [
      { h2: 'Quale miele scegliere? La risposta veloce' },
      {
        p: "<strong>Scegli l'acacia</strong> se vuoi un miele dolce, delicato e che rimane liquido molto a lungo.",
      },
      {
        p: "<strong>Scegli il millefiori</strong> se cerchi un miele versatile, legato alle fioriture e con un gusto che può cambiare da un raccolto all'altro.",
      },
      {
        p: '<strong>Scegli il castagno</strong> se ami sapori intensi, poco dolci e leggermente amarognoli, soprattutto con formaggi e piatti saporiti.',
      },
      {
        p: 'Nessuno è migliore in assoluto: dipende soprattutto dal gusto e da come vuoi usarlo.',
      },

      { h2: 'Acacia, millefiori e castagno a confronto' },
      {
        table: {
          head: ['Acacia', 'Millefiori', 'Castagno'],
          rows: [
            {
              label: 'Gusto',
              cells: [
                'Dolce, delicato, floreale',
                'Variabile, da dolce e aromatico a più corposo',
                'Intenso, legnoso, leggermente amarognolo',
              ],
            },
            {
              label: 'Colore',
              cells: [
                'Molto chiaro, giallo paglierino',
                'Varia secondo le fioriture',
                'Ambra scuro, quasi bruno',
              ],
            },
            {
              label: 'Cristallizzazione',
              cells: ['Molto lenta', 'Variabile secondo il raccolto', 'Molto lenta'],
            },
            {
              label: 'Ideale per',
              cells: [
                'Tisane, latte, yogurt, frutta',
                'Colazione, pane, yogurt, uso quotidiano',
                'Formaggi, carni, polenta, cucina',
              ],
            },
            {
              label: 'Scegilo se',
              cells: ['Vuoi un miele delicato', 'Vuoi un miele versatile', 'Vuoi un miele deciso'],
            },
          ],
        },
      },

      { h2: 'Miele di acacia: delicato e molto fluido' },
      {
        p: 'Il <strong>miele di acacia</strong> è il più delicato dei tre: chiaro, dolce, floreale e liquido molto a lungo.',
      },
      {
        p: 'È particolarmente adatto quando vuoi dolcificare senza coprire gli altri sapori:',
      },
      {
        ul: ['tisane e tè;', 'latte e caffè;', 'yogurt;', 'frutta;', 'pane e fette biscottate.'],
      },
      {
        img: {
          base: 'miele-di-acacia',
          alt: "Barattolo di miele di acacia di Bio & Golosità, dal colore chiaro",
          caption: 'Acacia: chiaro, delicato, liquido a lungo',
        },
      },
      {
        p: '→ <a href="/miele/miele-di-acacia/">Scopri il nostro miele di acacia, con prezzo e formati</a>',
      },

      { h2: 'Miele millefiori: il più legato alla stagione' },
      {
        p: "Il <strong>miele millefiori</strong> non nasce da una singola pianta: le api raccolgono il nettare delle fioriture disponibili nello stesso periodo, quindi colore, profumo e gusto cambiano da un raccolto all'altro. È questa variabilità a distinguerlo da mieli monoflora come acacia e castagno: nella nostra produzione ne distinguiamo due, entrambi raccolti a giugno.",
      },
      {
        img: {
          base: 'miele-millefiori-estivo-al-tiglio-e-more',
          alt: 'Barattolo di millefiori estivo al tiglio e more di Bio & Golosità',
          caption: 'Millefiori estivo al tiglio e more, il più scuro dei due',
        },
      },
      {
        p: '→ <a href="/miele/miele-millefiori/">Tutti i millefiori</a>: <a href="/miele/miele-millefiori-estivo-al-tiglio-e-more/">tiglio e more</a>, <a href="/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/">tiglio e ailanto</a>.',
      },

      { h2: 'Miele di castagno: scuro e intenso' },
      {
        p: 'Il <strong>miele di castagno</strong> è quello con il carattere più deciso tra i tre: colore scuro, profumo intenso e un gusto legnoso con un retrogusto leggermente amarognolo.',
      },
      { p: 'Si abbina particolarmente bene a:' },
      {
        ul: [
          'formaggi stagionati ed erborinati;',
          'carni e arrosti;',
          'polenta;',
          'noci;',
          'dolci speziati.',
        ],
      },
      {
        img: {
          base: 'miele-di-castagno',
          alt: 'Barattolo di miele di castagno di Bio & Golosità, dal colore scuro',
          caption: 'Castagno: ambra scuro, quasi bruno',
        },
      },
      {
        p: '→ <a href="/miele/miele-di-castagno/">Scopri il nostro miele di castagno, con prezzo e formati</a>',
      },

      { h2: 'Meglio miele di acacia o millefiori?' },
      {
        p: "<strong>Acacia:</strong> più delicato, chiaro e fluido, dolcifica senza coprire gli altri sapori. <strong>Millefiori:</strong> più variabile e legato alle fioriture, con più carattere. Per un gusto molto delicato scegli l'acacia, per un miele più deciso e mutevole scegli il millefiori.",
      },

      { h2: 'Meglio miele millefiori o castagno?' },
      {
        p: 'Il <strong>millefiori</strong> è più facile da usare tutti i giorni. Il <strong>castagno</strong> è molto più intenso e leggermente amarognolo: dà il meglio con formaggi e piatti decisi. Se non conosci ancora i tuoi gusti parti dal millefiori; se ami i mieli forti, prova il castagno.',
      },

      { h2: 'I nostri mieli vengono dai nostri apiari' },
      {
        p: 'I mieli Bio & Golosità sono prodotti dalle nostre api in Lombardia e lavorati direttamente da noi. Li smieliamo a freddo e non li pastorizziamo.',
      },
      {
        p: 'Acacia, millefiori e castagno non differiscono quindi per il modo in cui li lavoriamo, ma soprattutto per <strong>fioritura, territorio, periodo di raccolta e profilo aromatico</strong>.',
      },
      {
        img: {
          base: 'raffaele_sorridente_con_le_sue_api',
          alt: "Raffaele Antoci, apicoltore di Bio & Golosità, sorridente con le sue api in apiario, nel Parco Adda Nord e in Alta Val Brembana",
          caption: "Raffaele in apiario, nel Parco Adda Nord e in Alta Val Brembana",
        },
      },

      { h2: 'Ancora indeciso?' },
      {
        p: "In sintesi: parti dall'acacia se vuoi un miele delicato, da un millefiori se lo vuoi versatile e legato alla stagione, dal castagno se preferisci un gusto scuro e intenso.",
      },
      {
        p: 'Nella pagina dei mieli trovi tutti i raccolti disponibili, con prezzi e formati.',
      },
      { cta: { href: '/miele/', label: 'Vedi tutti i mieli con prezzi e formati' } },
    ],
  },

  {
    slug: 'nucleo-sciame-pacco-dapi-differenze',
    title: "Nucleo, Sciame e Pacco d'Api: le Differenze | Bio & Golosità",
    description:
      "Nucleo, sciame e pacco d'api non sono la stessa cosa: cosa contiene ognuno, quando sceglierlo e come si avvia un nuovo alveare senza errori.",
    h1: "Nucleo, sciame e pacco d'api: le differenze",
    excerpt:
      'Chi cerca "sciami d\'api in vendita" spesso ha bisogno di un nucleo. Ecco cosa cambia davvero, prima di comprare.',
    readingTime: '5 min',
    hero: {
      base: 'sciame_4',
      alt: 'Api raccolte in uno sciame',
    },
    push: {
      href: '/nuclei-api/',
      label: "Guarda i nuclei d'api in vendita",
      note: "Vendiamo nuclei della nostra produzione, con regina feconda e telai con covata: nella pagina dedicata trovi composizione, disponibilità e prenotazione.",
    },
    blocks: [
      {
        p: 'Quando si decide di partire con l\'apicoltura, la prima ricerca online è quasi sempre la stessa: "sciami d\'api in vendita". È il termine che tutti usano, ma nel mondo dell\'apicoltura non indica esattamente quello che serve per avviare una nuova famiglia. Capire la differenza tra nucleo, sciame e pacco d\'api ti evita di comprare la cosa sbagliata.',
      },
      { h2: 'Nucleo: una famiglia già avviata' },
      {
        p: 'Il nucleo è una piccola famiglia completa su telai: api di tutte le età, covata in tutti gli stadi e una <strong>regina feconda</strong> già in deposizione. Viene consegnato dentro un\'arnia o una cassetta, pronto per essere trasferito nella sua sede definitiva. È la soluzione più semplice per chi vuole partire, perché la famiglia ha già tutto quello che serve per crescere: le api nutrici accudiscono la covata, la regina continua a deporre, e nel giro di poche settimane il nucleo si sviluppa.',
      },
      {
        ul: [
          '<strong>Contiene:</strong> telai con covata, scorte, api di tutte le età, regina feconda.',
          '<strong>Serve a:</strong> avviare un nuovo alveare, ripopolare un\'arnia vuota, sostituire una famiglia persa.',
          '<strong>Difficoltà:</strong> bassa. È la scelta consigliata a chi comincia.',
        ],
      },
      {
        img: {
          base: 'api_che_producono',
          alt: 'Api sui telai di un favo',
          caption: 'Api sui telai: è il cuore di un nucleo',
        },
      },
      { h2: 'Sciame: la famiglia in viaggio' },
      {
        p: 'Lo sciame è il fenomeno naturale con cui una famiglia si divide: la vecchia regina esce dall\'alveare con una parte delle api e si raccoglie in un grappolo, per esempio su un ramo, in attesa che le api esploratrici trovino una nuova casa. Uno sciame <strong>non ha covata già pronta</strong> e non è pensato per essere venduto come prodotto: è un momento della vita delle api. Chi lo recupera lo fa per popolare un\'arnia, spesso regalandolo o scambiandolo.',
      },
      {
        p: 'Per questo, quando online si legge "sciami d\'api in vendita", quasi sempre si sta parlando in realtà di <strong>nuclei</strong>: il termine tecnico per il prodotto che si compra è quello. Se stai cercando api per partire, quello che ti serve è un nucleo.',
      },
      { h2: "Pacco d'api: solo api, per chi ha esperienza" },
      {
        p: "Il pacco d'api è una scatola con api e una regina nuova, <strong>senza telai</strong>. Si trasferiscono in un'arnia con fogli cerei o telai da costruire e la famiglia parte da zero: le api devono costruire il favo, la regina iniziare a deporre e la colonia organizzarsi. Costa meno di un nucleo, ma richiede più esperienza e più attenzione nei primi giorni.",
      },
      { h2: 'Come scegliere in pratica' },
      {
        ul: [
          'Se è la tua <strong>prima famiglia</strong>: nucleo. Hai covata e regina già attive e un margine di errore più ampio.',
          'Se hai <strong>esperienza</strong> e vuoi risparmiare: pacco d\'api, sapendo che dovrai seguirlo da vicino.',
          'Se hai <strong>recuperato uno sciame</strong>: bene, ma prepara l\'arnia, metti un telaino con covata fresca se puoi e non disturbare la famiglia per qualche giorno.',
          'Se ti serve <strong>solo rinnovare la regina</strong> di una famiglia che hai già: non ti serve un nucleo, ti serve una <a href="/api-regine/">regina feconda</a>.',
        ],
      },
      { h2: 'Il trasporto è il passaggio delicato' },
      {
        p: 'Un nucleo viaggia chiuso, con la porticina bloccata, e va aperto solo dopo essere stato collocato nella posizione definitiva. Il tragitto deve essere il più breve possibile, con l\'arnia all\'ombra e ben ferma: gli urti e il caldo sono i due nemici principali. All\'arrivo, sistema il nucleo nella posizione finale e apri la porticina in serata: meno confusione c\'è, meglio è.',
      },
      {
        note: 'Un\'indicazione che vale sempre: non spostare un alveare a distanza di pochi metri per volta. Le api tornano nel punto in cui ricordano di abitare. Se devi movimentare un nucleo appena consegnato, fallo con criterio: quando lo ritiri, ti spieghiamo come.',
      },
      { h2: 'Cosa facciamo noi' },
      {
        p: 'Prepariamo nuclei con regina feconda della nostra linea Buckfast, nei nostri apiari nel Parco Adda Nord e in Alta Val Brembana. La disponibilità dipende dalla stagione: se ti serve un nucleo, scrivici e ti diciamo a che punto siamo, quando possiamo consegnare e come organizzare il ritiro.',
      },
      { cta: { href: '/nuclei-api/', label: "Guarda i nuclei d'api in vendita" } },
    ],
  },

  {
    slug: 'come-introdurre-una-nuova-ape-regina',
    title: 'Come Introdurre una Nuova Ape Regina | Bio & Golosità',
    description:
      "Quando e come si introduce una nuova ape regina in un alveare: metodi, tempi, errori da evitare e i controlli da fare dopo l'introduzione.",
    h1: 'Come introdurre una nuova ape regina',
    excerpt:
      'Sostituire la regina è una delle operazioni più delicate dell\'apicoltura. I tempi contano più del metodo.',
    readingTime: '6 min',
    hero: {
      base: 'ape_regina_di_raffaele',
      alt: "L'ape regina dell'apiario di Raffaele Antoci, apicoltore di Bio & Golosità, nel Parco Adda Nord e in Alta Val Brembana",
    },
    push: {
      href: '/api-regine/',
      label: 'Vedi le api regine disponibili',
      note: 'Alleviamo regine feconde della nostra linea Buckfast, negli apiari del Parco Adda Nord e dell\'Alta Val Brembana: nella pagina dedicata trovi disponibilità, come prenotare e come ritirare.',
    },
    blocks: [
      {
        p: 'L\'introduzione di una nuova regina è il momento in cui una famiglia decide se accettarla o rifiutarla. È un passaggio che si può gestire bene, ma richiede due cose: il momento giusto e un po\' di pazienza. Qui trovi le indicazioni generali, più un elenco degli errori che si vedono più spesso.',
      },
      { h2: 'Quando ha senso cambiare la regina' },
      {
        ul: [
          '<strong>Età avanzata:</strong> dopo due o tre stagioni la deposizione cala e la famiglia tende a sostituirla da sola (sciamatura o sostituzione silenziosa).',
          '<strong>Famiglia orfana:</strong> se la regina è morta, la colonia resta senza uova fresche e rischia di produrre regine di emergenza con api più vecchie.',
          '<strong>Famiglia aggressiva o poco produttiva:</strong> se il comportamento della colonia peggiora, rinnovare la regina è spesso il primo rimedio.',
          '<strong>Selezione programmata:</strong> chi alleva sostituisce le regine a intervalli regolari, per non perdere produzione.',
        ],
      },
      { h2: 'Scegliere il momento: la parte più importante' },
      {
        p: 'La regola d\'oro è introdurre una regina <strong>quando c\'è abbondanza di nettare</strong> e non in piena estate sotto siccità, né in autunno avanzato: con un flusso nettarifero attivo le api sono occupate, accolgono meglio e c\'è meno pressione sulla nuova regina. Si lavora nelle ore più fresche, meglio nel tardo pomeriggio o alla sera, quando le api di ritorno si diradano e la maggior parte delle bottinatrici è in alveare.',
      },
      {
        img: {
          base: 'sciame_5',
          alt: "Api di Bio & Golosità in apiario, nel Parco Adda Nord e in Alta Val Brembana",
          caption: "Le nostre api",
        },
      },
      { h2: 'Prima di introdurre: tre controlli' },
      {
        ul: [
          '<strong>La vecchia regina.</strong> Se c\'è ancora, va rimossa: due regine in una famiglia non convivono.',
          '<strong>Le celle reali.</strong> Vanno eliminate con attenzione: se la famiglia ha già in corso una sostituzione, rifiuterà la regina nuova e continuerà con la sua.',
          '<strong>Le scorte.</strong> Una famiglia senza miele e senza polline non ha interesse ad accogliere nessuno.',
        ],
      },
      { h2: 'Il metodo: la gabbietta di introduzione' },
      {
        p: 'Il metodo più usato e più affidabile è la <strong>gabbietta di introduzione</strong> da mettere tra due telai con covata, in modo che la regina sia circondata dalle api nutrici. La gabbietta protegge la regina e, allo stesso tempo, ne permette l\'accettazione progressiva.',
      },
      {
        ul: [
          'Metti la regina nella gabbietta con la parte chiusa verso la covata e libera la parte con il candito o il tappo zuccherato.',
          'Lascia che siano le api a liberarla, consumando in qualche giorno il candito: è il segnale che l\'hanno accettata.',
          'Non aprire l\'alveare per almeno 5 giorni dopo l\'inserimento: ogni apertura aumenta la confusione della famiglia e, se la regina non è ancora accettata, il rischio è che la uccidano. Vale soprattutto quando si introduce una regina per la prima volta.',
        ],
      },
      { h2: 'I controlli dopo l\'introduzione' },
      {
        p: 'Dopo almeno 5 giorni dall\'inserimento, un controllo veloce: la regina deve essere viva, in movimento e in mezzo alla covata. Il segno definitivo è la presenza di <strong>uova fresche</strong>, nei giorni successivi: se la regina depone, il lavoro è fatto. Se invece trovi celle reali di emergenza, la famiglia sta cercando la sua strada e potresti dover introdurre una nuova regina.',
      },
      {
        note: 'Questi sono i passaggi generali. La scelta della gabbietta, i tempi rispetto alla stagione e alla forza della famiglia cambiano da apiario ad apiario: quando ti consegniamo una regina ti diciamo volentieri come la introduciamo noi.',
      },
      { h2: 'Gli errori che si vedono più spesso' },
      {
        ul: [
          'Dimenticare di cercare le celle reali e la vecchia regina prima di introdurre.',
          'Introdurre in una giornata fredda, ventosa o senza nettare in campo.',
          'Liberare la regina troppo presto, "a mano", senza gabbietta.',
          'Aprire l\'alveare nei primi 5 giorni per controllare: è il modo più semplice per far uccidere una regina appena introdotta, soprattutto se è la prima volta.',
          'Confondere una regina nuova con una regina "piccola e scura" e toglierla per errore: guarda prima se depone.',
        ],
      },
      { h2: 'Le nostre regine' },
      {
        p: 'Alleviamo regine feconde negli apiari del Parco Adda Nord e in Alta Val Brembana: sono regine di provincia, abituate al clima e alle fioriture della Lombardia. La nostra linea è una sola, <strong>Buckfast</strong>: la regina madre è una F0 selezionata con inseminazione strumentale e quelle che vendiamo sono le sue figlie, le F1. Si vendono già in deposizione: se ti serve una regina per un alveare che vuoi rinnovare, scrivici e ti diciamo subito cosa è disponibile in questo periodo.',
      },
      { cta: { href: '/api-regine/', label: 'Vedi le api regine disponibili' } },
    ],
  },
];

/** Le guide sono tutte pubblicate insieme: data unica, modificabile a mano. */
export const guides: Guide[] = base.map((g) => ({
  ...g,
  datePublished: PUBLISH_DATE,
  dateModified: PUBLISH_DATE,
}));

/**
 * Card di rimando a una guida: titolo e testo brevi sono scelti dalla pagina che
 * la mostra, la foto arriva dalla guida (stessa immagine della sua hero), così
 * ogni card ha un'immagine e non serve ripeterla a mano in ogni pagina.
 */
export function guideCard(slug: string, title: string, text: string) {
  const g = guides.find((x) => x.slug === slug);
  if (!g) throw new Error(`guideCard: guida sconosciuta "${slug}"`);
  return { href: `/guide/${g.slug}/`, title, text, img: g.hero.base, alt: g.hero.alt };
}
