const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const statistics = require('./statistics')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  // ipcMain.handle 在主进程注册处理程序 'ping'
  // 并在预处理程序总触发
  ipcMain.handle('ipcMainStats', (event, arg) => {
    return statistics(arg)
  })

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