require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const database = require('./src/database/database');

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');
require('electron-debug')();

database.runUpgrades()
  .then(() => console.log('DONE'));

const isDevelopment = process.env.NODE_ENV === 'development';

let startUrl = url.format({
  pathname: path.join(__dirname, '/build/index.html'),
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
    Promise.all([
      installExtension(REACT_DEVELOPER_TOOLS),
      installExtension(REDUX_DEVTOOLS),
    ]).then(() => null)
      .catch(() => null);

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


