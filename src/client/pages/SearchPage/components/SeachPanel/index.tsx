import React from 'react';

import { CLASSNAMES } from '../../../../configs';

export function SearchPanel() {
  return (
    <div className="w-100 h-100">
      <div className={CLASSNAMES.panelHeader}>
        <small>Search</small>
      </div>
      <div className={CLASSNAMES.panelBody}></div>
    </div>
  );
}
