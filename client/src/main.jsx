import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ThemeContextProvider from './context/ThemeContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)
