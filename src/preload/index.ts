import {contextBridge, ipcRenderer} from 'electron'
import {electronAPI} from '@electron-toolkit/preload'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    ipcRenderer.send('request-location-permission')

    ipcRenderer.on('location-permission-granted', () => {
        console.log('location permission granted')
        // 위치 권한을 허용한 경우 처리할 로직을 구현합니다.
    })
    ipcRenderer.on('location-permission-denied', () => {
        // 위치 권한을 거부한 경우 처리할 로직을 구현합니다.

        console.log('location permission denied')
    })

    /*
    |------------------------------------------------------------------------
    |
    |------------------------------------------------------------------------
    */
    console.log('preload')
    try {
        // example
        contextBridge.exposeInMainWorld('versions', {
            node: () => process.versions.node,
            chrome: () => process.versions.chrome,
            electron: () => process.versions.electron,
            ping: () => ipcRenderer.invoke('ping')
            // we can also expose variables, not just functions
        })

        contextBridge.exposeInMainWorld('electron', electronAPI)

        contextBridge.exposeInMainWorld('kioskElectronApi', {
            setTitle: (title: string) => ipcRenderer.send('set-title', title)
        })
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
}
