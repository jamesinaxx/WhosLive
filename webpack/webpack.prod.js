const { merge } = require('webpack-merge');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const common = require('./webpack.common');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new Dotenv({ path: path.resolve(__dirname, '..', '.env') })],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin(), new JsonMinimizerPlugin()],
  },
};

module.exports = merge(common, config);
