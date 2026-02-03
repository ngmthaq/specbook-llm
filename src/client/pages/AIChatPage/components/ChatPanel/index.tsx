import React from 'react';
import { CLASSNAMES } from '../../../../configs';

export function ChatPanel() {
  return (
    <div className="w-100 h-100">
      <div className={CLASSNAMES.HEADER_PANEL}>
        <small>AI Assistant</small>
      </div>
      <div className={CLASSNAMES.BODY_PANEL}></div>
    </div>
  );
}
