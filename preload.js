const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  // 暴露触发函数
  ipcMainStats: (args) => ipcRenderer.invoke('ipcMainStats', args)
})

contextBridge.exposeInMainWorld('FrameDialog', {
  selectFileSync: (args) => ipcRenderer.invoke('selectFileSync', args)
})
