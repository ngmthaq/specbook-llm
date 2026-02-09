import { ipcRenderer } from 'electron';
import { Publisher } from '../../core/publisher';
import { VERSION_CHANNELS } from './version-channels';

export class VersionPublisher extends Publisher {
  public getAppVersion = (): Promise<string> => {
    return ipcRenderer.invoke(VERSION_CHANNELS.GET_APP_VERSION);
  };

  public getNodeVersion = (): Promise<string> => {
    return ipcRenderer.invoke(VERSION_CHANNELS.GET_NODE_VERSION);
  };

  public getElectronVersion = (): Promise<string> => {
    return ipcRenderer.invoke(VERSION_CHANNELS.GET_ELECTRON_VERSION);
  };

  public getChromeVersion = (): Promise<string> => {
    return ipcRenderer.invoke(VERSION_CHANNELS.GET_CHROME_VERSION);
  };
}
