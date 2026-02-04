import { atom, useAtom } from 'jotai';
import { DEFAULT_FOLDER_TREE } from '../configs';

export interface ITreeNode {
  name: string;
  type: 'file' | 'folder';
  hash: string;
  children?: ITreeNode[];
}

export const folderTreeAtom = atom<ITreeNode[]>(DEFAULT_FOLDER_TREE);

export const selectedFileAtom = atom<string>();

export const expandedFoldersAtom = atom<Set<string>>(new Set<string>());

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
