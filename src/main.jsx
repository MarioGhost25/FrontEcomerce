import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "flatpickr/dist/flatpickr.css";
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RouterProvider } from 'react-router'
import { appRouter } from './router/appRouter.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { AppWrapper } from './components/common/PageMeta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <Provider store={store}>
          <RouterProvider router={appRouter}>
            <App />
          </RouterProvider>
        </Provider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
)
