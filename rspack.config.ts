import { RspackOptions } from '@rspack/core';
import fs from 'fs';

import path from 'path';

import commonConfig from './rspack/rspack.common';
import devConfig from './rspack/rspack.dev';
import prodConfig from './rspack/rspack.prod';
import merge from 'webpack-merge';

const distDir = path.resolve(__dirname, 'dist');

interface CliConfigOptions {
  config?: string | undefined;
  mode?: RspackOptions['mode'] | undefined;
  env?: string | undefined;
  'config-register'?: string | undefined;
  configRegister?: string | undefined;
  'config-name'?: string | undefined;
  configName?: string | undefined;
}

function factory(
  env: string | Record<string, boolean | number | string> | undefined,
  { mode }: CliConfigOptions,
): RspackOptions {
  if (mode === 'production') {
    fs.rmSync(distDir, { recursive: true, force: true });
  }

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  fs.cpSync(
    path.resolve(__dirname, 'src', 'assets', 'icons'),
    path.resolve(distDir, 'icons'),
    { recursive: true, force: true },
  );

  const config = merge(
    commonConfig,
    mode === 'production' ? prodConfig : devConfig,
  );

  return config;
}

export default factory;
