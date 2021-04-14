const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

require("@electron/remote/main").initialize()

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true
    }
  })
  win.loadURL('http://localhost:3000')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})