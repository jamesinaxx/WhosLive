import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import rules from './rspack.rules';
import path from 'path';

const srcDir = path.resolve(__dirname, '..', 'src');

export default defineConfig({
  entry: {
    index: path.resolve(srcDir, 'index'),
    background: path.resolve(srcDir, 'scripts', 'background'),
    authcheck: path.resolve(srcDir, 'scripts', 'authcheck'),
  },
  output: { filename: '[name].[contenthash].js' },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.html', '.wasm', '.svg'],
  },
  experiments: { css: true },
  module: { rules },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
      minify: true,
      inject: true,
      chunks: ['index'],
    }),
  ],
});
