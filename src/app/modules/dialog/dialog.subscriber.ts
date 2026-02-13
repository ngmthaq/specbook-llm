import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { Configs } from '../../../entry/configs';
import {
  MAIN_TO_RENDERER_EVENTS,
  RENDERER_TO_RENDERER_EVENTS,
} from '../../../shared/configs/events';
import { Subscriber } from '../../core/subscriber';
import { DIALOG_CHANNELS } from './dialog-channels';

export class DialogSubscriber extends Subscriber {
  public start = () => {
    this.onPrompt();
  };

  private onPrompt = () => {
    ipcMain.handle(
      DIALOG_CHANNELS.OPEN_PROMPT_DIALOG,
      async (event, message: string, defaultValue?: string): Promise<string | null> => {
        const uniqueId = `${Date.now()}-${Math.random()}`;
        const uniqueResponseEvent = `${RENDERER_TO_RENDERER_EVENTS.PROMPT_RESPONSE}-${uniqueId}`;

        const promptWindow = new BrowserWindow({
          width: 400,
          height: 150,
          parent: BrowserWindow.fromWebContents(event.sender) || Configs.mainWindow,
          modal: true,
          show: false,
          resizable: false,
          minimizable: false,
          maximizable: false,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          },
        });
        const params = new URLSearchParams({
          initPromptEvent: MAIN_TO_RENDERER_EVENTS.INIT_PROMPT,
          responseEvent: uniqueResponseEvent,
        });
        promptWindow.loadURL(
          `file://${path.resolve(__dirname, './assets/html/prompt.html')}?${params.toString()}`,
        );
        promptWindow.webContents.once('did-finish-load', () => {
          promptWindow.webContents.send(MAIN_TO_RENDERER_EVENTS.INIT_PROMPT, {
            message: message,
            defaultValue: defaultValue || '',
          });
          promptWindow.show();
        });
        return new Promise((resolve) => {
          const responseHandler = (event: Electron.IpcMainEvent, value: string | null) => {
            resolve(value);
            promptWindow.close();
          };
          ipcMain.once(uniqueResponseEvent, responseHandler);
          promptWindow.on('closed', () => {
            ipcMain.removeListener(uniqueResponseEvent, responseHandler);
            resolve(null);
          });
        });
      },
    );
  };
}
