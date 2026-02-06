import { app, BrowserWindow, Menu, Tray } from 'electron';
import { Configs } from '../../../entry/configs';

export class AppSubscriber {
  public start(preload: string, webUrl: string) {
    this.onAppReady(preload, webUrl);
    this.onActivate(preload, webUrl);
    this.onWindowAllClosed();
  }

  private onAppReady(preload: string, webUrl: string) {
    app.on('ready', () => {
      this.createMainWindow(preload, webUrl);
      this.createTray();
    });
  }

  private onActivate(preload: string, webUrl: string) {
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow(preload, webUrl);
        this.createTray();
      } else {
        Configs.mainWindow?.show();
      }
    });
  }

  private onWindowAllClosed() {
    app.on('window-all-closed', () => {
      if (Configs.isDev) {
        process.exit(0);
      } else if (!Configs.isMac) {
        app.quit();
      }
    });
  }

  private createMainWindow(preload: string, webUrl: string) {
    if (!Configs.mainWindow) {
      Configs.mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        minWidth: 1200,
        minHeight: 800,
        webPreferences: { preload: preload },
      });

      Configs.mainWindow.loadURL(webUrl);

      Configs.mainWindow.on('close', (event) => {
        if (!Configs.isDev && !Configs.isForceQuit) {
          event.preventDefault();
          Configs.mainWindow?.hide();
        }
      });
    }

    return Configs.mainWindow;
  }

  private createTray() {
    if (!Configs.tray) {
      Configs.tray = new Tray(Configs.trayIcon);
      Configs.tray.setToolTip(`${Configs.appName} - ${Configs.appVersion}`);

      const menu = Menu.buildFromTemplate([
        {
          label: 'Open',
          click: () => {
            Configs.mainWindow?.show();
          },
        },
        {
          label: 'Quit',
          click: () => {
            Configs.isForceQuit = true;
            app.quit();
          },
        },
      ]);

      Configs.tray.setContextMenu(menu);
    }

    return Configs.tray;
  }
}
