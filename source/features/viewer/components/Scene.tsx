import { CAMERA_FOV, CAMERA_POSITION } from '../constants'
import type { Controls, ModelStats } from '../types'
import { Model } from './Model'
import { ModelErrorBoundary } from './ModelErrorBoundary'
import { ContactShadows, Environment, Grid, Lightformer, OrbitControls } from '@react-three/drei'
import { Canvas, type RootState } from '@react-three/fiber'
import { type RefObject, Suspense } from 'react'

type SceneProps = {
  url: string
  grid: boolean
  wireframe: boolean
  autoRotate: boolean
  controls: RefObject<Controls | null>
  onReady: (state: RootState) => void
  onLoad: (stats: ModelStats) => void
  onError: (error: Error) => void
}

export function Scene({ url, grid, wireframe, autoRotate, controls, onReady, onLoad, onError }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: CAMERA_FOV, position: [...CAMERA_POSITION] }}
      onCreated={onReady}
    >
      <ModelErrorBoundary onError={onError}>
        <Suspense fallback={null}>
          <Environment resolution={256}>
            <color attach='background' args={['#222222']} />
            <Lightformer form='rect' intensity={2} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
            <Lightformer form='rect' intensity={3} position={[0, 4, -6]} scale={[12, 6, 1]} />
            <Lightformer form='rect' intensity={2} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 5, 1]} />
            <Lightformer form='rect' intensity={2} position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[8, 5, 1]} />
            <Lightformer form='ring' intensity={1} position={[0, 4, 4]} scale={4} />
          </Environment>
          <Model url={url} wireframe={wireframe} onLoad={onLoad} />
        </Suspense>
      </ModelErrorBoundary>

      <ContactShadows opacity={0.6} scale={10} blur={2.5} far={4} resolution={512} />
      {grid && (
        <Grid
          infiniteGrid
          position-y={-0.002}
          cellSize={0.25}
          cellThickness={0.6}
          cellColor='#262626'
          sectionSize={1}
          sectionThickness={1}
          sectionColor='#404040'
          fadeDistance={24}
          fadeStrength={1.5}
        />
      )}
      <OrbitControls ref={controls} makeDefault autoRotate={autoRotate} />
    </Canvas>
  )
}
