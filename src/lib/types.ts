/** Tipi condivisi tra pagine, componenti e dati strutturati del sito. */

/** Blocchi di testo usati dalle guide e dai componenti che le rendono. */
export type Block =
  | { h2: string; id?: string }
  | { h3: string }
  /** I campi testuali accettano HTML inline (serve per i link interni). */
  | { p: string }
  | { ul: string[] }
  | { img: { base: string; alt: string; caption?: string } }
  /** Testo e foto sulla stessa riga: da desktop la foto sta a fianco, da mobile
   *  va sotto (vedi `.prose-row` in global.css). */
  | { row: { text: Block[]; img: { base: string; alt: string; caption?: string } } }
  /** Video dentro il testo: reso in `.prose-video` (vedi ProseBlocks), con il
   *  poster AVIF caricato solo quando il video si avvicina al viewport. Di
   *  default verticale (`video-item--tall`, colonna stretta senza ritagli); con
   *  `cls: 'video-item--wide'` sta a tutta colonna di lettura
   *  (`.prose-video--wide`). */
  | { video: { src: string; poster: string; label: string; cls?: string } }
  | { note: string }
  | { cta: { href: string; label: string } };

/** Voce del percorso di navigazione (breadcrumb). */
export interface Crumb {
  name: string;
  path?: string;
}

/** Domanda/risposta delle FAQ, usata anche per lo schema FAQPage. */
export interface FaqItem {
  q: string;
  a: string;
}

/** Foto della griglia gallery-grid. */
export interface GalleryPhoto {
  base: string;
  alt: string;
  /** classe di layout della griglia: g-item--tall, g-item--square, g-item--wide,
   *  g-item--portrait (fotogrammi verticali 9/16, come le foto dal video) */
  cls?: string;
  caption?: string;
}
