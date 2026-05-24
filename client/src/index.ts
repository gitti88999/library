// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App'
// import { store } from './app/store'
// import { Provider } from 'react-redux'
// import type { RootState, AppDispatch } from './app/store';

// const container = document.getElementById('root')

// if (container) {
//   const root = createRoot(container)

//   root.render(
//      <Provider store={store}>
//     <App />
//   </Provider>
//   )
// } else {
//   throw new Error(
//     "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
//   )
// }
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);