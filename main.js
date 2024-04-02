const { app, BrowserWindow, screen, ipcMain } = require('electron')
const path = require('path')

app.whenReady().then(() => {
    const width = 200
    const height = 150
    const cursorPoint = screen.getCursorScreenPoint()
    const activeDisplay = screen.getDisplayNearestPoint(cursorPoint)

    const win = new BrowserWindow({
        width,
        height,
        x: activeDisplay.bounds.x + (activeDisplay.bounds.width / 2) - (width / 2),
        y: activeDisplay.bounds.y + (activeDisplay.bounds.height / 2) - (height / 2),
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('focus-window', () => {
        win.show()
        win.focus()
    })

    win.loadFile('index.html')
})