import { atom, useAtom } from 'jotai';
import { ThemeAtom } from '../types';

export const themeAtom = atom<ThemeAtom>('light');

export const useThemeAtom = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return { theme, setTheme } as const;
};
