import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const electronAPI = window.electronAPI;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jotaiStorage = createJSONStorage<any>(() => ({
  getItem: async (key: string): Promise<string | null> => {
    return electronAPI.storagePublisher.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await electronAPI.storagePublisher.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    await electronAPI.storagePublisher.removeItem(key);
  },
}));

export function atomWithElectronStorage<T>(key: string, initialValue: T) {
  return atomWithStorage<T>(key, initialValue, jotaiStorage);
}
