import { contextBridge, ipcRenderer } from 'electron';
import { ContextMenuPublisher } from '../app/modules/context-menu/context-menu.publisher';
import { FilePublisher } from '../app/modules/file/file.publisher';
import { PlatformPublisher } from '../app/modules/platform/platform.publisher';
import { StoragePublisher } from '../app/modules/storage/storage.publisher';
import { VersionPublisher } from '../app/modules/version/version.publisher';
import { PreloadEventCallback } from '../shared/types/events';

class ElectronPreloadProcess {
  public constructor(
    private readonly versionPublisher: VersionPublisher,
    private readonly platformPublisher: PlatformPublisher,
    private readonly filePublisher: FilePublisher,
    private readonly storagePublisher: StoragePublisher,
    private readonly contextMenuPublisher: ContextMenuPublisher,
  ) {}

  public start = () => {
    contextBridge.exposeInMainWorld('electronAPI', this.exposeAPIs());
  };

  private ping = () => {
    return 'pong';
  };

  private on = (channel: string, callback: PreloadEventCallback) => {
    ipcRenderer.addListener(channel, (event, ...args) => callback(...args));
  };

  private off = (channel: string, callback: PreloadEventCallback) => {
    ipcRenderer.removeListener(channel, (event, ...args) => callback(...args));
  };

  private exposeAPIs = () => {
    return {
      ping: this.ping,
      on: this.on,
      off: this.off,
      versionPublisher: this.versionPublisher,
      platformPublisher: this.platformPublisher,
      filePublisher: this.filePublisher,
      storagePublisher: this.storagePublisher,
      contextMenuPublisher: this.contextMenuPublisher,
    };
  };
}

// Init the preload process
const electronPreloadProcess = new ElectronPreloadProcess(
  new VersionPublisher(),
  new PlatformPublisher(),
  new FilePublisher(),
  new StoragePublisher(),
  new ContextMenuPublisher(),
);

// Start the preload process
electronPreloadProcess.start();

// Declare the exposed APIs in the global window object
declare global {
  interface Window {
    electronAPI: ReturnType<ElectronPreloadProcess['exposeAPIs']>;
  }
}
