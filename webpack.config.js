const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { rmdirSync, existsSync } = require('fs');

const args = process.argv.slice(2);

/**
 * @type {webpack.Configuration}
 */
const config = {
	mode:
		args[0].split('=')[1] === 'development' ? 'development' : 'production',
	entry: {
		bundle: './src/index.tsx',
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
			template: 'public/index.html',
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'public/chrome/manifest.json' },
				{ from: 'public/chrome/icons', to: 'icons' },
				{
					from: 'public/chrome/scripts/background.js',
					to: 'scripts',
				},
			],
		}),
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
	},
};

const configFunc = () => {
	if (existsSync('./dist/')) rmdirSync('./dist/', { recursive: true });

	if (config.mode === 'development') config.devtool = 'inline-source-map';

	return config;
};

module.exports = configFunc;
