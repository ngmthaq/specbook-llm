import * as fs from 'fs/promises';
import * as path from 'path';

export class StorageHelper {
  public static ensureStorageFileExists = async (storagePath: string): Promise<void> => {
    try {
      const data = await fs.readFile(storagePath);
      JSON.parse(data.toString());
    } catch {
      await fs.rm(storagePath, { force: true });
      await fs.mkdir(path.dirname(storagePath), { recursive: true });
      await fs.writeFile(storagePath, '{}', 'utf-8');
    }
  };

  public static readStorage = async (storagePath: string): Promise<Record<string, string>> => {
    try {
      const data = await fs.readFile(storagePath);
      return JSON.parse(data.toString());
    } catch {
      return {};
    }
  };

  public static writeStorage = async (
    storagePath: string,
    data: Record<string, string>,
  ): Promise<void> => {
    await fs.writeFile(storagePath, JSON.stringify(data));
  };
}
