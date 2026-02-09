import { atom, useAtom } from 'jotai';
import { TreeNode } from '../../shared/types/folderTree';

export const folderTreeAtom = atom<TreeNode[]>();
export const selectedFileAtom = atom<string>();
export const expandedFoldersAtom = atom(new Set<string>());

export function useFolderTreeAtom() {
  const [folderTree, setFolderTree] = useAtom(folderTreeAtom);
  const [selectedFile, setSelectedFile] = useAtom(selectedFileAtom);
  const [expandedFolders, setExpandedFolders] = useAtom(expandedFoldersAtom);

  return {
    folderTree,
    setFolderTree,
    selectedFile,
    setSelectedFile,
    expandedFolders,
    setExpandedFolders,
  };
}
