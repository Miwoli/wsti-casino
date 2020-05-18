import { BrowserWindow, app } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: typeof BrowserWindow;

  private static onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onClose(): void {
    Main.mainWindow = null;
  }

  private static onReady(): void {
    Main.mainWindow = new Main.BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: true
      }
    });
    Main.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    Main.mainWindow.on('closed', Main.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow): void {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
  }
}

Main.main(app, BrowserWindow);