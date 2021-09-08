const path = require('path');

module.exports = [
  {
    test: /\.[jt](s|sx)$/,
    include: path.resolve(__dirname, '..', 'src'),
    use: ['babel-loader'],
  },
];
