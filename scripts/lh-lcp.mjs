import { readFileSync } from 'node:fs';
const r = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const a = r.audits['lcp-discovery-insight'];
if (a?.details) console.log('discovery:', JSON.stringify(a.details).slice(0, 700));
const lb = r.audits['lcp-breakdown-insight'];
if (lb?.details?.items) {
  console.log('breakdown:', JSON.stringify(lb.details.items[0]?.items));
  console.log('lcp node:', lb.details.items[1]?.node?.snippet?.replace(/\s+/g, ' '));
}
