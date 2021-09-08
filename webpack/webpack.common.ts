import { DefinePlugin, Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import rules from './webpack.rules';
import configJSON from '../config.json';

const config: Configuration = {
  entry: {
    index: path.resolve(__dirname, '..', 'src', 'index'),
    background: path.resolve(__dirname, '..', 'src', 'scripts', 'background'),
    authcheck: path.resolve(__dirname, '..', 'src', 'scripts', 'authcheck'),
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  module: {
    rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // prettier-ignore
      template: path.resolve(__dirname, '..', 'src', 'template.html'),
      minify: true,
      inject: false,
    }),
    new DefinePlugin({
      'process.env.CLIENTID': configJSON.clientId,
      'process.env.CLIENTSECRET': configJSON.clientSecret,
    }),
  ],
};

export default config;
