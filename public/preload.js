const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'Files',
  {
    ReadVanilla: () => ipcRenderer.send('GetVanilla'),
    ReadLunar: () => ipcRenderer.send('GetLunar'),
    ReadBLC: () => ipcRenderer.send('GetBLC'),
    ReadCustom: () => ipcRenderer.send('GetCustom')

  }
  
)