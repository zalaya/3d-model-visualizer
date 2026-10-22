import { useProgress } from '@react-three/drei'

export function Loader() {
  const { active, progress, loaded, total } = useProgress()
  if (!active) {
    return null
  }

  return (
    <div className='pointer-events-none absolute inset-0 z-20 grid place-items-center bg-neutral-950/20 backdrop-blur-[2px]'>
      <div className='flex w-64 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900/75 p-5 text-center shadow-2xl shadow-black/40 backdrop-blur-xl'>
        <div className='size-8 animate-spin rounded-full border-2 border-white/10 border-t-white/80' />
        <div className='w-full space-y-2'>
          <div className='flex justify-between text-xs text-neutral-400'>
            <span>Loading model</span>
            <span className='tabular-nums'>{Math.round(progress)}%</span>
          </div>
          <div className='h-1 overflow-hidden rounded-full bg-white/10'>
            <div
              className='h-full rounded-full bg-sky-400 transition-[width] duration-200'
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className='text-[11px] text-neutral-600'>
            {loaded} / {total || 1} assets
          </p>
        </div>
      </div>
    </div>
  )
}
