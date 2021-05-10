const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { rmdirSync, existsSync } = require('fs');

/**
 * @type {webpack.Configuration}
 */
const config = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
	},
	devtool: 'inline-source-map',
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
			patterns: [{ from: 'public/chrome' }],
		}),
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
	},
};

const configFunc = () => {
	if (existsSync('./dist/')) rmdirSync('./dist/', { recursive: true });
	return config;
};

module.exports = configFunc;
