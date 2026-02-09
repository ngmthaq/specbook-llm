import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';
import { CLASSNAMES } from '../../../../configs/classNames';
import { useThemeAtom } from '../../../../stores/useThemeAtom';

export function WorkspaceEditor() {
  const { theme } = useThemeAtom();
  const [mockValue, setMockValue] = useState<string>(`# Use Case Diagrams`);

  return (
    <div className="w-100 h-100">
      <div className={CLASSNAMES.HEADER_PANEL}>
        <small>1-use-case-diagrams.md</small>
      </div>
      <div className={CLASSNAMES.BODY_PANEL}>
        <div data-color-mode={theme}>
          <MDEditor value={mockValue} onChange={(value) => setMockValue(value || '')} />
        </div>
      </div>
    </div>
  );
}
