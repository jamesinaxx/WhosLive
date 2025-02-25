import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import path from 'path';

import rules from './rspack.rules';

import { version, description, displayName } from '../package.json';

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
    new WebpackManifestPlugin({
      generate: (_seed, files) => {
        const baseManifest = {
          manifest_version: 2,
          version,
          description,
          name: displayName,
          browser_action: {
            default_popup: 'src/index.html',
            default_title: 'See who is live',
          },
          background: { scripts: ['BACKGROUND_SCRIPT'] },
          icons: {
            '16': 'src/assets/icons/16.png',
            '32': 'src/assets/icons/32.png',
            '48': 'src/assets/icons/48.png',
            '64': 'src/assets/icons/64.png',
            '96': 'src/assets/icons/96.png',
            '128': 'src/assets/icons/128.png',
            '256': 'src/assets/icons/256.png',
          },
          permissions: ['storage', 'alarms', '*://*.twitch.tv/*'],
          content_scripts: [
            {
              matches: ['*://nowlive.jewelexx.com/auth/callback'],
              js: ['CONTENT_SCRIPT'],
            },
          ],
        };

        const backgroundJs = files.find(({ name }) => name === 'background.js');
        const authcheckJs = files.find(({ name }) => name === 'authcheck.js');

        if (!backgroundJs) {
          throw new Error('background.js not found');
        }

        if (!authcheckJs) {
          throw new Error('authcheck.js not found');
        }

        baseManifest.background.scripts = [backgroundJs.path];
        baseManifest.content_scripts[0].js = [authcheckJs.path];

        return { ...baseManifest };
      },
    }),
  ],
});
