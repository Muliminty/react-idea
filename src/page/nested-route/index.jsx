import { Outlet, useNavigate } from 'react-router-dom';
import styles from './NestedRoute.module.scss'; // 引入模块化样式
// import 'prismjs/themes/prism.css'; // 引入 Prism.js 主题样式

const NestedRoute = () => {
    const navigate = useNavigate();

    // 路由跳转方法
    const handleNavigation = (path) => {
        navigate(path);
    };

    const codeSnippet = `
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
                path: '/NestedRoute/About',
                component: About,
            },
            {
                title: 'setting',
                path: '/NestedRoute/Setting',
                component: Setting, // 直接传递组件
            },
        ]
    }
]

export default nested_route;
    `;

    const codeSnippet2 = `
    {/* 导航部分 */}
    <nav className={styles.nav}>
        <button onClick={() => handleNavigation('/NestedRoute/setting')} className={styles.navButton}>
            Settings
        </button>
        <button onClick={() => handleNavigation('/NestedRoute/about')} className={styles.navButton}>
            About
        </button>
    </nav>

    {/* 动态渲染子路由 */}
    <div className={styles.outlet}>
        <Outlet />
    </div>
        `;


    return (
        <div className={styles.container}>
            <h1>嵌套路由</h1>

            {/* 导航部分 */}
            <nav className={styles.nav}>
                <button onClick={() => handleNavigation('/NestedRoute/setting')} className={styles.navButton}>
                    Settings
                </button>
                <button onClick={() => handleNavigation('/NestedRoute/about')} className={styles.navButton}>
                    About
                </button>
            </nav>

            {/* 动态渲染子路由 */}
            <div className={styles.outlet}>
                <Outlet />
            </div>


            {/* 高亮显示代码片段 */}
            <pre className={styles.codeSnippet}>
                <code className="language">{codeSnippet}</code>
            </pre>
            <div>--------------------------------------------------------</div>
            {/* 高亮显示代码片段 */}
            <pre className={styles.codeSnippet}>
                <code className="language">{codeSnippet2}</code>
            </pre>

        </div>
    );
};

export default NestedRoute;
