import { FULL_ROUTE_PATHS } from './routePaths';

export interface LeftSidebarItem {
  route: string;
  label: string;
  icon: string;
}

export const SIDEBAR_ITEMS: LeftSidebarItem[] = [
  {
    route: FULL_ROUTE_PATHS.FOLDER_TREE,
    label: 'Folder Tree',
    icon: 'bi bi-folder2-open',
  },
  {
    route: FULL_ROUTE_PATHS.SEARCH,
    label: 'Search',
    icon: 'bi bi-search',
  },
  {
    route: FULL_ROUTE_PATHS.SHARE,
    label: 'Share',
    icon: 'bi bi-share',
  },
  {
    route: FULL_ROUTE_PATHS.SETTINGS,
    label: 'Settings',
    icon: 'bi bi-gear',
  },
  {
    route: FULL_ROUTE_PATHS.PROFILE,
    label: 'Profile',
    icon: 'bi bi-person-circle',
  },
  {
    route: FULL_ROUTE_PATHS.HELP,
    label: 'Help',
    icon: 'bi bi-question-circle',
  },
];
