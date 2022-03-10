import path from 'path';

export default [
  {
    test: /\.m?[jt]sx?$/,
    include: path.resolve(__dirname, '..', 'src'),
    use: ['swc-loader'],
  },
];
