import classNames from 'classnames';
import React from 'react';
import { CLASSNAMES } from '../../configs';
import { useFolderTreeAtom } from '../../stores';
import { TreeNode } from './components';

export function FolderTreePage() {
  const { expandedFolders, setExpandedFolders } = useFolderTreeAtom();

  const handleCollapseAll = () => {
    if (expandedFolders.size > 0) {
      setExpandedFolders(new Set<string>());
    }
  };

  return (
    <div className="w-100 h-100">
      <div
        className={classNames([
          CLASSNAMES.HEADER_PANEL,
          'd-flex justify-content-between align-items-center',
        ])}
      >
        <small>Folder Tree</small>
        <button className="btn border-0 p-0" title="Collapse All" onClick={handleCollapseAll}>
          <i className="bi bi-dash-square"></i>
        </button>
      </div>
      <div className={CLASSNAMES.BODY_PANEL}>
        <TreeNode />
      </div>
    </div>
  );
}
