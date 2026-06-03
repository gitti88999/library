import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';

{/* <GoogleOAuthProvider clientId="YOUR_CLIENT_ID"> */}
  <App />
// </GoogleOAuthProvider>
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
