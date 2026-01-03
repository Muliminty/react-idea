import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './CodeViewer.css'

// GitHub 风格的自定义主题（完全匹配 GitHub 的颜色）
const githubTheme = {
  ...ghcolors,
  'code[class*="language-"]': {
    ...ghcolors['code[class*="language-"]'],
    color: '#24292e',
    background: '#f6f8fa',
  },
  'pre[class*="language-"]': {
    ...ghcolors['pre[class*="language-"]'],
    color: '#24292e',
    background: '#f6f8fa',
  },
  '.token.comment': {
    color: '#6a737d',
  },
  '.token.prolog': {
    color: '#6a737d',
  },
  '.token.doctype': {
    color: '#6a737d',
  },
  '.token.cdata': {
    color: '#6a737d',
  },
  '.token.punctuation': {
    color: '#24292e',
  },
  '.token.property': {
    color: '#005cc5',
  },
  '.token.tag': {
    color: '#22863a',
  },
  '.token.boolean': {
    color: '#005cc5',
  },
  '.token.number': {
    color: '#005cc5',
  },
  '.token.function-name': {
    color: '#6f42c1',
  },
  '.token.constant': {
    color: '#005cc5',
  },
  '.token.symbol': {
    color: '#005cc5',
  },
  '.token.deleted': {
    color: '#d73a49',
  },
  '.token.selector': {
    color: '#22863a',
  },
  '.token.attr-name': {
    color: '#6f42c1',
  },
  '.token.string': {
    color: '#032f62',
  },
  '.token.char': {
    color: '#032f62',
  },
  '.token.builtin': {
    color: '#6f42c1',
  },
  '.token.inserted': {
    color: '#22863a',
  },
  '.token.operator': {
    color: '#d73a49',
  },
  '.token.entity': {
    color: '#6f42c1',
  },
  '.token.url': {
    color: '#032f62',
  },
  '.token.variable': {
    color: '#e36209',
  },
  '.token.atrule': {
    color: '#032f62',
  },
  '.token.attr-value': {
    color: '#032f62',
  },
  '.token.keyword': {
    color: '#d73a49',
  },
  '.token.function': {
    color: '#6f42c1',
  },
  '.token.class-name': {
    color: '#6f42c1',
  },
  '.token.regex': {
    color: '#032f62',
  },
  '.token.important': {
    color: '#d73a49',
  },
}

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

  // 映射语言名称
  const languageMap = {
    jsx: 'jsx',
    css: 'css',
    javascript: 'javascript',
    typescript: 'typescript',
    html: 'html',
  }

  const mappedLanguage = languageMap[language] || language

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
      <div className="code-block-wrapper">
        <SyntaxHighlighter
          language={mappedLanguage}
          style={githubTheme}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#f6f8fa',
            border: 'none',
            borderRadius: 0,
            color: '#24292e',
          }}
          codeTagProps={{
            style: {
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontSize: '0.875rem',
              color: '#24292e',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeViewer

