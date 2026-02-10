import classNames from 'classnames';
import React, { useMemo } from 'react';
import { TreeNode as TreeNodeType } from '../../../../../shared/types/folderTree';
import { getFullPath } from '../../../../../shared/utils/file';
import { useExpandedFoldersAtom } from '../../../../stores/useExpandedFoldersAtom';
import { useFolderTreeAtom } from '../../../../stores/useFolderTreeAtom';
import { useSelectedFileAtom } from '../../../../stores/useSelectedFileAtom';
import classes from './TreeNode.module.css';

export interface TreeNodeProps {
  node?: TreeNodeType;
  fullPath?: string;
  level?: number;
}

export function TreeNode({ node, fullPath = '', level = 0 }: TreeNodeProps) {
  const { folderTree, selectedFolderDir } = useFolderTreeAtom();
  const { expandedFolders, setExpandedFolders } = useExpandedFoldersAtom();
  const {
    selectedFilePath,
    hasUnsavedChanges,
    setSelectedFilePath,
    setCurrentContent,
    setOriginalContent,
  } = useSelectedFileAtom();

  const hasChildren = useMemo(() => {
    return node?.children && node?.children.length > 0;
  }, [node?.children]);

  const isFolder = useMemo(() => {
    return node?.type === 'folder';
  }, [node?.type]);

  const isExpanded = useMemo(() => {
    return expandedFolders.includes(fullPath);
  }, [expandedFolders, fullPath]);

  const sortedFolderTree = useMemo(() => {
    if (!folderTree) return [];
    const folderNodes = folderTree
      .filter((node) => {
        return node?.type === 'folder';
      })
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    const fileNodes = folderTree
      .filter((node) => {
        return node?.type === 'file';
      })
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    return [...folderNodes, ...fileNodes];
  }, [folderTree]);

  const handleOpenFile = async (dir: string, path: string) => {
    if (hasUnsavedChanges) {
      const confirmOpen = confirm(
        'You have unsaved changes. Do you want to discard them and open a new file?',
      );
      if (!confirmOpen) return;
    }
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

  const handleClickTreeNode = () => {
    if (isFolder) {
      if (expandedFolders.includes(fullPath)) {
        setExpandedFolders(expandedFolders.filter((path) => path !== fullPath));
      } else {
        setExpandedFolders([...expandedFolders, fullPath]);
      }
    } else {
      handleOpenFile(selectedFolderDir, fullPath);
    }
  };

  const getIcon = () => {
    const style = { fontSize: '16px' };
    if (node?.type === 'file') {
      return <i className="bi bi-file-earmark text-primary" style={style}></i>;
    }
    if (isExpanded) {
      return <i className="bi bi-folder2-open text-warning" style={style}></i>;
    }
    return <i className="bi bi-folder text-warning" style={style}></i>;
  };

  const getChevron = () => {
    const style = { marginLeft: `${level * 16}px`, width: '16px', height: '16px' };
    if (!hasChildren) return <div style={style}></div>;
    return (
      <button
        className="btn btn-sm p-0 d-flex align-items-center justify-content-center"
        style={style}
      >
        {isExpanded ? (
          <i className="bi bi-chevron-down text-secondary"></i>
        ) : (
          <i className="bi bi-chevron-right text-secondary"></i>
        )}
      </button>
    );
  };

  const getFullItemElement = () => {
    return (
      <div
        className={classNames([
          `d-flex align-items-center gap-1 py-1 px-2 cursor-pointer`,
          {
            [classes.treeNode]: true,
            [classes.active]: fullPath === selectedFilePath,
          },
        ])}
        onClick={handleClickTreeNode}
      >
        {getChevron()}
        {getIcon()}
        <small className="text-muted ms-1">{node?.name}</small>
      </div>
    );
  };

  const getNestedItemElement = (items: TreeNodeType[]) => {
    return (
      <div>
        {items.map((childNode, index) => {
          const childFullPath = getFullPath(sortedFolderTree, childNode);
          return (
            <TreeNode
              key={index}
              node={childNode}
              fullPath={childFullPath || undefined}
              level={level + 1}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="user-select-none">
      {!node && getNestedItemElement(sortedFolderTree)}
      {node && !isFolder && getFullItemElement()}
      {node && isFolder && (
        <div>
          {getFullItemElement()}
          {isExpanded && hasChildren && getNestedItemElement(node.children || [])}
        </div>
      )}
    </div>
  );
}
