import Component from './Component'
import componentCode from './Component.jsx?raw'
import componentCss from './Component.css?raw'

export const meta = {
  id: 'magnetic-button',
  title: '磁性按钮效果',
  description: '鼠标悬停时会被吸引的按钮，带有平滑的跟随动画',
  tags: ['React', '交互', '动画'],
  category: '按钮',
  createdAt: new Date('2024-01-06').toISOString(),
}

export default Component
export const code = componentCode
export const css = componentCss

