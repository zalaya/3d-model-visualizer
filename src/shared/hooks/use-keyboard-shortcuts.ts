import { useEffect, useRef } from 'react'

export type Shortcut = {
  shortcut: string
  run: () => void
}

const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || TYPING_TAGS.has(target.tagName))
  )
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const latest = useRef(shortcuts)

  useEffect(() => {
    latest.current = shortcuts
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.repeat ||
        isTypingTarget(event.target)
      ) {
        return
      }

      const key = event.key.toLowerCase()
      latest.current
        .find(({ shortcut }) => shortcut.toLowerCase() === key)
        ?.run()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
