/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, DefinePlugin } from 'webpack';

// 1 Megabyte in bytes
const mb = 1048576;

const config: Configuration = {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      'process.env.PRODUCTION': 'true',
    }),
  ],
  performance: {
    maxEntrypointSize: mb,
    maxAssetSize: mb,
    hints: 'error',
  },
};

export default config;
