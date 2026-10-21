import { useProgress } from '@react-three/drei'

export function Loader() {
  const active = useProgress((state) => state.active)
  if (!active) {
    return null
  }

  return (
    <div className='pointer-events-none absolute inset-0 grid place-items-center'>
      <div className='size-8 animate-spin rounded-full border-2 border-white/10 border-t-white/80' />
    </div>
  )
}
