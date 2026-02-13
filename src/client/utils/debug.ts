const electronAPI = window.electronAPI;

export async function debug(...args: unknown[]) {
  const isDev = await electronAPI.platformPublisher.isDev();
  if (isDev) console.log(`[DEBUG] ${new Date().toISOString()}`, ...args);
}

export async function showVersionInfo() {
  const [appVersion, nodeVersion, electronVersion, chromeVersion] = await Promise.all([
    electronAPI.versionPublisher.getAppVersion(),
    electronAPI.versionPublisher.getNodeVersion(),
    electronAPI.versionPublisher.getElectronVersion(),
    electronAPI.versionPublisher.getChromeVersion(),
  ]);

  console.log('App Version:', appVersion);
  console.log('Node.js Version:', nodeVersion);
  console.log('Electron Version:', electronVersion);
  console.log('Chrome Version:', chromeVersion);
}
