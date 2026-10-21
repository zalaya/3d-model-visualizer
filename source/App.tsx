import { DropOverlay, EmptyState, useFileDrop, useModelLoader } from '@/features/model-loader'
import { Header } from '@/shared/components/Header'
import { Toast } from '@/shared/components/Toast'
import { AnimatePresence } from 'motion/react'
import { lazy, Suspense } from 'react'
import { useState } from 'react'

const Viewer = lazy(() => import('@/features/viewer').then((module) => ({ default: module.Viewer })))

export default function App() {
  const [landingScrolled, setLandingScrolled] = useState(false)
  const { model, error, open, close, fail, openPicker, openSample, pickerProps } = useModelLoader()
  const dragging = useFileDrop(open)

  return (
    <main className='relative h-full overflow-hidden'>
      {model ? (
        <Suspense>
          <Viewer key={model.url} model={model} onError={fail} />
        </Suspense>
      ) : (
        <EmptyState onBrowse={openPicker} onSample={openSample} onScroll={setLandingScrolled} />
      )}
      <Header onBrowse={openPicker} onHome={model ? close : undefined} scrolled={Boolean(model) || landingScrolled} />
      {dragging && <DropOverlay />}
      <AnimatePresence>{error && <Toast key={error} message={error} />}</AnimatePresence>
      <input {...pickerProps} />
    </main>
  )
}
