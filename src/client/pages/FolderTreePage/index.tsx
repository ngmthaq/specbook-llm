import classNames from 'classnames';
import React, { useEffect } from 'react';
import { CLASSNAMES } from '../../configs/classNames';
import { useExpandedFoldersAtom } from '../../stores/useExpandedFoldersAtom';
import { useFolderTreeAtom } from '../../stores/useFolderTreeAtom';
import { TreeNode } from './components/TreeNode';

export function FolderTreePage() {
  const { expandedFolders, setExpandedFolders } = useExpandedFoldersAtom();
  const { selectedFolderDir, setFolderTree } = useFolderTreeAtom();

  const handleCollapseAll = () => {
    if (expandedFolders.length > 0) {
      setExpandedFolders([]);
    }
  };

  useEffect(() => {
    const handleOpenProject = async (path: string) => {
      const openProjectResponse = await window.electronAPI.filePublisher.openWorkspace(path);
      if (openProjectResponse.success) {
        setFolderTree(openProjectResponse.tree || []);
      } else {
        // Handle error (e.g., show a notification)
        console.error('Failed to open project:', openProjectResponse.error);
      }
    };

    if (selectedFolderDir) handleOpenProject(selectedFolderDir);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderDir]);

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
