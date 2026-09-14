/**
 * Immagini OG per rotta: `path` → file in `public/og/<slug>.jpg` (1200×630).
 *
 * Sono generate da HTML+CSS con `node scripts/og/generate.mjs`, che legge
 * questa stessa mappa (via `ogPages`) e il copy di `scripts/og/pages.mjs`: qui
 * c'è solo l'abbinamento rotta → file, così sito e generatore non possono
 * divergere. Le pagine che non compaiono qui usano il fallback `/og.jpg`.
 *
 * Elenco volutamente limitato alle pagine commerciali: home, hub dei mieli e dei
 * millefiori, le sei schede del miele, i tre prodotti dell'alveare, consegna,
 * chi siamo e contatti. Guide e 404 restano sul fallback generico.
 */
export const ogByPath = {
  '/': 'home',
  '/miele/': 'miele',
  '/miele/miele-millefiori/': 'miele-millefiori',
  '/miele/miele-di-acacia/': 'miele-di-acacia',
  '/miele/miele-millefiori-primaverile/': 'miele-millefiori-primaverile',
  '/miele/miele-millefiori-estivo-al-tiglio-e-more/': 'miele-millefiori-estivo-al-tiglio-e-more',
  '/miele/miele-millefiori-estivo-al-tiglio-e-ailanto/': 'miele-millefiori-estivo-al-tiglio-e-ailanto',
  '/miele/miele-di-castagno/': 'miele-di-castagno',
  '/miele/miele-in-favo/': 'miele-in-favo',
  '/polline-d-api/': 'polline-d-api',
  '/api-regine/': 'api-regine',
  '/nuclei-api/': 'nuclei-api',
  '/consegna-miele/': 'consegna-miele',
  '/chi-siamo/': 'chi-siamo',
  '/contatti/': 'contatti',
};

/** Le stesse voci in forma di lista `{ path, slug }`, per il generatore. */
export const ogPages = Object.entries(ogByPath).map(([path, slug]) => ({ path, slug }));

/** `/og/<slug>.jpg` della rotta, oppure `undefined` se la pagina usa il
 *  fallback `/og.jpg` (Base sostituisce il default solo con `undefined`). */
export function ogImageFor(path) {
  const slug = ogByPath[path];
  return slug ? `/og/${slug}.jpg` : undefined;
}
