import '@fontsource-variable/geist'
import { AnimateUIProvider } from '@animate-ui/react/provider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root not found')
}

createRoot(root).render(
  <StrictMode>
    <AnimateUIProvider tempo={0.9} checkAnimation='pop' reducedMotion='user'>
      <App />
    </AnimateUIProvider>
  </StrictMode>,
)
