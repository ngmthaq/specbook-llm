import { ipcRenderer } from 'electron';
import { Publisher } from '../../core/publisher';
import { DIALOG_CHANNELS } from './dialog-channels';

export class DialogPublisher extends Publisher {
  public prompt = async (message: string, defaultValue?: string): Promise<string | null> => {
    return ipcRenderer.invoke(DIALOG_CHANNELS.PROMPT, message, defaultValue);
  };

  public confirm = async (message: string): Promise<boolean> => {
    return ipcRenderer.invoke(DIALOG_CHANNELS.CONFIRM, message);
  };

  public alert = async (message: string): Promise<void> => {
    return ipcRenderer.invoke(DIALOG_CHANNELS.ALERT, message);
  };
}
