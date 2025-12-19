import Component from './Component'
import componentCode from './Component.jsx?raw'
import componentCss from './Component.css?raw'

export const meta = {
  id: 'particle-effect',
  title: '粒子动画效果',
  description: '使用 Canvas 创建的动态粒子系统，粒子会跟随鼠标移动',
  tags: ['Canvas', '动画', '交互'],
  category: 'Canvas',
  createdAt: new Date('2024-01-01').toISOString(),
}

export default Component

// 使用 Vite 的 ?raw 导入来读取文件内容
export const code = componentCode
export const css = componentCss

