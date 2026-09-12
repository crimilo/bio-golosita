# Azioni SEO che richiedono una persona (non il codice)

Questa è la parte del piano SEO che **non** si può fare dal repository: scheda
Google, recensioni, Search Console, backlink. Il resto (pagine, contenuti, dati
strutturati, sitemap, redirect, internal linking) è già implementato nel sito.

Ordine consigliato: **1 → 2 → 3 → 4 → 5 → 6**. La scheda Google viene prima di
qualsiasi nuovo contenuto.

---

## 1. Scheda Google Business Profile (la priorità)

- [ ] **Nome**: deve corrispondere al nome con cui l'attività è realmente
      conosciuta (insegna, etichette, documenti, social). Oggi la scheda si
      chiama *«Apicoltura e Vendita Miele Bio & Golosità Cassano d'Adda»*: se
      quel nome non esiste su insegna/etichette, aggiungere "Apicoltura e
      Vendita Miele" o la località **solo per posizionarsi è una violazione**
      delle linee guida Google e può portare alla sospensione del profilo.
      Verifica e allinea (es. *«Bio & Golosità di Antoci Raffaele»*).
- [ ] **Orari**: il sito ora pubblica *«Tutti i giorni 08:00–20:00»* con la nota
      *«ti consigliamo comunque di chiamare o scrivere prima di passare: durante
      la giornata potremmo trovarci in apiario»*. La scheda Google **deve dire la
      stessa cosa**: se gli orari reali sono diversi, cambiali in
      `src/data/site.js` (`hours`) e allinea la scheda.
- [ ] **Categoria principale**: "Azienda apistica / Honey farm" (una sola).
      Aggiungi il minor numero di categorie secondarie necessario.
- [ ] **Prodotti**: aggiungi come *Prodotti* (non come servizi) miele di acacia,
      millefiori, castagno, **miele in favo**, polline d'api, con link alle
      pagine del sito.
      Per **api regine e nuclei** usa piuttosto *Servizi*, post e link alle
      landing dedicate: non sono prodotti da carrello.
- [ ] **Foto/video**: carica con continuità (apiario, smielatura, barattoli,
      consegne). Profili con foto aggiornate risultano più completi e competitivi.
- [ ] **Post**: pubblica i post stagionali (nuovo raccolto, disponibilità
      nuclei/regine, Mielerie Aperte, mercati).
- [ ] **Descrizione**: cita Cassano d'Adda, Martesana, Gera d'Adda, miele di api
      proprie, non pastorizzato, polline, api regine e nuclei.
- [ ] **Rispondi a tutte le recensioni**, positive e negative.

## 2. Recensioni: da 18 a 40-50 (poi 75, poi 100)

I concorrenti dell'area hanno 39-110 recensioni: il voto (4,9) è già ottimo, il
problema è il **numero**. Regola: solo clienti reali, nessun acquisto, nessuno
scambio, nessun incentivo.

- [ ] Crea il link diretto alla recensione: Google Business Profile → *Chiedi
      recensioni* → copia il link breve.
- [ ] Metti il link in un messaggio rapido da inviare dopo ogni consegna, per
      esempio:

      > Ciao! Sono Raffaele di Bio & Golosità. Grazie per l'ordine 🙂
      > Se ti è piaciuto il miele, mi aiuti tantissimo lasciando una recensione
      > su Google: [LINK]. Ci vogliono 30 secondi. Grazie!

- [ ] Aggiungi il link alla firma WhatsApp Business e ai post Instagram.
- [ ] Rileggi le recensioni nuove una volta a settimana e rispondi sempre.

> Le recensioni **non** sono ancora nello schema del sito (nessun
> `AggregateRating`/`Review` è stato inventato) e quelle che c'erano in
> homepage sono state rimosse perché non autentiche.

> ✅ **Fatto**: le 4 recensioni non autentiche sono state rimosse e la homepage
> mostra ora **8 recensioni reali** della scheda Google (nome, stelle, etichetta
> "Recensione Google"), con testo fedele all'originale.
>
> Nota: due recensioni erano troncate da Google ("… More") e sono state chiuse
> all'ultima frase completa, senza aggiungere né cambiare parole. La recensione
> *"Ottimi prodotti bio naturali."* è stata **esclusa di proposito**: il miele è
> convenzionale e non certificato biologico, e sul sito evitiamo quell'ambiguità.
> Se vuoi, mandami il testo completo delle due recensioni tagliate e le estendo.

### Come aggiungere altre recensioni

1. Apri la scheda Google, copia **testo originale, nome e stelle** delle
   recensioni migliori (qualità del miele, gusto, acacia/millefiori/castagno,
   cortesia, consegna, acquisto diretto).
2. Incollale in `src/data/site.js` → `reviews`, una voce così per ognuna:

   ```js
   { name: 'Nome Cognome', stars: 5, text: 'testo originale della recensione',
     date: '2026-05-12', town: 'Cassano d\'Adda' }
   ```

   `stars` è obbligatorio, `town`/`date`/`url` sono opzionali (con `url` la
   parola "Google" nella card diventa un link a quella recensione).
