import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Home from './pages/Home'
import EffectDetail from './pages/EffectDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/effect/:id" element={<EffectDetail />} />
      </Routes>
    </Router>
  )
}

export default App
