import { useCallback } from 'react';
import { useFolderTreeAtom } from '../../../stores/useFolderTreeAtom';
import { useSelectedFileAtom } from '../../../stores/useSelectedFileAtom';

const electronAPI = window.electronAPI;

export function useWorkspaceOperations() {
  const { selectedFolderDir, setFolderTree } = useFolderTreeAtom();
  const { setSelectedFilePath, setCurrentContent, setOriginalContent } = useSelectedFileAtom();

  const refreshWorkspace = useCallback(async () => {
    if (selectedFolderDir) {
      const result = await electronAPI.filePublisher.openWorkspace(selectedFolderDir);
      if (result.success) {
        setFolderTree(result.tree || []);
      } else {
        console.error('Failed to refresh workspace:', result.error);
      }
    }
  }, [selectedFolderDir, setFolderTree]);

  const openWorkspace = useCallback(
    async (path: string) => {
      const response = await electronAPI.filePublisher.openWorkspace(path);
      if (response.success) {
        setFolderTree(response.tree || []);
      } else {
        console.error('Failed to open project:', response.error);
      }
    },
    [setFolderTree],
  );

  const openFile = useCallback(
    async (dir: string, path: string) => {
      const content = await electronAPI.filePublisher.openFile(`${dir}/${path}`);
      if (content.success) {
        setOriginalContent(content.content || '');
        setCurrentContent(content.content || '');
        setSelectedFilePath(path);
      } else {
        console.error('Failed to open file:', content.error);
      }
    },
    [setOriginalContent, setCurrentContent, setSelectedFilePath],
  );

  return {
    refreshWorkspace,
    openWorkspace,
    openFile,
  };
}
