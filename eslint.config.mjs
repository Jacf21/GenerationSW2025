import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JS / JSX
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: [js.configs.recommended],
  },

  // React
  {
    files: ["**/*.{jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // detecta versión instalada de React
      },
    },
  },

  // JSON
  {
    files: ["**/*.json"],
    plugins: { json },
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    extends: ["json/recommended"],
  },

  // CSS
  {
    files: ["**/*.css"],
    plugins: { css },
    extends: ["css/recommended"],
  }
]);
