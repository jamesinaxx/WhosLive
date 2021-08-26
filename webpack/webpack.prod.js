const { merge } = require('webpack-merge');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const common = require('./webpack.common');

// 1 Megabyte in bytes
const mb = 1048576;

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  plugins: [new Dotenv({ path: path.resolve(__dirname, '..', '.env') })],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin(), new JsonMinimizerPlugin()],
  },
  performance: {
    maxEntrypointSize: mb,
    maxAssetSize: mb,
    hints: 'error',
  },
};

module.exports = merge(common, config);
