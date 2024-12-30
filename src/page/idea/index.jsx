import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import idea_route from '@/routes/idea-route';
import styles from './style.module.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Idea = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // 获取所有子路由
    const routes = idea_route[0].children;

    // 获取当前路径
    const currentPath = location.pathname;

    // 动态计算默认选中的路径
    // 根据当前路由路径，判断是否匹配到父路由或子路由
    const getDefaultSelectedKey = () => {
        const matchedRoute = routes.find(route => currentPath.startsWith(route.path));  // 通过startsWith来匹配父路由或子路由

        if (matchedRoute) {
            return matchedRoute.path;  // 如果匹配到子路由，返回子路由路径
        }
        return idea_route[0].path;  // 默认选中父路由路径
    };

    // 递归生成菜单项
    const renderMenuItems = (routes) => {
        return routes.map((item) => {
            // 如果有子路由，递归生成子菜单
            if (item.children && item.children.length > 0) {
                return {
                    key: item.path,
                    icon: item.icon,
                    label: item.title,
                    children: renderMenuItems(item.children),  // 递归处理子菜单
                };
            }
            return {
                key: item.path,
                icon: item.icon,
                label: item.title,
            };
        });
    };

    const menuItems = renderMenuItems(routes);

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    return (
        <Layout className={styles['Layout']}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div>logo</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[getDefaultSelectedKey()]}  // 动态获取默认选中的路径
                    selectedKeys={[currentPath]}  // 根据当前路径选中菜单
                    onClick={(e) => {
                        console.log(e)
                        navigate(e.key)
                    }}  // 点击菜单项跳转
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Idea;
