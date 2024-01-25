const { app, dialog, BrowserWindow, ipcMain } = require('electron')
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

  ipcMain.handle('selectFileSync', (event, arg) => {
    const res = dialog.showOpenDialogSync({
      title: '选择文件',
      defaultPath: app.getPath('downloads'),
      buttonLabel: '确认',
      filters: [
        // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
        { name: 'Custom File Type', extensions: ['js', 'vue'] },
        // { name: 'All Files', extensions: ['*'] }
      ],
      // 在 Windows 和 Linux ，一个打开的 dialog 不能既是文件选择框又是目录选择框
      // 所以如果在这些平台上设置 properties 的值为 ['openFile', 'openDirectory'] , 将展示一个目录选择框.
      properties: ['openFile', 'showHiddenFiles'],
      message: '文件选择'
    })
    console.log(res)
    return res
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
