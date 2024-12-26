import {
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import Idea from '@/page/idea'
import CardContent from '@/page/idea/card'
import GridStackLayout from '@/page/idea/gridStackLayout'

const idea_route = [
    {
        title: '灵感合集',
        path: '/idea',
        component: Idea,
        children: [
            {
                title: 'card',
                path: '/idea/card',
                icon: <UserOutlined />,
                component: CardContent,
            },
            {
                title: 'gridstack布局',
                path: '/idea/gridstack',
                icon: <VideoCameraOutlined />,
                component: GridStackLayout,
            }
        ]
    }
]

export default idea_route;
