import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store';
import { Provider } from 'react-redux';
import "leaflet/dist/leaflet.css";
// import { router } from "./router";

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
