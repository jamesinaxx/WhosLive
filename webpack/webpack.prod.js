const { DefinePlugin } = require('webpack');

// 1 Megabyte in bytes
const mb = 1048576;

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  output: {
    filename: '[name].js',
  },
  plugins: [
    new DefinePlugin({
      'process.env.PRODUCTION': 'true',
    }),
  ],
  performance: {
    maxEntrypointSize: mb,
    maxAssetSize: mb,
    hints: 'error',
  },
};

module.exports = config;
