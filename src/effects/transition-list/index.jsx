/**
 * 组件入口文件
 * 
 * 这个文件用于导出组件和元数据
 * 系统会自动扫描这个文件来发现新组件
 */

import Component from './Component'
// 使用 Vite 的 ?raw 导入来读取文件内容
import componentCode from './Component.jsx?raw'
import componentCss from './Component.css?raw'

// 组件元数据
export const meta = {
  id: 'transition-list', // 唯一标识，使用 kebab-case
  title: '过度列表',
  description: '列表过渡动画效果',
  tags: ['列表', '动画'], // 标签数组，用于筛选
  category: '列表', // 可选：分类名称
  author: 'muliminty', // 可选：作者
  createdAt: '2026-01-03', // 创建时间
}

// 导出组件
export default Component

// 导出代码（使用 ?raw 导入自动读取文件内容）
export const code = componentCode

// 导出样式代码
export const css = componentCss

