import type { Shortcut } from '@/shared/hooks/use-keyboard-shortcuts'
import type { OrbitControls } from '@react-three/drei'
import type { LucideIcon } from 'lucide-react'
import type { ComponentRef } from 'react'
import type { Material, Vector3 } from 'three'

export type Controls = ComponentRef<typeof OrbitControls>

export type ModelStats = {
  vertices: number
  triangles: number
  meshes: number
  materials: number
  textures: number
  animations: number
  dimensions: Vector3
  height: number
}

export type SceneAnalysis = {
  stats: Omit<ModelStats, 'animations'>
  materials: Material[]
  scale: number
  offset: Vector3
}

export type ViewerSettings = {
  grid: boolean
  wireframe: boolean
  autoRotate: boolean
  info: boolean
}

export type DockAction = {
  label: string
  icon: LucideIcon
  active?: boolean
} & Shortcut

export type DockGroup = {
  id: string
  actions: DockAction[]
}
