import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';
import { fixupConfigRules } from '@eslint/compat';
// import globals from 'globals';
// import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

import reactCompiler from 'eslint-plugin-react-compiler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  reactCompiler.configs.recommended,
  ...fixupConfigRules(
    compat.extends(
      'plugin:compat/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
    ),
  ),
  // {
  //   languageOptions: {
  //     globals: { ...globals.webextensions, ...globals.browser },

  //     parser: tsParser,
  //     ecmaVersion: 12,
  //     sourceType: 'module',

  //     parserOptions: { ecmaFeatures: { jsx: true } },
  //   },
  // },
  // {
  //   files: ['**/*.ts', '**/*.tsx'],

  //   languageOptions: {
  //     ecmaVersion: 5,
  //     sourceType: 'script',

  //     parserOptions: { project: ['./tsconfig.json'] },
  //   },
  // },
);
