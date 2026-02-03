import { atom, useAtom } from 'jotai';

export const isOpenSecondSidebarAtom = atom<boolean>(true);

export const useLayoutAtom = () => {
  const [isOpenSecondSidebar, setIsOpenSecondSidebar] = useAtom(isOpenSecondSidebarAtom);

  return { isOpenSecondSidebar, setIsOpenSecondSidebar } as const;
};
