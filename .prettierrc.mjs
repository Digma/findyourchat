// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte"],
  overrides: [
    {
      files: "src/*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "**.svelte",
      options: { parser: "svelte" },
    },
  ],
};
