import fs from 'fs';
import path from 'path';

import type { Compiler } from 'webpack';

/**
 * Custom webpack plugin to copy assets folder to .webpack output directory
 * Only runs for the main process
 */
export class CopyAppAssetsPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tap('CopyAssetsPlugin', () => {
      const sourceDir = path.resolve(__dirname, '../src/app/assets');
      const targetDir = path.resolve(compiler.outputPath || '.webpack', 'assets');

      // Check if source assets directory exists
      if (!fs.existsSync(sourceDir)) {
        return;
      }

      // Ensure target directory exists
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Recursively copy assets
      const copyRecursive = (src: string, dest: string) => {
        const files = fs.readdirSync(src);
        files.forEach((file) => {
          const srcPath = path.join(src, file);
          const destPath = path.join(dest, file);
          const stat = fs.statSync(srcPath);

          if (stat.isDirectory()) {
            if (!fs.existsSync(destPath)) {
              fs.mkdirSync(destPath, { recursive: true });
            }
            copyRecursive(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        });
      };

      copyRecursive(sourceDir, targetDir);
    });
  }
}
