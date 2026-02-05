export interface ITreeNode {
  name: string;
  type: 'file' | 'folder';
  hash: string;
  children?: ITreeNode[];
}
