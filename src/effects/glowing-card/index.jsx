import Component from './Component'
import componentCode from './Component.jsx?raw'
import componentCss from './Component.css?raw'

export const meta = {
  id: 'glowing-card',
  title: '发光卡片效果',
  description: '带有动态发光边框的卡片组件',
  tags: ['CSS', '动画', '卡片'],
  category: '卡片',
  createdAt: new Date('2024-01-03').toISOString(),
}

export default Component
export const code = componentCode
export const css = componentCss

