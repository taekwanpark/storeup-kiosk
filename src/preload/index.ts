import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  /*
  |------------------------------------------------------------------------
  |
  |------------------------------------------------------------------------
  |
  */
  ipcRenderer.send('request-location-permission')

  ipcRenderer.on('location-permission-granted', () => {
    // 위치 권한을 허용한 경우 처리할 로직을 구현합니다.
  })

  ipcRenderer.on('location-permission-denied', () => {
    // 위치 권한을 거부한 경우 처리할 로직을 구현합니다.
  })

  const geolocation = navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)
      return { fromLat: latitude, fromLon: longitude }
    },
    (error) => {
      console.error(`Error retrieving geolocation: ${error.message}`)
    }
  )
  /*
  |------------------------------------------------------------------------
  | 
  |------------------------------------------------------------------------
  */
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('iElectronApi', {
      node: () => process.versions.node,
      chrome: () => process.versions.chrome,
      electron: () => process.versions.electron,
      exposeDev: () => ipcRenderer.invoke('ipc-invoke-dev'),
      getGeolocation: () => ipcRenderer.invoke('get-geolocation-api', geolocation)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
