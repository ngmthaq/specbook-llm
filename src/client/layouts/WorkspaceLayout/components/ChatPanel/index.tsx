import React from 'react';

import { CLASSNAMES } from '../../../../configs';

export function ChatPanel() {
  return (
    <div className="w-100 h-100">
      <div className={CLASSNAMES.panelHeader}>
        <small>AI Assistant</small>
      </div>
      <div className={CLASSNAMES.panelBody}></div>
    </div>
  );
}
