import {
  Activity,
  Box,
  Cuboid,
  Gauge,
  HardDrive,
  Layers3,
  Ruler,
  Triangle,
} from 'lucide-react'
import { motion } from 'motion/react'
import { formatBytes, formatDecimal, formatNumber } from '@/shared/lib/format'
import type { ModelStats } from '../types'

type StatsPanelProps = {
  stats: ModelStats
  fileSize: number
}

export function StatsPanel({ stats, fileSize }: StatsPanelProps) {
  const { x, y, z } = stats.dimensions
  const metrics = [
    ['Vertices', formatNumber(stats.vertices), Triangle],
    ['Triangles', formatNumber(stats.triangles), Cuboid],
    ['Meshes', formatNumber(stats.meshes), Layers3],
    ['Materials', formatNumber(stats.materials), Box],
    ['Textures', formatNumber(stats.textures), Activity],
    ['Animations', formatNumber(stats.animations), Gauge],
  ] as const

  return (
    <motion.aside
      initial={{ x: -18, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className='absolute left-5 top-[5.5rem] z-10 hidden w-64 rounded-2xl border border-white/[0.1] bg-[#0c131c]/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:block'
    >
      <div className='-mx-1 flex items-center justify-between px-2'>
        <div className='flex items-center'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-300'>
            Scene telemetry
          </p>
        </div>
        <span className='rounded-md bg-[#b8f36b]/10 px-1.5 py-1 text-[9px] font-semibold leading-none text-[#b8f36b]'>
          LIVE
        </span>
      </div>
      <dl className='mt-2 space-y-0.5'>
        {metrics.map(([label, value, Icon]) => (
          <div
            key={label}
            className='group -mx-1 flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.045]'
          >
            <Icon className='size-3.5 shrink-0 text-neutral-500 transition-colors group-hover:text-[#b8f36b]' />
            <dt className='text-[10px] uppercase tracking-[0.08em] text-neutral-500 transition-colors group-hover:text-neutral-300'>
              {label}
            </dt>
            <dd className='ml-auto text-xs font-semibold tabular-nums text-neutral-200'>
              {value}
            </dd>
          </div>
        ))}
        <div className='group -mx-1 flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.045]'>
          <Ruler className='size-3.5 shrink-0 text-neutral-500 transition-colors group-hover:text-[#b8f36b]' />
          <dt className='text-[10px] uppercase tracking-[0.08em] text-neutral-500 transition-colors group-hover:text-neutral-300'>
            Dimensions
          </dt>
          <dd className='ml-auto text-xs font-semibold tabular-nums text-neutral-200'>
            {[x, y, z].map(formatDecimal).join(' × ')}
          </dd>
        </div>
        <div className='group -mx-1 flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.045]'>
          <HardDrive className='size-3.5 shrink-0 text-neutral-500 transition-colors group-hover:text-[#b8f36b]' />
          <dt className='text-[10px] uppercase tracking-[0.08em] text-neutral-500 transition-colors group-hover:text-neutral-300'>
            File weight
          </dt>
          <dd className='ml-auto text-xs font-semibold tabular-nums text-neutral-200'>
            {formatBytes(fileSize)}
          </dd>
        </div>
      </dl>
    </motion.aside>
  )
}
