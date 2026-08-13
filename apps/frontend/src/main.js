const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Em modo dev (usando o Nx), apontamos para a porta padrão do Angular
  if (!app.isPackaged) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadURL(`file://${path.join(__dirname, '../../../dist/apps/frontend/browser/index.html')}`);
  }

  win.on('closed', () => win = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (win === null) createWindow();
});
