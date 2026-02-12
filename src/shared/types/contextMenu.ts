export interface OpenContextMenuPayload {
  x: number;
  y: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OpenFolderTreeContextMenuPayload extends OpenContextMenuPayload {}

export interface OpenFolderNodeContextMenuPayload extends OpenContextMenuPayload {
  folderPath: string;
}

export interface OpenFileNodeContextMenuPayload extends OpenContextMenuPayload {
  filePath: string;
}
