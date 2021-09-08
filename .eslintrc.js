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
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:react/recommended',
    'prettier',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
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
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
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
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'import/extensions': ['off'],
    'no-console': ['warn'],
    'react/destructuring-assignment': ['off'],
    'arrow-parens': ['error', 'as-needed'],
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'no-redeclare': ['off'],
    '@typescript-eslint/no-redeclare': ['error'],
    'no-use-before-define': ['off'],
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-uses-react': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/require-default-props': ['off'],
    'require-await': ['error'],
    'linebreak-style': ['error'],
    'react/jsx-one-expression-per-line': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'function-paren-newline': ['off'],
    'react/prop-types': ['off'],
    indent: ['off'],
    semi: ['error', 'always'],
    'react/jsx-curly-newline': ['off'],
  },
};

module.exports = config;
