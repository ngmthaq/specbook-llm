import { ipcMain } from 'electron';
import * as path from 'path';
import { Configs } from '../../../entry/configs';
import { Subscriber } from '../../core/subscriber';
import { STORAGE_CHANNELS } from './storage-channels';
import { StorageHelper } from './storage.helper';

export class StorageSubscriber extends Subscriber {
  private storagePath: string;

  public constructor() {
    super();
    this.storagePath = path.join(Configs.userDataPath, 'jotai-storage.json');
  }

  public start = () => {
    StorageHelper.ensureStorageFileExists(this.storagePath);
    this.onGetItem();
    this.onSetItem();
    this.onRemoveItem();
  };

  private onGetItem = () => {
    ipcMain.handle(
      STORAGE_CHANNELS.GET_ITEM,
      async (event, key: string): Promise<string | null> => {
        const storage = await StorageHelper.readStorage(this.storagePath);
        return storage[key] ?? null;
      },
    );
  };

  private onSetItem = () => {
    ipcMain.handle(
      STORAGE_CHANNELS.SET_ITEM,
      async (event, key: string, value: string): Promise<void> => {
        const storage = await StorageHelper.readStorage(this.storagePath);
        storage[key] = value;
        await StorageHelper.writeStorage(this.storagePath, storage);
      },
    );
  };

  private onRemoveItem = () => {
    ipcMain.handle(STORAGE_CHANNELS.REMOVE_ITEM, async (event, key: string): Promise<void> => {
      const storage = await StorageHelper.readStorage(this.storagePath);
      delete storage[key];
      await StorageHelper.writeStorage(this.storagePath, storage);
    });
  };
}
