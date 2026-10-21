import { analyzeScene } from '../helpers/analyze-scene'
import { disposeScene } from '../helpers/dispose-scene'
import { setWireframe } from '../helpers/materials'
import type { ModelStats } from '../types'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import type { Group } from 'three'

type ModelProps = {
  url: string
  wireframe: boolean
  onLoad: (stats: ModelStats) => void
}

export function Model({ url, wireframe, onLoad }: ModelProps) {
  const { scene, animations } = useGLTF(url)
  const root = useRef<Group>(null)
  const { actions, names } = useAnimations(animations, root)
  const { stats, materials, scale, offset } = useMemo(() => analyzeScene(scene), [scene])

  const latestScene = useRef(scene)

  useEffect(() => {
    latestScene.current = scene
  })

  useEffect(() => {
    return () => {
      useGLTF.clear(url)
      disposeScene(latestScene.current)
    }
  }, [url])

  useEffect(() => {
    onLoad({ ...stats, animations: animations.length })
  }, [stats, animations, onLoad])

  useEffect(() => {
    setWireframe(materials, wireframe)
  }, [materials, wireframe])

  useEffect(() => {
    const [name] = names
    const action = name ? actions[name] : null
    action?.play()

    return () => void action?.stop()
  }, [actions, names])

  return (
    <group position={offset} scale={scale}>
      <group ref={root}>
        <primitive object={scene} />
      </group>
    </group>
  )
}
