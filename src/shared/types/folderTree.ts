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

export interface OpenFileResult {
  success: boolean;
  filePath?: string;
  content?: string;
  error?: string;
}

export interface SaveFileResult {
  success: boolean;
  error?: string;
}
