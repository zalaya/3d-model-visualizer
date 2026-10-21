import { ERROR_DURATION, MAX_MODEL_SIZE_BYTES, RESOURCE_ACCEPT, SUPPORTED_EXTENSIONS } from '../constants'
import { createResourceMap, isSupportedFile } from '../helpers/is-supported-file'
import type { ModelFile, SampleModel } from '../types'
import { type ChangeEvent, type ComponentProps, useCallback, useEffect, useRef, useState } from 'react'

export function useModelLoader() {
  const [model, setModel] = useState<ModelFile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const picker = useRef<HTMLInputElement>(null)

  const open = useCallback((files: File[]) => {
    const file = files.find(isSupportedFile)

    if (!file) {
      setError(`Choose a ${SUPPORTED_EXTENSIONS.join(' or ')} model file`)
      return
    }

    const totalSize = files.reduce((total, current) => total + current.size, 0)
    if (totalSize > MAX_MODEL_SIZE_BYTES) {
      setError(`Models are limited to ${MAX_MODEL_SIZE_BYTES / 1024 / 1024} MB`)
      return
    }

    setError(null)
    const resources = createResourceMap(files)
    setModel({
      url: resources[file.name.toLowerCase()]!,
      name: file.name,
      size: totalSize,
      resources,
      objectUrls: [...new Set(Object.values(resources))]
    })
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

  const close = useCallback(() => {
    setModel(null)
    setError(null)
  }, [])

  const openSample = useCallback(async ({ id }: SampleModel) => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}samples/${id}.glb`)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      open([new File([await response.blob()], `${id}.glb`)])
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
      for (const objectUrl of model.objectUrls) {
        URL.revokeObjectURL(objectUrl)
      }
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
    accept: [...SUPPORTED_EXTENSIONS, ...RESOURCE_ACCEPT].join(','),
    multiple: true,
    hidden: true,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files?.length) {
        open(Array.from(files))
      }
      event.target.value = ''
    }
  }

  return { model, error, open, close, fail, openPicker, openSample, pickerProps }
}
