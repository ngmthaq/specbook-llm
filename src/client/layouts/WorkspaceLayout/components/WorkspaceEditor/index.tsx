import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import { CLASSNAMES } from '../../../../configs';

export function WorkspaceEditor() {
  const [mockValue, setMockValue] = useState<string>(`# Use Case Diagrams`);

  return (
    <div className="w-100 h-100">
      <div className={CLASSNAMES.panelHeader}>
        <small>1-use-case-diagrams.md</small>
      </div>
      <div className={CLASSNAMES.panelBody}>
        <div data-color-mode="light">
          <MDEditor value={mockValue} onChange={setMockValue} />
        </div>
      </div>
    </div>
  );
}
