const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { fork } = require('child_process');
const fs = require('fs');

let win;
let backendProcess;

function getLogPath() {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'backend.log');
}

function log(message) {
  const logPath = getLogPath();
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logPath, line);
  console.log(message);
}

function startBackend() {
  if (app.isPackaged) {
    const asarRoot = path.join(__dirname, '..', '..', '..');
    const unpackedRoot = asarRoot.replace('app.asar', 'app.asar.unpacked');
    const backendPath = path.join(unpackedRoot, 'dist', 'apps', 'backend', 'main.js');
    const nodeModulesPath = path.join(unpackedRoot, 'node_modules');

    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'database.db');

    const templateDbPath = path.join(process.resourcesPath, 'database.db');
    if (!fs.existsSync(dbPath) && fs.existsSync(templateDbPath)) {
      log(`Copiando banco de dados modelo inicial de ${templateDbPath} para ${dbPath}`);
      fs.copyFileSync(templateDbPath, dbPath);
    }

    const databaseUrl = `file:${dbPath.replace(/\\/g, '/')}`;

    log(`__dirname: ${__dirname}`);
    log(`asarRoot: ${asarRoot}`);
    log(`unpackedRoot: ${unpackedRoot}`);
    log(`backendPath: ${backendPath}`);
    log(`backendPath existe: ${fs.existsSync(backendPath)}`);
    log(`nodeModulesPath: ${nodeModulesPath}`);
    log(`nodeModulesPath existe: ${fs.existsSync(nodeModulesPath)}`);
    log(`Database URL producao: ${databaseUrl}`);

    if (fs.existsSync(backendPath)) {
      backendProcess = fork(backendPath, [], {
        env: {
          ...process.env,
          PORT: '3000',
          DATABASE_URL: databaseUrl,
          NODE_PATH: nodeModulesPath,
        },
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      });
      backendProcess.stdout.on('data', (data) => {
        log(`[backend stdout] ${data.toString().trim()}`);
      });
      backendProcess.stderr.on('data', (data) => {
        log(`[backend stderr] ${data.toString().trim()}`);
      });
      backendProcess.on('error', (err) => {
        log(`Erro ao iniciar o backend: ${err.message}`);
      });
      backendProcess.on('exit', (code, signal) => {
        log(`Backend encerrado com código ${code}, sinal ${signal}`);
      });
      log('Backend fork() executado com sucesso');
    } else {
      log(`ERRO: Arquivo de build do backend não encontrado em: ${backendPath}`);
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
