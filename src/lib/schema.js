import { site, honeyProducts } from '../data/site.js';
import { entryFormat, priceAmount } from './price.js';
import manifest from '../data/img-manifest.js';

const imgUrl = (base) => {
  const entry = manifest[base];
  const largest = Math.max(...Object.keys(entry.variants).map(Number));
  const suffix = entry.hash ? `-${entry.hash}` : '';
  return `${site.domain}/img/${base}-${largest}${suffix}.avif`;
};

const areaServedType = (name) => {
  if (name === 'Parco Adda Nord') return 'Park';
  return 'City';
};

const businessDescription = () =>
  `Apicoltore a Cassano d'Adda (Milano): miele 100% italiano e artigianale di api proprie — ${site.honeys
    .map((h) => h.name.toLowerCase().replace(/^(miele\s+)?(di\s+)?/, ''))
    .join(', ')} — non pastorizzato e smielato a freddo. Produciamo anche polline d'api, api regine e nuclei d'api.`;

/** L'apicoltore, come entità Person (E-E-A-T). */
export function person() {
  return {
    '@type': 'Person',
    name: site.owner,
    jobTitle: 'Apicoltore',
    url: `${site.domain}/chi-siamo/`,
    worksFor: { '@type': 'Organization', name: site.legalName },
    knowsAbout: [
      'Apicoltura',
      "Miele italiano di produzione propria",
      "Polline d'api",
      'Allevamento di api regine',
      "Nuclei d'api",
    ],
  };
}

