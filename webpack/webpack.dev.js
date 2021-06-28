const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { join, resolve } = require('path');

/**
 * @type {webpack.Configuration}
 */
const config = {
	mode: 'development',
	watch: true,
	entry: {
		index: resolve(__dirname, '..', 'src/index.tsx'),
	},
	output: {
		filename: '[name].js',
	},
	module: {
		rules: [
			// First Rule
			{
				test: /\.[jt](s|sx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},

			// Second Rule
			{
				test: /\.s[ac]ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'manifest.json' },
				{ from: 'public/icons', to: 'icons' },
				{
					from: 'public/scripts/background.js',
					to: 'scripts',
				},
			],
		}),
		new Dotenv({ path: resolve(__dirname, '..', '.env') }),
	],
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
};

module.exports = config;
