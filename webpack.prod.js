const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { rmdirSync, existsSync } = require('fs');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * @type {webpack.Configuration}
 */
const config = {
	mode: 'production',
	entry: {
		bundle: './src/index.tsx',
	},
	output: {
		filename: '[name].js',
	},
	module: {
		rules: [
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
	resolve: {
		extensions,
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new ESLintPlugin({ extensions }),
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
	optimization: {
		minimizer: [`...`, new CssMinimizerPlugin()],
	},
};

const configFunc = () => {
	if (existsSync('./dist/')) rmdirSync('./dist/', { recursive: true });
	return config;
};

module.exports = configFunc;
