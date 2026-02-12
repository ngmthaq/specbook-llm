import { BrowserWindow, Menu } from 'electron';
import { MAIN_TO_RENDERER_EVENTS } from '../../../shared/configs/events';

export class ContextMenuTemplates {
  public static createFolderTreeContextMenu = (window: BrowserWindow) => {
    return Menu.buildFromTemplate([
      {
        label: 'Create new file here',
        click: () => {
          window.webContents.send(MAIN_TO_RENDERER_EVENTS.CREATE_FILE);
        },
      },
      {
        label: 'Create new folder here',
        click: () => {
          window.webContents.send(MAIN_TO_RENDERER_EVENTS.CREATE_FOLDER);
        },
      },
    ]);
  };

  public static createFolderNodeContextMenu = (window: BrowserWindow, folderPath: string) => {
    return Menu.buildFromTemplate([
      {
        label: 'Create new file here',
        click: () => {
          window.webContents.send(MAIN_TO_RENDERER_EVENTS.CREATE_FILE, folderPath);
        },
      },
      {
        label: 'Create new folder here',
        click: () => {
          window.webContents.send(MAIN_TO_RENDERER_EVENTS.CREATE_FOLDER, folderPath);
        },
      },
      { type: 'separator' },
      {
        label: 'Rename this folder',
        click: () => {
          window.webContents.send(MAIN_TO_RENDERER_EVENTS.RENAME_FOLDER, folderPath);
        },
      },
      {
        label: 'Delete this folder',
        click: () => {
          window.webContents.send(MAIN_TO_RENDERER_EVENTS.DELETE_FOLDER, folderPath);
        },
      },
    ]);
  };

  public static createFileNodeContextMenu = (window: BrowserWindow, filePath: string) => {
    return Menu.buildFromTemplate([
      {
        label: 'Rename this file',
        click: () => {
          window.webContents.send(MAIN_TO_RENDERER_EVENTS.RENAME_FILE, filePath);
        },
      },
      {
        label: 'Delete this file',
        click: () => {
          window.webContents.send(MAIN_TO_RENDERER_EVENTS.DELETE_FILE, filePath);
        },
      },
    ]);
  };
}
