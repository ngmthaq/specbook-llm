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

export interface CreateFolderResult {
  success: boolean;
  folderPath?: string;
  error?: string;
}

export interface RenameFileResult {
  success: boolean;
  oldPath?: string;
  newPath?: string;
  error?: string;
}

export interface RenameFolderResult {
  success: boolean;
  oldPath?: string;
  newPath?: string;
  error?: string;
}

export interface DeleteFileResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

export interface DeleteFolderResult {
  success: boolean;
  folderPath?: string;
  error?: string;
}
