import { useEffect } from 'react';
import { useFolderTreeAtom } from '../../../stores/useFolderTreeAtom';
import { useSelectedFileAtom } from '../../../stores/useSelectedFileAtom';
import { useWorkspaceOperations } from './useWorkspaceOperations';

export function useFileAutoLoad() {
  const { selectedFolderDir } = useFolderTreeAtom();
  const { selectedFilePath } = useSelectedFileAtom();
  const { openFile } = useWorkspaceOperations();

  useEffect(() => {
    if (selectedFilePath) {
      openFile(selectedFolderDir, selectedFilePath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilePath]);
}
