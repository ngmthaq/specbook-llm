import { app, nativeImage } from 'electron';
import path from 'path';

export class Configs {
  public static mainWindow: Electron.BrowserWindow | null = null;

  public static tray: Electron.Tray | null = null;

  public static trayIconPath = path.resolve(__dirname, './assets/img/electron.png');

  public static trayIcon = nativeImage
    .createFromPath(Configs.trayIconPath)
    .resize({ width: 16, height: 16 });

  public static isDev = !app.isPackaged;

  public static isWindows = process.platform === 'win32';

  public static isMac = process.platform === 'darwin';

  public static isLinux = process.platform === 'linux';

  public static isForceQuit = false;

  public static appName = app.getName();

  public static appVersion = app.getVersion();

  public static devUserDataPath = path.resolve(__dirname, '../../development_files/userData');

  public static userDataPath = Configs.isDev ? Configs.devUserDataPath : app.getPath('userData');

  public static devTempPath = path.resolve(__dirname, '../../development_files/temp');

  public static tempPath = Configs.isDev ? Configs.devTempPath : app.getPath('temp');

  public static devLogPath = path.resolve(__dirname, '../../development_files/logs');

  public static logPath = Configs.isDev ? Configs.devLogPath : app.getPath('logs');
}
