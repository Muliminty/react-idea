import { Effect } from '../types'
import ParticleEffect from '../effects/ParticleEffect'
import GradientButton from '../effects/GradientButton'
import GlowingCard from '../effects/GlowingCard'
import AnimatedText from '../effects/AnimatedText'
import FloatingBubbles from '../effects/FloatingBubbles'
import MagneticButton from '../effects/MagneticButton'

export const effects: Effect[] = [
  {
    id: 'particle-effect',
    title: '粒子动画效果',
    description: '使用 Canvas 创建的动态粒子系统，粒子会跟随鼠标移动',
    tags: ['Canvas', '动画', '交互'],
    component: ParticleEffect,
    code: `import { useEffect, useRef } from 'react'
import './ParticleEffect.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 创建粒子
    const particleCount = 50
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }))

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        // 更新位置
        particle.x += particle.vx
        particle.y += particle.vy

        // 边界反弹
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // 鼠标吸引
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          particle.vx += dx * 0.0001
          particle.vy += dy * 0.0001
        }

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(99, 102, 241, 0.8)'
        ctx.fill()

        // 绘制连线
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x
          const dy = other.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = \`rgba(99, 102, 241, \${1 - distance / 100})\`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}

export default ParticleEffect`,
    css: `.particle-canvas {
  width: 100%;
  height: 100%;
  display: block;
}`,
  },
  {
    id: 'gradient-button',
    title: '渐变按钮悬停效果',
    description: '带有渐变背景和悬停动画的现代化按钮',
    tags: ['CSS', '动画', '按钮'],
    component: GradientButton,
    code: `import './GradientButton.css'

function GradientButton() {
  return (
    <button className="gradient-button">
      <span>悬停我</span>
    </button>
  )
}

export default GradientButton`,
    css: `.gradient-button {
  position: relative;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.gradient-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.gradient-button:hover::before {
  left: 100%;
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.gradient-button:active {
  transform: translateY(0);
}

.gradient-button span {
  position: relative;
  z-index: 1;
}`,
  },
  {
    id: 'glowing-card',
    title: '发光卡片效果',
    description: '带有动态发光边框的卡片组件',
    tags: ['CSS', '动画', '卡片'],
    component: GlowingCard,
    code: `import './GlowingCard.css'

function GlowingCard() {
  return (
    <div className="glowing-card">
      <div className="glowing-card-content">
        <h3>发光卡片</h3>
        <p>这是一个带有动态发光边框效果的卡片</p>
      </div>
    </div>
  )
}

export default GlowingCard`,
    css: `.glowing-card {
  position: relative;
  padding: 2px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  background-size: 200% 200%;
  border-radius: 12px;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.glowing-card-content {
  background: var(--bg-card);
  border-radius: 10px;
  padding: 2rem;
  height: 100%;
}

.glowing-card-content h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.glowing-card-content p {
  color: var(--text-secondary);
  line-height: 1.6;
}`,
  },
  {
    id: 'animated-text',
    title: '文字打字动画',
    description: '模拟打字机效果的文字动画',
    tags: ['React', '动画', '文字'],
    component: AnimatedText,
    code: `import { useState, useEffect } from 'react'
import './AnimatedText.css'

function AnimatedText() {
  const text = '欢迎来到 React 特效灵感网站！'
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      // 重置动画
      const resetTimeout = setTimeout(() => {
        setDisplayedText('')
        setCurrentIndex(0)
      }, 2000)
      return () => clearTimeout(resetTimeout)
    }
  }, [currentIndex, text])

  return (
    <div className="animated-text-container">
      <h2 className="animated-text">
        {displayedText}
        <span className="cursor">|</span>
      </h2>
    </div>
  )
}

export default AnimatedText`,
    css: `.animated-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.animated-text {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
}

.cursor {
  animation: blink 1s infinite;
  color: var(--accent);
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}`,
  },
  {
    id: 'floating-bubbles',
    title: '浮动气泡动画',
    description: '使用 CSS 动画创建的浮动气泡效果',
    tags: ['CSS', '动画', '装饰'],
    component: FloatingBubbles,
    code: `import './FloatingBubbles.css'

function FloatingBubbles() {
  return (
    <div className="bubbles-container">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: \`\${Math.random() * 100}%\`,
            animationDelay: \`\${Math.random() * 5}s\`,
            animationDuration: \`\${5 + Math.random() * 5}s\`,
            width: \`\${20 + Math.random() * 40}px\`,
            height: \`\${20 + Math.random() * 40}px\`,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBubbles`,
    css: `.bubbles-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bubble {
  position: absolute;
  bottom: -50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}`,
  },
  {
    id: 'magnetic-button',
    title: '磁性按钮效果',
    description: '鼠标悬停时会被吸引的按钮，带有平滑的跟随动画',
    tags: ['React', '交互', '动画'],
    component: MagneticButton,
    code: `import { useRef, useState } from 'react'
import './MagneticButton.css'

function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <button
      ref={buttonRef}
      className="magnetic-button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: \`translate(\${position.x * 0.3}px, \${position.y * 0.3}px)\`,
      }}
    >
      <span>磁性按钮</span>
    </button>
  )
}

export default MagneticButton`,
    css: `.magnetic-button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.1s ease-out;
  position: relative;
  overflow: hidden;
}

.magnetic-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.magnetic-button:hover::before {
  width: 300px;
  height: 300px;
}

.magnetic-button span {
  position: relative;
  z-index: 1;
}

.magnetic-button:hover {
  box-shadow: 0 10px 25px rgba(102, 126, 241, 0.4);
}`,
  },
]

