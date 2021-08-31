const fs = require('fs');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack/webpack.dev');
const prodConfig = require('./webpack/webpack.prod');
const commonConfig = require('./webpack/webpack.common');

module.exports = async (env, { mode }) => {
  if (fs.existsSync('./dist/')) {
    await fs.promises.rm('./dist/', { recursive: true, force: true });
  }

  const config = merge(
    commonConfig,
    mode === 'production' ? prodConfig : devConfig,
  );

  if (process.argv.includes('--analyze')) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
