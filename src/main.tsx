import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashbrownProvider } from '@hashbrownai/react'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashbrownProvider url="http://localhost:3000/chat">
      <App />
    </HashbrownProvider>
  </StrictMode>
)
