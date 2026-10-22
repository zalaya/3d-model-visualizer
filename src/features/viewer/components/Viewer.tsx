import type { RootState } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ModelFile } from '@/features/model-loader'
import { useDockActions } from '../hooks/use-dock-actions'
import { useViewerSettings } from '../hooks/use-viewer-settings'
import { resetCamera } from '../lib/camera'
import { downloadScreenshot } from '../lib/screenshot'
import type { Controls, ModelStats } from '../types'
import { AnimationPanel } from './AnimationPanel'
import { Dock } from './Dock'
import { Loader } from './Loader'
import { Scene } from './Scene'
import { StatsPanel } from './StatsPanel'

type ViewerProps = {
  model: ModelFile
  onError: (error: Error) => void
}

export function Viewer({ model, onError }: ViewerProps) {
  const { settings, toggle } = useViewerSettings()
  const [stats, setStats] = useState<ModelStats | null>(null)
  const [animationName, setAnimationName] = useState<string | null>(null)
  const [animationPlaying, setAnimationPlaying] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const controls = useRef<Controls>(null)
  const canvas = useRef<RootState>(null)

  const modelHeight = stats?.height ?? 0

  const handleResetCamera = useCallback(() => {
    resetCamera(controls.current, modelHeight)
  }, [modelHeight])
  const handleScreenshot = () => downloadScreenshot(canvas.current, model.name)
  const handleModelLoad = useCallback((nextStats: ModelStats) => {
    setStats(nextStats)
    setAnimationName(
      (current) => current ?? nextStats.animationNames[0] ?? null,
    )
  }, [])

  useEffect(handleResetCamera, [handleResetCamera])

  const groups = useDockActions({
    settings,
    onToggle: toggle,
    onResetCamera: handleResetCamera,
    onScreenshot: handleScreenshot,
  })

  return (
    <div className='absolute inset-0 bg-[#0b1018] pt-24'>
      <Scene
        url={model.url}
        resources={model.resources}
        grid={settings.grid}
        wireframe={settings.wireframe}
        autoRotate={settings.autoRotate}
        animationName={animationName}
        animationPlaying={animationPlaying}
        animationSpeed={animationSpeed}
        controls={controls}
        onReady={(state) => {
          canvas.current = state
        }}
        onLoad={handleModelLoad}
        onError={onError}
      />
      <Loader />
      {settings.info && stats && (
        <StatsPanel stats={stats} fileSize={model.size} />
      )}
      {stats && stats.animationNames.length > 0 && (
        <AnimationPanel
          names={stats.animationNames}
          selected={animationName ?? stats.animationNames[0] ?? ''}
          playing={animationPlaying}
          speed={animationSpeed}
          onSelect={setAnimationName}
          onToggle={() => setAnimationPlaying((playing) => !playing)}
          onSpeedChange={setAnimationSpeed}
        />
      )}
      <Dock groups={groups} />
    </div>
  )
}
