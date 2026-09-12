import { writeFileSync } from 'node:fs';

/**
 * Genera dist/sitemap.xml dalle pagine realmente costruite: così il sitemap non
 * può più "dimenticare" una pagina quando se ne aggiunge una nuova.
 * Solo URL https sul dominio canonico (nessun www, nessun http).
 */
export default function sitemap({ site, exclude = [] }) {
  const hook = 'astro:build:done';
  return {
    name: 'bio-golosita-sitemap',
    hooks: {
      [hook]: ({ dir, pages, logger }) => {
        const urls = pages
          .map((p) => p.pathname)
          .filter((p) => !exclude.includes(p))
          .map((p) => (p.startsWith('/') ? p : `/${p}`))
          // 404 non è una pagina da indicizzare
          .filter((p) => !/^\/404\/?$/.test(p))
          .sort();

        // Nessun <lastmod>: la data di build non è la data di modifica del
        // contenuto, e un lastmod sbagliato è peggio di nessun lastmod.
        const xml =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          urls.map((u) => `  <url>\n    <loc>${site.domain}${u}</loc>\n  </url>`).join('\n') +
          '\n</urlset>\n';

        writeFileSync(new URL('sitemap.xml', dir), xml);
        logger.info(`sitemap.xml generato con ${urls.length} URL`);
      },
    },
  };
}
