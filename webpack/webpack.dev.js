const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

/**
 * @type {webpack.Configuration}
 */
const config = {
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
};

module.exports = merge(common, config);
