import { ipcRenderer } from 'electron';
import { Publisher } from '../../core/publisher';
import { STORAGE_CHANNELS } from './storage-channels';

export class StoragePublisher extends Publisher {
  public getItem = async (key: string): Promise<string | null> => {
    return ipcRenderer.invoke(STORAGE_CHANNELS.GET_ITEM, key);
  };

  public setItem = async (key: string, value: string): Promise<void> => {
    return ipcRenderer.invoke(STORAGE_CHANNELS.SET_ITEM, key, value);
  };

  public removeItem = async (key: string): Promise<void> => {
    return ipcRenderer.invoke(STORAGE_CHANNELS.REMOVE_ITEM, key);
  };
}
