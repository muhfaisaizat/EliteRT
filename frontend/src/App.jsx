import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './panel/mainPanel/main'
import Auth from './panel/auth/Auth';
import ProtectedRoute from './protectedRoute.jsx';
import PublicRoute from './publicRoute.jsx';




function App() {


  return (
    <Router>
      <Routes>
         <Route path="/" element={<PublicRoute element={Auth} />} />
         <Route path="/panel/*" element={<ProtectedRoute element={<Main />} />} />
      </Routes>
    </Router>
  )
}

export default App
