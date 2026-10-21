import { CAMERA_POSITION } from '../constants'
import type { Controls, ViewPreset } from '../types'

export function resetCamera(controls: Controls | null, modelHeight: number) {
  if (!controls) {
    return
  }

  const [x, y, z] = CAMERA_POSITION
  const targetY = modelHeight / 2

  controls.target.set(0, targetY, 0)
  controls.object.position.set(x, y + targetY, z)
  controls.update()
}

export function setViewPreset(controls: Controls | null, modelHeight: number, preset: ViewPreset) {
  if (!controls) return
  const targetY = modelHeight / 2
  const distance = 3.2
  const positions = {
    iso: [distance, targetY + 2.4, distance],
    front: [0, targetY, distance],
    side: [distance, targetY, 0],
    top: [0, targetY + distance, 0.01]
  } as const
  const [x, y, z] = positions[preset]
  controls.target.set(0, targetY, 0)
  controls.object.position.set(x, y, z)
  controls.update()
}
