import { Upload } from 'lucide-react'

export function DropOverlay() {
  return (
    <div className='pointer-events-none absolute inset-4 z-30 flex animate-fade-in flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-white/30 bg-neutral-950/70 backdrop-blur-md'>
      <span className='grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/10 text-white'>
        <Upload className='size-6' strokeWidth={1.5} />
      </span>
      <p className='text-lg font-medium tracking-tight'>
        Drop a model package to open
      </p>
      <p className='text-sm text-neutral-400'>
        GLB, or GLTF with its textures and binary files
      </p>
    </div>
  )
}
