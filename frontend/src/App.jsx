import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './panel/mainPanel/main'
import Auth from './panel/auth/Auth';




function App() {


  return (
    <Router>
      <Routes>
         <Route path="/" element={<Auth/>} />
         <Route path="/panel/*" element={<Main/>} />
      </Routes>
    </Router>
  )
}

export default App
