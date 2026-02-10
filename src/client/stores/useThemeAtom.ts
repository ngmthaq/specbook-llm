import { useAtom } from 'jotai';
import { Theme } from '../../shared/types/theme';
import { atomWithElectronStorage } from '../configs/jotaiStorage';

export const themeAtom = atomWithElectronStorage<Theme>('themeAtom', 'light');

export const useThemeAtom = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return { theme, setTheme };
};
