const { app, BrowserWindow, dialog, ipcMain } = require('electron')

const path = require('path')
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

require("@electron/remote/main").initialize()

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
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
const homeDirectory = app.getPath('home').replace(/\\/g, "\/");
const paths =
  `${homeDirectory}/AppData/Roaming/.minecraft/logs/latest.log`

ipcMain.on('GetFiles', () => {
  console.log("this works")

    // fileNames is an array that contains all the selected
    fs.readFile(paths, 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        // Change how to handle the file content
        console.log("The file content is : " + data);
});
});