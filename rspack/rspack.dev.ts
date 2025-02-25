import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

export default defineConfig({
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  plugins: [
    new ReactRefreshPlugin(),
    new rspack.HotModuleReplacementPlugin(),
    new rspack.DefinePlugin({ 'process.env.PRODUCTION': 'false' }),
  ],
});
