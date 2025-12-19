import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Splash.css'

function Splash() {
  const navigate = useNavigate()
  const [stage, setStage] = useState(0) // 0: 加载, 1: 动画, 2: 可点击
  const [progress, setProgress] = useState(0)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // 创建粒子
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)

    // 加载进度
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setStage(1), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (stage === 1) {
      setTimeout(() => setStage(2), 1500)
    }
  }, [stage])

  const handleClick = () => {
    if (stage === 2) {
      navigate('/home')
    }
  }

  return (
    <div className="splash-screen" onClick={handleClick}>
      <div className="splash-background">
        {/* 网格背景 */}
        <div className="grid-overlay"></div>
        
        {/* 粒子效果 */}
        <div className="particles-container">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.speed}s`,
              }}
            />
          ))}
        </div>

        {/* 线条动画 */}
        <div className="lines-container">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animated-line"
              style={{
                left: `${(i + 1) * 12.5}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="splash-content">
        {stage === 0 && (
          <div className="loading-stage">
            <div className="logo-container">
              <div className="comic-logo">
                <span className="logo-text">React</span>
                <span className="logo-accent">特效</span>
              </div>
              <div className="logo-subtitle">灵感平台</div>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="progress-text">{progress}%</div>
            </div>
          </div>
        )}

        {stage === 1 && (
          <div className="animation-stage">
            <div className="title-animation">
              <h1 className="comic-title">
                <span className="title-line">React</span>
                <span className="title-line">特效灵感</span>
              </h1>
              <div className="title-subtitle">探索创意，获取灵感</div>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className="ready-stage">
            <div className="title-animation">
              <h1 className="comic-title">
                <span className="title-line">React</span>
                <span className="title-line">特效灵感</span>
              </h1>
              <div className="title-subtitle">探索创意，获取灵感</div>
            </div>
            <button className="enter-button comic-shadow">
              <span className="button-text">点击进入</span>
              <span className="button-arrow">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Splash
