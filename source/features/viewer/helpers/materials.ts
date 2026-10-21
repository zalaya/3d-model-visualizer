import type { Material } from 'three'

export function setWireframe(materials: Material[], enabled: boolean) {
  for (const material of materials) {
    if ('wireframe' in material) {
      material.wireframe = enabled
    }
  }
}
