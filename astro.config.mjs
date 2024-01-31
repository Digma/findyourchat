import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), sitemap()],
  renderers: ['@astrojs/renderer-svelte'],
  site: 'https://www.findyourchat.ai',
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});