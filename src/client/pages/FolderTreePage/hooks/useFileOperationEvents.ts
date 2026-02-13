import { useEffect } from 'react';
import { MAIN_TO_RENDERER_EVENTS } from '../../../../shared/configs/events';
import { useFolderTreeAtom } from '../../../stores/useFolderTreeAtom';
import { useSelectedFileAtom } from '../../../stores/useSelectedFileAtom';
import { useWorkspaceOperations } from './useWorkspaceOperations';

const electronAPI = window.electronAPI;

export function useFileOperationEvents() {
  const { refreshWorkspace } = useWorkspaceOperations();
  const { selectedFolderDir } = useFolderTreeAtom();
  const { selectedFilePath, setSelectedFilePath, setCurrentContent, setOriginalContent } =
    useSelectedFileAtom();

  const handleCreateFile = async (...args: unknown[]) => {
    const parentPath = args[1] as string | undefined;
    const fileName = await electronAPI.dialogPublisher.prompt('Enter file name:');
    if (!fileName) return;
    const basePath = parentPath ? `${selectedFolderDir}/${parentPath}` : selectedFolderDir;
    const filePath = `${basePath}/${fileName}`;
    const result = await electronAPI.filePublisher.createFile(filePath);
    if (result.success) {
      await refreshWorkspace();
    } else {
      alert(`Failed to create file: ${result.error}`);
    }
  };

  const handleCreateFolder = async (...args: unknown[]) => {
    const parentPath = args[1] as string | undefined;
    const folderName = await electronAPI.dialogPublisher.prompt('Enter folder name:');
    if (!folderName) return;
    const basePath = parentPath ? `${selectedFolderDir}/${parentPath}` : selectedFolderDir;
    const folderPath = `${basePath}/${folderName}`;
    const result = await electronAPI.filePublisher.createFolder(folderPath);
    if (result.success) {
      await refreshWorkspace();
    } else {
      alert(`Failed to create folder: ${result.error}`);
    }
  };

  const handleRenameFile = async (...args: unknown[]) => {
    const oldPath = args[1] as string;
    const pathParts = oldPath.split('/');
    const oldName = pathParts[pathParts.length - 1];
    const newName = await electronAPI.dialogPublisher.prompt('Enter new file name:', oldName);
    if (!newName || newName === oldName) return;
    pathParts[pathParts.length - 1] = newName;
    const newPath = pathParts.join('/');
    const result = await electronAPI.filePublisher.renameFile(
      `${selectedFolderDir}/${oldPath}`,
      `${selectedFolderDir}/${newPath}`,
    );
    if (result.success) {
      if (selectedFilePath === oldPath) {
        setSelectedFilePath(newPath);
      }
      await refreshWorkspace();
    } else {
      alert(`Failed to rename file: ${result.error}`);
    }
  };

  const handleRenameFolder = async (...args: unknown[]) => {
    const oldPath = args[1] as string;
    const pathParts = oldPath.split('/');
    const oldName = pathParts[pathParts.length - 1];
    const newName = await electronAPI.dialogPublisher.prompt('Enter new folder name:', oldName);
    if (!newName || newName === oldName) return;
    pathParts[pathParts.length - 1] = newName;
    const newPath = pathParts.join('/');
    const result = await electronAPI.filePublisher.renameFolder(
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
      alert(`Failed to rename folder: ${result.error}`);
    }
  };

  const handleDeleteFile = async (...args: unknown[]) => {
    const filePath = args[1] as string;
    const confirmed = confirm(`Are you sure you want to delete "${filePath}"?`);
    if (!confirmed) return;
    const result = await electronAPI.filePublisher.deleteFile(`${selectedFolderDir}/${filePath}`);
    if (result.success) {
      if (selectedFilePath === filePath) {
        setSelectedFilePath('');
        setCurrentContent('');
        setOriginalContent('');
      }
      await refreshWorkspace();
    } else {
      alert(`Failed to delete file: ${result.error}`);
    }
  };

  const handleDeleteFolder = async (...args: unknown[]) => {
    const folderPath = args[1] as string;
    const confirmed = confirm(
      `Are you sure you want to delete "${folderPath}" and all its contents?`,
    );
    if (!confirmed) return;
    const result = await electronAPI.filePublisher.deleteFolder(
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
      alert(`Failed to delete folder: ${result.error}`);
    }
  };

  useEffect(() => {
    const c1 = electronAPI.on(MAIN_TO_RENDERER_EVENTS.CREATE_FILE, handleCreateFile);
    const c2 = electronAPI.on(MAIN_TO_RENDERER_EVENTS.CREATE_FOLDER, handleCreateFolder);
    const c3 = electronAPI.on(MAIN_TO_RENDERER_EVENTS.RENAME_FILE, handleRenameFile);
    const c4 = electronAPI.on(MAIN_TO_RENDERER_EVENTS.RENAME_FOLDER, handleRenameFolder);
    const c5 = electronAPI.on(MAIN_TO_RENDERER_EVENTS.DELETE_FILE, handleDeleteFile);
    const c6 = electronAPI.on(MAIN_TO_RENDERER_EVENTS.DELETE_FOLDER, handleDeleteFolder);

    return () => {
      c1();
      c2();
      c3();
      c4();
      c5();
      c6();
    };
  });
}
