import Home from '@/page/home';
import About from '@/page/about';
import interactive_case from './interactive-case';
import nested_route from './nested-route';
import idea_route from './idea-route';
import DraggableResizableGrid from '@/page/draggable-resizable-grid';
import MonacoEditorComponent from '@/page/monaco-editor-demo';
const routes = [
  {
    path: '/',
    component: Home,
  },
  // {
  //   title: '关于',
  //   path: '/about',
  //   component: About,
  // },
  {
    title: '可拖拽可缩放看板',
    path: '/draggableResizableGrid',
    component: DraggableResizableGrid,
  },
  {
    title: 'monaco-editor',
    path: '/monaco-editor',
    component: MonacoEditorComponent,
  },
  ...interactive_case,
  ...nested_route,
  ...idea_route,
];

export default routes;
