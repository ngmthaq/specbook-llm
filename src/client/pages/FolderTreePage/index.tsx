import classNames from 'classnames';
import React, { MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CLASSNAMES } from '../../configs/classNames';
import { FULL_ROUTE_PATHS } from '../../configs/routePaths';
import { useExpandedFoldersAtom } from '../../stores/useExpandedFoldersAtom';
import { useFolderTreeAtom } from '../../stores/useFolderTreeAtom';
import { useSelectedFileAtom } from '../../stores/useSelectedFileAtom';
import { TreeNode } from './components/TreeNode';

export function FolderTreePage() {
  const navigate = useNavigate();
  const { expandedFolders, setExpandedFolders } = useExpandedFoldersAtom();
  const { selectedFolderDir, setFolderTree, setSelectedFolderDir } = useFolderTreeAtom();
  const { selectedFilePath, setSelectedFilePath, setCurrentContent, setOriginalContent } =
    useSelectedFileAtom();

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
    await window.electronAPI.contextMenuPublisher.openFolderTreeContextMenu({
      x: event.clientX,
      y: event.clientY,
    });
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

  useEffect(() => {
    const handleOpenFile = async (dir: string, path: string) => {
      const content = await window.electronAPI.filePublisher.openFile(`${dir}/${path}`);
      if (content.success) {
        setOriginalContent(content.content || '');
        setCurrentContent(content.content || '');
        setSelectedFilePath(path);
      } else {
        // Handle error (e.g., show a notification)
        console.error('Failed to open file:', content.error);
      }
    };

    if (selectedFilePath) handleOpenFile(selectedFolderDir, selectedFilePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilePath]);

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
