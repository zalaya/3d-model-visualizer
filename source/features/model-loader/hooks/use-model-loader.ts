import { ERROR_DURATION, SUPPORTED_EXTENSIONS } from '../constants'
import { isSupportedFile } from '../helpers/is-supported-file'
import type { ModelFile, SampleModel } from '../types'
import { type ChangeEvent, type ComponentProps, useCallback, useEffect, useRef, useState } from 'react'

export function useModelLoader() {
  const [model, setModel] = useState<ModelFile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const picker = useRef<HTMLInputElement>(null)

  const open = useCallback((file: File) => {
    if (!isSupportedFile(file)) {
      setError(`${file.name} is not a ${SUPPORTED_EXTENSIONS.join(' or ')} file`)
      return
    }

    setError(null)
    setModel({ url: URL.createObjectURL(file), name: file.name, size: file.size })
  }, [])

  const fail = useCallback(
    (reason: Error) => {
      console.error(reason)
      setError(`Couldn't load ${model?.name ?? 'the model'}: ${reason.message}`)
      setModel(null)
    },
    [model]
  )

  const openPicker = useCallback(() => picker.current?.click(), [])

  const openSample = useCallback(async ({ id }: SampleModel) => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}samples/${id}.glb`)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      open(new File([await response.blob()], `${id}.glb`))
    } catch (reason) {
      console.error(reason)
      setError(`Couldn't load the sample model`)
    }
  }, [open])

  useEffect(() => {
    if (!model) {
      return
    }

    return () => {
      URL.revokeObjectURL(model.url)
    }
  }, [model])

  useEffect(() => {
    if (!error) {
      return
    }

    const timer = setTimeout(() => setError(null), ERROR_DURATION)
    return () => clearTimeout(timer)
  }, [error])

  const pickerProps: ComponentProps<'input'> = {
    ref: picker,
    type: 'file',
    accept: SUPPORTED_EXTENSIONS.join(','),
    hidden: true,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        open(file)
      }
      event.target.value = ''
    }
  }

  return { model, error, open, fail, openPicker, openSample, pickerProps }
}
