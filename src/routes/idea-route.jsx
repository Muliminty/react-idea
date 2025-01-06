import {
    UserOutlined,
    VideoCameraOutlined,
    ScissorOutlined,
    BoldOutlined
} from '@ant-design/icons';

import Idea from '@/page/idea'
import Empty from '@/layout/empty'
import UnderDevelopment from '@/layout/underDevelopment'

import CardContent from '@/page/idea/card'
import GridStackLayout from '@/page/idea/gridStackLayout'
import MenuIcon from '@/page/idea/button/menu-icon'
import LinkButton from '@/page/idea/button/link'

// import CollectionBox from '@/page/interactiveCase/components/collectionBox';
// import TileLayout from '@/page/interactiveCase/components/tileLayout';
// import HomeLayout from '@/page/interactiveCase/components/homeLayout';
// import ButtonDemo from '@/page/interactiveCase/components/button';
// import ComplexList from '@/page/interactiveCase/components/list/ComplexList';
// import DynamicHeightList from '@/page/interactiveCase/components/list/DynamicHeightList';
// import Admin from '@/page/interactiveCase';
// import GridLayout from '@/page/interactiveCase/components/gridLayout';
// import WhiteboardTool from '@/page/interactiveCase/components/whiteboardTool';

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
                    {
                        title: 'link',
                        path: '/idea/button/link',
                        icon: <ScissorOutlined />,
                        component: LinkButton,
                    }
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
            },
            {
                title: '列表',
                path: '/idea/list',
                icon: <ScissorOutlined />,
                component: Empty,
                children: [
                    {
                        title: '虚拟列表',
                        path: '/idea/list/virtualList',
                        icon: '',
                        component: UnderDevelopment,
                    }
                ]
            },
            {
                title: 'dndkit(拖拽）',
                path: '/idea/dndkit',
                icon: <ScissorOutlined />,
                component: Empty,
                children: [
                    {
                        title: '拖拽实现',
                        path: '/idea/dndkit/demo01',
                        icon: '',
                        component: UnderDevelopment,
                    }
                ]
            }
        ]
    }
]

export default idea_route;
