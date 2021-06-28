const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common');

/**
 * @type {webpack.Configuration}
 */
const config = {
	mode: 'production',
	plugins: [new ESLintPlugin({ extensions: ['.js', '.jsx', '.ts', '.tsx'] })],
	optimization: {
		minimizer: [`...`, new CssMinimizerPlugin(), new JsonMinimizerPlugin()],
	},
};

module.exports = merge(common, config);