export function localBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.domain}/#azienda`,
    name: site.name,
    legalName: site.legalName,
    vatID: site.vatId,
    description: businessDescription(),
    url: `${site.domain}/`,
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    hasMap: site.googleMapsUrl,
    telephone: site.phoneDisplay,
    image: `${site.domain}/og.jpg`,
    logo: `${site.domain}/favicon.svg`,
    priceRange: site.priceRange,
    foundingDate: String(site.founded),
    founder: person(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.zip,
      addressRegion: site.address.province,
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    areaServed: site.areaServed.map((name) => ({ '@type': areaServedType(name), name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mieli Bio & Golosità',
      itemListElement: honeyProducts.map((h) => {
        const price = priceAmount(entryFormat(h.priceFormats)?.price);
        return {
          '@type': 'Offer',
          name: h.name,
          image: imgUrl(h.cardImage ?? h.image),
          url: `${site.domain}/miele/${h.slug}/`,
          priceCurrency: 'EUR',
          // niente prezzo inventato: se nei dati manca, l'offerta resta senza
          ...(price != null ? { price } : {}),
        };
      }),
    },
  };
}

/**
 * Product schema.
 *
 * - **Più formati di vendita** (`priceFormats`: i mieli, 500 g e 1 kg) →
 *   `ProductGroup` con `hasVariant`: una `Product` per formato, ognuna con la
 *   sua `Offer`, `size` e uno `sku` stabile. È la forma che Google chiede per un
 *   prodotto con varianti sulla stessa pagina
 *   (developers.google.com/search/docs/appearance/structured-data/product-variants).
 * - **Un solo formato** (polline, api regine, nuclei) → `Product` con la sua
 *   `Offer`, `size` incluso quando c'è (`item.formato`).
 *
 * Se il prezzo non è pubblicato (`prezzo: null`) la funzione torna `null`: senza
 * prezzo non c'è `offers`, e un `Product` senza `offers`, `review` né
 * `aggregateRating` è un **item non valido** per Google
 * (developers.google.com/search/docs/appearance/structured-data/product-snippet),
 * che lo segnala in Search Console. Meglio omettere del tutto il nodo — e non
 * inventare un prezzo — che pubblicarne uno invalido. Il numero si legge da
 * `priceFormats`/`prezzo` con `priceAmount`, che torna `null` se non trova
 * cifre. Lo `sku` delle varianti è derivato da slug + formato (`miele-di-acacia-500g`):
 * un identificatore stabile, non un codice di magazzino inventato sul prodotto.
 *
 * I chiamanti devono scartare il `null` (lo fa già `Base.astro`).
 */
export function product(item, pathname, { category } = {}) {
  const url = `${site.domain}${pathname}`;
  // Immagini del prodotto: la principale e, se c'è, quelle della galleria (per
  // il miele in favo è la sequenza di foto ricavate dal video). Google accetta
  // più URL nello stesso campo `image`.
  const images = [
    imgUrl(item.cardImage ?? item.image),
    ...(item.gallery ?? []).map((g) => imgUrl(g.base)),
  ];
  const description = item.description ?? item.intro?.slice(0, 200);
  const formats = item.priceFormats ?? [];

  /** Offerta uguale per tutte le varianti: cambia solo il prezzo. */
  const offer = (price) => ({
    '@type': 'Offer',
    url,
    priceCurrency: 'EUR',
    price,
    ...(site.priceValidUntil ? { priceValidUntil: site.priceValidUntil } : {}),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@type': 'Organization', name: site.legalName },
  });

  if (formats.length > 1) {
    const variants = formats.map((f) => {
      const price = priceAmount(f.price);
      return {
        '@type': 'Product',
        name: `${item.name} ${f.size} — ${site.name}`,
        sku: `${item.slug}-${f.size.replace(/\s+/g, '')}`,
        size: f.size,
        image: images,
        description,
        manufacturer: { '@type': 'Organization', name: site.legalName },
        ...(price != null ? { offers: offer(price) } : {}),
      };
    });
    // Nessuna variante con un'offerta → il ProductGroup resterebbe senza
    // `offers`: item non valido, quindi non lo emettiamo. Le varianti senza
    // prezzo vengono scartate una per una, così un ProductGroup resta valido
    // anche quando solo alcuni formati hanno un prezzo pubblicato.
    const priced = variants.filter((v) => 'offers' in v);
    if (priced.length === 0) return null;
    const group = {
      '@context': 'https://schema.org',
      '@type': 'ProductGroup',
      name: `${item.name} — ${site.name}`,
      description,
      url,
      brand: { '@type': 'Brand', name: site.name },
      productGroupID: item.slug,
      variesBy: ['https://schema.org/size'],
      hasVariant: priced,
    };
    if (category) group.category = category;
    return group;
  }

  const out = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${item.name} — ${site.name}`,
    image: images,
    description,
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@type': 'Organization', name: site.legalName },
  };
  const size = formats[0]?.size ?? item.formato;
  if (size) out.size = size;
  if (category) out.category = category;
  // `priceFormats` (mieli) oppure `prezzo`/`price` (prodotti dell'allevamento)
  const price = priceAmount(formats[0]?.price ?? item.prezzo ?? item.price);
  // Niente prezzo → niente `offers` → `Product` non valido per Google: la
  // pagina resta senza nodo Product (meglio che un item segnalato come invalido).
  if (price == null) return null;
  out.offers = offer(price);
  return out;
}

/** Pagina-hub che elenca prodotti o contenuti (es. /miele/, /guide/). */
export function collectionPage({ name, description, pathname, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${site.domain}${pathname}`,
    inLanguage: 'it-IT',
    isPartOf: { '@type': 'WebSite', name: site.name, url: `${site.domain}/` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: `${site.domain}${it.path}`,
        ...(it.image ? { image: imgUrl(it.image) } : {}),
      })),
    },
  };
}

export function article(guide, pathname) {
  const url = `${site.domain}${pathname}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: [imgUrl(guide.hero.base)],
    inLanguage: 'it-IT',
    datePublished: guide.datePublished,
    dateModified: guide.dateModified ?? guide.datePublished,
    author: person(),
    publisher: {
      '@type': 'Organization',
      name: site.legalName,
      url: `${site.domain}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${site.domain}/favicon.svg`,
      },
    },
  };
}

/** Servizio di consegna a domicilio, per la pagina /consegna-miele/. */
export function deliveryService({ pathname, name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${site.domain}${pathname}`,
    serviceType: 'Consegna a domicilio',
    provider: { '@type': 'LocalBusiness', '@id': `${site.domain}/#azienda` },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: site.phoneDisplay },
      serviceUrl: site.whatsapp,
    },
    areaServed: site.areaServed.map((n) => ({ '@type': areaServedType(n), name: n })),
  };
}

/** Pagina "chi siamo" come AboutPage con l'apicoltore come entità principale. */
export function aboutPage(pathname) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${site.domain}${pathname}`,
    inLanguage: 'it-IT',
    mainEntity: person(),
    about: { '@type': 'LocalBusiness', '@id': `${site.domain}/#azienda` },
  };
}

export function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.domain}${it.path}`,
    })),
  };
}
