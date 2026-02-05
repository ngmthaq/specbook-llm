import { ITreeNode } from '../types';

export function getFullPath(
  treeNode: ITreeNode[],
  targetNode: ITreeNode,
  currentPath = '',
): string | null {
  for (const node of treeNode) {
    const newPath = currentPath ? `${currentPath}/${node.name}` : node.name;
    if (node.hash === targetNode.hash) return newPath;
    if (node.type === 'folder' && node.children) {
      const result = getFullPath(node.children, targetNode, newPath);
      if (result) return result;
    }
  }

  return null;
}
