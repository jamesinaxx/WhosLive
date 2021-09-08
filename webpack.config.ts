import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import devConfig from './webpack/webpack.dev';
import prodConfig from './webpack/webpack.prod';
import commonConfig from './webpack/webpack.common';
import manifestWeak from './manifest.json';

// Definitely typed so that Typescript doesn't throw errors
const manifest: { icons: { [key: string]: string } } = { ...manifestWeak };

async function generateIcons() {
  const sizes = [16, 32, 48, 64, 96, 128, 256];
  const icon = await fs.promises.readFile(
    path.resolve(__dirname, 'assets', 'icon.svg'),
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

type ConfigFunction = (
  env: unknown,
  argv: { mode: 'production' | 'development'; analyze?: true | undefined },
) => Promise<webpack.Configuration>;

const configFunction: ConfigFunction = async (_env, argv) => {
  if (fs.existsSync('./dist/')) {
    await fs.promises.rm('./dist/', { recursive: true, force: true });
  }
  await fs.promises.mkdir('./dist');

  await generateIcons();

  const config = merge(
    commonConfig,
    argv.mode === 'production' ? prodConfig : devConfig,
  );

  if (argv.analyze) {
    config.plugins?.push(new BundleAnalyzerPlugin());
  }

  return config;
};

export default configFunction;
