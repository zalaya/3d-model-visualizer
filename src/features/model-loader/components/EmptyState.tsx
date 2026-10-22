import {
  ArrowUpRight,
  Box,
  Check,
  FileBox,
  FolderOpen,
  Route,
  Sparkles,
} from 'lucide-react'
import { motion } from 'motion/react'
import { SAMPLE_MODELS, SUPPORTED_EXTENSIONS } from '../constants'
import type { SampleModel } from '../types'

type EmptyStateProps = {
  onBrowse: () => void
  onSample: (sample: SampleModel) => void
  onScroll?: (scrolled: boolean) => void
}

export function EmptyState({ onBrowse, onSample, onScroll }: EmptyStateProps) {
  return (
    <div
      onScroll={(event) => onScroll?.(event.currentTarget.scrollTop > 24)}
      className='relative h-full overflow-y-auto overscroll-contain bg-[#0b1018] px-5 pb-12 pt-32 sm:px-10 lg:px-16'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute -left-32 top-24 size-[32rem] rounded-full bg-[#b8f36b]/[0.07] blur-[110px]'
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='relative mx-auto max-w-5xl'
      >
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.55, ease: 'easeOut' }}
          className='mb-16 flex flex-col items-start text-left'
        >
          <div>
            <p className='mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#b8f36b]'>
              <Sparkles className='size-3.5' /> Private 3D workspace
            </p>
            <h1 className='max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl'>
              See your models
              <br />
              <span className='text-neutral-500'>in a new dimension.</span>
            </h1>
            <p className='mt-5 max-w-xl text-base leading-7 text-neutral-400'>
              Inspect, present and understand your 3D assets directly in the
              browser. Nothing is uploaded, and every control is one gesture
              away.
            </p>
          </div>
        </motion.div>

        <div className='grid gap-5'>
          <motion.button
            type='button'
            onClick={onBrowse}
            whileHover={{ y: -5, scale: 1.005 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className='group relative min-h-[19rem] cursor-pointer overflow-hidden rounded-[2rem] border border-[#b8f36b]/30 bg-gradient-to-br from-[#b8f36b]/15 via-[#15221b] to-[#101722] p-8 text-left shadow-2xl shadow-black/20 hover:border-[#b8f36b]/70 focus-visible:ring-2 focus-visible:ring-[#b8f36b] sm:p-10'
          >
            <div className='absolute -right-16 -top-20 size-64 rounded-full border border-[#b8f36b]/20 transition-transform duration-500 group-hover:scale-110' />
            <div className='absolute -right-6 -top-10 size-44 rounded-full border border-[#b8f36b]/10' />
            <motion.span
              whileHover={{ y: -4, rotate: -5, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className='relative grid size-14 place-items-center rounded-2xl bg-[#b8f36b] text-[#0b1018] shadow-[0_0_35px_rgb(184_243_107/0.25)]'
            >
              <FolderOpen className='size-6' />
            </motion.span>
            <div className='relative mt-10 flex items-end justify-between gap-6'>
              <div>
                <p className='text-2xl font-semibold tracking-tight text-white'>
                  Open a model
                </p>
                <p className='mt-2 text-sm text-neutral-400'>
                  Drop a GLB or GLTF package, or browse your files.
                </p>
              </div>
              <ArrowUpRight className='mb-1 size-7 shrink-0 text-[#b8f36b] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
            </div>
            <div className='relative mt-6 flex gap-2'>
              {SUPPORTED_EXTENSIONS.map((extension) => (
                <span
                  key={extension}
                  className='rounded-full border border-white/10 bg-black/20 px-3 py-1 font-mono text-[11px] text-neutral-300'
                >
                  {extension}
                </span>
              ))}
            </div>
          </motion.button>
        </div>

        <div className='mt-16 flex items-center gap-3'>
          <FileBox className='size-4 text-[#b8f36b]' />
          <h2 className='text-sm font-semibold text-neutral-200'>
            Start with a sample
          </h2>
          <span className='h-px flex-1 bg-white/[0.08]' />
          <span className='text-xs text-neutral-600'>No file needed</span>
        </div>
        <div className='mt-5 grid grid-cols-2 gap-3 md:grid-cols-4'>
          {SAMPLE_MODELS.map((sample, index) => (
            <motion.button
              key={sample.id}
              type='button'
              onClick={() => onSample(sample)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className='group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-left hover:border-white/20 hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-[#b8f36b]'
            >
              <span
                className={`mb-10 block h-20 rounded-xl bg-gradient-to-br ${['from-[#3f5b40] to-[#101a20]', 'from-[#55487a] to-[#151525]', 'from-[#835c3d] to-[#1f1714]', 'from-[#2f6470] to-[#101b24]', 'from-[#536a7d] to-[#171d2c]', 'from-[#726451] to-[#1e1816]', 'from-[#3f6c73] to-[#101b24]', 'from-[#4e5e78] to-[#151b2a]', 'from-[#4c6547] to-[#101c18]', 'from-[#6b5d50] to-[#201a18]'][index]}`}
              >
                <Box className='m-4 size-7 text-white/40 transition-transform group-hover:-translate-y-1 group-hover:rotate-[-5deg] group-hover:scale-110' />
              </span>
              <span className='flex items-center justify-between text-sm font-medium text-neutral-200'>
                {sample.label}
                <Check className='size-3.5 text-[#b8f36b] opacity-0 transition-opacity group-hover:opacity-100' />
              </span>
              <span className='mt-1 block text-xs text-neutral-600'>
                Sample asset
              </span>
            </motion.button>
          ))}
        </div>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className='mt-16'
        >
          <div className='flex items-center gap-3'>
            <Route className='size-4 text-[#b8f36b]' />
            <span className='text-sm font-semibold text-neutral-200'>
              A calmer workflow
            </span>
            <span className='h-px flex-1 bg-white/[0.08]' />
            <span className='text-xs text-neutral-600'>Three simple steps</span>
          </div>
          <div className='mt-6 grid gap-3 md:grid-cols-3'>
            {[
              [
                '01',
                'Load locally',
                'Drop a GLB or a complete GLTF package. Your assets never leave this tab.',
              ],
              [
                '02',
                'Inspect deeply',
                'Move, orbit, zoom, frame, switch views and understand what is inside the scene.',
              ],
              [
                '03',
                'Present clearly',
                'Use a clean canvas, animation controls and one-click screenshots for sharing.',
              ],
            ].map(([number, title, detail], index) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className='rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-colors hover:border-[#b8f36b]/20 hover:bg-white/[0.045]'
              >
                <span className='font-mono text-xs text-[#b8f36b]'>
                  {number}
                </span>
                <h3 className='mt-8 text-base font-semibold text-white'>
                  {title}
                </h3>
                <p className='mt-2 text-sm leading-6 text-neutral-500'>
                  {detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
