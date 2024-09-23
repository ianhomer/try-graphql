import typescriptEslint from "@typescript-eslint/eslint-plugin";
import noOnlyTests from "eslint-plugin-no-only-tests";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/dist/", "**/build/"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "no-only-tests": noOnlyTests,
      "simple-import-sort": simpleImportSort,
      sonarjs
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-var-requires": "off",

      "no-only-tests/no-only-tests": [
        "error",
        {
          fix: true,
        },
      ],

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "sonarjs/cognitive-complexity": "off",
      eqeqeq: ["error", "smart"],
    },
  },
];
