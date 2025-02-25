import { defineConfig } from '@rspack/cli';
import rspack from '@rspack/core';

// 1 Megabyte in bytes
const MB = 1048576;

export default defineConfig({
  mode: 'production',
  plugins: [new rspack.DefinePlugin({ 'process.env.PRODUCTION': 'true' })],
  performance: { maxEntrypointSize: MB, maxAssetSize: MB, hints: 'warning' },
});
