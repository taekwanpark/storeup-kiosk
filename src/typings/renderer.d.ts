import {ElectronAPI} from '@electron-toolkit/preload'

export interface KioskElectronApi {
    setTitle: (value: string) => void
}

declare global {
    interface Window {
        electron: ElectronAPI
        kioskElectronApi: KioskElectronApi
    }
}
