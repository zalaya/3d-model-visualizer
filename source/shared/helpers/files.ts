export function stripExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, '')
}
