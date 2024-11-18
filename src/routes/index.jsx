import Home from '@/page/home';
import About from '@/page/about';
// import Admin from '@/page/admin';
import HomeLayout from '@/page/admin/components/homeLayout'
import interactive_case from './interactive-case';
const routes = [
  {
    path: '/',
    component: Home,
    // 不再需要 exact 属性，Route 默认匹配精确路径
  },
  {
    title: '关于',
    path: '/about',
    component: About,
  },
  {
    title: 'HomeLayout',
    path: '/admin/home',
    component: HomeLayout,
  },
  ...interactive_case,
];

export default routes;
