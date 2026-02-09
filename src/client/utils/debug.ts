export async function debug(...args: unknown[]) {
  const isDev = await window.electronAPI.platformPublisher.isDev();
  if (isDev) console.log(`[DEBUG] ${new Date().toISOString()}`, ...args);
}

export async function showVersionInfo() {
  const [appVersion, nodeVersion, electronVersion, chromeVersion] = await Promise.all([
    window.electronAPI.versionPublisher.getAppVersion(),
    window.electronAPI.versionPublisher.getNodeVersion(),
    window.electronAPI.versionPublisher.getElectronVersion(),
    window.electronAPI.versionPublisher.getChromeVersion(),
  ]);

  console.log('App Version:', appVersion);
  console.log('Node.js Version:', nodeVersion);
  console.log('Electron Version:', electronVersion);
  console.log('Chrome Version:', chromeVersion);
}
