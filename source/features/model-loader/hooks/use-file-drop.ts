import { useEffect, useState } from 'react'

export function useFileDrop(onFiles: (files: File[]) => void) {
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
      const files = event.dataTransfer?.files

      if (files?.length) {
        onFiles(Array.from(files))
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
  }, [onFiles])

  return dragging
}
