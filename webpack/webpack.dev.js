const Dotenv = require('dotenv-webpack');
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  plugins: [new Dotenv({ path: path.resolve(__dirname, '..', '.env.dev') })],
};

module.exports = config;
