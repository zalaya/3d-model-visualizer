import { isMesh, isTexture } from './guards'
import type { Object3D } from 'three'

export function disposeScene(scene: Object3D) {
  scene.traverse((object) => {
    if (!isMesh(object)) {
      return
    }

    object.geometry.dispose()

    for (const material of [object.material].flat()) {
      for (const texture of Object.values(material).filter(isTexture)) {
        texture.dispose()
      }
      material.dispose()
    }
  })
}
