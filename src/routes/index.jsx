import Home from '@/page/home';
import About from '@/page/about';
import interactive_case from './interactive-case';
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
  ...interactive_case,
];

export default routes;
