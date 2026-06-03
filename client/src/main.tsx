import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store';
import { Provider } from 'react-redux';
// import { router } from "./router";

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// );