3. La homepage mostra automaticamente nome, stelle (piene/vuote) ed etichetta
   "Recensione Google"; se l'array resta vuoto compare un riquadro che rimanda
   alle recensioni su Google.
4. Non riscrivere i testi e non aggiungere recensioni: vanno riportate fedeli
   (si possono chiudere all'ultima frase completa quelle troncate da Google).

> Per attivare lo schema `Review`/`AggregateRating` servono **media e numero di
> recensioni reali e aggiornati** letti dalla scheda Google: non vanno stimati.
> Finché non sono disponibili, lo schema resta assente.

## 3. Search Console e Cloudflare

- [ ] Search Console: usa una **proprietà Dominio** (`bioegolosita.it`), così
      copre https/http/www e tutti i sottodomini. Reinvia
      `https://bioegolosita.it/sitemap.xml` (ora è generato a fine build e
      contiene tutte le pagine reali).
- [ ] Cloudflare: SSL/TLS → *Always Use HTTPS* attivo (redirect http → https).
      Nel repository è già presente `public/_redirects` con `www` → dominio
      canonico (301).
- [ ] Verifica in Search Console → *Indicizzazione → Pagine* che gli URL siano
      quelli canonici `https://bioegolosita.it/...`, senza `www` e senza `http`.
- [ ] Tra 6-8 settimane: leggere le query reali di Search Console e decidere
      **solo allora** se servono pagine per singole città (solo 3-5 località
      davvero strategiche, con contenuti diversi — mai pagine "miele + comune"
      clonate).

## 4. Backlink e citazioni locali (qui c'è il margine maggiore)

Un link da un sito apistico lombardo autorevole vale più di 50 link comprati.

- [ ] Associazioni apistiche lombarde e nazionali (es. Apa Lombardia,
      Apilombardia, FAI): iscrizione/anagrafica allevatori con link al sito.
- [ ] Albo/elenco apicoltori della zona e dei comuni (Cassano d'Adda, Treviglio,
      Inzago, Melzo…).
- [ ] Iniziative come **Mielerie Aperte**, Miele in Fiera, mercati contadini:
      pagina dedicata sul sito dell'evento con link.
- [ ] Portali dei produttori locali / GAS / Gruppi di acquisto solidale.
- [ ] Negozi, gastronomie, ristoranti e agriturismi a cui fornisci miele:
      una citazione "Miele di Bio & Golosità" sul loro sito.
- [ ] Stampa locale (Giornale di Treviglio, Il Cittadino, testate online della
      Martesana) — un articolo sulla storia di Raffaele, l'apicoltura di
      martedì/giovedì e i prodotti nuovi.
- [ ] Quando parte la vendita di **nuclei e api regine**: chiedere una citazione
      nella pagina di Apilombardia dedicata a chi vende nuclei/regine. È la
      citazione tematica con il rendimento più alto.

## 5. Dati da completare nel sito (li inserisce il titolare)

In `src/data/bee-products.js` (le pagine funzionano già senza, mostrando
"Prezzo su richiesta" / "chiedici la disponibilità"):

- [ ] **Polline**: formato (es. 250 g), raccolto (mesi), lavorazione (fresco o
      essiccato), prezzo, disponibilità.
- [ ] **Api regine**: razze/linee allevate (solo quelle reali), prezzo,
      disponibilità della stagione, da quando si prenota, documenti sanitari.
- [ ] **Nuclei**: composizione (numero e tipo di telai), razza, prezzo,
      disponibilità, da quando si prenota.

In `src/data/site.js`:

- [x] `reviews`: 8 recensioni Google autentiche inserite (vedi sezione 2).
- [ ] `hours` / `hoursNote`: verifica che corrispondano alla scheda Google.
- [ ] `annata` di ogni miele (es. "Raccolto 2026") per la sezione tracciabilità.
- [ ] Partita IVA / REA se mancano.

## 6. Da non fare

- ❌ Aggiungere località o keyword ("miele", "Cassano d'Adda") **nel nome** della
  scheda Google se non sono nel nome reale dell'attività.
- ❌ Comprare recensioni, scambiarle o incentivarle.
- ❌ Creare 20 pagine "miele + comune" con lo stesso testo cambiando il paese
  (doorway pages): la home elenca già le zone servite, e la pagina
  `/consegna-miele/` copre la ricerca di consegna.
- ❌ Posizionarsi su **"miele bio"**: il miele è convenzionale e non certificato
  biologico, e sul sito la parola "bio" non compare mai come claim (è solo il
  nome dell'azienda): i testi parlano di miele artigianale, 100% italiano e non
  pastorizzato. La FAQ sul biologico è stata rimossa.
- ❌ Claim sanitari ("cura", "rafforza", "previene"): i testi del sito parlano di
  origine, gusto, lavorazione e conservazione.
- ❌ Promettere il numero 1 su Maps "ovunque": Google considera anche la distanza
  dell'utente. Obiettivo realistico: #1-3 su Maps nell'area di Cassano d'Adda.
