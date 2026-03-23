import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "flatpickr/dist/flatpickr.css";
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { RouterProvider } from 'react-router'
import { appRouter } from './router/appRouter.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { Toaster } from 'sonner';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
        <Toaster position="top-right" richColors closeButton />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
