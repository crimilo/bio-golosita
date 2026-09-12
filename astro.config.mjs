import { defineConfig } from 'astro/config';
import sitemap from './src/integrations/sitemap.mjs';
import { site } from './src/data/site.js';

export default defineConfig({
  build: {
    inlineStylesheets: 'always',
  },
  // Il sitemap è generato a fine build dalle pagine reali (src/integrations/sitemap.mjs)
  integrations: [sitemap({ site })],
});
