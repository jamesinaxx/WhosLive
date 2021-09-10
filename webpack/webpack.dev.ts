import { Configuration, DefinePlugin } from 'webpack';

const config: Configuration = {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.PRODUCTION': 'false',
    }),
  ],
};

export default config;
