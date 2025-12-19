import { useState, useEffect } from 'react'
import './Component.css'

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

export default AnimatedText

