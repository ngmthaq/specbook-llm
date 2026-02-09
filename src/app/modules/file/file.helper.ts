import * as fs from 'fs';
import * as path from 'path';
import { TreeNode } from '../../../shared/types/folderTree';
import { generateRandomString } from '../../../shared/utils/text';

export class FileHelper {
  public static isFolderEmpty = async (folderPath: string): Promise<boolean> => {
    try {
      const files = await fs.promises.readdir(folderPath);
      return files.length === 0;
    } catch {
      return false;
    }
  };

  public static createStructure = async (
    basePath: string,
    structure: TreeNode[],
  ): Promise<void> => {
    for (const item of structure) {
      const itemPath = path.join(basePath, item.name);
      if (item.type === 'folder') {
        await fs.promises.mkdir(itemPath, { recursive: true });
        if (item.children && item.children.length > 0) {
          await FileHelper.createStructure(itemPath, item.children);
        }
      } else {
        await fs.promises.writeFile(itemPath, '', 'utf-8');
      }
    }
  };

  public static readDirectoryStructure = async (dirPath: string): Promise<TreeNode[]> => {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const tree: TreeNode[] = [];

    for (const entry of entries) {
      // Skip hidden files/folders
      if (entry.name.startsWith('.')) continue;

      const fullPath = path.join(dirPath, entry.name);
      const hash = generateRandomString();

      if (entry.isDirectory()) {
        const children = await FileHelper.readDirectoryStructure(fullPath);
        tree.push({
          name: entry.name,
          type: 'folder',
          hash,
          children,
        });
      } else {
        tree.push({
          name: entry.name,
          type: 'file',
          hash,
        });
      }
    }

    // Sort: folders first, then files, alphabetically
    return tree.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'folder' ? -1 : 1;
    });
  };
}
