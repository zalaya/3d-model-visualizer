import type { ModelStats } from '../types'
import { formatBytes, formatDecimal, formatNumber } from '@/shared/helpers/format'

type StatsPanelProps = {
  stats: ModelStats
  fileSize: number
}

export function StatsPanel({ stats, fileSize }: StatsPanelProps) {
  const { x, y, z } = stats.dimensions
  const sections = [
    [
      ['Vertices', formatNumber(stats.vertices)],
      ['Triangles', formatNumber(stats.triangles)],
      ['Meshes', formatNumber(stats.meshes)]
    ],
    [
      ['Materials', formatNumber(stats.materials)],
      ['Textures', formatNumber(stats.textures)],
      ['Animations', formatNumber(stats.animations)]
    ],
    [
      ['Size', [x, y, z].map(formatDecimal).join(' × ')],
      ['File', formatBytes(fileSize)]
    ]
  ]

  return (
    <dl className='absolute top-16 right-5 z-10 w-64 sm:top-5 animate-fade-in divide-y divide-white/5 rounded-2xl border border-white/10 bg-neutral-900/60 px-4 py-1 text-xs shadow-2xl shadow-black/60 backdrop-blur-xl'>
      {sections.map((rows) => (
        <div key={rows[0]?.[0]} className='space-y-2 py-3'>
          {rows.map(([label, value]) => (
            <div key={label} className='flex justify-between gap-4'>
              <dt className='text-neutral-500'>{label}</dt>
              <dd className='truncate font-medium text-neutral-100 tabular-nums'>{value}</dd>
            </div>
          ))}
        </div>
      ))}
    </dl>
  )
}
