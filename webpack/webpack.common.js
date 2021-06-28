const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

/**
 * @type {webpack.Configuration}
 */
const config = {
	entry: {
		index: resolve(__dirname, '..', 'src/index.tsx'),
	},
	output: {
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.json$/i,
				type: 'asset/resource',
			},
			{
				test: /\.[jt](s|sx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
				},
			],
		}),
		new Dotenv({ path: resolve(__dirname, '..', '.env') }),
		new MiniCssExtractPlugin(),
	],
};

module.exports = config;
