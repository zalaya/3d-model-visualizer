import { Box } from 'lucide-react'

type HeaderProps = {
  fileName?: string
}

export function Header({ fileName }: HeaderProps) {
  return (
    <header className='pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-3 p-5 text-sm'>
      <span className='grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5'>
        <Box className='size-4' strokeWidth={1.75} />
      </span>
      <span className='font-medium tracking-tight'>3D Model Visualizer</span>
      {fileName && (
        <>
          <span className='text-neutral-700'>/</span>
          <span className='max-w-[40vw] truncate rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-neutral-300'>
            {fileName}
          </span>
        </>
      )}
    </header>
  )
}
