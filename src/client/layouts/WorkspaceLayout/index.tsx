import React from 'react';
import { Outlet } from 'react-router';

import { SIZE } from '../../configs';
import { useFolderTreeAtom, useLayoutAtom } from '../../stores';

import { PlaceholderEditor, WorkspaceEditor } from './components';

export function WorkspaceLayout() {
  const { isOpenSecondSidebar } = useLayoutAtom();
  const { selectedFile } = useFolderTreeAtom();

  return (
    <div className="d-flex">
      <div
        style={{
          width: SIZE.secondSidebar.width,
          height: SIZE.secondSidebar.height,
          display: isOpenSecondSidebar ? 'block' : 'none',
        }}
      >
        <Outlet />
      </div>
      <div
        style={{
          width: isOpenSecondSidebar ? SIZE.workspaceEditor.width : '100%',
          height: SIZE.workspaceEditor.height,
        }}
      >
        {selectedFile ? <WorkspaceEditor /> : <PlaceholderEditor />}
      </div>
    </div>
  );
}
