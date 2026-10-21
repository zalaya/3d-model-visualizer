import { CircleAlert } from 'lucide-react'

type ToastProps = {
  message: string
}

export function Toast({ message }: ToastProps) {
  return (
    <div className='absolute bottom-28 left-1/2 z-20 w-max max-w-[calc(100%-2rem)] -translate-x-1/2'>
      <div
        role='alert'
        className='flex animate-fade-up items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-950/50 px-4 py-2.5 text-sm text-red-200 shadow-2xl shadow-black/50 backdrop-blur-xl'
      >
        <CircleAlert className='size-4 shrink-0 text-red-400' />
        {message}
      </div>
    </div>
  )
}
