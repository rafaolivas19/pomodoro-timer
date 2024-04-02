const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    focusWindow: () => ipcRenderer.send('focus-window'),
})