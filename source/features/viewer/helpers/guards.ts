import type { Mesh, Object3D, Texture } from 'three'

export function isMesh(object: Object3D): object is Mesh {
  return (object as Mesh).isMesh
}

export function isTexture(value: unknown): value is Texture {
  return (value as Texture | null)?.isTexture === true
}
