import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffects } from '../hooks/useEffects'
import Navbar from '../components/Navbar'
import CodeViewer from '../components/CodeViewer'
import './EffectDetail.css'

function EffectDetail() {
  const { id } = useParams()
  const { effects } = useEffects()
  const [showCode, setShowCode] = useState(false)
  const effect = effects.find((e) => e.meta.id === id)

  if (!effect) {
    return (
      <div className="effect-detail">
        <Navbar />
        <div className="not-found">
          <h2>特效未找到</h2>
          <Link to="/home" className="back-link">返回首页</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="effect-detail">
      <Navbar />
      
      <div className="detail-container">
        <Link to="/home" className="back-button">
          ← 返回首页
        </Link>
        
        <div className="effect-detail-header">
          <div className="header-top">
            <div>
              <h1>{effect.meta.title}</h1>
              {effect.meta.category && (
                <span className="effect-category-badge">{effect.meta.category}</span>
              )}
            </div>
          </div>
          <p>{effect.meta.description}</p>
          <div className="effect-tags">
            {effect.meta.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          {effect.meta.author && (
            <div className="effect-meta">
              <span className="meta-label">作者:</span>
              <span className="meta-value">{effect.meta.author}</span>
              {effect.meta.createdAt && (
                <>
                  <span className="meta-separator">•</span>
                  <span className="meta-label">创建时间:</span>
                  <span className="meta-value">
                    {new Date(effect.meta.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="effect-detail-content">
          <div className="effect-preview-container">
            <div className="effect-preview">
              <effect.component />
            </div>
            <div className="preview-actions">
              <button
                onClick={() => setShowCode(!showCode)}
                className={`toggle-code-btn ${showCode ? 'active' : ''}`}
              >
                {showCode ? '👁️ 隐藏代码' : '📄 查看代码'}
              </button>
            </div>
          </div>

          {showCode && (
            <div className="code-section">
              <CodeViewer
                title="组件代码"
                code={effect.code}
                language="jsx"
              />
              {effect.css && (
                <CodeViewer
                  title="样式代码"
                  code={effect.css}
                  language="css"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EffectDetail
