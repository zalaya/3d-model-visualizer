import { resetCamera } from '../helpers/camera'
import { downloadScreenshot } from '../helpers/screenshot'
import { useDockActions } from '../hooks/use-dock-actions'
import { useViewerSettings } from '../hooks/use-viewer-settings'
import type { Controls, ModelStats } from '../types'
import { Dock } from './Dock'
import { Loader } from './Loader'
import { Scene } from './Scene'
import { StatsPanel } from './StatsPanel'
import type { ModelFile } from '@/features/model-loader'
import type { RootState } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'

type ViewerProps = {
  model: ModelFile
  onBrowse: () => void
  onError: (error: Error) => void
}

export function Viewer({ model, onBrowse, onError }: ViewerProps) {
  const { settings, toggle } = useViewerSettings()
  const [stats, setStats] = useState<ModelStats | null>(null)
  const controls = useRef<Controls>(null)
  const canvas = useRef<RootState>(null)

  const modelHeight = stats?.height ?? 0

  const handleResetCamera = useCallback(() => resetCamera(controls.current, modelHeight), [modelHeight])
  const handleScreenshot = () => downloadScreenshot(canvas.current, model.name)

  useEffect(handleResetCamera, [handleResetCamera])

  const groups = useDockActions({
    settings,
    onToggle: toggle,
    onBrowse,
    onResetCamera: handleResetCamera,
    onScreenshot: handleScreenshot
  })

  return (
    <div className='absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgb(255_255_255/0.07),transparent_70%)]'>
      <Scene
        url={model.url}
        grid={settings.grid}
        wireframe={settings.wireframe}
        autoRotate={settings.autoRotate}
        controls={controls}
        onReady={(state) => {
          canvas.current = state
        }}
        onLoad={setStats}
        onError={onError}
      />
      <Loader />
      {settings.info && stats && <StatsPanel stats={stats} fileSize={model.size} />}
      <Dock groups={groups} />
    </div>
  )
}
