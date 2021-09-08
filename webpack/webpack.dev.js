const { DefinePlugin } = require('webpack');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js',
  },
  watch: true,
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.PRODUCTION': 'false',
    }),
  ],
};

module.exports = config;
