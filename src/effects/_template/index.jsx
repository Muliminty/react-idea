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
  id: 'your-effect-id', // 唯一标识，使用 kebab-case
  title: '你的特效名称',
  description: '特效的详细描述，说明它的功能和特点',
  tags: ['标签1', '标签2'], // 标签数组，用于筛选
  category: '分类名称', // 可选：分类名称
  author: '你的名字', // 可选：作者
  createdAt: new Date().toISOString(), // 创建时间
}

// 导出组件
export default Component

// 导出代码（使用 ?raw 导入自动读取文件内容）
export const code = componentCode

// 导出样式代码
export const css = componentCss

