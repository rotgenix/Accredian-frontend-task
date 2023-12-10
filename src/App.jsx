import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import Navbar from './Components/Navbar'

import './App.css'
export const server = "http://localhost:5000";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={< RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App