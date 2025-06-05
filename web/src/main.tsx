import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StagewiseToolbar } from '@stagewise/toolbar-react';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <StagewiseToolbar />
  </>
)
