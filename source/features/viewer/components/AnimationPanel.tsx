import { Film, Gauge, Pause, Play } from 'lucide-react'
import { motion } from 'motion/react'

type AnimationPanelProps = {
  names: string[]
  selected: string
  playing: boolean
  speed: number
  onSelect: (name: string) => void
  onToggle: () => void
  onSpeedChange: (speed: number) => void
}

export function AnimationPanel({ names, selected, playing, speed, onSelect, onToggle, onSpeedChange }: AnimationPanelProps) {
  return (
    <motion.section initial={{ y: 12, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className='absolute bottom-24 left-1/2 z-10 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/[0.12] bg-[#101823]/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl' aria-label='Animation controls'>
      <button
        type='button'
        onClick={onToggle}
        aria-label={playing ? 'Pause animation' : 'Play animation'}
        className='grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-sky-400/60'
      >
        {playing ? <Pause className='size-4' /> : <Play className='size-4' />}
      </button>
      <div className='flex max-w-[min(19rem,48vw)] items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.035] p-1 [scrollbar-width:none]'>
        <span className='mx-1 shrink-0 text-neutral-600'><Film className='size-3.5' /></span>
        {names.map((name) => <button key={name} type='button' onClick={() => onSelect(name)} aria-pressed={selected === name} className={`max-w-32 shrink-0 truncate rounded-lg px-2.5 py-1.5 text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-[#b8f36b] ${selected === name ? 'bg-[#b8f36b] font-medium text-[#0b1018]' : 'text-neutral-500 hover:bg-white/[0.08] hover:text-white'}`}>{name}</button>)}
      </div>
      <div className='flex items-center gap-1 border-l border-white/10 pl-2'>
        <Gauge className='mr-1 size-3.5 text-neutral-600' />
        {[0.5, 1, 2].map((value) => (
          <button
            key={value}
            type='button'
            onClick={() => onSpeedChange(value)}
            aria-pressed={speed === value}
            className={`rounded-lg px-2 py-1.5 text-[11px] tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-sky-400/60 ${speed === value ? 'bg-white/15 text-white' : 'text-neutral-500 hover:text-neutral-200'}`}
          >
            {value}×
          </button>
        ))}
      </div>
    </motion.section>
  )
}
