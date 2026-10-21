import { useEffect, useState } from 'react'

export function useFileDrop(onFile: (file: File) => void) {
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault()
      setDragging(true)
    }

    const handleDragLeave = (event: DragEvent) => {
      if (!event.relatedTarget) {
        setDragging(false)
      }
    }

    const handleDrop = (event: DragEvent) => {
      event.preventDefault()
      setDragging(false)
      const file = event.dataTransfer?.files[0]

      if (file) {
        onFile(file)
      }
    }

    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('drop', handleDrop)

    return () => {
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('drop', handleDrop)
    }
  }, [onFile])

  return dragging
}
