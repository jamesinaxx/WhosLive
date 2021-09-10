import path from 'path';

export default [
  {
    test: /\.[jt](s|sx)$/,
    include: path.resolve(__dirname, '..', 'src'),
    use: ['babel-loader'],
  },
];
