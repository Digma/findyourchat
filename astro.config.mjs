import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  renderers: ['@astrojs/renderer-svelte'],
  output: "hybrid",
  adapter: vercel()
});