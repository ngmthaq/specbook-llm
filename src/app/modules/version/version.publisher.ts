import { ipcRenderer } from 'electron';
import { BasePublisher, Publisher } from '../../core';
import { VERSION_CHANNELS } from './version-channels';

export class VersionPublisher extends BasePublisher implements Publisher {
  public emitGetAppVersion(): Promise<string> {
    return ipcRenderer.invoke(VERSION_CHANNELS.GET_APP_VERSION);
  }

  public emitGetNodeVersion(): Promise<string> {
    return ipcRenderer.invoke(VERSION_CHANNELS.GET_NODE_VERSION);
  }

  public emitGetElectronVersion(): Promise<string> {
    return ipcRenderer.invoke(VERSION_CHANNELS.GET_ELECTRON_VERSION);
  }

  public emitGetChromeVersion(): Promise<string> {
    return ipcRenderer.invoke(VERSION_CHANNELS.GET_CHROME_VERSION);
  }
}
