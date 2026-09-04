import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { createGzip, createBrotliCompress } from 'node:zlib';

const port = Number(process.argv[2] || 8091);
const root = normalize(join(process.cwd(), process.argv[3] || 'dist'));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const file = normalize(join(root, p));
    if (!file.startsWith(root)) throw new Error('forbidden');
    const st = await stat(file);
    if (!st.isFile()) throw new Error('not a file');
    const data = await readFile(file);
    const type = MIME[extname(file)] || 'application/octet-stream';
    const accept = req.headers['accept-encoding'] || '';
    const cacheable = /\.(webp|avif|woff2|png|jpg|mp4|svg|ico)$/.test(file);
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', cacheable ? 'public, max-age=31536000, immutable' : 'public, max-age=3600');
    const binary = /\.(webp|avif|woff2|mp4|png|jpg)$/.test(file);
    if (!binary && accept.includes('br')) {
      res.setHeader('Content-Encoding', 'br');
      createBrotliCompress().end(data).pipe(res);
    } else if (!binary && accept.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip');
      createGzip().end(data).pipe(res);
    } else {
      res.end(data);
    }
  } catch {
    res.statusCode = 404;
    res.end('not found');
  }
}).listen(port, () => console.log(`serving ${root} on :${port}`));
