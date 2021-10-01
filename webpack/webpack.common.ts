import { Configuration } from 'webpack';
import path from 'path';
import DotenvPlugin from 'dotenv-webpack';
import EslintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import rules from './webpack.rules';

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
    new DotenvPlugin({ path: path.resolve(__dirname, '..', '.env') }),
  ],
};

export default config;
