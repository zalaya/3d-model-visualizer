import { SUPPORTED_EXTENSIONS } from '../constants'

export function isSupportedFile({ name }: Pick<File, 'name'>) {
  const lowerCased = name.toLowerCase()
  return SUPPORTED_EXTENSIONS.some((extension) =>
    lowerCased.endsWith(extension),
  )
}

export function normalizeResourcePath(path: string) {
  return decodeURIComponent(path)
    .replaceAll('\\', '/')
    .replace(/^\.\//, '')
    .toLowerCase()
}

export function createResourceMap(files: File[]) {
  const resources: Record<string, string> = {}

  for (const file of files) {
    const objectUrl = URL.createObjectURL(file)
    const relativePath = normalizeResourcePath(
      file.webkitRelativePath || file.name,
    )
    const fileName = relativePath.split('/').pop()

    resources[relativePath] = objectUrl
    if (fileName) {
      resources[fileName] ??= objectUrl
    }
  }

  return resources
}
