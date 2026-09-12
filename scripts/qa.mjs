/**
 * QA veloce. Il controllo completo (canonical, heading, alt, link, JSON-LD,
 * copertura del sitemap) è in scripts/audit.mjs: qui la si richiama, così non
 * esistono due liste di pagine da tenere allineate a mano.
 */
import { spawnSync } from 'node:child_process';

const run = spawnSync(process.execPath, ['scripts/audit.mjs'], { stdio: 'inherit' });
process.exit(run.status ?? 1);
