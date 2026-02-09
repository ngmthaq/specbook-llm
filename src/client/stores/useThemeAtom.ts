import { atom, useAtom } from 'jotai';
import { Theme } from '../../shared/types/theme';

export const themeAtom = atom<Theme>('light');

export const useThemeAtom = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return { theme, setTheme } as const;
};
