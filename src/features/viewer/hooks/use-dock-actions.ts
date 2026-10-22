import { Box, Camera, Grid3x3, Info, Rotate3d, RotateCcw } from 'lucide-react'
import { useKeyboardShortcuts } from '@/shared/hooks/use-keyboard-shortcuts'
import type { DockGroup, ViewerSettings } from '../types'

type UseDockActionsOptions = {
  settings: ViewerSettings
  onToggle: (key: keyof ViewerSettings) => void
  onResetCamera: () => void
  onScreenshot: () => void
}

export function useDockActions({
  settings,
  onToggle,
  onResetCamera,
  onScreenshot,
}: UseDockActionsOptions) {
  const groups: DockGroup[] = [
    {
      id: 'view',
      actions: [
        {
          label: 'Grid',
          icon: Grid3x3,
          shortcut: 'G',
          active: settings.grid,
          run: () => onToggle('grid'),
        },
        {
          label: 'Wireframe',
          icon: Box,
          shortcut: 'W',
          active: settings.wireframe,
          run: () => onToggle('wireframe'),
        },
        {
          label: 'Auto-rotate',
          icon: Rotate3d,
          shortcut: 'R',
          active: settings.autoRotate,
          run: () => onToggle('autoRotate'),
        },
        {
          label: 'Model info',
          icon: Info,
          shortcut: 'I',
          active: settings.info,
          run: () => onToggle('info'),
        },
      ],
    },
    {
      id: 'camera',
      actions: [
        {
          label: 'Reset camera',
          icon: RotateCcw,
          shortcut: 'F',
          run: onResetCamera,
        },
        { label: 'Screenshot', icon: Camera, shortcut: 'S', run: onScreenshot },
      ],
    },
  ]

  useKeyboardShortcuts(groups.flatMap((group) => group.actions))

  return groups
}
