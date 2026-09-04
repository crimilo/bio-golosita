const query = process.argv[2] || 'dark honey';
const url =
  'https://commons.wikimedia.org/w/api.php?action=query&generator=search' +
  `&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10` +
  '&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1200&format=json';
const res = await fetch(url);
const j = await res.json();
for (const p of Object.values(j.query?.pages || {})) {
  const ii = p.imageinfo?.[0];
  const md = ii?.extmetadata || {};
  const desc = (md.ImageDescription?.value || '').replace(/<[^>]+>/g, '').slice(0, 90);
  const lic = (md.LicenseShortName?.value || '');
  console.log(
    `\n• ${p.title}\n  ${ii?.width}x${ii?.height} | ${lic} | ${desc || '(nessuna descrizione)'}\n  ${ii?.thumburl?.split('?')[0] || ii?.url}`
  );
}
