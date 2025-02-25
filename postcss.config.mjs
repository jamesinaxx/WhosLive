import { browserslist } from './package.json';

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-env': { browsers: browserslist },
  },
};
