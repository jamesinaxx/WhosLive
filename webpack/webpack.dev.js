const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common');
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
	mode: 'development',
	watch: true,
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	devtool: 'inline-source-map',
	plugins: [new Dotenv({ path: path.resolve(__dirname, '..', '.env.dev') })],
};

module.exports = merge(common, config);
