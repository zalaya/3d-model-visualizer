import type { ViewerSettings } from './types'

export const MODEL_SIZE = 2

export const CAMERA_FOV = 40
export const CAMERA_POSITION = [3.2, 2.4, 3.2] as const

export const DEFAULT_SETTINGS: ViewerSettings = {
  grid: true,
  wireframe: false,
  autoRotate: false,
  info: true
}
