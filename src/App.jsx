import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Home from './pages/Home'
import EffectDetail from './pages/EffectDetail'
import './App.css'

// 获取 base path（用于 GitHub Pages）
// 在生产环境中，base path 由 Vite 的 base 配置决定
// 这里我们动态检测当前路径来确定 base path
const getBasePath = () => {
  // 检查是否在 GitHub Pages 环境
  if (window.location.hostname.includes('github.io')) {
    const pathParts = window.location.pathname.split('/').filter(Boolean)
    // 如果路径包含仓库名（react-idea），使用它作为 base
    if (pathParts.length > 0 && pathParts[0] !== '') {
      return `/${pathParts[0]}/`
    }
  }
  // 开发环境或根域名使用空字符串（React Router 会自动处理）
  return ''
}

const basename = getBasePath()

function App() {
  return (
    <Router basename={basename}>
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
