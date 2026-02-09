import React from 'react';
import { Outlet } from 'react-router';
import { ELEMENT_SIZES } from '../../configs/elementSizes';
import { LeftSidebar } from './components/LeftSidebar';

export function NonWorkspaceLayout() {
  return (
    <div className="d-flex">
      <div
        style={{
          width: ELEMENT_SIZES.leftSidebar.width,
          height: ELEMENT_SIZES.leftSidebar.height,
        }}
      >
        <LeftSidebar />
      </div>
      <div
        style={{
          flex: 1,
          height: ELEMENT_SIZES.leftSidebar.height,
        }}
        className="overflow-auto"
      >
        <Outlet />
      </div>
    </div>
  );
}
