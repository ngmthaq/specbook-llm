import { atom, useAtom } from 'jotai';

export type ThemeAtom = 'light' | 'dark';

export const themeAtom = atom<ThemeAtom>('light');

export const useThemeAtom = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return { theme, setTheme } as const;
};
