import {
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import Idea from '@/page/idea'
import CardContent from '@/page/idea/card'

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

        ]
    }
]

export default idea_route;
