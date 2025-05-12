import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-debugger': 'error',
      'no-dupe-keys': 'error',
      'no-empty': 'warn',
      'no-extra-semi': 'warn',
      'no-irregular-whitespace': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'valid-typeof': 'error',
      'semi': 'error',
      // 'newline-after-var': ['error', 'always']
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
]);
