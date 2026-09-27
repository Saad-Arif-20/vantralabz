import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TeamPage from './pages/TeamPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TeamPage />
  </StrictMode>,
)
