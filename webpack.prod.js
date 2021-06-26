const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { rmdirSync, existsSync } = require('fs');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * @type {webpack.Configuration}
 */
const config = {
	mode: 'production',
	entry: {
		index: './src/index.tsx',
	},
	output: {
		filename: '[name].js',
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
	resolve: {
		extensions,
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new ESLintPlugin({ extensions }),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: 'src/manifest.json',
				},
				{ from: 'public/icons', to: 'icons' },
				{
					from: 'public/scripts/background.js',
					to: 'scripts',
				},
			],
		}),
		new Dotenv({ path: './.env' }),
	],
	optimization: {
		minimizer: [`...`, new CssMinimizerPlugin(), new JsonMinimizerPlugin()],
	},
};

const configFunc = () => {
	if (existsSync('./dist/')) rmdirSync('./dist/', { recursive: true });
	return config;
};

module.exports = configFunc;
