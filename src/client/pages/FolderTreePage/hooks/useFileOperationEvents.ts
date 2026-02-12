import { useEffect } from 'react';
import { MAIN_TO_RENDERER_EVENTS } from '../../../../shared/configs/events';
import { useFolderTreeAtom } from '../../../stores/useFolderTreeAtom';
import { useSelectedFileAtom } from '../../../stores/useSelectedFileAtom';
import { useWorkspaceOperations } from './useWorkspaceOperations';

export function useFileOperationEvents() {
  const { selectedFolderDir } = useFolderTreeAtom();
  const { selectedFilePath, setSelectedFilePath, setCurrentContent, setOriginalContent } =
    useSelectedFileAtom();
  const { refreshWorkspace } = useWorkspaceOperations();

  useEffect(() => {
    const handleCreateFile = async (...args: unknown[]) => {
      const parentPath = args[0] as string | undefined;
      const fileName = await window.electronAPI.dialogPublisher.prompt('Enter file name:');
      if (!fileName) return;

      const basePath = parentPath || selectedFolderDir;
      const filePath = `${basePath}/${fileName}`;

      const result = await window.electronAPI.filePublisher.createFile(filePath);
      if (result.success) {
        await refreshWorkspace();
      } else {
        await window.electronAPI.dialogPublisher.alert(`Failed to create file: ${result.error}`);
      }
    };

    const handleCreateFolder = async (...args: unknown[]) => {
      const parentPath = args[0] as string | undefined;
      const folderName = await window.electronAPI.dialogPublisher.prompt('Enter folder name:');
      if (!folderName) return;

      const basePath = parentPath || selectedFolderDir;
      const folderPath = `${basePath}/${folderName}`;

      const result = await window.electronAPI.filePublisher.createFolder(folderPath);
      if (result.success) {
        await refreshWorkspace();
      } else {
        await window.electronAPI.dialogPublisher.alert(`Failed to create folder: ${result.error}`);
      }
    };

    const handleRenameFile = async (...args: unknown[]) => {
      const oldPath = args[0] as string;
      const pathParts = oldPath.split('/');
      const oldName = pathParts[pathParts.length - 1];
      const newName = await window.electronAPI.dialogPublisher.prompt(
        'Enter new file name:',
        oldName,
      );
      if (!newName || newName === oldName) return;

      pathParts[pathParts.length - 1] = newName;
      const newPath = pathParts.join('/');

      const result = await window.electronAPI.filePublisher.renameFile(
        `${selectedFolderDir}/${oldPath}`,
        `${selectedFolderDir}/${newPath}`,
      );
      if (result.success) {
        if (selectedFilePath === oldPath) {
          setSelectedFilePath(newPath);
        }
        await refreshWorkspace();
      } else {
        await window.electronAPI.dialogPublisher.alert(`Failed to rename file: ${result.error}`);
      }
    };

    const handleRenameFolder = async (...args: unknown[]) => {
      const oldPath = args[0] as string;
      const pathParts = oldPath.split('/');
      const oldName = pathParts[pathParts.length - 1];
      const newName = await window.electronAPI.dialogPublisher.prompt(
        'Enter new folder name:',
        oldName,
      );
      if (!newName || newName === oldName) return;

      pathParts[pathParts.length - 1] = newName;
      const newPath = pathParts.join('/');

      const result = await window.electronAPI.filePublisher.renameFolder(
        `${selectedFolderDir}/${oldPath}`,
        `${selectedFolderDir}/${newPath}`,
      );
      if (result.success) {
        if (selectedFilePath.startsWith(oldPath)) {
          const updatedFilePath = selectedFilePath.replace(oldPath, newPath);
          setSelectedFilePath(updatedFilePath);
        }
        await refreshWorkspace();
      } else {
        await window.electronAPI.dialogPublisher.alert(`Failed to rename folder: ${result.error}`);
      }
    };

    const handleDeleteFile = async (...args: unknown[]) => {
      const filePath = args[0] as string;
      const confirmed = await window.electronAPI.dialogPublisher.confirm(
        `Are you sure you want to delete "${filePath}"?`,
      );
      if (!confirmed) return;

      const result = await window.electronAPI.filePublisher.deleteFile(
        `${selectedFolderDir}/${filePath}`,
      );
      if (result.success) {
        if (selectedFilePath === filePath) {
          setSelectedFilePath('');
          setCurrentContent('');
          setOriginalContent('');
        }
        await refreshWorkspace();
      } else {
        await window.electronAPI.dialogPublisher.alert(`Failed to delete file: ${result.error}`);
      }
    };

    const handleDeleteFolder = async (...args: unknown[]) => {
      const folderPath = args[0] as string;
      const confirmed = await window.electronAPI.dialogPublisher.confirm(
        `Are you sure you want to delete "${folderPath}" and all its contents?`,
      );
      if (!confirmed) return;

      const result = await window.electronAPI.filePublisher.deleteFolder(
        `${selectedFolderDir}/${folderPath}`,
      );
      if (result.success) {
        if (selectedFilePath.startsWith(folderPath)) {
          setSelectedFilePath('');
          setCurrentContent('');
          setOriginalContent('');
        }
        await refreshWorkspace();
      } else {
        await window.electronAPI.dialogPublisher.alert(`Failed to delete folder: ${result.error}`);
      }
    };

    // Register event listeners
    window.electronAPI.on(MAIN_TO_RENDERER_EVENTS.CREATE_FILE, handleCreateFile);
    window.electronAPI.on(MAIN_TO_RENDERER_EVENTS.CREATE_FOLDER, handleCreateFolder);
    window.electronAPI.on(MAIN_TO_RENDERER_EVENTS.RENAME_FILE, handleRenameFile);
    window.electronAPI.on(MAIN_TO_RENDERER_EVENTS.RENAME_FOLDER, handleRenameFolder);
    window.electronAPI.on(MAIN_TO_RENDERER_EVENTS.DELETE_FILE, handleDeleteFile);
    window.electronAPI.on(MAIN_TO_RENDERER_EVENTS.DELETE_FOLDER, handleDeleteFolder);

    // Cleanup event listeners
    return () => {
      window.electronAPI.off(MAIN_TO_RENDERER_EVENTS.CREATE_FILE, handleCreateFile);
      window.electronAPI.off(MAIN_TO_RENDERER_EVENTS.CREATE_FOLDER, handleCreateFolder);
      window.electronAPI.off(MAIN_TO_RENDERER_EVENTS.RENAME_FILE, handleRenameFile);
      window.electronAPI.off(MAIN_TO_RENDERER_EVENTS.RENAME_FOLDER, handleRenameFolder);
      window.electronAPI.off(MAIN_TO_RENDERER_EVENTS.DELETE_FILE, handleDeleteFile);
      window.electronAPI.off(MAIN_TO_RENDERER_EVENTS.DELETE_FOLDER, handleDeleteFolder);
    };
  }, [
    selectedFolderDir,
    selectedFilePath,
    refreshWorkspace,
    setSelectedFilePath,
    setCurrentContent,
    setOriginalContent,
  ]);
}
