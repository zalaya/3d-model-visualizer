import { DEFAULT_SETTINGS } from '../constants'
import type { ViewerSettings } from '../types'
import { useCallback, useState } from 'react'

export function useViewerSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const toggle = useCallback((key: keyof ViewerSettings) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }))
  }, [])

  return { settings, toggle }
}
