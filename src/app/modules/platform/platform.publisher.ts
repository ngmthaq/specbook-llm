import { ipcRenderer } from 'electron';
import { PLATFORM_CHANNELS } from './platform-channels';

export class PlatformPublisher {
  public isDev = (): Promise<boolean> => {
    return ipcRenderer.invoke(PLATFORM_CHANNELS.IS_DEV);
  };

  public isMac = (): Promise<boolean> => {
    return ipcRenderer.invoke(PLATFORM_CHANNELS.IS_MAC);
  };

  public isWindows = (): Promise<boolean> => {
    return ipcRenderer.invoke(PLATFORM_CHANNELS.IS_WINDOWS);
  };

  public isLinux = (): Promise<boolean> => {
    return ipcRenderer.invoke(PLATFORM_CHANNELS.IS_LINUX);
  };
}
