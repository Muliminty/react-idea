import './EffectCard.css'

function EffectCard({ effect }) {
  return (
    <div className="effect-card">
      <div className="effect-card-preview">
        <effect.component />
      </div>
      <div className="effect-card-info">
        <div className="effect-card-header">
          <h3>{effect.meta.title}</h3>
          {effect.meta.category && (
            <span className="effect-category">{effect.meta.category}</span>
          )}
        </div>
        <p>{effect.meta.description}</p>
        <div className="effect-card-tags">
          {effect.meta.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {effect.meta.author && (
          <div className="effect-card-author">
            <span className="author-label">作者:</span>
            <span className="author-name">{effect.meta.author}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default EffectCard

