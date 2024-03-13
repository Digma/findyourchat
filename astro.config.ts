import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte(),
    sitemap({
      filter: (page) => page !== "https://www.findyourchat.ai/profile/",
    }),
  ],
  site: "https://www.findyourchat.ai",
  output: "server",
  server: {
    port: 3000,
  },
  adapter: vercel({
    edgeMiddleware: true,
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 8,
  }),
});
