const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack/webpack.dev');
const prodConfig = require('./webpack/webpack.prod');
const commonConfig = require('./webpack/webpack.common');
const manifest = require('./src/assets/manifest.json');

async function generateIcons() {
  const sizes = [16, 32, 48, 64, 96, 128, 256];
  const icon = await fs.promises.readFile(
    path.resolve(__dirname, 'src', 'assets', 'icon.svg'),
  );
  await fs.promises.mkdir(path.resolve(__dirname, 'dist', 'icons'));

  for (let i = 0; i < sizes.length; i += 1) {
    const size = sizes[i];

    // eslint-disable-next-line no-await-in-loop
    await sharp(icon, { density: 300 })
      .resize(size, size)
      .toFile(path.resolve(__dirname, 'dist', 'icons', `${size}.png`));

    manifest.icons[size] = `./icons/${size}.png`;
  }

  fs.promises.writeFile(
    path.resolve(__dirname, 'dist', 'manifest.json'),
    JSON.stringify(manifest),
  );
}

module.exports = async (env, { mode }) => {
  if (fs.existsSync('./dist/')) {
    await fs.promises.rm('./dist/', { recursive: true, force: true });
  }
  await fs.promises.mkdir('./dist');

  await generateIcons();

  const config = merge(
    commonConfig,
    mode === 'production' ? prodConfig : devConfig,
  );

  if (process.argv.includes('--analyze')) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
