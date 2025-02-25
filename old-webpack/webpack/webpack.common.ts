/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from 'webpack';
import DotenvPlugin from 'dotenv-webpack';
import path from 'path';
import EslintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import type { FileDescriptor } from 'webpack-manifest-plugin/dist/helpers';
import rules from './webpack.rules';

const config: Configuration = {
  entry: {
    index: path.resolve(__dirname, '..', 'src', 'index'),
    background: path.resolve(__dirname, '..', 'src', 'scripts', 'background'),
    authcheck: path.resolve(__dirname, '..', 'src', 'scripts', 'authcheck'),
  },
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules,
  },
  plugins: [
    new EslintPlugin({ eslintPath: require.resolve('eslint') }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'template.html'),
      minify: true,
      inject: true,
      chunks: ['index'],
    }),
    new DotenvPlugin({
      path: path.resolve(__dirname, '..', '.env'),
    }) as never,
    new WebpackManifestPlugin({
      generate: (_seed, files) => {
        const {
          version,
          description,
          displayName,
          // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
        } = require('../package.json');

        const baseManifest = {
          version,
          description,
          name: displayName,
          manifest_version: 3,
          action: {
            default_popup: 'index.html',
            default_title: 'See who is live',
          },
          minimum_chrome_version: '88',
          background: {
            service_worker: 'SERVICE_WORKER',
          },
          icons: {
            16: 'icons/16.png',
            32: 'icons/32.png',
            48: 'icons/48.png',
            64: 'icons/64.png',
            96: 'icons/96.png',
            128: 'icons/128.png',
            256: 'icons/256.png',
          },
          permissions: ['storage', 'alarms'],
          host_permissions: ['*://*.twitch.tv/*'],
          content_scripts: [
            {
              matches: ['*://nowlive.jewelexx.com/auth/callback'],
              js: ['CONTENT_SCRIPT'],
            },
          ],
        };

        const newFiles = files.map((file) => ({
          ...file,
          path: file.path.replace('auto', ''),
        }));

        const backgroundJs = newFiles.find(
          ({ name }) => name === 'background.js',
        ) as FileDescriptor;
        const authcheckJs = newFiles.find(
          ({ name }) => name === 'authcheck.js',
        ) as FileDescriptor;

        baseManifest.background.service_worker = backgroundJs.path;
        baseManifest.content_scripts[0].js = [authcheckJs.path];

        return { ...baseManifest } as never;
      },
    }),
  ],
};

export default config;
