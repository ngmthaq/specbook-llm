export interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  hash: string;
  children?: TreeNode[];
}

export interface OpenWorkspaceResult {
  success: boolean;
  workspacePath?: string;
  tree?: TreeNode[];
  error?: string;
}
