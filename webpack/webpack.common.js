const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    index: path.resolve(__dirname, '..', 'src/index.tsx'),
    background: path.resolve(__dirname, '..', 'src/scripts/background.ts'),
    authcheck: path.resolve(__dirname, '..', 'src/scripts/authcheck.ts'),
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.json$/i,
        type: 'asset/resource',
      },
      {
        test: /\.[jt](s|sx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: true,
      inject: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json' },
        { from: 'public/icons', to: 'icons' },
      ],
    }),
  ],
};

module.exports = config;
