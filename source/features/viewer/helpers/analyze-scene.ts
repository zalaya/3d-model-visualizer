import { MODEL_SIZE } from '../constants'
import type { SceneAnalysis } from '../types'
import { isMesh, isTexture } from './guards'
import { Box3, type Material, type Object3D, type Texture, Vector3 } from 'three'

export function analyzeScene(scene: Object3D): SceneAnalysis {
  const box = new Box3().setFromObject(scene)
  const dimensions = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  const largestSide = Math.max(dimensions.x, dimensions.y, dimensions.z)

  if (!Number.isFinite(largestSide) || largestSide === 0) {
    throw new Error('the model has no visible geometry')
  }

  const scale = MODEL_SIZE / largestSide
  const offset = new Vector3(-center.x, -box.min.y, -center.z).multiplyScalar(scale)

  let vertices = 0
  let triangles = 0
  let meshes = 0
  const materials = new Set<Material>()
  const textures = new Set<Texture>()

  scene.traverse((object) => {
    if (!isMesh(object)) {
      return
    }

    const { index, attributes } = object.geometry
    const vertexCount = attributes.position?.count ?? 0
    meshes++
    vertices += vertexCount
    triangles += (index?.count ?? vertexCount) / 3

    for (const material of [object.material].flat()) {
      materials.add(material)
      for (const texture of Object.values(material).filter(isTexture)) {
        textures.add(texture)
      }
    }
  })

  return {
    stats: {
      vertices,
      triangles: Math.round(triangles),
      meshes,
      materials: materials.size,
      textures: textures.size,
      dimensions,
      height: dimensions.y * scale
    },
    materials: [...materials],
    scale,
    offset
  }
}
