import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router';
import { LAYOUT_PATHS, ROUTE_PATHS } from './configs/routePaths';
import { NonWorkspaceLayout } from './layouts/NonWorkspaceLayout';
import { WorkspaceLayout } from './layouts/WorkspaceLayout';
import { AIChatPage } from './pages/AIChatPage';
import { FolderTreePage } from './pages/FolderTreePage';
import { HelpPage } from './pages/HelpPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/SearchPage';
import { SettingsPage } from './pages/SettingsPage';
import { SharePage } from './pages/SharePage';
import { WelcomePage } from './pages/WelcomePage';
import { useThemeAtom } from './stores/useThemeAtom';
import { formatPath } from './utils/route';

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
