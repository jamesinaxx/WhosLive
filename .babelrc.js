module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importSource: '@emotion/react',
      },
    ],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 10,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@emotion/babel-plugin'],
};
