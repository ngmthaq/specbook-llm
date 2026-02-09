import { dialog, ipcMain } from 'electron';
import { OpenWorkspaceResult } from '../../../shared/types/folderTree';
import { Subscriber } from '../../core/subscriber';
import { FILE_CHANNELS } from './file-channels';
import { defaultFileStructure } from './file-structure';
import { FileHelper } from './file.helper';

export class FileSubscriber extends Subscriber {
  public start = () => {
    this.onCreateWorkspace();
    this.onOpenWorkspace();
  };

  private onCreateWorkspace = () => {
    ipcMain.handle(FILE_CHANNELS.CREATE_WORKSPACE, async (): Promise<OpenWorkspaceResult> => {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory', 'createDirectory'],
        title: 'Select Workspace Folder',
        buttonLabel: 'Create Workspace',
      });

      if (result.canceled || result.filePaths.length === 0) {
        return { success: false, error: 'No folder selected' };
      }

      const workspacePath = result.filePaths[0];
      const isEmpty = await FileHelper.isFolderEmpty(workspacePath);
      if (!isEmpty) {
        return {
          success: false,
          error: 'Selected folder is not empty. Please select an empty folder.',
        };
      }

      try {
        await FileHelper.createStructure(workspacePath, defaultFileStructure);
        const tree = await FileHelper.readDirectoryStructure(workspacePath);
        return { success: true, workspacePath, tree };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to create workspace structure',
        };
      }
    });
  };

  private onOpenWorkspace = () => {
    ipcMain.handle(FILE_CHANNELS.OPEN_WORKSPACE, async (): Promise<OpenWorkspaceResult> => {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: 'Open Workspace',
        buttonLabel: 'Open',
      });

      if (result.canceled || result.filePaths.length === 0) {
        return { success: false, error: 'No folder selected' };
      }

      const workspacePath = result.filePaths[0];

      try {
        const tree = await FileHelper.readDirectoryStructure(workspacePath);
        return { success: true, workspacePath, tree };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to read workspace structure',
        };
      }
    });
  };
}
