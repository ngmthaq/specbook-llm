// See the Electron documentation for details on how to use preload scripts:

import { contextBridge } from 'electron';
import { VersionEmitter } from '../app/emitters';

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
class ElectronPreloadProcess {
  public constructor(private readonly versionEmitter: VersionEmitter) {}

  public start() {
    contextBridge.exposeInMainWorld('electronAPI', this.exposeAPIs());
  }

  private exposeAPIs() {
    return {
      ping: () => 'pong',
      versionEmitter: {
        getAppVersion: this.versionEmitter.emitGetAppVersion,
        getNodeVersion: this.versionEmitter.emitGetNodeVersion,
        getElectronVersion: this.versionEmitter.emitGetElectronVersion,
        getChromeVersion: this.versionEmitter.emitGetChromeVersion,
      },
    };
  }
}

// Init emitters
const versionEmitter = new VersionEmitter();

// Init the preload process
const electronPreloadProcess = new ElectronPreloadProcess(versionEmitter);

// Start the preload process
electronPreloadProcess.start();

// Declare the exposed APIs in the global window object
declare global {
  interface Window {
    electronAPI: ReturnType<ElectronPreloadProcess['exposeAPIs']>;
  }
}
