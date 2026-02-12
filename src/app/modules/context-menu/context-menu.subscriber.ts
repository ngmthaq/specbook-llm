import { BrowserWindow, ipcMain } from 'electron';
import {
  OpenFileNodeContextMenuPayload,
  OpenFolderNodeContextMenuPayload,
  OpenFolderTreeContextMenuPayload,
} from '../../../shared/types/contextMenu';
import { Subscriber } from '../../core/subscriber';
import { CONTEXT_MENU_CHANNELS } from './context-menu-channels';
import { ContextMenuTemplates } from './context-menu-templates';

export class ContextMenuSubscriber extends Subscriber {
  public start = () => {
    this.onOpenFolderTreeContextMenu();
    this.onOpenFolderNodeContextMenu();
    this.onOpenFileNodeContextMenu();
  };

  private onOpenFolderTreeContextMenu = () => {
    ipcMain.handle(
      CONTEXT_MENU_CHANNELS.OPEN_FOLDER_TREE_CONTEXT_MENU,
      async (event, payload: OpenFolderTreeContextMenuPayload) => {
        const window = BrowserWindow.fromWebContents(event.sender);
        if (window) {
          const menu = ContextMenuTemplates.createFolderTreeContextMenu(window);
          menu.popup({ window, x: payload.x, y: payload.y });
        }
      },
    );
  };

  private onOpenFolderNodeContextMenu = () => {
    ipcMain.handle(
      CONTEXT_MENU_CHANNELS.OPEN_FOLDER_NODE_CONTEXT_MENU,
      async (event, payload: OpenFolderNodeContextMenuPayload) => {
        const window = BrowserWindow.fromWebContents(event.sender);
        if (window) {
          const menu = ContextMenuTemplates.createFolderNodeContextMenu(window, payload.folderPath);
          menu.popup({ window, x: payload.x, y: payload.y });
        }
      },
    );
  };

  private onOpenFileNodeContextMenu = () => {
    ipcMain.handle(
      CONTEXT_MENU_CHANNELS.OPEN_FILE_NODE_CONTEXT_MENU,
      async (event, payload: OpenFileNodeContextMenuPayload) => {
        const window = BrowserWindow.fromWebContents(event.sender);
        if (window) {
          const menu = ContextMenuTemplates.createFileNodeContextMenu(window, payload.filePath);
          menu.popup({ window, x: payload.x, y: payload.y });
        }
      },
    );
  };
}
