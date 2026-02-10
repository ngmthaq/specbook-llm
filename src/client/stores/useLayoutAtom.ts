import { useAtom } from 'jotai';
import { atomWithElectronStorage } from '../configs/jotaiStorage';

export const isOpenSecondSidebarAtom = atomWithElectronStorage<boolean>(
  'isOpenSecondSidebarAtom',
  true,
);

export const useLayoutAtom = () => {
  const [isOpenSecondSidebar, setIsOpenSecondSidebar] = useAtom(isOpenSecondSidebarAtom);

  return { isOpenSecondSidebar, setIsOpenSecondSidebar };
};
