import { atom, useAtom } from 'jotai';
import { TreeNode } from '../../shared/types/folderTree';
import { atomWithElectronStorage } from '../configs/jotaiStorage';

export const folderTreeAtom = atom<TreeNode[]>();
export const selectedFolderDirAtom = atomWithElectronStorage<string>('selectedFolderDirAtom', '');

export function useFolderTreeAtom() {
  const [folderTree, setFolderTree] = useAtom(folderTreeAtom);
  const [selectedFolderDir, setSelectedFolderDir] = useAtom(selectedFolderDirAtom);

  return {
    folderTree,
    setFolderTree,
    selectedFolderDir,
    setSelectedFolderDir,
  };
}
