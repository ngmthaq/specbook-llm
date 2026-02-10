import { useAtom, atom } from 'jotai';

export const expandedFoldersAtom = atom<string[]>([]);

export function useExpandedFoldersAtom() {
  const [expandedFolders, setExpandedFolders] = useAtom(expandedFoldersAtom);

  return {
    expandedFolders,
    setExpandedFolders,
  };
}
