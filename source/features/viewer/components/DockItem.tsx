import type { DockAction } from '../types'

export function DockItem({ label, icon: Icon, shortcut, active, run }: DockAction) {
  return (
    <div
      data-dock-item
      className='group relative [transform:translateX(var(--shift,0px))] transition-transform duration-100 ease-out'
    >
      <button
        type='button'
        onClick={run}
        aria-label={label}
        aria-pressed={active}
        style={{ transform: 'translateY(calc(var(--lift, 0px) * -1)) scale(var(--scale, 1))' }}
        className={`relative grid size-11 origin-bottom cursor-pointer place-items-center rounded-xl border transition-[transform,background-color,color,border-color] duration-100 ease-out outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${
          active
            ? 'border-[#b8f36b]/35 bg-[#b8f36b]/15 text-[#b8f36b] shadow-[0_0_18px_rgb(184_243_107/0.1)]'
            : 'border-transparent bg-white/[0.04] text-neutral-400 hover:text-white'
        }`}
      >
        <Icon className='size-5' strokeWidth={1.75} />
        {active && <span className='absolute -bottom-1 size-1 rounded-full bg-[#b8f36b] shadow-[0_0_8px_rgb(184_243_107/0.8)]' />}
      </button>
      <span
        role='tooltip'
        className='pointer-events-none absolute bottom-full left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-white/10 bg-neutral-900/90 px-2.5 py-1.5 text-xs whitespace-nowrap text-neutral-200 opacity-0 shadow-lg backdrop-blur-xl transition-[opacity,margin] duration-100 [margin-bottom:calc(1.5rem+var(--lift,0px))] group-focus-within:opacity-100 group-hover:opacity-100'
      >
        {label}
        <kbd className='rounded border border-white/10 px-1 font-sans text-[10px] text-neutral-400'>{shortcut}</kbd>
      </span>
    </div>
  )
}
