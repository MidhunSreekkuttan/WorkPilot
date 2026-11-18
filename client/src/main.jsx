import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ThemeContextProvider from './context/ThemeContext.jsx'
import GlobalUserContextProvider from './context/GlobalUserContext.jsx'
import './index.css'
import App from './App.jsx'

const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ""

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleId}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HelmetProvider>
            <ThemeContextProvider>
              <GlobalUserContextProvider>
                <App />
              </GlobalUserContextProvider>
            </ThemeContextProvider>
          </HelmetProvider>
        </BrowserRouter>
        {/* Adds a toggleable devtools panel in the bottom right */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
