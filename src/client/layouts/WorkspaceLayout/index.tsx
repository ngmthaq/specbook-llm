import React from 'react';
import { Outlet } from 'react-router';
import { ELEMENT_SIZES } from '../../configs/elementSizes';
import { useLayoutAtom } from '../../stores/useLayoutAtom';
import { useSelectedFileAtom } from '../../stores/useSelectedFileAtom';
import { PlaceholderEditor } from './components/PlaceholderEditor';
import { WorkspaceEditor } from './components/WorkspaceEditor';

export function WorkspaceLayout() {
  const { isOpenSecondSidebar } = useLayoutAtom();
  const { selectedFilePath } = useSelectedFileAtom();

  return (
    <div className="d-flex">
      <div
        style={{
          width: ELEMENT_SIZES.secondSidebar.width,
          height: ELEMENT_SIZES.secondSidebar.height,
          display: isOpenSecondSidebar ? 'block' : 'none',
        }}
      >
        <Outlet />
      </div>
      <div
        style={{
          width: isOpenSecondSidebar ? ELEMENT_SIZES.workspaceEditor.width : '100%',
          height: ELEMENT_SIZES.workspaceEditor.height,
        }}
      >
        {selectedFilePath ? <WorkspaceEditor /> : <PlaceholderEditor />}
      </div>
    </div>
  );
}
