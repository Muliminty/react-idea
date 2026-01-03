import './MDXContent.css'

/**
 * MDX 内容渲染组件
 * 
 * 用于渲染从 Article.mdx 导入的 MDX 内容
 */
function MDXContent({ content: Content }) {
  if (!Content) {
    return null
  }

  return (
    <div className="mdx-content">
      <Content />
    </div>
  )
}

export default MDXContent

