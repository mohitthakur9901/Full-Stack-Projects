import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux'
import {store} from './redux/redux_store.ts'



const domainId = await import.meta.env.VITE_DOMAIN
const clientId = await import.meta.env.VITE_CLIENT_ID


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={domainId}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <NextUIProvider>
          <Toaster position='top-right' reverseOrder={false} />

          <App />

        </NextUIProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
)
