import CollectionBox from '@/page/interactiveCase/components/collectionBox';
import TileLayout from '@/page/interactiveCase/components/tileLayout';
import HomeLayout from '@/page/interactiveCase/components/homeLayout';
import ButtonDemo from '@/page/interactiveCase/components/button';
import ComplexList from '@/page/interactiveCase/components/list/ComplexList';
import DynamicHeightList from '@/page/interactiveCase/components/list/DynamicHeightList';
import Admin from '@/page/interactiveCase';
import GridLayout from '@/page/interactiveCase/components/gridLayout';
import WhiteboardTool from '@/page/interactiveCase/components/whiteboardTool';
const interactive_case = [
    {
        title: '动画效果',
        path: '/interactiveCase',
        component: Admin,
        children: [
            {
                title: '收集箱',
                path: '/interactiveCase/collectionBox',
                component: CollectionBox,
            },
            {
                title: '按钮',
                path: '/interactiveCase/ButtonDemo',
                component: ButtonDemo, // 直接传递组件
            },
            {
                title: '布局',
                path: '/interactiveCase/Layout',
                children: [
                    {
                        title: '磁贴界面布局',
                        path: '/interactiveCase/Layout/TileLayout',
                        component: TileLayout,
                    },
                    {
                        title: '首页布局',
                        path: '/interactiveCase/Layout/HomeLayout',
                        component: HomeLayout,
                    },
                    {
                        title: '网格布局',
                        path: '/interactiveCase/Layout/GridLayout',
                        component: GridLayout,
                    },
                ]
            },
            {
                title: '列表',
                path: '/interactiveCase/List',
                children: [
                    {
                        title: '复杂列表',
                        path: '/interactiveCase/List/ComplexList',
                        component: ComplexList,
                    },
                    {
                        title: '动态高度列表',
                        path: '/interactiveCase/List/DynamicHeightList',
                        component: DynamicHeightList,
                    },
                ]
            },
            {
                title: '白板',
                path: '/interactiveCase/WhiteboardTool',
                component: WhiteboardTool,
            }
        ],
    },
];

export default interactive_case;
