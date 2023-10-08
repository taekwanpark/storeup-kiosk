import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

let mainWindow: Electron.BrowserWindow | null

function createWindow(): void {
  process.env.GOOGLE_API_KEY = 'AIzaSyBkHHVvy-OiH_bzZFmEzrx2oYqod9Epapo'

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      // 위치 권한을 요청합니다.
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: true,
      additionalArguments: ['--allow-file-access-from-files']
    }
  })

  /*
  |----------------------------------------------------------------------------------------
  | BrowserWindow 객체에서 ready-to-show 이벤트가 발생했을 때, 메인 창(mainWindow)을 표시하는 역할
  |----------------------------------------------------------------------------------------
  |
  | 기본적으로 Electron 애플리케이션은 모든 리소스가 로드되고 메인 창이 준비되었을 때 창을 표시
  | 때로는 리소스 로딩이 더 긴 시간이 걸릴 수 있으므로, ready-to-show 이벤트를 사용하여 메인 창을 표시할 때까지 대기
  |
  */
  mainWindow.on('ready-to-show', () => {
    console.log('---- READY-TO-SHOW ----')

    if (mainWindow) mainWindow.show()
  })

  /*
  |----------------------------------------------------------------
  | 새 창이 열리는 시나리오에서 메인 창 외부의 기본 브라우저로 URL 을 열게 됩니다 [??]
  |----------------------------------------------------------------
  |
  | shell.openExternal()
  | 을 호출하여 details.url 로 지정된 URL 을 기본 브라우저로 open
  | 즉, electron 새 창 대신 외부 브라우저로 링크가 열리도록 동작을 설정
  |
  | { action: 'deny' }
  | 를 반환하여 Electron 이 새 창을 열지 않도록 차단
  |
  */
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // ELECTRON_RENDERER_URL : local URL where Vite is running
  /*
  |----------------------------------------------------------------
  | Single Page [??]
  |----------------------------------------------------------------
  */

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log('---- SINGLE PAGE: DEV ----')

    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    console.log('---- SINGLE PAGE: PROD ----')

    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  /*
  |----------------------------------------------------------------
  | Multi Page [??]
  |----------------------------------------------------------------
  */
  // if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
  //   console.log('multi page:true')
  //   mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/index.html`)
  // } else {
  //   console.log('multi page:false')
  //   mainWindow.loadFile(join(__dirname, '../renderer/view.html'))
  // }

  /*
  |----------------------------------------------------------------
  | 확대/축소 단축키 등록
  |----------------------------------------------------------------
  */
  mainWindow.webContents.on('before-input-event', (_, input) => {
    if (mainWindow) {
      if ((input.control || input.meta) && input.key.toLowerCase() === '=') {
        // 확대
        mainWindow.webContents.setZoomFactor(mainWindow.webContents.getZoomFactor() + 0.1)
      } else if ((input.control || input.meta) && input.key.toLowerCase() === '-') {
        // 축소
        mainWindow.webContents.setZoomFactor(mainWindow.webContents.getZoomFactor() - 0.1)
      }
    }
  })

  /*
  |----------------------------------------------------------------
  | open DevTools
  |----------------------------------------------------------------
  */
  mainWindow.webContents.openDevTools()
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.storeup-kiosk')

  // for kakao map
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    console.log('---- BROWSER-WINDOW-CREATED ----')
    optimizer.watchWindowShortcuts(window)
  })

  ipcHandler()
  createWindow()
  /*
  |----------------------------------------------------------------
  | 실행 시
  |----------------------------------------------------------------
  */
  app.on('activate', function () {
    console.log('---- ACTIVATE ----')
    // On macOS it's common to re-create a window in the app
    // when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  /*
  |----------------------------------------------------------------
  | self certificate
  |----------------------------------------------------------------
  */
  app.on('certificate-error', (event, _, __, ___, ____, callback) => {
    console.log('---- CERTIFICATE-ERROR ----')
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault()

    callback(true)
  })
})

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('---- WINDOW-ALL-CLOSED ----')

  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ipcHandler(): void {
  console.log('---- ipcHandler ----')

  ipcMain.on('set-title', handleSetTitle)

  ipcMain.on('request-location-permission', (event) => {
    // 사용자에게 위치 권한을 요청하는 로직을 구현합니다.
    // 예를 들어, 다이얼로그를 표시하여 사용자에게 권한 요청을 보여줄 수 있습니다.

    // 위치 권한을 허용한 경우
    event.reply('location-permission-granted')

    // 위치 권한을 거부한 경우
    // event.reply('location-permission-denied');
  })
}

/**
 *
 * @param event
 * @param title
 */
function handleSetTitle(event, title): void {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win!.setTitle(title)
}
