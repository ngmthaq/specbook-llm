import React from 'react';
import { Outlet } from 'react-router';

import { SIZE } from '../../configs';

import { LeftSidebar } from './components';

export function NonWorkspaceLayout() {
  return (
    <div className="d-flex">
      <div style={{ width: SIZE.leftSidebar.width, height: SIZE.leftSidebar.height }}>
        <LeftSidebar />
      </div>
      <div style={{ flex: 1, height: SIZE.leftSidebar.height }} className="overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
