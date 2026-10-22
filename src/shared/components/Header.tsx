import { Box, Star, Upload } from 'lucide-react'
import { motion } from 'motion/react'

type HeaderProps = {
  onBrowse: () => void
  onHome?: () => void
  scrolled?: boolean
}

export function Header({ onBrowse, onHome, scrolled = false }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed z-40 flex items-center transition-[inset,top,height,border-radius,background-color,box-shadow] duration-500 ${scrolled ? 'left-3 right-3 top-3 h-14 rounded-2xl border border-white/[0.1] bg-[#101720]/[.9] px-3 shadow-[0_18px_50px_rgb(0_0_0/0.32)] backdrop-blur-2xl sm:left-5 sm:right-5 sm:top-4 sm:px-4' : 'inset-x-0 top-0 h-16 border-b border-white/[0.07] bg-[#0b1018]/80 px-5 backdrop-blur-xl sm:px-8'}`}
    >
      <motion.button
        type='button'
        aria-disabled={!onHome}
        onClick={onHome}
        aria-label={onHome ? 'Back to home' : undefined}
        whileHover={onHome ? { x: -2 } : undefined}
        whileTap={onHome ? { scale: 0.98 } : undefined}
        className='group flex min-w-0 cursor-default items-center gap-3 text-left'
      >
        <motion.span
          layout
          whileHover={{ rotate: -8, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className='grid size-9 shrink-0 place-items-center rounded-[0.7rem] bg-[#b8f36b] text-[#0b1018] shadow-[0_0_25px_rgb(184_243_107/0.2)]'
        >
          <Box className='size-5' strokeWidth={2.25} />
        </motion.span>
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold tracking-[-0.01em] text-white'>
            Moder Viewer
          </p>
          <p className='mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-500 sm:block'>
            Private workspace
          </p>
        </div>
      </motion.button>
      <div className='absolute left-1/2 hidden max-w-[38vw] -translate-x-1/2 items-center gap-3 md:flex'>
        <span className='size-1.5 shrink-0 rounded-full bg-[#b8f36b] shadow-[0_0_9px_rgb(184_243_107/0.8)]' />
        <span className='text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500'>
          Local session
        </span>
      </div>
      <div className='ml-auto flex items-center gap-2'>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          type='button'
          onClick={onBrowse}
          className='flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#b8f36b] px-3 text-xs font-semibold text-[#0b1018] shadow-[0_4px_18px_rgb(184_243_107/0.12)] transition hover:bg-[#c8fa81] focus-visible:ring-2 focus-visible:ring-[#b8f36b]'
        >
          <Upload className='size-3.5' strokeWidth={2.1} />{' '}
          <span>Open file</span>
        </motion.button>
        <motion.a
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          href='https://github.com/zalaya/moder-viewer'
          target='_blank'
          rel='noreferrer'
          className='hidden h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-neutral-400 transition-colors hover:bg-white/[0.06] hover:text-white sm:flex'
        >
          <Star className='size-3.5 text-[#b8f36b]' /> GitHub
        </motion.a>
      </div>
    </motion.header>
  )
}
