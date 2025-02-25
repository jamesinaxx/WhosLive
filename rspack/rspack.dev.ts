import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

export default defineConfig({
  mode: 'development',

  plugins: [new ReactRefreshPlugin(), new rspack.HotModuleReplacementPlugin()],
});
