import { useEffect } from 'react';
import { useFolderTreeAtom } from '../../../stores/useFolderTreeAtom';
import { useWorkspaceOperations } from './useWorkspaceOperations';

export function useWorkspaceAutoLoad() {
  const { selectedFolderDir } = useFolderTreeAtom();
  const { openWorkspace } = useWorkspaceOperations();

  useEffect(() => {
    if (selectedFolderDir) {
      openWorkspace(selectedFolderDir);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderDir]);
}
