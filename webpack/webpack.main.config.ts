import path from 'path';

import { CopyAppAssetsPlugin } from './copy-app-asset.plugin';
import { plugins } from './webpack.plugins';
import { rules } from './webpack.rules';

import type { Configuration } from 'webpack';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: path.resolve(__dirname, '../src/entry/index.ts'),
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [...plugins, new CopyAppAssetsPlugin()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
