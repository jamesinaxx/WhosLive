const fs = require('fs');
const devConfig = require('./webpack/webpack.dev');
const prodConfig = require('./webpack/webpack.prod');

const configFunc = async (env, { mode }) => {
  if (fs.existsSync('./dist/')) {
    await fs.promises.rm('./dist/', { recursive: true, force: true });
  }

  if (mode === 'development') return devConfig;
  return prodConfig;
};

module.exports = configFunc;
