export default [
  {
    test: /\.[jt](s|sx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
];
