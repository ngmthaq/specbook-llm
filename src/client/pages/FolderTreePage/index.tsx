import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { CLASSNAMES } from '../../configs/classNames';
import { FULL_ROUTE_PATHS } from '../../configs/routePaths';
import { useExpandedFoldersAtom } from '../../stores/useExpandedFoldersAtom';
import { useFolderTreeAtom } from '../../stores/useFolderTreeAtom';
import { useSelectedFileAtom } from '../../stores/useSelectedFileAtom';
import { TreeNode } from './components/TreeNode';
import { useFileAutoLoad } from './hooks/useFileAutoLoad';
import { useFileOperationEvents } from './hooks/useFileOperationEvents';
import { useWorkspaceAutoLoad } from './hooks/useWorkspaceAutoLoad';

const electronAPI = window.electronAPI;

export function FolderTreePage() {
  const navigate = useNavigate();
  const { expandedFolders, setExpandedFolders } = useExpandedFoldersAtom();
  const { setFolderTree, setSelectedFolderDir } = useFolderTreeAtom();
  const { setSelectedFilePath } = useSelectedFileAtom();

  useWorkspaceAutoLoad();
  useFileAutoLoad();
  useFileOperationEvents();

  const handleCollapseAll = () => {
    if (expandedFolders.length > 0) {
      setExpandedFolders([]);
    }
  };

  const handleCloseWorkspace = () => {
    setSelectedFilePath('');
    setTimeout(() => {
      setSelectedFolderDir('');
    }, 100);
    setTimeout(() => {
      setFolderTree([]);
      setExpandedFolders([]);
      navigate(FULL_ROUTE_PATHS.WELCOME);
    }, 200);
  };

  const handleOpenContextMenu: MouseEventHandler = async (event) => {
    event.stopPropagation();
    await electronAPI.contextMenuPublisher.openFolderTreeContextMenu({
      x: event.clientX,
      y: event.clientY,
    });
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
        <span className="d-flex justify-content-end align-items-center gap-1">
          <button className="btn border-0 p-0" title="Collapse All" onClick={handleCollapseAll}>
            <i className="bi bi-dash-square"></i>
          </button>
          <button
            className="btn border-0 p-0"
            title="Close Workspace"
            onClick={handleCloseWorkspace}
          >
            <i className="bi bi-x-square"></i>
          </button>
        </span>
      </div>
      <div className={CLASSNAMES.BODY_PANEL} onContextMenu={handleOpenContextMenu}>
        <TreeNode />
      </div>
    </div>
  );
}
