import { useDockMagnify } from '../hooks/use-dock-magnify'
import type { DockGroup } from '../types'
import { DockItem } from './DockItem'
import { Fragment, useRef } from 'react'

type DockProps = {
  groups: DockGroup[]
}

export function Dock({ groups }: DockProps) {
  const dock = useRef<HTMLElement>(null)
  useDockMagnify(dock)

  return (
    <nav
      ref={dock}
      className='absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 animate-fade-in items-end gap-1.5 rounded-[1.25rem] border border-white/[0.12] bg-[#0c131c]/90 py-2 px-[calc(0.5rem+var(--grow,0px)/2)] transition-[padding] duration-100 ease-out shadow-2xl shadow-black/60 backdrop-blur-2xl'
    >
      {groups.map((group, index) => (
        <Fragment key={group.id}>
          {index > 0 && (
            <div
              data-dock-gap
              className='mx-1 h-8 w-px self-center bg-white/10 [transform:translateX(var(--shift,0px))] transition-transform duration-100 ease-out'
            />
          )}
          {group.actions.map((action) => (
            <DockItem key={action.label} {...action} />
          ))}
        </Fragment>
      ))}
    </nav>
  )
}
