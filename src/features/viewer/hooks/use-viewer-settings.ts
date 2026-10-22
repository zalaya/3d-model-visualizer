import { useCallback, useState } from 'react'
import { DEFAULT_SETTINGS } from '../constants'
import type { ViewerSettings } from '../types'

export function useViewerSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const toggle = useCallback((key: keyof ViewerSettings) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }))
  }, [])

  return { settings, toggle }
}
