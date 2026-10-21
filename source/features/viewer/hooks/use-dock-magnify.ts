import { type RefObject, useEffect } from 'react'

const MAX_SCALE = 1.45
const SPREAD = 52

const ITEMS = '[data-dock-item], [data-dock-gap]'

export function useDockMagnify(dock: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = dock.current

    if (!element || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        return
      }

      const left = element.getBoundingClientRect().left
      const items = [...element.querySelectorAll<HTMLElement>(ITEMS)]

      const scales = items.map((item) => {
        if (!item.hasAttribute('data-dock-item')) {
          return 1
        }

        const distance = event.clientX - (left + item.offsetLeft + item.offsetWidth / 2)
        return 1 + (MAX_SCALE - 1) * Math.exp(-(distance ** 2) / (2 * SPREAD ** 2))
      })
      const growth = items.map((item, index) => ((scales[index] ?? 1) - 1) * item.offsetWidth)
      const total = growth.reduce((sum, value) => sum + value, 0)

      element.style.setProperty('--grow', `${total}px`)

      let before = 0
      items.forEach((item, index) => {
        const own = growth[index] ?? 0

        item.style.setProperty('--shift', `${before + own / 2 - total / 2}px`)
        item.style.setProperty('--scale', String(scales[index]))
        item.style.setProperty('--lift', `${own}px`)
        before += own
      })
    }

    const reset = () => {
      element.style.removeProperty('--grow')

      for (const item of element.querySelectorAll<HTMLElement>(ITEMS)) {
        item.style.removeProperty('--shift')
        item.style.removeProperty('--scale')
        item.style.removeProperty('--lift')
      }
    }

    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerleave', reset)

    return () => {
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerleave', reset)
    }
  }, [dock])
}
