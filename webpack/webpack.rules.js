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
  {
    test: /\.s[ac]ss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
];
