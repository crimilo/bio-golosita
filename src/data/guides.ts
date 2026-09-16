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
        p: 'Perché il nostro miele è di api nostre, raccolto nei nostri apiari tra Cassano d\'Adda, la Martesana e la Gera d\'Adda, e venduto direttamente: non deve attraversare mesi di magazzino e non deve restare identico per anni. Lo smieliamo a freddo e lo invasettiamo a piccoli lotti, così ogni barattolo conserva il profumo della sua fioritura. Se vuoi sapere cosa vuol dire concretamente, nella pagina <a href="/chi-siamo/">chi siamo</a> raccontiamo come lavoriamo.',
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
    title: 'Acacia, Millefiori o Castagno: le Differenze | Bio & Golosità',
    description:
      'Colore, gusto e abbinamenti di acacia, millefiori e castagno: come scegliere il miele giusto per la colazione, la cucina o per un regalo.',
    h1: 'Miele di acacia, millefiori o castagno: le differenze',
    excerpt:
      'Uno è chiaro e delicato, uno profuma di tiglio, uno è scuro e deciso. Come scegliere il miele giusto partendo da come lo userai.',
    readingTime: '6 min',
    hero: {
      base: 'hero_bg',
      alt: "Tre barattoli di miele di acacia, millefiori e castagno di Bio & Golosità a Cassano d'Adda",
    },
    push: {
      href: '/miele/',
      label: 'Vedi tutti i mieli con prezzi e formati',
      note: 'Acacia, i due millefiori estivi, castagno: nella pagina dei mieli trovi le schede complete con raccolto, prezzi e formati.',
    },
    blocks: [
      {
        p: 'Il modo più semplice per scegliere un miele è partire dall\'uso che ne farai. Un miele delicato e un miele scuro non sono intercambiabili: cambiano il sapore di una tisana, di uno yogurt o di un formaggio. Qui trovi le differenze tra i mieli che produciamo, in modo da capire subito quale fa per te.',
      },
      { h2: 'Miele di acacia: chiaro, delicato, sempre liquido' },
      {
        p: 'Il miele di acacia è il più conosciuto e il più "facile" dei mieli: colore giallo paglierino quasi trasparente, gusto dolce e delicato con note floreali, e una caratteristica che lo rende unico: grazie all\'alto contenuto di fruttosio non cristallizza praticamente mai, quindi resta fluido anche dopo mesi in cantina.',
      },
      {
        ul: [
          '<strong>Quando si raccoglie:</strong> la robinia fiorisce tra la fine di aprile e i primi giorni di maggio.',
          '<strong>Come si usa:</strong> tisane, latte, caffè, yogurt e frutta: non copre gli altri sapori.',
          '<strong>A chi piace:</strong> a chi di solito non ama i mieli troppo intensi, e a chi vuole un miele sempre pronto all\'uso.',
        ],
      },
      {
        img: {
          base: 'fiori_robinia',
          alt: 'Fiori bianchi di robinia (acacia) su un ramo, con foglie verdi',
          caption: 'La robinia, l\'albero che in Italia si chiama comunemente acacia',
        },
      },
      {
        p: 'Scheda completa: <a href="/miele/miele-di-acacia/">miele di acacia a Cassano d\'Adda</a>.',
      },
      { h2: 'Miele millefiori: il sapore della stagione' },
      {
        p: 'Il millefiori non viene da una sola fioritura, ma dall\'insieme dei nettari disponibili in un periodo. È il miele più "territoriale" che esista: cambia di anno in anno, e due millefiori diversi possono avere profumi molto distanti tra loro. Nella nostra produzione ne distinguiamo due, entrambi raccolti a giugno.',
      },
      {
        ul: [
          '<strong>Millefiori estivo al tiglio e more:</strong> più scuro e corposo, con note di tiglio e di more selvatiche, raccolto a giugno. Ottimo anche con i formaggi stagionati.',
          '<strong>Millefiori estivo al tiglio e ailanto:</strong> dolce e aromatico, con il caratteristico retrogusto di pesca che danno i fiori di ailanto. Disponibile in quantità limitate.',
        ],
      },
      {
        img: {
          base: 'prato_fiorito',
          alt: 'Prato di campagna con fiori spontanei di vari colori',
          caption: 'Il millefiori racconta le fioriture del momento: per questo cambia ogni anno',
        },
      },
      {
        p: 'Schede complete: <a href="/miele/miele-millefiori-estivo-al-tiglio-e-more/">tiglio e more</a>, <a href="/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/">tiglio e ailanto</a>, e la panoramica sul <a href="/miele/miele-millefiori/">miele millefiori</a>.',
      },
      { h2: 'Miele di castagno: scuro, intenso, da formaggi' },
      {
        p: 'Il miele di castagno è il più caratteristico e il più divisivo: ambra scuro quasi bruno, gusto intenso e legnoso con un retrogusto leggermente amarognolo. È tra i mieli più ricchi di sali minerali, in particolare ferro e potassio, e cristallizza molto lentamente.',
      },
      {
        ul: [
          '<strong>Quando si raccoglie:</strong> giugno e luglio, dai castagni dei boschi della Gera d\'Adda e delle colline tra Bergamo e Cremona.',
          '<strong>Come si usa:</strong> formaggi stagionati ed erborinati, carni rosse, polenta, dolci speziati e panpepato.',
          '<strong>A chi piace:</strong> a chi cerca un miele deciso, non dolcissimo, con carattere.',
        ],
      },
      {
        img: {
          base: 'miele-di-castagno',
          alt: "Barattolo di miele di castagno di Bio & Golosità",
          caption: 'Il miele di castagno: scuro, corposo, con retrogusto amarognolo',
        },
      },
      {
        p: 'Scheda completa: <a href="/miele/miele-di-castagno/">miele di castagno a Cassano d\'Adda</a>.',
      },
      { h2: 'In sintesi: quale scegliere' },
      {
        ul: [
          'Per <strong>tisane, latte e colazione</strong> ogni giorno: miele di acacia.',
          'Per <strong>pane, fette biscottate e yogurt</strong>: millefiori estivo al tiglio e ailanto, più dolce e aromatico.',
          'Per <strong>cucina, carni e formaggi stagionati</strong>: millefiori estivo o castagno.',
          'Per un <strong>regalo</strong>: acacia per chi ama i sapori delicati, castagno per chi ama quelli decisi.',
          'Per <strong>provare qualcosa di raro</strong>: il millefiori estivo al tiglio e ailanto, con il retrogusto di pesca.',
        ],
      },
      {
        note: 'Nessun miele è "migliore" in assoluto: cambia il profilo aromatico e l\'uso. Il modo più semplice per capirlo è assaggiarli. Se vuoi un consiglio, chiamaci: ti diciamo quale miele sta uscendo meglio quest\'anno.',
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
        p: 'Prepariamo nuclei con regina feconda della nostra linea Buckfast, negli apiari tra Cassano d\'Adda, la Martesana e la Gera d\'Adda. La disponibilità dipende dalla stagione: se ti serve un nucleo, scrivici e ti diciamo a che punto siamo, quando possiamo consegnare e come organizzare il ritiro.',
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
      alt: "L'ape regina dell'apiario di Raffaele Antoci, apicoltore di Bio & Golosità a Cassano d'Adda",
    },
    push: {
      href: '/api-regine/',
      label: 'Vedi le api regine disponibili',
      note: 'Alleviamo regine feconde della nostra linea Buckfast, a Cassano d\'Adda: nella pagina dedicata trovi disponibilità, come prenotare e come ritirare.',
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
          alt: "Api di Bio & Golosità in apiario, a Cassano d'Adda",
          caption: "Le nostre api in apiario, a Cassano d'Adda",
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
        p: 'Alleviamo regine feconde a Cassano d\'Adda, negli apiari tra la Martesana e la Gera d\'Adda: sono regine di provincia, abituate al clima e alle fioriture della Lombardia. La nostra linea è una sola, <strong>Buckfast</strong>: la regina madre è una F0 selezionata con inseminazione strumentale e quelle che vendiamo sono le sue figlie, le F1. Si vendono già in deposizione: se ti serve una regina per un alveare che vuoi rinnovare, scrivici e ti diciamo subito cosa è disponibile in questo periodo.',
      },
      { cta: { href: '/api-regine/', label: 'Vedi le api regine disponibili' } },
    ],
  },

  {
    slug: 'polline-fresco-o-essiccato-conservazione',
    title: 'Polline Fresco o Essiccato: Differenze | Bio & Golosità',
    description:
      "Polline d'api fresco o essiccato: come nasce, cosa cambia tra i due, come si conserva a casa, come si usa e come riconoscere un polline di qualità.",
    h1: 'Polline fresco o essiccato: differenze e come conservarlo',
    excerpt:
      'Il polline è un alimento deperibile: il modo in cui viene conservato dopo la raccolta decide profumo, consistenza e durata.',
    readingTime: '5 min',
    hero: {
      base: 'polline_granuli',
      alt: "Polline d'api in granuli con un cucchiaio di legno",
    },
    push: {
      href: '/polline-d-api/',
      label: "Scopri il polline d'api di Bio & Golosità",
      note: "Il nostro polline viene dagli apiari tra Cassano d'Adda, la Martesana, la Gera d'Adda, il Parco Adda Nord e la Val Brembana. Nella pagina dedicata trovi origine, conservazione e come ordinarlo.",
    },
    blocks: [
      {
        p: 'Il polline d\'api è il polline dei fiori che le api raccolgono fiore dopo fiore, impastano con un po\' di nettare e riportano all\'alveare. È un prodotto dell\'alveare molto diverso dal miele: ha una stagionalità stretta, un alto contenuto di umidità quando è fresco e una conservazione che va gestita con attenzione. Ecco cosa cambia tra fresco ed essiccato.',
      },
      { h2: 'Come nasce il polline d\'api' },
      {
        p: 'Le api raccolgono il polline sui fiori e lo trasportano nelle caratteristiche "palline" attaccate alle zampe posteriori. All\'alveare viene depositato nelle celle, dove si trasforma in quello che le api usano come nutrimento proteico. Per il consumo umano si raccoglie all\'ingresso dell\'arnia, con le apposite cassette raccoglipolline, che fanno cadere parte dei granuli in un cassetto. È un lavoro senza sosta, e la quantità dipende dalle fioriture: nei periodi poveri di fiori, il polline semplicemente non c\'è.',
      },
      {
        img: {
          base: 'ape_polline',
          alt: 'Macro di un\'ape coperta di polline su un rametto',
          caption: 'Sono le api a raccogliere il polline, fiore dopo fiore',
        },
      },
      { h2: 'Polline fresco: profumo intenso, vita breve' },
      {
        p: 'Il polline appena raccolto contiene molta umidità (intorno al 20–30%) e va tenuto sotto controllo: in un ambiente caldo e umido deperisce in fretta, perché è un ambiente ideale per muffe e fermentazioni. Per questo il polline fresco si <strong>conserva in frigorifero e, per periodi lunghi, in freezer</strong>. In cambio offre un profumo e una consistenza che nessun trattamento restituisce: granuli morbidi, aroma intenso di fiori ed erba.',
      },
      { h2: 'Polline essiccato: comodo, stabile, più neutro' },
      {
        p: 'Il polline essiccato viene privato dell\'acqua in eccesso, con aria tiepida e in tempi controllati (mai con calore forte, che rovinerebbe il prodotto). Perde parte della fragranza e tende a diventare più asciutto e granuloso, ma acquista <strong>stabilità</strong>: si conserva in un barattolo ben chiuso, al riparo da luce e umidità, a temperatura ambiente, e si porta con sé facilmente.',
      },
      {
        ul: [
          '<strong>Polline fresco</strong>: profumo più ricco, granuli morbidi, va tenuto in frigorifero e, per la scorta lunga, in freezer; si consuma entro pochi mesi.',
          '<strong>Polline essiccato</strong>: più asciutto e stabile, si conserva a temperatura ambiente, ma con aroma meno intenso.',
          '<strong>In entrambi i casi</strong> conta la catena del freddo e la rapidità del confezionamento dopo la raccolta.',
        ],
      },
      { h2: 'Come si conserva (e cosa non fare)' },
      {
        ul: [
          'Tieni il polline in un barattolo ben chiuso: l\'umidità dell\'aria è il primo nemico.',
          'Tienilo al riparo dalla luce: le finestre soleggiate della cucina non sono il posto giusto.',
          'Fresco: frigorifero per il consumo quotidiano, freezer per la scorta lunga.',
          'Essiccato: un luogo asciutto e a temperatura stabile, lontano dal fornello.',
          'Preleva con un cucchiaio asciutto e chiudi subito il barattolo: evita di manipolarlo con le mani umide.',
        ],
      },
      {
        note: 'Il polline è un prodotto naturale e stagionale: colore, profumo e sapore cambiano in base alle fioriture. Se il polline di quest\'anno è diverso da quello dell\'anno scorso, è normale: sta raccontando fioriture diverse.',
      },
      { h2: 'Come si usa' },
      {
        p: 'Il polline si gusta al naturale, un cucchiaino alla volta, oppure si aggiunge a yogurt, macedonia, frullati, cereali e miele. Il sapore è delicato, leggermente dolce, con note di fiori e di erba. Va tenuto presente che è un ingrediente, non un dolcificante: non sostituisce il miele in una tisana. Se il polline è fresco e tenuto in freezer, tiralo fuori poco prima di consumarlo.',
      },
      { h2: 'Come riconoscere un polline di qualità' },
      {
        ul: [
          'I granuli sono il più possibile <strong>interi</strong>: se il contenuto è in gran parte polvere, il prodotto è stato movimentato troppo.',
          '<strong>Colore vario</strong>, tendente al giallo, all\'arancio e al marrone: è la firma delle diverse fioriture.',
          '<strong>Origine dichiarata</strong>: sai da quale apiario arriva e chi lo raccoglie.',
          '<strong>Odore netto</strong>, di fiori e di erba, non "chiuso" o di vecchio.',
          '<strong>Nessuna promessa terapeutica sull\'etichetta</strong>: il polline è un alimento, non un rimedio.',
        ],
      },
      {
        img: {
          base: 'prato_fiorito',
          alt: 'Prato di campagna con fiori spontanei di vari colori',
          caption: 'Un prato in fiore: i colori diversi dei granuli sono i colori diversi dei fiori',
        },
      },
      { h2: 'Il nostro polline' },
      {
        p: 'Il polline che vendiamo arriva dagli apiari tra Cassano d\'Adda, la Martesana, la Gera d\'Adda e il Parco Adda Nord, dove sono le nostre api, ed è confezionato a piccoli lotti. Se vuoi sapere cosa c\'è disponibile in questo periodo, se è fresco o essiccato e come conservarlo al meglio, chiamaci o scrivici: te lo spieghiamo in due minuti.',
      },
      { cta: { href: '/polline-d-api/', label: "Scopri il polline d'api di Bio & Golosità" } },
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
