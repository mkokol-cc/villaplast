const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Elimina completamente el menú
  Menu.setApplicationMenu(null);

  // Maximiza la ventana
  win.maximize();

  win.loadFile(
    path.join(__dirname, '../dist/villaplast/browser/index.html')
  );
}

app.whenReady().then(createWindow);