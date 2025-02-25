const ReactCompilerConfig = {
  /* ... */
};

export default function (api) {
  api.cache(true);
  return {
    plugins: [
      ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
      '@babel/plugin-syntax-jsx',
      ['@babel/plugin-syntax-typescript', { isTSX: true }],
    ],
  };
}
