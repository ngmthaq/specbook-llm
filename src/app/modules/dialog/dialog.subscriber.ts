import { ipcMain } from 'electron';
import prompt from 'custom-electron-prompt';
import { Subscriber } from '../../core/subscriber';
import { DIALOG_CHANNELS } from './dialog-channels';

export class DialogSubscriber extends Subscriber {
  public start = () => {
    this.onPrompt();
    this.onConfirm();
    this.onAlert();
  };

  private onPrompt = () => {
    ipcMain.handle(
      DIALOG_CHANNELS.PROMPT,
      async (event, message: string, defaultValue?: string): Promise<string | null> => {
        try {
          const result = await prompt({
            title: 'Input',
            label: message,
            value: defaultValue || '',
            inputAttrs: {
              type: 'text',
            },
            type: 'input',
            width: 600,
            height: 250,
            alwaysOnTop: true,
          });
          return result;
        } catch (error) {
          return null;
        }
      },
    );
  };

  private onConfirm = () => {
    ipcMain.handle(DIALOG_CHANNELS.CONFIRM, async (event, message: string): Promise<boolean> => {
      try {
        const result = await prompt({
          title: 'Confirm',
          label: message,
          type: 'select',
          selectOptions: {
            Yes: 'yes',
            No: 'no',
          },
          width: 600,
          height: 250,
          alwaysOnTop: true,
        });
        return result === 'yes';
      } catch (error) {
        return false;
      }
    });
  };

  private onAlert = () => {
    ipcMain.handle(DIALOG_CHANNELS.ALERT, async (event, message: string): Promise<void> => {
      try {
        await prompt({
          title: 'Alert',
          label: message,
          type: 'select',
          selectOptions: {
            OK: 'ok',
          },
          width: 600,
          height: 250,
          alwaysOnTop: true,
        });
      } catch (error) {
        // User closed the dialog
      }
    });
  };
}
