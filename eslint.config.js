import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["public/**/*.{js,mjs,cjs}"],
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["src/api/**/*.{js,mjs,cjs}", "src/server/**/*.{js,mjs,cjs}"],
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
]);