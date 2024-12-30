import {
    UserOutlined,
    VideoCameraOutlined,
    ScissorOutlined,
    BoldOutlined
} from '@ant-design/icons';

import Idea from '@/page/idea'
import Empty from '@/layout/empty'
import CardContent from '@/page/idea/card'
import GridStackLayout from '@/page/idea/gridStackLayout'
import MenuIcon from '@/page/idea/menu-icon'

const idea_route = [
    {
        title: '灵感合集',
        path: '/idea',
        component: Idea,
        children: [
            {
                title: '卡片',
                path: '/idea/card',
                icon: <UserOutlined />,
                component: CardContent,
            },
            {
                title: 'gridstack布局',
                path: '/idea/gridstack',
                icon: <VideoCameraOutlined />,
                component: GridStackLayout,
            },
            {
                title: '按钮',
                path: '/idea/button',
                icon: <BoldOutlined />,
                component: Empty,
                children: [
                    {
                        title: 'icon',
                        path: '/idea/button/icon',
                        icon: <ScissorOutlined />,
                        component: MenuIcon,
                    },
                    // {
                    //     title: '子节点',
                    //     path: '/idea/button/test',
                    //     icon: '',
                    //     component: Empty,
                    //     children: [
                    //         {
                    //             title: '子节点',
                    //             path: '/idea/button/test/GridStackLayout',
                    //             icon: '',
                    //             component: GridStackLayout,
                    //         }
                    //     ]
                    // }
                ]
            }
        ]
    }
]

export default idea_route;
