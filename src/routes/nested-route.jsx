import NestedRoute from '@/page/nested-route'
import About from '@/page/nested-route/about.jsx'
import Setting from '@/page/nested-route/setting.jsx'

const nested_route = [
    {
        title: '嵌套路由',
        path: '/NestedRoute',
        component: NestedRoute,
        children: [
            {
                title: 'about',
                path: '/NestedRoute/about',
                component: About,
            },
            {
                title: 'setting',
                path: '/NestedRoute/setting',
                component: Setting, // 直接传递组件
            },
        ]
    }
]

export default nested_route;
