import { SUPPORTED_EXTENSIONS } from '../constants'
import { Box } from 'lucide-react'

type EmptyStateProps = {
  onBrowse: () => void
}

export function EmptyState({ onBrowse }: EmptyStateProps) {
  return (
    <div className='relative grid h-full place-items-center overflow-hidden p-4'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgb(255_255_255/0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]'
      />
      <div aria-hidden className='pointer-events-none absolute size-96 rounded-full bg-sky-500/10 blur-3xl' />

      <button
        type='button'
        onClick={onBrowse}
        className='group relative flex w-full max-w-md animate-fade-in cursor-pointer flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center shadow-2xl shadow-black/50 backdrop-blur-sm transition-colors duration-300 outline-none hover:border-white/20 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-sky-400/60'
      >
        <span className='grid size-16 animate-float place-items-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] text-neutral-200 shadow-inner transition-transform duration-300 group-hover:scale-110'>
          <Box className='size-8' strokeWidth={1.25} />
        </span>
        <div className='space-y-2'>
          <p className='text-lg font-medium tracking-tight'>Drop a 3D model here</p>
          <p className='text-sm text-neutral-500'>
            or{' '}
            <span className='text-neutral-300 underline decoration-white/20 underline-offset-4 transition-colors group-hover:decoration-white/60'>
              browse your files
            </span>
          </p>
        </div>
        <div className='flex gap-2'>
          {SUPPORTED_EXTENSIONS.map((extension) => (
            <span
              key={extension}
              className='rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-400'
            >
              {extension}
            </span>
          ))}
        </div>
      </button>

      <p className='absolute bottom-6 text-xs text-neutral-600'>Files never leave your browser.</p>
    </div>
  )
}
