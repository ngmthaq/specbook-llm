import classNames from 'classnames';
import React, { useMemo } from 'react';
import { ITreeNode, useFolderTreeAtom } from '../../../../stores';
import classes from './TreeNode.module.css';

export interface TreeNodeProps {
  node: ITreeNode;
  level?: number;
}

export function TreeNode({ node, level = 0 }: TreeNodeProps) {
  const { selectedFile, setSelectedFile, expandedFolders, setExpandedFolders } =
    useFolderTreeAtom();

  const fullNodePath = useMemo(() => {
    return `${level}:${node.name}`;
  }, [node, level]);

  const hasChildren = useMemo(() => {
    return node.children && node.children.length > 0;
  }, [node.children]);

  const isExpanded = useMemo(() => {
    return expandedFolders.has(fullNodePath);
  }, [expandedFolders, fullNodePath]);

  const sortedChildren = useMemo(() => {
    const folders = node.children?.filter((child) => child.type === 'folder') || [];
    const files = node.children?.filter((child) => child.type === 'file') || [];
    return [...folders, ...files];
  }, [node.children]);

  const handleClickTreeNode = () => {
    if (hasChildren) {
      const newExpandedFolders = new Set(expandedFolders);
      if (expandedFolders.has(fullNodePath)) {
        newExpandedFolders.delete(fullNodePath);
      } else {
        newExpandedFolders.add(fullNodePath);
      }
      setExpandedFolders(newExpandedFolders);
    } else {
      setSelectedFile(fullNodePath);
    }
  };

  const getIcon = () => {
    const style = { fontSize: '16px' };
    if (node.type === 'file') {
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

  return (
    <div className="user-select-none">
      <div
        className={classNames([
          `d-flex align-items-center gap-1 py-1 px-2 cursor-pointer`,
          {
            [classes.treeNode]: true,
            [classes.active]: fullNodePath === selectedFile,
          },
        ])}
        onClick={handleClickTreeNode}
      >
        {getChevron()}
        {getIcon()}
        <small className="text-muted ms-1">{node.name}</small>
      </div>
      {isExpanded && hasChildren && (
        <div className={classes.treeNodeList}>
          <div className={classes.treeNodeListDivider} style={{ left: `${(level + 1) * 16}px` }} />
          {sortedChildren.map((child, index) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
