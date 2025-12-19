import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EffectDetail from './pages/EffectDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/effect/:id" element={<EffectDetail />} />
      </Routes>
    </Router>
  )
}

export default App

