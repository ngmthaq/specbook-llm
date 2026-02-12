import { ipcRenderer } from 'electron';
import {
  CreateFolderResult,
  DeleteFileResult,
  DeleteFolderResult,
  OpenFileResult,
  OpenWorkspaceResult,
  RenameFileResult,
  RenameFolderResult,
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

  public createFile = async (filePath: string): Promise<OpenFileResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.CREATE_FILE, filePath);
  };

  public openFile = async (filePath: string): Promise<OpenFileResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.OPEN_FILE, filePath);
  };

  public saveFile = async (filePath: string, content: string): Promise<SaveFileResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.SAVE_FILE, filePath, content);
  };

  public createFolder = async (folderPath: string): Promise<CreateFolderResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.CREATE_FOLDER, folderPath);
  };

  public renameFile = async (oldPath: string, newPath: string): Promise<RenameFileResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.RENAME_FILE, oldPath, newPath);
  };

  public renameFolder = async (oldPath: string, newPath: string): Promise<RenameFolderResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.RENAME_FOLDER, oldPath, newPath);
  };

  public deleteFile = async (filePath: string): Promise<DeleteFileResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.DELETE_FILE, filePath);
  };

  public deleteFolder = async (folderPath: string): Promise<DeleteFolderResult> => {
    return ipcRenderer.invoke(FILE_CHANNELS.DELETE_FOLDER, folderPath);
  };
}
