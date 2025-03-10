import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "flowbite";
import "flowbite/dist/flowbite.min.js";
import UserContextProvider from './Components/UserContext/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider> 
      <App />
    </UserContextProvider>
  </StrictMode>,
)