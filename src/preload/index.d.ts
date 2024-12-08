import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      windowMinimize: () => void
      windowMaximize: () => void
      windowClose: () => void
    }
  }
}

export {}