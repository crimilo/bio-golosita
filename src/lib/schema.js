import { site } from '../data/site.js';
import manifest from '../data/img-manifest.js';

export const priceNum = (priceStr) => {
  const m = priceStr.match(/\d+[.,]\d+/);
  return m ? Number.parseFloat(m[0].replace(',', '.')) : 9;
};

const imgUrl = (base) => {
  const entry = manifest[base];
  const largest = Math.max(...Object.keys(entry.variants).map(Number));
  const suffix = entry.hash ? `-${entry.hash}` : '';
  return `${site.domain}/img/${base}-${largest}${suffix}.avif`;
};

const areaServedType = (name) => {
  if (name === 'Parco Nord Milano') return 'Park';
  return 'City';
};

const businessDescription = () =>
  `Apicoltore a Cassano d'Adda (Milano): miele 100% italiano e artigianale di api proprie — ${site.honeys
    .map((h) => h.name.toLowerCase().replace(/^(miele\s+)?(di\s+)?/, ''))
    .join(', ')} — non pastorizzato e smielato a freddo.`;

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
    founder: { '@type': 'Person', name: site.owner },
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
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: site.areaServed.map((name) => ({ '@type': areaServedType(name), name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mieli Bio & Golosità',
      itemListElement: site.honeys.map((h) => ({
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: priceNum(h.price),
        itemOffered: {
          '@type': 'Product',
          name: h.name,
          image: imgUrl(h.cardImage ?? h.image),
        },
      })),
    },
  };
}

export function product(honey, pathname) {
  const url = `${site.domain}${pathname}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${honey.name} — Bio & Golosità`,
    image: [imgUrl(honey.cardImage ?? honey.image)],
    description: honey.intro.slice(0, 200),
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@type': 'Organization', name: site.legalName },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'EUR',
      price: priceNum(honey.price),
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: site.legalName },
    },
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
