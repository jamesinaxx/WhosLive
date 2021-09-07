const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const rules = require('./webpack.rules');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    index: path.resolve(__dirname, '..', 'src/index.ts'),
    background: path.resolve(__dirname, '..', 'src/scripts/background.ts'),
    authcheck: path.resolve(__dirname, '..', 'src/scripts/authcheck.ts'),
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
    new HtmlWebpackPlugin({
      // prettier-ignore
      templateContent:
      `<html>
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title></title>
        </head>
        <body>
          <div id="root"></div>
          <script src="index.js"></script>
        </body>
      </html>`,
      minify: true,
      inject: false,
    }),
  ],
};

module.exports = config;
