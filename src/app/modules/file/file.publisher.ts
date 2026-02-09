import { ipcRenderer } from 'electron';
import { OpenWorkspaceResult } from '../../../shared/types/folderTree';
import { Publisher } from '../../core/publisher';
import { FILE_CHANNELS } from './file-channels';

export class FilePublisher extends Publisher {
  public createWorkspace = async (): Promise<OpenWorkspaceResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.CREATE_WORKSPACE);
  };

  public openWorkspace = async (): Promise<OpenWorkspaceResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.OPEN_WORKSPACE);
  };
}
