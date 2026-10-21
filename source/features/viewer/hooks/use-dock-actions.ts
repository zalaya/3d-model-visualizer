import type { DockGroup, ViewerSettings } from '../types'
import { useKeyboardShortcuts } from '@/shared/hooks/use-keyboard-shortcuts'
import { Box, Camera, Grid3x3, Info, Rotate3d, RotateCcw, Upload } from 'lucide-react'

type UseDockActionsOptions = {
  settings: ViewerSettings
  onToggle: (key: keyof ViewerSettings) => void
  onBrowse: () => void
  onResetCamera: () => void
  onScreenshot: () => void
}

export function useDockActions({ settings, onToggle, onBrowse, onResetCamera, onScreenshot }: UseDockActionsOptions) {
  const groups: DockGroup[] = [
    {
      id: 'file',
      actions: [{ label: 'Open file', icon: Upload, shortcut: 'O', run: onBrowse }]
    },
    {
      id: 'view',
      actions: [
        { label: 'Grid', icon: Grid3x3, shortcut: 'G', active: settings.grid, run: () => onToggle('grid') },
        { label: 'Wireframe', icon: Box, shortcut: 'W', active: settings.wireframe, run: () => onToggle('wireframe') },
        {
          label: 'Auto-rotate',
          icon: Rotate3d,
          shortcut: 'R',
          active: settings.autoRotate,
          run: () => onToggle('autoRotate')
        },
        { label: 'Model info', icon: Info, shortcut: 'I', active: settings.info, run: () => onToggle('info') }
      ]
    },
    {
      id: 'camera',
      actions: [
        { label: 'Reset camera', icon: RotateCcw, shortcut: 'F', run: onResetCamera },
        { label: 'Screenshot', icon: Camera, shortcut: 'S', run: onScreenshot }
      ]
    }
  ]

  useKeyboardShortcuts(groups.flatMap((group) => group.actions))

  return groups
}
