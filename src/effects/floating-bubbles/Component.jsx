import './Component.css'

function FloatingBubbles() {
  return (
    <div className="bubbles-container">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBubbles

