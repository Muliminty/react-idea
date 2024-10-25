import Home from '@/page/home';
import About from '@/page/about';
import Admin from '@/page/admin';

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
    title: '交互案例',
    path: '/admin',
    component: Admin,
  },
];

export default routes;
