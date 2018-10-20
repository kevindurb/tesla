const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');
require('electron-debug')();

process.env.GOOGLE_API_KEY = 'AIzaSyBRkVOSiB4LW-NdatSTsfMbyPWxUSa1CFA';
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
}

let startUrl = url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true
});

if (isDevelopment) {
  require('react-scripts/scripts/start');
  startUrl = 'http://localhost:3000';
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(startUrl);
  if (isDevelopment) {
    installExtension(REACT_DEVELOPER_TOOLS);
    installExtension(REDUX_DEVTOOLS);

    mainWindow.once('show', () => {
      mainWindow.webContents.openDevTools();
    })
  }
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});


