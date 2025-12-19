import { useState } from 'react'
import './CodeViewer.css'

function CodeViewer({ title, code, language }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="code-viewer">
      <div className="code-viewer-header">
        <span className="code-viewer-title">{title}</span>
        <button
          onClick={copyToClipboard}
          className={`copy-button ${copied ? 'copied' : ''}`}
        >
          {copied ? '✓ 已复制' : '📋 复制代码'}
        </button>
      </div>
      <pre className="code-block">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

export default CodeViewer

