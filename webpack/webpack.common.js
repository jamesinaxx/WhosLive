const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const rules = require('./webpack.rules');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    index: path.resolve(__dirname, '..', 'src', 'index'),
    background: path.resolve(__dirname, '..', 'src', 'scripts', 'background'),
    authcheck: path.resolve(__dirname, '..', 'src', 'scripts', 'authcheck'),
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  module: {
    rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // prettier-ignore
      template: path.resolve(__dirname, '..', 'src', 'template.html'),
      minify: true,
      inject: false,
    }),
    new DefinePlugin({
      'process.env.CLIENTID': require('../config.json').clientId,
      'process.env.CLIENTSECRET': require('../config.json').clientSecret,
    }),
  ],
};

module.exports = config;
