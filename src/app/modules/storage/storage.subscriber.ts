import { ipcMain } from 'electron';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Configs } from '../../../entry/configs';
import { Subscriber } from '../../core/subscriber';
import { STORAGE_CHANNELS } from './storage-channels';

export class StorageSubscriber extends Subscriber {
  private storagePath: string;

  public constructor() {
    super();
    this.storagePath = path.join(Configs.userDataPath, 'jotai-storage.json');
  }

  public start = () => {
    this.ensureStorageFileExists();
    this.onGetItem();
    this.onSetItem();
    this.onRemoveItem();
  };

  private ensureStorageFileExists = async () => {
    try {
      const data = await fs.readFile(this.storagePath);
      JSON.parse(data.toString());
    } catch {
      await fs.rm(this.storagePath, { force: true });
      await fs.mkdir(path.dirname(this.storagePath), { recursive: true });
      await fs.writeFile(this.storagePath, '{}', 'utf-8');
    }
  };

  private readStorage = async (): Promise<Record<string, string>> => {
    try {
      const data = await fs.readFile(this.storagePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return {};
    }
  };

  private writeStorage = async (data: Record<string, string>): Promise<void> => {
    await fs.writeFile(this.storagePath, JSON.stringify(data, null, 2), 'utf-8');
  };

  private onGetItem = () => {
    ipcMain.handle(
      STORAGE_CHANNELS.GET_ITEM,
      async (event, key: string): Promise<string | null> => {
        const storage = await this.readStorage();
        return storage[key] ?? null;
      },
    );
  };

  private onSetItem = () => {
    ipcMain.handle(
      STORAGE_CHANNELS.SET_ITEM,
      async (event, key: string, value: string): Promise<void> => {
        const storage = await this.readStorage();
        storage[key] = value;
        await this.writeStorage(storage);
      },
    );
  };

  private onRemoveItem = () => {
    ipcMain.handle(STORAGE_CHANNELS.REMOVE_ITEM, async (event, key: string): Promise<void> => {
      const storage = await this.readStorage();
      delete storage[key];
      await this.writeStorage(storage);
    });
  };
}
