/// <reference types="node" />
import { Configuration } from 'webpack';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import devConfig from './webpack/webpack.dev';
import prodConfig from './webpack/webpack.prod';
import commonConfig from './webpack/webpack.common';
import oldManifest from './src/assets/manifest.json';

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
  const icon = await fs.promises.readFile(
    path.resolve(__dirname, 'src', 'assets', 'icon.svg'),
  );
  await fs.promises.mkdir(path.resolve(__dirname, 'dist', 'icons'));

  const icons = await sizes.reduce(async (prev, size) => {
    await sharp(icon, { density: 300 })
      .resize(size, size)
      .toFile(path.resolve(__dirname, 'dist', 'icons', `${size}.png`));

    return { ...(await prev), [size]: `./icons/${size}.png` };
  }, Promise.resolve({}));

  const { version, description, name } = await import('./package.json');

  const manifest = {
    ...oldManifest,
    icons,
    version,
    description,
    name,
  };

  fs.promises.writeFile(
    path.resolve(__dirname, 'dist', 'manifest.json'),
    JSON.stringify(manifest),
  );
};

const configuration: ConfigurationFactory = async (env, { mode }) => {
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
    config.plugins?.push(new BundleAnalyzerPlugin());
  }

  return config;
};

export default configuration;
