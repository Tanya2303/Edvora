import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RemindersProvider } from './context/RemindersContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RemindersProvider>
      <App />
    </RemindersProvider>
  </StrictMode>,
)
