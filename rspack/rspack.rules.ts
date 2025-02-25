import type { RuleSetRules } from '@rspack/core';

const rules: RuleSetRules = [
  {
    test: /\.css$/,
    use: [{ loader: 'postcss-loader', options: { postcssOptions: {} } }],
    type: 'css',
  },
  {
    test: /\.m?[jt]s$/,
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
    test: /\.[jt]sx$/,
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
];

export default rules;
