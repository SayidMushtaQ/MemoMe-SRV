import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  eslintPluginPrettierRecommended,
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    ignores: ["!node_modules/", "node_modules/*", "build/**/*"]
  }
];
