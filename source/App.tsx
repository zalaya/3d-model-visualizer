import { DropOverlay, EmptyState, useFileDrop, useModelLoader } from '@/features/model-loader'
import { Header } from '@/shared/components/Header'
import { Toast } from '@/shared/components/Toast'
import { lazy, Suspense } from 'react'

const Viewer = lazy(() => import('@/features/viewer').then((module) => ({ default: module.Viewer })))

export default function App() {
  const { model, error, open, fail, openPicker, openSample, pickerProps } = useModelLoader()
  const dragging = useFileDrop(open)

  return (
    <main className='relative h-full overflow-hidden'>
      {model ? (
        <Suspense>
          <Viewer key={model.url} model={model} onBrowse={openPicker} onError={fail} />
        </Suspense>
      ) : (
        <EmptyState onBrowse={openPicker} onSample={openSample} />
      )}
      <Header fileName={model?.name} />
      {dragging && <DropOverlay />}
      {error && <Toast message={error} />}
      <input {...pickerProps} />
    </main>
  )
}
