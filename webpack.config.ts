/// <reference types="node" />
import type { Configuration } from 'webpack';
import { existsSync as exists } from 'fs';
import { merge } from 'webpack-merge';
import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import commonConfig from './webpack/webpack.common';
import prodConfig from './webpack/webpack.prod';
import devConfig from './webpack/webpack.dev';

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

  await Promise.all(
    sizes.map((size) =>
      sharp(icon, { density: 300 })
        .resize(size, size)
        .toFile(
          path.resolve(__dirname, 'src', 'assets', 'icons', `${size}.png`),
        ),
    ),
  );
};

const configuration: ConfigurationFactory = async (_env, { mode }) => {
  if (!exists(distDir)) {
    await fs.mkdir(distDir);
  }

  await generateIcons();
  fs.cp(
    path.resolve(__dirname, 'src', 'assets', 'icons'),
    path.resolve(distDir, 'icons'),
    { recursive: true, force: true },
  );

  const config = merge(
    commonConfig,
    mode === 'production' ? prodConfig : devConfig,
  );

  if (process.argv.includes('--analyze')) {
    const { BundleAnalyzerPlugin } = await import('webpack-bundle-analyzer');
    config.plugins?.push(new BundleAnalyzerPlugin());
  }

  return config;
};

export default configuration;
