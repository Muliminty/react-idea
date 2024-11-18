import DemoCard from '@/page/admin/components/DemoCard';
import TileLayout from '@/page/admin/components/TileLayout';
import HomeLayout from '@/page/admin/components/homeLayout';
import ButtonDemo from '@/page/admin/components/ButtonDemo';
import Admin from '@/page/admin';
const interactive_case = [
    {
        title: '动画效果',
        path: '/interactiveCase',
        component: Admin,
        children: [
            {
                title: '按钮demo',
                path: '/interactiveCase/ButtonDemo',
                component: ButtonDemo, // 直接传递组件
            },
            {
                title: '博客组件预研',
                path: '/interactiveCase/DemoCard',
                component: DemoCard,
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
                ]
            }
        ],
    },
];

export default interactive_case;
