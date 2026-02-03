import { atom, useAtom } from 'jotai';

export interface ITreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: ITreeNode[];
}

export const folderTreeAtom = atom<ITreeNode[] | null>([
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'index.ts',
        type: 'file',
      },
      {
        name: 'components',
        type: 'folder',
        children: [
          {
            name: 'App.tsx',
            type: 'file',
          },
        ],
      },
    ],
  },
  {
    name: 'package.json',
    type: 'file',
  },
]);

export const selectedFileAtom = atom<string>('');

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
