// @ts-check
import { defineConfig } from 'astro/config';

// Sito statico puro: il deploy avviene su Cloudflare Pages via `wrangler pages deploy dist`.
export default defineConfig({
  build: {
    // CSS inline nell'HTML: niente richieste render-blocking
    inlineStylesheets: 'always',
  },
});
