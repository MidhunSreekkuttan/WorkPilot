import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ThemeContextProvider from './context/ThemeContext.jsx'
import './index.css'
import App from './App.jsx'

const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ""

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleId}>
      <BrowserRouter>
        <HelmetProvider>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </HelmetProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
