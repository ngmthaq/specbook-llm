import React from 'react';
import { Outlet } from 'react-router';

import { SIZE } from '../../configs';
import { useLayoutAtom } from '../../stores';

import { WorkspaceEditor } from './components';

export function WorkspaceLayout() {
  const { isOpenSecondSidebar } = useLayoutAtom();

  return (
    <div className="d-flex">
      {isOpenSecondSidebar && (
        <div style={{ width: SIZE.secondSidebar.width, height: SIZE.secondSidebar.height }}>
          <Outlet />
        </div>
      )}
      <div
        style={{
          width: isOpenSecondSidebar ? SIZE.workspaceEditor.width : '100%',
          height: SIZE.workspaceEditor.height,
        }}
      >
        <WorkspaceEditor />
      </div>
    </div>
  );
}
