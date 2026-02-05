import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router';
import { LAYOUT_PATHS, ROUTE_PATHS } from './configs';
import { NonWorkspaceLayout, WorkspaceLayout } from './layouts';
import {
  WelcomePage,
  FolderTreePage,
  SearchPage,
  SharePage,
  SettingsPage,
  ProfilePage,
  HelpPage,
  AIChatPage,
} from './pages';
import { useThemeAtom } from './stores';
import { formatPath } from './utils';

export function App() {
  const { theme } = useThemeAtom();

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <HashRouter>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path={formatPath(LAYOUT_PATHS.NON_WORKSPACE)} element={<NonWorkspaceLayout />}>
          <Route path={formatPath(LAYOUT_PATHS.WORKSPACE)} element={<WorkspaceLayout />}>
            <Route path={formatPath(ROUTE_PATHS.FOLDER_TREE)} element={<FolderTreePage />} />
            <Route path={formatPath(ROUTE_PATHS.AI_CHAT)} element={<AIChatPage />} />
            <Route path={formatPath(ROUTE_PATHS.SEARCH)} element={<SearchPage />} />
          </Route>
          <Route path={formatPath(ROUTE_PATHS.SHARE)} element={<SharePage />} />
          <Route path={formatPath(ROUTE_PATHS.SETTINGS)} element={<SettingsPage />} />
          <Route path={formatPath(ROUTE_PATHS.PROFILE)} element={<ProfilePage />} />
          <Route path={formatPath(ROUTE_PATHS.HELP)} element={<HelpPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
