import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import { skeleton } from "@skeletonlabs/tw-plugin";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import { join } from "path";

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./src/**/**/*.{html,js,svelte,ts}",
    join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")
  ],

  theme: {
    extend: {}
  },

  plugins: [
    typography,
    forms,
    containerQueries,
    aspectRatio,
    skeleton({
      themes: {
        preset: [
          { name: "skeleton", enhancements: true },
          { name: "seafoam", enhancements: true },
          { name: "vintage", enhancements: true }
        ]
      }
    })
  ],
  darkMode: "class"
} satisfies Config;
