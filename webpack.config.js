const devConfig = require('./webpack/webpack.dev');
const prodConfig = require('./webpack/webpack.prod');
const { rmdirSync, existsSync } = require('fs');

const mode = process.argv[3];

const configFunc = () => {
	if (existsSync('./dist/')) rmdirSync('./dist/', { recursive: true });

	if (mode === 'development') return devConfig;
	return prodConfig;
};

module.exports = configFunc;
