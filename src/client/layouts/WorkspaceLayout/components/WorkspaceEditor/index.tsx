import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { CLASSNAMES } from '../../../../configs/classNames';
import { useFolderTreeAtom } from '../../../../stores/useFolderTreeAtom';
import { useSelectedFileAtom } from '../../../../stores/useSelectedFileAtom';
import { useThemeAtom } from '../../../../stores/useThemeAtom';

export function WorkspaceEditor() {
  const { theme } = useThemeAtom();
  const { selectedFolderDir } = useFolderTreeAtom();
  const {
    hasUnsavedChanges,
    selectedFilePath,
    currentContent,
    setCurrentContent,
    setOriginalContent,
  } = useSelectedFileAtom();

  const [isFocus, setIsFocus] = useState(false);

  const handleSaveFile = useCallback(async () => {
    const saveFileResponse = await window.electronAPI.filePublisher.saveFile(
      `${selectedFolderDir}/${selectedFilePath}`,
      currentContent,
    );
    if (saveFileResponse.success) {
      setOriginalContent(currentContent);
    } else {
      // Handle error (e.g., show a notification)
      console.error('Failed to save file:', saveFileResponse.error);
    }
  }, [selectedFolderDir, selectedFilePath, currentContent, setOriginalContent]);

  useEffect(() => {
    const handleCtrlS = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (hasUnsavedChanges) handleSaveFile();
      }
    };
    if (isFocus) window.addEventListener('keydown', handleCtrlS);
    return () => {
      window.removeEventListener('keydown', handleCtrlS);
    };
  }, [isFocus, hasUnsavedChanges, handleSaveFile]);

  return (
    <div className="w-100 h-100">
      <div
        className={classNames([
          CLASSNAMES.HEADER_PANEL,
          'd-flex justify-content-between align-items-center',
        ])}
      >
        <div>
          <small>{selectedFilePath}</small>
          {hasUnsavedChanges && <span className="d-inline-block text-danger ms-1">*</span>}
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <button
            className="btn btn-sm btn-link"
            title="Save"
            disabled={!hasUnsavedChanges}
            onClick={handleSaveFile}
          >
            <i className="bi bi-floppy"></i>
          </button>
        </div>
      </div>
      <div className={CLASSNAMES.BODY_PANEL}>
        <div data-color-mode={theme}>
          <MDEditor
            value={currentContent}
            onChange={(value) => setCurrentContent(value || '')}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </div>
      </div>
    </div>
  );
}
