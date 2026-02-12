import { dialog, ipcMain } from 'electron';
import * as fs from 'fs/promises';
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
import { Subscriber } from '../../core/subscriber';
import { FILE_CHANNELS } from './file-channels';
import { defaultFileStructure } from './file-structure';
import { FileHelper } from './file.helper';

export class FileSubscriber extends Subscriber {
  public start = () => {
    this.onCreateWorkspace();
    this.onOpenWorkspace();
    this.onOpenFile();
    this.onSaveFile();
    this.onCreateFile();
    this.onCreateFolder();
    this.onRenameFile();
    this.onRenameFolder();
    this.onDeleteFile();
    this.onDeleteFolder();
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
    ipcMain.handle(
      FILE_CHANNELS.OPEN_WORKSPACE,
      async (event, selectedFolderDir?: string): Promise<OpenWorkspaceResult> => {
        let workspacePath = '';

        if (selectedFolderDir) {
          workspacePath = selectedFolderDir;
        } else {
          const result = await dialog.showOpenDialog({
            properties: ['openDirectory'],
            title: 'Open Workspace',
            buttonLabel: 'Open',
          });

          if (result.canceled || result.filePaths.length === 0) {
            return { success: false, error: 'No folder selected' };
          }

          workspacePath = result.filePaths[0];
        }

        try {
          const tree = await FileHelper.readDirectoryStructure(workspacePath);
          return { success: true, workspacePath, tree };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to read workspace structure',
          };
        }
      },
    );
  };

  private onCreateFile = () => {
    ipcMain.handle(
      FILE_CHANNELS.CREATE_FILE,
      async (event, filePath: string): Promise<OpenFileResult> => {
        try {
          await fs.writeFile(filePath, '', 'utf-8');
          return { success: true, filePath, content: '' };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create file',
          };
        }
      },
    );
  };

  private onOpenFile = () => {
    ipcMain.handle(
      FILE_CHANNELS.OPEN_FILE,
      async (event, filePath: string): Promise<OpenFileResult> => {
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          return { success: true, filePath, content };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to open file',
          };
        }
      },
    );
  };

  private onSaveFile = () => {
    ipcMain.handle(
      FILE_CHANNELS.SAVE_FILE,
      async (event, filePath: string, content: string): Promise<SaveFileResult> => {
        try {
          await fs.writeFile(filePath, content, 'utf-8');
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to save file',
          };
        }
      },
    );
  };

  private onCreateFolder = () => {
    ipcMain.handle(
      FILE_CHANNELS.CREATE_FOLDER,
      async (event, folderPath: string): Promise<CreateFolderResult> => {
        try {
          await fs.mkdir(folderPath, { recursive: true });
          return { success: true, folderPath };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create folder',
          };
        }
      },
    );
  };

  private onRenameFile = () => {
    ipcMain.handle(
      FILE_CHANNELS.RENAME_FILE,
      async (event, oldPath: string, newPath: string): Promise<RenameFileResult> => {
        try {
          await fs.rename(oldPath, newPath);
          return { success: true, oldPath, newPath };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to rename file',
          };
        }
      },
    );
  };

  private onRenameFolder = () => {
    ipcMain.handle(
      FILE_CHANNELS.RENAME_FOLDER,
      async (event, oldPath: string, newPath: string): Promise<RenameFolderResult> => {
        try {
          await fs.rename(oldPath, newPath);
          return { success: true, oldPath, newPath };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to rename folder',
          };
        }
      },
    );
  };

  private onDeleteFile = () => {
    ipcMain.handle(
      FILE_CHANNELS.DELETE_FILE,
      async (event, filePath: string): Promise<DeleteFileResult> => {
        try {
          await fs.unlink(filePath);
          return { success: true, filePath };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete file',
          };
        }
      },
    );
  };

  private onDeleteFolder = () => {
    ipcMain.handle(
      FILE_CHANNELS.DELETE_FOLDER,
      async (event, folderPath: string): Promise<DeleteFolderResult> => {
        try {
          await FileHelper.deleteFolder(folderPath);
          return { success: true, folderPath };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete folder',
          };
        }
      },
    );
  };
}
