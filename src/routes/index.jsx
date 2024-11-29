import Home from '@/page/home';
import About from '@/page/about';
import interactive_case from './interactive-case';
import DraggableResizableGrid from '@/page/draggable-resizable-grid';
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    title: '关于',
    path: '/about',
    component: About,
  },
  {
    title: '可拖拽可缩放看板',
    path: '/draggableResizableGrid',
    component: DraggableResizableGrid,
  },
  ...interactive_case,
];

export default routes;
