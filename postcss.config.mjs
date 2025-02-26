export default {
  plugins: {
    "@tailwindcss/postcss": {},
    // TODO: Re-enable
    // 'postcss-preset-env': { browsers: 'last 2 versions' },
  },
  purge: {
    options: {
      safelist: [/data-theme$/],
    },
  },
};
