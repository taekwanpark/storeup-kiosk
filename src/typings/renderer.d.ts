export interface IElectronAPI {
  node: () => string
  chrome: () => string
  electron: () => string
  exposeDev: () => Promise<string>
  getGeolocation: () => GeolocationPosition
}
declare global {
  interface Window {
    iElectronApi: IElectronAPI
  }
}
