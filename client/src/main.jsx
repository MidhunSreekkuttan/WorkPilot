import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeContextProvider from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
