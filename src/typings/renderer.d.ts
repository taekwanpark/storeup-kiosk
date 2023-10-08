import { ElectronAPI } from '@electron-toolkit/preload'

export interface IElectronAPI {
  setTitle: (value: string) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    iElectronApi: IElectronAPI
  }
}
