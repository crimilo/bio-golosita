// Analizza un report Lighthouse JSON.
import { readFileSync } from 'node:fs';
const r = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const audits = r.audits;

const lcpEl = audits['largest-contentful-paint-element'];
if (lcpEl?.details?.items) {
  console.log('LCP elements:');
  for (const i of lcpEl.details.items) {
    console.log(' ', i.timing?.toFixed?.(2) + 'ms' || '', (i.node?.snippet || '').replace(/\s+/g, ' ').slice(0, 110));
  }
}

for (const id of ['color-contrast', 'aria-prohibited-attr', 'label-content-name-mismatch', 'link-name', 'image-alt', 'heading-order']) {
  const a = audits[id];
  if (!a) continue;
  console.log(`--- ${id} (${a.scoreDisplayMode}, score ${a.score}):`);
  for (const i of a.details?.items || []) {
    console.log('  ', (i.node?.snippet || '').replace(/\s+/g, ' ').slice(0, 90), i.contrastRatio ? `| ${i.contrastRatio} (needs ${i.expectedContrastRatio})` : '');
  }
}

for (const id of ['render-blocking-insight', 'image-delivery-insight', 'cache-insight', 'document-latency-insight', 'network-dependency-tree-insight', 'render-blocking-resources']) {
  const a = audits[id];
  if (!a) continue;
  console.log(`INSIGHT ${id} mode=${a.scoreDisplayMode} score=${a.score}`);
  for (const i of a.details?.items || []) {
    const bytes = i.totalBytes ? Math.round(i.totalBytes / 1024) + 'KB' : '';
    console.log('   ', (i.url || i.description || '').replace(/\s+/g, ' ').slice(0, 110), bytes, i.wastedMs ? `${Math.round(i.wastedMs)}ms` : '', i.wastedBytes ? `${Math.round(i.wastedBytes / 1024)}KB` : '');
  }
}
