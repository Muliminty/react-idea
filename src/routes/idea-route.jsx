import {
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import Idea from '@/page/idea'
import About from '@/page/nested-route/about.jsx'
import Setting from '@/page/nested-route/setting.jsx'

const idea_route = [
    {
        title: '灵感合集',
        path: '/idea',
        component: Idea,
        children: [
            {
                title: 'about',
                path: '/idea/about',
                icon: <UserOutlined />,
                component: About,
            },
            {
                title: 'setting',
                path: '/idea/setting',
                icon: <VideoCameraOutlined />,
                component: Setting, // 直接传递组件
            },
        ]
    }
]

export default idea_route;
