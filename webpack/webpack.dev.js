const { DefinePlugin } = require('webpack');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.PRODUCTION': 'false',
    }),
  ],
};

module.exports = config;
