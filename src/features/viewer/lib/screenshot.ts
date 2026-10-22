import type { RootState } from '@react-three/fiber'
import { stripExtension } from '@/shared/lib/files'

export function downloadScreenshot(canvas: RootState | null, fileName: string) {
  if (!canvas) {
    return
  }

  const { gl, scene, camera } = canvas.get()
  gl.render(scene, camera)

  const link = document.createElement('a')
  link.href = gl.domElement.toDataURL('image/png')
  link.download = `${stripExtension(fileName)}.png`
  link.click()
}
