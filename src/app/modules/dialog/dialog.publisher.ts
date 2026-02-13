import { ipcRenderer } from 'electron';
import { Publisher } from '../../core/publisher';
import { DIALOG_CHANNELS } from './dialog-channels';

export class DialogPublisher extends Publisher {
  public prompt = async (message: string, defaultValue?: string): Promise<string | null> => {
    return ipcRenderer.invoke(DIALOG_CHANNELS.OPEN_PROMPT_DIALOG, message, defaultValue);
  };
}
