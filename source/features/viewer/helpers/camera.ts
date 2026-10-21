import { CAMERA_POSITION } from '../constants'
import type { Controls } from '../types'

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
