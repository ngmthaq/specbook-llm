import React from 'react';

import { CLASSNAMES } from '../../../../configs';

export function FolderTree() {
  return (
    <div className="w-100 h-100">
      <div className={CLASSNAMES.panelHeader}>
        <small>Folder Tree</small>
      </div>
      <div className={CLASSNAMES.panelBody}></div>
    </div>
  );
}
