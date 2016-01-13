'use strict';

const ipc = require('electron').ipcMain;

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;

let mainWindow;
let appIcon;

function createWindow () 
{
  mainWindow = new BrowserWindow({width: 982, height: 600, frame: false, resizable: false});

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () =>  
  {
    mainWindow = null;
    app.quit();
  });
}

function createTray()
{
    appIcon = new Tray(__dirname + '/163Music.png');
    var contextMenu = Menu.buildFromTemplate([
      { label: '⏯  Play / Pause', click: () => { playControl('playPause'); } },
      { label: '⏩ Next', click: () => { playControl('next'); } },
      { label: '⏪ Previous', click: () => { playControl('previous'); } },
      { type: 'separator' },
      { label: 'Main Window', click: ()=>{ windowControl('showMain'); } },
      { label: 'Quit', click: () => { app.quit(); }}
    ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
}

function playControl(cmd)
{
    mainWindow.webContents.send("playControl", cmd);
}

function windowControl(cmd)
{
    mainWindow.webContents.send("windowControl", cmd);
}

app.on('ready', () =>
{
    createWindow();
    createTray();
});

app.on('window-all-closed', () =>
{
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () =>
{
  if (mainWindow === null) {
    createWindow();
  }
});
