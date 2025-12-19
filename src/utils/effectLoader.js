// 使用 Vite 的 glob import 自动发现所有组件
// 匹配模式：src/effects/**/index.jsx
const effectModules = import.meta.glob('../effects/**/index.jsx', { 
  eager: true 
})

export function loadEffects() {
  const effects = []

  for (const [path, module] of Object.entries(effectModules)) {
    // 跳过模板文件夹
    if (path.includes('/_template/')) {
      continue
    }

    // 检查必需字段
    if (!module.default) {
      console.warn(`组件 ${path} 没有导出默认组件`)
      continue
    }

    if (!module.meta) {
      console.warn(`组件 ${path} 没有导出元数据`)
      continue
    }

    effects.push({
      meta: module.meta,
      component: module.default,
      code: module.code || `// 组件代码位于: ${path.replace('/index.jsx', '/Component.jsx')}`,
      css: module.css,
    })
  }

  // 排序：按创建时间（降序）或标题（升序）
  return effects.sort((a, b) => {
    if (a.meta.createdAt && b.meta.createdAt) {
      return new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
    }
    return a.meta.title.localeCompare(b.meta.title, 'zh-CN')
  })
}

