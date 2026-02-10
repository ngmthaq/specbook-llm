// See the Electron documentation for details on how to use preload scripts:

import { contextBridge } from 'electron';
import { FilePublisher } from '../app/modules/file/file.publisher';
import { PlatformPublisher } from '../app/modules/platform/platform.publisher';
import { StoragePublisher } from '../app/modules/storage/storage.publisher';
import { VersionPublisher } from '../app/modules/version/version.publisher';

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
class ElectronPreloadProcess {
  public constructor(
    private readonly versionPublisher: VersionPublisher,
    private readonly platformPublisher: PlatformPublisher,
    private readonly filePublisher: FilePublisher,
    private readonly storagePublisher: StoragePublisher,
  ) {}

  public start = () => {
    contextBridge.exposeInMainWorld('electronAPI', this.exposeAPIs());
  };

  private exposeAPIs = () => {
    return {
      ping: () => 'pong',
      versionPublisher: this.versionPublisher,
      platformPublisher: this.platformPublisher,
      filePublisher: this.filePublisher,
      storagePublisher: this.storagePublisher,
    };
  };
}

// Init the preload process
const electronPreloadProcess = new ElectronPreloadProcess(
  new VersionPublisher(),
  new PlatformPublisher(),
  new FilePublisher(),
  new StoragePublisher(),
);

// Start the preload process
electronPreloadProcess.start();

// Declare the exposed APIs in the global window object
declare global {
  interface Window {
    electronAPI: ReturnType<ElectronPreloadProcess['exposeAPIs']>;
  }
}
