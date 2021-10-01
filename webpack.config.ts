/// <reference types="node" />
import { Configuration } from 'webpack';
import rimraf from 'rimraf';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import devConfig from './webpack/webpack.dev';
import prodConfig from './webpack/webpack.prod';
import commonConfig from './webpack/webpack.common';

const distDir = path.resolve(__dirname, 'dist');

interface CliConfigOptions {
  config?: string | undefined;
  mode?: Configuration['mode'] | undefined;
  env?: string | undefined;
  'config-register'?: string | undefined;
  configRegister?: string | undefined;
  'config-name'?: string | undefined;
  configName?: string | undefined;
}

type ConfigurationFactory = (
  env: string | Record<string, boolean | number | string> | undefined,
  args: CliConfigOptions,
) => Configuration | Promise<Configuration>;

const generateIcons = async () => {
  const sizes = [16, 32, 48, 64, 96, 128, 256];
  const icon = await fs.readFile(
    path.resolve(__dirname, 'src', 'assets', 'icon.svg'),
  );
  await fs.mkdir(path.resolve(distDir, 'icons'));

  const icons = await sizes.reduce(async (prev, size) => {
    await sharp(icon, { density: 300 })
      .resize(size, size)
      .toFile(path.resolve(distDir, 'icons', `${size}.png`));

    return { ...(await prev), [size]: `./icons/${size}.png` };
  }, Promise.resolve({}));

  const { version, description, displayName } = await import('./package.json');

  const manifest = {
    ...(await import('./src/assets/manifest.json')).default,
    icons,
    version,
    description,
    name: displayName,
  };

  fs.writeFile(
    path.resolve(distDir, 'manifest.json'),
    JSON.stringify(manifest),
  );
};

const configuration: ConfigurationFactory = async (_env, { mode }) => {
  await (await import('util')).promisify(rimraf)(distDir);

  await fs.mkdir(distDir);
  await generateIcons();

  const config = (await import('webpack-merge')).merge(
    commonConfig,
    mode === 'production' ? prodConfig : devConfig,
  );

  if (process.argv.includes('--analyze')) {
    const { BundleAnalyzerPlugin } = await import('webpack-bundle-analyzer')
    config.plugins?.push(new BundleAnalyzerPlugin());
  }

  return config;
};

export default configuration;
