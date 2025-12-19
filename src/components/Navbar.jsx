import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">React 特效灵感</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/home" className="nav-link">首页</Link>
          <a 
            href="https://github.com/Muliminty/react-idea" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
