import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';
import { atomWithElectronStorage } from '../configs/jotaiStorage';

export const selectedFilePathAtom = atomWithElectronStorage<string>('selectedFilePathAtom', '');
export const originalContentAtom = atom<string>('');
export const currentContentAtom = atom<string>('');

export function useSelectedFileAtom() {
  const [selectedFilePath, setSelectedFilePath] = useAtom(selectedFilePathAtom);
  const [originalContent, setOriginalContent] = useAtom(originalContentAtom);
  const [currentContent, setCurrentContent] = useAtom(currentContentAtom);

  const hasUnsavedChanges = useMemo(() => {
    return originalContent !== currentContent;
  }, [originalContent, currentContent]);

  return {
    selectedFilePath,
    setSelectedFilePath,
    originalContent,
    setOriginalContent,
    currentContent,
    setCurrentContent,
    hasUnsavedChanges,
  };
}
