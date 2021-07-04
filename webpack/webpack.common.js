const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

/**
 * @type {webpack.Configuration}
 */
const config = {
	entry: {
		index: path.resolve(__dirname, '..', 'src/index.tsx'),
		background: path.resolve(__dirname, '..', 'src/scripts/background.ts'),
	},
	output: {
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@': path.resolve(__dirname, '..', 'src'),
			'@styles': path.resolve(__dirname, '..', 'src/styles'),
			'@components': path.resolve(__dirname, '..', 'src/components'),
			'@lib': path.resolve(__dirname, '..', 'src/lib'),
			'@pages': path.resolve(__dirname, '..', 'src/pages'),
			'@public': path.resolve(__dirname, '..', 'public'),
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
		},
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
			],
		}),
		new Dotenv({ path: path.resolve(__dirname, '..', '.env') }),
	],
};

module.exports = config;
