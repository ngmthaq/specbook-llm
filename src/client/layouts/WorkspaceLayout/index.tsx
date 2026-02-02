import React from 'react';
import { Outlet } from 'react-router';

import { SIZE } from '../../configs';
import { NonWorkspaceLayout } from '../NonWorkspaceLayout';

import { ChatPanel, WorkspaceEditor } from './components';

export function WorkspaceLayout() {
  return (
    <NonWorkspaceLayout>
      <div className="d-flex" style={{ height: SIZE.leftSidebar.height }}>
        <div style={{ width: SIZE.folderTree.width, height: SIZE.folderTree.height }}>
          <Outlet />
        </div>
        <div style={{ width: SIZE.workspaceEditor.width, height: SIZE.workspaceEditor.height }}>
          <WorkspaceEditor />
        </div>
        <div style={{ width: SIZE.chatPanel.width, height: SIZE.chatPanel.height }}>
          <ChatPanel />
        </div>
      </div>
    </NonWorkspaceLayout>
  );
}
