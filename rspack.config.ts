import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.html', '.wasm', '.svg'],
  },
  experiments: { css: true },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'postcss-loader', options: { postcssOptions: {} } }],
        type: 'css',
      },
      {
        test: /\.(js|ts)$/,
        exclude: [/[\\/]node_modules[\\/]/],
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: { parser: { syntax: 'typescript' }, externalHelpers: true },
            },
          },
        ],
      },
      {
        test: /\.(jsx|tsx)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: { syntax: 'typescript', tsx: true },
                externalHelpers: true,
                transform: { react: { runtime: 'automatic' } },
              },
            },
          },
          { loader: 'babel-loader' },
        ],
      },
      { test: /\.(png|svg|jpg)$/, type: 'asset/resource' },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './src/index.html' }),
    isDev && new ReactRefreshPlugin(),
    isDev && new rspack.HotModuleReplacementPlugin(),
  ],
});
