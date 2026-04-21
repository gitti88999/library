import React from 'react';
import { Provider } from 'react-redux'
import App from './App';
import  { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './app/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>
);

