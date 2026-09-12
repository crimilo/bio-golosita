import manifest from '../data/img-manifest.js';

/** Helper per costruire URL/srcset versionati dal manifest delle immagini. */

const entry = (base) => {
  const e = manifest[base];
  if (!e) throw new Error(`Immagine non presente nel manifest: ${base}`);
  return e;
};

/** Larghezze disponibili (ordinate) per una base. */
export const widths = (base) => Object.keys(entry(base).variants).map(Number).sort((a, b) => a - b);

export const largestWidth = (base) => Math.max(...widths(base));

const suffix = (base) => (entry(base).hash ? `-${entry(base).hash}` : '');

export const imgUrl = (base, { ext = 'avif', width } = {}) =>
  `/img/${base}-${width ?? largestWidth(base)}${suffix(base)}.${ext}`;

export const imgSrcset = (base, ext = 'avif') =>
  widths(base)
    .map((w) => `${imgUrl(base, { ext, width: w })} ${w}w`)
    .join(', ');

export const imgDims = (base, width) => {
  const v = entry(base).variants[String(width ?? largestWidth(base))];
  return { width: v.width, height: v.height };
};
