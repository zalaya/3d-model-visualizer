import { analyzeScene } from '../helpers/analyze-scene'
import { disposeScene } from '../helpers/dispose-scene'
import { setWireframe } from '../helpers/materials'
import type { ModelStats } from '../types'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { Group } from 'three'

type ModelProps = {
  url: string
  resources: Record<string, string>
  wireframe: boolean
  animationName: string | null
  animationPlaying: boolean
  animationSpeed: number
  onLoad: (stats: ModelStats) => void
}

export function Model({ url, resources, wireframe, animationName, animationPlaying, animationSpeed, onLoad }: ModelProps) {
  const extendLoader = useCallback((loader: Parameters<NonNullable<Parameters<typeof useGLTF>[3]>>[0]) => {
    loader.manager.setURLModifier((resourceUrl) => {
      const normalized = decodeURIComponent(resourceUrl).replaceAll('\\', '/').replace(/^\.\//, '').toLowerCase()
      const fileName = normalized.split('/').pop()
      return resources[normalized] ?? (fileName ? resources[fileName] : undefined) ?? resourceUrl
    })
  }, [resources])
  const { scene, animations } = useGLTF(url, false, false, extendLoader)
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
    onLoad({ ...stats, animations: animations.length, animationNames: names })
  }, [stats, animations, names, onLoad])

  useEffect(() => {
    setWireframe(materials, wireframe)
  }, [materials, wireframe])

  useEffect(() => {
    for (const action of Object.values(actions)) {
      action?.stop()
    }

    const name = animationName ?? names[0]
    const action = name ? actions[name] : null
    if (action) {
      action.reset().setEffectiveTimeScale(animationSpeed).play()
    }

    return () => void action?.stop()
  }, [actions, animationName, animationSpeed, names])

  useEffect(() => {
    const name = animationName ?? names[0]
    const action = name ? actions[name] : null
    if (!action) {
      return
    }

    action.setEffectiveTimeScale(animationSpeed)
    action.paused = !animationPlaying
  }, [actions, animationName, animationPlaying, animationSpeed, names])

  return (
    <group position={offset} scale={scale}>
      <group ref={root}>
        <primitive object={scene} />
      </group>
    </group>
  )
}
