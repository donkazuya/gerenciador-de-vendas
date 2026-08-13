const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { fork } = require('child_process');
const fs = require('fs');

let win;
let backendProcess;

function startBackend() {
  if (app.isPackaged) {
    let backendPath = path.join(__dirname, '../../../dist/apps/backend/main.js');
    if (!fs.existsSync(backendPath)) {
      backendPath = backendPath.replace('app.asar', 'app.asar.unpacked');
    }
    if (fs.existsSync(backendPath)) {
      backendProcess = fork(backendPath, [], {
        env: { ...process.env, PORT: 3000 },
      });
      console.log('Backend iniciado com sucesso via Electron:', backendPath);
    } else {
      console.error('Arquivo de build do backend não encontrado em:', backendPath);
    }
  }
}

function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    autoHideMenuBar: app.isPackaged,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Em modo dev (usando o Nx), apontamos para a porta padrão do Angular
  if (!app.isPackaged) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.setMenu(null);
    Menu.setApplicationMenu(null);
    const indexPath = path.join(__dirname, '../../../dist/apps/frontend/browser/index.html');
    win.loadFile(indexPath).catch((err) => {
      console.error('Erro ao carregar index.html:', err);
    });
  }

  win.on('closed', () => (win = null));
}

app.on('ready', () => {
  startBackend();
  createWindow();
});

app.on('window-all-closed', () => {
  stopBackend();
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  stopBackend();
});

app.on('activate', () => {
  if (win === null) createWindow();
});
