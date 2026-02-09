import { ipcMain } from 'electron';
import { Configs } from '../../../entry/configs';
import { Subscriber } from '../../core/subscriber';
import { PLATFORM_CHANNELS } from './platform-channels';

export class PlatformSubscriber extends Subscriber {
  public start = () => {
    this.onIsDev();
    this.onIsMac();
    this.onIsWindows();
    this.onIsLinux();
  };

  private onIsDev = () => {
    ipcMain.handle(PLATFORM_CHANNELS.IS_DEV, () => {
      return Configs.isDev;
    });
  };

  private onIsMac = () => {
    ipcMain.handle(PLATFORM_CHANNELS.IS_MAC, () => {
      return Configs.isMac;
    });
  };

  private onIsWindows = () => {
    ipcMain.handle(PLATFORM_CHANNELS.IS_WINDOWS, () => {
      return Configs.isWindows;
    });
  };

  private onIsLinux = () => {
    ipcMain.handle(PLATFORM_CHANNELS.IS_LINUX, () => {
      return Configs.isLinux;
    });
  };
}
