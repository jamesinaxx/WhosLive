const devConfig = require('./webpack/webpack.dev');
const prodConfig = require('./webpack/webpack.prod');
const { rmdirSync, existsSync } = require('fs');

const configFunc = (env, { mode }) => {
	if (existsSync('./dist/')) rmdirSync('./dist/', { recursive: true });

	if (mode === 'development') return devConfig;
	return prodConfig;
};

module.exports = configFunc;
