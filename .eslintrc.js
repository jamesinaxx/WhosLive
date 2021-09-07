/**
 * @type {import('eslint').ESLint.Options}
 */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    webextensions: true,
  },
  globals: {
    JSX: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': 'off',
    'no-console': 'off',
    'react/destructuring-assignment': 'off',
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    // Fixes issues with Typescript overloads
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    // Fixes an issue where React was "used before it was defined" which is incorrect
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // Support for new React jsx transformation
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // Causes issues with Preact prop types
    'react/prop-types': 'off',
  },
};

module.exports = config;
