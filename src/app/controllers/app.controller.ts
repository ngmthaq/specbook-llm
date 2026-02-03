import { app, BrowserWindow, Menu, Tray } from 'electron';
import { Singleton } from '../../entry/singleton';

export class AppController {
  public createWindow(preload: string, webUrl: string) {
    if (!Singleton.mainWindow) {
      Singleton.mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        minWidth: 1200,
        minHeight: 800,
        webPreferences: { preload: preload },
      });

      Singleton.mainWindow.loadURL(webUrl);

      Singleton.mainWindow.on('close', (event) => {
        if (!Singleton.isDev && !Singleton.isForceQuit) {
          event.preventDefault();
          Singleton.mainWindow?.hide();
        }
      });
    }

    return Singleton.mainWindow;
  }

  public createTray() {
    if (!Singleton.tray) {
      Singleton.tray = new Tray(Singleton.trayIcon);
      Singleton.tray.setToolTip(`${Singleton.appName} - ${Singleton.appVersion}`);

      const menu = Menu.buildFromTemplate([
        {
          label: 'Open',
          click: () => {
            Singleton.mainWindow?.show();
          },
        },
        {
          label: 'Quit',
          click: () => {
            Singleton.isForceQuit = true;
            app.quit();
          },
        },
      ]);

      Singleton.tray.setContextMenu(menu);
    }

    return Singleton.tray;
  }
}

export const appController = new AppController();
