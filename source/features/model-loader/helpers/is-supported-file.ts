import { SUPPORTED_EXTENSIONS } from '../constants'

export function isSupportedFile({ name }: Pick<File, 'name'>) {
  const lowerCased = name.toLowerCase()
  return SUPPORTED_EXTENSIONS.some((extension) => lowerCased.endsWith(extension))
}
