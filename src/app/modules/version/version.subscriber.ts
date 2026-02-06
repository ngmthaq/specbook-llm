import { ipcMain } from 'electron';
import { version } from '../../../../package.json';
import { BaseSubscriber, Subscriber } from '../../core';
import { VERSION_CHANNELS } from './version-channels';

export class VersionSubscriber extends BaseSubscriber implements Subscriber {
  public start() {
    this.onGetAppVersion();
    this.onGetNodeVersion();
    this.onGetElectronVersion();
    this.onGetChromeVersion();
  }

  private onGetAppVersion() {
    ipcMain.handle(VERSION_CHANNELS.GET_APP_VERSION, () => {
      return version;
    });
  }

  private onGetNodeVersion() {
    ipcMain.handle(VERSION_CHANNELS.GET_NODE_VERSION, () => {
      return process.versions.node;
    });
  }

  private onGetElectronVersion() {
    ipcMain.handle(VERSION_CHANNELS.GET_ELECTRON_VERSION, () => {
      return process.versions.electron;
    });
  }

  private onGetChromeVersion() {
    ipcMain.handle(VERSION_CHANNELS.GET_CHROME_VERSION, () => {
      return process.versions.chrome;
    });
  }
}
