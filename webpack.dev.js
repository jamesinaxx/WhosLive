const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { rmdirSync, existsSync } = require('fs');

/**
 * @type {webpack.Configuration}
 */
const config = {
	mode: 'development',
	watch: true,
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
				{ from: 'src/manifest.json' },
				{ from: 'public/icons', to: 'icons' },
				{
					from: 'public/scripts/background.js',
					to: 'scripts',
				},
			],
		}),
		new Dotenv({ path: './.env' }),
	],
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
};

const configFunc = () => {
	if (existsSync('./dist/')) rmdirSync('./dist/', { recursive: true });

	return config;
};

module.exports = configFunc;
