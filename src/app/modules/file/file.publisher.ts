import { ipcRenderer } from 'electron';
import {
  OpenFileResult,
  OpenWorkspaceResult,
  SaveFileResult,
} from '../../../shared/types/folderTree';
import { Publisher } from '../../core/publisher';
import { FILE_CHANNELS } from './file-channels';

export class FilePublisher extends Publisher {
  public createWorkspace = async (): Promise<OpenWorkspaceResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.CREATE_WORKSPACE);
  };

  public openWorkspace = async (selectedFolderDir?: string): Promise<OpenWorkspaceResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.OPEN_WORKSPACE, selectedFolderDir);
  };

  public openFile = async (filePath: string): Promise<OpenFileResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.OPEN_FILE, filePath);
  };

  public saveFile = async (filePath: string, content: string): Promise<SaveFileResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.SAVE_FILE, filePath, content);
  };
}
