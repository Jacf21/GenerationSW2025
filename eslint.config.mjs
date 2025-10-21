import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import vitest from "eslint-plugin-vitest";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.vscode/**",
      "**/coverage/**",
      "**/package*.json",
      "**/*.lock",
      "**/*.css",
    ],
  },

  // 🟨 JavaScript / JSX
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: [js.configs.recommended],
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^[A-Z].*"
        }
      ],
      "no-console": "off",
    },
  },

  // ⚛️ React
  {
    files: ["**/*.{jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+ ya no necesita importar React
      "react/jsx-no-target-blank": "warn",
      "react/prop-types": "off", // si usas TypeScript o props sin PropTypes
      "react/jsx-curly-brace-presence": ["warn", "never"], // limpia JSX
      "react/jsx-no-undef": "off"
    },
  },

  // Vitest (para evitar "test" y "expect" no definidos)
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/tests/**/*.{js,jsx,ts,tsx}"],
    ...vitest.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
    rules: {
      "vitest/no-focused-tests": "error",
    },
  },

  // 📦 JSON
  {
    files: ["**/*.json", "**/*.jsonc"],
    ...json.configs.recommended,
  },

  // 🧹 Prettier (formato automático)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier,
    },
    rules: {
      ...prettier.configs.recommended.rules,
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
          semi: true,
          singleQuote: false,
          trailingComma: "es5",
          printWidth: 100,
        },
      ],
    },
  },

  {
    files: ["**/src/tests/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        jest: "readonly", // ✅ le dice a ESLint que 'jest' es global
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  }

]);
