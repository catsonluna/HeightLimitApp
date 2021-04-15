const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'Files',
  {
    Read: () => ipcRenderer.send('GetFiles')
  }
  
)