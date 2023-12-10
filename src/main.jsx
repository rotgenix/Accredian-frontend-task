import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react'
export const Context = createContext();
const AppWarapper = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false);
  return (
    <Context.Provider
      value={{
        isAuthenticated, setAuthenticated, loader, setLoader
      }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWarapper />
  </React.StrictMode>,
)
