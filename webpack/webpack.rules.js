module.exports = [
  {
    test: /\.json$/i,
    type: 'asset/resource',
  },
  {
    test: /\.[jt](s|sx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
];
